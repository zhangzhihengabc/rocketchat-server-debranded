(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Email = Package.email.Email;
var EmailInternals = Package.email.EmailInternals;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:mongo-config":{"server":{"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_mongo-config/server/index.js                                                             //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let tls;
module.link("tls", {
  default(v) {
    tls = v;
  }
}, 0);
let PassThrough;
module.link("stream", {
  PassThrough(v) {
    PassThrough = v;
  }
}, 1);
let Email;
module.link("meteor/email", {
  Email(v) {
    Email = v;
  }
}, 2);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }
}, 3);
const shouldDisableOplog = ['yes', 'true'].includes(String(process.env.USE_NATIVE_OPLOG).toLowerCase());
if (!shouldDisableOplog) {
  Package['disable-oplog'] = {};
}

// FIX For TLS error see more here https://github.com/RocketChat/Rocket.Chat/issues/9316
// TODO: Remove after NodeJS fix it, more information
// https://github.com/nodejs/node/issues/16196
// https://github.com/nodejs/node/pull/16853
// This is fixed in Node 10, but this supports LTS versions
tls.DEFAULT_ECDH_CURVE = 'auto';
const mongoConnectionOptions = _objectSpread({}, !process.env.MONGO_URL.includes('retryWrites') && {
  retryWrites: false
});
const mongoOptionStr = process.env.MONGO_OPTIONS;
if (typeof mongoOptionStr !== 'undefined') {
  const mongoOptions = JSON.parse(mongoOptionStr);
  Object.assign(mongoConnectionOptions, mongoOptions);
}
if (Object.keys(mongoConnectionOptions).length > 0) {
  Mongo.setConnectionOptions(mongoConnectionOptions);
}
process.env.HTTP_FORWARDED_COUNT = process.env.HTTP_FORWARDED_COUNT || '1';

// Just print to logs if in TEST_MODE due to a bug in Meteor 2.5: TypeError: Cannot read property '_syncSendMail' of null
if (process.env.TEST_MODE === 'true') {
  Email.sendAsync = function _sendAsync(options) {
    console.log('Email.sendAsync', options);
  };
} else if (process.env.NODE_ENV !== 'development') {
  // Send emails to a "fake" stream instead of print them in console in case MAIL_URL or SMTP is not configured
  const stream = new PassThrough();
  stream.on('data', () => {});
  stream.on('end', () => {});
  const {
    sendAsync
  } = Email;
  Email.sendAsync = function _sendAsync(options) {
    return sendAsync.call(this, _objectSpread({
      stream
    }, options));
  };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/rocketchat:mongo-config/server/index.js");

/* Exports */
Package._define("rocketchat:mongo-config", exports);

})();

