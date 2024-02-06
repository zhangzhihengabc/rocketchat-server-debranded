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
var Github;

var require = meteorInstall({"node_modules":{"meteor":{"github-oauth":{"github_server.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/github-oauth/github_server.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Github = {};
OAuth.registerService('github', 2, null, query => Promise.asyncApply(() => {
  const accessToken = Promise.await(getAccessToken(query));
  const identity = Promise.await(getIdentity(accessToken));
  const emails = Promise.await(getEmails(accessToken));
  const primaryEmail = emails.find(email => email.primary);
  return {
    serviceData: {
      id: identity.id,
      accessToken: OAuth.sealSecret(accessToken),
      email: identity.email || primaryEmail && primaryEmail.email || '',
      username: identity.login,
      name: identity.name,
      avatar: identity.avatar_url,
      company: identity.company,
      blog: identity.blog,
      location: identity.location,
      bio: identity.bio,
      emails
    },
    options: {
      profile: {
        name: identity.name
      }
    }
  };
}));

// http://developer.github.com/v3/#user-agent-required
let userAgent = 'Meteor';
if (Meteor.release) userAgent += "/".concat(Meteor.release);
const getAccessToken = query => Promise.asyncApply(() => {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'github'
  });
  if (!config) throw new ServiceConfiguration.ConfigError();
  let response;
  try {
    const content = new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.secret,
      code: query.code,
      redirect_uri: OAuth._redirectUri('github', config)
    });
    const request = Promise.await(fetch("https://github.com/login/oauth/access_token?".concat(content.toString()), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'User-Agent': userAgent
      }
    }));
    response = Promise.await(request.json());
  } catch (err) {
    throw Object.assign(new Error("Failed to complete OAuth handshake with Github. ".concat(err.message)), {
      response: err.response
    });
  }
  if (response.error) {
    // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with GitHub. ".concat(response.error));
  } else {
    return response.access_token;
  }
});
const getIdentity = accessToken => Promise.asyncApply(() => {
  try {
    const request = Promise.await(fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': userAgent,
        Authorization: "token ".concat(accessToken)
      } // http://developer.github.com/v3/#user-agent-required
    }));

    return Promise.await(request.json());
  } catch (err) {
    throw Object.assign(new Error("Failed to fetch identity from Github. ".concat(err.message)), {
      response: err.response
    });
  }
});
const getEmails = accessToken => Promise.asyncApply(() => {
  try {
    const request = Promise.await(fetch('https://api.github.com/user/emails', {
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        Accept: 'application/json',
        Authorization: "token ".concat(accessToken)
      } // http://developer.github.com/v3/#user-agent-required
    }));

    return Promise.await(request.json());
  } catch (err) {
    return [];
  }
});
Github.retrieveCredential = (credentialToken, credentialSecret) => OAuth.retrieveCredential(credentialToken, credentialSecret);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/github-oauth/github_server.js");

/* Exports */
Package._define("github-oauth", {
  Github: Github
});

})();

