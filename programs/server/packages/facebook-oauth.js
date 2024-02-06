(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var OAuth = Package.oauth.OAuth;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Facebook;

var require = meteorInstall({"node_modules":{"meteor":{"facebook-oauth":{"facebook_server.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/facebook-oauth/facebook_server.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _Meteor$settings, _Meteor$settings$publ, _Meteor$settings$publ2, _Meteor$settings$publ3;
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let crypto;
module.link("crypto", {
  default(v) {
    crypto = v;
  }
}, 0);
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }
}, 1);
Facebook = {};
const API_VERSION = ((_Meteor$settings = Meteor.settings) === null || _Meteor$settings === void 0 ? void 0 : (_Meteor$settings$publ = _Meteor$settings.public) === null || _Meteor$settings$publ === void 0 ? void 0 : (_Meteor$settings$publ2 = _Meteor$settings$publ.packages) === null || _Meteor$settings$publ2 === void 0 ? void 0 : (_Meteor$settings$publ3 = _Meteor$settings$publ2['facebook-oauth']) === null || _Meteor$settings$publ3 === void 0 ? void 0 : _Meteor$settings$publ3.apiVersion) || '13.0';
Facebook.handleAuthFromAccessToken = (accessToken, expiresAt) => Promise.asyncApply(() => {
  // include basic fields from facebook
  // https://developers.facebook.com/docs/facebook-login/permissions/
  const whitelisted = ['id', 'email', 'name', 'first_name', 'last_name', 'middle_name', 'name_format', 'picture', 'short_name'];
  const identity = Promise.await(getIdentity(accessToken, whitelisted));
  const fields = {};
  whitelisted.forEach(field => fields[field] = identity[field]);
  const serviceData = _objectSpread({
    accessToken,
    expiresAt
  }, fields);
  return {
    serviceData,
    options: {
      profile: {
        name: identity.name
      }
    }
  };
});
Accounts.registerLoginHandler(request => {
  if (request.facebookSignIn !== true) {
    return;
  }
  const facebookData = Facebook.handleAuthFromAccessToken(request.accessToken, +new Date() + 1000 * request.expirationTime);
  return Accounts.updateOrCreateUserFromExternalService('facebook', facebookData.serviceData, facebookData.options);
});
OAuth.registerService('facebook', 2, null, query => Promise.asyncApply(() => {
  const response = Promise.await(getTokenResponse(query));
  const {
    accessToken
  } = response;
  const {
    expiresIn
  } = response;
  return Facebook.handleAuthFromAccessToken(accessToken, +new Date() + 1000 * expiresIn);
}));
function getAbsoluteUrlOptions(query) {
  var _Meteor$settings2, _Meteor$settings2$pac, _Meteor$settings2$pac2;
  const overrideRootUrlFromStateRedirectUrl = (_Meteor$settings2 = Meteor.settings) === null || _Meteor$settings2 === void 0 ? void 0 : (_Meteor$settings2$pac = _Meteor$settings2.packages) === null || _Meteor$settings2$pac === void 0 ? void 0 : (_Meteor$settings2$pac2 = _Meteor$settings2$pac['facebook-oauth']) === null || _Meteor$settings2$pac2 === void 0 ? void 0 : _Meteor$settings2$pac2.overrideRootUrlFromStateRedirectUrl;
  if (!overrideRootUrlFromStateRedirectUrl) {
    return undefined;
  }
  try {
    const state = OAuth._stateFromQuery(query) || {};
    const redirectUrl = new URL(state.redirectUrl);
    return {
      rootUrl: redirectUrl.origin
    };
  } catch (e) {
    console.error("Failed to complete OAuth handshake with Facebook because it was not able to obtain the redirect url from the state and you are using overrideRootUrlFromStateRedirectUrl.", e);
    return undefined;
  }
}

/**
 * @typedef {Object} UserAccessToken
 * @property {string} accessToken - User access Token
 * @property {number} expiresIn - lifetime of token in seconds
 */
/**
 * @async
 * @function getTokenResponse
 * @param {Object} query - An object with the code.
 * @returns {Promise<UserAccessToken>} - Promise with an Object containing the accessToken and expiresIn (lifetime of token in seconds)
 */
const getTokenResponse = query => Promise.asyncApply(() => {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'facebook'
  });
  if (!config) throw new ServiceConfiguration.ConfigError();
  const absoluteUrlOptions = getAbsoluteUrlOptions(query);
  const redirectUri = OAuth._redirectUri('facebook', config, undefined, absoluteUrlOptions);
  return OAuth._fetch("https://graph.facebook.com/v".concat(API_VERSION, "/oauth/access_token"), 'GET', {
    queryParams: {
      client_id: config.appId,
      redirect_uri: redirectUri,
      client_secret: OAuth.openSecret(config.secret),
      code: query.code
    }
  }).then(res => res.json()).then(data => {
    const fbAccessToken = data.access_token;
    const fbExpires = data.expires_in;
    if (!fbAccessToken) {
      throw new Error("Failed to complete OAuth handshake with facebook " + "-- can't find access token in HTTP response. ".concat(data));
    }
    return {
      accessToken: fbAccessToken,
      expiresIn: fbExpires
    };
  }).catch(err => {
    throw Object.assign(new Error("Failed to complete OAuth handshake with Facebook. ".concat(err.message)), {
      response: err.response
    });
  });
});
const getIdentity = (accessToken, fields) => Promise.asyncApply(() => {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'facebook'
  });
  if (!config) throw new ServiceConfiguration.ConfigError();

  // Generate app secret proof that is a sha256 hash of the app access token, with the app secret as the key
  // https://developers.facebook.com/docs/graph-api/securing-requests#appsecret_proof
  const hmac = crypto.createHmac('sha256', OAuth.openSecret(config.secret));
  hmac.update(accessToken);
  return OAuth._fetch("https://graph.facebook.com/v".concat(API_VERSION, "/me"), 'GET', {
    queryParams: {
      access_token: accessToken,
      appsecret_proof: hmac.digest('hex'),
      fields: fields.join(',')
    }
  }).then(res => res.json()).catch(err => {
    throw Object.assign(new Error("Failed to fetch identity from Facebook. ".concat(err.message)), {
      response: err.response
    });
  });
});
Facebook.retrieveCredential = (credentialToken, credentialSecret) => OAuth.retrieveCredential(credentialToken, credentialSecret);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/facebook-oauth/facebook_server.js");

