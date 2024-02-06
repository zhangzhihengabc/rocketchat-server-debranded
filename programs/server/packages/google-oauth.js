(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var OAuth = Package.oauth.OAuth;
var fetch = Package.fetch.fetch;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Google;

var require = meteorInstall({"node_modules":{"meteor":{"google-oauth":{"google_server.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/google-oauth/google_server.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let Google;
module.link("./namespace.js", {
  default(v) {
    Google = v;
  }
}, 0);
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }
}, 1);
let fetch;
module.link("meteor/fetch", {
  fetch(v) {
    fetch = v;
  }
}, 2);
const hasOwn = Object.prototype.hasOwnProperty;

// https://developers.google.com/accounts/docs/OAuth2Login#userinfocall
Google.whitelistedFields = ['id', 'email', 'verified_email', 'name', 'given_name', 'family_name', 'picture', 'locale', 'timezone', 'gender'];
const getServiceDataFromTokens = (tokens, callback) => Promise.asyncApply(() => {
  const {
    accessToken,
    idToken
  } = tokens;
  const scopes = Promise.await(getScopes(accessToken).catch(err => {
    const error = Object.assign(new Error("Failed to fetch tokeninfo from Google. ".concat(err.message)), {
      response: err.response
    });
    callback && callback(error);
    throw error;
  }));
  let identity = Promise.await(getIdentity(accessToken).catch(err => {
    const error = Object.assign(new Error("Failed to fetch identity from Google. ".concat(err.message)), {
      response: err.response
    });
    callback && callback(error);
    throw error;
  }));
  const serviceData = {
    accessToken,
    idToken,
    scope: scopes
  };
  if (hasOwn.call(tokens, 'expiresIn')) {
    serviceData.expiresAt = Date.now() + 1000 * parseInt(tokens.expiresIn, 10);
  }
  const fields = Object.create(null);
  Google.whitelistedFields.forEach(function (name) {
    if (hasOwn.call(identity, name)) {
      fields[name] = identity[name];
    }
  });
  Object.assign(serviceData, fields);

  // only set the token in serviceData if it's there. this ensures
  // that we don't lose old ones (since we only get this on the first
  // log in attempt)
  if (tokens.refreshToken) {
    serviceData.refreshToken = tokens.refreshToken;
  }
  const returnValue = {
    serviceData,
    options: {
      profile: {
        name: identity.name
      }
    }
  };
  callback && callback(undefined, returnValue);
  return returnValue;
});
Accounts.registerLoginHandler(request => Promise.asyncApply(() => {
  if (request.googleSignIn !== true) {
    return;
  }
  const tokens = {
    accessToken: request.accessToken,
    refreshToken: request.refreshToken,
    idToken: request.idToken
  };
  if (request.serverAuthCode) {
    Object.assign(tokens, Promise.await(getTokens({
      code: request.serverAuthCode
    })));
  }
  let result;
  try {
    result = Promise.await(getServiceDataFromTokens(tokens));
  } catch (err) {
    throw Object.assign(new Error("Failed to complete OAuth handshake with Google. ".concat(err.message)), {
      response: err.response
    });
  }
  return Accounts.updateOrCreateUserFromExternalService('google', _objectSpread({
    id: request.userId,
    idToken: request.idToken,
    accessToken: request.accessToken,
    email: request.email,
    picture: request.imageUrl
  }, result.serviceData), result.options);
}));

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
// - refreshToken, if this is the first authorization request
const getTokens = (query, callback) => Promise.asyncApply(() => {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'google'
  });
  if (!config) throw new ServiceConfiguration.ConfigError();
  const content = new URLSearchParams({
    code: query.code,
    client_id: config.clientId,
    client_secret: OAuth.openSecret(config.secret),
    redirect_uri: OAuth._redirectUri('google', config),
    grant_type: 'authorization_code'
  });
  const request = Promise.await(fetch('https://accounts.google.com/o/oauth2/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: content
  }));
  const response = Promise.await(request.json());
  if (response.error) {
    // if the http response was a json object with an error attribute
    callback && callback(response.error);
    throw new Meteor.Error("Failed to complete OAuth handshake with Google. ".concat(response.error));
  } else {
    const data = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresIn: response.expires_in,
      idToken: response.id_token
    };
    callback && callback(undefined, data);
    return data;
  }
});
const getServiceData = query => Promise.asyncApply(() => getServiceDataFromTokens(Promise.await(getTokens(query))));
OAuth.registerService('google', 2, null, getServiceData);
const getIdentity = (accessToken, callback) => Promise.asyncApply(() => {
  const content = new URLSearchParams({
    access_token: accessToken
  });
  let response;
  try {
    const request = Promise.await(fetch("https://www.googleapis.com/oauth2/v1/userinfo?".concat(content.toString()), {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }));
    response = Promise.await(request.json());
  } catch (e) {
    callback && callback(e);
    throw new Meteor.Error(e.reason);
  }
  callback && callback(undefined, response);
  return response;
});
const getScopes = (accessToken, callback) => Promise.asyncApply(() => {
  const content = new URLSearchParams({
    access_token: accessToken
  });
  let response;
  try {
    const request = Promise.await(fetch("https://www.googleapis.com/oauth2/v1/tokeninfo?".concat(content.toString()), {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }));
    response = Promise.await(request.json());
  } catch (e) {
    callback && callback(e);
    throw new Meteor.Error(e.reason);
  }
  callback && callback(undefined, response.scope.split(' '));
  return response.scope.split(' ');
});
Google.retrieveCredential = (credentialToken, credentialSecret) => OAuth.retrieveCredential(credentialToken, credentialSecret);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"namespace.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/google-oauth/namespace.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  // The module.exports object of this module becomes the Google namespace
  // for other modules in this package.
  Google = module.exports;

  // So that api.export finds the "Google" property.
  Google.Google = Google;
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/google-oauth/google_server.js");
var exports = require("/node_modules/meteor/google-oauth/namespace.js");