//# sourceURL=meteor://💻app/packages/github-oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZ2l0aHViLW9hdXRoL2dpdGh1Yl9zZXJ2ZXIuanMiXSwibmFtZXMiOlsiR2l0aHViIiwiT0F1dGgiLCJyZWdpc3RlclNlcnZpY2UiLCJxdWVyeSIsImFjY2Vzc1Rva2VuIiwiZ2V0QWNjZXNzVG9rZW4iLCJpZGVudGl0eSIsImdldElkZW50aXR5IiwiZW1haWxzIiwiZ2V0RW1haWxzIiwicHJpbWFyeUVtYWlsIiwiZmluZCIsImVtYWlsIiwicHJpbWFyeSIsInNlcnZpY2VEYXRhIiwiaWQiLCJzZWFsU2VjcmV0IiwidXNlcm5hbWUiLCJsb2dpbiIsIm5hbWUiLCJhdmF0YXIiLCJhdmF0YXJfdXJsIiwiY29tcGFueSIsImJsb2ciLCJsb2NhdGlvbiIsImJpbyIsIm9wdGlvbnMiLCJwcm9maWxlIiwidXNlckFnZW50IiwiTWV0ZW9yIiwicmVsZWFzZSIsImNvbmZpZyIsIlNlcnZpY2VDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJmaW5kT25lIiwic2VydmljZSIsIkNvbmZpZ0Vycm9yIiwicmVzcG9uc2UiLCJjb250ZW50IiwiVVJMU2VhcmNoUGFyYW1zIiwiY2xpZW50X2lkIiwiY2xpZW50SWQiLCJjbGllbnRfc2VjcmV0Iiwic2VjcmV0IiwiY29kZSIsInJlZGlyZWN0X3VyaSIsIl9yZWRpcmVjdFVyaSIsInJlcXVlc3QiLCJmZXRjaCIsInRvU3RyaW5nIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsImpzb24iLCJlcnIiLCJPYmplY3QiLCJhc3NpZ24iLCJFcnJvciIsIm1lc3NhZ2UiLCJlcnJvciIsImFjY2Vzc190b2tlbiIsIkF1dGhvcml6YXRpb24iLCJyZXRyaWV2ZUNyZWRlbnRpYWwiLCJjcmVkZW50aWFsVG9rZW4iLCJjcmVkZW50aWFsU2VjcmV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVYQyxLQUFL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NkQsa0JBQWtCLENBQUNDLGVBQWUsRUFBRUMsZ0JBQWdCLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvZ2l0aHViLW9hdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiR2l0aHViID0ge307XG5cbk9BdXRoLnJlZ2lzdGVyU2VydmljZSgnZ2l0aHViJywgMiwgbnVsbCwgYXN5bmMgKHF1ZXJ5KSA9PiB7XG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgZ2V0QWNjZXNzVG9rZW4ocXVlcnkpO1xuICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IGdldElkZW50aXR5KGFjY2Vzc1Rva2VuKTtcbiAgY29uc3QgZW1haWxzID0gYXdhaXQgZ2V0RW1haWxzKGFjY2Vzc1Rva2VuKTtcbiAgY29uc3QgcHJpbWFyeUVtYWlsID0gZW1haWxzLmZpbmQoKGVtYWlsKSA9PiBlbWFpbC5wcmltYXJ5KTtcblxuICByZXR1cm4ge1xuICAgIHNlcnZpY2VEYXRhOiB7XG4gICAgICBpZDogaWRlbnRpdHkuaWQsXG4gICAgICBhY2Nlc3NUb2tlbjogT0F1dGguc2VhbFNlY3JldChhY2Nlc3NUb2tlbiksXG4gICAgICBlbWFpbDogaWRlbnRpdHkuZW1haWwgfHwgKHByaW1hcnlFbWFpbCAmJiBwcmltYXJ5RW1haWwuZW1haWwpIHx8ICcnLFxuICAgICAgdXNlcm5hbWU6IGlkZW50aXR5LmxvZ2luLFxuICAgICAgbmFtZTogaWRlbnRpdHkubmFtZSxcbiAgICAgIGF2YXRhcjogaWRlbnRpdHkuYXZhdGFyX3VybCxcbiAgICAgIGNvbXBhbnk6IGlkZW50aXR5LmNvbXBhbnksXG4gICAgICBibG9nOiBpZGVudGl0eS5ibG9nLFxuICAgICAgbG9jYXRpb246IGlkZW50aXR5LmxvY2F0aW9uLFxuICAgICAgYmlvOiBpZGVudGl0eS5iaW8sXG4gICAgICBlbWFpbHNcbiAgICB9LFxuICAgIG9wdGlvbnM6IHsgcHJvZmlsZTogeyBuYW1lOiBpZGVudGl0eS5uYW1lIH0gfVxuICB9O1xufSk7XG5cbi8vIGh0dHA6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My8jdXNlci1hZ2VudC1yZXF1aXJlZFxubGV0IHVzZXJBZ2VudCA9ICdNZXRlb3InO1xuaWYgKE1ldGVvci5yZWxlYXNlKSB1c2VyQWdlbnQgKz0gYC8ke01ldGVvci5yZWxlYXNlfWA7XG5cbmNvbnN0IGdldEFjY2Vzc1Rva2VuID0gYXN5bmMgKHF1ZXJ5KSA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmRPbmUoe1xuICAgIHNlcnZpY2U6ICdnaXRodWInXG4gIH0pO1xuICBpZiAoIWNvbmZpZykgdGhyb3cgbmV3IFNlcnZpY2VDb25maWd1cmF0aW9uLkNvbmZpZ0Vycm9yKCk7XG5cbiAgbGV0IHJlc3BvbnNlO1xuICB0cnkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIGNsaWVudF9pZDogY29uZmlnLmNsaWVudElkLFxuICAgICAgY2xpZW50X3NlY3JldDogY29uZmlnLnNlY3JldCxcbiAgICAgIGNvZGU6IHF1ZXJ5LmNvZGUsXG4gICAgICByZWRpcmVjdF91cmk6IE9BdXRoLl9yZWRpcmVjdFVyaShcbiAgICAgICAgJ2dpdGh1YicsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKVxuICAgIH0pO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYWNjZXNzX3Rva2VuPyR7Y29udGVudC50b1N0cmluZygpfWAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ1VzZXItQWdlbnQnOiB1c2VyQWdlbnRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgYEZhaWxlZCB0byBjb21wbGV0ZSBPQXV0aCBoYW5kc2hha2Ugd2l0aCBHaXRodWIuICR7ZXJyLm1lc3NhZ2V9YFxuICAgICAgKSxcbiAgICAgIHsgcmVzcG9uc2U6IGVyci5yZXNwb25zZSB9XG4gICAgKTtcbiAgfVxuICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAvLyBpZiB0aGUgaHR0cCByZXNwb25zZSB3YXMgYSBqc29uIG9iamVjdCB3aXRoIGFuIGVycm9yIGF0dHJpYnV0ZVxuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBGYWlsZWQgdG8gY29tcGxldGUgT0F1dGggaGFuZHNoYWtlIHdpdGggR2l0SHViLiAke3Jlc3BvbnNlLmVycm9yfWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5hY2Nlc3NfdG9rZW47XG4gIH1cbn07XG5cbmNvbnN0IGdldElkZW50aXR5ID0gYXN5bmMgKGFjY2Vzc1Rva2VuKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5naXRodWIuY29tL3VzZXInLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ1VzZXItQWdlbnQnOiB1c2VyQWdlbnQsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGB0b2tlbiAke2FjY2Vzc1Rva2VufWBcbiAgICAgIH0gLy8gaHR0cDovL2RldmVsb3Blci5naXRodWIuY29tL3YzLyN1c2VyLWFnZW50LXJlcXVpcmVkXG4gICAgfSk7XG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggaWRlbnRpdHkgZnJvbSBHaXRodWIuICR7ZXJyLm1lc3NhZ2V9YCksXG4gICAgICB7IHJlc3BvbnNlOiBlcnIucmVzcG9uc2UgfVxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEVtYWlscyA9IGFzeW5jIChhY2Nlc3NUb2tlbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2VyL2VtYWlscycsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdVc2VyLUFnZW50JzogdXNlckFnZW50LFxuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYHRva2VuICR7YWNjZXNzVG9rZW59YFxuICAgICAgfSAvLyBodHRwOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvI3VzZXItYWdlbnQtcmVxdWlyZWRcbiAgICB9KTtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuR2l0aHViLnJldHJpZXZlQ3JlZGVudGlhbCA9IChjcmVkZW50aWFsVG9rZW4sIGNyZWRlbnRpYWxTZWNyZXQpID0+XG4gIE9BdXRoLnJldHJpZXZlQ3JlZGVudGlhbChjcmVkZW50aWFsVG9rZW4sIGNyZWRlbnRpYWxTZWNyZXQpO1xuIl19