//# sourceURL=meteor://💻app/packages/rocketchat_mongo-config.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcm9ja2V0Y2hhdDptb25nby1jb25maWcvc2VydmVyL2luZGV4LmpzIl0sIm5hbWVzIjpbIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJ0bHMiLCJQYXNzVGhyb3VnaCIsIkVtYWlsIiwiTW9uZ28iLCJzaG91bGREaXNhYmxlT3Bsb2ciLCJpbmNsdWRlcyIsIlN0cmluZyIsInByb2Nlc3MiLCJlbnYiLCJVU0VfTkFUSVZFX09QTE9HIiwidG9Mb3dlckNhc2UiLCJQYWNrYWdlIiwiREVGQVVMVF9FQ0RIX0NVUlZFIiwibW9uZ29Db25uZWN0aW9uT3B0aW9ucyIsIk1PTkdPX1VSTCIsInJldHJ5V3JpdGVzIiwibW9uZ29PcHRpb25TdHIiLCJNT05HT19PUFRJT05TIiwibW9uZ29PcHRpb25zIiwiSlNPTiIsInBhcnNlIiwiT2JqZWN0IiwiYXNzaWduIiwia2V5cyIsImxlbmd0aCIsInNldENvbm5lY3Rpb25PcHRpb25zIiwiSFRUUF9GT1JXQVJERURfQ09VTlQiLCJURVNUX01PREUiLCJzZW5kQXN5bmMiLCJfc2VuZEFzeW5jIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJOT0RFX0VOViIsInN0cmVhbSIsIm9uIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsYUFBYTtBQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQyxzQ0FBc0MsRUFBQztFQUFDQyxPQUFPLENBQUNDLENBQUMsRUFBQztJQUFDSixhQUFhLEdBQUNJLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBckcsSUFBSUMsR0FBRztBQUFDSixNQUFNLENBQUNDLElBQUksQ0FBQyxLQUFLLEVBQUM7RUFBQ0MsT0FBTyxDQUFDQyxDQUFDLEVBQUM7SUFBQ0MsR0FBRyxHQUFDRCxDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSUUsV0FBVztBQUFDTCxNQUFNLENBQUNDLElBQUksQ0FBQyxRQUFRLEVBQUM7RUFBQ0ksV0FBVyxDQUFDRixDQUFDLEVBQUM7SUFBQ0UsV0FBVyxHQUFDRixDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSUcsS0FBSztBQUFDTixNQUFNLENBQUNDLElBQUksQ0FBQyxjQUFjLEVBQUM7RUFBQ0ssS0FBSyxDQUFDSCxDQUFDLEVBQUM7SUFBQ0csS0FBSyxHQUFDSCxDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsSUFBSUksS0FBSztBQUFDUCxNQUFNLENBQUNDLElBQUksQ0FBQyxjQUFjLEVBQUM7RUFBQ00sS0FBSyxDQUFDSixDQUFDLEVBQUM7SUFBQ0ksS0FBSyxHQUFDSixDQUFDO0VBQUE7QUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBTWhQLE1BQU1LLGtCQUFrQixHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGdCQUFnQixDQUFDLENBQUNDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZHLElBQUksQ0FBQ04sa0JBQWtCLEVBQUU7RUFDeEJPLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBWCxHQUFHLENBQUNZLGtCQUFrQixHQUFHLE1BQU07QUFFL0IsTUFBTUMsc0JBQXNCLHFCQUV2QixDQUFDTixPQUFPLENBQUNDLEdBQUcsQ0FBQ00sU0FBUyxDQUFDVCxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUk7RUFBRVUsV0FBVyxFQUFFO0FBQU0sQ0FBQyxDQUU1RTtBQUVELE1BQU1DLGNBQWMsR0FBR1QsT0FBTyxDQUFDQyxHQUFHLENBQUNTLGFBQWE7QUFDaEQsSUFBSSxPQUFPRCxjQUFjLEtBQUssV0FBVyxFQUFFO0VBQzFDLE1BQU1FLFlBQVksR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNKLGNBQWMsQ0FBQztFQUMvQ0ssTUFBTSxDQUFDQyxNQUFNLENBQUNULHNCQUFzQixFQUFFSyxZQUFZLENBQUM7QUFDcEQ7QUFFQSxJQUFJRyxNQUFNLENBQUNFLElBQUksQ0FBQ1Ysc0JBQXNCLENBQUMsQ0FBQ1csTUFBTSxHQUFHLENBQUMsRUFBRTtFQUNuRHJCLEtBQUssQ0FBQ3NCLG9CQUFvQixDQUFDWixzQkFBc0IsQ0FBQztBQUNuRDtBQUVBTixPQUFPLENBQUNDLEdBQUcsQ0FBQ2tCLG9CQUFvQixHQUFHbkIsT0FBTyxDQUFDQyxHQUFHLENBQUNrQixvQkFBb0IsSUFBSSxHQUFHOztBQUUxRTtBQUNBLElBQUluQixPQUFPLENBQUNDLEdBQUcsQ0FBQ21CLFNBQVMsS0FBSyxNQUFNLEVBQUU7RUFDckN6QixLQUFLLENBQUMwQixTQUFTLEdBQUcsU0FBU0MsVUFBVSxDQUFDQyxPQUFPLEVBQUU7SUFDOUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixFQUFFRixPQUFPLENBQUM7RUFDeEMsQ0FBQztBQUNGLENBQUMsTUFBTSxJQUFJdkIsT0FBTyxDQUFDQyxHQUFHLENBQUN5QixRQUFRLEtBQUssYUFBYSxFQUFFO0VBQ2xEO0VBQ0EsTUFBTUMsTUFBTSxHQUFHLElBQUlqQyxXQUFXLEVBQUU7RUFDaENpQyxNQUFNLENBQUNDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUMzQkQsTUFBTSxDQUFDQyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFFMUIsTUFBTTtJQUFFUDtFQUFVLENBQUMsR0FBRzFCLEtBQUs7RUFDM0JBLEtBQUssQ0FBQzBCLFNBQVMsR0FBRyxTQUFTQyxVQUFVLENBQUNDLE9BQU8sRUFBRTtJQUM5QyxPQUFPRixTQUFTLENBQUNRLElBQUksQ0FBQyxJQUFJO01BQUlGO0lBQU0sR0FBS0osT0FBTyxFQUFHO0VBQ3BELENBQUM7QUFDRixDIiwiZmlsZSI6Ii9wYWNrYWdlcy9yb2NrZXRjaGF0X21vbmdvLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0bHMgZnJvbSAndGxzJztcbmltcG9ydCB7IFBhc3NUaHJvdWdoIH0gZnJvbSAnc3RyZWFtJztcblxuaW1wb3J0IHsgRW1haWwgfSBmcm9tICdtZXRlb3IvZW1haWwnO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuXG5jb25zdCBzaG91bGREaXNhYmxlT3Bsb2cgPSBbJ3llcycsICd0cnVlJ10uaW5jbHVkZXMoU3RyaW5nKHByb2Nlc3MuZW52LlVTRV9OQVRJVkVfT1BMT0cpLnRvTG93ZXJDYXNlKCkpO1xuaWYgKCFzaG91bGREaXNhYmxlT3Bsb2cpIHtcblx0UGFja2FnZVsnZGlzYWJsZS1vcGxvZyddID0ge307XG59XG5cbi8vIEZJWCBGb3IgVExTIGVycm9yIHNlZSBtb3JlIGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL1JvY2tldENoYXQvUm9ja2V0LkNoYXQvaXNzdWVzLzkzMTZcbi8vIFRPRE86IFJlbW92ZSBhZnRlciBOb2RlSlMgZml4IGl0LCBtb3JlIGluZm9ybWF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzE2MTk2XG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvcHVsbC8xNjg1M1xuLy8gVGhpcyBpcyBmaXhlZCBpbiBOb2RlIDEwLCBidXQgdGhpcyBzdXBwb3J0cyBMVFMgdmVyc2lvbnNcbnRscy5ERUZBVUxUX0VDREhfQ1VSVkUgPSAnYXV0byc7XG5cbmNvbnN0IG1vbmdvQ29ubmVjdGlvbk9wdGlvbnMgPSB7XG5cdC8vIGFkZCByZXRyeVdyaXRlcz1mYWxzZSBpZiBub3QgcHJlc2VudCBpbiBNT05HT19VUkxcblx0Li4uKCFwcm9jZXNzLmVudi5NT05HT19VUkwuaW5jbHVkZXMoJ3JldHJ5V3JpdGVzJykgJiYgeyByZXRyeVdyaXRlczogZmFsc2UgfSksXG5cdC8vIGlnbm9yZVVuZGVmaW5lZDogZmFsc2UsIC8vIFRPRE8gZXZhbHVhdGUgYWRkaW5nIHRoaXMgY29uZmlnXG59O1xuXG5jb25zdCBtb25nb09wdGlvblN0ciA9IHByb2Nlc3MuZW52Lk1PTkdPX09QVElPTlM7XG5pZiAodHlwZW9mIG1vbmdvT3B0aW9uU3RyICE9PSAndW5kZWZpbmVkJykge1xuXHRjb25zdCBtb25nb09wdGlvbnMgPSBKU09OLnBhcnNlKG1vbmdvT3B0aW9uU3RyKTtcblx0T2JqZWN0LmFzc2lnbihtb25nb0Nvbm5lY3Rpb25PcHRpb25zLCBtb25nb09wdGlvbnMpO1xufVxuXG5pZiAoT2JqZWN0LmtleXMobW9uZ29Db25uZWN0aW9uT3B0aW9ucykubGVuZ3RoID4gMCkge1xuXHRNb25nby5zZXRDb25uZWN0aW9uT3B0aW9ucyhtb25nb0Nvbm5lY3Rpb25PcHRpb25zKTtcbn1cblxucHJvY2Vzcy5lbnYuSFRUUF9GT1JXQVJERURfQ09VTlQgPSBwcm9jZXNzLmVudi5IVFRQX0ZPUldBUkRFRF9DT1VOVCB8fCAnMSc7XG5cbi8vIEp1c3QgcHJpbnQgdG8gbG9ncyBpZiBpbiBURVNUX01PREUgZHVlIHRvIGEgYnVnIGluIE1ldGVvciAyLjU6IFR5cGVFcnJvcjogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ19zeW5jU2VuZE1haWwnIG9mIG51bGxcbmlmIChwcm9jZXNzLmVudi5URVNUX01PREUgPT09ICd0cnVlJykge1xuXHRFbWFpbC5zZW5kQXN5bmMgPSBmdW5jdGlvbiBfc2VuZEFzeW5jKG9wdGlvbnMpIHtcblx0XHRjb25zb2xlLmxvZygnRW1haWwuc2VuZEFzeW5jJywgb3B0aW9ucyk7XG5cdH07XG59IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnKSB7XG5cdC8vIFNlbmQgZW1haWxzIHRvIGEgXCJmYWtlXCIgc3RyZWFtIGluc3RlYWQgb2YgcHJpbnQgdGhlbSBpbiBjb25zb2xlIGluIGNhc2UgTUFJTF9VUkwgb3IgU01UUCBpcyBub3QgY29uZmlndXJlZFxuXHRjb25zdCBzdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0c3RyZWFtLm9uKCdkYXRhJywgKCkgPT4ge30pO1xuXHRzdHJlYW0ub24oJ2VuZCcsICgpID0+IHt9KTtcblxuXHRjb25zdCB7IHNlbmRBc3luYyB9ID0gRW1haWw7XG5cdEVtYWlsLnNlbmRBc3luYyA9IGZ1bmN0aW9uIF9zZW5kQXN5bmMob3B0aW9ucykge1xuXHRcdHJldHVybiBzZW5kQXN5bmMuY2FsbCh0aGlzLCB7IHN0cmVhbSwgLi4ub3B0aW9ucyB9KTtcblx0fTtcbn1cbiJdfQ==
