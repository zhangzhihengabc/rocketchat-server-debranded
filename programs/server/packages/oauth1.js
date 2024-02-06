(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Random = Package.random.Random;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var OAuth = Package.oauth.OAuth;
var check = Package.check.check;
var Match = Package.check.Match;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var params, OAuth1Binding, OAuth1Test;

var require = meteorInstall({"node_modules":{"meteor":{"oauth1":{"oauth1_binding.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/oauth1/oauth1_binding.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
module.export({
  OAuth1Binding: () => OAuth1Binding
});
let crypto;
module.link("crypto", {
  default(v) {
    crypto = v;
  }
}, 0);
let querystring;
module.link("querystring", {
  default(v) {
    querystring = v;
  }
}, 1);
let urlModule;
module.link("url", {
  default(v) {
    urlModule = v;
  }
}, 2);
class OAuth1Binding {
  constructor(config, urls) {
    this._config = config;
    this._urls = urls;
  }
  prepareRequestToken(callbackUrl) {
    return Promise.asyncApply(() => {
      const headers = this._buildHeader({
        oauth_callback: callbackUrl
      });
      const response = Promise.await(this._call({
        method: 'POST',
        url: this._urls.requestToken,
        headers
      }));
      const tokens = querystring.parse(response.content);
      if (!tokens.oauth_callback_confirmed) throw Object.assign(new Error("oauth_callback_confirmed false when requesting oauth1 token"), {
        response: response
      });
      this.requestToken = tokens.oauth_token;
      this.requestTokenSecret = tokens.oauth_token_secret;
    });
  }
  prepareAccessToken(query, requestTokenSecret) {
    return Promise.asyncApply(() => {
      // support implementations that use request token secrets. This is
      // read by this._call.
      //
      // XXX make it a param to call, not something stashed on self? It's
      // kinda confusing right now, everything except this is passed as
      // arguments, but this is stored.
      if (requestTokenSecret) this.accessTokenSecret = requestTokenSecret;
      const headers = this._buildHeader({
        oauth_token: query.oauth_token,
        oauth_verifier: query.oauth_verifier
      });
      const response = Promise.await(this._call({
        method: 'POST',
        url: this._urls.accessToken,
        headers
      }));
      const tokens = querystring.parse(response.content);
      if (!tokens.oauth_token || !tokens.oauth_token_secret) {
        const error = new Error("missing oauth token or secret");
        // We provide response only if no token is available, we do not want to leak any tokens
        if (!tokens.oauth_token && !tokens.oauth_token_secret) {
          Object.assign(error, {
            response: response
          });
        }
        throw error;
      }
      this.accessToken = tokens.oauth_token;
      this.accessTokenSecret = tokens.oauth_token_secret;
    });
  }
  callAsync(method, url, params, callback) {
    return Promise.asyncApply(() => {
      const headers = this._buildHeader({
        oauth_token: this.accessToken
      });
      if (!params) {
        params = {};
      }
      return this._call({
        method,
        url,
        headers,
        params,
        callback
      });
    });
  }
  getAsync(url, params, callback) {
    return Promise.asyncApply(() => {
      return this.callAsync('GET', url, params, callback);
    });
  }
  postAsync(url, params, callback) {
    return Promise.asyncApply(() => {
      return this.callAsync('POST', url, params, callback);
    });
  }
  call(method, url, params, callback) {
    // Require changes when remove Fibers. Exposed to public api.
    return Promise.await(this.callAsync(method, url, params, callback));
  }
  get(url, params, callback) {
    // Require changes when remove Fibers. Exposed to public api.
    return this.call('GET', url, params, callback);
  }
  post(url, params, callback) {
    // Require changes when remove Fibers. Exposed to public api.
    return this.call('POST', url, params, callback);
  }
  _buildHeader(headers) {
    return _objectSpread({
      oauth_consumer_key: this._config.consumerKey,
      oauth_nonce: Random.secret().replace(/\W/g, ''),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: (new Date().valueOf() / 1000).toFixed().toString(),
      oauth_version: '1.0'
    }, headers);
  }
  _getSignature(method, url, rawHeaders, accessTokenSecret, params) {
    const headers = this._encodeHeader(_objectSpread(_objectSpread({}, rawHeaders), params));
    const parameters = Object.keys(headers).map(key => "".concat(key, "=").concat(headers[key])).sort().join('&');
    const signatureBase = [method, this._encodeString(url), this._encodeString(parameters)].join('&');
    const secret = OAuth.openSecret(this._config.secret);
    let signingKey = "".concat(this._encodeString(secret), "&");
    if (accessTokenSecret) signingKey += this._encodeString(accessTokenSecret);
    return crypto.createHmac('SHA1', signingKey).update(signatureBase).digest('base64');
  }
  _call(_ref) {
    return Promise.asyncApply(() => {
      let {
        method,
        url,
        headers = {},
        params = {},
        callback
      } = _ref;
      // all URLs to be functions to support parameters/customization
      if (typeof url === "function") {
        url = url(this);
      }

      // Extract all query string parameters from the provided URL
      const parsedUrl = urlModule.parse(url, true);
      // Merge them in a way that params given to the method call have precedence
      params = _objectSpread(_objectSpread({}, parsedUrl.query), params);

      // Reconstruct the URL back without any query string parameters
      // (they are now in params)
      parsedUrl.query = {};
      parsedUrl.search = '';
      url = urlModule.format(parsedUrl);

      // Get the signature
      headers.oauth_signature = this._getSignature(method, url, headers, this.accessTokenSecret, params);

      // Make a authorization string according to oauth1 spec
      const authString = this._getAuthHeaderString(headers);
      // Make signed request
      return OAuth._fetch(url, method, _objectSpread({
        headers: _objectSpread({
          Authorization: authString
        }, method.toUpperCase() === 'POST' ? {
          'Content-Type': 'application/x-www-form-urlencoded'
        } : {})
      }, method.toUpperCase() === 'POST' ? {
        body: OAuth._addValuesToQueryParams(params).toString()
      } : {
        queryParams: params
      })).then(res => res.text().then(content => {
        const responseHeaders = Array.from(res.headers.entries()).reduce((acc, _ref2) => {
          let [key, val] = _ref2;
          return _objectSpread(_objectSpread({}, acc), {}, {
            [key.toLowerCase()]: val
          });
        }, {});
        const data = responseHeaders['content-type'].includes('application/json') ? JSON.parse(content) : undefined;
        return {
          content: data ? '' : content,
          data,
          headers: _objectSpread(_objectSpread({}, responseHeaders), {}, {
            nonce: headers.oauth_nonce
          }),
          redirected: res.redirected,
          ok: res.ok,
          statusCode: res.status
        };
      })).then(response => {
        if (callback) {
          callback(undefined, response);
        }
        return response;
      }).catch(err => {
        if (callback) {
          callback(err);
        }
        console.log({
          err
        });
        throw Object.assign(new Error("Failed to send OAuth1 request to ".concat(url, ". ").concat(err.message)), {
          response: err.response
        });
      });
    });
  }
  _encodeHeader(header) {
    return Object.keys(header).reduce((memo, key) => {
      memo[this._encodeString(key)] = this._encodeString(header[key]);
      return memo;
    }, {});
  }
  _encodeString(str) {
    return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
  }
  _getAuthHeaderString(headers) {
    return 'OAuth ' + Object.keys(headers).map(key => "".concat(this._encodeString(key), "=\"").concat(this._encodeString(headers[key]), "\"")).sort().join(', ');
  }
}
;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"oauth1_server.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/oauth1/oauth1_server.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
!function (module1) {
  let _objectSpread;
  module1.link("@babel/runtime/helpers/objectSpread2", {
    default(v) {
      _objectSpread = v;
    }
  }, 0);
  let url;
  module1.link("url", {
    default(v) {
      url = v;
    }
  }, 0);
  let OAuth1Binding;
  module1.link("./oauth1_binding", {
    OAuth1Binding(v) {
      OAuth1Binding = v;
    }
  }, 1);
  OAuth._queryParamsWithAuthTokenUrl = function (authUrl, oauthBinding) {
    let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let whitelistedQueryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    const redirectUrlObj = url.parse(authUrl, true);
    Object.assign(redirectUrlObj.query, whitelistedQueryParams.reduce((prev, param) => params.query[param] ? _objectSpread(_objectSpread({}, prev), {}, {
      param: params.query[param]
    }) : prev, {}), {
      oauth_token: oauthBinding.requestToken
    });

    // Clear the `search` so it is rebuilt by Node's `url` from the `query` above.
    // Using previous versions of the Node `url` module, this was just set to ""
    // However, Node 6 docs seem to indicate that this should be `undefined`.
    delete redirectUrlObj.search;

    // Reconstruct the URL back with provided query parameters merged with oauth_token
    return url.format(redirectUrlObj);
  };

  // connect middleware
  OAuth._requestHandlers['1'] = (service, query, res) => Promise.asyncApply(() => {
    const config = ServiceConfiguration.configurations.findOne({
      service: service.serviceName
    });
    if (!config) {
      throw new ServiceConfiguration.ConfigError(service.serviceName);
    }
    const {
      urls
    } = service;
    const oauthBinding = new OAuth1Binding(config, urls);
    let credentialSecret;
    if (query.requestTokenAndRedirect) {
      // step 1 - get and store a request token
      const callbackUrl = OAuth._redirectUri(service.serviceName, config, {
        state: query.state,
        cordova: query.cordova === "true",
        android: query.android === "true"
      });

      // Get a request token to start auth process
      Promise.await(oauthBinding.prepareRequestToken(callbackUrl));

      // Keep track of request token so we can verify it on the next step
      OAuth._storeRequestToken(OAuth._credentialTokenFromQuery(query), oauthBinding.requestToken, oauthBinding.requestTokenSecret);

      // support for scope/name parameters
      let redirectUrl;
      const authParams = {
        query
      };
      if (typeof urls.authenticate === "function") {
        redirectUrl = urls.authenticate(oauthBinding, authParams);
      } else {
        redirectUrl = OAuth._queryParamsWithAuthTokenUrl(urls.authenticate, oauthBinding, authParams);
      }

      // redirect to provider login, which will redirect back to "step 2" below

      res.writeHead(302, {
        'Location': redirectUrl
      });
      res.end();
    } else {
      // step 2, redirected from provider login - store the result
      // and close the window to allow the login handler to proceed

      // Get the user's request token so we can verify it and clear it
      const requestTokenInfo = OAuth._retrieveRequestToken(OAuth._credentialTokenFromQuery(query));
      if (!requestTokenInfo) {
        throw new Error("Unable to retrieve request token");
      }

      // Verify user authorized access and the oauth_token matches
      // the requestToken from previous step
      if (query.oauth_token && query.oauth_token === requestTokenInfo.requestToken) {
        // Prepare the login results before returning.  This way the
        // subsequent call to the `login` method will be immediate.

        // Get the access token for signing requests
        Promise.await(oauthBinding.prepareAccessToken(query, requestTokenInfo.requestTokenSecret));

        // Run service-specific handler.
        const oauthResult = Promise.await(service.handleOauthRequest(oauthBinding, {
          query: query
        }));
        const credentialToken = OAuth._credentialTokenFromQuery(query);
        credentialSecret = Random.secret();

        // Store the login result so it can be retrieved in another
        // browser tab by the result handler
        OAuth._storePendingCredential(credentialToken, {
          serviceName: service.serviceName,
          serviceData: oauthResult.serviceData,
          options: oauthResult.options
        }, credentialSecret);
      }

      // Either close the window, redirect, or render nothing
      // if all else fails
      OAuth._renderOauthResults(res, query, credentialSecret);
    }
  });
}.call(this, module);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"oauth1_pending_request_tokens.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/oauth1/oauth1_pending_request_tokens.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//
// _pendingRequestTokens are request tokens that have been received
// but not yet fully authorized (processed).
//
// During the oauth1 authorization process, the Meteor App opens
// a pop-up, requests a request token from the oauth1 service, and
// redirects the browser to the oauth1 service for the user
// to grant authorization.  The user is then returned to the
// Meteor Apps' callback url and the request token is verified.
//
// When Meteor Apps run on multiple servers, it's possible that
// 2 different servers may be used to generate the request token
// and to verify it in the callback once the user has authorized.
//
// For this reason, the _pendingRequestTokens are stored in the database
// so they can be shared across Meteor App servers.
//
// XXX This code is fairly similar to oauth/pending_credentials.js --
// maybe we can combine them somehow.

// Collection containing pending request tokens
// Has key, requestToken, requestTokenSecret, and createdAt fields.
OAuth._pendingRequestTokens = new Mongo.Collection("meteor_oauth_pendingRequestTokens", {
  _preventAutopublish: true
});
OAuth._pendingRequestTokens.createIndex('key', {
  unique: true
});
OAuth._pendingRequestTokens.createIndex('createdAt');

// Periodically clear old entries that never got completed
const _cleanStaleResults = () => {
  // Remove request tokens older than 5 minute
  const timeCutoff = new Date();
  timeCutoff.setMinutes(timeCutoff.getMinutes() - 5);
  OAuth._pendingRequestTokens.remove({
    createdAt: {
      $lt: timeCutoff
    }
  });
};
const _cleanupHandle = Meteor.setInterval(_cleanStaleResults, 60 * 1000);

// Stores the key and request token in the _pendingRequestTokens collection.
// Will throw an exception if `key` is not a string.
//
// @param key {string}
// @param requestToken {string}
// @param requestTokenSecret {string}
//
OAuth._storeRequestToken = (key, requestToken, requestTokenSecret) => {
  check(key, String);

  // We do an upsert here instead of an insert in case the user happens
  // to somehow send the same `state` parameter twice during an OAuth
  // login; we don't want a duplicate key error.
  OAuth._pendingRequestTokens.upsert({
    key
  }, {
    key,
    requestToken: OAuth.sealSecret(requestToken),
    requestTokenSecret: OAuth.sealSecret(requestTokenSecret),
    createdAt: new Date()
  });
};

// Retrieves and removes a request token from the _pendingRequestTokens collection
// Returns an object containing requestToken and requestTokenSecret properties
//
// @param key {string}
//
OAuth._retrieveRequestToken = key => {
  check(key, String);
  const pendingRequestToken = OAuth._pendingRequestTokens.findOne({
    key: key
  });
  if (pendingRequestToken) {
    OAuth._pendingRequestTokens.remove({
      _id: pendingRequestToken._id
    });
    return {
      requestToken: OAuth.openSecret(pendingRequestToken.requestToken),
      requestTokenSecret: OAuth.openSecret(pendingRequestToken.requestTokenSecret)
    };
  } else {
    return undefined;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/oauth1/oauth1_binding.js");
require("/node_modules/meteor/oauth1/oauth1_server.js");
require("/node_modules/meteor/oauth1/oauth1_pending_request_tokens.js");

/* Exports */
Package._define("oauth1", {
  OAuth1Binding: OAuth1Binding,
  OAuth1Test: OAuth1Test
});

})();

//# sourceURL=meteor://💻app/packages/oauth1.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb2F1dGgxL29hdXRoMV9iaW5kaW5nLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9vYXV0aDEvb2F1dGgxX3NlcnZlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb2F1dGgxL29hdXRoMV9wZW5kaW5nX3JlcXVlc3RfdG9rZW5zLmpzIl0sIm5hbWVzIjpbIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJleHBvcnQiLCJPQXV0aDFCaW5kaW5nIiwiY3J5cHRvIiwicXVlcnlzdHJpbmciLCJ1cmxNb2R1bGUiLCJjb25zdHJ1Y3RvciIsImNvbmZpZyIsInVybHMiLCJfY29uZmlnIiwiX3VybHMiLCJwcmVwYXJlUmVxdWVzdFRva2VuIiwiY2FsbGJhY2tVcmwiLCJoZWFkZXJzIiwiX2J1aWxkSGVhZGVyIiwib2F1dGhfY2FsbGJhY2siLCJyZXNwb25zZSIsIl9jYWxsIiwibWV0aG9kIiwidXJsIiwicmVxdWVzdFRva2VuIiwidG9rZW5zIiwicGFyc2UiLCJjb250ZW50Iiwib2F1dGhfY2FsbGJhY2tfY29uZmlybWVkIiwiT2JqZWN0IiwiYXNzaWduIiwiRXJyb3IiLCJvYXV0aF90b2tlbiIsInJlcXVlc3RUb2tlblNlY3JldCIsIm9hdXRoX3Rva2VuX3NlY3JldCIsInByZXBhcmVBY2Nlc3NUb2tlbiIsInF1ZXJ5IiwiYWNjZXNzVG9rZW5TZWNyZXQiLCJvYXV0aF92ZXJpZmllciIsImFjY2Vzc1Rva2VuIiwiZXJyb3IiLCJjYWxsQXN5bmMiLCJwYXJhbXMiLCJjYWxsYmFjayIsImdldEFzeW5jIiwicG9zdEFzeW5jIiwiY2FsbCIsIlByb21pc2UiLCJhd2FpdCIsImdldCIsInBvc3QiLCJvYXV0aF9jb25zdW1lcl9rZXkiLCJjb25zdW1lcktleSIsIm9hdXRoX25vbmNlIiwiUmFuZG9tIiwic2VjcmV0IiwicmVwbGFjZSIsIm9hdXRoX3NpZ25hdHVyZV9tZXRob2QiLCJvYXV0aF90aW1lc3RhbXAiLCJEYXRlIiwidmFsdWVPZiIsInRvRml4ZWQiLCJ0b1N0cmluZyIsIm9hdXRoX3ZlcnNpb24iLCJfZ2V0U2lnbmF0dXJlIiwicmF3SGVhZGVycyIsIl9lbmNvZGVIZWFkZXIiLCJwYXJhbWV0ZXJzIiwia2V5cyIsIm1hcCIsImtleSIsInNvcnQiLCJqb2luIiwic2lnbmF0dXJlQmFzZSIsIl9lbmNvZGVTdHJpbmciLCJPQXV0aCIsIm9wZW5TZWNyZXQiLCJzaWduaW5nS2V5IiwiY3JlYXRlSG1hYyIsInVwZGF0ZSIsImRpZ2VzdCIsInBhcnNlZFVybCIsInNlYXJjaCIsImZvcm1hdCIsIm9hdXRoX3NpZ25hdHVyZSIsImF1dGhTdHJpbmciLCJfZ2V0QXV0aEhlYWRlclN0cmluZyIsIl9mZXRjaCIsIkF1dGhvcml6YXRpb24iLCJ0b1VwcGVyQ2FzZSIsImJvZHkiLCJfYWRkVmFsdWVzVG9RdWVyeVBhcmFtcyIsInF1ZXJ5UGFyYW1zIiwidGhlbiIsInJlcyIsInRleHQiLCJyZXNwb25zZUhlYWRlcnMiLCJBcnJheSIsImZyb20iLCJlbnRyaWVzIiwicmVkdWNlIiwiYWNjIiwidmFsIiwidG9Mb3dlckNhc2UiLCJkYXRhIiwiaW5jbHVkZXMiLCJKU09OIiwidW5kZWZpbmVkIiwibm9uY2UiLCJyZWRpcmVjdGVkIiwib2siLCJzdGF0dXNDb2RlIiwic3RhdHVzIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImhlYWRlciIsIm1lbW8iLCJzdHIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJtb2R1bGUxIiwiX3F1ZXJ5UGFyYW1zV2l0aEF1dGhUb2tlblVybCIsImF1dGhVcmwiLCJvYXV0aEJpbmRpbmciLCJ3aGl0ZWxpc3RlZFF1ZXJ5UGFyYW1zIiwicmVkaXJlY3RVcmxPYmoiLCJwcmV2IiwicGFyYW0iLCJfcmVxdWVzdEhhbmRsZXJzIiwic2VydmljZSIsIlNlcnZpY2VDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJmaW5kT25lIiwic2VydmljZU5hbWUiLCJDb25maWdFcnJvciIsImNyZWRlbnRpYWxTZWNyZXQiLCJyZXF1ZXN0VG9rZW5BbmRSZWRpcmVjdCIsIl9yZWRpcmVjdFVyaSIsInN0YXRlIiwiY29yZG92YSIsImFuZHJvaWQiLCJfc3RvcmVSZXF1ZXN0VG9rZW4iLCJfY3JlZGVudGlhbFRva2VuRnJvbVF1ZXJ5IiwicmVkaXJlY3RVcmwiLCJhdXRoUGFyYW1zIiwiYXV0aGVudGljYXRlIiwid3JpdGVIZWFkIiwiZW5kIiwicmVxdWVzdFRva2VuSW5mbyIsIl9yZXRyaWV2ZVJlcXVlc3RUb2tlbiIsIm9hdXRoUmVzdWx0IiwiaGFuZGxlT2F1dGhSZXF1ZXN0IiwiY3JlZGVudGlhbFRva2VuIiwiX3N0b3JlUGVuZGluZ0NyZWRlbnRpYWwiLCJzZXJ2aWNlRGF0YSIsIm9wdGlvbnMiLCJfcmVuZGVyT2F1dGhSZXN1bHRzIiwiX3BlbmRpbmdSZXF1ZXN0VG9rZW5zIiwiTW9uZ28iLCJDb2xsZWN0aW9uIiwiX3ByZXZlbnRBdXRvcHVibGlzaCIsImNyZWF0ZUluZGV4IiwidW5pcXVlIiwiX2NsZWFuU3RhbGVSZXN1bHRzIiwidGltZUN1dG9mZiIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicmVtb3ZlIiwiY3JlYXRlZEF0IiwiJGx0IiwiX2NsZWFudXBIYW5kbGUiLCJNZXRlb3IiLCJzZXRJbnRlcnZhbCIsImNoZWNrIiwiU3RyaW5nIiwidXBzZXJ0Iiwic2VhbFNlY3JldCIsInBlbmRpbmdSZXF1ZXN0VG9rZW4iLCJfaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhO0FBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLHNDQUFzQyxFQUFDO0VBQUNDLE9BQU8sQ0FBQ0MsQ0FBQyxFQUFDO0lBQUNKLGFBQWEsR0FBQ0ksQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFyR0gsTUFBTSxDQUFDSSxNQUFNLENBQUM7RUFBQ0Ms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LEtBQUssQ0FBQ0MsVUFBVSxDQUNsQ3dHLG1CQUFtQixDQUFDbkosa0JBQWtCO0lBQzFDLENBQUM7RUFDSCxDQUFDLE1BQU07SUFDTCxPQUFPMEUsU0FBUztFQUNsQjtBQUNGLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvb2F1dGgxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB1cmxNb2R1bGUgZnJvbSAndXJsJztcblxuLy8gQW4gT0F1dGgxIHdyYXBwZXIgYXJvdW5kIGh0dHAgY2FsbHMgd2hpY2ggaGVscHMgZ2V0IHRva2VucyBhbmRcbi8vIHRha2VzIGNhcmUgb2YgSFRUUCBoZWFkZXJzXG4vL1xuLy8gQHBhcmFtIGNvbmZpZyB7T2JqZWN0fVxuLy8gICAtIGNvbnN1bWVyS2V5IChTdHJpbmcpOiBvYXV0aCBjb25zdW1lciBrZXlcbi8vICAgLSBzZWNyZXQgKFN0cmluZyk6IG9hdXRoIGNvbnN1bWVyIHNlY3JldFxuLy8gQHBhcmFtIHVybHMge09iamVjdH1cbi8vICAgLSByZXF1ZXN0VG9rZW4gKFN0cmluZyk6IHVybFxuLy8gICAtIGF1dGhvcml6ZSAoU3RyaW5nKTogdXJsXG4vLyAgIC0gYWNjZXNzVG9rZW4gKFN0cmluZyk6IHVybFxuLy8gICAtIGF1dGhlbnRpY2F0ZSAoU3RyaW5nKTogdXJsXG5leHBvcnQgY2xhc3MgT0F1dGgxQmluZGluZyB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgdXJscykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl91cmxzID0gdXJscztcbiAgfVxuXG4gIGFzeW5jIHByZXBhcmVSZXF1ZXN0VG9rZW4oY2FsbGJhY2tVcmwpIHtcbiAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5fYnVpbGRIZWFkZXIoe1xuICAgICAgb2F1dGhfY2FsbGJhY2s6IGNhbGxiYWNrVXJsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2NhbGwoe21ldGhvZDogJ1BPU1QnLCB1cmw6IHRoaXMuX3VybHMucmVxdWVzdFRva2VuLCBoZWFkZXJzfSk7XG4gICAgY29uc3QgdG9rZW5zID0gcXVlcnlzdHJpbmcucGFyc2UocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICBpZiAoISB0b2tlbnMub2F1dGhfY2FsbGJhY2tfY29uZmlybWVkKVxuICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoXCJvYXV0aF9jYWxsYmFja19jb25maXJtZWQgZmFsc2Ugd2hlbiByZXF1ZXN0aW5nIG9hdXRoMSB0b2tlblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzcG9uc2U6IHJlc3BvbnNlfSk7XG5cbiAgICB0aGlzLnJlcXVlc3RUb2tlbiA9IHRva2Vucy5vYXV0aF90b2tlbjtcbiAgICB0aGlzLnJlcXVlc3RUb2tlblNlY3JldCA9IHRva2Vucy5vYXV0aF90b2tlbl9zZWNyZXQ7XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQWNjZXNzVG9rZW4ocXVlcnksIHJlcXVlc3RUb2tlblNlY3JldCkge1xuICAgIC8vIHN1cHBvcnQgaW1wbGVtZW50YXRpb25zIHRoYXQgdXNlIHJlcXVlc3QgdG9rZW4gc2VjcmV0cy4gVGhpcyBpc1xuICAgIC8vIHJlYWQgYnkgdGhpcy5fY2FsbC5cbiAgICAvL1xuICAgIC8vIFhYWCBtYWtlIGl0IGEgcGFyYW0gdG8gY2FsbCwgbm90IHNvbWV0aGluZyBzdGFzaGVkIG9uIHNlbGY/IEl0J3NcbiAgICAvLyBraW5kYSBjb25mdXNpbmcgcmlnaHQgbm93LCBldmVyeXRoaW5nIGV4Y2VwdCB0aGlzIGlzIHBhc3NlZCBhc1xuICAgIC8vIGFyZ3VtZW50cywgYnV0IHRoaXMgaXMgc3RvcmVkLlxuICAgIGlmIChyZXF1ZXN0VG9rZW5TZWNyZXQpXG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuU2VjcmV0ID0gcmVxdWVzdFRva2VuU2VjcmV0O1xuXG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXMuX2J1aWxkSGVhZGVyKHtcbiAgICAgIG9hdXRoX3Rva2VuOiBxdWVyeS5vYXV0aF90b2tlbixcbiAgICAgIG9hdXRoX3ZlcmlmaWVyOiBxdWVyeS5vYXV0aF92ZXJpZmllclxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9jYWxsKHsgbWV0aG9kOiAnUE9TVCcsIHVybDogdGhpcy5fdXJscy5hY2Nlc3NUb2tlbiwgaGVhZGVycyB9KTtcbiAgICBjb25zdCB0b2tlbnMgPSBxdWVyeXN0cmluZy5wYXJzZShyZXNwb25zZS5jb250ZW50KTtcblxuICAgIGlmICghIHRva2Vucy5vYXV0aF90b2tlbiB8fCAhIHRva2Vucy5vYXV0aF90b2tlbl9zZWNyZXQpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwibWlzc2luZyBvYXV0aCB0b2tlbiBvciBzZWNyZXRcIik7XG4gICAgICAvLyBXZSBwcm92aWRlIHJlc3BvbnNlIG9ubHkgaWYgbm8gdG9rZW4gaXMgYXZhaWxhYmxlLCB3ZSBkbyBub3Qgd2FudCB0byBsZWFrIGFueSB0b2tlbnNcbiAgICAgIGlmICghIHRva2Vucy5vYXV0aF90b2tlbiAmJiAhIHRva2Vucy5vYXV0aF90b2tlbl9zZWNyZXQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlcnJvciwge3Jlc3BvbnNlOiByZXNwb25zZX0pO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHRva2Vucy5vYXV0aF90b2tlbjtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuU2VjcmV0ID0gdG9rZW5zLm9hdXRoX3Rva2VuX3NlY3JldDtcbiAgfVxuXG4gIGFzeW5jIGNhbGxBc3luYyhtZXRob2QsIHVybCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLl9idWlsZEhlYWRlcih7XG4gICAgICBvYXV0aF90b2tlbjogdGhpcy5hY2Nlc3NUb2tlblxuICAgIH0pO1xuXG4gICAgaWYoISBwYXJhbXMpIHtcbiAgICAgIHBhcmFtcyA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jYWxsKHsgbWV0aG9kLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgY2FsbGJhY2sgfSk7XG4gIH1cblxuICBhc3luYyBnZXRBc3luYyh1cmwsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5jYWxsQXN5bmMoJ0dFVCcsIHVybCwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIH1cblxuICBhc3luYyBwb3N0QXN5bmModXJsLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbEFzeW5jKCdQT1NUJywgdXJsLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNhbGwobWV0aG9kLCB1cmwsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAvLyBSZXF1aXJlIGNoYW5nZXMgd2hlbiByZW1vdmUgRmliZXJzLiBFeHBvc2VkIHRvIHB1YmxpYyBhcGkuXG4gICAgcmV0dXJuIFByb21pc2UuYXdhaXQodGhpcy5jYWxsQXN5bmMobWV0aG9kLCB1cmwsIHBhcmFtcywgY2FsbGJhY2spKTtcbiAgfVxuXG4gIGdldCh1cmwsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAvLyBSZXF1aXJlIGNoYW5nZXMgd2hlbiByZW1vdmUgRmliZXJzLiBFeHBvc2VkIHRvIHB1YmxpYyBhcGkuXG4gICAgcmV0dXJuIHRoaXMuY2FsbCgnR0VUJywgdXJsLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHBvc3QodXJsLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgLy8gUmVxdWlyZSBjaGFuZ2VzIHdoZW4gcmVtb3ZlIEZpYmVycy4gRXhwb3NlZCB0byBwdWJsaWMgYXBpLlxuICAgIHJldHVybiB0aGlzLmNhbGwoJ1BPU1QnLCB1cmwsIHBhcmFtcywgY2FsbGJhY2spO1xuICB9XG5cbiAgX2J1aWxkSGVhZGVyKGhlYWRlcnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2F1dGhfY29uc3VtZXJfa2V5OiB0aGlzLl9jb25maWcuY29uc3VtZXJLZXksXG4gICAgICBvYXV0aF9ub25jZTogUmFuZG9tLnNlY3JldCgpLnJlcGxhY2UoL1xcVy9nLCAnJyksXG4gICAgICBvYXV0aF9zaWduYXR1cmVfbWV0aG9kOiAnSE1BQy1TSEExJyxcbiAgICAgIG9hdXRoX3RpbWVzdGFtcDogKG5ldyBEYXRlKCkudmFsdWVPZigpLzEwMDApLnRvRml4ZWQoKS50b1N0cmluZygpLFxuICAgICAgb2F1dGhfdmVyc2lvbjogJzEuMCcsXG4gICAgICAuLi5oZWFkZXJzLFxuICAgIH1cbiAgfVxuXG4gIF9nZXRTaWduYXR1cmUobWV0aG9kLCB1cmwsIHJhd0hlYWRlcnMsIGFjY2Vzc1Rva2VuU2VjcmV0LCBwYXJhbXMpIHtcbiAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5fZW5jb2RlSGVhZGVyKHsgLi4ucmF3SGVhZGVycywgLi4ucGFyYW1zIH0pO1xuXG4gICAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcChrZXkgPT4gYCR7a2V5fT0ke2hlYWRlcnNba2V5XX1gKVxuICAgICAgLnNvcnQoKS5qb2luKCcmJyk7XG5cbiAgICBjb25zdCBzaWduYXR1cmVCYXNlID0gW1xuICAgICAgbWV0aG9kLFxuICAgICAgdGhpcy5fZW5jb2RlU3RyaW5nKHVybCksXG4gICAgICB0aGlzLl9lbmNvZGVTdHJpbmcocGFyYW1ldGVycylcbiAgICBdLmpvaW4oJyYnKTtcblxuICAgIGNvbnN0IHNlY3JldCA9IE9BdXRoLm9wZW5TZWNyZXQodGhpcy5fY29uZmlnLnNlY3JldCk7XG5cbiAgICBsZXQgc2lnbmluZ0tleSA9IGAke3RoaXMuX2VuY29kZVN0cmluZyhzZWNyZXQpfSZgO1xuICAgIGlmIChhY2Nlc3NUb2tlblNlY3JldClcbiAgICAgIHNpZ25pbmdLZXkgKz0gdGhpcy5fZW5jb2RlU3RyaW5nKGFjY2Vzc1Rva2VuU2VjcmV0KTtcblxuICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSG1hYygnU0hBMScsIHNpZ25pbmdLZXkpLnVwZGF0ZShzaWduYXR1cmVCYXNlKS5kaWdlc3QoJ2Jhc2U2NCcpO1xuICB9O1xuXG4gIGFzeW5jIF9jYWxsKHttZXRob2QsIHVybCwgaGVhZGVycyA9IHt9LCBwYXJhbXMgPSB7fSwgY2FsbGJhY2t9KSB7XG4gICAgLy8gYWxsIFVSTHMgdG8gYmUgZnVuY3Rpb25zIHRvIHN1cHBvcnQgcGFyYW1ldGVycy9jdXN0b21pemF0aW9uXG4gICAgaWYodHlwZW9mIHVybCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB1cmwgPSB1cmwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gRXh0cmFjdCBhbGwgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgZnJvbSB0aGUgcHJvdmlkZWQgVVJMXG4gICAgY29uc3QgcGFyc2VkVXJsID0gdXJsTW9kdWxlLnBhcnNlKHVybCwgdHJ1ZSk7XG4gICAgLy8gTWVyZ2UgdGhlbSBpbiBhIHdheSB0aGF0IHBhcmFtcyBnaXZlbiB0byB0aGUgbWV0aG9kIGNhbGwgaGF2ZSBwcmVjZWRlbmNlXG4gICAgcGFyYW1zID0geyAuLi5wYXJzZWRVcmwucXVlcnksIC4uLnBhcmFtcyB9O1xuXG4gICAgLy8gUmVjb25zdHJ1Y3QgdGhlIFVSTCBiYWNrIHdpdGhvdXQgYW55IHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzXG4gICAgLy8gKHRoZXkgYXJlIG5vdyBpbiBwYXJhbXMpXG4gICAgcGFyc2VkVXJsLnF1ZXJ5ID0ge307XG4gICAgcGFyc2VkVXJsLnNlYXJjaCA9ICcnO1xuICAgIHVybCA9IHVybE1vZHVsZS5mb3JtYXQocGFyc2VkVXJsKTtcblxuICAgIC8vIEdldCB0aGUgc2lnbmF0dXJlXG4gICAgaGVhZGVycy5vYXV0aF9zaWduYXR1cmUgPVxuICAgICAgdGhpcy5fZ2V0U2lnbmF0dXJlKG1ldGhvZCwgdXJsLCBoZWFkZXJzLCB0aGlzLmFjY2Vzc1Rva2VuU2VjcmV0LCBwYXJhbXMpO1xuXG4gICAgLy8gTWFrZSBhIGF1dGhvcml6YXRpb24gc3RyaW5nIGFjY29yZGluZyB0byBvYXV0aDEgc3BlY1xuICAgIGNvbnN0IGF1dGhTdHJpbmcgPSB0aGlzLl9nZXRBdXRoSGVhZGVyU3RyaW5nKGhlYWRlcnMpO1xuICAgIC8vIE1ha2Ugc2lnbmVkIHJlcXVlc3RcbiAgICByZXR1cm4gT0F1dGguX2ZldGNoKHVybCwgbWV0aG9kLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGF1dGhTdHJpbmcsXG4gICAgICAgIC4uLihtZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSA6IHt9KVxuICAgICAgfSxcbiAgICAgIC4uLihtZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnID9cbiAgICAgICAgeyBib2R5OiBPQXV0aC5fYWRkVmFsdWVzVG9RdWVyeVBhcmFtcyhwYXJhbXMpLnRvU3RyaW5nKCkgfVxuICAgICAgICA6IHsgcXVlcnlQYXJhbXM6IHBhcmFtcyB9KVxuICAgIH0pLnRoZW4oKHJlcykgPT5cbiAgICAgICAgcmVzLnRleHQoKS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXJyYXkuZnJvbShyZXMuaGVhZGVycy5lbnRyaWVzKCkpLnJlZHVjZShcbiAgICAgICAgICAgIChhY2MsIFtrZXksIHZhbF0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4uYWNjLCBba2V5LnRvTG93ZXJDYXNlKCldOiB2YWwgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlSGVhZGVyc1snY29udGVudC10eXBlJ10uaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSA/XG4gICAgICAgICAgICBKU09OLnBhcnNlKGNvbnRlbnQpIDogdW5kZWZpbmVkO1xuICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgY29udGVudDogZGF0YSA/ICcnIDogY29udGVudCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IC4uLnJlc3BvbnNlSGVhZGVycywgbm9uY2U6IGhlYWRlcnMub2F1dGhfbm9uY2UgfSxcbiAgICAgICAgICAgIHJlZGlyZWN0ZWQ6IHJlcy5yZWRpcmVjdGVkLFxuICAgICAgICAgICAgb2s6IHJlcy5vayxcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlcy5zdGF0dXMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh7IGVyciB9KTtcbiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICBuZXcgRXJyb3IoYEZhaWxlZCB0byBzZW5kIE9BdXRoMSByZXF1ZXN0IHRvICR7dXJsfS4gJHtlcnIubWVzc2FnZX1gKSxcbiAgICAgICAgICB7IHJlc3BvbnNlOiBlcnIucmVzcG9uc2UgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBfZW5jb2RlSGVhZGVyKGhlYWRlcikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhoZWFkZXIpLnJlZHVjZSgobWVtbywga2V5KSA9PiB7XG4gICAgICBtZW1vW3RoaXMuX2VuY29kZVN0cmluZyhrZXkpXSA9IHRoaXMuX2VuY29kZVN0cmluZyhoZWFkZXJba2V5XSk7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9LCB7fSk7XG4gIH07XG5cbiAgX2VuY29kZVN0cmluZyhzdHIpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCldL2csIGVzY2FwZSkucmVwbGFjZSgvXFwqL2csIFwiJTJBXCIpO1xuICB9O1xuXG4gIF9nZXRBdXRoSGVhZGVyU3RyaW5nKGhlYWRlcnMpIHtcbiAgICByZXR1cm4gJ09BdXRoICcgKyAgT2JqZWN0LmtleXMoaGVhZGVycykubWFwKGtleSA9PlxuICAgICAgYCR7dGhpcy5fZW5jb2RlU3RyaW5nKGtleSl9PVwiJHt0aGlzLl9lbmNvZGVTdHJpbmcoaGVhZGVyc1trZXldKX1cImBcbiAgICApLnNvcnQoKS5qb2luKCcsICcpO1xuICB9O1xuXG59O1xuIiwiaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHsgT0F1dGgxQmluZGluZyB9IGZyb20gJy4vb2F1dGgxX2JpbmRpbmcnO1xuXG5PQXV0aC5fcXVlcnlQYXJhbXNXaXRoQXV0aFRva2VuVXJsID0gKGF1dGhVcmwsIG9hdXRoQmluZGluZywgcGFyYW1zID0ge30sIHdoaXRlbGlzdGVkUXVlcnlQYXJhbXMgPSBbXSkgPT4ge1xuICBjb25zdCByZWRpcmVjdFVybE9iaiA9IHVybC5wYXJzZShhdXRoVXJsLCB0cnVlKTtcblxuICBPYmplY3QuYXNzaWduKFxuICAgIHJlZGlyZWN0VXJsT2JqLnF1ZXJ5LFxuICAgIHdoaXRlbGlzdGVkUXVlcnlQYXJhbXMucmVkdWNlKChwcmV2LCBwYXJhbSkgPT5cbiAgICAgIHBhcmFtcy5xdWVyeVtwYXJhbV0gPyB7IC4uLnByZXYsIHBhcmFtOiBwYXJhbXMucXVlcnlbcGFyYW1dIH0gOiBwcmV2LFxuICAgICAge31cbiAgICApLFxuICAgIHtcbiAgICAgIG9hdXRoX3Rva2VuOiBvYXV0aEJpbmRpbmcucmVxdWVzdFRva2VuLFxuICAgIH1cbiAgKTtcblxuICAvLyBDbGVhciB0aGUgYHNlYXJjaGAgc28gaXQgaXMgcmVidWlsdCBieSBOb2RlJ3MgYHVybGAgZnJvbSB0aGUgYHF1ZXJ5YCBhYm92ZS5cbiAgLy8gVXNpbmcgcHJldmlvdXMgdmVyc2lvbnMgb2YgdGhlIE5vZGUgYHVybGAgbW9kdWxlLCB0aGlzIHdhcyBqdXN0IHNldCB0byBcIlwiXG4gIC8vIEhvd2V2ZXIsIE5vZGUgNiBkb2NzIHNlZW0gdG8gaW5kaWNhdGUgdGhhdCB0aGlzIHNob3VsZCBiZSBgdW5kZWZpbmVkYC5cbiAgZGVsZXRlIHJlZGlyZWN0VXJsT2JqLnNlYXJjaDtcblxuICAvLyBSZWNvbnN0cnVjdCB0aGUgVVJMIGJhY2sgd2l0aCBwcm92aWRlZCBxdWVyeSBwYXJhbWV0ZXJzIG1lcmdlZCB3aXRoIG9hdXRoX3Rva2VuXG4gIHJldHVybiB1cmwuZm9ybWF0KHJlZGlyZWN0VXJsT2JqKTtcbn07XG5cbi8vIGNvbm5lY3QgbWlkZGxld2FyZVxuT0F1dGguX3JlcXVlc3RIYW5kbGVyc1snMSddID0gYXN5bmMgKHNlcnZpY2UsIHF1ZXJ5LCByZXMpID0+IHtcbiAgY29uc3QgY29uZmlnID0gU2VydmljZUNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMuZmluZE9uZSh7c2VydmljZTogc2VydmljZS5zZXJ2aWNlTmFtZX0pO1xuICBpZiAoISBjb25maWcpIHtcbiAgICB0aHJvdyBuZXcgU2VydmljZUNvbmZpZ3VyYXRpb24uQ29uZmlnRXJyb3Ioc2VydmljZS5zZXJ2aWNlTmFtZSk7XG4gIH1cblxuICBjb25zdCB7IHVybHMgfSA9IHNlcnZpY2U7XG4gIGNvbnN0IG9hdXRoQmluZGluZyA9IG5ldyBPQXV0aDFCaW5kaW5nKGNvbmZpZywgdXJscyk7XG5cbiAgbGV0IGNyZWRlbnRpYWxTZWNyZXQ7XG5cbiAgaWYgKHF1ZXJ5LnJlcXVlc3RUb2tlbkFuZFJlZGlyZWN0KSB7XG4gICAgLy8gc3RlcCAxIC0gZ2V0IGFuZCBzdG9yZSBhIHJlcXVlc3QgdG9rZW5cbiAgICBjb25zdCBjYWxsYmFja1VybCA9IE9BdXRoLl9yZWRpcmVjdFVyaShzZXJ2aWNlLnNlcnZpY2VOYW1lLCBjb25maWcsIHtcbiAgICAgIHN0YXRlOiBxdWVyeS5zdGF0ZSxcbiAgICAgIGNvcmRvdmE6IChxdWVyeS5jb3Jkb3ZhID09PSBcInRydWVcIiksXG4gICAgICBhbmRyb2lkOiAocXVlcnkuYW5kcm9pZCA9PT0gXCJ0cnVlXCIpXG4gICAgfSk7XG5cbiAgICAvLyBHZXQgYSByZXF1ZXN0IHRva2VuIHRvIHN0YXJ0IGF1dGggcHJvY2Vzc1xuICAgIGF3YWl0IG9hdXRoQmluZGluZy5wcmVwYXJlUmVxdWVzdFRva2VuKGNhbGxiYWNrVXJsKTtcblxuICAgIC8vIEtlZXAgdHJhY2sgb2YgcmVxdWVzdCB0b2tlbiBzbyB3ZSBjYW4gdmVyaWZ5IGl0IG9uIHRoZSBuZXh0IHN0ZXBcbiAgICBPQXV0aC5fc3RvcmVSZXF1ZXN0VG9rZW4oXG4gICAgICBPQXV0aC5fY3JlZGVudGlhbFRva2VuRnJvbVF1ZXJ5KHF1ZXJ5KSxcbiAgICAgIG9hdXRoQmluZGluZy5yZXF1ZXN0VG9rZW4sXG4gICAgICBvYXV0aEJpbmRpbmcucmVxdWVzdFRva2VuU2VjcmV0KTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIHNjb3BlL25hbWUgcGFyYW1ldGVyc1xuICAgIGxldCByZWRpcmVjdFVybDtcbiAgICBjb25zdCBhdXRoUGFyYW1zID0geyBxdWVyeSB9O1xuXG4gICAgaWYodHlwZW9mIHVybHMuYXV0aGVudGljYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJlZGlyZWN0VXJsID0gdXJscy5hdXRoZW50aWNhdGUob2F1dGhCaW5kaW5nLCBhdXRoUGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVkaXJlY3RVcmwgPSBPQXV0aC5fcXVlcnlQYXJhbXNXaXRoQXV0aFRva2VuVXJsKFxuICAgICAgICB1cmxzLmF1dGhlbnRpY2F0ZSxcbiAgICAgICAgb2F1dGhCaW5kaW5nLFxuICAgICAgICBhdXRoUGFyYW1zXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHJlZGlyZWN0IHRvIHByb3ZpZGVyIGxvZ2luLCB3aGljaCB3aWxsIHJlZGlyZWN0IGJhY2sgdG8gXCJzdGVwIDJcIiBiZWxvd1xuXG4gICAgcmVzLndyaXRlSGVhZCgzMDIsIHsnTG9jYXRpb24nOiByZWRpcmVjdFVybH0pO1xuICAgIHJlcy5lbmQoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzdGVwIDIsIHJlZGlyZWN0ZWQgZnJvbSBwcm92aWRlciBsb2dpbiAtIHN0b3JlIHRoZSByZXN1bHRcbiAgICAvLyBhbmQgY2xvc2UgdGhlIHdpbmRvdyB0byBhbGxvdyB0aGUgbG9naW4gaGFuZGxlciB0byBwcm9jZWVkXG5cbiAgICAvLyBHZXQgdGhlIHVzZXIncyByZXF1ZXN0IHRva2VuIHNvIHdlIGNhbiB2ZXJpZnkgaXQgYW5kIGNsZWFyIGl0XG4gICAgY29uc3QgcmVxdWVzdFRva2VuSW5mbyA9IE9BdXRoLl9yZXRyaWV2ZVJlcXVlc3RUb2tlbihcbiAgICAgIE9BdXRoLl9jcmVkZW50aWFsVG9rZW5Gcm9tUXVlcnkocXVlcnkpKTtcblxuICAgIGlmICghIHJlcXVlc3RUb2tlbkluZm8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byByZXRyaWV2ZSByZXF1ZXN0IHRva2VuXCIpO1xuICAgIH1cblxuICAgIC8vIFZlcmlmeSB1c2VyIGF1dGhvcml6ZWQgYWNjZXNzIGFuZCB0aGUgb2F1dGhfdG9rZW4gbWF0Y2hlc1xuICAgIC8vIHRoZSByZXF1ZXN0VG9rZW4gZnJvbSBwcmV2aW91cyBzdGVwXG4gICAgaWYgKHF1ZXJ5Lm9hdXRoX3Rva2VuICYmIHF1ZXJ5Lm9hdXRoX3Rva2VuID09PSByZXF1ZXN0VG9rZW5JbmZvLnJlcXVlc3RUb2tlbikge1xuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBsb2dpbiByZXN1bHRzIGJlZm9yZSByZXR1cm5pbmcuICBUaGlzIHdheSB0aGVcbiAgICAgIC8vIHN1YnNlcXVlbnQgY2FsbCB0byB0aGUgYGxvZ2luYCBtZXRob2Qgd2lsbCBiZSBpbW1lZGlhdGUuXG5cbiAgICAgIC8vIEdldCB0aGUgYWNjZXNzIHRva2VuIGZvciBzaWduaW5nIHJlcXVlc3RzXG4gICAgICBhd2FpdCBvYXV0aEJpbmRpbmcucHJlcGFyZUFjY2Vzc1Rva2VuKHF1ZXJ5LCByZXF1ZXN0VG9rZW5JbmZvLnJlcXVlc3RUb2tlblNlY3JldCk7XG5cbiAgICAgIC8vIFJ1biBzZXJ2aWNlLXNwZWNpZmljIGhhbmRsZXIuXG4gICAgICBjb25zdCBvYXV0aFJlc3VsdCA9IGF3YWl0IHNlcnZpY2UuaGFuZGxlT2F1dGhSZXF1ZXN0KFxuICAgICAgICBvYXV0aEJpbmRpbmcsIHsgcXVlcnk6IHF1ZXJ5IH0pO1xuXG4gICAgICBjb25zdCBjcmVkZW50aWFsVG9rZW4gPSBPQXV0aC5fY3JlZGVudGlhbFRva2VuRnJvbVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIGNyZWRlbnRpYWxTZWNyZXQgPSBSYW5kb20uc2VjcmV0KCk7XG5cbiAgICAgIC8vIFN0b3JlIHRoZSBsb2dpbiByZXN1bHQgc28gaXQgY2FuIGJlIHJldHJpZXZlZCBpbiBhbm90aGVyXG4gICAgICAvLyBicm93c2VyIHRhYiBieSB0aGUgcmVzdWx0IGhhbmRsZXJcbiAgICAgIE9BdXRoLl9zdG9yZVBlbmRpbmdDcmVkZW50aWFsKGNyZWRlbnRpYWxUb2tlbiwge1xuICAgICAgICBzZXJ2aWNlTmFtZTogc2VydmljZS5zZXJ2aWNlTmFtZSxcbiAgICAgICAgc2VydmljZURhdGE6IG9hdXRoUmVzdWx0LnNlcnZpY2VEYXRhLFxuICAgICAgICBvcHRpb25zOiBvYXV0aFJlc3VsdC5vcHRpb25zXG4gICAgICB9LCBjcmVkZW50aWFsU2VjcmV0KTtcbiAgICB9XG5cbiAgICAvLyBFaXRoZXIgY2xvc2UgdGhlIHdpbmRvdywgcmVkaXJlY3QsIG9yIHJlbmRlciBub3RoaW5nXG4gICAgLy8gaWYgYWxsIGVsc2UgZmFpbHNcbiAgICBPQXV0aC5fcmVuZGVyT2F1dGhSZXN1bHRzKHJlcywgcXVlcnksIGNyZWRlbnRpYWxTZWNyZXQpO1xuICB9XG59O1xuIiwiLy9cbi8vIF9wZW5kaW5nUmVxdWVzdFRva2VucyBhcmUgcmVxdWVzdCB0b2tlbnMgdGhhdCBoYXZlIGJlZW4gcmVjZWl2ZWRcbi8vIGJ1dCBub3QgeWV0IGZ1bGx5IGF1dGhvcml6ZWQgKHByb2Nlc3NlZCkuXG4vL1xuLy8gRHVyaW5nIHRoZSBvYXV0aDEgYXV0aG9yaXphdGlvbiBwcm9jZXNzLCB0aGUgTWV0ZW9yIEFwcCBvcGVuc1xuLy8gYSBwb3AtdXAsIHJlcXVlc3RzIGEgcmVxdWVzdCB0b2tlbiBmcm9tIHRoZSBvYXV0aDEgc2VydmljZSwgYW5kXG4vLyByZWRpcmVjdHMgdGhlIGJyb3dzZXIgdG8gdGhlIG9hdXRoMSBzZXJ2aWNlIGZvciB0aGUgdXNlclxuLy8gdG8gZ3JhbnQgYXV0aG9yaXphdGlvbi4gIFRoZSB1c2VyIGlzIHRoZW4gcmV0dXJuZWQgdG8gdGhlXG4vLyBNZXRlb3IgQXBwcycgY2FsbGJhY2sgdXJsIGFuZCB0aGUgcmVxdWVzdCB0b2tlbiBpcyB2ZXJpZmllZC5cbi8vXG4vLyBXaGVuIE1ldGVvciBBcHBzIHJ1biBvbiBtdWx0aXBsZSBzZXJ2ZXJzLCBpdCdzIHBvc3NpYmxlIHRoYXRcbi8vIDIgZGlmZmVyZW50IHNlcnZlcnMgbWF5IGJlIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHJlcXVlc3QgdG9rZW5cbi8vIGFuZCB0byB2ZXJpZnkgaXQgaW4gdGhlIGNhbGxiYWNrIG9uY2UgdGhlIHVzZXIgaGFzIGF1dGhvcml6ZWQuXG4vL1xuLy8gRm9yIHRoaXMgcmVhc29uLCB0aGUgX3BlbmRpbmdSZXF1ZXN0VG9rZW5zIGFyZSBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlXG4vLyBzbyB0aGV5IGNhbiBiZSBzaGFyZWQgYWNyb3NzIE1ldGVvciBBcHAgc2VydmVycy5cbi8vXG4vLyBYWFggVGhpcyBjb2RlIGlzIGZhaXJseSBzaW1pbGFyIHRvIG9hdXRoL3BlbmRpbmdfY3JlZGVudGlhbHMuanMgLS1cbi8vIG1heWJlIHdlIGNhbiBjb21iaW5lIHRoZW0gc29tZWhvdy5cblxuLy8gQ29sbGVjdGlvbiBjb250YWluaW5nIHBlbmRpbmcgcmVxdWVzdCB0b2tlbnNcbi8vIEhhcyBrZXksIHJlcXVlc3RUb2tlbiwgcmVxdWVzdFRva2VuU2VjcmV0LCBhbmQgY3JlYXRlZEF0IGZpZWxkcy5cbk9BdXRoLl9wZW5kaW5nUmVxdWVzdFRva2VucyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFxuICBcIm1ldGVvcl9vYXV0aF9wZW5kaW5nUmVxdWVzdFRva2Vuc1wiLCB7XG4gICAgX3ByZXZlbnRBdXRvcHVibGlzaDogdHJ1ZVxuICB9KTtcblxuT0F1dGguX3BlbmRpbmdSZXF1ZXN0VG9rZW5zLmNyZWF0ZUluZGV4KCdrZXknLCB7IHVuaXF1ZTogdHJ1ZSB9KTtcbk9BdXRoLl9wZW5kaW5nUmVxdWVzdFRva2Vucy5jcmVhdGVJbmRleCgnY3JlYXRlZEF0Jyk7XG5cblxuXG4vLyBQZXJpb2RpY2FsbHkgY2xlYXIgb2xkIGVudHJpZXMgdGhhdCBuZXZlciBnb3QgY29tcGxldGVkXG5jb25zdCBfY2xlYW5TdGFsZVJlc3VsdHMgPSAoKSA9PiB7XG4gIC8vIFJlbW92ZSByZXF1ZXN0IHRva2VucyBvbGRlciB0aGFuIDUgbWludXRlXG4gIGNvbnN0IHRpbWVDdXRvZmYgPSBuZXcgRGF0ZSgpO1xuICB0aW1lQ3V0b2ZmLnNldE1pbnV0ZXModGltZUN1dG9mZi5nZXRNaW51dGVzKCkgLSA1KTtcbiAgT0F1dGguX3BlbmRpbmdSZXF1ZXN0VG9rZW5zLnJlbW92ZSh7IGNyZWF0ZWRBdDogeyAkbHQ6IHRpbWVDdXRvZmYgfSB9KTtcbn07XG5jb25zdCBfY2xlYW51cEhhbmRsZSA9IE1ldGVvci5zZXRJbnRlcnZhbChfY2xlYW5TdGFsZVJlc3VsdHMsIDYwICogMTAwMCk7XG5cblxuLy8gU3RvcmVzIHRoZSBrZXkgYW5kIHJlcXVlc3QgdG9rZW4gaW4gdGhlIF9wZW5kaW5nUmVxdWVzdFRva2VucyBjb2xsZWN0aW9uLlxuLy8gV2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYGtleWAgaXMgbm90IGEgc3RyaW5nLlxuLy9cbi8vIEBwYXJhbSBrZXkge3N0cmluZ31cbi8vIEBwYXJhbSByZXF1ZXN0VG9rZW4ge3N0cmluZ31cbi8vIEBwYXJhbSByZXF1ZXN0VG9rZW5TZWNyZXQge3N0cmluZ31cbi8vXG5PQXV0aC5fc3RvcmVSZXF1ZXN0VG9rZW4gPSAoa2V5LCByZXF1ZXN0VG9rZW4sIHJlcXVlc3RUb2tlblNlY3JldCkgPT4ge1xuICBjaGVjayhrZXksIFN0cmluZyk7XG5cbiAgLy8gV2UgZG8gYW4gdXBzZXJ0IGhlcmUgaW5zdGVhZCBvZiBhbiBpbnNlcnQgaW4gY2FzZSB0aGUgdXNlciBoYXBwZW5zXG4gIC8vIHRvIHNvbWVob3cgc2VuZCB0aGUgc2FtZSBgc3RhdGVgIHBhcmFtZXRlciB0d2ljZSBkdXJpbmcgYW4gT0F1dGhcbiAgLy8gbG9naW47IHdlIGRvbid0IHdhbnQgYSBkdXBsaWNhdGUga2V5IGVycm9yLlxuICBPQXV0aC5fcGVuZGluZ1JlcXVlc3RUb2tlbnMudXBzZXJ0KHtcbiAgICBrZXksXG4gIH0sIHtcbiAgICBrZXksXG4gICAgcmVxdWVzdFRva2VuOiBPQXV0aC5zZWFsU2VjcmV0KHJlcXVlc3RUb2tlbiksXG4gICAgcmVxdWVzdFRva2VuU2VjcmV0OiBPQXV0aC5zZWFsU2VjcmV0KHJlcXVlc3RUb2tlblNlY3JldCksXG4gICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXG4gIH0pO1xufTtcblxuXG4vLyBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgYSByZXF1ZXN0IHRva2VuIGZyb20gdGhlIF9wZW5kaW5nUmVxdWVzdFRva2VucyBjb2xsZWN0aW9uXG4vLyBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHJlcXVlc3RUb2tlbiBhbmQgcmVxdWVzdFRva2VuU2VjcmV0IHByb3BlcnRpZXNcbi8vXG4vLyBAcGFyYW0ga2V5IHtzdHJpbmd9XG4vL1xuT0F1dGguX3JldHJpZXZlUmVxdWVzdFRva2VuID0ga2V5ID0+IHtcbiAgY2hlY2soa2V5LCBTdHJpbmcpO1xuXG4gIGNvbnN0IHBlbmRpbmdSZXF1ZXN0VG9rZW4gPSBPQXV0aC5fcGVuZGluZ1JlcXVlc3RUb2tlbnMuZmluZE9uZSh7IGtleToga2V5IH0pO1xuICBpZiAocGVuZGluZ1JlcXVlc3RUb2tlbikge1xuICAgIE9BdXRoLl9wZW5kaW5nUmVxdWVzdFRva2Vucy5yZW1vdmUoeyBfaWQ6IHBlbmRpbmdSZXF1ZXN0VG9rZW4uX2lkIH0pO1xuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0VG9rZW46IE9BdXRoLm9wZW5TZWNyZXQocGVuZGluZ1JlcXVlc3RUb2tlbi5yZXF1ZXN0VG9rZW4pLFxuICAgICAgcmVxdWVzdFRva2VuU2VjcmV0OiBPQXV0aC5vcGVuU2VjcmV0KFxuICAgICAgICBwZW5kaW5nUmVxdWVzdFRva2VuLnJlcXVlc3RUb2tlblNlY3JldClcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG4iXX0=