/* Exports */
Package._define("google-oauth", exports, {
  Google: Google
});

})();

//# sourceURL=meteor://💻app/packages/google-oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZ29vZ2xlLW9hdXRoL2dvb2dsZV9zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2dvb2dsZS1vYXV0aC9uYW1lc3BhY2UuanMiXSwibmFtZXMiOlsiX29iamVjdFNwcmVhZCIsIm1vZHVsZSIsImxpbmsiLCJkZWZhdWx0IiwidiIsIkdvb2dsZSIsIkFjY291bnRzIiwiZmV0Y2giLCJoYXNPd24iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIndoaXRlbGlzdGVkRmllbGRzIiwiZ2V0U2VydmljZURhdGFGcm9tVG9rZW5zIiwidG9rZW5zIiwiY2FsbGJhY2siLCJhY2Nlc3NUb2tlbiIsImlkVG9rZW4iLCJzY29wZXMiLCJnZXRTY29wZXMiLCJjYXRjaCIsImVyciIsImVycm9yIiwiYXNzaWduIiwiRXJyb3IiLCJtZXNzYWdlIiwicmVzcG9uc2UiLCJpZGVudGl0eSIsImdldElkZW50aXR5Iiwic2VydmljZURhdGEiLCJzY29wZSIsImNhbGwiLCJleHBpcmVzQXQiLCJEYXRlIiwibm93IiwicGFyc2VJbnQiLCJleHBpcmVzSW4iLCJmaWVsZHMiLCJjcmVhdGUiLCJmb3JFYWNoIiwibmFtZSIsInJlZnJlc2hUb2tlbiIsInJldHVyblZhbHVlIiwib3B0aW9ucyIsInByb2ZpbGUiLCJ1bmRlZmluZWQiLCJyZWdpc3RlckxvZ2luSGFuZGxlciIsInJlcXVlc3QiLCJnb29nbGVTaWduSW4iLCJzZXJ2ZXJBdXRoQ29kZSIsImdldFRva2VucyIsImNvZGUiLCJyZXN1bHQiLCJ1cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIiwiaWQiLCJ1c2VySWQiLCJlbWFpbCIsInBpY3R1cmUiLCJpbWFnZVVybCIsInF1ZXJ5IiwiY29uZmlnIiwiU2VydmljZUNvbmZpZ3VyYXRpb24iLCJjb25maWd1cmF0aW9ucyIsImZpbmRPbmUiLCJzZXJ2aWNlIiwiQ29uZmlnRXJyb3IiLCJjb250ZW50IiwiVVJMU2VhcmNoUGFyYW1zIiwiY2xpZW50X2lkIiwiY2xpZW50SWQiLCJjbGllbnRfc2VjcmV0IiwiT0F1dGgiLCJvcGVuU2VjcmV0Iiwic2VjcmV0IiwicmVkaXJlY3RfdXJpIiwiX3JlZGlyZWN0VXJpIiwiZ3JhbnRfdHlwZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJib2R5IiwianNvbiIsIk1ldGVvciIsImRhdGEiLCJhY2Nlc3NfdG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwiZXhwaXJlc19pbiIsImlkX3Rva2VuIiwiZ2V0U2VydmljZURhdGEiLCJyZWdpc3RlclNlcnZpY2UiLCJ0b1N0cmluZyIsImUiLCJyZWFzb24iLCJzcGxpdCIsInJldHJpZXZlQ3JlZGVudGlhbCIsImNyZWRlbnRpYWxUb2tlbiIsImNyZWRlbnRpYWxTZWNyZXQiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhO0FBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLHNDQUFzQyxFQUFDO0VBQUNDLE9BQU8sQ0FBQ0MsQ0FBQyxFQUFDO0lBQUNKLGFBQWEsR0FBQ0ksQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFyRyxJQUFJQyxNQUFNO0FBQUNKLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLGdCQUFnQixFQUFDO0VBQUNDLE9BQU8sQ0FBQ0MsQ0FBQyxFQUFDO0lBQUNDLE1BQU0sR0FBQ0QsQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFDLElBQUlFLFFBQVE7QUFBQ0wsTUFBTSxDQUFDQyxJQUFJLENBQUMsc0JBQXNCLEVBQUM7RUFBQ0ksUUFBUSxDQUFDRixDQUFDLEVBQUM7SUFBQ0UsUUFBUSxHQUFDRixDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSUcsS0FBSztBQUFDTixNQUFNLENBQUNDLElBQUksQ0FBQyxjQUFjLEVBQUM7RUFBQ0ssS0FBSyxDQUFD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QUFFRCxRQUFRLDhCQUFLO0VBQ2pELE1BQU1tRCxPQUFPLEdBQUcsSUFBSUMsZUFBZSxDQUFDO0lBQUVpQixZQUFZLEVBQUVwRTtFQUFZLENBQUMsQ0FBQztFQUNsRSxJQUFJVSxRQUFRO0VBQ1osSUFBSTtJQUNGLE1BQU1xQixPQUFPLGlCQUFTeEMsS0FBSywwREFDeUIyRCxPQUFPLENBQUN3QixRQUFRLEVBQUUsR0FDcEU7TUFDRWIsTUFBTSxFQUFFLEtBQUs7TUFDYkMsT0FBTyxFQUFFO1FBQUVDLE1BQU0sRUFBRTtNQUFtQjtJQUN4QyxDQUFDLENBQ0Y7SUFDRHJELFFBQVEsaUJBQVNxQixPQUFPLENBQUNrQyxJQUFJLEVBQUU7RUFDakMsQ0FBQyxDQUFDLE9BQU9VLENBQUMsRUFBRTtJQUNWNUUsUUFBUSxJQUFJQSxRQUFRLENBQUM0RSxDQUFDLENBQUM7SUFDdkIsTUFBTSxJQUFJVCxNQUFNLENBQUMxRCxLQUFLLENBQUNtRSxDQUFDLENBQUNDLE1BQU0sQ0FBQztFQUNsQztFQUNBN0UsUUFBUSxJQUFJQSxRQUFRLENBQUM4QixTQUFTLEVBQUVuQixRQUFRLENBQUNJLEtBQUssQ0FBQytELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMxRCxPQUFPbkUsUUFBUSxDQUFDSSxLQUFLLENBQUMrRCxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQ2xDLENBQUM7QUFFRHhGLE1BQU0sQ0FBQ3lGLGtCQUFrQixHQUFHLENBQUNDLGVBQWUsRUFBRUMsZ0JBQWdCLEtBQzVEekIsS0FBSyxDQUFDdUIsa0JBQWtCLENBQUNDLGVBQWUsRUFBRUMsZ0JBQWdCLENBQUMsQzs7Ozs7Ozs7Ozs7O0VDck43RDtFQUNBO0VBQ0EzRixNQUFNLEdBQUdKLE1BQU0sQ0FBQ2dHLE9BQU87O0VBRXZCO0VBQ0E1RixNQUFNLENBQUNBLE1BQU0sR0FBR0EsTUFBTTtBQUFDLHFCIiwiZmlsZSI6Ii9wYWNrYWdlcy9nb29nbGUtb2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR29vZ2xlIGZyb20gJy4vbmFtZXNwYWNlLmpzJztcbmltcG9ydCB7IEFjY291bnRzIH0gZnJvbSAnbWV0ZW9yL2FjY291bnRzLWJhc2UnO1xuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tICdtZXRlb3IvZmV0Y2gnO1xuXG5jb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hY2NvdW50cy9kb2NzL09BdXRoMkxvZ2luI3VzZXJpbmZvY2FsbFxuR29vZ2xlLndoaXRlbGlzdGVkRmllbGRzID0gW1xuICAnaWQnLFxuICAnZW1haWwnLFxuICAndmVyaWZpZWRfZW1haWwnLFxuICAnbmFtZScsXG4gICdnaXZlbl9uYW1lJyxcbiAgJ2ZhbWlseV9uYW1lJyxcbiAgJ3BpY3R1cmUnLFxuICAnbG9jYWxlJyxcbiAgJ3RpbWV6b25lJyxcbiAgJ2dlbmRlcicsXG5dO1xuXG5jb25zdCBnZXRTZXJ2aWNlRGF0YUZyb21Ub2tlbnMgPSBhc3luYyAodG9rZW5zLCBjYWxsYmFjaykgPT4ge1xuICBjb25zdCB7IGFjY2Vzc1Rva2VuLCBpZFRva2VuIH0gPSB0b2tlbnM7XG4gIGNvbnN0IHNjb3BlcyA9IGF3YWl0IGdldFNjb3BlcyhhY2Nlc3NUb2tlbikuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnN0IGVycm9yID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIHRva2VuaW5mbyBmcm9tIEdvb2dsZS4gJHtlcnIubWVzc2FnZX1gKSxcbiAgICAgIHsgcmVzcG9uc2U6IGVyci5yZXNwb25zZSB9XG4gICAgKTtcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0pO1xuXG4gIGxldCBpZGVudGl0eSA9IGF3YWl0IGdldElkZW50aXR5KGFjY2Vzc1Rva2VuKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc3QgZXJyb3IgPSBPYmplY3QuYXNzaWduKFxuICAgICAgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggaWRlbnRpdHkgZnJvbSBHb29nbGUuICR7ZXJyLm1lc3NhZ2V9YCksXG4gICAgICB7IHJlc3BvbnNlOiBlcnIucmVzcG9uc2UgfVxuICAgICk7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9KTtcbiAgY29uc3Qgc2VydmljZURhdGEgPSB7XG4gICAgYWNjZXNzVG9rZW4sXG4gICAgaWRUb2tlbixcbiAgICBzY29wZTogc2NvcGVzLFxuICB9O1xuXG4gIGlmIChoYXNPd24uY2FsbCh0b2tlbnMsICdleHBpcmVzSW4nKSkge1xuICAgIHNlcnZpY2VEYXRhLmV4cGlyZXNBdCA9IERhdGUubm93KCkgKyAxMDAwICogcGFyc2VJbnQodG9rZW5zLmV4cGlyZXNJbiwgMTApO1xuICB9XG5cbiAgY29uc3QgZmllbGRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgR29vZ2xlLndoaXRlbGlzdGVkRmllbGRzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoaGFzT3duLmNhbGwoaWRlbnRpdHksIG5hbWUpKSB7XG4gICAgICBmaWVsZHNbbmFtZV0gPSBpZGVudGl0eVtuYW1lXTtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5hc3NpZ24oc2VydmljZURhdGEsIGZpZWxkcyk7XG5cbiAgLy8gb25seSBzZXQgdGhlIHRva2VuIGluIHNlcnZpY2VEYXRhIGlmIGl0J3MgdGhlcmUuIHRoaXMgZW5zdXJlc1xuICAvLyB0aGF0IHdlIGRvbid0IGxvc2Ugb2xkIG9uZXMgKHNpbmNlIHdlIG9ubHkgZ2V0IHRoaXMgb24gdGhlIGZpcnN0XG4gIC8vIGxvZyBpbiBhdHRlbXB0KVxuICBpZiAodG9rZW5zLnJlZnJlc2hUb2tlbikge1xuICAgIHNlcnZpY2VEYXRhLnJlZnJlc2hUb2tlbiA9IHRva2Vucy5yZWZyZXNoVG9rZW47XG4gIH1cbiAgY29uc3QgcmV0dXJuVmFsdWUgPSB7XG4gICAgc2VydmljZURhdGEsXG4gICAgb3B0aW9uczoge1xuICAgICAgcHJvZmlsZToge1xuICAgICAgICBuYW1lOiBpZGVudGl0eS5uYW1lLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIGNhbGxiYWNrICYmIGNhbGxiYWNrKHVuZGVmaW5lZCwgcmV0dXJuVmFsdWUpO1xuXG4gIHJldHVybiByZXR1cm5WYWx1ZTtcbn07XG5cbkFjY291bnRzLnJlZ2lzdGVyTG9naW5IYW5kbGVyKGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gIGlmIChyZXF1ZXN0Lmdvb2dsZVNpZ25JbiAhPT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0b2tlbnMgPSB7XG4gICAgYWNjZXNzVG9rZW46IHJlcXVlc3QuYWNjZXNzVG9rZW4sXG4gICAgcmVmcmVzaFRva2VuOiByZXF1ZXN0LnJlZnJlc2hUb2tlbixcbiAgICBpZFRva2VuOiByZXF1ZXN0LmlkVG9rZW4sXG4gIH07XG5cbiAgaWYgKHJlcXVlc3Quc2VydmVyQXV0aENvZGUpIHtcbiAgICBPYmplY3QuYXNzaWduKFxuICAgICAgdG9rZW5zLFxuICAgICAgYXdhaXQgZ2V0VG9rZW5zKHtcbiAgICAgICAgY29kZTogcmVxdWVzdC5zZXJ2ZXJBdXRoQ29kZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGxldCByZXN1bHQ7XG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gYXdhaXQgZ2V0U2VydmljZURhdGFGcm9tVG9rZW5zKHRva2Vucyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgdG8gY29tcGxldGUgT0F1dGggaGFuZHNoYWtlIHdpdGggR29vZ2xlLiAke2Vyci5tZXNzYWdlfWBcbiAgICAgICksXG4gICAgICB7IHJlc3BvbnNlOiBlcnIucmVzcG9uc2UgfVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIEFjY291bnRzLnVwZGF0ZU9yQ3JlYXRlVXNlckZyb21FeHRlcm5hbFNlcnZpY2UoXG4gICAgJ2dvb2dsZScsXG4gICAge1xuICAgICAgaWQ6IHJlcXVlc3QudXNlcklkLFxuICAgICAgaWRUb2tlbjogcmVxdWVzdC5pZFRva2VuLFxuICAgICAgYWNjZXNzVG9rZW46IHJlcXVlc3QuYWNjZXNzVG9rZW4sXG4gICAgICBlbWFpbDogcmVxdWVzdC5lbWFpbCxcbiAgICAgIHBpY3R1cmU6IHJlcXVlc3QuaW1hZ2VVcmwsXG4gICAgICAuLi5yZXN1bHQuc2VydmljZURhdGEsXG4gICAgfSxcbiAgICByZXN1bHQub3B0aW9uc1xuICApO1xufSk7XG5cbi8vIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmc6XG4vLyAtIGFjY2Vzc1Rva2VuXG4vLyAtIGV4cGlyZXNJbjogbGlmZXRpbWUgb2YgdG9rZW4gaW4gc2Vjb25kc1xuLy8gLSByZWZyZXNoVG9rZW4sIGlmIHRoaXMgaXMgdGhlIGZpcnN0IGF1dGhvcml6YXRpb24gcmVxdWVzdFxuY29uc3QgZ2V0VG9rZW5zID0gYXN5bmMgKHF1ZXJ5LCBjYWxsYmFjaykgPT4ge1xuICBjb25zdCBjb25maWcgPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5maW5kT25lKHtcbiAgICBzZXJ2aWNlOiAnZ29vZ2xlJyxcbiAgfSk7XG4gIGlmICghY29uZmlnKSB0aHJvdyBuZXcgU2VydmljZUNvbmZpZ3VyYXRpb24uQ29uZmlnRXJyb3IoKTtcblxuICBjb25zdCBjb250ZW50ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgY29kZTogcXVlcnkuY29kZSxcbiAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICBjbGllbnRfc2VjcmV0OiBPQXV0aC5vcGVuU2VjcmV0KGNvbmZpZy5zZWNyZXQpLFxuICAgIHJlZGlyZWN0X3VyaTogT0F1dGguX3JlZGlyZWN0VXJpKCdnb29nbGUnLCBjb25maWcpLFxuICAgIGdyYW50X3R5cGU6ICdhdXRob3JpemF0aW9uX2NvZGUnLFxuICB9KTtcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKCdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW4nLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgfSxcbiAgICBib2R5OiBjb250ZW50LFxuICB9KTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAvLyBpZiB0aGUgaHR0cCByZXNwb25zZSB3YXMgYSBqc29uIG9iamVjdCB3aXRoIGFuIGVycm9yIGF0dHJpYnV0ZVxuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3BvbnNlLmVycm9yKTtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFxuICAgICAgYEZhaWxlZCB0byBjb21wbGV0ZSBPQXV0aCBoYW5kc2hha2Ugd2l0aCBHb29nbGUuICR7cmVzcG9uc2UuZXJyb3J9YFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5hY2Nlc3NfdG9rZW4sXG4gICAgICByZWZyZXNoVG9rZW46IHJlc3BvbnNlLnJlZnJlc2hfdG9rZW4sXG4gICAgICBleHBpcmVzSW46IHJlc3BvbnNlLmV4cGlyZXNfaW4sXG4gICAgICBpZFRva2VuOiByZXNwb25zZS5pZF90b2tlbixcbiAgICB9O1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHVuZGVmaW5lZCwgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlcnZpY2VEYXRhID0gYXN5bmMgKHF1ZXJ5KSA9PlxuICBnZXRTZXJ2aWNlRGF0YUZyb21Ub2tlbnMoYXdhaXQgZ2V0VG9rZW5zKHF1ZXJ5KSk7XG5cbk9BdXRoLnJlZ2lzdGVyU2VydmljZSgnZ29vZ2xlJywgMiwgbnVsbCwgZ2V0U2VydmljZURhdGEpO1xuXG5jb25zdCBnZXRJZGVudGl0eSA9IGFzeW5jIChhY2Nlc3NUb2tlbiwgY2FsbGJhY2spID0+IHtcbiAgY29uc3QgY29udGVudCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pO1xuICBsZXQgcmVzcG9uc2U7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS91c2VyaW5mbz8ke2NvbnRlbnQudG9TdHJpbmcoKX1gLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICB9XG4gICAgKTtcbiAgICByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZSk7XG4gICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihlLnJlYXNvbik7XG4gIH1cbiAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodW5kZWZpbmVkLCByZXNwb25zZSk7XG4gIHJldHVybiByZXNwb25zZTtcbn07XG5cbmNvbnN0IGdldFNjb3BlcyA9IGFzeW5jIChhY2Nlc3NUb2tlbiwgY2FsbGJhY2spID0+IHtcbiAgY29uc3QgY29udGVudCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pO1xuICBsZXQgcmVzcG9uc2U7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS90b2tlbmluZm8/JHtjb250ZW50LnRvU3RyaW5nKCl9YCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczogeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgfVxuICAgICk7XG4gICAgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoZS5yZWFzb24pO1xuICB9XG4gIGNhbGxiYWNrICYmIGNhbGxiYWNrKHVuZGVmaW5lZCwgcmVzcG9uc2Uuc2NvcGUuc3BsaXQoJyAnKSk7XG4gIHJldHVybiByZXNwb25zZS5zY29wZS5zcGxpdCgnICcpO1xufTtcblxuR29vZ2xlLnJldHJpZXZlQ3JlZGVudGlhbCA9IChjcmVkZW50aWFsVG9rZW4sIGNyZWRlbnRpYWxTZWNyZXQpID0+XG4gIE9BdXRoLnJldHJpZXZlQ3JlZGVudGlhbChjcmVkZW50aWFsVG9rZW4sIGNyZWRlbnRpYWxTZWNyZXQpO1xuIiwiLy8gVGhlIG1vZHVsZS5leHBvcnRzIG9iamVjdCBvZiB0aGlzIG1vZHVsZSBiZWNvbWVzIHRoZSBHb29nbGUgbmFtZXNwYWNlXG4vLyBmb3Igb3RoZXIgbW9kdWxlcyBpbiB0aGlzIHBhY2thZ2UuXG5Hb29nbGUgPSBtb2R1bGUuZXhwb3J0cztcblxuLy8gU28gdGhhdCBhcGkuZXhwb3J0IGZpbmRzIHRoZSBcIkdvb2dsZVwiIHByb3BlcnR5LlxuR29vZ2xlLkdvb2dsZSA9IEdvb2dsZTtcbiJdfQ==
