(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var URL = Package.url.URL;
var URLSearchParams = Package.url.URLSearchParams;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Log = Package.logging.Log;
var fetch = Package.fetch.fetch;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var OAuth, OAuthTest;

var require = meteorInstall({"node_modules":{"meteor":{"oauth":{"oauth_server.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/oauth/oauth_server.js                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
const _excluded = ["headers", "queryParams", "body"];
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let _objectWithoutProperties;
module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }
}, 1);
let bodyParser;
module.link("body-parser", {
  default(v) {
    bodyParser = v;
  }
}, 0);
OAuth = {};
OAuthTest = {};
RoutePolicy.declare('/_oauth/', 'network');
const registeredServices = {};

// Internal: Maps from service version to handler function. The
// 'oauth1' and 'oauth2' packages manipulate this directly to register
// for callbacks.
OAuth._requestHandlers = {};

/**
/* Register a handler for an OAuth service. The handler will be called
/* when we get an incoming http request on /_oauth/{serviceName}. This
/* handler should use that information to fetch data about the user
/* logging in.
/*
/* @param name {String} e.g. "google", "facebook"
/* @param version {Number} OAuth version (1 or 2)
/* @param urls   For OAuth1 only, specify the service's urls
/* @param handleOauthRequest {Function(oauthBinding|query)}
/*   - (For OAuth1 only) oauthBinding {OAuth1Binding} bound to the appropriate provider
/*   - (For OAuth2 only) query {Object} parameters passed in query string
/*   - return value is:
/*     - {serviceData:, (optional options:)} where serviceData should end
/*       up in the user's services[name] field
/*     - `null` if the user declined to give permissions
*/
OAuth.registerService = (name, version, urls, handleOauthRequest) => {
  if (registeredServices[name]) throw new Error("Already registered the ".concat(name, " OAuth service"));
  registeredServices[name] = {
    serviceName: name,
    version,
    urls,
    handleOauthRequest
  };
};

// For test cleanup.
OAuthTest.unregisterService = name => {
  delete registeredServices[name];
};
OAuth.retrieveCredential = (credentialToken, credentialSecret) => OAuth._retrievePendingCredential(credentialToken, credentialSecret);

// The state parameter is normally generated on the client using
// `btoa`, but for tests we need a version that runs on the server.
//
OAuth._generateState = (loginStyle, credentialToken, redirectUrl) => {
  return Buffer.from(JSON.stringify({
    loginStyle: loginStyle,
    credentialToken: credentialToken,
    redirectUrl: redirectUrl
  })).toString('base64');
};
OAuth._stateFromQuery = query => {
  let string;
  try {
    string = Buffer.from(query.state, 'base64').toString('binary');
  } catch (e) {
    Log.warn("Unable to base64 decode state from OAuth query: ".concat(query.state));
    throw e;
  }
  try {
    return JSON.parse(string);
  } catch (e) {
    Log.warn("Unable to parse state from OAuth query: ".concat(string));
    throw e;
  }
};
OAuth._loginStyleFromQuery = query => {
  let style;
  // For backwards-compatibility for older clients, catch any errors
  // that result from parsing the state parameter. If we can't parse it,
  // set login style to popup by default.
  try {
    style = OAuth._stateFromQuery(query).loginStyle;
  } catch (err) {
    style = "popup";
  }
  if (style !== "popup" && style !== "redirect") {
    throw new Error("Unrecognized login style: ".concat(style));
  }
  return style;
};
OAuth._credentialTokenFromQuery = query => {
  let state;
  // For backwards-compatibility for older clients, catch any errors
  // that result from parsing the state parameter. If we can't parse it,
  // assume that the state parameter's value is the credential token, as
  // it used to be for older clients.
  try {
    state = OAuth._stateFromQuery(query);
  } catch (err) {
    return query.state;
  }
  return state.credentialToken;
};
OAuth._isCordovaFromQuery = query => {
  try {
    return !!OAuth._stateFromQuery(query).isCordova;
  } catch (err) {
    // For backwards-compatibility for older clients, catch any errors
    // that result from parsing the state parameter. If we can't parse
    // it, assume that we are not on Cordova, since older Meteor didn't
    // do Cordova.
    return false;
  }
};

// Checks if the `redirectUrl` matches the app host.
// We export this function so that developers can override this
// behavior to allow apps from external domains to login using the
// redirect OAuth flow.
OAuth._checkRedirectUrlOrigin = redirectUrl => {
  const appHost = Meteor.absoluteUrl();
  const appHostReplacedLocalhost = Meteor.absoluteUrl(undefined, {
    replaceLocalhost: true
  });
  return redirectUrl.substr(0, appHost.length) !== appHost && redirectUrl.substr(0, appHostReplacedLocalhost.length) !== appHostReplacedLocalhost;
};
const middleware = (req, res, next) => Promise.asyncApply(() => {
  let requestData;

  // Make sure to catch any exceptions because otherwise we'd crash
  // the runner
  try {
    const serviceName = oauthServiceName(req);
    if (!serviceName) {
      // not an oauth request. pass to next middleware.
      next();
      return;
    }
    const service = registeredServices[serviceName];

    // Skip everything if there's no service set by the oauth middleware
    if (!service) throw new Error("Unexpected OAuth service ".concat(serviceName));

    // Make sure we're configured
    ensureConfigured(serviceName);
    const handler = OAuth._requestHandlers[service.version];
    if (!handler) throw new Error("Unexpected OAuth version ".concat(service.version));
    if (req.method === 'GET') {
      requestData = req.query;
    } else {
      requestData = req.body;
    }
    Promise.await(handler(service, requestData, res));
  } catch (err) {
    var _requestData;
    // if we got thrown an error, save it off, it will get passed to
    // the appropriate login call (if any) and reported there.
    //
    // The other option would be to display it in the popup tab that
    // is still open at this point, ignoring the 'close' or 'redirect'
    // we were passed. But then the developer wouldn't be able to
    // style the error or react to it in any way.
    if ((_requestData = requestData) !== null && _requestData !== void 0 && _requestData.state && err instanceof Error) {
      try {
        // catch any exceptions to avoid crashing runner
        OAuth._storePendingCredential(OAuth._credentialTokenFromQuery(requestData), err);
      } catch (err) {
        // Ignore the error and just give up. If we failed to store the
        // error, then the login will just fail with a generic error.
        Log.warn("Error in OAuth Server while storing pending login result.\n" + err.stack || err.message);
      }
    }

    // close the popup. because nobody likes them just hanging
    // there.  when someone sees this multiple times they might
    // think to check server logs (we hope?)
    // Catch errors because any exception here will crash the runner.
    try {
      OAuth._endOfLoginResponse(res, {
        query: requestData,
        loginStyle: OAuth._loginStyleFromQuery(requestData),
        error: err
      });
    } catch (err) {
      Log.warn("Error generating end of login response\n" + (err && (err.stack || err.message)));
    }
  }
});

// Listen to incoming OAuth http requests
WebApp.connectHandlers.use('/_oauth', bodyParser.json());
WebApp.connectHandlers.use('/_oauth', bodyParser.urlencoded({
  extended: false
}));
WebApp.connectHandlers.use(middleware);
OAuthTest.middleware = middleware;

// Handle /_oauth/* paths and extract the service name.
//
// @returns {String|null} e.g. "facebook", or null if this isn't an
// oauth request
const oauthServiceName = req => {
  // req.url will be "/_oauth/<service name>" with an optional "?close".
  const i = req.url.indexOf('?');
  let barePath;
  if (i === -1) barePath = req.url;else barePath = req.url.substring(0, i);
  const splitPath = barePath.split('/');

  // Any non-oauth request will continue down the default
  // middlewares.
  if (splitPath[1] !== '_oauth') return null;

  // Find service based on url
  const serviceName = splitPath[2];
  return serviceName;
};

// Make sure we're configured
const ensureConfigured = serviceName => {
  if (!ServiceConfiguration.configurations.findOne({
    service: serviceName
  })) {
    throw new ServiceConfiguration.ConfigError();
  }
};
const isSafe = value => {
  // This matches strings generated by `Random.secret` and
  // `Random.id`.
  return typeof value === "string" && /^[a-zA-Z0-9\-_]+$/.test(value);
};

// Internal: used by the oauth1 and oauth2 packages
OAuth._renderOauthResults = (res, query, credentialSecret) => {
  // For tests, we support the `only_credential_secret_for_test`
  // parameter, which just returns the credential secret without any
  // surrounding HTML. (The test needs to be able to easily grab the
  // secret and use it to log in.)
  //
  // XXX only_credential_secret_for_test could be useful for other
  // things beside tests, like command-line clients. We should give it a
  // real name and serve the credential secret in JSON.

  if (query.only_credential_secret_for_test) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(credentialSecret, 'utf-8');
  } else {
    const details = {
      query,
      loginStyle: OAuth._loginStyleFromQuery(query)
    };
    if (query.error) {
      details.error = query.error;
    } else {
      const token = OAuth._credentialTokenFromQuery(query);
      const secret = credentialSecret;
      if (token && secret && isSafe(token) && isSafe(secret)) {
        details.credentials = {
          token: token,
          secret: secret
        };
      } else {
        details.error = "invalid_credential_token_or_secret";
      }
    }
    OAuth._endOfLoginResponse(res, details);
  }
};

// This "template" (not a real Spacebars template, just an HTML file
// with some ##PLACEHOLDER##s) communicates the credential secret back
// to the main window and then closes the popup.
OAuth._endOfPopupResponseTemplate = Assets.getText("end_of_popup_response.html");
OAuth._endOfRedirectResponseTemplate = Assets.getText("end_of_redirect_response.html");

// Renders the end of login response template into some HTML and JavaScript
// that closes the popup or redirects at the end of the OAuth flow.
//
// options are:
//   - loginStyle ("popup" or "redirect")
//   - setCredentialToken (boolean)
//   - credentialToken
//   - credentialSecret
//   - redirectUrl
//   - isCordova (boolean)
//
const renderEndOfLoginResponse = options => {
  // It would be nice to use Blaze here, but it's a little tricky
  // because our mustaches would be inside a <script> tag, and Blaze
  // would treat the <script> tag contents as text (e.g. encode '&' as
  // '&amp;'). So we just do a simple replace.

  const escape = s => {
    if (s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#x27;").replace(/\//g, "&#x2F;");
    } else {
      return s;
    }
  };

  // Escape everything just to be safe (we've already checked that some
  // of this data -- the token and secret -- are safe).
  const config = {
    setCredentialToken: !!options.setCredentialToken,
    credentialToken: escape(options.credentialToken),
    credentialSecret: escape(options.credentialSecret),
    storagePrefix: escape(OAuth._storageTokenPrefix),
    redirectUrl: escape(options.redirectUrl),
    isCordova: !!options.isCordova
  };
  let template;
  if (options.loginStyle === 'popup') {
    template = OAuth._endOfPopupResponseTemplate;
  } else if (options.loginStyle === 'redirect') {
    template = OAuth._endOfRedirectResponseTemplate;
  } else {
    throw new Error("invalid loginStyle: ".concat(options.loginStyle));
  }
  const result = template.replace(/##CONFIG##/, JSON.stringify(config)).replace(/##ROOT_URL_PATH_PREFIX##/, __meteor_runtime_config__.ROOT_URL_PATH_PREFIX);
  return "<!DOCTYPE html>\n".concat(result);
};

// Writes an HTTP response to the popup window at the end of an OAuth
// login flow. At this point, if the user has successfully authenticated
// to the OAuth server and authorized this app, we communicate the
// credentialToken and credentialSecret to the main window. The main
// window must provide both these values to the DDP `login` method to
// authenticate its DDP connection. After communicating these vaues to
// the main window, we close the popup.
//
// We export this function so that developers can override this
// behavior, which is particularly useful in, for example, some mobile
// environments where popups and/or `window.opener` don't work. For
// example, an app could override `OAuth._endOfPopupResponse` to put the
// credential token and credential secret in the popup URL for the main
// window to read them there instead of using `window.opener`. If you
// override this function, you take responsibility for writing to the
// request and calling `res.end()` to complete the request.
//
// Arguments:
//   - res: the HTTP response object
//   - details:
//      - query: the query string on the HTTP request
//      - credentials: { token: *, secret: * }. If present, this field
//        indicates that the login was successful. Return these values
//        to the client, who can use them to log in over DDP. If
//        present, the values have been checked against a limited
//        character set and are safe to include in HTML.
//      - error: if present, a string or Error indicating an error that
//        occurred during the login. This can come from the client and
//        so shouldn't be trusted for security decisions or included in
//        the response without sanitizing it first. Only one of `error`
//        or `credentials` should be set.
OAuth._endOfLoginResponse = (res, details) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  let redirectUrl;
  if (details.loginStyle === 'redirect') {
    var _Meteor$settings, _Meteor$settings$pack, _Meteor$settings$pack2;
    redirectUrl = OAuth._stateFromQuery(details.query).redirectUrl;
    const appHost = Meteor.absoluteUrl();
    if (!((_Meteor$settings = Meteor.settings) !== null && _Meteor$settings !== void 0 && (_Meteor$settings$pack = _Meteor$settings.packages) !== null && _Meteor$settings$pack !== void 0 && (_Meteor$settings$pack2 = _Meteor$settings$pack.oauth) !== null && _Meteor$settings$pack2 !== void 0 && _Meteor$settings$pack2.disableCheckRedirectUrlOrigin) && OAuth._checkRedirectUrlOrigin(redirectUrl)) {
      details.error = "redirectUrl (".concat(redirectUrl) + ") is not on the same host as the app (".concat(appHost, ")");
      redirectUrl = appHost;
    }
  }
  const isCordova = OAuth._isCordovaFromQuery(details.query);
  if (details.error) {
    Log.warn("Error in OAuth Server: " + (details.error instanceof Error ? details.error.message : details.error));
    res.end(renderEndOfLoginResponse({
      loginStyle: details.loginStyle,
      setCredentialToken: false,
      redirectUrl,
      isCordova
    }), "utf-8");
    return;
  }

  // If we have a credentialSecret, report it back to the parent
  // window, with the corresponding credentialToken. The parent window
  // uses the credentialToken and credentialSecret to log in over DDP.
  res.end(renderEndOfLoginResponse({
    loginStyle: details.loginStyle,
    setCredentialToken: true,
    credentialToken: details.credentials.token,
    credentialSecret: details.credentials.secret,
    redirectUrl,
    isCordova
  }), "utf-8");
};
const OAuthEncryption = Package["oauth-encryption"] && Package["oauth-encryption"].OAuthEncryption;
const usingOAuthEncryption = () => OAuthEncryption && OAuthEncryption.keyIsLoaded();

// Encrypt sensitive service data such as access tokens if the
// "oauth-encryption" package is loaded and the oauth secret key has
// been specified.  Returns the unencrypted plaintext otherwise.
//
// The user id is not specified because the user isn't known yet at
// this point in the oauth authentication process.  After the oauth
// authentication process completes the encrypted service data fields
// will be re-encrypted with the user id included before inserting the
// service data into the user document.
//
OAuth.sealSecret = plaintext => {
  if (usingOAuthEncryption()) return OAuthEncryption.seal(plaintext);else return plaintext;
};

// Unencrypt a service data field, if the "oauth-encryption"
// package is loaded and the field is encrypted.
//
// Throws an error if the "oauth-encryption" package is loaded and the
// field is encrypted, but the oauth secret key hasn't been specified.
//
OAuth.openSecret = (maybeSecret, userId) => {
  if (!Package["oauth-encryption"] || !OAuthEncryption.isSealed(maybeSecret)) return maybeSecret;
  return OAuthEncryption.open(maybeSecret, userId);
};

// Unencrypt fields in the service data object.
//
OAuth.openSecrets = (serviceData, userId) => {
  const result = {};
  Object.keys(serviceData).forEach(key => result[key] = OAuth.openSecret(serviceData[key], userId));
  return result;
};
OAuth._addValuesToQueryParams = function () {
  let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new URLSearchParams();
  Object.entries(values).forEach(_ref => {
    let [key, value] = _ref;
    queryParams.set(key, "".concat(value));
  });
  return queryParams;
};
OAuth._fetch = function (url) {
  return Promise.asyncApply(() => {
    let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    let _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let {
        headers = {},
        queryParams = {},
        body
      } = _ref2,
      options = _objectWithoutProperties(_ref2, _excluded);
    const urlWithParams = new URL(url);
    OAuth._addValuesToQueryParams(queryParams, urlWithParams.searchParams);
    const requestOptions = _objectSpread(_objectSpread({
      method: method.toUpperCase(),
      headers
    }, body ? {
      body
    } : {}), options);
    return fetch(urlWithParams.toString(), requestOptions);
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pending_credentials.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/oauth/pending_credentials.js                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
//
// When an oauth request is made, Meteor receives oauth credentials
// in one browser tab, and temporarily persists them while that
// tab is closed, then retrieves them in the browser tab that
// initiated the credential request.
//
// _pendingCredentials is the storage mechanism used to share the
// credential between the 2 tabs
//

// Collection containing pending credentials of oauth credential requests
// Has key, credential, and createdAt fields.
OAuth._pendingCredentials = new Mongo.Collection("meteor_oauth_pendingCredentials", {
  _preventAutopublish: true
});
OAuth._pendingCredentials.createIndex('key', {
  unique: true
});
OAuth._pendingCredentials.createIndex('credentialSecret');
OAuth._pendingCredentials.createIndex('createdAt');

// Periodically clear old entries that were never retrieved
const _cleanStaleResults = () => {
  // Remove credentials older than 1 minute
  const timeCutoff = new Date();
  timeCutoff.setMinutes(timeCutoff.getMinutes() - 1);
  OAuth._pendingCredentials.remove({
    createdAt: {
      $lt: timeCutoff
    }
  });
};
const _cleanupHandle = Meteor.setInterval(_cleanStaleResults, 60 * 1000);

// Stores the key and credential in the _pendingCredentials collection.
// Will throw an exception if `key` is not a string.
//
// @param key {string}
// @param credential {Object}   The credential to store
// @param credentialSecret {string} A secret that must be presented in
//   addition to the `key` to retrieve the credential
//
OAuth._storePendingCredential = function (key, credential) {
  let credentialSecret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  check(key, String);
  check(credentialSecret, Match.Maybe(String));
  if (credential instanceof Error) {
    credential = storableError(credential);
  } else {
    credential = OAuth.sealSecret(credential);
  }

  // We do an upsert here instead of an insert in case the user happens
  // to somehow send the same `state` parameter twice during an OAuth
  // login; we don't want a duplicate key error.
  OAuth._pendingCredentials.upsert({
    key
  }, {
    key,
    credential,
    credentialSecret,
    createdAt: new Date()
  });
};

// Retrieves and removes a credential from the _pendingCredentials collection
//
// @param key {string}
// @param credentialSecret {string}
//
OAuth._retrievePendingCredential = function (key) {
  let credentialSecret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  check(key, String);
  const pendingCredential = OAuth._pendingCredentials.findOne({
    key,
    credentialSecret
  });
  if (pendingCredential) {
    OAuth._pendingCredentials.remove({
      _id: pendingCredential._id
    });
    if (pendingCredential.credential.error) return recreateError(pendingCredential.credential.error);else return OAuth.openSecret(pendingCredential.credential);
  } else {
    return undefined;
  }
};

// Convert an Error into an object that can be stored in mongo
// Note: A Meteor.Error is reconstructed as a Meteor.Error
// All other error classes are reconstructed as a plain Error.
// TODO: Can we do this more simply with EJSON?
const storableError = error => {
  const plainObject = {};
  Object.getOwnPropertyNames(error).forEach(key => plainObject[key] = error[key]);

  // Keep track of whether it's a Meteor.Error
  if (error instanceof Meteor.Error) {
    plainObject['meteorError'] = true;
  }
  return {
    error: plainObject
  };
};

// Create an error from the error format stored in mongo
const recreateError = errorDoc => {
  let error;
  if (errorDoc.meteorError) {
    error = new Meteor.Error();
    delete errorDoc.meteorError;
  } else {
    error = new Error();
  }
  Object.getOwnPropertyNames(errorDoc).forEach(key => error[key] = errorDoc[key]);
  return error;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"oauth_common.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/oauth/oauth_common.js                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
OAuth._storageTokenPrefix = "Meteor.oauth.credentialSecret-";
OAuth._redirectUri = (serviceName, config, params, absoluteUrlOptions) => {
  // Clone because we're going to mutate 'params'. The 'cordova' and
  // 'android' parameters are only used for picking the host of the
  // redirect URL, and not actually included in the redirect URL itself.
  let isCordova = false;
  let isAndroid = false;
  if (params) {
    params = _objectSpread({}, params);
    isCordova = params.cordova;
    isAndroid = params.android;
    delete params.cordova;
    delete params.android;
    if (Object.keys(params).length === 0) {
      params = undefined;
    }
  }
  if (Meteor.isServer && isCordova) {
    const url = Npm.require('url');
    let rootUrl = process.env.MOBILE_ROOT_URL || __meteor_runtime_config__.ROOT_URL;
    if (isAndroid) {
      // Match the replace that we do in cordova boilerplate
      // (boilerplate-generator package).
      // XXX Maybe we should put this in a separate package or something
      // that is used here and by boilerplate-generator? Or maybe
      // `Meteor.absoluteUrl` should know how to do this?
      const parsedRootUrl = url.parse(rootUrl);
      if (parsedRootUrl.hostname === "localhost") {
        parsedRootUrl.hostname = "10.0.2.2";
        delete parsedRootUrl.host;
      }
      rootUrl = url.format(parsedRootUrl);
    }
    absoluteUrlOptions = _objectSpread(_objectSpread({}, absoluteUrlOptions), {}, {
      // For Cordova clients, redirect to the special Cordova root url
      // (likely a local IP in development mode).
      rootUrl
    });
  }
  return URL._constructUrl(Meteor.absoluteUrl("_oauth/".concat(serviceName), absoluteUrlOptions), null, params);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"body-parser":{"package.json":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/oauth/node_modules/body-parser/package.json                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "body-parser",
  "version": "1.19.0"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/oauth/node_modules/body-parser/index.js                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/oauth/oauth_server.js");
require("/node_modules/meteor/oauth/pending_credentials.js");
require("/node_modules/meteor/oauth/oauth_common.js");

/* Exports */
Package._define("oauth", {
  OAuth: OAuth,
  OAuthTest: OAuthTest
});

})();

//# sourceURL=meteor://💻app/packages/oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb2F1dGgvb2F1dGhfc2VydmVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9vYXV0aC9wZW5kaW5nX2NyZWRlbnRpYWxzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9vYXV0aC9vYXV0aF9jb21tb24uanMiXSwibmFtZXMiOlsiX29iamVjdFNwcmVhZCIsIm1vZHVsZSIsImxpbmsiLCJkZWZhdWx0IiwidiIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsImJvZHlQYXJzZXIiLCJPQXV0aCIsIk9BdXRoVGVzdCIsIlJvdXRlUG9saWN5IiwiZGVjbGFyZSIsInJlZ2lzdGVyZWRTZXJ2aWNlcyIsIl9yZXF1ZXN0SGFuZGxlcnMiLCJyZWdpc3RlclNlcnZpY2UiLCJuYW1lIiwidmVyc2lvbiIsInVybHMiLCJoYW5kbGVPYXV0aFJlcXVlc3QiLCJFcnJvciIsInNlcnZpY2VOYW1lIiwidW5yZWdpc3RlclNlcnZpY2UiLCJyZXRyaWV2ZUNyZWRlbnRpYWwiLCJjcmVkZW50aWFsVG9rZW4iLCJjcmVkZW50aWFsU2VjcmV0IiwiX3JldHJpZXZlUGVuZGluZ0NyZWRlbnRpYWwiLCJfZ2VuZXJhdGVTdGF0ZSIsImxvZ2luU3R5bGUiLCJyZWRpcmVjdFVybCIsIkJ1ZmZlciIsImZyb20iLCJKU09OIiwic3RyaW5naWZ5IiwidG9TdHJpbmciLCJfc3RhdGVGcm9tUXVlcnkiLCJxdWVyeSIsInN0cmluZyIsInN0YXRlIiwiZSIsIkxvZyIsIndhcm4iLCJwYXJzZSIsIl9sb2dpblN0eWxlRnJvbVF1ZXJ5Iiwic3R5bGUiLCJlcnIiLCJfY3JlZGVudGlhbFRva2VuRnJvbVF1ZXJ5IiwiX2lzQ29yZG92YUZyb21RdWVyeSIsImlzQ29yZG92YSIsIl9jaGVja1JlZGlyZWN0VXJsT3JpZ2luIiwiYXBwSG9zdCIsIk1ldGVvciIsImFic29sdXRlVXJsIiwiYXBwSG9zdFJlcGxhY2VkTG9jYWxob3N0IiwidW5kZWZpbmVkIiwicmVwbGFjZUxvY2FsaG9zdCIsInN1YnN0ciIsImxlbmd0aCIsIm1pZGRsZXdhcmUiLCJyZXEiLCJyZXMiLCJuZXh0IiwicmVxdWVzdERhdGEiLCJvYXV0aFNlcnZpY2VOYW1lIiwic2VydmljZSIsImVuc3VyZUNvbmZpZ3VyZWQiLCJoYW5kbGVyIiwibWV0aG9kIiwiYm9keSIsIl9zdG9yZVBlbmRpbmdDcmVkZW50aWFsIiwic3RhY2siLCJtZXNzYWdlIiwiX2VuZE9mTG9naW5SZXNwb25zZSIsImVycm9yIiwiV2ViQXBwIiwiY29ubmVjdEhhbmRsZXJzIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImkiLCJ1cmwiLCJpbmRleE9mIiwiYmFyZVBhdGgiLCJzdWJzdHJpbmciLCJzcGxpdFBhdGgiLCJzcGxpdCIsIlNlcnZpY2VDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJmaW5kT25lIiwiQ29uZmlnRXJyb3IiLCJpc1NhZmUiLCJ2YWx1ZSIsInRlc3QiLCJfcmVuZGVyT2F1dGhSZXN1bHRzIiwib25seV9jcmVkZW50aWFsX3NlY3JldF9mb3JfdGVzdCIsIndyaXRlSGVhZCIsImVuZCIsImRldGFpbHMiLCJ0b2tlbiIsInNlY3JldCIsImNyZWRlbnRpYWxzIiwiX2VuZE9mUG9wdXBSZXNwb25zZVRlbXBsYXRlIiwiQXNzZXRzIiwiZ2V0VGV4dCIsIl9lbmRPZlJlZGlyZWN0UmVzcG9uc2VUZW1wbGF0ZSIsInJlbmRlckVuZE9mTG9naW5SZXNwb25zZSIsIm9wdGlvbnMiLCJlc2NhcGUiLCJzIiwicmVwbGFjZSIsImNvbmZpZyIsInNldENyZWRlbnRpYWxUb2tlbiIsInN0b3JhZ2VQcmVmaXgiLCJfc3RvcmFnZVRva2VuUHJlZml4IiwidGVtcGxhdGUiLCJyZXN1bHQiLCJfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fIiwiUk9PVF9VUkxfUEFUSF9QUkVGSVgiLCJzZXR0aW5ncyIsInBhY2thZ2VzIiwib2F1dGgiLCJkaXNhYmxlQ2hlY2tSZWRpcmVjdFVybE9yaWdpbiIsIk9BdXRoRW5jcnlwdGlvbiIsIlBhY2thZ2UiLCJ1c2luZ09BdXRoRW5jcnlwdGlvbiIsImtleUlzTG9hZGVkIiwic2VhbFNlY3JldCIsInBsYWludGV4dCIsInNlYWwiLCJvcGVuU2VjcmV0IiwibWF5YmVTZWNyZXQiLCJ1c2VySWQiLCJpc1NlYWxlZCIsIm9wZW4iLCJvcGVuU2VjcmV0cyIsInNlcnZpY2VEYXRhIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJfYWRkVmFsdWVzVG9RdWVyeVBhcmFtcyIsInZhbHVlcyIsInF1ZXJ5UGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZW50cmllcyIsInNldCIsIl9mZXRjaCIsImhlYWRlcnMiLCJ1cmxXaXRoUGFyYW1zIiwiVVJMIiwic2VhcmNoUGFyYW1zIiwicmVxdWVzdE9wdGlvbnMiLCJ0b1VwcGVyQ2FzZSIsImZldGNoIiwiX3BlbmRpbmdDcmVkZW50aWFscyIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsIl9wcmV2ZW50QXV0b3B1Ymxpc2giLCJjcmVhdGVJbmRleCIsInVuaXF1ZSIsIl9jbGVhblN0YWxlUmVzdWx0cyIsInRpbWVDdXRvZmYiLCJEYXRlIiwic2V0TWludXRlcyIsImdldE1pbnV0ZXMiLCJyZW1vdmUiLCJjcmVhdGVkQXQiLCIkbHQiLCJfY2xlYW51cEhhbmRsZSIsInNldEludGVydmFsIiwiY3JlZGVudGlhbCIsImNoZWNrIiwiU3RyaW5nIiwiTWF0Y2giLCJNYXliZSIsInN0b3JhYmxlRXJyb3IiLCJ1cHNlcnQiLCJwZW5kaW5nQ3JlZGVudGlhbCIsIl9pZCIsInJlY3JlYXRlRXJyb3IiLCJwbGFpbk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJlcnJvckRvYyIsIm1ldGVvckVycm9yIiwiX3JlZGlyZWN0VXJpIiwicGFyYW1zIiwiYWJzb2x1dGVVcmxPcHRpb25zIiwiaXNBbmRyb2lkIiwiY29yZG92YSIsImFuZHJvaWQiLCJpc1NlcnZlciIsIk5wbSIsInJlcXVpcmUiLCJyb290VXJsIiwicHJvY2VzcyIsImVudiIsIk1PQklMRV9ST09UX1VSTCIsIlJPT1RfVVJMIiwicGFyc2VkUm9vdFVybCIsImhvc3RuYW1lIiwiaG9zdCIsImZvcm1hdCIsIl9jb25zdHJ1Y3RVcmwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsYUFBYTtBQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQyxzQ0FBc0MsRUFBQztFQUFDQyxPQUFPLENBQUNDLENBQUMsRUFBQztJQUFDSixhQUFhLEdBQUNJLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBQyxJQUFJQyx3QkFBd0I7QUFBQ0osTUFBTSxDQUFDQyxJQUFJLENBQUMsZ0RBQWdELEVBQUM7RUFBQ0MsT0FBTyxDQUFDQyxDQUFDLEVBQUM7SUFBQ0Msd0JBQXdCLEdBQUNELENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBM08sSUFBSUUsVUFBVTtBQUFDTCxNQUFNLENBQUNDLElBQUksQ0FBQyxhQUFhLEVBQUM7RUFBQ0MsT0FBTyxDQUFDQyxDQUFDLEVBQUM7SUFBQ0UsVUFBVSxHQUFDRixDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBRXRFRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ1ZDLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFZEMsV0FBVyxDQUFDQyxPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztBQUUxQyxNQUFNQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBSixLQUFLLENBQUNLLGdCQUFnQixHQUFHLENBQUMsQ0FBQzs7QUFHM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBTCxLQUFLLENBQUNNLGVBQWUsR0FBRyxDQUFDQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsSUFBSSxFQUFF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QUFRO0lBRXhDLElBQUlWLFNBQVMsRUFBRTtNQUNiO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQSxNQUFNVyxhQUFhLEdBQUd0SCxHQUFHLENBQUN2QyxLQUFLLENBQUN3SixPQUFPLENBQUM7TUFDeEMsSUFBSUssYUFBYSxDQUFDQyxRQUFRLEtBQUssV0FBVyxFQUFFO1FBQzFDRCxhQUFhLENBQUNDLFFBQVEsR0FBRyxVQUFVO1FBQ25DLE9BQU9ELGFBQWEsQ0FBQ0UsSUFBSTtNQUMzQjtNQUNBUCxPQUFPLEdBQUdqSCxHQUFHLENBQUN5SCxNQUFNLENBQUNILGFBQWEsQ0FBQztJQUNyQztJQUVBWixrQkFBa0IsbUNBQ2JBLGtCQUFrQjtNQUNyQjtNQUNBO01BQ0FPO0lBQU8sRUFDUjtFQUNIO0VBRUEsT0FBTzVDLEdBQUcsQ0FBQ3FELGFBQWEsQ0FDdEJ4SixNQUFNLENBQUNDLFdBQVcsa0JBQVcvQixXQUFXLEdBQUlzSyxrQkFBa0IsQ0FBQyxFQUMvRCxJQUFJLEVBQ0pELE1BQU0sQ0FBQztBQUNYLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvb2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbk9BdXRoID0ge307XG5PQXV0aFRlc3QgPSB7fTtcblxuUm91dGVQb2xpY3kuZGVjbGFyZSgnL19vYXV0aC8nLCAnbmV0d29yaycpO1xuXG5jb25zdCByZWdpc3RlcmVkU2VydmljZXMgPSB7fTtcblxuLy8gSW50ZXJuYWw6IE1hcHMgZnJvbSBzZXJ2aWNlIHZlcnNpb24gdG8gaGFuZGxlciBmdW5jdGlvbi4gVGhlXG4vLyAnb2F1dGgxJyBhbmQgJ29hdXRoMicgcGFja2FnZXMgbWFuaXB1bGF0ZSB0aGlzIGRpcmVjdGx5IHRvIHJlZ2lzdGVyXG4vLyBmb3IgY2FsbGJhY2tzLlxuT0F1dGguX3JlcXVlc3RIYW5kbGVycyA9IHt9O1xuXG5cbi8qKlxuLyogUmVnaXN0ZXIgYSBoYW5kbGVyIGZvciBhbiBPQXV0aCBzZXJ2aWNlLiBUaGUgaGFuZGxlciB3aWxsIGJlIGNhbGxlZFxuLyogd2hlbiB3ZSBnZXQgYW4gaW5jb21pbmcgaHR0cCByZXF1ZXN0IG9uIC9fb2F1dGgve3NlcnZpY2VOYW1lfS4gVGhpc1xuLyogaGFuZGxlciBzaG91bGQgdXNlIHRoYXQgaW5mb3JtYXRpb24gdG8gZmV0Y2ggZGF0YSBhYm91dCB0aGUgdXNlclxuLyogbG9nZ2luZyBpbi5cbi8qXG4vKiBAcGFyYW0gbmFtZSB7U3RyaW5nfSBlLmcuIFwiZ29vZ2xlXCIsIFwiZmFjZWJvb2tcIlxuLyogQHBhcmFtIHZlcnNpb24ge051bWJlcn0gT0F1dGggdmVyc2lvbiAoMSBvciAyKVxuLyogQHBhcmFtIHVybHMgICBGb3IgT0F1dGgxIG9ubHksIHNwZWNpZnkgdGhlIHNlcnZpY2UncyB1cmxzXG4vKiBAcGFyYW0gaGFuZGxlT2F1dGhSZXF1ZXN0IHtGdW5jdGlvbihvYXV0aEJpbmRpbmd8cXVlcnkpfVxuLyogICAtIChGb3IgT0F1dGgxIG9ubHkpIG9hdXRoQmluZGluZyB7T0F1dGgxQmluZGluZ30gYm91bmQgdG8gdGhlIGFwcHJvcHJpYXRlIHByb3ZpZGVyXG4vKiAgIC0gKEZvciBPQXV0aDIgb25seSkgcXVlcnkge09iamVjdH0gcGFyYW1ldGVycyBwYXNzZWQgaW4gcXVlcnkgc3RyaW5nXG4vKiAgIC0gcmV0dXJuIHZhbHVlIGlzOlxuLyogICAgIC0ge3NlcnZpY2VEYXRhOiwgKG9wdGlvbmFsIG9wdGlvbnM6KX0gd2hlcmUgc2VydmljZURhdGEgc2hvdWxkIGVuZFxuLyogICAgICAgdXAgaW4gdGhlIHVzZXIncyBzZXJ2aWNlc1tuYW1lXSBmaWVsZFxuLyogICAgIC0gYG51bGxgIGlmIHRoZSB1c2VyIGRlY2xpbmVkIHRvIGdpdmUgcGVybWlzc2lvbnNcbiovXG5PQXV0aC5yZWdpc3RlclNlcnZpY2UgPSAobmFtZSwgdmVyc2lvbiwgdXJscywgaGFuZGxlT2F1dGhSZXF1ZXN0KSA9PiB7XG4gIGlmIChyZWdpc3RlcmVkU2VydmljZXNbbmFtZV0pXG4gICAgdGhyb3cgbmV3IEVycm9yKGBBbHJlYWR5IHJlZ2lzdGVyZWQgdGhlICR7bmFtZX0gT0F1dGggc2VydmljZWApO1xuXG4gIHJlZ2lzdGVyZWRTZXJ2aWNlc1tuYW1lXSA9IHtcbiAgICBzZXJ2aWNlTmFtZTogbmFtZSxcbiAgICB2ZXJzaW9uLFxuICAgIHVybHMsXG4gICAgaGFuZGxlT2F1dGhSZXF1ZXN0LFxuICB9O1xufTtcblxuLy8gRm9yIHRlc3QgY2xlYW51cC5cbk9BdXRoVGVzdC51bnJlZ2lzdGVyU2VydmljZSA9IG5hbWUgPT4ge1xuICBkZWxldGUgcmVnaXN0ZXJlZFNlcnZpY2VzW25hbWVdO1xufTtcblxuXG5PQXV0aC5yZXRyaWV2ZUNyZWRlbnRpYWwgPSAoY3JlZGVudGlhbFRva2VuLCBjcmVkZW50aWFsU2VjcmV0KSA9PlxuICBPQXV0aC5fcmV0cmlldmVQZW5kaW5nQ3JlZGVudGlhbChjcmVkZW50aWFsVG9rZW4sIGNyZWRlbnRpYWxTZWNyZXQpO1xuXG5cbi8vIFRoZSBzdGF0ZSBwYXJhbWV0ZXIgaXMgbm9ybWFsbHkgZ2VuZXJhdGVkIG9uIHRoZSBjbGllbnQgdXNpbmdcbi8vIGBidG9hYCwgYnV0IGZvciB0ZXN0cyB3ZSBuZWVkIGEgdmVyc2lvbiB0aGF0IHJ1bnMgb24gdGhlIHNlcnZlci5cbi8vXG5PQXV0aC5fZ2VuZXJhdGVTdGF0ZSA9IChsb2dpblN0eWxlLCBjcmVkZW50aWFsVG9rZW4sIHJlZGlyZWN0VXJsKSA9PiB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShKU09OLnN0cmluZ2lmeSh7XG4gICAgbG9naW5TdHlsZTogbG9naW5TdHlsZSxcbiAgICBjcmVkZW50aWFsVG9rZW46IGNyZWRlbnRpYWxUb2tlbixcbiAgICByZWRpcmVjdFVybDogcmVkaXJlY3RVcmx9KSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xufTtcblxuT0F1dGguX3N0YXRlRnJvbVF1ZXJ5ID0gcXVlcnkgPT4ge1xuICBsZXQgc3RyaW5nO1xuICB0cnkge1xuICAgIHN0cmluZyA9IEJ1ZmZlci5mcm9tKHF1ZXJ5LnN0YXRlLCAnYmFzZTY0JykudG9TdHJpbmcoJ2JpbmFyeScpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgTG9nLndhcm4oYFVuYWJsZSB0byBiYXNlNjQgZGVjb2RlIHN0YXRlIGZyb20gT0F1dGggcXVlcnk6ICR7cXVlcnkuc3RhdGV9YCk7XG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIExvZy53YXJuKGBVbmFibGUgdG8gcGFyc2Ugc3RhdGUgZnJvbSBPQXV0aCBxdWVyeTogJHtzdHJpbmd9YCk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuT0F1dGguX2xvZ2luU3R5bGVGcm9tUXVlcnkgPSBxdWVyeSA9PiB7XG4gIGxldCBzdHlsZTtcbiAgLy8gRm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGZvciBvbGRlciBjbGllbnRzLCBjYXRjaCBhbnkgZXJyb3JzXG4gIC8vIHRoYXQgcmVzdWx0IGZyb20gcGFyc2luZyB0aGUgc3RhdGUgcGFyYW1ldGVyLiBJZiB3ZSBjYW4ndCBwYXJzZSBpdCxcbiAgLy8gc2V0IGxvZ2luIHN0eWxlIHRvIHBvcHVwIGJ5IGRlZmF1bHQuXG4gIHRyeSB7XG4gICAgc3R5bGUgPSBPQXV0aC5fc3RhdGVGcm9tUXVlcnkocXVlcnkpLmxvZ2luU3R5bGU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHN0eWxlID0gXCJwb3B1cFwiO1xuICB9XG4gIGlmIChzdHlsZSAhPT0gXCJwb3B1cFwiICYmIHN0eWxlICE9PSBcInJlZGlyZWN0XCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVucmVjb2duaXplZCBsb2dpbiBzdHlsZTogJHtzdHlsZX1gKTtcbiAgfVxuICByZXR1cm4gc3R5bGU7XG59O1xuXG5PQXV0aC5fY3JlZGVudGlhbFRva2VuRnJvbVF1ZXJ5ID0gcXVlcnkgPT4ge1xuICBsZXQgc3RhdGU7XG4gIC8vIEZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3Igb2xkZXIgY2xpZW50cywgY2F0Y2ggYW55IGVycm9yc1xuICAvLyB0aGF0IHJlc3VsdCBmcm9tIHBhcnNpbmcgdGhlIHN0YXRlIHBhcmFtZXRlci4gSWYgd2UgY2FuJ3QgcGFyc2UgaXQsXG4gIC8vIGFzc3VtZSB0aGF0IHRoZSBzdGF0ZSBwYXJhbWV0ZXIncyB2YWx1ZSBpcyB0aGUgY3JlZGVudGlhbCB0b2tlbiwgYXNcbiAgLy8gaXQgdXNlZCB0byBiZSBmb3Igb2xkZXIgY2xpZW50cy5cbiAgdHJ5IHtcbiAgICBzdGF0ZSA9IE9BdXRoLl9zdGF0ZUZyb21RdWVyeShxdWVyeSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBxdWVyeS5zdGF0ZTtcbiAgfVxuICByZXR1cm4gc3RhdGUuY3JlZGVudGlhbFRva2VuO1xufTtcblxuT0F1dGguX2lzQ29yZG92YUZyb21RdWVyeSA9IHF1ZXJ5ID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISEgT0F1dGguX3N0YXRlRnJvbVF1ZXJ5KHF1ZXJ5KS5pc0NvcmRvdmE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIEZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3Igb2xkZXIgY2xpZW50cywgY2F0Y2ggYW55IGVycm9yc1xuICAgIC8vIHRoYXQgcmVzdWx0IGZyb20gcGFyc2luZyB0aGUgc3RhdGUgcGFyYW1ldGVyLiBJZiB3ZSBjYW4ndCBwYXJzZVxuICAgIC8vIGl0LCBhc3N1bWUgdGhhdCB3ZSBhcmUgbm90IG9uIENvcmRvdmEsIHNpbmNlIG9sZGVyIE1ldGVvciBkaWRuJ3RcbiAgICAvLyBkbyBDb3Jkb3ZhLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gQ2hlY2tzIGlmIHRoZSBgcmVkaXJlY3RVcmxgIG1hdGNoZXMgdGhlIGFwcCBob3N0LlxuLy8gV2UgZXhwb3J0IHRoaXMgZnVuY3Rpb24gc28gdGhhdCBkZXZlbG9wZXJzIGNhbiBvdmVycmlkZSB0aGlzXG4vLyBiZWhhdmlvciB0byBhbGxvdyBhcHBzIGZyb20gZXh0ZXJuYWwgZG9tYWlucyB0byBsb2dpbiB1c2luZyB0aGVcbi8vIHJlZGlyZWN0IE9BdXRoIGZsb3cuXG5PQXV0aC5fY2hlY2tSZWRpcmVjdFVybE9yaWdpbiA9IHJlZGlyZWN0VXJsID0+IHtcbiAgY29uc3QgYXBwSG9zdCA9IE1ldGVvci5hYnNvbHV0ZVVybCgpO1xuICBjb25zdCBhcHBIb3N0UmVwbGFjZWRMb2NhbGhvc3QgPSBNZXRlb3IuYWJzb2x1dGVVcmwodW5kZWZpbmVkLCB7XG4gICAgcmVwbGFjZUxvY2FsaG9zdDogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIChcbiAgICByZWRpcmVjdFVybC5zdWJzdHIoMCwgYXBwSG9zdC5sZW5ndGgpICE9PSBhcHBIb3N0ICYmXG4gICAgcmVkaXJlY3RVcmwuc3Vic3RyKDAsIGFwcEhvc3RSZXBsYWNlZExvY2FsaG9zdC5sZW5ndGgpICE9PSBhcHBIb3N0UmVwbGFjZWRMb2NhbGhvc3RcbiAgKTtcbn07XG5cbmNvbnN0IG1pZGRsZXdhcmUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgbGV0IHJlcXVlc3REYXRhO1xuXG4gIC8vIE1ha2Ugc3VyZSB0byBjYXRjaCBhbnkgZXhjZXB0aW9ucyBiZWNhdXNlIG90aGVyd2lzZSB3ZSdkIGNyYXNoXG4gIC8vIHRoZSBydW5uZXJcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXJ2aWNlTmFtZSA9IG9hdXRoU2VydmljZU5hbWUocmVxKTtcbiAgICBpZiAoIXNlcnZpY2VOYW1lKSB7XG4gICAgICAvLyBub3QgYW4gb2F1dGggcmVxdWVzdC4gcGFzcyB0byBuZXh0IG1pZGRsZXdhcmUuXG4gICAgICBuZXh0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmljZSA9IHJlZ2lzdGVyZWRTZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG5cbiAgICAvLyBTa2lwIGV2ZXJ5dGhpbmcgaWYgdGhlcmUncyBubyBzZXJ2aWNlIHNldCBieSB0aGUgb2F1dGggbWlkZGxld2FyZVxuICAgIGlmICghc2VydmljZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBPQXV0aCBzZXJ2aWNlICR7c2VydmljZU5hbWV9YCk7XG5cbiAgICAvLyBNYWtlIHN1cmUgd2UncmUgY29uZmlndXJlZFxuICAgIGVuc3VyZUNvbmZpZ3VyZWQoc2VydmljZU5hbWUpO1xuXG4gICAgY29uc3QgaGFuZGxlciA9IE9BdXRoLl9yZXF1ZXN0SGFuZGxlcnNbc2VydmljZS52ZXJzaW9uXTtcbiAgICBpZiAoIWhhbmRsZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgT0F1dGggdmVyc2lvbiAke3NlcnZpY2UudmVyc2lvbn1gKTtcblxuICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgcmVxdWVzdERhdGEgPSByZXEucXVlcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3REYXRhID0gcmVxLmJvZHk7XG4gICAgfVxuXG4gICAgYXdhaXQgaGFuZGxlcihzZXJ2aWNlLCByZXF1ZXN0RGF0YSwgcmVzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gaWYgd2UgZ290IHRocm93biBhbiBlcnJvciwgc2F2ZSBpdCBvZmYsIGl0IHdpbGwgZ2V0IHBhc3NlZCB0b1xuICAgIC8vIHRoZSBhcHByb3ByaWF0ZSBsb2dpbiBjYWxsIChpZiBhbnkpIGFuZCByZXBvcnRlZCB0aGVyZS5cbiAgICAvL1xuICAgIC8vIFRoZSBvdGhlciBvcHRpb24gd291bGQgYmUgdG8gZGlzcGxheSBpdCBpbiB0aGUgcG9wdXAgdGFiIHRoYXRcbiAgICAvLyBpcyBzdGlsbCBvcGVuIGF0IHRoaXMgcG9pbnQsIGlnbm9yaW5nIHRoZSAnY2xvc2UnIG9yICdyZWRpcmVjdCdcbiAgICAvLyB3ZSB3ZXJlIHBhc3NlZC4gQnV0IHRoZW4gdGhlIGRldmVsb3BlciB3b3VsZG4ndCBiZSBhYmxlIHRvXG4gICAgLy8gc3R5bGUgdGhlIGVycm9yIG9yIHJlYWN0IHRvIGl0IGluIGFueSB3YXkuXG4gICAgaWYgKHJlcXVlc3REYXRhPy5zdGF0ZSAmJiBlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdHJ5IHsgLy8gY2F0Y2ggYW55IGV4Y2VwdGlvbnMgdG8gYXZvaWQgY3Jhc2hpbmcgcnVubmVyXG4gICAgICAgIE9BdXRoLl9zdG9yZVBlbmRpbmdDcmVkZW50aWFsKE9BdXRoLl9jcmVkZW50aWFsVG9rZW5Gcm9tUXVlcnkocmVxdWVzdERhdGEpLCBlcnIpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZXJyb3IgYW5kIGp1c3QgZ2l2ZSB1cC4gSWYgd2UgZmFpbGVkIHRvIHN0b3JlIHRoZVxuICAgICAgICAvLyBlcnJvciwgdGhlbiB0aGUgbG9naW4gd2lsbCBqdXN0IGZhaWwgd2l0aCBhIGdlbmVyaWMgZXJyb3IuXG4gICAgICAgIExvZy53YXJuKFwiRXJyb3IgaW4gT0F1dGggU2VydmVyIHdoaWxlIHN0b3JpbmcgcGVuZGluZyBsb2dpbiByZXN1bHQuXFxuXCIgK1xuICAgICAgICAgICAgICAgICBlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNsb3NlIHRoZSBwb3B1cC4gYmVjYXVzZSBub2JvZHkgbGlrZXMgdGhlbSBqdXN0IGhhbmdpbmdcbiAgICAvLyB0aGVyZS4gIHdoZW4gc29tZW9uZSBzZWVzIHRoaXMgbXVsdGlwbGUgdGltZXMgdGhleSBtaWdodFxuICAgIC8vIHRoaW5rIHRvIGNoZWNrIHNlcnZlciBsb2dzICh3ZSBob3BlPylcbiAgICAvLyBDYXRjaCBlcnJvcnMgYmVjYXVzZSBhbnkgZXhjZXB0aW9uIGhlcmUgd2lsbCBjcmFzaCB0aGUgcnVubmVyLlxuICAgIHRyeSB7XG4gICAgICBPQXV0aC5fZW5kT2ZMb2dpblJlc3BvbnNlKHJlcywge1xuICAgICAgICBxdWVyeTogcmVxdWVzdERhdGEsXG4gICAgICAgIGxvZ2luU3R5bGU6IE9BdXRoLl9sb2dpblN0eWxlRnJvbVF1ZXJ5KHJlcXVlc3REYXRhKSxcbiAgICAgICAgZXJyb3I6IGVyclxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBMb2cud2FybihcIkVycm9yIGdlbmVyYXRpbmcgZW5kIG9mIGxvZ2luIHJlc3BvbnNlXFxuXCIgK1xuICAgICAgICAgICAgICAgKGVyciAmJiAoZXJyLnN0YWNrIHx8IGVyci5tZXNzYWdlKSkpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gTGlzdGVuIHRvIGluY29taW5nIE9BdXRoIGh0dHAgcmVxdWVzdHNcbldlYkFwcC5jb25uZWN0SGFuZGxlcnMudXNlKCcvX29hdXRoJywgYm9keVBhcnNlci5qc29uKCkpO1xuV2ViQXBwLmNvbm5lY3RIYW5kbGVycy51c2UoJy9fb2F1dGgnLCBib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuV2ViQXBwLmNvbm5lY3RIYW5kbGVycy51c2UobWlkZGxld2FyZSk7XG5cbk9BdXRoVGVzdC5taWRkbGV3YXJlID0gbWlkZGxld2FyZTtcblxuLy8gSGFuZGxlIC9fb2F1dGgvKiBwYXRocyBhbmQgZXh0cmFjdCB0aGUgc2VydmljZSBuYW1lLlxuLy9cbi8vIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gZS5nLiBcImZhY2Vib29rXCIsIG9yIG51bGwgaWYgdGhpcyBpc24ndCBhblxuLy8gb2F1dGggcmVxdWVzdFxuY29uc3Qgb2F1dGhTZXJ2aWNlTmFtZSA9IHJlcSA9PiB7XG4gIC8vIHJlcS51cmwgd2lsbCBiZSBcIi9fb2F1dGgvPHNlcnZpY2UgbmFtZT5cIiB3aXRoIGFuIG9wdGlvbmFsIFwiP2Nsb3NlXCIuXG4gIGNvbnN0IGkgPSByZXEudXJsLmluZGV4T2YoJz8nKTtcbiAgbGV0IGJhcmVQYXRoO1xuICBpZiAoaSA9PT0gLTEpXG4gICAgYmFyZVBhdGggPSByZXEudXJsO1xuICBlbHNlXG4gICAgYmFyZVBhdGggPSByZXEudXJsLnN1YnN0cmluZygwLCBpKTtcbiAgY29uc3Qgc3BsaXRQYXRoID0gYmFyZVBhdGguc3BsaXQoJy8nKTtcblxuICAvLyBBbnkgbm9uLW9hdXRoIHJlcXVlc3Qgd2lsbCBjb250aW51ZSBkb3duIHRoZSBkZWZhdWx0XG4gIC8vIG1pZGRsZXdhcmVzLlxuICBpZiAoc3BsaXRQYXRoWzFdICE9PSAnX29hdXRoJylcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBGaW5kIHNlcnZpY2UgYmFzZWQgb24gdXJsXG4gIGNvbnN0IHNlcnZpY2VOYW1lID0gc3BsaXRQYXRoWzJdO1xuICByZXR1cm4gc2VydmljZU5hbWU7XG59O1xuXG4vLyBNYWtlIHN1cmUgd2UncmUgY29uZmlndXJlZFxuY29uc3QgZW5zdXJlQ29uZmlndXJlZCA9IHNlcnZpY2VOYW1lID0+IHtcbiAgaWYgKCFTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5maW5kT25lKHtzZXJ2aWNlOiBzZXJ2aWNlTmFtZX0pKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZpY2VDb25maWd1cmF0aW9uLkNvbmZpZ0Vycm9yKCk7XG4gIH1cbn07XG5cbmNvbnN0IGlzU2FmZSA9IHZhbHVlID0+IHtcbiAgLy8gVGhpcyBtYXRjaGVzIHN0cmluZ3MgZ2VuZXJhdGVkIGJ5IGBSYW5kb20uc2VjcmV0YCBhbmRcbiAgLy8gYFJhbmRvbS5pZGAuXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiZcbiAgICAvXlthLXpBLVowLTlcXC1fXSskLy50ZXN0KHZhbHVlKTtcbn07XG5cbi8vIEludGVybmFsOiB1c2VkIGJ5IHRoZSBvYXV0aDEgYW5kIG9hdXRoMiBwYWNrYWdlc1xuT0F1dGguX3JlbmRlck9hdXRoUmVzdWx0cyA9IChyZXMsIHF1ZXJ5LCBjcmVkZW50aWFsU2VjcmV0KSA9PiB7XG4gIC8vIEZvciB0ZXN0cywgd2Ugc3VwcG9ydCB0aGUgYG9ubHlfY3JlZGVudGlhbF9zZWNyZXRfZm9yX3Rlc3RgXG4gIC8vIHBhcmFtZXRlciwgd2hpY2gganVzdCByZXR1cm5zIHRoZSBjcmVkZW50aWFsIHNlY3JldCB3aXRob3V0IGFueVxuICAvLyBzdXJyb3VuZGluZyBIVE1MLiAoVGhlIHRlc3QgbmVlZHMgdG8gYmUgYWJsZSB0byBlYXNpbHkgZ3JhYiB0aGVcbiAgLy8gc2VjcmV0IGFuZCB1c2UgaXQgdG8gbG9nIGluLilcbiAgLy9cbiAgLy8gWFhYIG9ubHlfY3JlZGVudGlhbF9zZWNyZXRfZm9yX3Rlc3QgY291bGQgYmUgdXNlZnVsIGZvciBvdGhlclxuICAvLyB0aGluZ3MgYmVzaWRlIHRlc3RzLCBsaWtlIGNvbW1hbmQtbGluZSBjbGllbnRzLiBXZSBzaG91bGQgZ2l2ZSBpdCBhXG4gIC8vIHJlYWwgbmFtZSBhbmQgc2VydmUgdGhlIGNyZWRlbnRpYWwgc2VjcmV0IGluIEpTT04uXG5cbiAgaWYgKHF1ZXJ5Lm9ubHlfY3JlZGVudGlhbF9zZWNyZXRfZm9yX3Rlc3QpIHtcbiAgICByZXMud3JpdGVIZWFkKDIwMCwgeydDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJ30pO1xuICAgIHJlcy5lbmQoY3JlZGVudGlhbFNlY3JldCwgJ3V0Zi04Jyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGV0YWlscyA9IHtcbiAgICAgIHF1ZXJ5LFxuICAgICAgbG9naW5TdHlsZTogT0F1dGguX2xvZ2luU3R5bGVGcm9tUXVlcnkocXVlcnkpXG4gICAgfTtcbiAgICBpZiAocXVlcnkuZXJyb3IpIHtcbiAgICAgIGRldGFpbHMuZXJyb3IgPSBxdWVyeS5lcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9rZW4gPSBPQXV0aC5fY3JlZGVudGlhbFRva2VuRnJvbVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIGNvbnN0IHNlY3JldCA9IGNyZWRlbnRpYWxTZWNyZXQ7XG4gICAgICBpZiAodG9rZW4gJiYgc2VjcmV0ICYmXG4gICAgICAgICAgaXNTYWZlKHRva2VuKSAmJiBpc1NhZmUoc2VjcmV0KSkge1xuICAgICAgICBkZXRhaWxzLmNyZWRlbnRpYWxzID0geyB0b2tlbjogdG9rZW4sIHNlY3JldDogc2VjcmV0fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRldGFpbHMuZXJyb3IgPSBcImludmFsaWRfY3JlZGVudGlhbF90b2tlbl9vcl9zZWNyZXRcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPQXV0aC5fZW5kT2ZMb2dpblJlc3BvbnNlKHJlcywgZGV0YWlscyk7XG4gIH1cbn07XG5cbi8vIFRoaXMgXCJ0ZW1wbGF0ZVwiIChub3QgYSByZWFsIFNwYWNlYmFycyB0ZW1wbGF0ZSwganVzdCBhbiBIVE1MIGZpbGVcbi8vIHdpdGggc29tZSAjI1BMQUNFSE9MREVSIyNzKSBjb21tdW5pY2F0ZXMgdGhlIGNyZWRlbnRpYWwgc2VjcmV0IGJhY2tcbi8vIHRvIHRoZSBtYWluIHdpbmRvdyBhbmQgdGhlbiBjbG9zZXMgdGhlIHBvcHVwLlxuT0F1dGguX2VuZE9mUG9wdXBSZXNwb25zZVRlbXBsYXRlID0gQXNzZXRzLmdldFRleHQoXG4gIFwiZW5kX29mX3BvcHVwX3Jlc3BvbnNlLmh0bWxcIik7XG5cbk9BdXRoLl9lbmRPZlJlZGlyZWN0UmVzcG9uc2VUZW1wbGF0ZSA9IEFzc2V0cy5nZXRUZXh0KFxuICBcImVuZF9vZl9yZWRpcmVjdF9yZXNwb25zZS5odG1sXCIpO1xuXG4vLyBSZW5kZXJzIHRoZSBlbmQgb2YgbG9naW4gcmVzcG9uc2UgdGVtcGxhdGUgaW50byBzb21lIEhUTUwgYW5kIEphdmFTY3JpcHRcbi8vIHRoYXQgY2xvc2VzIHRoZSBwb3B1cCBvciByZWRpcmVjdHMgYXQgdGhlIGVuZCBvZiB0aGUgT0F1dGggZmxvdy5cbi8vXG4vLyBvcHRpb25zIGFyZTpcbi8vICAgLSBsb2dpblN0eWxlIChcInBvcHVwXCIgb3IgXCJyZWRpcmVjdFwiKVxuLy8gICAtIHNldENyZWRlbnRpYWxUb2tlbiAoYm9vbGVhbilcbi8vICAgLSBjcmVkZW50aWFsVG9rZW5cbi8vICAgLSBjcmVkZW50aWFsU2VjcmV0XG4vLyAgIC0gcmVkaXJlY3RVcmxcbi8vICAgLSBpc0NvcmRvdmEgKGJvb2xlYW4pXG4vL1xuY29uc3QgcmVuZGVyRW5kT2ZMb2dpblJlc3BvbnNlID0gb3B0aW9ucyA9PiB7XG4gIC8vIEl0IHdvdWxkIGJlIG5pY2UgdG8gdXNlIEJsYXplIGhlcmUsIGJ1dCBpdCdzIGEgbGl0dGxlIHRyaWNreVxuICAvLyBiZWNhdXNlIG91ciBtdXN0YWNoZXMgd291bGQgYmUgaW5zaWRlIGEgPHNjcmlwdD4gdGFnLCBhbmQgQmxhemVcbiAgLy8gd291bGQgdHJlYXQgdGhlIDxzY3JpcHQ+IHRhZyBjb250ZW50cyBhcyB0ZXh0IChlLmcuIGVuY29kZSAnJicgYXNcbiAgLy8gJyZhbXA7JykuIFNvIHdlIGp1c3QgZG8gYSBzaW1wbGUgcmVwbGFjZS5cblxuICBjb25zdCBlc2NhcGUgPSBzID0+IHtcbiAgICBpZiAocykge1xuICAgICAgcmV0dXJuIHMucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLlxuICAgICAgICByZXBsYWNlKC88L2csIFwiJmx0O1wiKS5cbiAgICAgICAgcmVwbGFjZSgvPi9nLCBcIiZndDtcIikuXG4gICAgICAgIHJlcGxhY2UoL1xcXCIvZywgXCImcXVvdDtcIikuXG4gICAgICAgIHJlcGxhY2UoL1xcJy9nLCBcIiYjeDI3O1wiKS5cbiAgICAgICAgcmVwbGFjZSgvXFwvL2csIFwiJiN4MkY7XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcztcbiAgICB9XG4gIH07XG5cbiAgLy8gRXNjYXBlIGV2ZXJ5dGhpbmcganVzdCB0byBiZSBzYWZlICh3ZSd2ZSBhbHJlYWR5IGNoZWNrZWQgdGhhdCBzb21lXG4gIC8vIG9mIHRoaXMgZGF0YSAtLSB0aGUgdG9rZW4gYW5kIHNlY3JldCAtLSBhcmUgc2FmZSkuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBzZXRDcmVkZW50aWFsVG9rZW46ICEhIG9wdGlvbnMuc2V0Q3JlZGVudGlhbFRva2VuLFxuICAgIGNyZWRlbnRpYWxUb2tlbjogZXNjYXBlKG9wdGlvbnMuY3JlZGVudGlhbFRva2VuKSxcbiAgICBjcmVkZW50aWFsU2VjcmV0OiBlc2NhcGUob3B0aW9ucy5jcmVkZW50aWFsU2VjcmV0KSxcbiAgICBzdG9yYWdlUHJlZml4OiBlc2NhcGUoT0F1dGguX3N0b3JhZ2VUb2tlblByZWZpeCksXG4gICAgcmVkaXJlY3RVcmw6IGVzY2FwZShvcHRpb25zLnJlZGlyZWN0VXJsKSxcbiAgICBpc0NvcmRvdmE6ICEhIG9wdGlvbnMuaXNDb3Jkb3ZhXG4gIH07XG5cbiAgbGV0IHRlbXBsYXRlO1xuICBpZiAob3B0aW9ucy5sb2dpblN0eWxlID09PSAncG9wdXAnKSB7XG4gICAgdGVtcGxhdGUgPSBPQXV0aC5fZW5kT2ZQb3B1cFJlc3BvbnNlVGVtcGxhdGU7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5sb2dpblN0eWxlID09PSAncmVkaXJlY3QnKSB7XG4gICAgdGVtcGxhdGUgPSBPQXV0aC5fZW5kT2ZSZWRpcmVjdFJlc3BvbnNlVGVtcGxhdGU7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGxvZ2luU3R5bGU6ICR7b3B0aW9ucy5sb2dpblN0eWxlfWApO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gdGVtcGxhdGUucmVwbGFjZSgvIyNDT05GSUcjIy8sIEpTT04uc3RyaW5naWZ5KGNvbmZpZykpXG4gICAgLnJlcGxhY2UoXG4gICAgICAvIyNST09UX1VSTF9QQVRIX1BSRUZJWCMjLywgX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5ST09UX1VSTF9QQVRIX1BSRUZJWFxuICAgICk7XG5cbiAgcmV0dXJuIGA8IURPQ1RZUEUgaHRtbD5cXG4ke3Jlc3VsdH1gO1xufTtcblxuLy8gV3JpdGVzIGFuIEhUVFAgcmVzcG9uc2UgdG8gdGhlIHBvcHVwIHdpbmRvdyBhdCB0aGUgZW5kIG9mIGFuIE9BdXRoXG4vLyBsb2dpbiBmbG93LiBBdCB0aGlzIHBvaW50LCBpZiB0aGUgdXNlciBoYXMgc3VjY2Vzc2Z1bGx5IGF1dGhlbnRpY2F0ZWRcbi8vIHRvIHRoZSBPQXV0aCBzZXJ2ZXIgYW5kIGF1dGhvcml6ZWQgdGhpcyBhcHAsIHdlIGNvbW11bmljYXRlIHRoZVxuLy8gY3JlZGVudGlhbFRva2VuIGFuZCBjcmVkZW50aWFsU2VjcmV0IHRvIHRoZSBtYWluIHdpbmRvdy4gVGhlIG1haW5cbi8vIHdpbmRvdyBtdXN0IHByb3ZpZGUgYm90aCB0aGVzZSB2YWx1ZXMgdG8gdGhlIEREUCBgbG9naW5gIG1ldGhvZCB0b1xuLy8gYXV0aGVudGljYXRlIGl0cyBERFAgY29ubmVjdGlvbi4gQWZ0ZXIgY29tbXVuaWNhdGluZyB0aGVzZSB2YXVlcyB0b1xuLy8gdGhlIG1haW4gd2luZG93LCB3ZSBjbG9zZSB0aGUgcG9wdXAuXG4vL1xuLy8gV2UgZXhwb3J0IHRoaXMgZnVuY3Rpb24gc28gdGhhdCBkZXZlbG9wZXJzIGNhbiBvdmVycmlkZSB0aGlzXG4vLyBiZWhhdmlvciwgd2hpY2ggaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBpbiwgZm9yIGV4YW1wbGUsIHNvbWUgbW9iaWxlXG4vLyBlbnZpcm9ubWVudHMgd2hlcmUgcG9wdXBzIGFuZC9vciBgd2luZG93Lm9wZW5lcmAgZG9uJ3Qgd29yay4gRm9yXG4vLyBleGFtcGxlLCBhbiBhcHAgY291bGQgb3ZlcnJpZGUgYE9BdXRoLl9lbmRPZlBvcHVwUmVzcG9uc2VgIHRvIHB1dCB0aGVcbi8vIGNyZWRlbnRpYWwgdG9rZW4gYW5kIGNyZWRlbnRpYWwgc2VjcmV0IGluIHRoZSBwb3B1cCBVUkwgZm9yIHRoZSBtYWluXG4vLyB3aW5kb3cgdG8gcmVhZCB0aGVtIHRoZXJlIGluc3RlYWQgb2YgdXNpbmcgYHdpbmRvdy5vcGVuZXJgLiBJZiB5b3Vcbi8vIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb24sIHlvdSB0YWtlIHJlc3BvbnNpYmlsaXR5IGZvciB3cml0aW5nIHRvIHRoZVxuLy8gcmVxdWVzdCBhbmQgY2FsbGluZyBgcmVzLmVuZCgpYCB0byBjb21wbGV0ZSB0aGUgcmVxdWVzdC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAgIC0gcmVzOiB0aGUgSFRUUCByZXNwb25zZSBvYmplY3Rcbi8vICAgLSBkZXRhaWxzOlxuLy8gICAgICAtIHF1ZXJ5OiB0aGUgcXVlcnkgc3RyaW5nIG9uIHRoZSBIVFRQIHJlcXVlc3Rcbi8vICAgICAgLSBjcmVkZW50aWFsczogeyB0b2tlbjogKiwgc2VjcmV0OiAqIH0uIElmIHByZXNlbnQsIHRoaXMgZmllbGRcbi8vICAgICAgICBpbmRpY2F0ZXMgdGhhdCB0aGUgbG9naW4gd2FzIHN1Y2Nlc3NmdWwuIFJldHVybiB0aGVzZSB2YWx1ZXNcbi8vICAgICAgICB0byB0aGUgY2xpZW50LCB3aG8gY2FuIHVzZSB0aGVtIHRvIGxvZyBpbiBvdmVyIEREUC4gSWZcbi8vICAgICAgICBwcmVzZW50LCB0aGUgdmFsdWVzIGhhdmUgYmVlbiBjaGVja2VkIGFnYWluc3QgYSBsaW1pdGVkXG4vLyAgICAgICAgY2hhcmFjdGVyIHNldCBhbmQgYXJlIHNhZmUgdG8gaW5jbHVkZSBpbiBIVE1MLlxuLy8gICAgICAtIGVycm9yOiBpZiBwcmVzZW50LCBhIHN0cmluZyBvciBFcnJvciBpbmRpY2F0aW5nIGFuIGVycm9yIHRoYXRcbi8vICAgICAgICBvY2N1cnJlZCBkdXJpbmcgdGhlIGxvZ2luLiBUaGlzIGNhbiBjb21lIGZyb20gdGhlIGNsaWVudCBhbmRcbi8vICAgICAgICBzbyBzaG91bGRuJ3QgYmUgdHJ1c3RlZCBmb3Igc2VjdXJpdHkgZGVjaXNpb25zIG9yIGluY2x1ZGVkIGluXG4vLyAgICAgICAgdGhlIHJlc3BvbnNlIHdpdGhvdXQgc2FuaXRpemluZyBpdCBmaXJzdC4gT25seSBvbmUgb2YgYGVycm9yYFxuLy8gICAgICAgIG9yIGBjcmVkZW50aWFsc2Agc2hvdWxkIGJlIHNldC5cbk9BdXRoLl9lbmRPZkxvZ2luUmVzcG9uc2UgPSAocmVzLCBkZXRhaWxzKSA9PiB7XG4gIHJlcy53cml0ZUhlYWQoMjAwLCB7J0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnfSk7XG5cbiAgbGV0IHJlZGlyZWN0VXJsO1xuICBpZiAoZGV0YWlscy5sb2dpblN0eWxlID09PSAncmVkaXJlY3QnKSB7XG4gICAgcmVkaXJlY3RVcmwgPSBPQXV0aC5fc3RhdGVGcm9tUXVlcnkoZGV0YWlscy5xdWVyeSkucmVkaXJlY3RVcmw7XG4gICAgY29uc3QgYXBwSG9zdCA9IE1ldGVvci5hYnNvbHV0ZVVybCgpO1xuICAgIGlmIChcbiAgICAgICFNZXRlb3Iuc2V0dGluZ3M/LnBhY2thZ2VzPy5vYXV0aD8uZGlzYWJsZUNoZWNrUmVkaXJlY3RVcmxPcmlnaW4gJiZcbiAgICAgIE9BdXRoLl9jaGVja1JlZGlyZWN0VXJsT3JpZ2luKHJlZGlyZWN0VXJsKSkge1xuICAgICAgZGV0YWlscy5lcnJvciA9IGByZWRpcmVjdFVybCAoJHtyZWRpcmVjdFVybH1gICtcbiAgICAgICAgYCkgaXMgbm90IG9uIHRoZSBzYW1lIGhvc3QgYXMgdGhlIGFwcCAoJHthcHBIb3N0fSlgO1xuICAgICAgcmVkaXJlY3RVcmwgPSBhcHBIb3N0O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlzQ29yZG92YSA9IE9BdXRoLl9pc0NvcmRvdmFGcm9tUXVlcnkoZGV0YWlscy5xdWVyeSk7XG5cbiAgaWYgKGRldGFpbHMuZXJyb3IpIHtcbiAgICBMb2cud2FybihcIkVycm9yIGluIE9BdXRoIFNlcnZlcjogXCIgK1xuICAgICAgICAgICAgIChkZXRhaWxzLmVycm9yIGluc3RhbmNlb2YgRXJyb3IgP1xuICAgICAgICAgICAgICBkZXRhaWxzLmVycm9yLm1lc3NhZ2UgOiBkZXRhaWxzLmVycm9yKSk7XG4gICAgcmVzLmVuZChyZW5kZXJFbmRPZkxvZ2luUmVzcG9uc2Uoe1xuICAgICAgbG9naW5TdHlsZTogZGV0YWlscy5sb2dpblN0eWxlLFxuICAgICAgc2V0Q3JlZGVudGlhbFRva2VuOiBmYWxzZSxcbiAgICAgIHJlZGlyZWN0VXJsLFxuICAgICAgaXNDb3Jkb3ZhLFxuICAgIH0pLCBcInV0Zi04XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIHdlIGhhdmUgYSBjcmVkZW50aWFsU2VjcmV0LCByZXBvcnQgaXQgYmFjayB0byB0aGUgcGFyZW50XG4gIC8vIHdpbmRvdywgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBjcmVkZW50aWFsVG9rZW4uIFRoZSBwYXJlbnQgd2luZG93XG4gIC8vIHVzZXMgdGhlIGNyZWRlbnRpYWxUb2tlbiBhbmQgY3JlZGVudGlhbFNlY3JldCB0byBsb2cgaW4gb3ZlciBERFAuXG4gIHJlcy5lbmQocmVuZGVyRW5kT2ZMb2dpblJlc3BvbnNlKHtcbiAgICBsb2dpblN0eWxlOiBkZXRhaWxzLmxvZ2luU3R5bGUsXG4gICAgc2V0Q3JlZGVudGlhbFRva2VuOiB0cnVlLFxuICAgIGNyZWRlbnRpYWxUb2tlbjogZGV0YWlscy5jcmVkZW50aWFscy50b2tlbixcbiAgICBjcmVkZW50aWFsU2VjcmV0OiBkZXRhaWxzLmNyZWRlbnRpYWxzLnNlY3JldCxcbiAgICByZWRpcmVjdFVybCxcbiAgICBpc0NvcmRvdmEsXG4gIH0pLCBcInV0Zi04XCIpO1xufTtcblxuXG5jb25zdCBPQXV0aEVuY3J5cHRpb24gPSBQYWNrYWdlW1wib2F1dGgtZW5jcnlwdGlvblwiXSAmJiBQYWNrYWdlW1wib2F1dGgtZW5jcnlwdGlvblwiXS5PQXV0aEVuY3J5cHRpb247XG5cbmNvbnN0IHVzaW5nT0F1dGhFbmNyeXB0aW9uID0gKCkgPT5cbiAgT0F1dGhFbmNyeXB0aW9uICYmIE9BdXRoRW5jcnlwdGlvbi5rZXlJc0xvYWRlZCgpO1xuXG4vLyBFbmNyeXB0IHNlbnNpdGl2ZSBzZXJ2aWNlIGRhdGEgc3VjaCBhcyBhY2Nlc3MgdG9rZW5zIGlmIHRoZVxuLy8gXCJvYXV0aC1lbmNyeXB0aW9uXCIgcGFja2FnZSBpcyBsb2FkZWQgYW5kIHRoZSBvYXV0aCBzZWNyZXQga2V5IGhhc1xuLy8gYmVlbiBzcGVjaWZpZWQuICBSZXR1cm5zIHRoZSB1bmVuY3J5cHRlZCBwbGFpbnRleHQgb3RoZXJ3aXNlLlxuLy9cbi8vIFRoZSB1c2VyIGlkIGlzIG5vdCBzcGVjaWZpZWQgYmVjYXVzZSB0aGUgdXNlciBpc24ndCBrbm93biB5ZXQgYXRcbi8vIHRoaXMgcG9pbnQgaW4gdGhlIG9hdXRoIGF1dGhlbnRpY2F0aW9uIHByb2Nlc3MuICBBZnRlciB0aGUgb2F1dGhcbi8vIGF1dGhlbnRpY2F0aW9uIHByb2Nlc3MgY29tcGxldGVzIHRoZSBlbmNyeXB0ZWQgc2VydmljZSBkYXRhIGZpZWxkc1xuLy8gd2lsbCBiZSByZS1lbmNyeXB0ZWQgd2l0aCB0aGUgdXNlciBpZCBpbmNsdWRlZCBiZWZvcmUgaW5zZXJ0aW5nIHRoZVxuLy8gc2VydmljZSBkYXRhIGludG8gdGhlIHVzZXIgZG9jdW1lbnQuXG4vL1xuT0F1dGguc2VhbFNlY3JldCA9IHBsYWludGV4dCA9PiB7XG4gIGlmICh1c2luZ09BdXRoRW5jcnlwdGlvbigpKVxuICAgIHJldHVybiBPQXV0aEVuY3J5cHRpb24uc2VhbChwbGFpbnRleHQpO1xuICBlbHNlXG4gICAgcmV0dXJuIHBsYWludGV4dDtcbn07XG5cbi8vIFVuZW5jcnlwdCBhIHNlcnZpY2UgZGF0YSBmaWVsZCwgaWYgdGhlIFwib2F1dGgtZW5jcnlwdGlvblwiXG4vLyBwYWNrYWdlIGlzIGxvYWRlZCBhbmQgdGhlIGZpZWxkIGlzIGVuY3J5cHRlZC5cbi8vXG4vLyBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIFwib2F1dGgtZW5jcnlwdGlvblwiIHBhY2thZ2UgaXMgbG9hZGVkIGFuZCB0aGVcbi8vIGZpZWxkIGlzIGVuY3J5cHRlZCwgYnV0IHRoZSBvYXV0aCBzZWNyZXQga2V5IGhhc24ndCBiZWVuIHNwZWNpZmllZC5cbi8vXG5PQXV0aC5vcGVuU2VjcmV0ID0gKG1heWJlU2VjcmV0LCB1c2VySWQpID0+IHtcbiAgaWYgKCFQYWNrYWdlW1wib2F1dGgtZW5jcnlwdGlvblwiXSB8fCAhT0F1dGhFbmNyeXB0aW9uLmlzU2VhbGVkKG1heWJlU2VjcmV0KSlcbiAgICByZXR1cm4gbWF5YmVTZWNyZXQ7XG5cbiAgcmV0dXJuIE9BdXRoRW5jcnlwdGlvbi5vcGVuKG1heWJlU2VjcmV0LCB1c2VySWQpO1xufTtcblxuLy8gVW5lbmNyeXB0IGZpZWxkcyBpbiB0aGUgc2VydmljZSBkYXRhIG9iamVjdC5cbi8vXG5PQXV0aC5vcGVuU2VjcmV0cyA9IChzZXJ2aWNlRGF0YSwgdXNlcklkKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBPYmplY3Qua2V5cyhzZXJ2aWNlRGF0YSkuZm9yRWFjaChrZXkgPT5cbiAgICByZXN1bHRba2V5XSA9IE9BdXRoLm9wZW5TZWNyZXQoc2VydmljZURhdGFba2V5XSwgdXNlcklkKVxuICApO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuT0F1dGguX2FkZFZhbHVlc1RvUXVlcnlQYXJhbXMgPSAoXG4gIHZhbHVlcyA9IHt9LFxuICBxdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuKSA9PiB7XG4gIE9iamVjdC5lbnRyaWVzKHZhbHVlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgcXVlcnlQYXJhbXMuc2V0KGtleSwgYCR7dmFsdWV9YCk7XG4gIH0pO1xuICByZXR1cm4gcXVlcnlQYXJhbXM7XG59O1xuXG5PQXV0aC5fZmV0Y2ggPSBhc3luYyAoXG4gIHVybCxcbiAgbWV0aG9kID0gJ0dFVCcsXG4gIHsgaGVhZGVycyA9IHt9LCBxdWVyeVBhcmFtcyA9IHt9LCBib2R5LCAuLi5vcHRpb25zIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IHVybFdpdGhQYXJhbXMgPSBuZXcgVVJMKHVybCk7XG5cbiAgT0F1dGguX2FkZFZhbHVlc1RvUXVlcnlQYXJhbXMocXVlcnlQYXJhbXMsIHVybFdpdGhQYXJhbXMuc2VhcmNoUGFyYW1zKTtcblxuICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgIGhlYWRlcnMsXG4gICAgLi4uKGJvZHkgPyB7IGJvZHkgfSA6IHt9KSxcbiAgICAuLi5vcHRpb25zLFxuICB9O1xuICByZXR1cm4gZmV0Y2godXJsV2l0aFBhcmFtcy50b1N0cmluZygpLCByZXF1ZXN0T3B0aW9ucyk7XG59O1xuIiwiLy9cbi8vIFdoZW4gYW4gb2F1dGggcmVxdWVzdCBpcyBtYWRlLCBNZXRlb3IgcmVjZWl2ZXMgb2F1dGggY3JlZGVudGlhbHNcbi8vIGluIG9uZSBicm93c2VyIHRhYiwgYW5kIHRlbXBvcmFyaWx5IHBlcnNpc3RzIHRoZW0gd2hpbGUgdGhhdFxuLy8gdGFiIGlzIGNsb3NlZCwgdGhlbiByZXRyaWV2ZXMgdGhlbSBpbiB0aGUgYnJvd3NlciB0YWIgdGhhdFxuLy8gaW5pdGlhdGVkIHRoZSBjcmVkZW50aWFsIHJlcXVlc3QuXG4vL1xuLy8gX3BlbmRpbmdDcmVkZW50aWFscyBpcyB0aGUgc3RvcmFnZSBtZWNoYW5pc20gdXNlZCB0byBzaGFyZSB0aGVcbi8vIGNyZWRlbnRpYWwgYmV0d2VlbiB0aGUgMiB0YWJzXG4vL1xuXG5cbi8vIENvbGxlY3Rpb24gY29udGFpbmluZyBwZW5kaW5nIGNyZWRlbnRpYWxzIG9mIG9hdXRoIGNyZWRlbnRpYWwgcmVxdWVzdHNcbi8vIEhhcyBrZXksIGNyZWRlbnRpYWwsIGFuZCBjcmVhdGVkQXQgZmllbGRzLlxuT0F1dGguX3BlbmRpbmdDcmVkZW50aWFscyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFxuICBcIm1ldGVvcl9vYXV0aF9wZW5kaW5nQ3JlZGVudGlhbHNcIiwge1xuICAgIF9wcmV2ZW50QXV0b3B1Ymxpc2g6IHRydWVcbiAgfSk7XG5cbk9BdXRoLl9wZW5kaW5nQ3JlZGVudGlhbHMuY3JlYXRlSW5kZXgoJ2tleScsIHsgdW5pcXVlOiB0cnVlIH0pO1xuT0F1dGguX3BlbmRpbmdDcmVkZW50aWFscy5jcmVhdGVJbmRleCgnY3JlZGVudGlhbFNlY3JldCcpO1xuT0F1dGguX3BlbmRpbmdDcmVkZW50aWFscy5jcmVhdGVJbmRleCgnY3JlYXRlZEF0Jyk7XG5cblxuXG4vLyBQZXJpb2RpY2FsbHkgY2xlYXIgb2xkIGVudHJpZXMgdGhhdCB3ZXJlIG5ldmVyIHJldHJpZXZlZFxuY29uc3QgX2NsZWFuU3RhbGVSZXN1bHRzID0gKCkgPT4ge1xuICAvLyBSZW1vdmUgY3JlZGVudGlhbHMgb2xkZXIgdGhhbiAxIG1pbnV0ZVxuICBjb25zdCB0aW1lQ3V0b2ZmID0gbmV3IERhdGUoKTtcbiAgdGltZUN1dG9mZi5zZXRNaW51dGVzKHRpbWVDdXRvZmYuZ2V0TWludXRlcygpIC0gMSk7XG4gIE9BdXRoLl9wZW5kaW5nQ3JlZGVudGlhbHMucmVtb3ZlKHsgY3JlYXRlZEF0OiB7ICRsdDogdGltZUN1dG9mZiB9IH0pO1xufTtcbmNvbnN0IF9jbGVhbnVwSGFuZGxlID0gTWV0ZW9yLnNldEludGVydmFsKF9jbGVhblN0YWxlUmVzdWx0cywgNjAgKiAxMDAwKTtcblxuXG4vLyBTdG9yZXMgdGhlIGtleSBhbmQgY3JlZGVudGlhbCBpbiB0aGUgX3BlbmRpbmdDcmVkZW50aWFscyBjb2xsZWN0aW9uLlxuLy8gV2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYGtleWAgaXMgbm90IGEgc3RyaW5nLlxuLy9cbi8vIEBwYXJhbSBrZXkge3N0cmluZ31cbi8vIEBwYXJhbSBjcmVkZW50aWFsIHtPYmplY3R9ICAgVGhlIGNyZWRlbnRpYWwgdG8gc3RvcmVcbi8vIEBwYXJhbSBjcmVkZW50aWFsU2VjcmV0IHtzdHJpbmd9IEEgc2VjcmV0IHRoYXQgbXVzdCBiZSBwcmVzZW50ZWQgaW5cbi8vICAgYWRkaXRpb24gdG8gdGhlIGBrZXlgIHRvIHJldHJpZXZlIHRoZSBjcmVkZW50aWFsXG4vL1xuT0F1dGguX3N0b3JlUGVuZGluZ0NyZWRlbnRpYWwgPSAoa2V5LCBjcmVkZW50aWFsLCBjcmVkZW50aWFsU2VjcmV0ID0gbnVsbCkgPT4ge1xuICBjaGVjayhrZXksIFN0cmluZyk7XG4gIGNoZWNrKGNyZWRlbnRpYWxTZWNyZXQsIE1hdGNoLk1heWJlKFN0cmluZykpO1xuXG4gIGlmIChjcmVkZW50aWFsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBjcmVkZW50aWFsID0gc3RvcmFibGVFcnJvcihjcmVkZW50aWFsKTtcbiAgfSBlbHNlIHtcbiAgICBjcmVkZW50aWFsID0gT0F1dGguc2VhbFNlY3JldChjcmVkZW50aWFsKTtcbiAgfVxuXG4gIC8vIFdlIGRvIGFuIHVwc2VydCBoZXJlIGluc3RlYWQgb2YgYW4gaW5zZXJ0IGluIGNhc2UgdGhlIHVzZXIgaGFwcGVuc1xuICAvLyB0byBzb21laG93IHNlbmQgdGhlIHNhbWUgYHN0YXRlYCBwYXJhbWV0ZXIgdHdpY2UgZHVyaW5nIGFuIE9BdXRoXG4gIC8vIGxvZ2luOyB3ZSBkb24ndCB3YW50IGEgZHVwbGljYXRlIGtleSBlcnJvci5cbiAgT0F1dGguX3BlbmRpbmdDcmVkZW50aWFscy51cHNlcnQoe1xuICAgIGtleSxcbiAgfSwge1xuICAgIGtleSxcbiAgICBjcmVkZW50aWFsLFxuICAgIGNyZWRlbnRpYWxTZWNyZXQsXG4gICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXG4gIH0pO1xufTtcblxuXG4vLyBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgYSBjcmVkZW50aWFsIGZyb20gdGhlIF9wZW5kaW5nQ3JlZGVudGlhbHMgY29sbGVjdGlvblxuLy9cbi8vIEBwYXJhbSBrZXkge3N0cmluZ31cbi8vIEBwYXJhbSBjcmVkZW50aWFsU2VjcmV0IHtzdHJpbmd9XG4vL1xuT0F1dGguX3JldHJpZXZlUGVuZGluZ0NyZWRlbnRpYWwgPSAoa2V5LCBjcmVkZW50aWFsU2VjcmV0ID0gbnVsbCkgPT4ge1xuICBjaGVjayhrZXksIFN0cmluZyk7XG5cbiAgY29uc3QgcGVuZGluZ0NyZWRlbnRpYWwgPSBPQXV0aC5fcGVuZGluZ0NyZWRlbnRpYWxzLmZpbmRPbmUoe1xuICAgIGtleSxcbiAgICBjcmVkZW50aWFsU2VjcmV0LFxuICB9KTtcblxuICBpZiAocGVuZGluZ0NyZWRlbnRpYWwpIHtcbiAgICBPQXV0aC5fcGVuZGluZ0NyZWRlbnRpYWxzLnJlbW92ZSh7IF9pZDogcGVuZGluZ0NyZWRlbnRpYWwuX2lkIH0pO1xuICAgIGlmIChwZW5kaW5nQ3JlZGVudGlhbC5jcmVkZW50aWFsLmVycm9yKVxuICAgICAgcmV0dXJuIHJlY3JlYXRlRXJyb3IocGVuZGluZ0NyZWRlbnRpYWwuY3JlZGVudGlhbC5lcnJvcik7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIE9BdXRoLm9wZW5TZWNyZXQocGVuZGluZ0NyZWRlbnRpYWwuY3JlZGVudGlhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuXG4vLyBDb252ZXJ0IGFuIEVycm9yIGludG8gYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBtb25nb1xuLy8gTm90ZTogQSBNZXRlb3IuRXJyb3IgaXMgcmVjb25zdHJ1Y3RlZCBhcyBhIE1ldGVvci5FcnJvclxuLy8gQWxsIG90aGVyIGVycm9yIGNsYXNzZXMgYXJlIHJlY29uc3RydWN0ZWQgYXMgYSBwbGFpbiBFcnJvci5cbi8vIFRPRE86IENhbiB3ZSBkbyB0aGlzIG1vcmUgc2ltcGx5IHdpdGggRUpTT04/XG5jb25zdCBzdG9yYWJsZUVycm9yID0gZXJyb3IgPT4ge1xuICBjb25zdCBwbGFpbk9iamVjdCA9IHt9O1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnJvcikuZm9yRWFjaChcbiAgICBrZXkgPT4gcGxhaW5PYmplY3Rba2V5XSA9IGVycm9yW2tleV1cbiAgKTtcblxuICAvLyBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgaXQncyBhIE1ldGVvci5FcnJvclxuICBpZihlcnJvciBpbnN0YW5jZW9mIE1ldGVvci5FcnJvcikge1xuICAgIHBsYWluT2JqZWN0WydtZXRlb3JFcnJvciddID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB7IGVycm9yOiBwbGFpbk9iamVjdCB9O1xufTtcblxuLy8gQ3JlYXRlIGFuIGVycm9yIGZyb20gdGhlIGVycm9yIGZvcm1hdCBzdG9yZWQgaW4gbW9uZ29cbmNvbnN0IHJlY3JlYXRlRXJyb3IgPSBlcnJvckRvYyA9PiB7XG4gIGxldCBlcnJvcjtcblxuICBpZiAoZXJyb3JEb2MubWV0ZW9yRXJyb3IpIHtcbiAgICBlcnJvciA9IG5ldyBNZXRlb3IuRXJyb3IoKTtcbiAgICBkZWxldGUgZXJyb3JEb2MubWV0ZW9yRXJyb3I7XG4gIH0gZWxzZSB7XG4gICAgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgfVxuXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycm9yRG9jKS5mb3JFYWNoKGtleSA9PlxuICAgIGVycm9yW2tleV0gPSBlcnJvckRvY1trZXldXG4gICk7XG5cbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIk9BdXRoLl9zdG9yYWdlVG9rZW5QcmVmaXggPSBcIk1ldGVvci5vYXV0aC5jcmVkZW50aWFsU2VjcmV0LVwiO1xuXG5PQXV0aC5fcmVkaXJlY3RVcmkgPSAoc2VydmljZU5hbWUsIGNvbmZpZywgcGFyYW1zLCBhYnNvbHV0ZVVybE9wdGlvbnMpID0+IHtcbiAgLy8gQ2xvbmUgYmVjYXVzZSB3ZSdyZSBnb2luZyB0byBtdXRhdGUgJ3BhcmFtcycuIFRoZSAnY29yZG92YScgYW5kXG4gIC8vICdhbmRyb2lkJyBwYXJhbWV0ZXJzIGFyZSBvbmx5IHVzZWQgZm9yIHBpY2tpbmcgdGhlIGhvc3Qgb2YgdGhlXG4gIC8vIHJlZGlyZWN0IFVSTCwgYW5kIG5vdCBhY3R1YWxseSBpbmNsdWRlZCBpbiB0aGUgcmVkaXJlY3QgVVJMIGl0c2VsZi5cbiAgbGV0IGlzQ29yZG92YSA9IGZhbHNlO1xuICBsZXQgaXNBbmRyb2lkID0gZmFsc2U7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBwYXJhbXMgPSB7IC4uLnBhcmFtcyB9O1xuICAgIGlzQ29yZG92YSA9IHBhcmFtcy5jb3Jkb3ZhO1xuICAgIGlzQW5kcm9pZCA9IHBhcmFtcy5hbmRyb2lkO1xuICAgIGRlbGV0ZSBwYXJhbXMuY29yZG92YTtcbiAgICBkZWxldGUgcGFyYW1zLmFuZHJvaWQ7XG4gICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBwYXJhbXMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKE1ldGVvci5pc1NlcnZlciAmJiBpc0NvcmRvdmEpIHtcbiAgICBjb25zdCB1cmwgPSBOcG0ucmVxdWlyZSgndXJsJyk7XG4gICAgbGV0IHJvb3RVcmwgPSBwcm9jZXNzLmVudi5NT0JJTEVfUk9PVF9VUkwgfHxcbiAgICAgICAgICBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLlJPT1RfVVJMO1xuXG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgLy8gTWF0Y2ggdGhlIHJlcGxhY2UgdGhhdCB3ZSBkbyBpbiBjb3Jkb3ZhIGJvaWxlcnBsYXRlXG4gICAgICAvLyAoYm9pbGVycGxhdGUtZ2VuZXJhdG9yIHBhY2thZ2UpLlxuICAgICAgLy8gWFhYIE1heWJlIHdlIHNob3VsZCBwdXQgdGhpcyBpbiBhIHNlcGFyYXRlIHBhY2thZ2Ugb3Igc29tZXRoaW5nXG4gICAgICAvLyB0aGF0IGlzIHVzZWQgaGVyZSBhbmQgYnkgYm9pbGVycGxhdGUtZ2VuZXJhdG9yPyBPciBtYXliZVxuICAgICAgLy8gYE1ldGVvci5hYnNvbHV0ZVVybGAgc2hvdWxkIGtub3cgaG93IHRvIGRvIHRoaXM/XG4gICAgICBjb25zdCBwYXJzZWRSb290VXJsID0gdXJsLnBhcnNlKHJvb3RVcmwpO1xuICAgICAgaWYgKHBhcnNlZFJvb3RVcmwuaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAgICAgcGFyc2VkUm9vdFVybC5ob3N0bmFtZSA9IFwiMTAuMC4yLjJcIjtcbiAgICAgICAgZGVsZXRlIHBhcnNlZFJvb3RVcmwuaG9zdDtcbiAgICAgIH1cbiAgICAgIHJvb3RVcmwgPSB1cmwuZm9ybWF0KHBhcnNlZFJvb3RVcmwpO1xuICAgIH1cblxuICAgIGFic29sdXRlVXJsT3B0aW9ucyA9IHtcbiAgICAgIC4uLmFic29sdXRlVXJsT3B0aW9ucyxcbiAgICAgIC8vIEZvciBDb3Jkb3ZhIGNsaWVudHMsIHJlZGlyZWN0IHRvIHRoZSBzcGVjaWFsIENvcmRvdmEgcm9vdCB1cmxcbiAgICAgIC8vIChsaWtlbHkgYSBsb2NhbCBJUCBpbiBkZXZlbG9wbWVudCBtb2RlKS5cbiAgICAgIHJvb3RVcmwsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBVUkwuX2NvbnN0cnVjdFVybChcbiAgICBNZXRlb3IuYWJzb2x1dGVVcmwoYF9vYXV0aC8ke3NlcnZpY2VOYW1lfWAsIGFic29sdXRlVXJsT3B0aW9ucyksXG4gICAgbnVsbCxcbiAgICBwYXJhbXMpO1xufTtcbiJdfQ==
