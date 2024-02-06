(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Accounts = Package['accounts-base'].Accounts;
var Github = Package['github-oauth'].Github;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-github":{"notice.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/accounts-github/notice.js                                                                    //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
if (Package['accounts-ui'] && !Package['service-configuration'] && !Object.prototype.hasOwnProperty.call(Package, 'github-config-ui')) {
  console.warn("Note: You're using accounts-ui and accounts-github,\n" + "but didn't install the configuration UI for the GitHub\n" + "OAuth. You can install it with:\n" + "\n" + "    meteor add github-config-ui" + "\n");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"github.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/accounts-github/github.js                                                                    //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Accounts.oauth.registerService('github');
if (Meteor.isClient) {
  const loginWithGithub = (options, callback) => {
    // support a callback without options
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Github.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('github', loginWithGithub);
  Meteor.loginWithGithub = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return Accounts.applyLoginFunction('github', args);
  };
} else {
  Accounts.addAutopublishFields({
    // not sure whether the github api can be used from the browser,
    // thus not sure if we should be sending access tokens; but we do it
    // for all other oauth2 providers, and it may come in handy.
    forLoggedInUser: ['services.github'],
    forOtherUsers: ['services.github.username']
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/accounts-github/notice.js");
require("/node_modules/meteor/accounts-github/github.js");

/* Exports */
Package._define("accounts-github");

})();

//# sourceURL=meteor://💻app/packages/accounts-github.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtZ2l0aHViL25vdGljZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtZ2l0aHViL2dpdGh1Yi5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiY29uc29sZSIsIndhcm4iLCJBY2NvdW50cyIsIm9hdXRoIiwicmVnaXN0ZXJTZXJ2aWNlIiwiTWV0ZW9yIiwiaXNDbGllbnQiLCJsb2dpbldpdGhHaXRodWIiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJjcmVkZW50aWFsUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2siLCJjcmVkZW50aWFsUmVxdWVzdENvbXBsZXRlSGFuZGxlciIsIkdpdGh1YiIsInJlcXVlc3RDcmVkZW50aWFsIiwicmVnaXN0ZXJDbGllbnRMb2dpbkZ1bmN0aW9uIiwiYXJncyIsImFwcGx5TG9naW5GdW5jdGlvbiIsImFkZEF1dG9wdWJsaXNoRmllbGRzIiwiZm9yTG9nZ2VkSW5Vc2VyIiwiZm9yT3RoZXJVc2VycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQ25CLENBQUNBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUNqQyxDQUFDQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNKLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxFQUFFO0VBQ3pFSyxPQUFPLENBQUNDLElBQUksQ0FDVix1REFBdUQsR0FDdkQsMERBQTBELEdBQzFELG1DQUFtQyxHQUNuQyxJQUFJLEdBQ0osaUNBQWlDLEdBQ2pDLElBQUksQ0FDTDtBQUNILEM7Ozs7Ozs7Ozs7O0FDWEFDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxlQUFlLENBQUMsUUFBUSxDQUFDO0FBRXhDLElBQUlDLE1BQU0sQ0FBQ0MsUUFBUSxFQUFFO0VBQ25CLE1BQU1DLGVBQWUsR0FBRyxDQUFDQyxPQUFPLEVBQUVDLFFBQVEsS0FBSztJQUM3QztJQUNBLElBQUksQ0FBRUEsUUFBUSxJQUFJLE9BQU9ELE9BQU8sS0FBSyxVQUFVLEVBQUU7TUFDL0NDLFFBQVEsR0FBR0QsT0FBTztNQUNsQkEsT0FBTyxHQUFHLElBQUk7SUFDaEI7SUFFQSxNQUFNRSxpQ0FBaUMsR0FBR1IsUUFBUSxDQUFDQyxLQUFLLENBQUNRLGdDQUFnQyxDQUFDRixRQUFRLENBQUM7SUFDbkdHLE1BQU0sQ0FBQ0MsaUJBQWlCLENBQUNMLE9BQU8sRUFBRUUsaUNBQWlDLENBQUM7RUFDdEUsQ0FBQztFQUNEUixRQUFRLENBQUNZLDJCQUEyQixDQUFDLFFBQVEsRUFBRVAsZUFBZSxDQUFDO0VBQy9ERixNQUFNLENBQUNFLGVBQWUsR0FDcEI7SUFBQSxrQ0FBSVEsSUFBSTtNQUFKQSxJQUFJO0lBQUE7SUFBQSxPQUFLYixRQUFRLENBQUNjLGtCQUFrQixDQUFDLFFBQVEsRUFBRUQsSUFBSSxDQUFDO0VBQUE7QUFDNUQsQ0FBQyxNQUFNO0VBQ0xiLFFBQVEsQ0FBQ2Usb0JBQW9CLENBQUM7SUFDNUI7SUFDQTtJQUNBO0lBQ0FDLGVBQWUsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ3BDQyxhQUFhLEVBQUUsQ0FBQywwQkFBMEI7RUFDNUMsQ0FBQyxDQUFDO0FBQ0osQyIsImZpbGUiOiIvcGFja2FnZXMvYWNjb3VudHMtZ2l0aHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKFBhY2thZ2VbJ2FjY291bnRzLXVpJ11cbiAgICAmJiAhUGFja2FnZVsnc2VydmljZS1jb25maWd1cmF0aW9uJ11cbiAgICAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFBhY2thZ2UsICdnaXRodWItY29uZmlnLXVpJykpIHtcbiAgY29uc29sZS53YXJuKFxuICAgIFwiTm90ZTogWW91J3JlIHVzaW5nIGFjY291bnRzLXVpIGFuZCBhY2NvdW50cy1naXRodWIsXFxuXCIgK1xuICAgIFwiYnV0IGRpZG4ndCBpbnN0YWxsIHRoZSBjb25maWd1cmF0aW9uIFVJIGZvciB0aGUgR2l0SHViXFxuXCIgK1xuICAgIFwiT0F1dGguIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoOlxcblwiICtcbiAgICBcIlxcblwiICtcbiAgICBcIiAgICBtZXRlb3IgYWRkIGdpdGh1Yi1jb25maWctdWlcIiArXG4gICAgXCJcXG5cIlxuICApO1xufVxuIiwiQWNjb3VudHMub2F1dGgucmVnaXN0ZXJTZXJ2aWNlKCdnaXRodWInKTtcblxuaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICBjb25zdCBsb2dpbldpdGhHaXRodWIgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzdXBwb3J0IGEgY2FsbGJhY2sgd2l0aG91dCBvcHRpb25zXG4gICAgaWYgKCEgY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrID0gQWNjb3VudHMub2F1dGguY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIEdpdGh1Yi5yZXF1ZXN0Q3JlZGVudGlhbChvcHRpb25zLCBjcmVkZW50aWFsUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2spO1xuICB9O1xuICBBY2NvdW50cy5yZWdpc3RlckNsaWVudExvZ2luRnVuY3Rpb24oJ2dpdGh1YicsIGxvZ2luV2l0aEdpdGh1Yik7XG4gIE1ldGVvci5sb2dpbldpdGhHaXRodWIgPSBcbiAgICAoLi4uYXJncykgPT4gQWNjb3VudHMuYXBwbHlMb2dpbkZ1bmN0aW9uKCdnaXRodWInLCBhcmdzKTtcbn0gZWxzZSB7XG4gIEFjY291bnRzLmFkZEF1dG9wdWJsaXNoRmllbGRzKHtcbiAgICAvLyBub3Qgc3VyZSB3aGV0aGVyIHRoZSBnaXRodWIgYXBpIGNhbiBiZSB1c2VkIGZyb20gdGhlIGJyb3dzZXIsXG4gICAgLy8gdGh1cyBub3Qgc3VyZSBpZiB3ZSBzaG91bGQgYmUgc2VuZGluZyBhY2Nlc3MgdG9rZW5zOyBidXQgd2UgZG8gaXRcbiAgICAvLyBmb3IgYWxsIG90aGVyIG9hdXRoMiBwcm92aWRlcnMsIGFuZCBpdCBtYXkgY29tZSBpbiBoYW5keS5cbiAgICBmb3JMb2dnZWRJblVzZXI6IFsnc2VydmljZXMuZ2l0aHViJ10sXG4gICAgZm9yT3RoZXJVc2VyczogWydzZXJ2aWNlcy5naXRodWIudXNlcm5hbWUnXVxuICB9KTtcbn1cbiJdfQ==
