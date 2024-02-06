(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Autoupdate;

var require = meteorInstall({"node_modules":{"meteor":{"autoupdate":{"autoupdate_server.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/autoupdate/autoupdate_server.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
!function (module1) {
  let _objectSpread;
  module1.link("@babel/runtime/helpers/objectSpread2", {
    default(v) {
      _objectSpread = v;
    }
  }, 0);
  module1.export({
    Autoupdate: () => Autoupdate
  });
  let ClientVersions;
  module1.link("./client_versions.js", {
    ClientVersions(v) {
      ClientVersions = v;
    }
  }, 0);
  let onMessage;
  module1.link("meteor/inter-process-messaging", {
    onMessage(v) {
      onMessage = v;
    }
  }, 1);
  var Future = Npm.require("fibers/future");
  const Autoupdate = __meteor_runtime_config__.autoupdate = {
    // Map from client architectures (web.browser, web.browser.legacy,
    // web.cordova) to version fields { version, versionRefreshable,
    // versionNonRefreshable, refreshable } that will be stored in
    // ClientVersions documents (whose IDs are client architectures). This
    // data gets serialized into the boilerplate because it's stored in
    // __meteor_runtime_config__.autoupdate.versions.
    versions: {}
  };
  // Stores acceptable client versions.
  const clientVersions = new ClientVersions();

  // The client hash includes __meteor_runtime_config__, so wait until
  // all packages have loaded and have had a chance to populate the
  // runtime config before using the client hash as our default auto
  // update version id.

  // Note: Tests allow people to override Autoupdate.autoupdateVersion before
  // startup.
  Autoupdate.autoupdateVersion = null;
  Autoupdate.autoupdateVersionRefreshable = null;
  Autoupdate.autoupdateVersionCordova = null;
  Autoupdate.appId = __meteor_runtime_config__.appId = process.env.APP_ID;
  var syncQueue = new Meteor._SynchronousQueue();
  function updateVersions(shouldReloadClientProgram) {
    // Step 1: load the current client program on the server
    if (shouldReloadClientProgram) {
      WebAppInternals.reloadClientPrograms();
    }
    const {
      // If the AUTOUPDATE_VERSION environment variable is defined, it takes
      // precedence, but Autoupdate.autoupdateVersion is still supported as
      // a fallback. In most cases neither of these values will be defined.
      AUTOUPDATE_VERSION = Autoupdate.autoupdateVersion
    } = process.env;

    // Step 2: update __meteor_runtime_config__.autoupdate.versions.
    const clientArchs = Object.keys(WebApp.clientPrograms);
    clientArchs.forEach(arch => {
      Autoupdate.versions[arch] = {
        version: AUTOUPDATE_VERSION || WebApp.calculateClientHash(arch),
        versionRefreshable: AUTOUPDATE_VERSION || WebApp.calculateClientHashRefreshable(arch),
        versionNonRefreshable: AUTOUPDATE_VERSION || WebApp.calculateClientHashNonRefreshable(arch),
        versionReplaceable: AUTOUPDATE_VERSION || WebApp.calculateClientHashReplaceable(arch),
        versionHmr: WebApp.clientPrograms[arch].hmrVersion
      };
    });

    // Step 3: form the new client boilerplate which contains the updated
    // assets and __meteor_runtime_config__.
    if (shouldReloadClientProgram) {
      WebAppInternals.generateBoilerplate();
    }

    // Step 4: update the ClientVersions collection.
    // We use `onListening` here because we need to use
    // `WebApp.getRefreshableAssets`, which is only set after
    // `WebApp.generateBoilerplate` is called by `main` in webapp.
    WebApp.onListening(() => {
      clientArchs.forEach(arch => {
        const payload = _objectSpread(_objectSpread({}, Autoupdate.versions[arch]), {}, {
          assets: WebApp.getRefreshableAssets(arch)
        });
        clientVersions.set(arch, payload);
      });
    });
  }
  Meteor.publish("meteor_autoupdate_clientVersions", function (appId) {
    // `null` happens when a client doesn't have an appId and passes
    // `undefined` to `Meteor.subscribe`. `undefined` is translated to
    // `null` as JSON doesn't have `undefined.
    check(appId, Match.OneOf(String, undefined, null));

    // Don't notify clients using wrong appId such as mobile apps built with a
    // different server but pointing at the same local url
    if (Autoupdate.appId && appId && Autoupdate.appId !== appId) return [];

    // Random value to delay the updates for 2-10 minutes
    const randomInterval = Meteor.isProduction ? (Math.floor(Math.random() * 8) + 2) * 1000 * 60 : 0;
    const stop = clientVersions.watch((version, isNew) => {
      setTimeout(() => {
        (isNew ? this.added : this.changed).call(this, "meteor_autoupdate_clientVersions", version._id, version);
      }, randomInterval);
    });
    this.onStop(() => stop());
    this.ready();
  }, {
    is_auto: true
  });
  Meteor.startup(function () {
    updateVersions(false);

    // Force any connected clients that are still looking for these older
    // document IDs to reload.
    ["version", "version-refreshable", "version-cordova"].forEach(_id => {
      clientVersions.set(_id, {
        version: "outdated"
      });
    });
  });
  var fut = new Future();

  // We only want 'refresh' to trigger 'updateVersions' AFTER onListen,
  // so we add a queued task that waits for onListen before 'refresh' can queue
  // tasks. Note that the `onListening` callbacks do not fire until after
  // Meteor.startup, so there is no concern that the 'updateVersions' calls from
  // 'refresh' will overlap with the `updateVersions` call from Meteor.startup.

  syncQueue.queueTask(function () {
    fut.wait();
  });
  WebApp.onListening(function () {
    fut.return();
  });
  function enqueueVersionsRefresh() {
    syncQueue.queueTask(function () {
      updateVersions(true);
    });
  }

  // Listen for messages pertaining to the client-refresh topic.

  onMessage("client-refresh", enqueueVersionsRefresh);

  // Another way to tell the process to refresh: send SIGHUP signal
  process.on('SIGHUP', Meteor.bindEnvironment(function () {
    enqueueVersionsRefresh();
  }, "handling SIGHUP signal for refresh"));
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client_versions.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/autoupdate/client_versions.js                                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
module.export({
  ClientVersions: () => ClientVersions
});
let Tracker;
module.link("meteor/tracker", {
  Tracker(v) {
    Tracker = v;
  }
}, 0);
class ClientVersions {
  constructor() {
    this._versions = new Map();
    this._watchCallbacks = new Set();
  }

  // Creates a Livedata store for use with `Meteor.connection.registerStore`.
  // After the store is registered, document updates reported by Livedata are
  // merged with the documents in this `ClientVersions` instance.
  createStore() {
    return {
      update: _ref => {
        let {
          id,
          msg,
          fields
        } = _ref;
        if (msg === "added" || msg === "changed") {
          this.set(id, fields);
        }
      }
    };
  }
  hasVersions() {
    return this._versions.size > 0;
  }
  get(id) {
    return this._versions.get(id);
  }

  // Adds or updates a version document and invokes registered callbacks for the
  // added/updated document. If a document with the given ID already exists, its
  // fields are merged with `fields`.
  set(id, fields) {
    let version = this._versions.get(id);
    let isNew = false;
    if (version) {
      Object.assign(version, fields);
    } else {
      version = _objectSpread({
        _id: id
      }, fields);
      isNew = true;
      this._versions.set(id, version);
    }
    this._watchCallbacks.forEach(_ref2 => {
      let {
        fn,
        filter
      } = _ref2;
      if (!filter || filter === version._id) {
        fn(version, isNew);
      }
    });
  }

  // Registers a callback that will be invoked when a version document is added
  // or changed. Calling the function returned by `watch` removes the callback.
  // If `skipInitial` is true, the callback isn't be invoked for existing
  // documents. If `filter` is set, the callback is only invoked for documents
  // with ID `filter`.
  watch(fn) {
    let {
      skipInitial,
      filter
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!skipInitial) {
      const resolved = Promise.resolve();
      this._versions.forEach(version => {
        if (!filter || filter === version._id) {
          resolved.then(() => fn(version, true));
        }
      });
    }
    const callback = {
      fn,
      filter
    };
    this._watchCallbacks.add(callback);
    return () => this._watchCallbacks.delete(callback);
  }

  // A reactive data source for `Autoupdate.newClientAvailable`.
  newClientAvailable(id, fields, currentVersion) {
    function isNewVersion(version) {
      return version._id === id && fields.some(field => version[field] !== currentVersion[field]);
    }
    const dependency = new Tracker.Dependency();
    const version = this.get(id);
    dependency.depend();
    const stop = this.watch(version => {
      if (isNewVersion(version)) {
        dependency.changed();
        stop();
      }
    }, {
      skipInitial: true
    });
    return !!version && isNewVersion(version);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/autoupdate/autoupdate_server.js");

/* Exports */
Package._define("autoupdate", exports, {
  Autoupdate: Autoupdate
});

})();

//# sourceURL=meteor://💻app/packages/autoupdate.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYXV0b3VwZGF0ZS9hdXRvdXBkYXRlX3NlcnZlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYXV0b3VwZGF0ZS9jbGllbnRfdmVyc2lvbnMuanMiXSwibmFtZXMiOlsiX29iamVjdFNwcmVhZCIsIm1vZHVsZTEiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJleHBvcnQiLCJBdXRvdXBkYXRlIiwiQ2xpZW50VmVyc2lvbnMiLCJvbk1lc3NhZ2UiLCJGdXR1cmUiLCJOcG0iLCJyZXF1aXJlIiwiX19tZXRlb3JfcnVudGltZV9jb25maWdfXyIsImF1dG91cGRhdGUiLCJ2ZXJzaW9ucyIsImNsaWVudFZlcnNpb25zIiwiYXV0b3VwZGF0ZVZlcnNpb24iLCJhdXRvdXBkYXRlVmVyc2lvblJlZnJlc2hhYmxlIiwiYXV0b3VwZGF0ZVZlcnNpb25Db3Jkb3ZhIiwiYXBwSWQiLCJwcm9jZXNzIiwiZW52IiwiQVBQX0lEIiwic3luY1F1ZXVlIiwiTWV0ZW9yIiwiX1N5bmNocm9ub3VzUXVldWUiLCJ1cGRhdGVWZXJzaW9ucyIsInNob3VsZFJlbG9hZENsaWVudFByb2dyYW0iLCJXZWJBcHBJbnRlcm5hbHMiLCJyZWxvYWRDbGllbnRQcm9ncmFtcyIsIkFVVE9VUERBVEVfVkVSU0lPTiIsImNsaWVudEFyY2hzIiwiT2JqZWN0Iiwia2V5cyIsIldlYkFwcCIsImNsaWVudFByb2dyYW1zIiwiZm9yRWFjaCIsImFyY2giLCJ2ZXJzaW9uIiwiY2FsY3VsYXRlQ2xpZW50SGFzaCIsInZlcnNpb25SZWZyZXNoYWJsZSIsImNhbGN1bGF0ZUNsaWVudEhhc2hSZWZyZXNoYWJsZSIsInZlcnNpb25Ob25SZWZyZXNoYWJsZSIsImNhbGN1bGF0ZUNsaWVudEhhc2hOb25SZWZyZXNoYWJsZSIsInZlcnNpb25SZXBsYWNlYWJsZSIsImNhbGN1bGF0ZUNsaWVudEhhc2hSZXBsYWNlYWJsZSIsInZlcnNpb25IbXIiLCJobXJWZXJzaW9uIiwiZ2VuZXJhdGVCb2lsZXJwbGF0ZSIsIm9uTGlzdGVuaW5nIiwicGF5bG9hZCIsImFzc2V0cyIsImdldFJlZnJlc2hhYmxlQXNzZXRzIiwic2V0IiwicHVibGlzaCIsImNoZWNrIiwiTWF0Y2giLCJPbmVPZiIsIlN0cmluZyIsInVuZGVmaW5lZCIsInJhbmRvbUludGVydmFsIiwiaXNQcm9kdWN0aW9uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic3RvcCIsIndhdGNoIiwiaXNOZXciLCJzZXRUaW1lb3V0IiwiYWRkZWQiLCJjaGFuZ2VkIiwiY2FsbCIsIl9pZCIsIm9uU3RvcCIsInJlYWR5IiwiaXNfYXV0byIsInN0YXJ0dXAiLCJmdXQiLCJxdWV1ZVRhc2siLCJ3YWl0IiwicmV0dXJuIiwiZW5xdWV1ZVZlcnNpb25zUmVmcmVzaCIsIm9uIiwiYmluZEVudmlyb25tZW50IiwibW9kdWxlIiwiVHJhY2tlciIsImNvbnN0cnVjdG9yIiwiX3ZlcnNpb25zIiwiTWFwIiwiX3dhdGNoQ2FsbGJhY2tzIiwiU2V0IiwiY3JlYXRlU3RvcmUiLCJ1cGRhdGUiLCJpZCIsIm1zZyIsImZpZWxkcyIsImhhc1ZlcnNpb25zIiwic2l6ZSIsImdldCIsImFzc2lnbiIsImZuIiwiZmlsdGVyIiwic2tpcEluaXRpYWwiLCJyZXNvbHZlZCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImNhbGxiYWNrIiwiYWRkIiwiZGVsZXRlIiwibmV3Q2xpZW50QXZhaWxhYmxlIiwiY3VycmVudFZlcnNpb24iLCJpc05ld1ZlcnNpb24iLCJzb21lIiwiZmllbGQiLCJkZXBlbmRlbmN5IiwiRGVwZW5kZW5jeSIsImRlcGVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFJQSxhQUFhO0VBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLHNDQUFzQyxFQUFDO0lBQUNDLE9BQU8sQ0FBQ0MsQ0FBQyxFQUFDO01BQUNKLGFBQWEsR0FBQ0ksQ0FBQztJQUFBO0VBQUMsQ0FBQyxFQUFDLENB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Q1osZUFBZSxDQUFDbUIsR0FBRyxDQUFDRCxRQUFRLENBQUM7SUFFbEMsT0FBTyxNQUFNLElBQUksQ0FBQ2xCLGVBQWUsQ0FBQ29CLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDO0VBQ25EOztFQUVBO0VBQ0FHLGtCQUFrQixDQUFDakIsRUFBRSxFQUFFRSxNQUFNLEVBQUVnQixjQUFjLEVBQUU7SUFDOUMsU0FBU0MsWUFBWSxDQUFDMUUsT0FBTyxFQUFFO01BQzlCLE9BQ0NBLE9BQU8sQ0FBQ2tDLEdBQUcsS0FBS3FCLEVBQUUsSUFDbEJFLE1BQU0sQ0FBQ2tCLElBQUksQ0FBRUMsS0FBSyxJQUFLNUUsT0FBTyxDQUFDNEUsS0FBSyxDQUFDLEtBQUtILGNBQWMsQ0FBQ0csS0FBSyxDQUFDLENBQUM7SUFFbEU7SUFFQSxNQUFNQyxVQUFVLEdBQUcsSUFBSTlCLE9BQU8sQ0FBQytCLFVBQVUsRUFBRTtJQUMzQyxNQUFNOUUsT0FBTyxHQUFHLElBQUksQ0FBQzRELEdBQUcsQ0FBQ0wsRUFBRSxDQUFDO0lBRTVCc0IsVUFBVSxDQUFDRSxNQUFNLEVBQUU7SUFFbkIsTUFBTXBELElBQUksR0FBRyxJQUFJLENBQUNDLEtBQUssQ0FDckI1QixPQUFPLElBQUs7TUFDWixJQUFJMEUsWUFBWSxDQUFDMUUsT0FBTyxDQUFDLEVBQUU7UUFDMUI2RSxVQUFVLENBQUM3QyxPQUFPLEVBQUU7UUFDcEJMLElBQUksRUFBRTtNQUNQO0lBQ0QsQ0FBQyxFQUNEO01BQUVxQyxXQUFXLEVBQUU7SUFBSyxDQUFDLENBQ3JCO0lBRUQsT0FBTyxDQUFDLENBQUVoRSxPQUFPLElBQUkwRSxZQUFZLENBQUMxRSxPQUFPLENBQUM7RUFDM0M7QUFDRCxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9hdXRvdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUHVibGlzaCB0aGUgY3VycmVudCBjbGllbnQgdmVyc2lvbnMgZm9yIGVhY2ggY2xpZW50IGFyY2hpdGVjdHVyZVxuLy8gKHdlYi5icm93c2VyLCB3ZWIuYnJvd3Nlci5sZWdhY3ksIHdlYi5jb3Jkb3ZhKS4gV2hlbiBhIGNsaWVudCBvYnNlcnZlc1xuLy8gYSBjaGFuZ2UgaW4gdGhlIHZlcnNpb25zIGFzc29jaWF0ZWQgd2l0aCBpdHMgY2xpZW50IGFyY2hpdGVjdHVyZSxcbi8vIGl0IHdpbGwgcmVmcmVzaCBpdHNlbGYsIGVpdGhlciBieSBzd2FwcGluZyBvdXQgQ1NTIGFzc2V0cyBvciBieVxuLy8gcmVsb2FkaW5nIHRoZSBwYWdlLiBDaGFuZ2VzIHRvIHRoZSByZXBsYWNlYWJsZSB2ZXJzaW9uIGFyZSBpZ25vcmVkXG4vLyBhbmQgaGFuZGxlZCBieSB0aGUgaG90LW1vZHVsZS1yZXBsYWNlbWVudCBwYWNrYWdlLlxuLy9cbi8vIFRoZXJlIGFyZSBmb3VyIHZlcnNpb25zIGZvciBhbnkgZ2l2ZW4gY2xpZW50IGFyY2hpdGVjdHVyZTogYHZlcnNpb25gLFxuLy8gYHZlcnNpb25SZWZyZXNoYWJsZWAsIGB2ZXJzaW9uTm9uUmVmcmVzaGFibGVgLCBhbmRcbi8vIGB2ZXJzaW9uUmVwbGFjZWFibGVgLiBUaGUgcmVmcmVzaGFibGUgdmVyc2lvbiBpcyBhIGhhc2ggb2YganVzdCB0aGVcbi8vIGNsaWVudCByZXNvdXJjZXMgdGhhdCBhcmUgcmVmcmVzaGFibGUsIHN1Y2ggYXMgQ1NTLiBUaGUgcmVwbGFjZWFibGVcbi8vIHZlcnNpb24gaXMgYSBoYXNoIG9mIGZpbGVzIHRoYXQgY2FuIGJlIHVwZGF0ZWQgd2l0aCBITVIuIFRoZVxuLy8gbm9uLXJlZnJlc2hhYmxlIHZlcnNpb24gaXMgYSBoYXNoIG9mIHRoZSByZXN0IG9mIHRoZSBjbGllbnQgYXNzZXRzLFxuLy8gZXhjbHVkaW5nIHRoZSByZWZyZXNoYWJsZSBvbmVzOiBIVE1MLCBKUyB0aGF0IGlzIG5vdCByZXBsYWNlYWJsZSwgYW5kXG4vLyBzdGF0aWMgZmlsZXMgaW4gdGhlIGBwdWJsaWNgIGRpcmVjdG9yeS4gVGhlIGB2ZXJzaW9uYCB2ZXJzaW9uIGlzIGFcbi8vIGNvbWJpbmVkIGhhc2ggb2YgZXZlcnl0aGluZy5cbi8vXG4vLyBJZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgYEFVVE9VUERBVEVfVkVSU0lPTmAgaXMgc2V0LCBpdCB3aWxsIGJlXG4vLyB1c2VkIGluIHBsYWNlIG9mIGFsbCBjbGllbnQgdmVyc2lvbnMuIFlvdSBjYW4gdXNlIHRoaXMgdmFyaWFibGUgdG9cbi8vIGNvbnRyb2wgd2hlbiB0aGUgY2xpZW50IHJlbG9hZHMuIEZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCB0byBmb3JjZSBhXG4vLyByZWxvYWQgb25seSBhZnRlciBtYWpvciBjaGFuZ2VzLCB1c2UgYSBjdXN0b20gQVVUT1VQREFURV9WRVJTSU9OIGFuZFxuLy8gY2hhbmdlIGl0IG9ubHkgd2hlbiBzb21ldGhpbmcgd29ydGggcHVzaGluZyB0byBjbGllbnRzIGhhcHBlbnMuXG4vL1xuLy8gVGhlIHNlcnZlciBwdWJsaXNoZXMgYSBgbWV0ZW9yX2F1dG91cGRhdGVfY2xpZW50VmVyc2lvbnNgIGNvbGxlY3Rpb24uXG4vLyBUaGUgSUQgb2YgZWFjaCBkb2N1bWVudCBpcyB0aGUgY2xpZW50IGFyY2hpdGVjdHVyZSwgYW5kIHRoZSBmaWVsZHMgb2Zcbi8vIHRoZSBkb2N1bWVudCBhcmUgdGhlIHZlcnNpb25zIGRlc2NyaWJlZCBhYm92ZS5cblxuaW1wb3J0IHsgQ2xpZW50VmVyc2lvbnMgfSBmcm9tIFwiLi9jbGllbnRfdmVyc2lvbnMuanNcIjtcbnZhciBGdXR1cmUgPSBOcG0ucmVxdWlyZShcImZpYmVycy9mdXR1cmVcIik7XG5cbmV4cG9ydCBjb25zdCBBdXRvdXBkYXRlID0gX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5hdXRvdXBkYXRlID0ge1xuXHQvLyBNYXAgZnJvbSBjbGllbnQgYXJjaGl0ZWN0dXJlcyAod2ViLmJyb3dzZXIsIHdlYi5icm93c2VyLmxlZ2FjeSxcblx0Ly8gd2ViLmNvcmRvdmEpIHRvIHZlcnNpb24gZmllbGRzIHsgdmVyc2lvbiwgdmVyc2lvblJlZnJlc2hhYmxlLFxuXHQvLyB2ZXJzaW9uTm9uUmVmcmVzaGFibGUsIHJlZnJlc2hhYmxlIH0gdGhhdCB3aWxsIGJlIHN0b3JlZCBpblxuXHQvLyBDbGllbnRWZXJzaW9ucyBkb2N1bWVudHMgKHdob3NlIElEcyBhcmUgY2xpZW50IGFyY2hpdGVjdHVyZXMpLiBUaGlzXG5cdC8vIGRhdGEgZ2V0cyBzZXJpYWxpemVkIGludG8gdGhlIGJvaWxlcnBsYXRlIGJlY2F1c2UgaXQncyBzdG9yZWQgaW5cblx0Ly8gX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5hdXRvdXBkYXRlLnZlcnNpb25zLlxuXHR2ZXJzaW9uczoge31cbn07XG5cbi8vIFN0b3JlcyBhY2NlcHRhYmxlIGNsaWVudCB2ZXJzaW9ucy5cbmNvbnN0IGNsaWVudFZlcnNpb25zID0gbmV3IENsaWVudFZlcnNpb25zKCk7XG5cbi8vIFRoZSBjbGllbnQgaGFzaCBpbmNsdWRlcyBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLCBzbyB3YWl0IHVudGlsXG4vLyBhbGwgcGFja2FnZXMgaGF2ZSBsb2FkZWQgYW5kIGhhdmUgaGFkIGEgY2hhbmNlIHRvIHBvcHVsYXRlIHRoZVxuLy8gcnVudGltZSBjb25maWcgYmVmb3JlIHVzaW5nIHRoZSBjbGllbnQgaGFzaCBhcyBvdXIgZGVmYXVsdCBhdXRvXG4vLyB1cGRhdGUgdmVyc2lvbiBpZC5cblxuLy8gTm90ZTogVGVzdHMgYWxsb3cgcGVvcGxlIHRvIG92ZXJyaWRlIEF1dG91cGRhdGUuYXV0b3VwZGF0ZVZlcnNpb24gYmVmb3JlXG4vLyBzdGFydHVwLlxuQXV0b3VwZGF0ZS5hdXRvdXBkYXRlVmVyc2lvbiA9IG51bGw7XG5BdXRvdXBkYXRlLmF1dG91cGRhdGVWZXJzaW9uUmVmcmVzaGFibGUgPSBudWxsO1xuQXV0b3VwZGF0ZS5hdXRvdXBkYXRlVmVyc2lvbkNvcmRvdmEgPSBudWxsO1xuQXV0b3VwZGF0ZS5hcHBJZCA9IF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uYXBwSWQgPSBwcm9jZXNzLmVudi5BUFBfSUQ7XG5cbnZhciBzeW5jUXVldWUgPSBuZXcgTWV0ZW9yLl9TeW5jaHJvbm91c1F1ZXVlKCk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVZlcnNpb25zKHNob3VsZFJlbG9hZENsaWVudFByb2dyYW0pIHtcblx0Ly8gU3RlcCAxOiBsb2FkIHRoZSBjdXJyZW50IGNsaWVudCBwcm9ncmFtIG9uIHRoZSBzZXJ2ZXJcblx0aWYgKHNob3VsZFJlbG9hZENsaWVudFByb2dyYW0pIHtcblx0XHRXZWJBcHBJbnRlcm5hbHMucmVsb2FkQ2xpZW50UHJvZ3JhbXMoKTtcblx0fVxuXG5cdGNvbnN0IHtcblx0XHQvLyBJZiB0aGUgQVVUT1VQREFURV9WRVJTSU9OIGVudmlyb25tZW50IHZhcmlhYmxlIGlzIGRlZmluZWQsIGl0IHRha2VzXG5cdFx0Ly8gcHJlY2VkZW5jZSwgYnV0IEF1dG91cGRhdGUuYXV0b3VwZGF0ZVZlcnNpb24gaXMgc3RpbGwgc3VwcG9ydGVkIGFzXG5cdFx0Ly8gYSBmYWxsYmFjay4gSW4gbW9zdCBjYXNlcyBuZWl0aGVyIG9mIHRoZXNlIHZhbHVlcyB3aWxsIGJlIGRlZmluZWQuXG5cdFx0QVVUT1VQREFURV9WRVJTSU9OID0gQXV0b3VwZGF0ZS5hdXRvdXBkYXRlVmVyc2lvblxuXHR9ID0gcHJvY2Vzcy5lbnY7XG5cblx0Ly8gU3RlcCAyOiB1cGRhdGUgX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5hdXRvdXBkYXRlLnZlcnNpb25zLlxuXHRjb25zdCBjbGllbnRBcmNocyA9IE9iamVjdC5rZXlzKFdlYkFwcC5jbGllbnRQcm9ncmFtcyk7XG5cdGNsaWVudEFyY2hzLmZvckVhY2goYXJjaCA9PiB7XG5cdFx0QXV0b3VwZGF0ZS52ZXJzaW9uc1thcmNoXSA9IHtcblx0XHRcdHZlcnNpb246IEFVVE9VUERBVEVfVkVSU0lPTiB8fFxuXHRcdFx0XHRXZWJBcHAuY2FsY3VsYXRlQ2xpZW50SGFzaChhcmNoKSxcblx0XHRcdHZlcnNpb25SZWZyZXNoYWJsZTogQVVUT1VQREFURV9WRVJTSU9OIHx8XG5cdFx0XHRcdFdlYkFwcC5jYWxjdWxhdGVDbGllbnRIYXNoUmVmcmVzaGFibGUoYXJjaCksXG5cdFx0XHR2ZXJzaW9uTm9uUmVmcmVzaGFibGU6IEFVVE9VUERBVEVfVkVSU0lPTiB8fFxuXHRcdFx0XHRXZWJBcHAuY2FsY3VsYXRlQ2xpZW50SGFzaE5vblJlZnJlc2hhYmxlKGFyY2gpLFxuXHRcdFx0dmVyc2lvblJlcGxhY2VhYmxlOiBBVVRPVVBEQVRFX1ZFUlNJT04gfHxcblx0XHRcdFx0V2ViQXBwLmNhbGN1bGF0ZUNsaWVudEhhc2hSZXBsYWNlYWJsZShhcmNoKSxcblx0XHRcdHZlcnNpb25IbXI6IFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXS5obXJWZXJzaW9uXG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gU3RlcCAzOiBmb3JtIHRoZSBuZXcgY2xpZW50IGJvaWxlcnBsYXRlIHdoaWNoIGNvbnRhaW5zIHRoZSB1cGRhdGVkXG5cdC8vIGFzc2V0cyBhbmQgX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5cblx0aWYgKHNob3VsZFJlbG9hZENsaWVudFByb2dyYW0pIHtcblx0XHRXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVCb2lsZXJwbGF0ZSgpO1xuXHR9XG5cblx0Ly8gU3RlcCA0OiB1cGRhdGUgdGhlIENsaWVudFZlcnNpb25zIGNvbGxlY3Rpb24uXG5cdC8vIFdlIHVzZSBgb25MaXN0ZW5pbmdgIGhlcmUgYmVjYXVzZSB3ZSBuZWVkIHRvIHVzZVxuXHQvLyBgV2ViQXBwLmdldFJlZnJlc2hhYmxlQXNzZXRzYCwgd2hpY2ggaXMgb25seSBzZXQgYWZ0ZXJcblx0Ly8gYFdlYkFwcC5nZW5lcmF0ZUJvaWxlcnBsYXRlYCBpcyBjYWxsZWQgYnkgYG1haW5gIGluIHdlYmFwcC5cblx0V2ViQXBwLm9uTGlzdGVuaW5nKCgpID0+IHtcblx0XHRjbGllbnRBcmNocy5mb3JFYWNoKGFyY2ggPT4ge1xuXHRcdFx0Y29uc3QgcGF5bG9hZCA9IHtcblx0XHRcdFx0Li4uQXV0b3VwZGF0ZS52ZXJzaW9uc1thcmNoXSxcblx0XHRcdFx0YXNzZXRzOiBXZWJBcHAuZ2V0UmVmcmVzaGFibGVBc3NldHMoYXJjaCksXG5cdFx0XHR9O1xuXG5cdFx0XHRjbGllbnRWZXJzaW9ucy5zZXQoYXJjaCwgcGF5bG9hZCk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5NZXRlb3IucHVibGlzaChcblx0XCJtZXRlb3JfYXV0b3VwZGF0ZV9jbGllbnRWZXJzaW9uc1wiLFxuXHRmdW5jdGlvbiAoYXBwSWQpIHtcblx0XHQvLyBgbnVsbGAgaGFwcGVucyB3aGVuIGEgY2xpZW50IGRvZXNuJ3QgaGF2ZSBhbiBhcHBJZCBhbmQgcGFzc2VzXG5cdFx0Ly8gYHVuZGVmaW5lZGAgdG8gYE1ldGVvci5zdWJzY3JpYmVgLiBgdW5kZWZpbmVkYCBpcyB0cmFuc2xhdGVkIHRvXG5cdFx0Ly8gYG51bGxgIGFzIEpTT04gZG9lc24ndCBoYXZlIGB1bmRlZmluZWQuXG5cdFx0Y2hlY2soYXBwSWQsIE1hdGNoLk9uZU9mKFN0cmluZywgdW5kZWZpbmVkLCBudWxsKSk7XG5cblx0XHQvLyBEb24ndCBub3RpZnkgY2xpZW50cyB1c2luZyB3cm9uZyBhcHBJZCBzdWNoIGFzIG1vYmlsZSBhcHBzIGJ1aWx0IHdpdGggYVxuXHRcdC8vIGRpZmZlcmVudCBzZXJ2ZXIgYnV0IHBvaW50aW5nIGF0IHRoZSBzYW1lIGxvY2FsIHVybFxuXHRcdGlmIChBdXRvdXBkYXRlLmFwcElkICYmIGFwcElkICYmIEF1dG91cGRhdGUuYXBwSWQgIT09IGFwcElkKVxuXHRcdFx0cmV0dXJuIFtdO1xuXG5cdFx0Ly8gUmFuZG9tIHZhbHVlIHRvIGRlbGF5IHRoZSB1cGRhdGVzIGZvciAyLTEwIG1pbnV0ZXNcblx0XHRjb25zdCByYW5kb21JbnRlcnZhbCA9IE1ldGVvci5pc1Byb2R1Y3Rpb24gPyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCkgKyAyKSAqIDEwMDAgKiA2MCA6IDA7XG5cblx0XHRjb25zdCBzdG9wID0gY2xpZW50VmVyc2lvbnMud2F0Y2goKHZlcnNpb24sIGlzTmV3KSA9PiB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0KGlzTmV3ID8gdGhpcy5hZGRlZCA6IHRoaXMuY2hhbmdlZClcblx0XHRcdFx0LmNhbGwodGhpcywgXCJtZXRlb3JfYXV0b3VwZGF0ZV9jbGllbnRWZXJzaW9uc1wiLCB2ZXJzaW9uLl9pZCwgdmVyc2lvbilcblx0XHRcdH0sIHJhbmRvbUludGVydmFsKTtcblx0XHR9KTtcblxuXHRcdHRoaXMub25TdG9wKCgpID0+IHN0b3AoKSk7XG5cdFx0dGhpcy5yZWFkeSgpO1xuXHR9LFxuXHR7aXNfYXV0bzogdHJ1ZX1cbik7XG5cbk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uICgpIHtcblx0dXBkYXRlVmVyc2lvbnMoZmFsc2UpO1xuXG5cdC8vIEZvcmNlIGFueSBjb25uZWN0ZWQgY2xpZW50cyB0aGF0IGFyZSBzdGlsbCBsb29raW5nIGZvciB0aGVzZSBvbGRlclxuXHQvLyBkb2N1bWVudCBJRHMgdG8gcmVsb2FkLlxuXHRbXCJ2ZXJzaW9uXCIsXG5cdCBcInZlcnNpb24tcmVmcmVzaGFibGVcIixcblx0IFwidmVyc2lvbi1jb3Jkb3ZhXCIsXG5cdF0uZm9yRWFjaChfaWQgPT4ge1xuXHRcdGNsaWVudFZlcnNpb25zLnNldChfaWQsIHtcblx0XHRcdHZlcnNpb246IFwib3V0ZGF0ZWRcIlxuXHRcdH0pO1xuXHR9KTtcbn0pO1xuXG52YXIgZnV0ID0gbmV3IEZ1dHVyZSgpO1xuXG4vLyBXZSBvbmx5IHdhbnQgJ3JlZnJlc2gnIHRvIHRyaWdnZXIgJ3VwZGF0ZVZlcnNpb25zJyBBRlRFUiBvbkxpc3Rlbixcbi8vIHNvIHdlIGFkZCBhIHF1ZXVlZCB0YXNrIHRoYXQgd2FpdHMgZm9yIG9uTGlzdGVuIGJlZm9yZSAncmVmcmVzaCcgY2FuIHF1ZXVlXG4vLyB0YXNrcy4gTm90ZSB0aGF0IHRoZSBgb25MaXN0ZW5pbmdgIGNhbGxiYWNrcyBkbyBub3QgZmlyZSB1bnRpbCBhZnRlclxuLy8gTWV0ZW9yLnN0YXJ0dXAsIHNvIHRoZXJlIGlzIG5vIGNvbmNlcm4gdGhhdCB0aGUgJ3VwZGF0ZVZlcnNpb25zJyBjYWxscyBmcm9tXG4vLyAncmVmcmVzaCcgd2lsbCBvdmVybGFwIHdpdGggdGhlIGB1cGRhdGVWZXJzaW9uc2AgY2FsbCBmcm9tIE1ldGVvci5zdGFydHVwLlxuXG5zeW5jUXVldWUucXVldWVUYXNrKGZ1bmN0aW9uICgpIHtcblx0ZnV0LndhaXQoKTtcbn0pO1xuXG5XZWJBcHAub25MaXN0ZW5pbmcoZnVuY3Rpb24gKCkge1xuXHRmdXQucmV0dXJuKCk7XG59KTtcblxuZnVuY3Rpb24gZW5xdWV1ZVZlcnNpb25zUmVmcmVzaCgpIHtcblx0c3luY1F1ZXVlLnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG5cdFx0dXBkYXRlVmVyc2lvbnModHJ1ZSk7XG5cdH0pO1xufVxuXG4vLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIHBlcnRhaW5pbmcgdG8gdGhlIGNsaWVudC1yZWZyZXNoIHRvcGljLlxuaW1wb3J0IHsgb25NZXNzYWdlIH0gZnJvbSBcIm1ldGVvci9pbnRlci1wcm9jZXNzLW1lc3NhZ2luZ1wiO1xub25NZXNzYWdlKFwiY2xpZW50LXJlZnJlc2hcIiwgZW5xdWV1ZVZlcnNpb25zUmVmcmVzaCk7XG5cbi8vIEFub3RoZXIgd2F5IHRvIHRlbGwgdGhlIHByb2Nlc3MgdG8gcmVmcmVzaDogc2VuZCBTSUdIVVAgc2lnbmFsXG5wcm9jZXNzLm9uKCdTSUdIVVAnLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uICgpIHtcblx0ZW5xdWV1ZVZlcnNpb25zUmVmcmVzaCgpO1xufSwgXCJoYW5kbGluZyBTSUdIVVAgc2lnbmFsIGZvciByZWZyZXNoXCIpKTtcbiIsImltcG9ydCB7IFRyYWNrZXIgfSBmcm9tIFwibWV0ZW9yL3RyYWNrZXJcIjtcblxuZXhwb3J0IGNsYXNzIENsaWVudFZlcnNpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fdmVyc2lvbnMgPSBuZXcgTWFwKCk7XG5cdFx0dGhpcy5fd2F0Y2hDYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5cdH1cblxuXHQvLyBDcmVhdGVzIGEgTGl2ZWRhdGEgc3RvcmUgZm9yIHVzZSB3aXRoIGBNZXRlb3IuY29ubmVjdGlvbi5yZWdpc3RlclN0b3JlYC5cblx0Ly8gQWZ0ZXIgdGhlIHN0b3JlIGlzIHJlZ2lzdGVyZWQsIGRvY3VtZW50IHVwZGF0ZXMgcmVwb3J0ZWQgYnkgTGl2ZWRhdGEgYXJlXG5cdC8vIG1lcmdlZCB3aXRoIHRoZSBkb2N1bWVudHMgaW4gdGhpcyBgQ2xpZW50VmVyc2lvbnNgIGluc3RhbmNlLlxuXHRjcmVhdGVTdG9yZSgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dXBkYXRlOiAoeyBpZCwgbXNnLCBmaWVsZHMgfSkgPT4ge1xuXHRcdFx0XHRpZiAobXNnID09PSBcImFkZGVkXCIgfHwgbXNnID09PSBcImNoYW5nZWRcIikge1xuXHRcdFx0XHRcdHRoaXMuc2V0KGlkLCBmaWVsZHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdGhhc1ZlcnNpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLl92ZXJzaW9ucy5zaXplID4gMDtcblx0fVxuXG5cdGdldChpZCkge1xuXHRcdHJldHVybiB0aGlzLl92ZXJzaW9ucy5nZXQoaWQpO1xuXHR9XG5cblx0Ly8gQWRkcyBvciB1cGRhdGVzIGEgdmVyc2lvbiBkb2N1bWVudCBhbmQgaW52b2tlcyByZWdpc3RlcmVkIGNhbGxiYWNrcyBmb3IgdGhlXG5cdC8vIGFkZGVkL3VwZGF0ZWQgZG9jdW1lbnQuIElmIGEgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gSUQgYWxyZWFkeSBleGlzdHMsIGl0c1xuXHQvLyBmaWVsZHMgYXJlIG1lcmdlZCB3aXRoIGBmaWVsZHNgLlxuXHRzZXQoaWQsIGZpZWxkcykge1xuXHRcdGxldCB2ZXJzaW9uID0gdGhpcy5fdmVyc2lvbnMuZ2V0KGlkKTtcblx0XHRsZXQgaXNOZXcgPSBmYWxzZTtcblxuXHRcdGlmICh2ZXJzaW9uKSB7XG5cdFx0XHRPYmplY3QuYXNzaWduKHZlcnNpb24sIGZpZWxkcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZlcnNpb24gPSB7XG5cdFx0XHRcdF9pZDogaWQsXG5cdFx0XHRcdC4uLmZpZWxkc1xuXHRcdFx0fTtcblxuXHRcdFx0aXNOZXcgPSB0cnVlO1xuXHRcdFx0dGhpcy5fdmVyc2lvbnMuc2V0KGlkLCB2ZXJzaW9uKTtcblx0XHR9XG5cblx0XHR0aGlzLl93YXRjaENhbGxiYWNrcy5mb3JFYWNoKCh7IGZuLCBmaWx0ZXIgfSkgPT4ge1xuXHRcdFx0aWYgKCEgZmlsdGVyIHx8IGZpbHRlciA9PT0gdmVyc2lvbi5faWQpIHtcblx0XHRcdFx0Zm4odmVyc2lvbiwgaXNOZXcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly8gUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiBhIHZlcnNpb24gZG9jdW1lbnQgaXMgYWRkZWRcblx0Ly8gb3IgY2hhbmdlZC4gQ2FsbGluZyB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgYHdhdGNoYCByZW1vdmVzIHRoZSBjYWxsYmFjay5cblx0Ly8gSWYgYHNraXBJbml0aWFsYCBpcyB0cnVlLCB0aGUgY2FsbGJhY2sgaXNuJ3QgYmUgaW52b2tlZCBmb3IgZXhpc3Rpbmdcblx0Ly8gZG9jdW1lbnRzLiBJZiBgZmlsdGVyYCBpcyBzZXQsIHRoZSBjYWxsYmFjayBpcyBvbmx5IGludm9rZWQgZm9yIGRvY3VtZW50c1xuXHQvLyB3aXRoIElEIGBmaWx0ZXJgLlxuXHR3YXRjaChmbiwgeyBza2lwSW5pdGlhbCwgZmlsdGVyIH0gPSB7fSkge1xuXHRcdGlmICghIHNraXBJbml0aWFsKSB7XG5cdFx0XHRjb25zdCByZXNvbHZlZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG5cdFx0XHR0aGlzLl92ZXJzaW9ucy5mb3JFYWNoKCh2ZXJzaW9uKSA9PiB7XG5cdFx0XHRcdGlmICghIGZpbHRlciB8fCBmaWx0ZXIgPT09IHZlcnNpb24uX2lkKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZWQudGhlbigoKSA9PiBmbih2ZXJzaW9uLCB0cnVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNhbGxiYWNrID0geyBmbiwgZmlsdGVyIH07XG5cdFx0dGhpcy5fd2F0Y2hDYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcblxuXHRcdHJldHVybiAoKSA9PiB0aGlzLl93YXRjaENhbGxiYWNrcy5kZWxldGUoY2FsbGJhY2spO1xuXHR9XG5cblx0Ly8gQSByZWFjdGl2ZSBkYXRhIHNvdXJjZSBmb3IgYEF1dG91cGRhdGUubmV3Q2xpZW50QXZhaWxhYmxlYC5cblx0bmV3Q2xpZW50QXZhaWxhYmxlKGlkLCBmaWVsZHMsIGN1cnJlbnRWZXJzaW9uKSB7XG5cdFx0ZnVuY3Rpb24gaXNOZXdWZXJzaW9uKHZlcnNpb24pIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdHZlcnNpb24uX2lkID09PSBpZCAmJlxuXHRcdFx0XHRmaWVsZHMuc29tZSgoZmllbGQpID0+IHZlcnNpb25bZmllbGRdICE9PSBjdXJyZW50VmVyc2lvbltmaWVsZF0pXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlcGVuZGVuY3kgPSBuZXcgVHJhY2tlci5EZXBlbmRlbmN5KCk7XG5cdFx0Y29uc3QgdmVyc2lvbiA9IHRoaXMuZ2V0KGlkKTtcblxuXHRcdGRlcGVuZGVuY3kuZGVwZW5kKCk7XG5cblx0XHRjb25zdCBzdG9wID0gdGhpcy53YXRjaChcblx0XHRcdCh2ZXJzaW9uKSA9PiB7XG5cdFx0XHRcdGlmIChpc05ld1ZlcnNpb24odmVyc2lvbikpIHtcblx0XHRcdFx0XHRkZXBlbmRlbmN5LmNoYW5nZWQoKTtcblx0XHRcdFx0XHRzdG9wKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR7IHNraXBJbml0aWFsOiB0cnVlIH1cblx0XHQpO1xuXG5cdFx0cmV0dXJuICEhIHZlcnNpb24gJiYgaXNOZXdWZXJzaW9uKHZlcnNpb24pO1xuXHR9XG59XG4iXX0=
