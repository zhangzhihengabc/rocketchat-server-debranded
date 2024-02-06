(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Accounts = Package['accounts-base'].Accounts;
var Twitter = Package['twitter-oauth'].Twitter;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-twitter":{"notice.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/accounts-twitter/notice.js                                                                          //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
if (Package['accounts-ui'] && !Package['service-configuration'] && !Object.prototype.hasOwnProperty.call(Package, 'twitter-config-ui')) {
  console.warn("Note: You're using accounts-ui and accounts-twitter,\n" + "but didn't install the configuration UI for Twitter\n" + "OAuth. You can install it with:\n" + "\n" + "    meteor add twitter-config-ui" + "\n");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"twitter.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/accounts-twitter/twitter.js                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Accounts.oauth.registerService('twitter');
if (Meteor.isClient) {
  const loginWithTwitter = (options, callback) => {
    // support a callback without options
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Twitter.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('twitter', loginWithTwitter);
  Meteor.loginWithTwitter = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return Accounts.applyLoginFunction('twitter', args);
  };
} else {
  const autopublishedFields =
  // don't send access token. https://dev.twitter.com/discussions/5025
  Twitter.whitelistedFields.concat(['id', 'screenName']).map(subfield => "services.twitter.".concat(subfield));
  Accounts.addAutopublishFields({
    forLoggedInUser: autopublishedFields,
    forOtherUsers: autopublishedFields
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/accounts-twitter/notice.js");
require("/node_modules/meteor/accounts-twitter/twitter.js");

/* Exports */
Package._define("accounts-twitter");

})();

//# sourceURL=meteor://💻app/packages/accounts-twitter.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtdHdpdHRlci9ub3RpY2UuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2FjY291bnRzLXR3aXR0ZXIvdHdpdHRlci5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiY29uc29sZSIsIndhcm4iLCJBY2NvdW50cyIsIm9hdXRoIiwicmVnaXN0ZXJTZXJ2aWNlIiwiTWV0ZW9yIiwiaXNDbGllbnQiLCJsb2dpbldpdGhUd2l0dGVyIiwib3B0aW9ucyIsImNhbGxiYWNrIiwiY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrIiwiY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUhhbmRsZXIiLCJUd2l0dGVyIiwicmVxdWVzdENyZWRlbnRpYWwiLCJyZWdpc3RlckNsaWVudExvZ2luRnVuY3Rpb24iLCJhcmdzIiwiYXBwbHlMb2dpbkZ1bmN0aW9uIiwiYXV0b3B1Ymxpc2hlZEZpZWxkcyIsIndoaXRlbGlzdGVkRmllbGRzIiwiY29uY2F0IiwibWFwIiwic3ViZmllbGQiLCJhZGRBdXRvcHVibGlzaEZpZWxkcyIsImZvckxvZ2dlZEluVXNlciIsImZvck90aGVyVXNlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQ25CLENBQUNBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUNqQyxDQUFDQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNKLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxFQUFFO0VBQzFFSyxPQUFPLENBQUNDLElBQUksQ0FDVix3REFBd0QsR0FDeEQsdURBQXVELEdBQ3ZELG1DQUFtQyxHQUNuQyxJQUFJLEdBQ0osa0NBQWtDLEdBQ2xDLElBQUksQ0FDTDtBQUNILEM7Ozs7Ozs7Ozs7O0FDWEFDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxlQUFlLENBQUMsU0FBUyxDQUFDO0FBRXpDLElBQUlDLE1BQU0sQ0FBQ0MsUUFBUSxFQUFFO0VBQ25CLE1BQU1DLGdCQUFnQixHQUFHLENBQUNDLE9BQU8sRUFBRUMsUUFBUSxLQUFLO0lBQzlDO0lBQ0EsSUFBSSxDQUFFQSxRQUFRLElBQUksT0FBT0QsT0FBTyxLQUFLLFVBQVUsRUFBRTtNQUMvQ0MsUUFBUSxHQUFHRCxPQUFPO01BQ2xCQSxPQUFPLEdBQUcsSUFBSTtJQUNoQjtJQUVBLE1BQU1FLGlDQUFpQyxHQUFHUixRQUFRLENBQUNDLEtBQUssQ0FBQ1EsZ0NBQWdDLENBQUNGLFFBQVEsQ0FBQztJQUNuR0csT0FBTyxDQUFDQyxpQkFBaUIsQ0FBQ0wsT0FBTyxFQUFFRSxpQ0FBaUMsQ0FBQztFQUN2RSxDQUFDO0VBQ0RSLFFBQVEsQ0FBQ1ksMkJBQTJCLENBQUMsU0FBUyxFQUFFUCxnQkFBZ0IsQ0FBQztFQUNqRUYsTUFBTSxDQUFDRSxnQkFBZ0IsR0FBRztJQUFBLGtDQUFJUSxJQUFJO01BQUpBLElBQUk7SUFBQTtJQUFBLE9BQ2hDYixRQUFRLENBQUNjLGtCQUFrQixDQUFDLFNBQVMsRUFBRUQsSUFBSSxDQUFDO0VBQUE7QUFDaEQsQ0FBQyxNQUFNO0VBQ0wsTUFBTUUsbUJBQW1CO0VBQ3ZCO0VBQ0FMLE9BQU8sQ0FBQ00saUJBQWlCLENBQUNDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDQyxHQUFHLENBQ3hEQyxRQUFRLCtCQUF3QkEsUUFBUSxDQUFFLENBQzNDO0VBRUhuQixRQUFRLENBQUNvQixvQkFBb0IsQ0FBQztJQUM1QkMsZUFBZSxFQUFFTixtQkFBbUI7SUFDcENPLGFBQWEsRUFBRVA7RUFDakIsQ0FBQyxDQUFDO0FBQ0osQyIsImZpbGUiOiIvcGFja2FnZXMvYWNjb3VudHMtdHdpdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIChQYWNrYWdlWydhY2NvdW50cy11aSddXG4gICAgJiYgIVBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddXG4gICAgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChQYWNrYWdlLCAndHdpdHRlci1jb25maWctdWknKSkge1xuICBjb25zb2xlLndhcm4oXG4gICAgXCJOb3RlOiBZb3UncmUgdXNpbmcgYWNjb3VudHMtdWkgYW5kIGFjY291bnRzLXR3aXR0ZXIsXFxuXCIgK1xuICAgIFwiYnV0IGRpZG4ndCBpbnN0YWxsIHRoZSBjb25maWd1cmF0aW9uIFVJIGZvciBUd2l0dGVyXFxuXCIgK1xuICAgIFwiT0F1dGguIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoOlxcblwiICtcbiAgICBcIlxcblwiICtcbiAgICBcIiAgICBtZXRlb3IgYWRkIHR3aXR0ZXItY29uZmlnLXVpXCIgK1xuICAgIFwiXFxuXCJcbiAgKTtcbn1cbiIsIkFjY291bnRzLm9hdXRoLnJlZ2lzdGVyU2VydmljZSgndHdpdHRlcicpO1xuXG5pZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG4gIGNvbnN0IGxvZ2luV2l0aFR3aXR0ZXIgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzdXBwb3J0IGEgY2FsbGJhY2sgd2l0aG91dCBvcHRpb25zXG4gICAgaWYgKCEgY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrID0gQWNjb3VudHMub2F1dGguY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIFR3aXR0ZXIucmVxdWVzdENyZWRlbnRpYWwob3B0aW9ucywgY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrKTtcbiAgfTtcbiAgQWNjb3VudHMucmVnaXN0ZXJDbGllbnRMb2dpbkZ1bmN0aW9uKCd0d2l0dGVyJywgbG9naW5XaXRoVHdpdHRlcik7XG4gIE1ldGVvci5sb2dpbldpdGhUd2l0dGVyID0gKC4uLmFyZ3MpID0+XG4gICAgQWNjb3VudHMuYXBwbHlMb2dpbkZ1bmN0aW9uKCd0d2l0dGVyJywgYXJncyk7XG59IGVsc2Uge1xuICBjb25zdCBhdXRvcHVibGlzaGVkRmllbGRzID0gXG4gICAgLy8gZG9uJ3Qgc2VuZCBhY2Nlc3MgdG9rZW4uIGh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL2Rpc2N1c3Npb25zLzUwMjVcbiAgICBUd2l0dGVyLndoaXRlbGlzdGVkRmllbGRzLmNvbmNhdChbJ2lkJywgJ3NjcmVlbk5hbWUnXSkubWFwKFxuICAgICAgc3ViZmllbGQgPT4gYHNlcnZpY2VzLnR3aXR0ZXIuJHtzdWJmaWVsZH1gXG4gICAgKTtcblxuICBBY2NvdW50cy5hZGRBdXRvcHVibGlzaEZpZWxkcyh7XG4gICAgZm9yTG9nZ2VkSW5Vc2VyOiBhdXRvcHVibGlzaGVkRmllbGRzLFxuICAgIGZvck90aGVyVXNlcnM6IGF1dG9wdWJsaXNoZWRGaWVsZHNcbiAgfSk7XG59XG4iXX0=