/* Exports */
Package._define("facebook-oauth", {
  Facebook: Facebook
});

})();

//# sourceURL=meteor://💻app/packages/facebook-oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZmFjZWJvb2stb2F1dGgvZmFjZWJvb2tfc2VydmVyLmpzIl0sIm5hbWVzIjpbIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJjcnlwdG8iLCJBY2NvdW50cyIsIkZhY2Vib29rIiwiQVBJX1ZFUlNJT04iLCJNZXRlb3IiLCJzZXR0aW5ncyIsInB1YmxpYyIsInBhY2thZ2VzIiwiYXBpVmVyc2lvbiIsImhhbmRsZUF1dGhGcm9tQWNjZXNzVG9rZW4iLCJhY2Nlc3NUb2tlbiIsImV4cGlyZXNBdCIsIndoaXRlbGlzdGVkIiwiaWRlbnRpdHkiLCJnZXRJZGVudGl0eSIsImZpZWxkcyIsImZvckVhY2giLCJmaWVsZCIsInNlcnZpY2VEYXRhIiwib3B0aW9ucyIsInByb2ZpbGUiLCJuYW1lIiwicmVnaXN0ZXJMb2dpbkhhbmRsZXIiLCJyZXF1ZXN0IiwiZmFjZWJvb2tTaWduSW4iLCJmYWNlYm9va0RhdGEiLCJEYXRlIiwiZXhwaXJhdGlvblRpbWUiLCJ1cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIiwiT0F1dGgiLCJyZWdpc3RlclNlcnZpY2UiLCJxdWVyeSIsInJlc3BvbnNlIiwiZ2V0VG9rZW5SZXNwb25zZSIsImV4cGlyZXNJbiIsImdldEFic29sdXRlVXJsT3B0aW9ucyIsIm92ZXJyaWRlUm9vdFVybEZyb21TdGF0ZVJlZGlyZWN0VXJsIiwidW5kZWZpbmVkIiwic3RhdGUiLCJfc3RhdGVGcm9tUXVlcnkiLCJyZWRpcmVjdFVybCIsIlVSTCIsInJvb3RVcmwiLCJvcmlnaW4iLCJlIiwiY29uc29sZSIsImVycm9yIiwiY29uZmlnIiwiU2VydmljZUNvbmZpZ3VyYXRpb24iLCJjb25maWd1cmF0aW9ucyIsImZpbmRPbmUiLCJzZXJ2aWNlIiwiQ29uZmlnRXJyb3IiLCJhYnNvbHV0ZVVybE9wdGlvbnMiLCJyZWRpcmVjdFVyaSIsIl9yZWRpcmVjdFVyaSIsIl9mZXRjaCIsInF1ZXJ5UGFyYW1zIiwiY2xpZW50X2lkIiwiYXBwSWQiLCJyZWRpcmVjdF91cmkiLCJjbGllbnRfc2VjcmV0Iiwib3BlblNlY3JldCIsInNlY3JldCIsImNvZGUiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJmYkFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwiZmJFeHBpcmVzIiwiZXhwaXJlc19pbiIsIkVycm9yIiwiY2F0Y2giLCJlcnIiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXNzYWdlIiwiaG1hYyIsImNyZWF0ZUhtYWMiLCJ1cGRhdGUiLCJhcHBzZWNyZXRfcHJvb2YiLCJkaWdlc3QiLCJqb2luIiwicmV0cmlldmVDcmVkZW50aWFsIiwiY3JlZGVudGlhbFRva2VuIiwiY3JlZGVudGlhbFNlY3JldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsYUFBYTtBQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQyxzQ0FBc0MsRUFBQztFQUFDQyxPQUFPLENBQUNDLENBQUMsRUFBQztJQUFDSixhQUFhLEdBQUNJLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBckcsSUFBSUMsTUFBTTtBQUFDSixNQUFNLENBQUNDLElBQUksQ0FBQyxRQUFRLEVBQUM7RUFBQ0MsT0FBTyxDQUFDQyxDQUFDLEVBQUM7SUFBQ0MsTUFBTSxHQUFDRCxDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSUUsUUFBUTtBQUFDTCxNQUFNLENBQUNDLElBQUksQ0FBQyxzQkFBc0IsRUFBQztFQUFDSSxRQUFRLENBQUNGLENBQUMsRUFBQztJQUFDRSxRQUFRLEdBQUNGLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBdElHLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFJYixNQUFNQyxXQUFXLEdBQUcscUJBQUFDLE1BQU0sQ0FBQ0MsUUFBUSw4RUFBZixpQkFBaUJDLE1BQU0sb0ZBQXZCLHNCQUF5QkMs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QUFFMkMsR0FBRyxDQUFDM0M7SUFBUyxDQUFDLENBQzNCO0VBQ0gsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEOUIsUUFBUSxDQUFDbUYsa0JBQWtCLEdBQUcsQ0FBQ0MsZUFBZSxFQUFFQyxnQkFBZ0IsS0FDOUQxRCxLQUFLLENBQUN3RCxrQkFBa0IsQ0FBQ0MsZUFBZSxFQUFFQyxnQkFBZ0IsQ0FBQyxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9mYWNlYm9vay1vYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIkZhY2Vib29rID0ge307XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBBY2NvdW50cyB9IGZyb20gJ21ldGVvci9hY2NvdW50cy1iYXNlJztcblxuY29uc3QgQVBJX1ZFUlNJT04gPSBNZXRlb3Iuc2V0dGluZ3M/LnB1YmxpYz8ucGFja2FnZXM/LlsnZmFjZWJvb2stb2F1dGgnXT8uYXBpVmVyc2lvbiB8fCAnMTMuMCc7XG5cbkZhY2Vib29rLmhhbmRsZUF1dGhGcm9tQWNjZXNzVG9rZW4gPSBhc3luYyAoYWNjZXNzVG9rZW4sIGV4cGlyZXNBdCkgPT4ge1xuICAvLyBpbmNsdWRlIGJhc2ljIGZpZWxkcyBmcm9tIGZhY2Vib29rXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9mYWNlYm9vay1sb2dpbi9wZXJtaXNzaW9ucy9cbiAgY29uc3Qgd2hpdGVsaXN0ZWQgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnLCAnZmlyc3RfbmFtZScsICdsYXN0X25hbWUnLFxuICAgICdtaWRkbGVfbmFtZScsICduYW1lX2Zvcm1hdCcsICdwaWN0dXJlJywgJ3Nob3J0X25hbWUnXTtcblxuICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IGdldElkZW50aXR5KGFjY2Vzc1Rva2VuLCB3aGl0ZWxpc3RlZCk7XG5cbiAgY29uc3QgZmllbGRzID0ge307XG4gIHdoaXRlbGlzdGVkLmZvckVhY2goZmllbGQgPT4gZmllbGRzW2ZpZWxkXSA9IGlkZW50aXR5W2ZpZWxkXSk7XG4gIGNvbnN0IHNlcnZpY2VEYXRhID0ge1xuICAgIGFjY2Vzc1Rva2VuLFxuICAgIGV4cGlyZXNBdCxcbiAgICAuLi5maWVsZHMsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXJ2aWNlRGF0YSxcbiAgICBvcHRpb25zOiB7cHJvZmlsZToge25hbWU6IGlkZW50aXR5Lm5hbWV9fVxuICB9O1xufTtcblxuQWNjb3VudHMucmVnaXN0ZXJMb2dpbkhhbmRsZXIocmVxdWVzdCA9PiB7XG4gIGlmIChyZXF1ZXN0LmZhY2Vib29rU2lnbkluICE9PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGZhY2Vib29rRGF0YSA9IEZhY2Vib29rLmhhbmRsZUF1dGhGcm9tQWNjZXNzVG9rZW4ocmVxdWVzdC5hY2Nlc3NUb2tlbiwgKCtuZXcgRGF0ZSkgKyAoMTAwMCAqIHJlcXVlc3QuZXhwaXJhdGlvblRpbWUpKTtcbiAgcmV0dXJuIEFjY291bnRzLnVwZGF0ZU9yQ3JlYXRlVXNlckZyb21FeHRlcm5hbFNlcnZpY2UoJ2ZhY2Vib29rJywgZmFjZWJvb2tEYXRhLnNlcnZpY2VEYXRhLCBmYWNlYm9va0RhdGEub3B0aW9ucyk7XG59KTtcblxuT0F1dGgucmVnaXN0ZXJTZXJ2aWNlKCdmYWNlYm9vaycsIDIsIG51bGwsIGFzeW5jIHF1ZXJ5ID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRUb2tlblJlc3BvbnNlKHF1ZXJ5KTtcbiAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gcmVzcG9uc2U7XG4gIGNvbnN0IHsgZXhwaXJlc0luIH0gPSByZXNwb25zZTtcblxuICByZXR1cm4gRmFjZWJvb2suaGFuZGxlQXV0aEZyb21BY2Nlc3NUb2tlbihhY2Nlc3NUb2tlbiwgKCtuZXcgRGF0ZSkgKyAoMTAwMCAqIGV4cGlyZXNJbikpO1xufSk7XG5cbmZ1bmN0aW9uIGdldEFic29sdXRlVXJsT3B0aW9ucyhxdWVyeSkge1xuICBjb25zdCBvdmVycmlkZVJvb3RVcmxGcm9tU3RhdGVSZWRpcmVjdFVybCA9IE1ldGVvci5zZXR0aW5ncz8ucGFja2FnZXM/LlsnZmFjZWJvb2stb2F1dGgnXT8ub3ZlcnJpZGVSb290VXJsRnJvbVN0YXRlUmVkaXJlY3RVcmw7XG4gIGlmICghb3ZlcnJpZGVSb290VXJsRnJvbVN0YXRlUmVkaXJlY3RVcmwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3Qgc3RhdGUgPSBPQXV0aC5fc3RhdGVGcm9tUXVlcnkocXVlcnkpIHx8IHt9O1xuICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gbmV3IFVSTChzdGF0ZS5yZWRpcmVjdFVybCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvb3RVcmw6IHJlZGlyZWN0VXJsLm9yaWdpbixcbiAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGBGYWlsZWQgdG8gY29tcGxldGUgT0F1dGggaGFuZHNoYWtlIHdpdGggRmFjZWJvb2sgYmVjYXVzZSBpdCB3YXMgbm90IGFibGUgdG8gb2J0YWluIHRoZSByZWRpcmVjdCB1cmwgZnJvbSB0aGUgc3RhdGUgYW5kIHlvdSBhcmUgdXNpbmcgb3ZlcnJpZGVSb290VXJsRnJvbVN0YXRlUmVkaXJlY3RVcmwuYCwgZVxuICAgICk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJBY2Nlc3NUb2tlblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFjY2Vzc1Rva2VuIC0gVXNlciBhY2Nlc3MgVG9rZW5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBleHBpcmVzSW4gLSBsaWZldGltZSBvZiB0b2tlbiBpbiBzZWNvbmRzXG4gKi9cbi8qKlxuICogQGFzeW5jXG4gKiBAZnVuY3Rpb24gZ2V0VG9rZW5SZXNwb25zZVxuICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5IC0gQW4gb2JqZWN0IHdpdGggdGhlIGNvZGUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxVc2VyQWNjZXNzVG9rZW4+fSAtIFByb21pc2Ugd2l0aCBhbiBPYmplY3QgY29udGFpbmluZyB0aGUgYWNjZXNzVG9rZW4gYW5kIGV4cGlyZXNJbiAobGlmZXRpbWUgb2YgdG9rZW4gaW4gc2Vjb25kcylcbiAqL1xuY29uc3QgZ2V0VG9rZW5SZXNwb25zZSA9IGFzeW5jIChxdWVyeSkgPT4ge1xuICBjb25zdCBjb25maWcgPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5maW5kT25lKHtcbiAgICBzZXJ2aWNlOiAnZmFjZWJvb2snLFxuICB9KTtcbiAgaWYgKCFjb25maWcpIHRocm93IG5ldyBTZXJ2aWNlQ29uZmlndXJhdGlvbi5Db25maWdFcnJvcigpO1xuXG4gIGNvbnN0IGFic29sdXRlVXJsT3B0aW9ucyA9IGdldEFic29sdXRlVXJsT3B0aW9ucyhxdWVyeSk7XG4gIGNvbnN0IHJlZGlyZWN0VXJpID0gT0F1dGguX3JlZGlyZWN0VXJpKCdmYWNlYm9vaycsIGNvbmZpZywgdW5kZWZpbmVkLCBhYnNvbHV0ZVVybE9wdGlvbnMpO1xuXG4gIHJldHVybiBPQXV0aC5fZmV0Y2goXG4gICAgYGh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3Yke0FQSV9WRVJTSU9OfS9vYXV0aC9hY2Nlc3NfdG9rZW5gLFxuICAgICdHRVQnLFxuICAgIHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIGNsaWVudF9pZDogY29uZmlnLmFwcElkLFxuICAgICAgICByZWRpcmVjdF91cmk6IHJlZGlyZWN0VXJpLFxuICAgICAgICBjbGllbnRfc2VjcmV0OiBPQXV0aC5vcGVuU2VjcmV0KGNvbmZpZy5zZWNyZXQpLFxuICAgICAgICBjb2RlOiBxdWVyeS5jb2RlLFxuICAgICAgfSxcbiAgICB9XG4gIClcbiAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc3QgZmJBY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgY29uc3QgZmJFeHBpcmVzID0gZGF0YS5leHBpcmVzX2luO1xuICAgICAgaWYgKCFmYkFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBjb21wbGV0ZSBPQXV0aCBoYW5kc2hha2Ugd2l0aCBmYWNlYm9vayBcIiArXG4gICAgICAgICAgYC0tIGNhbid0IGZpbmQgYWNjZXNzIHRva2VuIGluIEhUVFAgcmVzcG9uc2UuICR7ZGF0YX1gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiBmYkFjY2Vzc1Rva2VuLFxuICAgICAgICBleHBpcmVzSW46IGZiRXhwaXJlc1xuICAgICAgfTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgYEZhaWxlZCB0byBjb21wbGV0ZSBPQXV0aCBoYW5kc2hha2Ugd2l0aCBGYWNlYm9vay4gJHtlcnIubWVzc2FnZX1gXG4gICAgICAgICksXG4gICAgICAgIHsgcmVzcG9uc2U6IGVyci5yZXNwb25zZSB9XG4gICAgICApO1xuICAgIH0pO1xufTtcblxuY29uc3QgZ2V0SWRlbnRpdHkgPSBhc3luYyAoYWNjZXNzVG9rZW4sIGZpZWxkcykgPT4ge1xuICBjb25zdCBjb25maWcgPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5maW5kT25lKHtcbiAgICBzZXJ2aWNlOiAnZmFjZWJvb2snLFxuICB9KTtcbiAgaWYgKCFjb25maWcpIHRocm93IG5ldyBTZXJ2aWNlQ29uZmlndXJhdGlvbi5Db25maWdFcnJvcigpO1xuXG4gIC8vIEdlbmVyYXRlIGFwcCBzZWNyZXQgcHJvb2YgdGhhdCBpcyBhIHNoYTI1NiBoYXNoIG9mIHRoZSBhcHAgYWNjZXNzIHRva2VuLCB3aXRoIHRoZSBhcHAgc2VjcmV0IGFzIHRoZSBrZXlcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL2dyYXBoLWFwaS9zZWN1cmluZy1yZXF1ZXN0cyNhcHBzZWNyZXRfcHJvb2ZcbiAgY29uc3QgaG1hYyA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGEyNTYnLCBPQXV0aC5vcGVuU2VjcmV0KGNvbmZpZy5zZWNyZXQpKTtcbiAgaG1hYy51cGRhdGUoYWNjZXNzVG9rZW4pO1xuXG4gIHJldHVybiBPQXV0aC5fZmV0Y2goYGh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3Yke0FQSV9WRVJTSU9OfS9tZWAsICdHRVQnLCB7XG4gICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICBhcHBzZWNyZXRfcHJvb2Y6IGhtYWMuZGlnZXN0KCdoZXgnKSxcbiAgICAgIGZpZWxkczogZmllbGRzLmpvaW4oJywnKSxcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGlkZW50aXR5IGZyb20gRmFjZWJvb2suICR7ZXJyLm1lc3NhZ2V9YCksXG4gICAgICAgIHsgcmVzcG9uc2U6IGVyci5yZXNwb25zZSB9XG4gICAgICApO1xuICAgIH0pO1xufTtcblxuRmFjZWJvb2sucmV0cmlldmVDcmVkZW50aWFsID0gKGNyZWRlbnRpYWxUb2tlbiwgY3JlZGVudGlhbFNlY3JldCkgPT5cbiAgT0F1dGgucmV0cmlldmVDcmVkZW50aWFsKGNyZWRlbnRpYWxUb2tlbiwgY3JlZGVudGlhbFNlY3JldCk7XG5cbiJdfQ==
