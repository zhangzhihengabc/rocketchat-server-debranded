(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var OAuth = Package.oauth.OAuth;
var ECMAScript = Package.ecmascript.ECMAScript;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var MeteorDeveloperAccounts;

var require = meteorInstall({"node_modules":{"meteor":{"meteor-developer-oauth":{"meteor_developer_common.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/meteor-developer-oauth/meteor_developer_common.js                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
MeteorDeveloperAccounts = {};
MeteorDeveloperAccounts._server = "https://www.meteor.com";

// Options are:
//  - developerAccountsServer: defaults to "https://www.meteor.com"
MeteorDeveloperAccounts._config = options => {
  if (options.developerAccountsServer) {
    MeteorDeveloperAccounts._server = options.developerAccountsServer;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"meteor_developer_server.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/meteor-developer-oauth/meteor_developer_server.js                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
OAuth.registerService("meteor-developer", 2, null, query => Promise.asyncApply(() => {
  const response = Promise.await(getTokens(query));
  const {
    accessToken
  } = response;
  const identity = Promise.await(getIdentity(accessToken));
  const serviceData = {
    accessToken: OAuth.sealSecret(accessToken),
    expiresAt: +new Date() + 1000 * response.expiresIn
  };
  Object.assign(serviceData, identity);

  // only set the token in serviceData if it's there. this ensures
  // that we don't lose old ones (since we only get this on the first
  // log in attempt)
  if (response.refreshToken) serviceData.refreshToken = OAuth.sealSecret(response.refreshToken);
  return {
    serviceData,
    options: {
      profile: {
        name: serviceData.username
      }
    }
    // XXX use username for name until meteor accounts has a profile with a name
  };
}));

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
// - refreshToken, if this is the first authorization request and we got a
//   refresh token from the server
const getTokens = query => Promise.asyncApply(() => {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'meteor-developer'
  });
  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }
  const body = OAuth._addValuesToQueryParams({
    grant_type: 'authorization_code',
    code: query.code,
    client_id: config.clientId,
    client_secret: OAuth.openSecret(config.secret),
    redirect_uri: OAuth._redirectUri('meteor-developer', config)
  }).toString();
  return OAuth._fetch(MeteorDeveloperAccounts._server + '/oauth2/token', 'POST', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body
  }).then(data => data.json()).then(data => {
    if (data.error) {
      throw new Error('Failed to complete OAuth handshake with Meteor developer accounts. ' + (data ? data.error : 'No response data'));
    }
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in
    };
  }).catch(err => {
    throw Object.assign(new Error("Failed to complete OAuth handshake with Meteor developer accounts. ".concat(err.message)), {
      response: err.response
    });
  });
});
const getIdentity = accessToken => Promise.asyncApply(() => {
  return OAuth._fetch("".concat(MeteorDeveloperAccounts._server, "/api/v1/identity"), 'GET', {
    headers: {
      Authorization: "Bearer ".concat(accessToken)
    }
  }).then(data => data.json()).catch(err => {
    throw Object.assign(new Error('Failed to fetch identity from Meteor developer accounts. ' + err.message), {
      response: err.response
    });
  });
});
MeteorDeveloperAccounts.retrieveCredential = (credentialToken, credentialSecret) => OAuth.retrieveCredential(credentialToken, credentialSecret);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/meteor-developer-oauth/meteor_developer_common.js");
require("/node_modules/meteor/meteor-developer-oauth/meteor_developer_server.js");

/* Exports */
Package._define("meteor-developer-oauth", {
  MeteorDeveloperAccounts: MeteorDeveloperAccounts
});

})();

//# sourceURL=meteor://💻app/packages/meteor-developer-oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvbWV0ZW9yLWRldmVsb3Blci1vYXV0aC9tZXRlb3JfZGV2ZWxvcGVyX2NvbW1vbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvbWV0ZW9yLWRldmVsb3Blci1vYXV0aC9tZXRlb3JfZGV2ZWxvcGVyX3NlcnZlci5qcyJdLCJuYW1lcyI6WyJNZXRlb3JEZXZlbG9wZXJBY2NvdW50cyIsIl9zZXJ2ZXIiLCJfY29uZmlnIiwib3B0aW9ucyIsImRldmVsb3BlckFjY291bnRzU2VydmVyIiwiT0F1dGgiLCJyZWdpc3RlclNlcnZpY2UiLCJxdWVyeSIsInJlc3BvbnNlIiwiZ2V0VG9rZW5zIiwiYWNjZXNzVG9rZW4iLCJpZGVudGl0eSIsImdldElkZW50aXR5Iiwic2VydmljZURhdGEiLCJzZWFsU2VjcmV0IiwiZXhwaXJlc0F0IiwiRGF0ZSIsImV4cGlyZXNJbiIsIk9iamVjdCIsImFzc2lnbiIsInJlZnJlc2hUb2tlbiIsInByb2ZpbGUiLCJuYW1lIiwidXNlcm5hbWUiLCJjb25maWciLCJTZXJ2aWNlQ29uZmlndXJhdGlvbiIsImNvbmZpZ3VyYXRpb25zIiwiZmluZE9uZSIsInNlcnZpY2UiLCJDb25maWdFcnJvciIsImJvZHkiLCJfYWRkVmFsdWVzVG9RdWVyeVBhcmFtcyIsImdyYW50X3R5cGUiLCJjb2RlIiwiY2xpZW50X2lkIiwiY2xpZW50SWQiLCJjbGllbnRfc2VjcmV0Iiwib3BlblNlY3JldCIsInNlY3JldCIsInJlZGlyZWN0X3VyaSIsIl9yZWRpcmVjdFVyaSIsInRvU3RyaW5nIiwiX2ZldGNoIiwiaGVhZGVycyIsIkFjY2VwdCIsInRoZW4iLCJkYXRhIiwianNvbiIsImVycm9yIiwiRXJyb3IiLCJhY2Nlc3NfdG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwiZXhwaXJlc19pbiIsImNhdGNoIiwiZXJyIiwibWVzc2FnZSIsIkF1dGhvcml6YXRpb24iLCJyZXRyaWV2ZUNyZWRlbnRpYWwiLCJjcmVk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cGVyLW9hdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiTWV0ZW9yRGV2ZWxvcGVyQWNjb3VudHMgPSB7fTtcblxuTWV0ZW9yRGV2ZWxvcGVyQWNjb3VudHMuX3NlcnZlciA9IFwiaHR0cHM6Ly93d3cubWV0ZW9yLmNvbVwiO1xuXG4vLyBPcHRpb25zIGFyZTpcbi8vICAtIGRldmVsb3BlckFjY291bnRzU2VydmVyOiBkZWZhdWx0cyB0byBcImh0dHBzOi8vd3d3Lm1ldGVvci5jb21cIlxuTWV0ZW9yRGV2ZWxvcGVyQWNjb3VudHMuX2NvbmZpZyA9IG9wdGlvbnMgPT4ge1xuICBpZiAob3B0aW9ucy5kZXZlbG9wZXJBY2NvdW50c1NlcnZlcikge1xuICAgIE1ldGVvckRldmVsb3BlckFjY291bnRzLl9zZXJ2ZXIgPSBvcHRpb25zLmRldmVsb3BlckFjY291bnRzU2VydmVyO1xuICB9XG59O1xuIiwiT0F1dGgucmVnaXN0ZXJTZXJ2aWNlKFwibWV0ZW9yLWRldmVsb3BlclwiLCAyLCBudWxsLCBhc3luYyBxdWVyeSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0VG9rZW5zKHF1ZXJ5KTtcbiAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gcmVzcG9uc2U7XG4gIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgZ2V0SWRlbnRpdHkoYWNjZXNzVG9rZW4pO1xuXG4gIGNvbnN0IHNlcnZpY2VEYXRhID0ge1xuICAgIGFjY2Vzc1Rva2VuOiBPQXV0aC5zZWFsU2VjcmV0KGFjY2Vzc1Rva2VuKSxcbiAgICBleHBpcmVzQXQ6ICgrbmV3IERhdGUpICsgKDEwMDAgKiByZXNwb25zZS5leHBpcmVzSW4pXG4gIH07XG5cbiAgT2JqZWN0LmFzc2lnbihzZXJ2aWNlRGF0YSwgaWRlbnRpdHkpO1xuXG4gIC8vIG9ubHkgc2V0IHRoZSB0b2tlbiBpbiBzZXJ2aWNlRGF0YSBpZiBpdCdzIHRoZXJlLiB0aGlzIGVuc3VyZXNcbiAgLy8gdGhhdCB3ZSBkb24ndCBsb3NlIG9sZCBvbmVzIChzaW5jZSB3ZSBvbmx5IGdldCB0aGlzIG9uIHRoZSBmaXJzdFxuICAvLyBsb2cgaW4gYXR0ZW1wdClcbiAgaWYgKHJlc3BvbnNlLnJlZnJlc2hUb2tlbilcbiAgICBzZXJ2aWNlRGF0YS5yZWZyZXNoVG9rZW4gPSBPQXV0aC5zZWFsU2VjcmV0KHJlc3BvbnNlLnJlZnJlc2hUb2tlbik7XG5cbiAgcmV0dXJuIHtcbiAgICBzZXJ2aWNlRGF0YSxcbiAgICBvcHRpb25zOiB7cHJvZmlsZToge25hbWU6IHNlcnZpY2VEYXRhLnVzZXJuYW1lfX1cbiAgICAvLyBYWFggdXNlIHVzZXJuYW1lIGZvciBuYW1lIHVudGlsIG1ldGVvciBhY2NvdW50cyBoYXMgYSBwcm9maWxlIHdpdGggYSBuYW1lXG4gIH07XG59KTtcblxuLy8gcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZzpcbi8vIC0gYWNjZXNzVG9rZW5cbi8vIC0gZXhwaXJlc0luOiBsaWZldGltZSBvZiB0b2tlbiBpbiBzZWNvbmRzXG4vLyAtIHJlZnJlc2hUb2tlbiwgaWYgdGhpcyBpcyB0aGUgZmlyc3QgYXV0aG9yaXphdGlvbiByZXF1ZXN0IGFuZCB3ZSBnb3QgYVxuLy8gICByZWZyZXNoIHRva2VuIGZyb20gdGhlIHNlcnZlclxuY29uc3QgZ2V0VG9rZW5zID0gYXN5bmMgKHF1ZXJ5KSA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmRPbmUoe1xuICAgIHNlcnZpY2U6ICdtZXRlb3ItZGV2ZWxvcGVyJyxcbiAgfSk7XG4gIGlmICghY29uZmlnKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZpY2VDb25maWd1cmF0aW9uLkNvbmZpZ0Vycm9yKCk7XG4gIH1cblxuICBjb25zdCBib2R5ID0gT0F1dGguX2FkZFZhbHVlc1RvUXVlcnlQYXJhbXMoe1xuICAgIGdyYW50X3R5cGU6ICdhdXRob3JpemF0aW9uX2NvZGUnLFxuICAgIGNvZGU6IHF1ZXJ5LmNvZGUsXG4gICAgY2xpZW50X2lkOiBjb25maWcuY2xpZW50SWQsXG4gICAgY2xpZW50X3NlY3JldDogT0F1dGgub3BlblNlY3JldChjb25maWcuc2VjcmV0KSxcbiAgICByZWRpcmVjdF91cmk6IE9BdXRoLl9yZWRpcmVjdFVyaSgnbWV0ZW9yLWRldmVsb3BlcicsIGNvbmZpZyksXG4gIH0pLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIE9BdXRoLl9mZXRjaChcbiAgICBNZXRlb3JEZXZlbG9wZXJBY2NvdW50cy5fc2VydmVyICsgJy9vYXV0aDIvdG9rZW4nLFxuICAgICdQT1NUJyxcbiAgICB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICB9LFxuICAgICAgYm9keSxcbiAgICB9XG4gIClcbiAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnRmFpbGVkIHRvIGNvbXBsZXRlIE9BdXRoIGhhbmRzaGFrZSB3aXRoIE1ldGVvciBkZXZlbG9wZXIgYWNjb3VudHMuICcgK1xuICAgICAgICAgICAgKGRhdGEgPyBkYXRhLmVycm9yIDogJ05vIHJlc3BvbnNlIGRhdGEnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IGRhdGEuYWNjZXNzX3Rva2VuLFxuICAgICAgICByZWZyZXNoVG9rZW46IGRhdGEucmVmcmVzaF90b2tlbixcbiAgICAgICAgZXhwaXJlc0luOiBkYXRhLmV4cGlyZXNfaW4sXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICBgRmFpbGVkIHRvIGNvbXBsZXRlIE9BdXRoIGhhbmRzaGFrZSB3aXRoIE1ldGVvciBkZXZlbG9wZXIgYWNjb3VudHMuICR7ZXJyLm1lc3NhZ2V9YFxuICAgICAgICApLFxuICAgICAgICB7IHJlc3BvbnNlOiBlcnIucmVzcG9uc2UgfVxuICAgICAgKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGdldElkZW50aXR5ID0gYXN5bmMgKGFjY2Vzc1Rva2VuKSA9PiB7XG4gIHJldHVybiBPQXV0aC5fZmV0Y2goXG4gICAgYCR7TWV0ZW9yRGV2ZWxvcGVyQWNjb3VudHMuX3NlcnZlcn0vYXBpL3YxL2lkZW50aXR5YCxcbiAgICAnR0VUJyxcbiAgICB7XG4gICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gIH0sXG4gICAgfVxuICApXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0ZhaWxlZCB0byBmZXRjaCBpZGVudGl0eSBmcm9tIE1ldGVvciBkZXZlbG9wZXIgYWNjb3VudHMuICcgK1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2VcbiAgICAgICAgKSxcbiAgICAgICAgeyByZXNwb25zZTogZXJyLnJlc3BvbnNlIH1cbiAgICAgICk7XG4gICAgfSk7XG59O1xuXG5NZXRlb3JEZXZlbG9wZXJBY2NvdW50cy5yZXRyaWV2ZUNyZWRlbnRpYWwgPVxuICAoY3JlZGVudGlhbFRva2VuLCBjcmVkZW50aWFsU2VjcmV0KSA9PlxuICAgIE9BdXRoLnJldHJpZXZlQ3JlZGVudGlhbChjcmVkZW50aWFsVG9rZW4sIGNyZWRlbnRpYWxTZWNyZXQpO1xuIl19
