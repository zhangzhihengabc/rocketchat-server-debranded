(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var Accounts = Package['accounts-base'].Accounts;
var ECMAScript = Package.ecmascript.ECMAScript;
var OAuth = Package.oauth.OAuth;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-oauth":{"oauth_common.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/accounts-oauth/oauth_common.js                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
// TODO get from account-base
// config option keys
const VALID_CONFIG_KEYS = ['sendVerificationEmail', 'forbidClientAccountCreation', 'passwordEnrollTokenExpiration', 'passwordEnrollTokenExpirationInDays', 'restrictCreationByEmailDomain', 'loginExpirationInDays', 'loginExpiration', 'passwordResetTokenExpirationInDays', 'passwordResetTokenExpiration', 'ambiguousErrorMessages', 'bcryptRounds', 'defaultFieldSelector', 'loginTokenExpirationHours', 'tokenSequenceLength'];
Accounts.oauth = {};
const services = {};
const hasOwn = Object.prototype.hasOwnProperty;

// Helper for registering OAuth based accounts packages.
// On the server, adds an index to the user collection.
Accounts.oauth.registerService = name => {
  if (hasOwn.call(services, name)) throw new Error("Duplicate service: ".concat(name));
  services[name] = true;
  if (Meteor.server) {
    // Accounts.updateOrCreateUserFromExternalService does a lookup by this id,
    // so this should be a unique index. You might want to add indexes for other
    // fields returned by your service (eg services.github.login) but you can do
    // that in your app.
    Meteor.users.createIndex("services.".concat(name, ".id"), {
      unique: true,
      sparse: true
    });
  }
};

// Removes a previously registered service.
// This will disable logging in with this service, and serviceNames() will not
// contain it.
// It's worth noting that already logged in users will remain logged in unless
// you manually expire their sessions.
Accounts.oauth.unregisterService = name => {
  if (!hasOwn.call(services, name)) throw new Error("Service not found: ".concat(name));
  delete services[name];
};
Accounts.oauth.serviceNames = () => Object.keys(services);

// loginServiceConfiguration and ConfigError are maintained for backwards compatibility
Meteor.startup(() => {
  var _Meteor$settings, _Meteor$settings$pack;
  const {
    ServiceConfiguration
  } = Package['service-configuration'];
  Accounts.loginServiceConfiguration = ServiceConfiguration.configurations;
  Accounts.ConfigError = ServiceConfiguration.ConfigError;
  const settings = (_Meteor$settings = Meteor.settings) === null || _Meteor$settings === void 0 ? void 0 : (_Meteor$settings$pack = _Meteor$settings.packages) === null || _Meteor$settings$pack === void 0 ? void 0 : _Meteor$settings$pack['accounts-base'];
  if (settings) {
    if (settings.oauthSecretKey) {
      if (!Package['oauth-encryption']) {
        throw new Error('The oauth-encryption package must be loaded to set oauthSecretKey');
      }
      Package['oauth-encryption'].OAuthEncryption.loadKey(settings.oauthSecretKey);
      delete settings.oauthSecretKey;
    }
    // Validate config options keys
    Object.keys(settings).forEach(key => {
      if (!VALID_CONFIG_KEYS.includes(key)) {
        // TODO Consider just logging a debug message instead to allow for additional keys in the settings here?
        throw new Meteor.Error("Accounts configuration: Invalid key: ".concat(key));
      } else {
        // set values in Accounts._options
        Accounts._options[key] = settings[key];
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"oauth_server.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/accounts-oauth/oauth_server.js                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _Package$oauthEncryp;
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
// Listen to calls to `login` with an oauth option set. This is where
// users actually get logged in to meteor via oauth.
Accounts.registerLoginHandler(options => {
  if (!options.oauth) return undefined; // don't handle

  check(options.oauth, {
    credentialToken: String,
    // When an error occurs while retrieving the access token, we store
    // the error in the pending credentials table, with a secret of
    // null. The client can call the login method with a secret of null
    // to retrieve the error.
    credentialSecret: Match.OneOf(null, String)
  });
  const result = OAuth.retrieveCredential(options.oauth.credentialToken, options.oauth.credentialSecret);
  if (!result) {
    // OAuth credentialToken is not recognized, which could be either
    // because the popup was closed by the user before completion, or
    // some sort of error where the oauth provider didn't talk to our
    // server correctly and closed the popup somehow.
    //
    // We assume it was user canceled and report it as such, using a
    // numeric code that the client recognizes (XXX this will get
    // replaced by a symbolic error code at some point
    // https://trello.com/c/kMkw800Z/53-official-ddp-specification). This
    // will mask failures where things are misconfigured such that the
    // server doesn't see the request but does close the window. This
    // seems unlikely.
    //
    // XXX we want `type` to be the service name such as "facebook"
    return {
      type: "oauth",
      error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "No matching login attempt found")
    };
  }
  if (result instanceof Error)
    // We tried to login, but there was a fatal error. Report it back
    // to the user.
    throw result;else {
    if (!Accounts.oauth.serviceNames().includes(result.serviceName)) {
      // serviceName was not found in the registered services list.
      // This could happen because the service never registered itself or
      // unregisterService was called on it.
      return {
        type: "oauth",
        error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "No registered oauth service found for: ".concat(result.serviceName))
      };
    }
    return Accounts.updateOrCreateUserFromExternalService(result.serviceName, result.serviceData, result.options);
  }
});

///
/// OAuth Encryption Support
///

const OAuthEncryption = (_Package$oauthEncryp = Package["oauth-encryption"]) === null || _Package$oauthEncryp === void 0 ? void 0 : _Package$oauthEncryp.OAuthEncryption;
const usingOAuthEncryption = () => {
  return OAuthEncryption === null || OAuthEncryption === void 0 ? void 0 : OAuthEncryption.keyIsLoaded();
};

// Encrypt unencrypted login service secrets when oauth-encryption is
// added.
//
// XXX For the oauthSecretKey to be available here at startup, the
// developer must call Accounts.config({oauthSecretKey: ...}) at load
// time, instead of in a Meteor.startup block, because the startup
// block in the app code will run after this accounts-base startup
// block.  Perhaps we need a post-startup callback?

Meteor.startup(() => {
  if (!usingOAuthEncryption()) {
    return;
  }
  const {
    ServiceConfiguration
  } = Package['service-configuration'];
  ServiceConfiguration.configurations.find({
    $and: [{
      secret: {
        $exists: true
      }
    }, {
      "secret.algorithm": {
        $exists: false
      }
    }]
  }).forEach(config => {
    ServiceConfiguration.configurations.update(config._id, {
      $set: {
        secret: OAuthEncryption.seal(config.secret)
      }
    });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/accounts-oauth/oauth_common.js");
require("/node_modules/meteor/accounts-oauth/oauth_server.js");

/* Exports */
Package._define("accounts-oauth");

})();

//# sourceURL=meteor://💻app/packages/accounts-oauth.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtb2F1dGgvb2F1dGhfY29tbW9uLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9hY2NvdW50cy1vYXV0aC9vYXV0aF9zZXJ2ZXIuanMiXSwibmFtZXMiOlsiTWV0ZW9yIiwibW9kdWxlIiwibGluayIsInYiLCJWQUxJRF9DT05GSUdfS0VZUyIsIkFjY291bnRzIiwib2F1dGgiLCJzZXJ2aWNlcyIsImhhc093biIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicmVnaXN0ZXJTZXJ2aWNlIiwibmFtZSIsImNhbGwiLCJFcnJvciIsInNlcnZlciIsInVzZXJzIiwiY3JlYXRlSW5kZXgiLCJ1bmlxdWUiLCJzcGFyc2UiLCJ1bnJlZ2lzdGVyU2VydmljZSIsInNlcnZpY2VOYW1lcyIsImtleXMiLCJzdGFydHVwIiwiU2VydmljZUNvbmZpZ3VyYXRpb24iLCJQYWNrYWdlIiwibG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbiIsImNvbmZpZ3VyYXRpb25zIiwiQ29uZmlnRXJyb3IiLCJzZXR0aW5ncyIsInBhY2thZ2VzIiwib2F1dGhTZWNyZXRLZXkiLCJPQXV0aEVuY3J5cHRpb24iLCJsb2FkS2V5IiwiZm9yRWFjaCIsImtleSIsImluY2x1ZGVzIiwiX29wdGlvbnMiLCJyZWdpc3RlckxvZ2luSGFuZGxlciIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJjaGVjayIsImNyZWRlbnRpYWxUb2tlbiIsIlN0cmluZyIsImNyZWRlbnRpYWxTZWNyZXQiLCJNYXRjaCIsIk9uZU9mIiwicmVzdWx0IiwiT0F1dGgiLCJyZXRyaWV2ZUNyZWRlbnRpYWwiLCJ0eXBlIiwiZXJyb3IiLCJMb2dpbkNhbmNlbGxlZEVycm9yIiwibnVtZXJpY0Vycm9yIiwic2VydmljZU5hbWUiLCJ1cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIiwic2VydmljZURhdGEiLCJ1c2luZ09BdXRoRW5jcnlwdGlvbiIsImtleUlzTG9hZGVkIiwiZmluZCIsIiRhbmQiLCJzZWNyZXQiLCIkZXhpc3RzIiwiY29uZmlnIiwidXBkYXRlIiwiX2lkIiwiJHNldCIsInNlYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNO0FBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLGVBQWUsRUFBQztFQUFDRixNQUFNLENBQUNHLENBQUMsRUFBQztJQUFDSCxNQUFNLEdBQUNHLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFFL0Q7QUFDQTtBQUNBLE1BQU1DLGlCQUFpQixHQUFHLENBQ3hCLHVCQUF1QixFQUN2Qiw2QkFBNkIsRUFDN0IsK0JBQStCLEVBQy9CLHFDQUFxQyxFQUNyQywrQkFBK0IsRUFDL0IsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixvQ0FBb0MsRUFDcEMsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4QixjQUFjLEVBQ2Qsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQixxQkFBcUIsQ0FDdEI7QUFFREMsUUFBUSxDQUFDQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBRW5CLE1BQU1DLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbkIsTUFBTUMsTUFBTSxHQUFHQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYzs7QUFFOUM7QUFDQTtBQUNBTixRQUFRLENBQUNDLEtBQUssQ0FBQ00sZUFBZSxHQUFHQyxJQUFJLElBQUk7RUFDdkMsSUFBSUwsTUFBTSxDQUFDTSxJQUFJLENBQUNQLFFBQVEsRUFBRU0sSUFBSSxDQUFDLEVBQzdCLE1BQU0sSUFBSUUsS0FBSyw4QkFBdUJGLElBQUksRUFBRztFQUMvQ04sUUFBUSxDQUFDTSxJQUFJLENBQUMsR0FBRyxJQUFJO0VBRXJCLElBQUliLE1BQU0sQ0FBQ2dCLE1BQU0sRUFBRTtJQUNqQjtJQUNBO0lBQ0E7SUFDQTtJQUNBaEIsTUFBTSxDQUFDaUIsS0FBSyxDQUFDQyxXQUFXLG9CQUFhTCxJQUFJ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O0VBQ25CLElBQUksQ0FBRWtDLG9CQUFvQixFQUFFLEVBQUU7SUFDNUI7RUFDRjtFQUVBLE1BQU07SUFBRWpDO0VBQXFCLENBQUMsR0FBR0MsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0VBRWpFRCxvQkFBb0IsQ0FBQ0csY0FBYyxDQUFDZ0MsSUFBSSxDQUFDO0lBQ3ZDQyxJQUFJLEVBQUUsQ0FBQztNQUNMQyxNQUFNLEVBQUU7UUFBRUMsT0FBTyxFQUFFO01BQUs7SUFDMUIsQ0FBQyxFQUFFO01BQ0Qsa0JBQWtCLEVBQUU7UUFBRUEsT0FBTyxFQUFFO01BQU07SUFDdkMsQ0FBQztFQUNILENBQUMsQ0FBQyxDQUFDNUIsT0FBTyxDQUFDNkIsTUFBTSxJQUFJO0lBQ25CdkMsb0JBQW9CLENBQUNHLGNBQWMsQ0FBQ3FDLE1BQU0sQ0FBQ0QsTUFBTSxDQUFDRSxHQUFHLEVBQUU7TUFDckRDLElBQUksRUFBRTtRQUNKTCxNQUFNLEVBQUU3QixlQUFlLENBQUNtQyxJQUFJLENBQUNKLE1BQU0sQ0FBQ0YsTUFBTTtNQUM1QztJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9hY2NvdW50cy1vYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG4vLyBUT0RPIGdldCBmcm9tIGFjY291bnQtYmFzZVxuLy8gY29uZmlnIG9wdGlvbiBrZXlzXG5jb25zdCBWQUxJRF9DT05GSUdfS0VZUyA9IFtcbiAgJ3NlbmRWZXJpZmljYXRpb25FbWFpbCcsXG4gICdmb3JiaWRDbGllbnRBY2NvdW50Q3JlYXRpb24nLFxuICAncGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb24nLFxuICAncGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb25JbkRheXMnLFxuICAncmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW4nLFxuICAnbG9naW5FeHBpcmF0aW9uSW5EYXlzJyxcbiAgJ2xvZ2luRXhwaXJhdGlvbicsXG4gICdwYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uSW5EYXlzJyxcbiAgJ3Bhc3N3b3JkUmVzZXRUb2tlbkV4cGlyYXRpb24nLFxuICAnYW1iaWd1b3VzRXJyb3JNZXNzYWdlcycsXG4gICdiY3J5cHRSb3VuZHMnLFxuICAnZGVmYXVsdEZpZWxkU2VsZWN0b3InLFxuICAnbG9naW5Ub2tlbkV4cGlyYXRpb25Ib3VycycsXG4gICd0b2tlblNlcXVlbmNlTGVuZ3RoJyxcbl07XG5cbkFjY291bnRzLm9hdXRoID0ge307XG5cbmNvbnN0IHNlcnZpY2VzID0ge307XG5jb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyBIZWxwZXIgZm9yIHJlZ2lzdGVyaW5nIE9BdXRoIGJhc2VkIGFjY291bnRzIHBhY2thZ2VzLlxuLy8gT24gdGhlIHNlcnZlciwgYWRkcyBhbiBpbmRleCB0byB0aGUgdXNlciBjb2xsZWN0aW9uLlxuQWNjb3VudHMub2F1dGgucmVnaXN0ZXJTZXJ2aWNlID0gbmFtZSA9PiB7XG4gIGlmIChoYXNPd24uY2FsbChzZXJ2aWNlcywgbmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgc2VydmljZTogJHtuYW1lfWApO1xuICBzZXJ2aWNlc1tuYW1lXSA9IHRydWU7XG5cbiAgaWYgKE1ldGVvci5zZXJ2ZXIpIHtcbiAgICAvLyBBY2NvdW50cy51cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIGRvZXMgYSBsb29rdXAgYnkgdGhpcyBpZCxcbiAgICAvLyBzbyB0aGlzIHNob3VsZCBiZSBhIHVuaXF1ZSBpbmRleC4gWW91IG1pZ2h0IHdhbnQgdG8gYWRkIGluZGV4ZXMgZm9yIG90aGVyXG4gICAgLy8gZmllbGRzIHJldHVybmVkIGJ5IHlvdXIgc2VydmljZSAoZWcgc2VydmljZXMuZ2l0aHViLmxvZ2luKSBidXQgeW91IGNhbiBkb1xuICAgIC8vIHRoYXQgaW4geW91ciBhcHAuXG4gICAgTWV0ZW9yLnVzZXJzLmNyZWF0ZUluZGV4KGBzZXJ2aWNlcy4ke25hbWV9LmlkYCwge3VuaXF1ZTogdHJ1ZSwgc3BhcnNlOiB0cnVlfSk7XG4gIH1cbn07XG5cbi8vIFJlbW92ZXMgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgc2VydmljZS5cbi8vIFRoaXMgd2lsbCBkaXNhYmxlIGxvZ2dpbmcgaW4gd2l0aCB0aGlzIHNlcnZpY2UsIGFuZCBzZXJ2aWNlTmFtZXMoKSB3aWxsIG5vdFxuLy8gY29udGFpbiBpdC5cbi8vIEl0J3Mgd29ydGggbm90aW5nIHRoYXQgYWxyZWFkeSBsb2dnZWQgaW4gdXNlcnMgd2lsbCByZW1haW4gbG9nZ2VkIGluIHVubGVzc1xuLy8geW91IG1hbnVhbGx5IGV4cGlyZSB0aGVpciBzZXNzaW9ucy5cbkFjY291bnRzLm9hdXRoLnVucmVnaXN0ZXJTZXJ2aWNlID0gbmFtZSA9PiB7XG4gIGlmICghaGFzT3duLmNhbGwoc2VydmljZXMsIG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgU2VydmljZSBub3QgZm91bmQ6ICR7bmFtZX1gKTtcbiAgZGVsZXRlIHNlcnZpY2VzW25hbWVdO1xufTtcblxuQWNjb3VudHMub2F1dGguc2VydmljZU5hbWVzID0gKCkgPT4gT2JqZWN0LmtleXMoc2VydmljZXMpO1xuXG4vLyBsb2dpblNlcnZpY2VDb25maWd1cmF0aW9uIGFuZCBDb25maWdFcnJvciBhcmUgbWFpbnRhaW5lZCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgY29uc3QgeyBTZXJ2aWNlQ29uZmlndXJhdGlvbiB9ID0gUGFja2FnZVsnc2VydmljZS1jb25maWd1cmF0aW9uJ107XG4gIEFjY291bnRzLmxvZ2luU2VydmljZUNvbmZpZ3VyYXRpb24gPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucztcbiAgQWNjb3VudHMuQ29uZmlnRXJyb3IgPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5Db25maWdFcnJvcjtcblxuICBjb25zdCBzZXR0aW5ncyA9IE1ldGVvci5zZXR0aW5ncz8ucGFja2FnZXM/LlsnYWNjb3VudHMtYmFzZSddO1xuICBpZiAoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3Mub2F1dGhTZWNyZXRLZXkpIHtcbiAgICAgIGlmICghUGFja2FnZVsnb2F1dGgtZW5jcnlwdGlvbiddKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnVGhlIG9hdXRoLWVuY3J5cHRpb24gcGFja2FnZSBtdXN0IGJlIGxvYWRlZCB0byBzZXQgb2F1dGhTZWNyZXRLZXknXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBQYWNrYWdlWydvYXV0aC1lbmNyeXB0aW9uJ10uT0F1dGhFbmNyeXB0aW9uLmxvYWRLZXkoXG4gICAgICAgIHNldHRpbmdzLm9hdXRoU2VjcmV0S2V5XG4gICAgICApO1xuICAgICAgZGVsZXRlIHNldHRpbmdzLm9hdXRoU2VjcmV0S2V5O1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBjb25maWcgb3B0aW9ucyBrZXlzXG4gICAgT2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghVkFMSURfQ09ORklHX0tFWVMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAvLyBUT0RPIENvbnNpZGVyIGp1c3QgbG9nZ2luZyBhIGRlYnVnIG1lc3NhZ2UgaW5zdGVhZCB0byBhbGxvdyBmb3IgYWRkaXRpb25hbCBrZXlzIGluIHRoZSBzZXR0aW5ncyBoZXJlP1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFxuICAgICAgICAgIGBBY2NvdW50cyBjb25maWd1cmF0aW9uOiBJbnZhbGlkIGtleTogJHtrZXl9YFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2V0IHZhbHVlcyBpbiBBY2NvdW50cy5fb3B0aW9uc1xuICAgICAgICBBY2NvdW50cy5fb3B0aW9uc1trZXldID0gc2V0dGluZ3Nba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuLy8gTGlzdGVuIHRvIGNhbGxzIHRvIGBsb2dpbmAgd2l0aCBhbiBvYXV0aCBvcHRpb24gc2V0LiBUaGlzIGlzIHdoZXJlXG4vLyB1c2VycyBhY3R1YWxseSBnZXQgbG9nZ2VkIGluIHRvIG1ldGVvciB2aWEgb2F1dGguXG5BY2NvdW50cy5yZWdpc3RlckxvZ2luSGFuZGxlcihvcHRpb25zID0+IHtcbiAgaWYgKCFvcHRpb25zLm9hdXRoKVxuICAgIHJldHVybiB1bmRlZmluZWQ7IC8vIGRvbid0IGhhbmRsZVxuXG4gIGNoZWNrKG9wdGlvbnMub2F1dGgsIHtcbiAgICBjcmVkZW50aWFsVG9rZW46IFN0cmluZyxcbiAgICAvLyBXaGVuIGFuIGVycm9yIG9jY3VycyB3aGlsZSByZXRyaWV2aW5nIHRoZSBhY2Nlc3MgdG9rZW4sIHdlIHN0b3JlXG4gICAgLy8gdGhlIGVycm9yIGluIHRoZSBwZW5kaW5nIGNyZWRlbnRpYWxzIHRhYmxlLCB3aXRoIGEgc2VjcmV0IG9mXG4gICAgLy8gbnVsbC4gVGhlIGNsaWVudCBjYW4gY2FsbCB0aGUgbG9naW4gbWV0aG9kIHdpdGggYSBzZWNyZXQgb2YgbnVsbFxuICAgIC8vIHRvIHJldHJpZXZlIHRoZSBlcnJvci5cbiAgICBjcmVkZW50aWFsU2VjcmV0OiBNYXRjaC5PbmVPZihudWxsLCBTdHJpbmcpXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3VsdCA9IE9BdXRoLnJldHJpZXZlQ3JlZGVudGlhbChvcHRpb25zLm9hdXRoLmNyZWRlbnRpYWxUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9hdXRoLmNyZWRlbnRpYWxTZWNyZXQpO1xuXG4gIGlmICghcmVzdWx0KSB7XG4gICAgLy8gT0F1dGggY3JlZGVudGlhbFRva2VuIGlzIG5vdCByZWNvZ25pemVkLCB3aGljaCBjb3VsZCBiZSBlaXRoZXJcbiAgICAvLyBiZWNhdXNlIHRoZSBwb3B1cCB3YXMgY2xvc2VkIGJ5IHRoZSB1c2VyIGJlZm9yZSBjb21wbGV0aW9uLCBvclxuICAgIC8vIHNvbWUgc29ydCBvZiBlcnJvciB3aGVyZSB0aGUgb2F1dGggcHJvdmlkZXIgZGlkbid0IHRhbGsgdG8gb3VyXG4gICAgLy8gc2VydmVyIGNvcnJlY3RseSBhbmQgY2xvc2VkIHRoZSBwb3B1cCBzb21laG93LlxuICAgIC8vXG4gICAgLy8gV2UgYXNzdW1lIGl0IHdhcyB1c2VyIGNhbmNlbGVkIGFuZCByZXBvcnQgaXQgYXMgc3VjaCwgdXNpbmcgYVxuICAgIC8vIG51bWVyaWMgY29kZSB0aGF0IHRoZSBjbGllbnQgcmVjb2duaXplcyAoWFhYIHRoaXMgd2lsbCBnZXRcbiAgICAvLyByZXBsYWNlZCBieSBhIHN5bWJvbGljIGVycm9yIGNvZGUgYXQgc29tZSBwb2ludFxuICAgIC8vIGh0dHBzOi8vdHJlbGxvLmNvbS9jL2tNa3c4MDBaLzUzLW9mZmljaWFsLWRkcC1zcGVjaWZpY2F0aW9uKS4gVGhpc1xuICAgIC8vIHdpbGwgbWFzayBmYWlsdXJlcyB3aGVyZSB0aGluZ3MgYXJlIG1pc2NvbmZpZ3VyZWQgc3VjaCB0aGF0IHRoZVxuICAgIC8vIHNlcnZlciBkb2Vzbid0IHNlZSB0aGUgcmVxdWVzdCBidXQgZG9lcyBjbG9zZSB0aGUgd2luZG93LiBUaGlzXG4gICAgLy8gc2VlbXMgdW5saWtlbHkuXG4gICAgLy9cbiAgICAvLyBYWFggd2Ugd2FudCBgdHlwZWAgdG8gYmUgdGhlIHNlcnZpY2UgbmFtZSBzdWNoIGFzIFwiZmFjZWJvb2tcIlxuICAgIHJldHVybiB7IHR5cGU6IFwib2F1dGhcIixcbiAgICAgICAgICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcihcbiAgICAgICAgICAgICAgIEFjY291bnRzLkxvZ2luQ2FuY2VsbGVkRXJyb3IubnVtZXJpY0Vycm9yLFxuICAgICAgICAgICAgICAgXCJObyBtYXRjaGluZyBsb2dpbiBhdHRlbXB0IGZvdW5kXCIpIH07XG4gIH1cblxuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpXG4gICAgLy8gV2UgdHJpZWQgdG8gbG9naW4sIGJ1dCB0aGVyZSB3YXMgYSBmYXRhbCBlcnJvci4gUmVwb3J0IGl0IGJhY2tcbiAgICAvLyB0byB0aGUgdXNlci5cbiAgICB0aHJvdyByZXN1bHQ7XG4gIGVsc2Uge1xuICAgIGlmICghIEFjY291bnRzLm9hdXRoLnNlcnZpY2VOYW1lcygpLmluY2x1ZGVzKHJlc3VsdC5zZXJ2aWNlTmFtZSkpIHtcbiAgICAgIC8vIHNlcnZpY2VOYW1lIHdhcyBub3QgZm91bmQgaW4gdGhlIHJlZ2lzdGVyZWQgc2VydmljZXMgbGlzdC5cbiAgICAgIC8vIFRoaXMgY291bGQgaGFwcGVuIGJlY2F1c2UgdGhlIHNlcnZpY2UgbmV2ZXIgcmVnaXN0ZXJlZCBpdHNlbGYgb3JcbiAgICAgIC8vIHVucmVnaXN0ZXJTZXJ2aWNlIHdhcyBjYWxsZWQgb24gaXQuXG4gICAgICByZXR1cm4geyB0eXBlOiBcIm9hdXRoXCIsXG4gICAgICAgICAgICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcihcbiAgICAgICAgICAgICAgICAgQWNjb3VudHMuTG9naW5DYW5jZWxsZWRFcnJvci5udW1lcmljRXJyb3IsXG4gICAgICAgICAgICAgICAgIGBObyByZWdpc3RlcmVkIG9hdXRoIHNlcnZpY2UgZm91bmQgZm9yOiAke3Jlc3VsdC5zZXJ2aWNlTmFtZX1gKSB9O1xuXG4gICAgfVxuICAgIHJldHVybiBBY2NvdW50cy51cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlKHJlc3VsdC5zZXJ2aWNlTmFtZSwgcmVzdWx0LnNlcnZpY2VEYXRhLCByZXN1bHQub3B0aW9ucyk7XG4gIH1cbn0pO1xuXG4vLy9cbi8vLyBPQXV0aCBFbmNyeXB0aW9uIFN1cHBvcnRcbi8vL1xuXG5jb25zdCBPQXV0aEVuY3J5cHRpb24gPSBQYWNrYWdlW1wib2F1dGgtZW5jcnlwdGlvblwiXT8uT0F1dGhFbmNyeXB0aW9uO1xuXG5jb25zdCB1c2luZ09BdXRoRW5jcnlwdGlvbiA9ICgpID0+IHtcbiAgcmV0dXJuIE9BdXRoRW5jcnlwdGlvbj8ua2V5SXNMb2FkZWQoKTtcbn07XG5cbi8vIEVuY3J5cHQgdW5lbmNyeXB0ZWQgbG9naW4gc2VydmljZSBzZWNyZXRzIHdoZW4gb2F1dGgtZW5jcnlwdGlvbiBpc1xuLy8gYWRkZWQuXG4vL1xuLy8gWFhYIEZvciB0aGUgb2F1dGhTZWNyZXRLZXkgdG8gYmUgYXZhaWxhYmxlIGhlcmUgYXQgc3RhcnR1cCwgdGhlXG4vLyBkZXZlbG9wZXIgbXVzdCBjYWxsIEFjY291bnRzLmNvbmZpZyh7b2F1dGhTZWNyZXRLZXk6IC4uLn0pIGF0IGxvYWRcbi8vIHRpbWUsIGluc3RlYWQgb2YgaW4gYSBNZXRlb3Iuc3RhcnR1cCBibG9jaywgYmVjYXVzZSB0aGUgc3RhcnR1cFxuLy8gYmxvY2sgaW4gdGhlIGFwcCBjb2RlIHdpbGwgcnVuIGFmdGVyIHRoaXMgYWNjb3VudHMtYmFzZSBzdGFydHVwXG4vLyBibG9jay4gIFBlcmhhcHMgd2UgbmVlZCBhIHBvc3Qtc3RhcnR1cCBjYWxsYmFjaz9cblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICBpZiAoISB1c2luZ09BdXRoRW5jcnlwdGlvbigpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBTZXJ2aWNlQ29uZmlndXJhdGlvbiB9ID0gUGFja2FnZVsnc2VydmljZS1jb25maWd1cmF0aW9uJ107XG5cbiAgU2VydmljZUNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMuZmluZCh7XG4gICAgJGFuZDogW3tcbiAgICAgIHNlY3JldDogeyAkZXhpc3RzOiB0cnVlIH1cbiAgICB9LCB7XG4gICAgICBcInNlY3JldC5hbGdvcml0aG1cIjogeyAkZXhpc3RzOiBmYWxzZSB9XG4gICAgfV1cbiAgfSkuZm9yRWFjaChjb25maWcgPT4ge1xuICAgIFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLnVwZGF0ZShjb25maWcuX2lkLCB7XG4gICAgICAkc2V0OiB7XG4gICAgICAgIHNlY3JldDogT0F1dGhFbmNyeXB0aW9uLnNlYWwoY29uZmlnLnNlY3JldClcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==
