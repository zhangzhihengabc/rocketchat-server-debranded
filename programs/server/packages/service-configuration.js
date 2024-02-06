(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ServiceConfiguration;

var require = meteorInstall({"node_modules":{"meteor":{"service-configuration":{"service_configuration_common.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/service-configuration/service_configuration_common.js                                         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
if (typeof ServiceConfiguration === 'undefined') {
  ServiceConfiguration = {};
}

// Table containing documents with configuration options for each
// login service
ServiceConfiguration.configurations = new Mongo.Collection('meteor_accounts_loginServiceConfiguration', {
  _preventAutopublish: true,
  connection: Meteor.isClient ? Accounts.connection : Meteor.connection
});
// Leave this collection open in insecure mode. In theory, someone could
// hijack your oauth connect requests to a different endpoint or appId,
// but you did ask for 'insecure'. The advantage is that it is much
// easier to write a configuration wizard that works only in insecure
// mode.

// Thrown when trying to use a login service which is not configured
ServiceConfiguration.ConfigError = function (serviceName) {
  if (Meteor.isClient && !Accounts.loginServicesConfigured()) {
    this.message = 'Login service configuration not yet loaded';
  } else if (serviceName) {
    this.message = 'Service ' + serviceName + ' not configured';
  } else {
    this.message = 'Service not configured';
  }
};
ServiceConfiguration.ConfigError.prototype = new Error();
ServiceConfiguration.ConfigError.prototype.name = 'ServiceConfiguration.ConfigError';
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"service_configuration_server.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/service-configuration/service_configuration_server.js                                         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
// Only one configuration should ever exist for each service.
// A unique index helps avoid various race conditions which could
// otherwise lead to an inconsistent database state (when there are multiple
// configurations for a single service, which configuration is correct?)
try {
  ServiceConfiguration.configurations.createIndex({
    service: 1
  }, {
    unique: true
  });
} catch (err) {
  console.error('The service-configuration package persists configuration in the ' + 'meteor_accounts_loginServiceConfiguration collection in MongoDB. As ' + 'each service should have exactly one configuration, Meteor ' + 'automatically creates a MongoDB index with a unique constraint on the ' + ' meteor_accounts_loginServiceConfiguration collection. The ' + 'createIndex command which creates that index is failing.\n\n' + 'Meteor versions before 1.0.4 did not create this index. If you recently ' + 'upgraded and are seeing this error message for the first time, please ' + 'check your meteor_accounts_loginServiceConfiguration collection for ' + 'multiple configuration entries for the same service and delete ' + 'configuration entries until there is no more than one configuration ' + 'entry per service.\n\n' + 'If the meteor_accounts_loginServiceConfiguration collection looks ' + 'fine, the createIndex command is failing for some other reason.\n\n' + 'For more information on this history of this issue, please see ' + 'https://github.com/meteor/meteor/pull/3514.\n');
  throw err;
}
Meteor.startup(() => {
  var _Meteor$settings, _Meteor$settings$pack;
  const settings = (_Meteor$settings = Meteor.settings) === null || _Meteor$settings === void 0 ? void 0 : (_Meteor$settings$pack = _Meteor$settings.packages) === null || _Meteor$settings$pack === void 0 ? void 0 : _Meteor$settings$pack['service-configuration'];
  if (!settings) return;
  Object.keys(settings).forEach(key => {
    ServiceConfiguration.configurations.upsert({
      service: key
    }, {
      $set: settings[key]
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/service-configuration/service_configuration_common.js");
require("/node_modules/meteor/service-configuration/service_configuration_server.js");

/* Exports */
Package._define("service-configuration", {
  ServiceConfiguration: ServiceConfiguration
});

})();

//# sourceURL=meteor://💻app/packages/service-configuration.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc2VydmljZS1jb25maWd1cmF0aW9uL3NlcnZpY2VfY29uZmlndXJhdGlvbl9jb21tb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3NlcnZpY2UtY29uZmlndXJhdGlvbi9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25fc2VydmVyLmpzIl0sIm5hbWVzIjpbIlNlcnZpY2VDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJNb25nbyIsIkNvbGxlY3Rpb24iLCJfcHJldmVudEF1dG9wdWJsaXNoIiwiY29ubmVjdGlvbiIsIk1ldGVvciIsImlzQ2xpZW50IiwiQWNjb3VudHMiLCJDb25maWdFcnJvciIsInNlcnZpY2VOYW1lIiwibG9naW5TZXJ2aWNlc0NvbmZpZ3VyZWQiLCJtZXNzYWdlIiwicHJvdG90eXBlIiwiRXJyb3IiLCJuYW1lIiwibW9kdWxlIiwibGluayIsInYiLCJjcmVhdGVJbmRleCIsInNlcnZpY2UiLCJ1bmlxdWUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFydHVwIiwic2V0dGluZ3MiLCJwYWNrYWdlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidXBzZXJ0IiwiJHNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxPQUFPQSxvQkFBb0IsS0FBSyxXQUFXLEVBQUU7RUFDL0NBLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUMzQjs7QUFFQTtBQUNBO0FBQ0FBLG9CQUFvQixDQUFDQyxjQUFjLEdBQUcsSUFBSUMsS0FBSyxDQUFDQyxVQUFVLENBQ3hELDJDQUEyQyxFQUMzQztFQUNFQyxtQkFBbUIsRUFBRSxJQUFJO0VBQ3pCQyxVQUFVLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUSxHQUFHQyxRQUFRLENBQUNILFVBQVUsR0FBR0MsTUFBTSxDQUFDRDtBQUM3RCxDQUFDLENBQ0Y7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0FMLG9CQUFvQixDQUFDUyxXQUFXLEdBQUcsVUFBU0MsV0FBVyxFQUFFO0VBQ3ZELElBQUlKLE1BQU0sQ0FBQ0MsUUFBUSxJQUFJLENBQUNDLFFBQVEsQ0FBQ0csdUJBQXVCLEVBQUUsRUFBRTtJQUMxRCxJQUFJLENBQUNDLE9BQU8sR0FBRyw0Q0FBNEM7RUFDN0QsQ0FBQyxNQUFNLElBQUlGLFdBQVcsRUFBRTtJQUN0QixJQUFJLENBQUNFLE9BQU8sR0FBRyxVQUFVLEdBQUdGLFdBQVcsR0FBRyxpQkFBaUI7RUFDN0QsQ0FBQyxNQUFNO0lBQ0wsSUFBSSxDQUFDRSxPQUFPLEdBQUcsd0JBQXdCO0VBQ3pDO0FBQ0YsQ0FBQztBQUNEWixvQkFBb0IsQ0FBQ1MsV0FBVyxDQUFDSSxTQUFTLEdBQUcsSUFBSUMsS0FBSyxFQUFFO0FBQ3hEZCxvQkFBb0IsQ0FBQ1MsV0FBVyxDQUFDSSxTQUFTLENBQUNFLElBQUksR0FDN0Msa0NBQWtDLEM7Ozs7Ozs7Ozs7O0FDL0JwQyxJQUFJVCxNQUFNO0FBQUNVLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLGVBQWUsRUFBQztFQUFDWCxNQUFNLENBQUNZLENBQUMsRUFBQztJQUFDWixNQUFNLEdBQUNZLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0VBQ0ZsQixvQkFBb0IsQ0FBQ0MsY0FBYyxDQUFDa0IsV0FBVyxDQUM3QztJQUFFQyxPQUFPLEVBQUU7RUFBRSxDQUFDLEVBQ2Q7SUFBRUMsTUFBTSxFQUFFO0VBQUssQ0FBQyxDQUNqQjtBQUNILENBQUMsQ0FBQyxPQUFPQyxHQUFHLEVBQUU7RUFDWkMsT0FBTyxDQUFDQyxLQUFLLENBQ1gsa0VBQWtFLEdBQ2hFLHNFQUFzRSxHQUN0RSw2REFBNkQsR0FDN0Qsd0VBQXdFLEdBQ3hFLDZEQUE2RCxHQUM3RCw4REFBOEQsR0FDOUQsMEVBQTBFLEdBQzFFLHdFQUF3RSxHQUN4RSxzRUFBc0UsR0FDdEUsaUVBQWlFLEdBQ2pFLHNFQUFzRSxHQUN0RSx3QkFBd0IsR0FDeEIsb0VBQW9FLEdBQ3BFLHFFQUFxRSxHQUNyRSxpRUFBaUUsR0FDakUsK0NBQStDLENBQ2xEO0VBQ0QsTUFBTUYsR0FBRztBQUNYO0FBRUFoQixNQUFNLENBQUNtQixPQUFPLENBQUMsTUFBTTtFQUFBO0VBQ25CLE1BQU1DLFFBQVEsdUJBQUdwQixNQUFNLENBQUNvQixRQUFRLDhFQUFmLGlCQUFpQkMsUUFBUSwwREFBekIsc0JBQTRCLHVCQUF1QixDQUFDO0VBQ3JFLElBQUksQ0FBQ0QsUUFBUSxFQUFFO0VBQ2ZFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDSCxRQUFRLENBQUMsQ0FBQ0ksT0FBTyxDQUFDQyxHQUFHLElBQUk7SUFDbkMvQixvQkFBb0IsQ0FBQ0MsY0FBYyxDQUFDK0IsTUFBTSxDQUN4QztNQUFFWixPQUFPLEVBQUVXO0lBQUksQ0FBQyxFQUNoQjtNQUNFRSxJQUFJLEVBQUVQLFFBQVEsQ0FBQ0ssR0FBRztJQUNwQixDQUFDLENBQ0Y7RUFDSCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvc2VydmljZS1jb25maWd1cmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKHR5cGVvZiBTZXJ2aWNlQ29uZmlndXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgU2VydmljZUNvbmZpZ3VyYXRpb24gPSB7fTtcbn1cblxuLy8gVGFibGUgY29udGFpbmluZyBkb2N1bWVudHMgd2l0aCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGVhY2hcbi8vIGxvZ2luIHNlcnZpY2VcblNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXG4gICdtZXRlb3JfYWNjb3VudHNfbG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbicsXG4gIHtcbiAgICBfcHJldmVudEF1dG9wdWJsaXNoOiB0cnVlLFxuICAgIGNvbm5lY3Rpb246IE1ldGVvci5pc0NsaWVudCA/IEFjY291bnRzLmNvbm5lY3Rpb24gOiBNZXRlb3IuY29ubmVjdGlvbixcbiAgfVxuKTtcbi8vIExlYXZlIHRoaXMgY29sbGVjdGlvbiBvcGVuIGluIGluc2VjdXJlIG1vZGUuIEluIHRoZW9yeSwgc29tZW9uZSBjb3VsZFxuLy8gaGlqYWNrIHlvdXIgb2F1dGggY29ubmVjdCByZXF1ZXN0cyB0byBhIGRpZmZlcmVudCBlbmRwb2ludCBvciBhcHBJZCxcbi8vIGJ1dCB5b3UgZGlkIGFzayBmb3IgJ2luc2VjdXJlJy4gVGhlIGFkdmFudGFnZSBpcyB0aGF0IGl0IGlzIG11Y2hcbi8vIGVhc2llciB0byB3cml0ZSBhIGNvbmZpZ3VyYXRpb24gd2l6YXJkIHRoYXQgd29ya3Mgb25seSBpbiBpbnNlY3VyZVxuLy8gbW9kZS5cblxuLy8gVGhyb3duIHdoZW4gdHJ5aW5nIHRvIHVzZSBhIGxvZ2luIHNlcnZpY2Ugd2hpY2ggaXMgbm90IGNvbmZpZ3VyZWRcblNlcnZpY2VDb25maWd1cmF0aW9uLkNvbmZpZ0Vycm9yID0gZnVuY3Rpb24oc2VydmljZU5hbWUpIHtcbiAgaWYgKE1ldGVvci5pc0NsaWVudCAmJiAhQWNjb3VudHMubG9naW5TZXJ2aWNlc0NvbmZpZ3VyZWQoKSkge1xuICAgIHRoaXMubWVzc2FnZSA9ICdMb2dpbiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gbm90IHlldCBsb2FkZWQnO1xuICB9IGVsc2UgaWYgKHNlcnZpY2VOYW1lKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gJ1NlcnZpY2UgJyArIHNlcnZpY2VOYW1lICsgJyBub3QgY29uZmlndXJlZCc7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tZXNzYWdlID0gJ1NlcnZpY2Ugbm90IGNvbmZpZ3VyZWQnO1xuICB9XG59O1xuU2VydmljZUNvbmZpZ3VyYXRpb24uQ29uZmlnRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5TZXJ2aWNlQ29uZmlndXJhdGlvbi5Db25maWdFcnJvci5wcm90b3R5cGUubmFtZSA9XG4gICdTZXJ2aWNlQ29uZmlndXJhdGlvbi5Db25maWdFcnJvcic7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuLy8gT25seSBvbmUgY29uZmlndXJhdGlvbiBzaG91bGQgZXZlciBleGlzdCBmb3IgZWFjaCBzZXJ2aWNlLlxuLy8gQSB1bmlxdWUgaW5kZXggaGVscHMgYXZvaWQgdmFyaW91cyByYWNlIGNvbmRpdGlvbnMgd2hpY2ggY291bGRcbi8vIG90aGVyd2lzZSBsZWFkIHRvIGFuIGluY29uc2lzdGVudCBkYXRhYmFzZSBzdGF0ZSAod2hlbiB0aGVyZSBhcmUgbXVsdGlwbGVcbi8vIGNvbmZpZ3VyYXRpb25zIGZvciBhIHNpbmdsZSBzZXJ2aWNlLCB3aGljaCBjb25maWd1cmF0aW9uIGlzIGNvcnJlY3Q/KVxudHJ5IHtcbiAgU2VydmljZUNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMuY3JlYXRlSW5kZXgoXG4gICAgeyBzZXJ2aWNlOiAxIH0sXG4gICAgeyB1bmlxdWU6IHRydWUgfVxuICApO1xufSBjYXRjaCAoZXJyKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoZSBzZXJ2aWNlLWNvbmZpZ3VyYXRpb24gcGFja2FnZSBwZXJzaXN0cyBjb25maWd1cmF0aW9uIGluIHRoZSAnICtcbiAgICAgICdtZXRlb3JfYWNjb3VudHNfbG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbiBjb2xsZWN0aW9uIGluIE1vbmdvREIuIEFzICcgK1xuICAgICAgJ2VhY2ggc2VydmljZSBzaG91bGQgaGF2ZSBleGFjdGx5IG9uZSBjb25maWd1cmF0aW9uLCBNZXRlb3IgJyArXG4gICAgICAnYXV0b21hdGljYWxseSBjcmVhdGVzIGEgTW9uZ29EQiBpbmRleCB3aXRoIGEgdW5pcXVlIGNvbnN0cmFpbnQgb24gdGhlICcgK1xuICAgICAgJyBtZXRlb3JfYWNjb3VudHNfbG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbiBjb2xsZWN0aW9uLiBUaGUgJyArXG4gICAgICAnY3JlYXRlSW5kZXggY29tbWFuZCB3aGljaCBjcmVhdGVzIHRoYXQgaW5kZXggaXMgZmFpbGluZy5cXG5cXG4nICtcbiAgICAgICdNZXRlb3IgdmVyc2lvbnMgYmVmb3JlIDEuMC40IGRpZCBub3QgY3JlYXRlIHRoaXMgaW5kZXguIElmIHlvdSByZWNlbnRseSAnICtcbiAgICAgICd1cGdyYWRlZCBhbmQgYXJlIHNlZWluZyB0aGlzIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBmaXJzdCB0aW1lLCBwbGVhc2UgJyArXG4gICAgICAnY2hlY2sgeW91ciBtZXRlb3JfYWNjb3VudHNfbG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbiBjb2xsZWN0aW9uIGZvciAnICtcbiAgICAgICdtdWx0aXBsZSBjb25maWd1cmF0aW9uIGVudHJpZXMgZm9yIHRoZSBzYW1lIHNlcnZpY2UgYW5kIGRlbGV0ZSAnICtcbiAgICAgICdjb25maWd1cmF0aW9uIGVudHJpZXMgdW50aWwgdGhlcmUgaXMgbm8gbW9yZSB0aGFuIG9uZSBjb25maWd1cmF0aW9uICcgK1xuICAgICAgJ2VudHJ5IHBlciBzZXJ2aWNlLlxcblxcbicgK1xuICAgICAgJ0lmIHRoZSBtZXRlb3JfYWNjb3VudHNfbG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbiBjb2xsZWN0aW9uIGxvb2tzICcgK1xuICAgICAgJ2ZpbmUsIHRoZSBjcmVhdGVJbmRleCBjb21tYW5kIGlzIGZhaWxpbmcgZm9yIHNvbWUgb3RoZXIgcmVhc29uLlxcblxcbicgK1xuICAgICAgJ0ZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoaXMgaGlzdG9yeSBvZiB0aGlzIGlzc3VlLCBwbGVhc2Ugc2VlICcgK1xuICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9tZXRlb3IvbWV0ZW9yL3B1bGwvMzUxNC5cXG4nXG4gICk7XG4gIHRocm93IGVycjtcbn1cblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICBjb25zdCBzZXR0aW5ncyA9IE1ldGVvci5zZXR0aW5ncz8ucGFja2FnZXM/Llsnc2VydmljZS1jb25maWd1cmF0aW9uJ107XG4gIGlmICghc2V0dGluZ3MpIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goa2V5ID0+IHtcbiAgICBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy51cHNlcnQoXG4gICAgICB7IHNlcnZpY2U6IGtleSB9LFxuICAgICAge1xuICAgICAgICAkc2V0OiBzZXR0aW5nc1trZXldLFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xufSk7XG4iXX0=
