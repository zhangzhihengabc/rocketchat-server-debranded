(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var value, ReactiveDict;

var require = meteorInstall({"node_modules":{"meteor":{"reactive-dict":{"migration.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/reactive-dict/migration.js                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.export({
  ReactiveDict: () => ReactiveDict
});
let ReactiveDict;
module.link("./reactive-dict", {
  ReactiveDict(v) {
    ReactiveDict = v;
  }
}, 0);
const hasOwn = Object.prototype.hasOwnProperty;
ReactiveDict._migratedDictData = {}; // name -> data
ReactiveDict._dictsToMigrate = {}; // name -> ReactiveDict

ReactiveDict._loadMigratedDict = function (dictName) {
  if (hasOwn.call(ReactiveDict._migratedDictData, dictName)) {
    const data = ReactiveDict._migratedDictData[dictName];
    delete ReactiveDict._migratedDictData[dictName];
    return data;
  }
  return null;
};
ReactiveDict._registerDictForMigrate = function (dictName, dict) {
  if (hasOwn.call(ReactiveDict._dictsToMigrate, dictName)) throw new Error("Duplicate ReactiveDict name: " + dictName);
  ReactiveDict._dictsToMigrate[dictName] = dict;
};
if (Meteor.isClient && Package.reload) {
  // Put old migrated data into ReactiveDict._migratedDictData,
  // where it can be accessed by ReactiveDict._loadMigratedDict.
  var migrationData = Package.reload.Reload._migrationData('reactive-dict');
  if (migrationData && migrationData.dicts) ReactiveDict._migratedDictData = migrationData.dicts;

  // On migration, assemble the data from all the dicts that have been
  // registered.
  Package.reload.Reload._onMigrate('reactive-dict', function () {
    var dictsToMigrate = ReactiveDict._dictsToMigrate;
    var dataToMigrate = {};
    for (var dictName in dictsToMigrate) dataToMigrate[dictName] = dictsToMigrate[dictName]._getMigrationData();
    return [true, {
      dicts: dataToMigrate
    }];
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reactive-dict.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/reactive-dict/reactive-dict.js                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.export({
  ReactiveDict: () => ReactiveDict
});
const hasOwn = Object.prototype.hasOwnProperty;

// XXX come up with a serialization method which canonicalizes object key
// order, which would allow us to use objects as values for equals.
function stringify(value) {
  if (value === undefined) {
    return 'undefined';
  }
  return EJSON.stringify(value);
}
function parse(serialized) {
  if (serialized === undefined || serialized === 'undefined') {
    return undefined;
  }
  return EJSON.parse(serialized);
}
function changed(v) {
  v && v.changed();
}

// XXX COMPAT WITH 0.9.1 : accept migrationData instead of dictName
/**
 * @class
 * @instanceName ReactiveDict
 * @summary Constructor for a ReactiveDict, which represents a reactive dictionary of key/value pairs.
 * @locus Client
 * @param {String} [name] Optional.  When a name is passed, preserves contents across Hot Code Pushes
 * @param {Object} [initialValue] Optional.  The default values for the dictionary
 */
class ReactiveDict {
  constructor(dictName, dictData) {
    // this.keys: key -> value
    this.keys = {};
    if (dictName) {
      // name given; migration will be performed
      if (typeof dictName === 'string') {
        // the normal case, argument is a string name.

        // Only run migration logic on client, it will cause
        // duplicate name errors on server during reloads.
        // _registerDictForMigrate will throw an error on duplicate name.
        Meteor.isClient && ReactiveDict._registerDictForMigrate(dictName, this);
        const migratedData = Meteor.isClient && ReactiveDict._loadMigratedDict(dictName);
        if (migratedData) {
          // Don't stringify migrated data
          this.keys = migratedData;
        } else {
          // Use _setObject to make sure values are stringified
          this._setObject(dictData || {});
        }
        this.name = dictName;
      } else if (typeof dictName === 'object') {
        // back-compat case: dictName is actually migrationData
        // Use _setObject to make sure values are stringified
        this._setObject(dictName);
      } else {
        throw new Error("Invalid ReactiveDict argument: " + dictName);
      }
    } else if (typeof dictData === 'object') {
      this._setObject(dictData);
    }
    this.allDeps = new Tracker.Dependency();
    this.keyDeps = {}; // key -> Dependency
    this.keyValueDeps = {}; // key -> Dependency
  }

  // set() began as a key/value method, but we are now overloading it
  // to take an object of key/value pairs, similar to backbone
  // http://backbonejs.org/#Model-set
  /**
   * @summary Set a value for a key in the ReactiveDict. Notify any listeners
   * that the value has changed (eg: redraw templates, and rerun any
   * [`Tracker.autorun`](#tracker_autorun) computations, that called
   * [`ReactiveDict.get`](#ReactiveDict_get) on this `key`.)
   * @locus Client
   * @param {String} key The key to set, eg, `selectedItem`
   * @param {EJSONable | undefined} value The new value for `key`
   */
  set(keyOrObject, value) {
    if (typeof keyOrObject === 'object' && value === undefined) {
      // Called as `dict.set({...})`
      this._setObject(keyOrObject);
      return;
    }
    // the input isn't an object, so it must be a key
    // and we resume with the rest of the function
    const key = keyOrObject;
    value = stringify(value);
    const keyExisted = hasOwn.call(this.keys, key);
    const oldSerializedValue = keyExisted ? this.keys[key] : 'undefined';
    const isNewValue = value !== oldSerializedValue;
    this.keys[key] = value;
    if (isNewValue || !keyExisted) {
      // Using the changed utility function here because this.allDeps might not exist yet,
      // when setting initial data from constructor
      changed(this.allDeps);
    }

    // Don't trigger changes when setting initial data from constructor,
    // this.KeyDeps is undefined in this case
    if (isNewValue && this.keyDeps) {
      changed(this.keyDeps[key]);
      if (this.keyValueDeps[key]) {
        changed(this.keyValueDeps[key][oldSerializedValue]);
        changed(this.keyValueDeps[key][value]);
      }
    }
  }

  /**
   * @summary Set a value for a key if it hasn't been set before.
   * Otherwise works exactly the same as [`ReactiveDict.set`](#ReactiveDict-set).
   * @locus Client
   * @param {String} key The key to set, eg, `selectedItem`
   * @param {EJSONable | undefined} value The new value for `key`
   */
  setDefault(keyOrObject, value) {
    if (typeof keyOrObject === 'object' && value === undefined) {
      // Called as `dict.setDefault({...})`
      this._setDefaultObject(keyOrObject);
      return;
    }
    // the input isn't an object, so it must be a key
    // and we resume with the rest of the function
    const key = keyOrObject;
    if (!hasOwn.call(this.keys, key)) {
      this.set(key, value);
    }
  }

  /**
   * @summary Get the value assiciated with a key. If inside a [reactive
   * computation](#reactivity), invalidate the computation the next time the
   * value associated with this key is changed by
   * [`ReactiveDict.set`](#ReactiveDict-set).
   * This returns a clone of the value, so if it's an object or an array,
   * mutating the returned value has no effect on the value stored in the
   * ReactiveDict.
   * @locus Client
   * @param {String} key The key of the element to return
   */
  get(key) {
    this._ensureKey(key);
    this.keyDeps[key].depend();
    return parse(this.keys[key]);
  }

  /**
   * @summary Test if the stored entry for a key is equal to a value. If inside a
   * [reactive computation](#reactivity), invalidate the computation the next
   * time the variable changes to or from the value.
   * @locus Client
   * @param {String} key The name of the session variable to test
   * @param {String | Number | Boolean | null | undefined} value The value to
   * test against
   */
  equals(key, value) {
    // Mongo.ObjectID is in the 'mongo' package
    let ObjectID = null;
    if (Package.mongo) {
      ObjectID = Package.mongo.Mongo.ObjectID;
    }
    // We don't allow objects (or arrays that might include objects) for
    // .equals, because JSON.stringify doesn't canonicalize object key
    // order. (We can make equals have the right return value by parsing the
    // current value and using EJSON.equals, but we won't have a canonical
    // element of keyValueDeps[key] to store the dependency.) You can still use
    // "EJSON.equals(reactiveDict.get(key), value)".
    //
    // XXX we could allow arrays as long as we recursively check that there
    // are no objects
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'undefined' && !(value instanceof Date) && !(ObjectID && value instanceof ObjectID) && value !== null) {
      throw new Error("ReactiveDict.equals: value must be scalar");
    }
    const serializedValue = stringify(value);
    if (Tracker.active) {
      this._ensureKey(key);
      if (!hasOwn.call(this.keyValueDeps[key], serializedValue)) {
        this.keyValueDeps[key][serializedValue] = new Tracker.Dependency();
      }
      var isNew = this.keyValueDeps[key][serializedValue].depend();
      if (isNew) {
        Tracker.onInvalidate(() => {
          // clean up [key][serializedValue] if it's now empty, so we don't
          // use O(n) memory for n = values seen ever
          if (!this.keyValueDeps[key][serializedValue].hasDependents()) {
            delete this.keyValueDeps[key][serializedValue];
          }
        });
      }
    }
    let oldValue = undefined;
    if (hasOwn.call(this.keys, key)) {
      oldValue = parse(this.keys[key]);
    }
    return EJSON.equals(oldValue, value);
  }

  /**
   * @summary Get all key-value pairs as a plain object. If inside a [reactive
   * computation](#reactivity), invalidate the computation the next time the
   * value associated with any key is changed by
   * [`ReactiveDict.set`](#ReactiveDict-set).
   * This returns a clone of each value, so if it's an object or an array,
   * mutating the returned value has no effect on the value stored in the
   * ReactiveDict.
   * @locus Client
   */
  all() {
    this.allDeps.depend();
    let ret = {};
    Object.keys(this.keys).forEach(key => {
      ret[key] = parse(this.keys[key]);
    });
    return ret;
  }

  /**
   * @summary remove all key-value pairs from the ReactiveDict. Notify any
   * listeners that the value has changed (eg: redraw templates, and rerun any
   * [`Tracker.autorun`](#tracker_autorun) computations, that called
   * [`ReactiveDict.get`](#ReactiveDict_get) on this `key`.)
   * @locus Client
   */
  clear() {
    const oldKeys = this.keys;
    this.keys = {};
    this.allDeps.changed();
    Object.keys(oldKeys).forEach(key => {
      changed(this.keyDeps[key]);
      if (this.keyValueDeps[key]) {
        changed(this.keyValueDeps[key][oldKeys[key]]);
        changed(this.keyValueDeps[key]['undefined']);
      }
    });
  }

  /**
   * @summary remove a key-value pair from the ReactiveDict. Notify any listeners
   * that the value has changed (eg: redraw templates, and rerun any
   * [`Tracker.autorun`](#tracker_autorun) computations, that called
   * [`ReactiveDict.get`](#ReactiveDict_get) on this `key`.)
   * @locus Client
   * @param {String} key The key to delete, eg, `selectedItem`
   */
  delete(key) {
    let didRemove = false;
    if (hasOwn.call(this.keys, key)) {
      const oldValue = this.keys[key];
      delete this.keys[key];
      changed(this.keyDeps[key]);
      if (this.keyValueDeps[key]) {
        changed(this.keyValueDeps[key][oldValue]);
        changed(this.keyValueDeps[key]['undefined']);
      }
      this.allDeps.changed();
      didRemove = true;
    }
    return didRemove;
  }

  /**
   * @summary Clear all values from the reactiveDict and prevent it from being
   * migrated on a Hot Code Pushes. Notify any listeners
   * that the value has changed (eg: redraw templates, and rerun any
   * [`Tracker.autorun`](#tracker_autorun) computations, that called
   * [`ReactiveDict.get`](#ReactiveDict_get) on this `key`.)
   * @locus Client
   */
  destroy() {
    this.clear();
    if (this.name && hasOwn.call(ReactiveDict._dictsToMigrate, this.name)) {
      delete ReactiveDict._dictsToMigrate[this.name];
    }
  }
  _setObject(object) {
    Object.keys(object).forEach(key => {
      this.set(key, object[key]);
    });
  }
  _setDefaultObject(object) {
    Object.keys(object).forEach(key => {
      this.setDefault(key, object[key]);
    });
  }
  _ensureKey(key) {
    if (!(key in this.keyDeps)) {
      this.keyDeps[key] = new Tracker.Dependency();
      this.keyValueDeps[key] = {};
    }
  }

  // Get a JSON value that can be passed to the constructor to
  // create a new ReactiveDict with the same contents as this one
  _getMigrationData() {
    // XXX sanitize and make sure it's JSONible?
    return this.keys;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/reactive-dict/migration.js");

/* Exports */
Package._define("reactive-dict", exports, {
  ReactiveDict: ReactiveDict
});

})();

//# sourceURL=meteor://💻app/packages/reactive-dict.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmVhY3RpdmUtZGljdC9taWdyYXRpb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3JlYWN0aXZlLWRpY3QvcmVhY3RpdmUtZGljdC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJSZWFjdGl2ZURpY3QiLCJsaW5rIiwidiIsImhhc093biIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiX21pZ3JhdGVkRGljdERhdGEiLCJfZGljdHNUb01pZ3JhdGUiLCJfbG9hZE1pZ3JhdGVkRGljdCIsImRpY3ROYW1lIiwiY2FsbCIsImRhdGEiLCJfcmVnaXN0ZXJEaWN0Rm9yTWlncmF0ZSIsImRpY3QiLCJFcnJvciIsIk1ldGVvciIsImlzQ2xpZW50IiwiUGFja2FnZSIsInJlbG9hZCIsIm1pZ3JhdGlvbkRhdGEiLCJSZWxvYWQiLCJfbWlncmF0aW9uRGF0YSIsImRpY3RzIiwiX29uTWlncmF0ZSIsImRpY3RzVG9NaWdyYXRlIiwiZGF0YVRvTWlncmF0ZSIsIl9nZXRNaWdyYXRpb25EYXRhIiwic3RyaW5naWZ5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJFSlNPTiIsInBhcnNlIiwic2VyaWFsaXplZCIsImNoYW5nZWQiLCJjb25zdHJ1Y3RvciIsImRpY3REYXRhIiwia2V5cyIsIm1pZ3JhdGVkRGF0YSIsIl9zZXRPYmplY3QiLCJuYW1lIiwiYWxsRGVwcyIsIlRyYWNrZXIiLCJEZXBlbmRlbmN5Iiwia2V5RGVwcyIsImtleVZhbHVlRGVwcyIsInNldCIsImtleU9yT2JqZWN0Iiwia2V5Iiwia2V5RXhpc3RlZCIsIm9sZFNlcmlhbGl6ZWRWYWx1ZSIsImlzTmV3VmFsdWUiLCJzZXREZWZhdWx0IiwiX3NldERlZmF1bHRPYmplY3QiLCJnZXQiLCJfZW5zdXJlS2V5IiwiZGVwZW5kIiwiZXF1YWxzIiwiT2JqZWN0SUQiLCJtb25nbyIsIk1vbmdvIiwiRGF0ZSIsInNlcmlhbGl6ZWRWYWx1ZSIsImFjdGl2ZSIsImlzTmV3Iiwib25JbnZhbGlkYXRlIiwiaGFzRGVwZW5kZW50cyIsIm9sZFZhbHVlIiwiYWxsIiwicmV0IiwiZm9yRWFjaCIsImNsZWFyIiwib2xkS2V5cyIsImRlbGV0ZSIsImRpZFJlbW92ZSIsImRlc3Ryb3kiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQU0sQ0FBQztFQUFDQyxZQUFZLEVBQUMsTUFBSUE7QUFBWSxDQUFDLENBQUM7QUFBQyxJQUFJQSxZQUFZO0FBQUNGLE1BQU0sQ0FBQ0csSUFBSSxDQUFDLGlCQUFpQixFQUFDO0VBQUNELFlBQVksQ0FBQ0UsQ0FBQyxFQUFDO0lBQUNGLFlBQVksR0FBQ0UsQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUVsSSxNQUFNQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxjQUFjO0FBRTlDTixZQUFZLENBQUNPLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckNQLFlBQVksQ0FBQ1EsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRW5DUixZQUFZLENBQUNTLGlCQUFpQixHQUFHLFVBQVVDLFFBQVEsRUFBRTtFQUNuRCxJQUFJUCxNQUFNLENBQUNRLElBQUksQ0FBQ1gsWUFBWSxDQUFDTyxpQkFBaUIsRUFBRUcsUUFBUSxDQUFDLEVBQUU7SUFDekQsTUFBTUUsSUFBSSxHQUFHWixZQUFZLENBQUNPLGlCQUFpQixDQUFDRyxRQUFRLENBQUM7SUFDckQsT0FBT1YsWUFBWSxDQUFDTyxpQkFBaUIsQ0FBQ0csUUFBUSxDQUFDO0lBQy9DLE9BQU9FLElBQUk7RUFDYjtFQUVBLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFFRFosWUFBWSxDQUFDYSx1QkFBdUIsR0FBRyxVQUFVSCxRQUFRLEVBQUVJLElBQUksRUFBRTtFQUMvRCxJQUFJWCxNQUFNLENBQUNRLElBQUksQ0FBQ1gsWUFBWSxDQUFD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LENBQUM7SUFDbkMsQ0FBQyxDQUFDO0VBQ0o7RUFFQU8sVUFBVSxDQUFDUCxHQUFHLEVBQUU7SUFDZCxJQUFJLEVBQUVBLEdBQUcsSUFBSSxJQUFJLENBQUNKLE9BQU8sQ0FBQyxFQUFFO01BQzFCLElBQUksQ0FBQ0EsT0FBTyxDQUFDSSxHQUFHLENBQUMsR0FBRyxJQUFJTixPQUFPLENBQUNDLFVBQVU7TUFDMUMsSUFBSSxDQUFDRSxZQUFZLENBQUNHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QjtFQUNGOztFQUVBO0VBQ0E7RUFDQXJCLGlCQUFpQixHQUFHO0lBQ2xCO0lBQ0EsT0FBTyxJQUFJLENBQUNVLElBQUk7RUFDbEI7QUFDRixDIiwiZmlsZSI6Ii9wYWNrYWdlcy9yZWFjdGl2ZS1kaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhY3RpdmVEaWN0IH0gZnJvbSAnLi9yZWFjdGl2ZS1kaWN0JztcblxuY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuUmVhY3RpdmVEaWN0Ll9taWdyYXRlZERpY3REYXRhID0ge307IC8vIG5hbWUgLT4gZGF0YVxuUmVhY3RpdmVEaWN0Ll9kaWN0c1RvTWlncmF0ZSA9IHt9OyAvLyBuYW1lIC0+IFJlYWN0aXZlRGljdFxuXG5SZWFjdGl2ZURpY3QuX2xvYWRNaWdyYXRlZERpY3QgPSBmdW5jdGlvbiAoZGljdE5hbWUpIHtcbiAgaWYgKGhhc093bi5jYWxsKFJlYWN0aXZlRGljdC5fbWlncmF0ZWREaWN0RGF0YSwgZGljdE5hbWUpKSB7XG4gICAgY29uc3QgZGF0YSA9IFJlYWN0aXZlRGljdC5fbWlncmF0ZWREaWN0RGF0YVtkaWN0TmFtZV07XG4gICAgZGVsZXRlIFJlYWN0aXZlRGljdC5fbWlncmF0ZWREaWN0RGF0YVtkaWN0TmFtZV07XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cblJlYWN0aXZlRGljdC5fcmVnaXN0ZXJEaWN0Rm9yTWlncmF0ZSA9IGZ1bmN0aW9uIChkaWN0TmFtZSwgZGljdCkge1xuICBpZiAoaGFzT3duLmNhbGwoUmVhY3RpdmVEaWN0Ll9kaWN0c1RvTWlncmF0ZSwgZGljdE5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBSZWFjdGl2ZURpY3QgbmFtZTogXCIgKyBkaWN0TmFtZSk7XG5cbiAgUmVhY3RpdmVEaWN0Ll9kaWN0c1RvTWlncmF0ZVtkaWN0TmFtZV0gPSBkaWN0O1xufTtcblxuaWYgKE1ldGVvci5pc0NsaWVudCAmJiBQYWNrYWdlLnJlbG9hZCkge1xuICAvLyBQdXQgb2xkIG1pZ3JhdGVkIGRhdGEgaW50byBSZWFjdGl2ZURpY3QuX21pZ3JhdGVkRGljdERhdGEsXG4gIC8vIHdoZXJlIGl0IGNhbiBiZSBhY2Nlc3NlZCBieSBSZWFjdGl2ZURpY3QuX2xvYWRNaWdyYXRlZERpY3QuXG4gIHZhciBtaWdyYXRpb25EYXRhID0gUGFja2FnZS5yZWxvYWQuUmVsb2FkLl9taWdyYXRpb25EYXRhKCdyZWFjdGl2ZS1kaWN0Jyk7XG4gIGlmIChtaWdyYXRpb25EYXRhICYmIG1pZ3JhdGlvbkRhdGEuZGljdHMpXG4gICAgUmVhY3RpdmVEaWN0Ll9taWdyYXRlZERpY3REYXRhID0gbWlncmF0aW9uRGF0YS5kaWN0cztcblxuICAvLyBPbiBtaWdyYXRpb24sIGFzc2VtYmxlIHRoZSBkYXRhIGZyb20gYWxsIHRoZSBkaWN0cyB0aGF0IGhhdmUgYmVlblxuICAvLyByZWdpc3RlcmVkLlxuICBQYWNrYWdlLnJlbG9hZC5SZWxvYWQuX29uTWlncmF0ZSgncmVhY3RpdmUtZGljdCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGljdHNUb01pZ3JhdGUgPSBSZWFjdGl2ZURpY3QuX2RpY3RzVG9NaWdyYXRlO1xuICAgIHZhciBkYXRhVG9NaWdyYXRlID0ge307XG5cbiAgICBmb3IgKHZhciBkaWN0TmFtZSBpbiBkaWN0c1RvTWlncmF0ZSlcbiAgICAgIGRhdGFUb01pZ3JhdGVbZGljdE5hbWVdID0gZGljdHNUb01pZ3JhdGVbZGljdE5hbWVdLl9nZXRNaWdyYXRpb25EYXRhKCk7XG5cbiAgICByZXR1cm4gW3RydWUsIHtkaWN0czogZGF0YVRvTWlncmF0ZX1dO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgUmVhY3RpdmVEaWN0IH07XG4iLCJjb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyBYWFggY29tZSB1cCB3aXRoIGEgc2VyaWFsaXphdGlvbiBtZXRob2Qgd2hpY2ggY2Fub25pY2FsaXplcyBvYmplY3Qga2V5XG4vLyBvcmRlciwgd2hpY2ggd291bGQgYWxsb3cgdXMgdG8gdXNlIG9iamVjdHMgYXMgdmFsdWVzIGZvciBlcXVhbHMuXG5mdW5jdGlvbiBzdHJpbmdpZnkodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIH1cbiAgcmV0dXJuIEVKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHNlcmlhbGl6ZWQpIHtcbiAgaWYgKHNlcmlhbGl6ZWQgPT09IHVuZGVmaW5lZCB8fCBzZXJpYWxpemVkID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIEVKU09OLnBhcnNlKHNlcmlhbGl6ZWQpO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VkKHYpIHtcbiAgdiAmJiB2LmNoYW5nZWQoKTtcbn1cblxuLy8gWFhYIENPTVBBVCBXSVRIIDAuOS4xIDogYWNjZXB0IG1pZ3JhdGlvbkRhdGEgaW5zdGVhZCBvZiBkaWN0TmFtZVxuLyoqXG4gKiBAY2xhc3NcbiAqIEBpbnN0YW5jZU5hbWUgUmVhY3RpdmVEaWN0XG4gKiBAc3VtbWFyeSBDb25zdHJ1Y3RvciBmb3IgYSBSZWFjdGl2ZURpY3QsIHdoaWNoIHJlcHJlc2VudHMgYSByZWFjdGl2ZSBkaWN0aW9uYXJ5IG9mIGtleS92YWx1ZSBwYWlycy5cbiAqIEBsb2N1cyBDbGllbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV0gT3B0aW9uYWwuICBXaGVuIGEgbmFtZSBpcyBwYXNzZWQsIHByZXNlcnZlcyBjb250ZW50cyBhY3Jvc3MgSG90IENvZGUgUHVzaGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW2luaXRpYWxWYWx1ZV0gT3B0aW9uYWwuICBUaGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHRoZSBkaWN0aW9uYXJ5XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFjdGl2ZURpY3Qge1xuICBjb25zdHJ1Y3RvcihkaWN0TmFtZSwgZGljdERhdGEpIHtcbiAgICAvLyB0aGlzLmtleXM6IGtleSAtPiB2YWx1ZVxuICAgIHRoaXMua2V5cyA9IHt9O1xuXG4gICAgaWYgKGRpY3ROYW1lKSB7XG4gICAgICAvLyBuYW1lIGdpdmVuOyBtaWdyYXRpb24gd2lsbCBiZSBwZXJmb3JtZWRcbiAgICAgIGlmICh0eXBlb2YgZGljdE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIHRoZSBub3JtYWwgY2FzZSwgYXJndW1lbnQgaXMgYSBzdHJpbmcgbmFtZS5cblxuICAgICAgICAvLyBPbmx5IHJ1biBtaWdyYXRpb24gbG9naWMgb24gY2xpZW50LCBpdCB3aWxsIGNhdXNlXG4gICAgICAgIC8vIGR1cGxpY2F0ZSBuYW1lIGVycm9ycyBvbiBzZXJ2ZXIgZHVyaW5nIHJlbG9hZHMuXG4gICAgICAgIC8vIF9yZWdpc3RlckRpY3RGb3JNaWdyYXRlIHdpbGwgdGhyb3cgYW4gZXJyb3Igb24gZHVwbGljYXRlIG5hbWUuXG4gICAgICAgIE1ldGVvci5pc0NsaWVudCAmJiBSZWFjdGl2ZURpY3QuX3JlZ2lzdGVyRGljdEZvck1pZ3JhdGUoZGljdE5hbWUsIHRoaXMpO1xuICAgICAgICBjb25zdCBtaWdyYXRlZERhdGEgPSBNZXRlb3IuaXNDbGllbnQgJiYgUmVhY3RpdmVEaWN0Ll9sb2FkTWlncmF0ZWREaWN0KGRpY3ROYW1lKTtcblxuICAgICAgICBpZiAobWlncmF0ZWREYXRhKSB7XG4gICAgICAgICAgLy8gRG9uJ3Qgc3RyaW5naWZ5IG1pZ3JhdGVkIGRhdGFcbiAgICAgICAgICB0aGlzLmtleXMgPSBtaWdyYXRlZERhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVXNlIF9zZXRPYmplY3QgdG8gbWFrZSBzdXJlIHZhbHVlcyBhcmUgc3RyaW5naWZpZWRcbiAgICAgICAgICB0aGlzLl9zZXRPYmplY3QoZGljdERhdGEgfHwge30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGRpY3ROYW1lO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGljdE5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGJhY2stY29tcGF0IGNhc2U6IGRpY3ROYW1lIGlzIGFjdHVhbGx5IG1pZ3JhdGlvbkRhdGFcbiAgICAgICAgLy8gVXNlIF9zZXRPYmplY3QgdG8gbWFrZSBzdXJlIHZhbHVlcyBhcmUgc3RyaW5naWZpZWRcbiAgICAgICAgdGhpcy5fc2V0T2JqZWN0KGRpY3ROYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgUmVhY3RpdmVEaWN0IGFyZ3VtZW50OiBcIiArIGRpY3ROYW1lKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkaWN0RGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuX3NldE9iamVjdChkaWN0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5hbGxEZXBzID0gbmV3IFRyYWNrZXIuRGVwZW5kZW5jeTtcbiAgICB0aGlzLmtleURlcHMgPSB7fTsgLy8ga2V5IC0+IERlcGVuZGVuY3lcbiAgICB0aGlzLmtleVZhbHVlRGVwcyA9IHt9OyAvLyBrZXkgLT4gRGVwZW5kZW5jeVxuICB9XG5cbiAgLy8gc2V0KCkgYmVnYW4gYXMgYSBrZXkvdmFsdWUgbWV0aG9kLCBidXQgd2UgYXJlIG5vdyBvdmVybG9hZGluZyBpdFxuICAvLyB0byB0YWtlIGFuIG9iamVjdCBvZiBrZXkvdmFsdWUgcGFpcnMsIHNpbWlsYXIgdG8gYmFja2JvbmVcbiAgLy8gaHR0cDovL2JhY2tib25lanMub3JnLyNNb2RlbC1zZXRcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFNldCBhIHZhbHVlIGZvciBhIGtleSBpbiB0aGUgUmVhY3RpdmVEaWN0LiBOb3RpZnkgYW55IGxpc3RlbmVyc1xuICAgKiB0aGF0IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZCAoZWc6IHJlZHJhdyB0ZW1wbGF0ZXMsIGFuZCByZXJ1biBhbnlcbiAgICogW2BUcmFja2VyLmF1dG9ydW5gXSgjdHJhY2tlcl9hdXRvcnVuKSBjb21wdXRhdGlvbnMsIHRoYXQgY2FsbGVkXG4gICAqIFtgUmVhY3RpdmVEaWN0LmdldGBdKCNSZWFjdGl2ZURpY3RfZ2V0KSBvbiB0aGlzIGBrZXlgLilcbiAgICogQGxvY3VzIENsaWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSBrZXkgdG8gc2V0LCBlZywgYHNlbGVjdGVkSXRlbWBcbiAgICogQHBhcmFtIHtFSlNPTmFibGUgfCB1bmRlZmluZWR9IHZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIGBrZXlgXG4gICAqL1xuICBzZXQoa2V5T3JPYmplY3QsIHZhbHVlKSB7XG4gICAgaWYgKCh0eXBlb2Yga2V5T3JPYmplY3QgPT09ICdvYmplY3QnKSAmJiAodmFsdWUgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIC8vIENhbGxlZCBhcyBgZGljdC5zZXQoey4uLn0pYFxuICAgICAgdGhpcy5fc2V0T2JqZWN0KGtleU9yT2JqZWN0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdGhlIGlucHV0IGlzbid0IGFuIG9iamVjdCwgc28gaXQgbXVzdCBiZSBhIGtleVxuICAgIC8vIGFuZCB3ZSByZXN1bWUgd2l0aCB0aGUgcmVzdCBvZiB0aGUgZnVuY3Rpb25cbiAgICBjb25zdCBrZXkgPSBrZXlPck9iamVjdDtcblxuICAgIHZhbHVlID0gc3RyaW5naWZ5KHZhbHVlKTtcblxuICAgIGNvbnN0IGtleUV4aXN0ZWQgPSBoYXNPd24uY2FsbCh0aGlzLmtleXMsIGtleSk7XG4gICAgY29uc3Qgb2xkU2VyaWFsaXplZFZhbHVlID0ga2V5RXhpc3RlZCA/IHRoaXMua2V5c1trZXldIDogJ3VuZGVmaW5lZCc7XG4gICAgY29uc3QgaXNOZXdWYWx1ZSA9ICh2YWx1ZSAhPT0gb2xkU2VyaWFsaXplZFZhbHVlKTtcblxuICAgIHRoaXMua2V5c1trZXldID0gdmFsdWU7XG5cbiAgICBpZiAoaXNOZXdWYWx1ZSB8fCAha2V5RXhpc3RlZCkge1xuICAgICAgLy8gVXNpbmcgdGhlIGNoYW5nZWQgdXRpbGl0eSBmdW5jdGlvbiBoZXJlIGJlY2F1c2UgdGhpcy5hbGxEZXBzIG1pZ2h0IG5vdCBleGlzdCB5ZXQsXG4gICAgICAvLyB3aGVuIHNldHRpbmcgaW5pdGlhbCBkYXRhIGZyb20gY29uc3RydWN0b3JcbiAgICAgIGNoYW5nZWQodGhpcy5hbGxEZXBzKTtcbiAgICB9XG5cbiAgICAvLyBEb24ndCB0cmlnZ2VyIGNoYW5nZXMgd2hlbiBzZXR0aW5nIGluaXRpYWwgZGF0YSBmcm9tIGNvbnN0cnVjdG9yLFxuICAgIC8vIHRoaXMuS2V5RGVwcyBpcyB1bmRlZmluZWQgaW4gdGhpcyBjYXNlXG4gICAgaWYgKGlzTmV3VmFsdWUgJiYgdGhpcy5rZXlEZXBzKSB7XG4gICAgICBjaGFuZ2VkKHRoaXMua2V5RGVwc1trZXldKTtcbiAgICAgIGlmICh0aGlzLmtleVZhbHVlRGVwc1trZXldKSB7XG4gICAgICAgIGNoYW5nZWQodGhpcy5rZXlWYWx1ZURlcHNba2V5XVtvbGRTZXJpYWxpemVkVmFsdWVdKTtcbiAgICAgICAgY2hhbmdlZCh0aGlzLmtleVZhbHVlRGVwc1trZXldW3ZhbHVlXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFNldCBhIHZhbHVlIGZvciBhIGtleSBpZiBpdCBoYXNuJ3QgYmVlbiBzZXQgYmVmb3JlLlxuICAgKiBPdGhlcndpc2Ugd29ya3MgZXhhY3RseSB0aGUgc2FtZSBhcyBbYFJlYWN0aXZlRGljdC5zZXRgXSgjUmVhY3RpdmVEaWN0LXNldCkuXG4gICAqIEBsb2N1cyBDbGllbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUga2V5IHRvIHNldCwgZWcsIGBzZWxlY3RlZEl0ZW1gXG4gICAqIEBwYXJhbSB7RUpTT05hYmxlIHwgdW5kZWZpbmVkfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIGZvciBga2V5YFxuICAgKi9cbiAgc2V0RGVmYXVsdChrZXlPck9iamVjdCwgdmFsdWUpIHtcbiAgICBpZiAoKHR5cGVvZiBrZXlPck9iamVjdCA9PT0gJ29iamVjdCcpICYmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgLy8gQ2FsbGVkIGFzIGBkaWN0LnNldERlZmF1bHQoey4uLn0pYFxuICAgICAgdGhpcy5fc2V0RGVmYXVsdE9iamVjdChrZXlPck9iamVjdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRoZSBpbnB1dCBpc24ndCBhbiBvYmplY3QsIHNvIGl0IG11c3QgYmUgYSBrZXlcbiAgICAvLyBhbmQgd2UgcmVzdW1lIHdpdGggdGhlIHJlc3Qgb2YgdGhlIGZ1bmN0aW9uXG4gICAgY29uc3Qga2V5ID0ga2V5T3JPYmplY3Q7XG5cbiAgICBpZiAoISBoYXNPd24uY2FsbCh0aGlzLmtleXMsIGtleSkpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBHZXQgdGhlIHZhbHVlIGFzc2ljaWF0ZWQgd2l0aCBhIGtleS4gSWYgaW5zaWRlIGEgW3JlYWN0aXZlXG4gICAqIGNvbXB1dGF0aW9uXSgjcmVhY3Rpdml0eSksIGludmFsaWRhdGUgdGhlIGNvbXB1dGF0aW9uIHRoZSBuZXh0IHRpbWUgdGhlXG4gICAqIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleSBpcyBjaGFuZ2VkIGJ5XG4gICAqIFtgUmVhY3RpdmVEaWN0LnNldGBdKCNSZWFjdGl2ZURpY3Qtc2V0KS5cbiAgICogVGhpcyByZXR1cm5zIGEgY2xvbmUgb2YgdGhlIHZhbHVlLCBzbyBpZiBpdCdzIGFuIG9iamVjdCBvciBhbiBhcnJheSxcbiAgICogbXV0YXRpbmcgdGhlIHJldHVybmVkIHZhbHVlIGhhcyBubyBlZmZlY3Qgb24gdGhlIHZhbHVlIHN0b3JlZCBpbiB0aGVcbiAgICogUmVhY3RpdmVEaWN0LlxuICAgKiBAbG9jdXMgQ2xpZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZWxlbWVudCB0byByZXR1cm5cbiAgICovXG4gIGdldChrZXkpIHtcbiAgICB0aGlzLl9lbnN1cmVLZXkoa2V5KTtcbiAgICB0aGlzLmtleURlcHNba2V5XS5kZXBlbmQoKTtcbiAgICByZXR1cm4gcGFyc2UodGhpcy5rZXlzW2tleV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFRlc3QgaWYgdGhlIHN0b3JlZCBlbnRyeSBmb3IgYSBrZXkgaXMgZXF1YWwgdG8gYSB2YWx1ZS4gSWYgaW5zaWRlIGFcbiAgICogW3JlYWN0aXZlIGNvbXB1dGF0aW9uXSgjcmVhY3Rpdml0eSksIGludmFsaWRhdGUgdGhlIGNvbXB1dGF0aW9uIHRoZSBuZXh0XG4gICAqIHRpbWUgdGhlIHZhcmlhYmxlIGNoYW5nZXMgdG8gb3IgZnJvbSB0aGUgdmFsdWUuXG4gICAqIEBsb2N1cyBDbGllbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUgbmFtZSBvZiB0aGUgc2Vzc2lvbiB2YXJpYWJsZSB0byB0ZXN0XG4gICAqIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyIHwgQm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IHZhbHVlIFRoZSB2YWx1ZSB0b1xuICAgKiB0ZXN0IGFnYWluc3RcbiAgICovXG4gIGVxdWFscyhrZXksIHZhbHVlKSB7XG4gICAgLy8gTW9uZ28uT2JqZWN0SUQgaXMgaW4gdGhlICdtb25nbycgcGFja2FnZVxuICAgIGxldCBPYmplY3RJRCA9IG51bGw7XG4gICAgaWYgKFBhY2thZ2UubW9uZ28pIHtcbiAgICAgIE9iamVjdElEID0gUGFja2FnZS5tb25nby5Nb25nby5PYmplY3RJRDtcbiAgICB9XG4gICAgLy8gV2UgZG9uJ3QgYWxsb3cgb2JqZWN0cyAob3IgYXJyYXlzIHRoYXQgbWlnaHQgaW5jbHVkZSBvYmplY3RzKSBmb3JcbiAgICAvLyAuZXF1YWxzLCBiZWNhdXNlIEpTT04uc3RyaW5naWZ5IGRvZXNuJ3QgY2Fub25pY2FsaXplIG9iamVjdCBrZXlcbiAgICAvLyBvcmRlci4gKFdlIGNhbiBtYWtlIGVxdWFscyBoYXZlIHRoZSByaWdodCByZXR1cm4gdmFsdWUgYnkgcGFyc2luZyB0aGVcbiAgICAvLyBjdXJyZW50IHZhbHVlIGFuZCB1c2luZyBFSlNPTi5lcXVhbHMsIGJ1dCB3ZSB3b24ndCBoYXZlIGEgY2Fub25pY2FsXG4gICAgLy8gZWxlbWVudCBvZiBrZXlWYWx1ZURlcHNba2V5XSB0byBzdG9yZSB0aGUgZGVwZW5kZW5jeS4pIFlvdSBjYW4gc3RpbGwgdXNlXG4gICAgLy8gXCJFSlNPTi5lcXVhbHMocmVhY3RpdmVEaWN0LmdldChrZXkpLCB2YWx1ZSlcIi5cbiAgICAvL1xuICAgIC8vIFhYWCB3ZSBjb3VsZCBhbGxvdyBhcnJheXMgYXMgbG9uZyBhcyB3ZSByZWN1cnNpdmVseSBjaGVjayB0aGF0IHRoZXJlXG4gICAgLy8gYXJlIG5vIG9iamVjdHNcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgICAgICB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInICYmXG4gICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpICYmXG4gICAgICAgICEoT2JqZWN0SUQgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3RJRCkgJiZcbiAgICAgICAgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlYWN0aXZlRGljdC5lcXVhbHM6IHZhbHVlIG11c3QgYmUgc2NhbGFyXCIpO1xuICAgIH1cbiAgICBjb25zdCBzZXJpYWxpemVkVmFsdWUgPSBzdHJpbmdpZnkodmFsdWUpO1xuXG4gICAgaWYgKFRyYWNrZXIuYWN0aXZlKSB7XG4gICAgICB0aGlzLl9lbnN1cmVLZXkoa2V5KTtcblxuICAgICAgaWYgKCEgaGFzT3duLmNhbGwodGhpcy5rZXlWYWx1ZURlcHNba2V5XSwgc2VyaWFsaXplZFZhbHVlKSkge1xuICAgICAgICB0aGlzLmtleVZhbHVlRGVwc1trZXldW3NlcmlhbGl6ZWRWYWx1ZV0gPSBuZXcgVHJhY2tlci5EZXBlbmRlbmN5O1xuICAgICAgfVxuXG4gICAgICB2YXIgaXNOZXcgPSB0aGlzLmtleVZhbHVlRGVwc1trZXldW3NlcmlhbGl6ZWRWYWx1ZV0uZGVwZW5kKCk7XG4gICAgICBpZiAoaXNOZXcpIHtcbiAgICAgICAgVHJhY2tlci5vbkludmFsaWRhdGUoKCkgPT4ge1xuICAgICAgICAgIC8vIGNsZWFuIHVwIFtrZXldW3NlcmlhbGl6ZWRWYWx1ZV0gaWYgaXQncyBub3cgZW1wdHksIHNvIHdlIGRvbid0XG4gICAgICAgICAgLy8gdXNlIE8obikgbWVtb3J5IGZvciBuID0gdmFsdWVzIHNlZW4gZXZlclxuICAgICAgICAgIGlmICghIHRoaXMua2V5VmFsdWVEZXBzW2tleV1bc2VyaWFsaXplZFZhbHVlXS5oYXNEZXBlbmRlbnRzKCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleVZhbHVlRGVwc1trZXldW3NlcmlhbGl6ZWRWYWx1ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgb2xkVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGhhc093bi5jYWxsKHRoaXMua2V5cywga2V5KSkge1xuICAgICAgb2xkVmFsdWUgPSBwYXJzZSh0aGlzLmtleXNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBFSlNPTi5lcXVhbHMob2xkVmFsdWUsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBHZXQgYWxsIGtleS12YWx1ZSBwYWlycyBhcyBhIHBsYWluIG9iamVjdC4gSWYgaW5zaWRlIGEgW3JlYWN0aXZlXG4gICAqIGNvbXB1dGF0aW9uXSgjcmVhY3Rpdml0eSksIGludmFsaWRhdGUgdGhlIGNvbXB1dGF0aW9uIHRoZSBuZXh0IHRpbWUgdGhlXG4gICAqIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBhbnkga2V5IGlzIGNoYW5nZWQgYnlcbiAgICogW2BSZWFjdGl2ZURpY3Quc2V0YF0oI1JlYWN0aXZlRGljdC1zZXQpLlxuICAgKiBUaGlzIHJldHVybnMgYSBjbG9uZSBvZiBlYWNoIHZhbHVlLCBzbyBpZiBpdCdzIGFuIG9iamVjdCBvciBhbiBhcnJheSxcbiAgICogbXV0YXRpbmcgdGhlIHJldHVybmVkIHZhbHVlIGhhcyBubyBlZmZlY3Qgb24gdGhlIHZhbHVlIHN0b3JlZCBpbiB0aGVcbiAgICogUmVhY3RpdmVEaWN0LlxuICAgKiBAbG9jdXMgQ2xpZW50XG4gICAqL1xuICBhbGwoKSB7XG4gICAgdGhpcy5hbGxEZXBzLmRlcGVuZCgpO1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmtleXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJldFtrZXldID0gcGFyc2UodGhpcy5rZXlzW2tleV0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogQHN1bW1hcnkgcmVtb3ZlIGFsbCBrZXktdmFsdWUgcGFpcnMgZnJvbSB0aGUgUmVhY3RpdmVEaWN0LiBOb3RpZnkgYW55XG4gICAqIGxpc3RlbmVycyB0aGF0IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZCAoZWc6IHJlZHJhdyB0ZW1wbGF0ZXMsIGFuZCByZXJ1biBhbnlcbiAgICogW2BUcmFja2VyLmF1dG9ydW5gXSgjdHJhY2tlcl9hdXRvcnVuKSBjb21wdXRhdGlvbnMsIHRoYXQgY2FsbGVkXG4gICAqIFtgUmVhY3RpdmVEaWN0LmdldGBdKCNSZWFjdGl2ZURpY3RfZ2V0KSBvbiB0aGlzIGBrZXlgLilcbiAgICogQGxvY3VzIENsaWVudFxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgY29uc3Qgb2xkS2V5cyA9IHRoaXMua2V5cztcbiAgICB0aGlzLmtleXMgPSB7fTtcblxuICAgIHRoaXMuYWxsRGVwcy5jaGFuZ2VkKCk7XG5cbiAgICBPYmplY3Qua2V5cyhvbGRLZXlzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjaGFuZ2VkKHRoaXMua2V5RGVwc1trZXldKTtcbiAgICAgIGlmICh0aGlzLmtleVZhbHVlRGVwc1trZXldKSB7XG4gICAgICAgIGNoYW5nZWQodGhpcy5rZXlWYWx1ZURlcHNba2V5XVtvbGRLZXlzW2tleV1dKTtcbiAgICAgICAgY2hhbmdlZCh0aGlzLmtleVZhbHVlRGVwc1trZXldWyd1bmRlZmluZWQnXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHN1bW1hcnkgcmVtb3ZlIGEga2V5LXZhbHVlIHBhaXIgZnJvbSB0aGUgUmVhY3RpdmVEaWN0LiBOb3RpZnkgYW55IGxpc3RlbmVyc1xuICAgKiB0aGF0IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZCAoZWc6IHJlZHJhdyB0ZW1wbGF0ZXMsIGFuZCByZXJ1biBhbnlcbiAgICogW2BUcmFja2VyLmF1dG9ydW5gXSgjdHJhY2tlcl9hdXRvcnVuKSBjb21wdXRhdGlvbnMsIHRoYXQgY2FsbGVkXG4gICAqIFtgUmVhY3RpdmVEaWN0LmdldGBdKCNSZWFjdGl2ZURpY3RfZ2V0KSBvbiB0aGlzIGBrZXlgLilcbiAgICogQGxvY3VzIENsaWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSBrZXkgdG8gZGVsZXRlLCBlZywgYHNlbGVjdGVkSXRlbWBcbiAgICovXG4gIGRlbGV0ZShrZXkpIHtcbiAgICBsZXQgZGlkUmVtb3ZlID0gZmFsc2U7XG5cbiAgICBpZiAoaGFzT3duLmNhbGwodGhpcy5rZXlzLCBrZXkpKSB7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMua2V5c1trZXldO1xuICAgICAgZGVsZXRlIHRoaXMua2V5c1trZXldO1xuICAgICAgY2hhbmdlZCh0aGlzLmtleURlcHNba2V5XSk7XG4gICAgICBpZiAodGhpcy5rZXlWYWx1ZURlcHNba2V5XSkge1xuICAgICAgICBjaGFuZ2VkKHRoaXMua2V5VmFsdWVEZXBzW2tleV1bb2xkVmFsdWVdKTtcbiAgICAgICAgY2hhbmdlZCh0aGlzLmtleVZhbHVlRGVwc1trZXldWyd1bmRlZmluZWQnXSk7XG4gICAgICB9XG4gICAgICB0aGlzLmFsbERlcHMuY2hhbmdlZCgpO1xuICAgICAgZGlkUmVtb3ZlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRpZFJlbW92ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDbGVhciBhbGwgdmFsdWVzIGZyb20gdGhlIHJlYWN0aXZlRGljdCBhbmQgcHJldmVudCBpdCBmcm9tIGJlaW5nXG4gICAqIG1pZ3JhdGVkIG9uIGEgSG90IENvZGUgUHVzaGVzLiBOb3RpZnkgYW55IGxpc3RlbmVyc1xuICAgKiB0aGF0IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZCAoZWc6IHJlZHJhdyB0ZW1wbGF0ZXMsIGFuZCByZXJ1biBhbnlcbiAgICogW2BUcmFja2VyLmF1dG9ydW5gXSgjdHJhY2tlcl9hdXRvcnVuKSBjb21wdXRhdGlvbnMsIHRoYXQgY2FsbGVkXG4gICAqIFtgUmVhY3RpdmVEaWN0LmdldGBdKCNSZWFjdGl2ZURpY3RfZ2V0KSBvbiB0aGlzIGBrZXlgLilcbiAgICogQGxvY3VzIENsaWVudFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMubmFtZSAmJiBoYXNPd24uY2FsbChSZWFjdGl2ZURpY3QuX2RpY3RzVG9NaWdyYXRlLCB0aGlzLm5hbWUpKSB7XG4gICAgICBkZWxldGUgUmVhY3RpdmVEaWN0Ll9kaWN0c1RvTWlncmF0ZVt0aGlzLm5hbWVdO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRPYmplY3Qob2JqZWN0KSB7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnNldChrZXksIG9iamVjdFtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9zZXREZWZhdWx0T2JqZWN0KG9iamVjdCkge1xuICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5zZXREZWZhdWx0KGtleSwgb2JqZWN0W2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgX2Vuc3VyZUtleShrZXkpIHtcbiAgICBpZiAoIShrZXkgaW4gdGhpcy5rZXlEZXBzKSkge1xuICAgICAgdGhpcy5rZXlEZXBzW2tleV0gPSBuZXcgVHJhY2tlci5EZXBlbmRlbmN5O1xuICAgICAgdGhpcy5rZXlWYWx1ZURlcHNba2V5XSA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBhIEpTT04gdmFsdWUgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciB0b1xuICAvLyBjcmVhdGUgYSBuZXcgUmVhY3RpdmVEaWN0IHdpdGggdGhlIHNhbWUgY29udGVudHMgYXMgdGhpcyBvbmVcbiAgX2dldE1pZ3JhdGlvbkRhdGEoKSB7XG4gICAgLy8gWFhYIHNhbml0aXplIGFuZCBtYWtlIHN1cmUgaXQncyBKU09OaWJsZT9cbiAgICByZXR1cm4gdGhpcy5rZXlzO1xuICB9XG59XG4iXX0=
