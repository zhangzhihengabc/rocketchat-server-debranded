(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Accounts = Package['accounts-base'].Accounts;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"pauli:accounts-linkedin":{"notice.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/pauli_accounts-linkedin/notice.js                                                            //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
if (Package['accounts-ui'] && !Package['service-configuration'] && !Package.hasOwnProperty('pauli:linkedin-config-ui')) {
  console.warn("Note: You're using accounts-ui and pauli:accounts-linkedin,\n" + "but didn't install the configuration UI for the Linkedin\n" + 'OAuth. You can install it with:\n' + '\n' + '    meteor add pauli:linkedin-config-ui' + '\n');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"linkedin.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/pauli_accounts-linkedin/linkedin.js                                                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }
}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 1);
let Linkedin;
module.link("meteor/pauli:linkedin-oauth", {
  Linkedin(v) {
    Linkedin = v;
  }
}, 2);
Accounts.oauth.registerService('linkedin');
if (Meteor.isClient) {
  const loginWithLinkedin = function (options, callback) {
    // support a callback without options
    if (!callback && typeof options === 'function') {
      callback = options;
      options = null;
    }
    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    void Linkedin.requestCredential(options, credentialRequestCompleteCallback).catch(credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('linkedin', loginWithLinkedin);
  Meteor.loginWithLinkedin = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return Accounts.applyLoginFunction('linkedin', args);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.linkedin']
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/pauli:accounts-linkedin/notice.js");
require("/node_modules/meteor/pauli:accounts-linkedin/linkedin.js");

/* Exports */
Package._define("pauli:accounts-linkedin");

})();

//# sourceURL=meteor://💻app/packages/pauli_accounts-linkedin.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGF1bGk6YWNjb3VudHMtbGlua2VkaW4vbm90aWNlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9wYXVsaTphY2NvdW50cy1saW5rZWRpbi9saW5rZWRpbi5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiaGFzT3duUHJvcGVydHkiLCJjb25zb2xlIiwid2FybiIsIkFjY291bnRzIiwibW9kdWxlIiwibGluayIsInYiLCJNZXRlb3IiLCJMaW5rZWRpbiIsIm9hdXRoIiwicmVnaXN0ZXJTZXJ2aWNlIiwiaXNDbGllbnQiLCJsb2dpbldpdGhMaW5rZWRpbiIsIm9wdGlvbnMiLCJjYWxsYmFjayIsImNyZWRlbnRpYWxSZXF1ZXN0Q29tcGxldGVDYWxsYmFjayIsImNyZWRlbnRpYWxSZXF1ZXN0Q29tcGxldGVIYW5kbGVyIiwicmVxdWVzdENyZWRlbnRpYWwiLCJjYXRjaCIsInJlZ2lzdGVyQ2xpZW50TG9naW5GdW5jdGlvbiIsImFyZ3MiLCJhcHBseUxvZ2luRnVuY3Rpb24iLCJhZGRBdXRvcHVibGlzaEZpZWxkcyIsImZvckxvZ2dlZEluVXNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUNBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUNBLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7RUFDdkhDLE9BQU8sQ0FBQ0MsSUFBSSxDQUNYLCtEQUErRCxHQUM5RCw0REFBNEQsR0FDNUQsbUNBQW1DLEdBQ25DLElBQUksR0FDSix5Q0FBeUMsR0FDekMsSUFBSSxDQUNMO0FBQ0YsQzs7Ozs7Ozs7Ozs7QUNUQSxJQUFJQyxRQUFRO0FBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLHNCQUFzQixFQUFDO0VBQUNGLFFBQVEsQ0FBQ0csQ0FBQyxFQUFDO0lBQUNILFFBQVEsR0FBQ0csQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFDLElBQUlDLE1BQU07QUFBQ0gsTUFBTSxDQUFDQyxJQUFJLENBQUMsZUFBZSxFQUFDO0VBQUNFLE1BQU0sQ0FBQ0QsQ0FBQyxFQUFDO0lBQUNDLE1BQU0sR0FBQ0QsQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFDLElBQUlFLFFBQVE7QUFBQ0osTUFBTSxDQUFDQyxJQUFJLENBQUMsNkJBQTZCLEVBQUM7RUFBQ0csUUFBUSxDQUFDRixDQUFDLEVBQUM7SUFBQ0UsUUFBUSxHQUFDRixDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBSWhPSCxRQUFRLENBQUNNLEtBQUssQ0FBQ0MsZUFBZSxDQUFDLFVBQVUsQ0FBQztBQUUxQyxJQUFJSCxNQUFNLENBQUNJLFFBQVEsRUFBRTtFQUNwQixNQUFNQyxpQkFBaUIsR0FBRyxVQUFVQyxPQUFPLEVBQUVDLFFBQVEsRUFBRTtJQUN0RDtJQUNBLElBQUksQ0FBQ0EsUUFBUSxJQUFJLE9BQU9ELE9BQU8sS0FBSyxVQUFVLEVBQUU7TUFDL0NDLFFBQVEsR0FBR0QsT0FBTztNQUNsQkEsT0FBTyxHQUFHLElBQUk7SUFDZjtJQUNBLE1BQU1FLGlDQUFpQyxHQUFHWixRQUFRLENBQUNNLEtBQUssQ0FBQ08sZ0NBQWdDLENBQUNGLFFBQVEsQ0FBQztJQUNuRyxLQUFLTixRQUFRLENBQUNTLGlCQUFpQixDQUFDSixPQUFPLEVBQUVFLGlDQUFpQyxDQUFDLENBQUNHLEtBQUssQ0FBQ0gsaUNBQWlDLENBQUM7RUFDckgsQ0FBQztFQUNEWixRQUFRLENBQUNnQiwyQkFBMkIsQ0FBQyxVQUFVLEVBQUVQLGlCQUFpQixDQUFDO0VBRW5FTCxNQUFNLENBQUNLLGlCQUFpQixHQUFHO0lBQUEsa0NBQUlRLElBQUk7TUFBSkEsSUFBSTtJQUFBO0lBQUEsT0FBS2pCLFFBQVEsQ0FBQ2tCLGtCQUFrQixDQUFDLFVBQVUsRUFBRUQsSUFBSSxDQUFDO0VBQUE7QUFDdEYsQ0FBQyxNQUFNO0VBQ05qQixRQUFRLENBQUNtQixvQkFBb0IsQ0FBQztJQUM3QkMsZUFBZSxFQUFFLENBQUMsbUJBQW1CO0VBQ3RDLENBQUMsQ0FBQztBQUNILEMiLCJmaWxlIjoiL3BhY2thZ2VzL3BhdWxpX2FjY291bnRzLWxpbmtlZGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKFBhY2thZ2VbJ2FjY291bnRzLXVpJ10gJiYgIVBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddICYmICFQYWNrYWdlLmhhc093blByb3BlcnR5KCdwYXVsaTpsaW5rZWRpbi1jb25maWctdWknKSkge1xuXHRjb25zb2xlLndhcm4oXG5cdFx0XCJOb3RlOiBZb3UncmUgdXNpbmcgYWNjb3VudHMtdWkgYW5kIHBhdWxpOmFjY291bnRzLWxpbmtlZGluLFxcblwiICtcblx0XHRcdFwiYnV0IGRpZG4ndCBpbnN0YWxsIHRoZSBjb25maWd1cmF0aW9uIFVJIGZvciB0aGUgTGlua2VkaW5cXG5cIiArXG5cdFx0XHQnT0F1dGguIFlvdSBjYW4gaW5zdGFsbCBpdCB3aXRoOlxcbicgK1xuXHRcdFx0J1xcbicgK1xuXHRcdFx0JyAgICBtZXRlb3IgYWRkIHBhdWxpOmxpbmtlZGluLWNvbmZpZy11aScgK1xuXHRcdFx0J1xcbicsXG5cdCk7XG59XG4iLCJpbXBvcnQgeyBBY2NvdW50cyB9IGZyb20gJ21ldGVvci9hY2NvdW50cy1iYXNlJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgTGlua2VkaW4gfSBmcm9tICdtZXRlb3IvcGF1bGk6bGlua2VkaW4tb2F1dGgnO1xuXG5BY2NvdW50cy5vYXV0aC5yZWdpc3RlclNlcnZpY2UoJ2xpbmtlZGluJyk7XG5cbmlmIChNZXRlb3IuaXNDbGllbnQpIHtcblx0Y29uc3QgbG9naW5XaXRoTGlua2VkaW4gPSBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHQvLyBzdXBwb3J0IGEgY2FsbGJhY2sgd2l0aG91dCBvcHRpb25zXG5cdFx0aWYgKCFjYWxsYmFjayAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xuXHRcdFx0b3B0aW9ucyA9IG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IGNyZWRlbnRpYWxSZXF1ZXN0Q29tcGxldGVDYWxsYmFjayA9IEFjY291bnRzLm9hdXRoLmNyZWRlbnRpYWxSZXF1ZXN0Q29tcGxldGVIYW5kbGVyKGNhbGxiYWNrKTtcblx0XHR2b2lkIExpbmtlZGluLnJlcXVlc3RDcmVkZW50aWFsKG9wdGlvbnMsIGNyZWRlbnRpYWxSZXF1ZXN0Q29tcGxldGVDYWxsYmFjaykuY2F0Y2goY3JlZGVudGlhbFJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrKTtcblx0fTtcblx0QWNjb3VudHMucmVnaXN0ZXJDbGllbnRMb2dpbkZ1bmN0aW9uKCdsaW5rZWRpbicsIGxvZ2luV2l0aExpbmtlZGluKTtcblxuXHRNZXRlb3IubG9naW5XaXRoTGlua2VkaW4gPSAoLi4uYXJncykgPT4gQWNjb3VudHMuYXBwbHlMb2dpbkZ1bmN0aW9uKCdsaW5rZWRpbicsIGFyZ3MpO1xufSBlbHNlIHtcblx0QWNjb3VudHMuYWRkQXV0b3B1Ymxpc2hGaWVsZHMoe1xuXHRcdGZvckxvZ2dlZEluVXNlcjogWydzZXJ2aWNlcy5saW5rZWRpbiddLFxuXHR9KTtcbn1cbiJdfQ==
