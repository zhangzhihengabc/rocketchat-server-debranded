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

var require = meteorInstall({"node_modules":{"meteor":{"pauli:linkedin-oauth":{"linkedin-server.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/pauli_linkedin-oauth/linkedin-server.js                                              //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
module.export({
  Linkedin: () => Linkedin
});
let fetch;
module.link("meteor/fetch", {
  fetch(v) {
    fetch = v;
  }
}, 0);
let OAuth;
module.link("meteor/oauth", {
  OAuth(v) {
    OAuth = v;
  }
}, 1);
let ServiceConfiguration;
module.link("meteor/service-configuration", {
  ServiceConfiguration(v) {
    ServiceConfiguration = v;
  }
}, 2);
const Linkedin = {};
// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
const getTokenResponse = function (query) {
  return Promise.asyncApply(() => {
    const config = Promise.await(ServiceConfiguration.configurations.findOneAsync({
      service: 'linkedin'
    }));
    if (!config) throw new ServiceConfiguration.ConfigError('Service not configured');
    let responseContent;
    try {
      // Request an access token
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        code: query.code,
        redirect_uri: OAuth._redirectUri('linkedin', config)
      });
      const response = Promise.await(fetch('https://api.linkedin.com/uas/oauth2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      }));
      if (!response.ok) {
        throw new Error(responseContent.error_description);
      }
      responseContent = Promise.await(response.json());
    } catch (err) {
      throw new Error("Failed to complete OAuth handshake with Linkedin. ".concat(err.message));
    }

    // Success! Extract access token and expiration
    const accessToken = responseContent.access_token;
    const expiresIn = responseContent.expires_in;
    if (!accessToken) {
      throw new Error("Failed to complete OAuth handshake with Linkedin -- can't find access token in HTTP response. ".concat(JSON.stringify(responseContent)));
    }
    return {
      accessToken,
      expiresIn
    };
  });
};

// Request available fields from profile
const getIdentity = function (accessToken) {
  return Promise.asyncApply(() => {
    try {
      const url = encodeURI("https://api.linkedin.com/v2/userinfo");
      const request = Promise.await(fetch(url, {
        method: 'GET',
        headers: {
          Authorization: "Bearer ".concat(accessToken)
        }
      }));
      if (!request.ok) {
        throw new Error(Promise.await(request.text()));
      }
      return request.json();
    } catch (err) {
      throw new Error("Failed to fetch identity from Linkedin. ".concat(err.message));
    }
  });
};
OAuth.registerService('linkedin', 2, null, query => Promise.asyncApply(() => {
  const response = Promise.await(getTokenResponse(query));
  const {
    accessToken
  } = response;
  const identity = Promise.await(getIdentity(accessToken));
  const {
    sub,
    given_name,
    family_name,
    picture,
    email
  } = identity;
  if (!sub) {
    throw new Error('Linkedin did not provide an id');
  }
  const fields = {
    linkedinId: sub,
    firstName: given_name,
    lastName: family_name,
    profilePicture: picture,
    emailAddress: email,
    email
  };
  const serviceData = _objectSpread({
    id: sub,
    accessToken,
    expiresAt: +new Date() + 1000 * response.expiresIn
  }, fields);
  return {
    serviceData,
    options: {
      profile: fields
    }
  };
}));
Linkedin.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/pauli:linkedin-oauth/linkedin-server.js");

/* Exports */
Package._define("pauli:linkedin-oauth", exports);

})();

//# sourceURL=meteor://💻app/packages/pauli_linkedin-oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGF1bGk6bGlua2VkaW4tb2F1dGgvbGlua2VkaW4tc2VydmVyLmpzIl0sIm5hbWVzIjpbIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJleHBvcnQiLCJMaW5rZWRpbiIsImZldGNoIiwiT0F1dGgiLCJTZXJ2aWNlQ29uZmlndXJhdGlvbiIsImdldFRva2VuUmVzcG9uc2UiLCJxdWVyeSIsImNvbmZpZyIsImNvbmZpZ3VyYXRpb25zIiwiZmluZE9uZUFzeW5jIiwic2VydmljZSIsIkNvbmZpZ0Vycm9yIiwicmVzcG9uc2VDb250ZW50IiwiYm9keSIsIlVSTFNlYXJjaFBhcmFtcyIsImdyYW50X3R5cGUiLCJjbGllbnRfaWQiLCJjbGllbnRJZCIsImNsaWVudF9zZWNyZXQiLCJvcGVuU2VjcmV0Iiwic2VjcmV0IiwiY29kZSIsInJlZGlyZWN0X3VyaSIsIl9yZWRpcmVjdFVyaSIsInJlc3BvbnNlIiwibWV0aG9kIiwiaGVhZGVycyIsIm9rIiwiRXJyb3IiLCJlcnJvcl9kZXNjcmlwdGlvbiIsImpzb24iLCJlcnIiLCJtZXNzYWdlIiwiYWNjZXNzVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJleHBpcmVzSW4iLCJleHBpcmVzX2luIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldElkZW50aXR5IiwidXJsIiwiZW5jb2RlVVJJIiwicmVxdWVzdCIsIkF1dGhvcml6YXRpb24iLCJ0ZXh0IiwicmVnaXN0ZXJTZXJ2aWNlIiwiaWRlbnRpdHkiLCJzdWIiLCJnaXZlbl9uYW1lIiwiZmFtaWx5X25hbWUiLCJwaWN0dXJlIiwiZW1haWwiLCJmaWVsZHMiLCJsaW5rZWRpbklkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJwcm9maWxlUGljdHVyZSIsImVtYWlsQWRkcmVzcyIsInNlcnZpY2VEYXRhIiwiaWQiLCJleHBpcmVzQXQiLCJEYXRlIiwib3B0aW9ucyIsInByb2ZpbGUiLCJyZXRyaWV2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QUNmTyxTQUFTLEVBQUVOLFVBQVU7SUFDckJPLFFBQVEsRUFBRU4sV0FBVztJQUNyQk8sY0FBYyxFQUFFTixPQUFPO0lBQ3ZCTyxZQUFZLEVBQUVOLEtBQUs7SUFDbkJBO0VBQ0QsQ0FBQztFQUVELE1BQU1PLFdBQVc7SUFDaEJDLEVBQUUsRUFBRVosR0FBRztJQUNQZCxXQUFXO0lBQ1gyQixTQUFTLEVBQUUsQ0FBQyxJQUFJQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUdyQyxRQUFRLENBQUNXO0VBQVMsR0FDL0NpQixNQUFNLENBQ1Q7RUFFRCxPQUFPO0lBQ05NLFdBQVc7SUFDWEksT0FBTyxFQUFFO01BQ1JDLE9BQU8sRUFBRVg7SUFDVjtFQUNELENBQUM7QUFDRixDQUFDLEVBQUM7QUFFRm5ELFFBQVEsQ0FBQytELGtCQUFrQixHQUFHLFVBQVVDLGVBQWUsRUFBRUMsZ0JBQWdCLEVBQUU7RUFDMUUsT0FBTy9ELEtBQUssQ0FBQzZELGtCQUFrQixDQUFDQyxlQUFlLEVBQUVDLGdCQUFnQixDQUFDO0FBQ25FLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvcGF1bGlfbGlua2VkaW4tb2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmZXRjaCB9IGZyb20gJ21ldGVvci9mZXRjaCc7XG5pbXBvcnQgeyBPQXV0aCB9IGZyb20gJ21ldGVvci9vYXV0aCc7XG5pbXBvcnQgeyBTZXJ2aWNlQ29uZmlndXJhdGlvbiB9IGZyb20gJ21ldGVvci9zZXJ2aWNlLWNvbmZpZ3VyYXRpb24nO1xuXG5leHBvcnQgY29uc3QgTGlua2VkaW4gPSB7fTtcblxuLy8gcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZzpcbi8vIC0gYWNjZXNzVG9rZW5cbi8vIC0gZXhwaXJlc0luOiBsaWZldGltZSBvZiB0b2tlbiBpbiBzZWNvbmRzXG5jb25zdCBnZXRUb2tlblJlc3BvbnNlID0gYXN5bmMgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cdGNvbnN0IGNvbmZpZyA9IGF3YWl0IFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmRPbmVBc3luYyh7IHNlcnZpY2U6ICdsaW5rZWRpbicgfSk7XG5cdGlmICghY29uZmlnKSB0aHJvdyBuZXcgU2VydmljZUNvbmZpZ3VyYXRpb24uQ29uZmlnRXJyb3IoJ1NlcnZpY2Ugbm90IGNvbmZpZ3VyZWQnKTtcblxuXHRsZXQgcmVzcG9uc2VDb250ZW50O1xuXHR0cnkge1xuXHRcdC8vIFJlcXVlc3QgYW4gYWNjZXNzIHRva2VuXG5cdFx0Y29uc3QgYm9keSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuXHRcdFx0Z3JhbnRfdHlwZTogJ2F1dGhvcml6YXRpb25fY29kZScsXG5cdFx0XHRjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcblx0XHRcdGNsaWVudF9zZWNyZXQ6IE9BdXRoLm9wZW5TZWNyZXQoY29uZmlnLnNlY3JldCksXG5cdFx0XHRjb2RlOiBxdWVyeS5jb2RlLFxuXHRcdFx0cmVkaXJlY3RfdXJpOiBPQXV0aC5fcmVkaXJlY3RVcmkoJ2xpbmtlZGluJywgY29uZmlnKSxcblx0XHR9KTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2FjY2Vzc1Rva2VuJywge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcblx0XHRcdH0sXG5cdFx0XHRib2R5LFxuXHRcdH0pO1xuXG5cdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlQ29udGVudC5lcnJvcl9kZXNjcmlwdGlvbik7XG5cdFx0fVxuXG5cdFx0cmVzcG9uc2VDb250ZW50ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjb21wbGV0ZSBPQXV0aCBoYW5kc2hha2Ugd2l0aCBMaW5rZWRpbi4gJHtlcnIubWVzc2FnZX1gKTtcblx0fVxuXG5cdC8vIFN1Y2Nlc3MhIEV4dHJhY3QgYWNjZXNzIHRva2VuIGFuZCBleHBpcmF0aW9uXG5cdGNvbnN0IGFjY2Vzc1Rva2VuID0gcmVzcG9uc2VDb250ZW50LmFjY2Vzc190b2tlbjtcblx0Y29uc3QgZXhwaXJlc0luID0gcmVzcG9uc2VDb250ZW50LmV4cGlyZXNfaW47XG5cblx0aWYgKCFhY2Nlc3NUb2tlbikge1xuXHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNvbXBsZXRlIE9BdXRoIGhhbmRzaGFrZSB3aXRoIExpbmtlZGluIC0tIGNhbid0IGZpbmQgYWNjZXNzIHRva2VuIGluIEhUVFAgcmVzcG9uc2UuICR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2VDb250ZW50KX1gKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0YWNjZXNzVG9rZW4sXG5cdFx0ZXhwaXJlc0luLFxuXHR9O1xufTtcblxuLy8gUmVxdWVzdCBhdmFpbGFibGUgZmllbGRzIGZyb20gcHJvZmlsZVxuY29uc3QgZ2V0SWRlbnRpdHkgPSBhc3luYyBmdW5jdGlvbiAoYWNjZXNzVG9rZW4pIHtcblx0dHJ5IHtcblx0XHRjb25zdCB1cmwgPSBlbmNvZGVVUkkoXG5cdFx0XHRgaHR0cHM6Ly9hcGkubGlua2VkaW4uY29tL3YyL3VzZXJpbmZvYCxcblx0XHQpO1xuXHRcdGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gLFxuXHRcdFx0fSxcblx0XHR9KTtcblxuXHRcdGlmICghcmVxdWVzdC5vaykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGF3YWl0IHJlcXVlc3QudGV4dCgpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVxdWVzdC5qc29uKCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGlkZW50aXR5IGZyb20gTGlua2VkaW4uICR7ZXJyLm1lc3NhZ2V9YCk7XG5cdH1cbn07XG5cbk9BdXRoLnJlZ2lzdGVyU2VydmljZSgnbGlua2VkaW4nLCAyLCBudWxsLCBhc3luYyAocXVlcnkpID0+IHtcblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRUb2tlblJlc3BvbnNlKHF1ZXJ5KTtcblx0Y29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gcmVzcG9uc2U7XG5cdGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgZ2V0SWRlbnRpdHkoYWNjZXNzVG9rZW4pO1xuXG5cdGNvbnN0IHsgc3ViLCBnaXZlbl9uYW1lLCBmYW1pbHlfbmFtZSwgcGljdHVyZSwgZW1haWwgfSA9IGlkZW50aXR5O1xuXG5cdGlmICghc3ViKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdMaW5rZWRpbiBkaWQgbm90IHByb3ZpZGUgYW4gaWQnKTtcblx0fVxuXG5cdGNvbnN0IGZpZWxkcyA9IHtcblx0XHRsaW5rZWRpbklkOiBzdWIsXG5cdFx0Zmlyc3ROYW1lOiBnaXZlbl9uYW1lLFxuXHRcdGxhc3ROYW1lOiBmYW1pbHlfbmFtZSxcblx0XHRwcm9maWxlUGljdHVyZTogcGljdHVyZSxcblx0XHRlbWFpbEFkZHJlc3M6IGVtYWlsLFxuXHRcdGVtYWlsXG5cdH07XG5cblx0Y29uc3Qgc2VydmljZURhdGEgPSB7XG5cdFx0aWQ6IHN1Yixcblx0XHRhY2Nlc3NUb2tlbixcblx0XHRleHBpcmVzQXQ6ICtuZXcgRGF0ZSgpICsgMTAwMCAqIHJlc3BvbnNlLmV4cGlyZXNJbixcblx0XHQuLi5maWVsZHMsXG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRzZXJ2aWNlRGF0YSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRwcm9maWxlOiBmaWVsZHMsXG5cdFx0fSxcblx0fTtcbn0pO1xuXG5MaW5rZWRpbi5yZXRyaWV2ZUNyZWRlbnRpYWwgPSBmdW5jdGlvbiAoY3JlZGVudGlhbFRva2VuLCBjcmVkZW50aWFsU2VjcmV0KSB7XG5cdHJldHVybiBPQXV0aC5yZXRyaWV2ZUNyZWRlbnRpYWwoY3JlZGVudGlhbFRva2VuLCBjcmVkZW50aWFsU2VjcmV0KTtcbn07XG4iXX0=
