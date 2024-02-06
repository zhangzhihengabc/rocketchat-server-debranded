(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Accounts = Package['accounts-base'].Accounts;
var MeteorDeveloperAccounts = Package['meteor-developer-oauth'].MeteorDeveloperAccounts;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-meteor-developer":{"notice.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/accounts-meteor-developer/notice.js                                                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
if (Package['accounts-ui'] && !Package['service-configuration'] && !Object.prototype.hasOwnProperty.call(Package, 'meteor-developer-config-ui')) {
  console.warn("Note: You're using accounts-ui and accounts-meteor-developer,\n" + "but didn't install the configuration UI for the Meteor Developer\n" + "Accounts OAuth. You can install it with:\n" + "\n" + "    meteor add meteor-developer-config-ui" + "\n");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"meteor-developer.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/accounts-meteor-developer/meteor-developer.js                                                //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Accounts.oauth.registerService("meteor-developer");
if (Meteor.isClient) {
  const loginWithMeteorDeveloperAccount = (options, callback) => {
    // support a callback without options
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    MeteorDeveloperAccounts.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('meteor-developer', loginWithMeteorDeveloperAccount);
  Meteor.loginWithMeteorDeveloperAccount = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return Accounts.applyLoginFunction('meteor-developer', args);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately be used
    // from the client (if transmitted over ssl or on localhost).
    forLoggedInUser: ['services.meteor-developer'],
    forOtherUsers: ['services.meteor-developer.username', 'services.meteor-developer.profile', 'services.meteor-developer.id']
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/accounts-meteor-developer/notice.js");
require("/node_modules/meteor/accounts-meteor-developer/meteor-developer.js");

/* Exports */
Package._define("accounts-meteor-developer");

})();

//# sourceURL=meteor://💻app/packages/accounts-meteor-developer.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtbWV0ZW9yLWRldmVsb3Blci9ub3RpY2UuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2FjY291bnRzLW1ldGVvci1kZXZlbG9wZXIvbWV0ZW9yLWRldmVsb3Blci5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiY29uc29sZSIsIndhcm4iLCJBY2NvdW50cyIsIm9hdXRoIiwicmVnaXN0ZXJTZXJ2aWNlIiwiTWV0ZW9yIiwiaXNDbGllbnQiLCJsb2dpbldpdGhNZXRlb3JEZXZlbG9wZXJBY2NvdW50Iiwib3B0aW9ucyIsImNhbGxiYWNrIiwiY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrIiwiY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUhhbmRsZXIiLCJNZXRlb3JEZXZlbG9wZXJBY2NvdW50cyIsInJlcXVlc3RDcmVkZW50aWFsIiwicmVnaXN0ZXJDbGllbnRMb2dpbkZ1bmN0aW9uIiwiYXJncyIsImFwcGx5TG9naW5GdW5jdGlvbiIsImFkZEF1dG9wdWJsaXNoRmllbGRzIiwiZm9yTG9nZ2VkSW5Vc2VyIiwiZm9yT3RoZXJVc2VycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQ25CLENBQUNBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUNqQyxDQUFDQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNKLE9BQU8sRUFBRSw0QkFBNEIsQ0FBQyxFQUFFO0VBQ25GSyxPQUFPLENBQUNDLElBQUksQ0FDVixpRUFBaUUsR0FDakUsb0VBQW9FLEdBQ3BFLDRDQUE0QyxHQUM1QyxJQUFJLEdBQ0osMkNBQTJDLEdBQzNDLElBQUksQ0FDTDtBQUNILEM7Ozs7Ozs7Ozs7O0FDWEFDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxlQUFlLENBQUMsa0JBQWtCLENBQUM7QUFFbEQsSUFBSUMsTUFBTSxDQUFDQyxRQUFRLEVBQUU7RUFDbkIsTUFBTUMsK0JBQStCLEdBQUcsQ0FBQ0MsT0FBTyxFQUFFQyxRQUFRLEtBQUs7SUFDN0Q7SUFDQSxJQUFJLENBQUVBLFFBQVEsSUFBSSxPQUFPRCxPQUFPLEtBQUssVUFBVSxFQUFFO01BQy9DQyxRQUFRLEdBQUdELE9BQU87TUFDbEJBLE9BQU8sR0FBRyxJQUFJO0lBQ2hCO0lBRUEsTUFBTUUsaUNBQWlDLEdBQ2pDUixRQUFRLENBQUNDLEtBQUssQ0FBQ1EsZ0NBQWdDLENBQUNGLFFBQVEsQ0FBQztJQUMvREcsdUJBQXVCLENBQUNDLGlCQUFpQixDQUFDTCxPQUFPLEVBQUVFLGlDQUFpQyxDQUFDO0VBQ3ZGLENBQUM7RUFDRFIsUUFBUSxDQUFDWSwyQkFBMkIsQ0FBQyxrQkFBa0IsRUFBRVAsK0JBQStCLENBQUM7RUFDekZGLE1BQU0sQ0FBQ0UsK0JBQStCLEdBQUc7SUFBQSxrQ0FBSVEsSUFBSTtNQUFKQSxJQUFJO0lBQUE7SUFBQSxPQUMvQ2IsUUFBUSxDQUFDYyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRUQsSUFBSSxDQUFDO0VBQUE7QUFDekQsQ0FBQyxNQUFNO0VBQ0xiLFFBQVEsQ0FBQ2Usb0JBQW9CLENBQUM7SUFDNUI7SUFDQTtJQUNBQyxlQUFlLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztJQUM5Q0MsYUFBYSxFQUFFLENBQ2Isb0NBQW9DLEVBQ3BDLG1DQUFtQyxFQUNuQyw4QkFBOEI7RUFFbEMsQ0FBQyxDQUFDO0FBQ0osQyIsImZpbGUiOiIvcGFja2FnZXMvYWNjb3VudHMtbWV0ZW9yLWRldmVsb3Blci5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIChQYWNrYWdlWydhY2NvdW50cy11aSddXG4gICAgJiYgIVBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddXG4gICAgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChQYWNrYWdlLCAnbWV0ZW9yLWRldmVsb3Blci1jb25maWctdWknKSkge1xuICBjb25zb2xlLndhcm4oXG4gICAgXCJOb3RlOiBZb3UncmUgdXNpbmcgYWNjb3VudHMtdWkgYW5kIGFjY291bnRzLW1ldGVvci1kZXZlbG9wZXIsXFxuXCIgK1xuICAgIFwiYnV0IGRpZG4ndCBpbnN0YWxsIHRoZSBjb25maWd1cmF0aW9uIFVJIGZvciB0aGUgTWV0ZW9yIERldmVsb3BlclxcblwiICtcbiAgICBcIkFjY291bnRzIE9BdXRoLiBZb3UgY2FuIGluc3RhbGwgaXQgd2l0aDpcXG5cIiArXG4gICAgXCJcXG5cIiArXG4gICAgXCIgICAgbWV0ZW9yIGFkZCBtZXRlb3ItZGV2ZWxvcGVyLWNvbmZpZy11aVwiICtcbiAgICBcIlxcblwiXG4gICk7XG59XG4iLCJBY2NvdW50cy5vYXV0aC5yZWdpc3RlclNlcnZpY2UoXCJtZXRlb3ItZGV2ZWxvcGVyXCIpO1xuXG5pZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG4gIGNvbnN0IGxvZ2luV2l0aE1ldGVvckRldmVsb3BlckFjY291bnQgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzdXBwb3J0IGEgY2FsbGJhY2sgd2l0aG91dCBvcHRpb25zXG4gICAgaWYgKCEgY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrID1cbiAgICAgICAgICBBY2NvdW50cy5vYXV0aC5jcmVkZW50aWFsUmVxdWVzdENvbXBsZXRlSGFuZGxlcihjYWxsYmFjayk7XG4gICAgTWV0ZW9yRGV2ZWxvcGVyQWNjb3VudHMucmVxdWVzdENyZWRlbnRpYWwob3B0aW9ucywgY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrKTtcbiAgfTtcbiAgQWNjb3VudHMucmVnaXN0ZXJDbGllbnRMb2dpbkZ1bmN0aW9uKCdtZXRlb3ItZGV2ZWxvcGVyJywgbG9naW5XaXRoTWV0ZW9yRGV2ZWxvcGVyQWNjb3VudCk7XG4gIE1ldGVvci5sb2dpbldpdGhNZXRlb3JEZXZlbG9wZXJBY2NvdW50ID0gKC4uLmFyZ3MpID0+XG4gICAgQWNjb3VudHMuYXBwbHlMb2dpbkZ1bmN0aW9uKCdtZXRlb3ItZGV2ZWxvcGVyJywgYXJncyk7XG59IGVsc2Uge1xuICBBY2NvdW50cy5hZGRBdXRvcHVibGlzaEZpZWxkcyh7XG4gICAgLy8gcHVibGlzaCBhbGwgZmllbGRzIGluY2x1ZGluZyBhY2Nlc3MgdG9rZW4sIHdoaWNoIGNhbiBsZWdpdGltYXRlbHkgYmUgdXNlZFxuICAgIC8vIGZyb20gdGhlIGNsaWVudCAoaWYgdHJhbnNtaXR0ZWQgb3ZlciBzc2wgb3Igb24gbG9jYWxob3N0KS5cbiAgICBmb3JMb2dnZWRJblVzZXI6IFsnc2VydmljZXMubWV0ZW9yLWRldmVsb3BlciddLFxuICAgIGZvck90aGVyVXNlcnM6IFtcbiAgICAgICdzZXJ2aWNlcy5tZXRlb3ItZGV2ZWxvcGVyLnVzZXJuYW1lJyxcbiAgICAgICdzZXJ2aWNlcy5tZXRlb3ItZGV2ZWxvcGVyLnByb2ZpbGUnLFxuICAgICAgJ3NlcnZpY2VzLm1ldGVvci1kZXZlbG9wZXIuaWQnXG4gICAgXVxuICB9KTtcbn1cbiJdfQ==
