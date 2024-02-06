(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Facts;

var require = meteorInstall({"node_modules":{"meteor":{"facts-base":{"facts_base_server.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/facts-base/facts_base_server.js                                             //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
module.export({
  Facts: () => Facts,
  FACTS_COLLECTION: () => FACTS_COLLECTION,
  FACTS_PUBLICATION: () => FACTS_PUBLICATION
});
let Facts, FACTS_COLLECTION, FACTS_PUBLICATION;
module.link("./facts_base_common", {
  Facts(v) {
    Facts = v;
  },
  FACTS_COLLECTION(v) {
    FACTS_COLLECTION = v;
  },
  FACTS_PUBLICATION(v) {
    FACTS_PUBLICATION = v;
  }
}, 0);
const hasOwn = Object.prototype.hasOwnProperty;

// This file is only used server-side, so no need to check Meteor.isServer.

// By default, we publish facts to no user if autopublish is off, and to all
// users if autopublish is on.
let userIdFilter = function (userId) {
  return !!Package.autopublish;
};

// XXX make this take effect at runtime too?
Facts.setUserIdFilter = function (filter) {
  userIdFilter = filter;
};

// XXX Use a minimongo collection instead and hook up an observeChanges
// directly to a publish.
const factsByPackage = {};
let activeSubscriptions = [];

// Make factsByPackage data available to the server environment
Facts._factsByPackage = factsByPackage;
Facts.incrementServerFact = function (pkg, fact, increment) {
  if (!hasOwn.call(factsByPackage, pkg)) {
    factsByPackage[pkg] = {};
    factsByPackage[pkg][fact] = increment;
    activeSubscriptions.forEach(function (sub) {
      sub.added(FACTS_COLLECTION, pkg, factsByPackage[pkg]);
    });
    return;
  }
  const packageFacts = factsByPackage[pkg];
  if (!hasOwn.call(packageFacts, fact)) {
    factsByPackage[pkg][fact] = 0;
  }
  factsByPackage[pkg][fact] += increment;
  const changedField = {};
  changedField[fact] = factsByPackage[pkg][fact];
  activeSubscriptions.forEach(function (sub) {
    sub.changed(FACTS_COLLECTION, pkg, changedField);
  });
};

// Deferred, because we have an unordered dependency on livedata.
// XXX is this safe? could somebody try to connect before Meteor.publish is
// called?
Meteor.defer(function () {
  // XXX Also publish facts-by-package.
  Meteor.publish(FACTS_PUBLICATION, function () {
    const sub = this;
    if (!userIdFilter(this.userId)) {
      sub.ready();
      return;
    }
    activeSubscriptions.push(sub);
    Object.keys(factsByPackage).forEach(function (pkg) {
      sub.added(FACTS_COLLECTION, pkg, factsByPackage[pkg]);
    });
    sub.onStop(function () {
      activeSubscriptions = activeSubscriptions.filter(activeSub => activeSub !== sub);
    });
    sub.ready();
  }, {
    is_auto: true
  });
});
//////////////////////////////////////////////////////////////////////////////////////////

},"facts_base_common.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/facts-base/facts_base_common.js                                             //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
module.export({
  Facts: () => Facts,
  FACTS_COLLECTION: () => FACTS_COLLECTION,
  FACTS_PUBLICATION: () => FACTS_PUBLICATION
});
const Facts = {};
const FACTS_COLLECTION = 'meteor_Facts_server';
const FACTS_PUBLICATION = 'meteor_facts';
//////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/facts-base/facts_base_server.js");

/* Exports */
Package._define("facts-base", exports, {
  Facts: Facts
});

})();

//# sourceURL=meteor://💻app/packages/facts-base.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZmFjdHMtYmFzZS9mYWN0c19iYXNlX3NlcnZlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvZmFjdHMtYmFzZS9mYWN0c19iYXNlX2NvbW1vbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJGYWN0cyIsIkZBQ1RTX0NPTExFQ1RJT04iLCJGQUNUU19QVUJMSUNBVElPTiIsImxpbmsiLCJ2IiwiaGFzT3duIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJ1c2VySWRGaWx0ZXIiLCJ1c2VySWQiLCJQYWNrYWdlIiwiYXV0b3B1Ymxpc2giLCJzZXRVc2VySWRGaWx0ZXIiLCJmaWx0ZXIiLCJmYWN0c0J5UGFja2FnZSIsImFjdGl2ZVN1YnNjcmlwdGlvbnMiLCJfZmFjdHNCeVBhY2thZ2UiLCJpbmNyZW1lbnRTZXJ2ZXJGYWN0IiwicGtnIiwiZmFjdCIsImluY3JlbWVudCIsImNhbGwiLCJmb3JFYWNoIiwic3ViIiwiYWRkZWQiLCJwYWNrYWdlRmFjdHMiLCJjaGFuZ2VkRmllbGQiLCJjaGFuZ2VkIiwiTWV0ZW9yIiwiZGVmZXIiLCJwdWJsaXNoIiwicmVhZHkiLCJwdXNoIiwia2V5cyIsIm9uU3RvcCIsImFjdGl2ZVN1YiIsImlzX2F1dG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQU0sQ0FBQztFQUFDQyxLQUFLLEVBQUMsTUFBSUEsS0FBSztFQUFDQyxnQkFBZ0IsRUFBQyxNQUFJQSxnQkFBZ0I7RUFBQ0MsaUJBQWlCLEVBQUMsTUFBSUE7QUFBaUIsQ0FBQyxDQUFDO0FBQUMsSUFBSUYsS0FBSyxFQUFDQyxnQkFBZ0IsRUFBQ0MsaUJBQWlCO0FBQUNKLE1BQU0sQ0FBQ0ssSUFBSSxDQUFDLHFCQUFxQixFQUFDO0VBQUNILEtBQUssQ0FBQ0ksQ0FBQyxFQUFDO0lBQUNKLEtBQUssR0FBQ0ksQ0FBQztFQUFB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LE1BQU0sQ0FBQyxZQUFZO01BQ3JCbkIsbUJBQW1CLEdBQ2pCQSxtQkFBbUIsQ0FBQ0YsTUFBTSxDQUFDc0IsU0FBUyxJQUFJQSxTQUFTLEtBQUtaLEdBQUcsQ0FBQztJQUM5RCxDQUFDLENBQUM7SUFDRkEsR0FBRyxDQUFDUSxLQUFLLEVBQUU7RUFDYixDQUFDLEVBQUU7SUFBQ0ssT0FBTyxFQUFFO0VBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7OztBQ3JFRnZDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQUNDLEtBQUssRUFBQyxNQUFJQSxLQUFLO0VBQUNDLGdCQUFnQixFQUFDLE1BQUlBLGdCQUFnQjtFQUFDQyxpQkFBaUIsRUFBQyxNQUFJQTtBQUFpQixDQUFDLENBQUM7QUFBOUcsTUFBTUYsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNoQixNQUFNQyxnQkFBZ0IsR0FBRyxxQkFBcUI7QUFDOUMsTUFBTUMsaUJBQWlCLEdBQUcsY0FBYyxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9mYWN0cy1iYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmFjdHMsIEZBQ1RTX0NPTExFQ1RJT04sIEZBQ1RTX1BVQkxJQ0FUSU9OIH0gZnJvbSAnLi9mYWN0c19iYXNlX2NvbW1vbic7XG5cbmNvbnN0IGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8vIFRoaXMgZmlsZSBpcyBvbmx5IHVzZWQgc2VydmVyLXNpZGUsIHNvIG5vIG5lZWQgdG8gY2hlY2sgTWV0ZW9yLmlzU2VydmVyLlxuXG4vLyBCeSBkZWZhdWx0LCB3ZSBwdWJsaXNoIGZhY3RzIHRvIG5vIHVzZXIgaWYgYXV0b3B1Ymxpc2ggaXMgb2ZmLCBhbmQgdG8gYWxsXG4vLyB1c2VycyBpZiBhdXRvcHVibGlzaCBpcyBvbi5cbmxldCB1c2VySWRGaWx0ZXIgPSBmdW5jdGlvbiAodXNlcklkKSB7XG4gIHJldHVybiAhIVBhY2thZ2UuYXV0b3B1Ymxpc2g7XG59O1xuXG4vLyBYWFggbWFrZSB0aGlzIHRha2UgZWZmZWN0IGF0IHJ1bnRpbWUgdG9vP1xuRmFjdHMuc2V0VXNlcklkRmlsdGVyID0gZnVuY3Rpb24gKGZpbHRlcikge1xuICB1c2VySWRGaWx0ZXIgPSBmaWx0ZXI7XG59O1xuXG4vLyBYWFggVXNlIGEgbWluaW1vbmdvIGNvbGxlY3Rpb24gaW5zdGVhZCBhbmQgaG9vayB1cCBhbiBvYnNlcnZlQ2hhbmdlc1xuLy8gZGlyZWN0bHkgdG8gYSBwdWJsaXNoLlxuY29uc3QgZmFjdHNCeVBhY2thZ2UgPSB7fTtcbmxldCBhY3RpdmVTdWJzY3JpcHRpb25zID0gW107XG5cbi8vIE1ha2UgZmFjdHNCeVBhY2thZ2UgZGF0YSBhdmFpbGFibGUgdG8gdGhlIHNlcnZlciBlbnZpcm9ubWVudFxuRmFjdHMuX2ZhY3RzQnlQYWNrYWdlID0gZmFjdHNCeVBhY2thZ2U7XG5cbkZhY3RzLmluY3JlbWVudFNlcnZlckZhY3QgPSBmdW5jdGlvbiAocGtnLCBmYWN0LCBpbmNyZW1lbnQpIHtcbiAgaWYgKCFoYXNPd24uY2FsbChmYWN0c0J5UGFja2FnZSwgcGtnKSkge1xuICAgIGZhY3RzQnlQYWNrYWdlW3BrZ10gPSB7fTtcbiAgICBmYWN0c0J5UGFja2FnZVtwa2ddW2ZhY3RdID0gaW5jcmVtZW50O1xuICAgIGFjdGl2ZVN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICBzdWIuYWRkZWQoRkFDVFNfQ09MTEVDVElPTiwgcGtnLCBmYWN0c0J5UGFja2FnZVtwa2ddKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYWNrYWdlRmFjdHMgPSBmYWN0c0J5UGFja2FnZVtwa2ddO1xuICBpZiAoIWhhc093bi5jYWxsKHBhY2thZ2VGYWN0cywgZmFjdCkpIHtcbiAgICBmYWN0c0J5UGFja2FnZVtwa2ddW2ZhY3RdID0gMDtcbiAgfVxuICBmYWN0c0J5UGFja2FnZVtwa2ddW2ZhY3RdICs9IGluY3JlbWVudDtcbiAgY29uc3QgY2hhbmdlZEZpZWxkID0ge307XG4gIGNoYW5nZWRGaWVsZFtmYWN0XSA9IGZhY3RzQnlQYWNrYWdlW3BrZ11bZmFjdF07XG4gIGFjdGl2ZVN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgc3ViLmNoYW5nZWQoRkFDVFNfQ09MTEVDVElPTiwgcGtnLCBjaGFuZ2VkRmllbGQpO1xuICB9KTtcbn07XG5cbi8vIERlZmVycmVkLCBiZWNhdXNlIHdlIGhhdmUgYW4gdW5vcmRlcmVkIGRlcGVuZGVuY3kgb24gbGl2ZWRhdGEuXG4vLyBYWFggaXMgdGhpcyBzYWZlPyBjb3VsZCBzb21lYm9keSB0cnkgdG8gY29ubmVjdCBiZWZvcmUgTWV0ZW9yLnB1Ymxpc2ggaXNcbi8vIGNhbGxlZD9cbk1ldGVvci5kZWZlcihmdW5jdGlvbiAoKSB7XG4gIC8vIFhYWCBBbHNvIHB1Ymxpc2ggZmFjdHMtYnktcGFja2FnZS5cbiAgTWV0ZW9yLnB1Ymxpc2goRkFDVFNfUFVCTElDQVRJT04sIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzdWIgPSB0aGlzO1xuICAgIGlmICghdXNlcklkRmlsdGVyKHRoaXMudXNlcklkKSkge1xuICAgICAgc3ViLnJlYWR5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZlU3Vic2NyaXB0aW9ucy5wdXNoKHN1Yik7XG4gICAgT2JqZWN0LmtleXMoZmFjdHNCeVBhY2thZ2UpLmZvckVhY2goZnVuY3Rpb24gKHBrZykge1xuICAgICAgc3ViLmFkZGVkKEZBQ1RTX0NPTExFQ1RJT04sIHBrZywgZmFjdHNCeVBhY2thZ2VbcGtnXSk7XG4gICAgfSk7XG4gICAgc3ViLm9uU3RvcChmdW5jdGlvbiAoKSB7XG4gICAgICBhY3RpdmVTdWJzY3JpcHRpb25zID1cbiAgICAgICAgYWN0aXZlU3Vic2NyaXB0aW9ucy5maWx0ZXIoYWN0aXZlU3ViID0+IGFjdGl2ZVN1YiAhPT0gc3ViKTtcbiAgICB9KTtcbiAgICBzdWIucmVhZHkoKTtcbiAgfSwge2lzX2F1dG86IHRydWV9KTtcbn0pO1xuXG5leHBvcnQge1xuICBGYWN0cyxcbiAgRkFDVFNfQ09MTEVDVElPTixcbiAgRkFDVFNfUFVCTElDQVRJT04sXG59O1xuIiwiY29uc3QgRmFjdHMgPSB7fTtcbmNvbnN0IEZBQ1RTX0NPTExFQ1RJT04gPSAnbWV0ZW9yX0ZhY3RzX3NlcnZlcic7XG5jb25zdCBGQUNUU19QVUJMSUNBVElPTiA9ICdtZXRlb3JfZmFjdHMnO1xuXG5leHBvcnQge1xuICBGYWN0cyxcbiAgRkFDVFNfQ09MTEVDVElPTixcbiAgRkFDVFNfUFVCTElDQVRJT04sXG59O1xuIl19
