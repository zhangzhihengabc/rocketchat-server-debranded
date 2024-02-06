(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"ostrio:cookies":{"cookies.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ostrio_cookies/cookies.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Cookies: () => Cookies
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
let fetch;
let WebApp;
if (Meteor.isServer) {
  WebApp = require('meteor/webapp').WebApp;
} else {
  fetch = require('meteor/fetch').fetch;
}
const NoOp = () => {};
const urlRE = /\/___cookie___\/set/;
const rootUrl = Meteor.isServer ? process.env.ROOT_URL : window.__meteor_runtime_config__.ROOT_URL || window.__meteor_runtime_config__.meteorEnv.ROOT_URL || false;
const mobileRootUrl = Meteor.isServer ? process.env.MOBILE_ROOT_URL : window.__meteor_runtime_config__.MOBILE_ROOT_URL || window.__meteor_runtime_config__.meteorEnv.MOBILE_ROOT_URL || false;
const helpers = {
  isUndefined(obj) {
    return obj === void 0;
  },
  isArray(obj) {
    return Array.isArray(obj);
  },
  clone(obj) {
    if (!this.isObject(obj)) return obj;
    return this.isArray(obj) ? obj.slice() : Object.assign({}, obj);
  }
};
const _helpers = ['Number', 'Object', 'Function'];
for (let i = 0; i < _helpers.length; i++) {
  helpers['is' + _helpers[i]] = function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + _helpers[i] + ']';
  };
}

/*
 * @url https://github.com/jshttp/cookie/blob/master/index.js
 * @name cookie
 * @author jshttp
 * @license
 * (The MIT License)
 *
 * Copyright (c) 2012-2014 Roman Shtylman <shtylman@gmail.com>
 * Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const decode = decodeURIComponent;
const encode = encodeURIComponent;
const pairSplitRegExp = /; */;

/*
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/*
 * @function
 * @name tryDecode
 * @param {String} str
 * @param {Function} d
 * @summary Try decoding a string using a decoding function.
 * @private
 */
const tryDecode = (str, d) => {
  try {
    return d(str);
  } catch (e) {
    return str;
  }
};

/*
 * @function
 * @name parse
 * @param {String} str
 * @param {Object} [options]
 * @return {Object}
 * @summary
 * Parse a cookie header.
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 * @private
 */
const parse = (str, options) => {
  if (typeof str !== 'string') {
    throw new Meteor.Error(404, 'argument str must be a string');
  }
  const obj = {};
  const opt = options || {};
  let val;
  let key;
  let eqIndx;
  str.split(pairSplitRegExp).forEach(pair => {
    eqIndx = pair.indexOf('=');
    if (eqIndx < 0) {
      return;
    }
    key = pair.substr(0, eqIndx).trim();
    key = tryDecode(unescape(key), opt.decode || decode);
    val = pair.substr(++eqIndx, pair.length).trim();
    if (val[0] === '"') {
      val = val.slice(1, -1);
    }
    if (void 0 === obj[key]) {
      obj[key] = tryDecode(val, opt.decode || decode);
    }
  });
  return obj;
};

/*
 * @function
 * @name antiCircular
 * @param data {Object} - Circular or any other object which needs to be non-circular
 * @private
 */
const antiCircular = _obj => {
  const object = helpers.clone(_obj);
  const cache = new Map();
  return JSON.stringify(object, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.get(value)) {
        return void 0;
      }
      cache.set(value, true);
    }
    return value;
  });
};

/*
 * @function
 * @name serialize
 * @param {String} name
 * @param {String} val
 * @param {Object} [options]
 * @return { cookieString: String, sanitizedValue: Mixed }
 * @summary
 * Serialize data into a cookie header.
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 * serialize('foo', 'bar', { httpOnly: true }) => "foo=bar; httpOnly"
 * @private
 */
const serialize = function (key, val) {
  let opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let name;
  if (!fieldContentRegExp.test(key)) {
    name = escape(key);
  } else {
    name = key;
  }
  let sanitizedValue = val;
  let value = val;
  if (!helpers.isUndefined(value)) {
    if (helpers.isObject(value) || helpers.isArray(value)) {
      const stringified = antiCircular(value);
      value = encode("JSON.parse(".concat(stringified, ")"));
      sanitizedValue = JSON.parse(stringified);
    } else {
      value = encode(value);
      if (value && !fieldContentRegExp.test(value)) {
        value = escape(value);
      }
    }
  } else {
    value = '';
  }
  const pairs = ["".concat(name, "=").concat(value)];
  if (helpers.isNumber(opt.maxAge)) {
    pairs.push("Max-Age=".concat(opt.maxAge));
  }
  if (opt.domain && typeof opt.domain === 'string') {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new Meteor.Error(404, 'option domain is invalid');
    }
    pairs.push("Domain=".concat(opt.domain));
  }
  if (opt.path && typeof opt.path === 'string') {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new Meteor.Error(404, 'option path is invalid');
    }
    pairs.push("Path=".concat(opt.path));
  } else {
    pairs.push('Path=/');
  }
  opt.expires = opt.expires || opt.expire || false;
  if (opt.expires === Infinity) {
    pairs.push('Expires=Fri, 31 Dec 9999 23:59:59 GMT');
  } else if (opt.expires instanceof Date) {
    pairs.push("Expires=".concat(opt.expires.toUTCString()));
  } else if (opt.expires === 0) {
    pairs.push('Expires=0');
  } else if (helpers.isNumber(opt.expires)) {
    pairs.push("Expires=".concat(new Date(opt.expires).toUTCString()));
  }
  if (opt.httpOnly) {
    pairs.push('HttpOnly');
  }
  if (opt.secure) {
    pairs.push('Secure');
  }
  if (opt.firstPartyOnly) {
    pairs.push('First-Party-Only');
  }
  if (opt.sameSite) {
    pairs.push(opt.sameSite === true ? 'SameSite' : "SameSite=".concat(opt.sameSite));
  }
  return {
    cookieString: pairs.join('; '),
    sanitizedValue
  };
};
const isStringifiedRegEx = /JSON\.parse\((.*)\)/;
const isTypedRegEx = /false|true|null/;
const deserialize = string => {
  if (typeof string !== 'string') {
    return string;
  }
  if (isStringifiedRegEx.test(string)) {
    let obj = string.match(isStringifiedRegEx)[1];
    if (obj) {
      try {
        return JSON.parse(decode(obj));
      } catch (e) {
        console.error('[ostrio:cookies] [.get()] [deserialize()] Exception:', e, string, obj);
        return string;
      }
    }
    return string;
  } else if (isTypedRegEx.test(string)) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return string;
    }
  }
  return string;
};

/*
 * @locus Anywhere
 * @class __cookies
 * @param opts {Object} - Options (configuration) object
 * @param opts._cookies {Object|String} - Current cookies as String or Object
 * @param opts.TTL {Number|Boolean} - Default cookies expiration time (max-age) in milliseconds, by default - session (false)
 * @param opts.runOnServer {Boolean} - Expose Cookies class to Server
 * @param opts.response {http.ServerResponse|Object} - This object is created internally by a HTTP server
 * @param opts.allowQueryStringCookies {Boolean} - Allow passing Cookies in a query string (in URL). Primary should be used only in Cordova environment
 * @param opts.allowedCordovaOrigins {Regex|Boolean} - [Server] Allow setting Cookies from that specific origin which in Meteor/Cordova is localhost:12XXX (^http://localhost:12[0-9]{3}$)
 * @summary Internal Class
 */
class __cookies {
  constructor(opts) {
    this.__pendingCookies = [];
    this.TTL = opts.TTL || false;
    this.response = opts.response || false;
    this.runOnServer = opts.runOnServer || false;
    this.allowQueryStringCookies = opts.allowQueryStringCookies || false;
    this.allowedCordovaOrigins = opts.allowedCordovaOrigins || false;
    if (this.allowedCordovaOrigins === true) {
      this.allowedCordovaOrigins = /^http:\/\/localhost:12[0-9]{3}$/;
    }
    this.originRE = new RegExp("^https?://(".concat(rootUrl ? rootUrl : '').concat(mobileRootUrl ? '|' + mobileRootUrl : '', ")$"));
    if (helpers.isObject(opts._cookies)) {
      this.cookies = opts._cookies;
    } else {
      this.cookies = parse(opts._cookies);
    }
  }

  /*
   * @locus Anywhere
   * @memberOf __cookies
   * @name get
   * @param {String} key  - The name of the cookie to read
   * @param {String} _tmp - Unparsed string instead of user's cookies
   * @summary Read a cookie. If the cookie doesn't exist a null value will be returned.
   * @returns {String|void}
   */
  get(key, _tmp) {
    const cookieString = _tmp ? parse(_tmp) : this.cookies;
    if (!key || !cookieString) {
      return void 0;
    }
    if (cookieString.hasOwnProperty(key)) {
      return deserialize(cookieString[key]);
    }
    return void 0;
  }

  /*
   * @locus Anywhere
   * @memberOf __cookies
   * @name set
   * @param {String} key   - The name of the cookie to create/overwrite
   * @param {String} value - The value of the cookie
   * @param {Object} opts  - [Optional] Cookie options (see readme docs)
   * @summary Create/overwrite a cookie.
   * @returns {Boolean}
   */
  set(key, value) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (key && !helpers.isUndefined(value)) {
      if (helpers.isNumber(this.TTL) && opts.expires === undefined) {
        opts.expires = new Date(+new Date() + this.TTL);
      }
      const {
        cookieString,
        sanitizedValue
      } = serialize(key, value, opts);
      this.cookies[key] = sanitizedValue;
      if (Meteor.isClient) {
        document.cookie = cookieString;
      } else if (this.response) {
        this.__pendingCookies.push(cookieString);
        this.response.setHeader('Set-Cookie', this.__pendingCookies);
      }
      return true;
    }
    return false;
  }

  /*
   * @locus Anywhere
   * @memberOf __cookies
   * @name remove
   * @param {String} key    - The name of the cookie to create/overwrite
   * @param {String} path   - [Optional] The path from where the cookie will be
   * readable. E.g., "/", "/mydir"; if not specified, defaults to the current
   * path of the current document location (string or null). The path must be
   * absolute (see RFC 2965). For more information on how to use relative paths
   * in this argument, see: https://developer.mozilla.org/en-US/docs/Web/API/document.cookie#Using_relative_URLs_in_the_path_parameter
   * @param {String} domain - [Optional] The domain from where the cookie will
   * be readable. E.g., "example.com", ".example.com" (includes all subdomains)
   * or "subdomain.example.com"; if not specified, defaults to the host portion
   * of the current document location (string or null).
   * @summary Remove a cookie(s).
   * @returns {Boolean}
   */
  remove(key) {
    let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
    let domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    if (key && this.cookies.hasOwnProperty(key)) {
      const {
        cookieString
      } = serialize(key, '', {
        domain,
        path,
        expires: new Date(0)
      });
      delete this.cookies[key];
      if (Meteor.isClient) {
        document.cookie = cookieString;
      } else if (this.response) {
        this.response.setHeader('Set-Cookie', cookieString);
      }
      return true;
    } else if (!key && this.keys().length > 0 && this.keys()[0] !== '') {
      const keys = Object.keys(this.cookies);
      for (let i = 0; i < keys.length; i++) {
        this.remove(keys[i]);
      }
      return true;
    }
    return false;
  }

  /*
   * @locus Anywhere
   * @memberOf __cookies
   * @name has
   * @param {String} key  - The name of the cookie to create/overwrite
   * @param {String} _tmp - Unparsed string instead of user's cookies
   * @summary Check whether a cookie exists in the current position.
   * @returns {Boolean}
   */
  has(key, _tmp) {
    const cookieString = _tmp ? parse(_tmp) : this.cookies;
    if (!key || !cookieString) {
      return false;
    }
    return cookieString.hasOwnProperty(key);
  }

  /*
   * @locus Anywhere
   * @memberOf __cookies
   * @name keys
   * @summary Returns an array of all readable cookies from this location.
   * @returns {[String]}
   */
  keys() {
    if (this.cookies) {
      return Object.keys(this.cookies);
    }
    return [];
  }

  /*
   * @locus Client
   * @memberOf __cookies
   * @name send
   * @param cb {Function} - Callback
   * @summary Send all cookies over XHR to server.
   * @returns {void}
   */
  send() {
    let cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NoOp;
    if (Meteor.isServer) {
      cb(new Meteor.Error(400, 'Can\'t run `.send()` on server, it\'s Client only method!'));
    }
    if (this.runOnServer) {
      let path = "".concat(window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || window.__meteor_runtime_config__.meteorEnv.ROOT_URL_PATH_PREFIX || '', "/___cookie___/set");
      let query = '';
      if (Meteor.isCordova && this.allowQueryStringCookies) {
        const cookiesKeys = this.keys();
        const cookiesArray = [];
        for (let i = 0; i < cookiesKeys.length; i++) {
          const {
            sanitizedValue
          } = serialize(cookiesKeys[i], this.get(cookiesKeys[i]));
          const pair = "".concat(cookiesKeys[i], "=").concat(sanitizedValue);
          if (!cookiesArray.includes(pair)) {
            cookiesArray.push(pair);
          }
        }
        if (cookiesArray.length) {
          path = Meteor.absoluteUrl('___cookie___/set');
          query = "?___cookies___=".concat(encodeURIComponent(cookiesArray.join('; ')));
        }
      }
      fetch("".concat(path).concat(query), {
        credentials: 'include',
        type: 'cors'
      }).then(response => {
        cb(void 0, response);
      }).catch(cb);
    } else {
      cb(new Meteor.Error(400, 'Can\'t send cookies on server when `runOnServer` is false.'));
    }
    return void 0;
  }
}

/*
 * @function
 * @locus Server
 * @summary Middleware handler
 * @private
 */
const __middlewareHandler = (request, response, opts) => {
  let _cookies = {};
  if (opts.runOnServer) {
    if (request.headers && request.headers.cookie) {
      _cookies = parse(request.headers.cookie);
    }
    return new __cookies({
      _cookies,
      TTL: opts.TTL,
      runOnServer: opts.runOnServer,
      response,
      allowQueryStringCookies: opts.allowQueryStringCookies
    });
  }
  throw new Meteor.Error(400, 'Can\'t use middleware when `runOnServer` is false.');
};

/*
 * @locus Anywhere
 * @class Cookies
 * @param opts {Object}
 * @param opts.TTL {Number} - Default cookies expiration time (max-age) in milliseconds, by default - session (false)
 * @param opts.auto {Boolean} - [Server] Auto-bind in middleware as `req.Cookies`, by default `true`
 * @param opts.handler {Function} - [Server] Middleware handler
 * @param opts.runOnServer {Boolean} - Expose Cookies class to Server
 * @param opts.allowQueryStringCookies {Boolean} - Allow passing Cookies in a query string (in URL). Primary should be used only in Cordova environment
 * @param opts.allowedCordovaOrigins {Regex|Boolean} - [Server] Allow setting Cookies from that specific origin which in Meteor/Cordova is localhost:12XXX (^http://localhost:12[0-9]{3}$)
 * @summary Main Cookie class
 */
class Cookies extends __cookies {
  constructor() {
    let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    opts.TTL = helpers.isNumber(opts.TTL) ? opts.TTL : false;
    opts.runOnServer = opts.runOnServer !== false ? true : false;
    opts.allowQueryStringCookies = opts.allowQueryStringCookies !== true ? false : true;
    if (Meteor.isClient) {
      opts._cookies = document.cookie;
      super(opts);
    } else {
      opts._cookies = {};
      super(opts);
      opts.auto = opts.auto !== false ? true : false;
      this.opts = opts;
      this.handler = helpers.isFunction(opts.handler) ? opts.handler : false;
      this.onCookies = helpers.isFunction(opts.onCookies) ? opts.onCookies : false;
      if (opts.runOnServer && !Cookies.isLoadedOnServer) {
        Cookies.isLoadedOnServer = true;
        if (opts.auto) {
          WebApp.connectHandlers.use((req, res, next) => {
            if (urlRE.test(req._parsedUrl.path)) {
              const matchedCordovaOrigin = !!req.headers.origin && this.allowedCordovaOrigins && this.allowedCordovaOrigins.test(req.headers.origin);
              const matchedOrigin = matchedCordovaOrigin || !!req.headers.origin && this.originRE.test(req.headers.origin);
              if (matchedOrigin) {
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
              }
              const cookiesArray = [];
              let cookiesObject = {};
              if (matchedCordovaOrigin && opts.allowQueryStringCookies && req.query.___cookies___) {
                cookiesObject = parse(decodeURIComponent(req.query.___cookies___));
              } else if (req.headers.cookie) {
                cookiesObject = parse(req.headers.cookie);
              }
              const cookiesKeys = Object.keys(cookiesObject);
              if (cookiesKeys.length) {
                for (let i = 0; i < cookiesKeys.length; i++) {
                  const {
                    cookieString
                  } = serialize(cookiesKeys[i], cookiesObject[cookiesKeys[i]]);
                  if (!cookiesArray.includes(cookieString)) {
                    cookiesArray.push(cookieString);
                  }
                }
                if (cookiesArray.length) {
                  res.setHeader('Set-Cookie', cookiesArray);
                }
              }
              helpers.isFunction(this.onCookies) && this.onCookies(__middlewareHandler(req, res, opts));
              res.writeHead(200);
              res.end('');
            } else {
              req.Cookies = __middlewareHandler(req, res, opts);
              helpers.isFunction(this.handler) && this.handler(req.Cookies);
              next();
            }
          });
        }
      }
    }
  }

  /*
   * @locus Server
   * @memberOf Cookies
   * @name middleware
   * @summary Get Cookies instance into callback
   * @returns {void}
   */
  middleware() {
    if (!Meteor.isServer) {
      throw new Meteor.Error(500, '[ostrio:cookies] Can\'t use `.middleware()` on Client, it\'s Server only!');
    }
    return (req, res, next) => {
      helpers.isFunction(this.handler) && this.handler(__middlewareHandler(req, res, this.opts));
      next();
    };
  }
}
if (Meteor.isServer) {
  Cookies.isLoadedOnServer = false;
}

/* Export the Cookies class */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/ostrio:cookies/cookies.js");

/* Exports */
Package._define("ostrio:cookies", exports);

})();

//# sourceURL=meteor://💻app/packages/ostrio_cookies.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmNvb2tpZXMvY29va2llcy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJDb29raWVzIiwiTWV0ZW9yIiwibGluayIsInYiLCJmZXRjaCIsIldlYkFwcCIsImlzU2VydmVyIiwicmVxdWlyZSIsIk5vT3AiLCJ1cmxSRSIsInJvb3RVcmwiLCJwcm9jZXNzIiwiZW52IiwiUk9PVF9VUkwiLCJ3aW5kb3ciLCJfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fIiwibWV0ZW9yRW52IiwibW9iaWxlUm9vdFVybCIsIk1PQklMRV9ST09UX1VSTCIsImhlbHBlcnMiLCJpc1VuZGVmaW5lZCIsIm9iaiIsImlzQXJyYXkiLCJBcnJheSIsImNsb25lIiwiaXNPYmplY3QiLCJzbGljZSIsIk9iamVjdCIsImFzc2lnbiIsIl9oZWxwZXJzIiwiaSIsImxlbmd0aCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImRlY29kZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImVuY29kZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInBhaXJTcGxpdFJlZ0V4cCIsImZpZWxkQ29udGVudFJlZ0V4cCIsInRyeURlY29kZSIsInN0ciIsImQiLCJlIiwicGFyc2UiLCJvcHRpb25zIiwiRXJyb3IiLCJvcHQiLCJ2YWwiLCJrZXkiLCJlcUluZHgiLCJzcGxpdCIsImZvckVhY2giLCJwYWlyIiwiaW5kZXhPZiIsInN1YnN0ciIsInRyaW0iLCJ1bmVzY2FwZSIsImFudGlDaXJjdWxhciIsIl9vYmoiLCJvYmplY3QiLCJjYWNoZSIsIk1hcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWx1ZSIsImdldCIsInNldCIsInNlcmlhbGl6ZSIsIm5hbWUiLCJ0ZXN0IiwiZXNjYXBlIiwic2FuaXRpemVkVmFsdWUiLCJzdHJpbmdpZmllZCIsInBhaXJzIiwiaXNOdW1iZXIiLCJtYXhBZ2UiLCJwdXNoIiwiZG9tYWluIiwicGF0aCIsImV4cGlyZXMiLCJleHBpcmUiLCJJbmZpbml0eSIsIkRhdGUiLCJ0b1VUQ1N0cmluZyIsImh0dHBPbmx5Iiwic2VjdXJlIiwiZmlyc3RQYXJ0eU9ubHkiLCJzYW1lU2l0ZSIsImNvb2tpZVN0cmluZyIsImpvaW4iLCJpc1N0cmluZ2lmaWVkUmVnRXgiLCJpc1R5cGVkUmVnRXgiLCJkZXNlcmlhbGl6ZSIsInN0cmluZyIsIm1hdGNoIiwiY29uc29sZSIsImVycm9yIiwiX19jb29raWVzIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiX19wZW5kaW5nQ29va2llcyIsIlRUTCIsInJlc3BvbnNlIiwicnVuT25TZXJ2ZXIiLCJhbGxvd1F1ZXJ5U3RyaW5nQ29va2llcyIsImFsbG93ZWRDb3Jkb3ZhT3JpZ2lucyIsIm9yaWdpblJFIiwiUmVnRXhwIiwiX2Nvb2tpZXMiLCJjb29raWVzIiwiX3RtcCIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiaXNDbGllbnQiLCJkb2N1bWVudCIsImNvb2tpZSIsInNldEhlYWRlciIsInJlbW92ZSIsImtleXMiLCJoYXMiLCJzZW5kIiwiY2IiLCJST09UX1VSTF9QQVRIX1BSRUZJWCIsInF1ZXJ5IiwiaXNDb3Jkb3ZhIiwiY29va2llc0tleXMiLCJjb29raWVzQXJyYXkiLCJpbmNsdWRlcyIsImFic29sdXRlVXJsIiwiY3JlZGVudGlhbHMiLCJ0eXBlIiwidGhlbiIsImNhdGNoIiwiX19taWRkbGV3YXJlSGFuZGxlciIsInJlcXVlc3QiLCJoZWFkZXJzIiwiYXV0byIsImhhbmRsZXIiLCJpc0Z1bmN0aW9uIiwib25Db29raWVzIiwiaXNMb2FkZWRPblNlcnZlciIsImNvbm5lY3RIYW5kbGVycyIsInVzZSIsInJlcSIsInJlcyIsIm5leHQiLCJfcGFyc2VkVXJsIiwibWF0Y2hlZENvcmRvdmFPcmlnaW4iLCJvcmlnaW4iLCJtYXRjaGVkT3JpZ2luIiwiY29va2llc09iamVjdCIsIl9fX2Nvb2tpZXNfX18iLCJ3cml0ZUhlYWQiLCJlbmQiLCJtaWRkbGV3YXJlIl0sIm1hcHBp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akosT0FBTyxDQUFDO2NBQzdEbUosSUFBSSxFQUFFO1lBQ1I7VUFDRixDQUFDLENBQUM7UUFDSjtNQUNGO0lBQ0Y7RUFDRjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFUyxVQUFVLEdBQUc7SUFDWCxJQUFJLENBQUMzSixNQUFNLENBQUNLLFFBQVEsRUFBRTtNQUNwQixNQUFNLElBQUlMLE1BQU0sQ0FBQzhDLEtBQUssQ0FBQyxHQUFHLEVBQUUsMkVBQTJFLENBQUM7SUFDMUc7SUFFQSxPQUFPLENBQUNrRyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxLQUFLO01BQ3pCaEksT0FBTyxDQUFDeUgsVUFBVSxDQUFDLElBQUksQ0FBQ0QsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDQSxPQUFPLENBQUNKLG1CQUFtQixDQUFDVSxHQUFHLEVBQUVDLEdBQUcsRUFBRSxJQUFJLENBQUM3QyxJQUFJLENBQUMsQ0FBQztNQUMxRjhDLElBQUksRUFBRTtJQUNSLENBQUM7RUFDSDtBQUNGO0FBRUEsSUFBSWxKLE1BQU0sQ0FBQ0ssUUFBUSxFQUFFO0VBQ25CTixPQUFPLENBQUM4SSxnQkFBZ0IsR0FBRyxLQUFLO0FBQ2xDOztBQUVBLDhCIiwiZmlsZSI6Ii9wYWNrYWdlcy9vc3RyaW9fY29va2llcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG5sZXQgZmV0Y2g7XG5sZXQgV2ViQXBwO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gIFdlYkFwcCA9IHJlcXVpcmUoJ21ldGVvci93ZWJhcHAnKS5XZWJBcHA7XG59IGVsc2Uge1xuICBmZXRjaCA9IHJlcXVpcmUoJ21ldGVvci9mZXRjaCcpLmZldGNoO1xufVxuXG5jb25zdCBOb09wICA9ICgpID0+IHt9O1xuY29uc3QgdXJsUkUgPSAvXFwvX19fY29va2llX19fXFwvc2V0LztcbmNvbnN0IHJvb3RVcmwgPSBNZXRlb3IuaXNTZXJ2ZXIgPyBwcm9jZXNzLmVudi5ST09UX1VSTCA6ICh3aW5kb3cuX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5ST09UX1VSTCB8fCB3aW5kb3cuX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5tZXRlb3JFbnYuUk9PVF9VUkwgfHwgZmFsc2UpO1xuY29uc3QgbW9iaWxlUm9vdFVybCA9IE1ldGVvci5pc1NlcnZlciA/IHByb2Nlc3MuZW52Lk1PQklMRV9ST09UX1VSTCA6ICh3aW5kb3cuX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5NT0JJTEVfUk9PVF9VUkwgfHwgd2luZG93Ll9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18ubWV0ZW9yRW52Lk1PQklMRV9ST09UX1VSTCB8fCBmYWxzZSk7XG5cbmNvbnN0IGhlbHBlcnMgPSB7XG4gIGlzVW5kZWZpbmVkKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHZvaWQgMDtcbiAgfSxcbiAgaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xuICB9LFxuICBjbG9uZShvYmopIHtcbiAgICBpZiAoIXRoaXMuaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gdGhpcy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IE9iamVjdC5hc3NpZ24oe30sIG9iaik7XG4gIH1cbn07XG5jb25zdCBfaGVscGVycyA9IFsnTnVtYmVyJywgJ09iamVjdCcsICdGdW5jdGlvbiddO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBfaGVscGVycy5sZW5ndGg7IGkrKykge1xuICBoZWxwZXJzWydpcycgKyBfaGVscGVyc1tpXV0gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCAnICsgX2hlbHBlcnNbaV0gKyAnXSc7XG4gIH07XG59XG5cbi8qXG4gKiBAdXJsIGh0dHBzOi8vZ2l0aHViLmNvbS9qc2h0dHAvY29va2llL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4gKiBAbmFtZSBjb29raWVcbiAqIEBhdXRob3IganNodHRwXG4gKiBAbGljZW5zZVxuICogKFRoZSBNSVQgTGljZW5zZSlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNCBSb21hbiBTaHR5bG1hbiA8c2h0eWxtYW5AZ21haWwuY29tPlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uIDxkb3VnQHNvbWV0aGluZ2RvdWcuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuICogYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4gKiAnU29mdHdhcmUnKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4gKiB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4gKiBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbiAqIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuICogdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gKiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuICogTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuICogSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbiAqIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG4gKiBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuICogU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKi9cbmNvbnN0IGRlY29kZSA9IGRlY29kZVVSSUNvbXBvbmVudDtcbmNvbnN0IGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcbmNvbnN0IHBhaXJTcGxpdFJlZ0V4cCA9IC87ICovO1xuXG4vKlxuICogUmVnRXhwIHRvIG1hdGNoIGZpZWxkLWNvbnRlbnQgaW4gUkZDIDcyMzAgc2VjIDMuMlxuICpcbiAqIGZpZWxkLWNvbnRlbnQgPSBmaWVsZC12Y2hhciBbIDEqKCBTUCAvIEhUQUIgKSBmaWVsZC12Y2hhciBdXG4gKiBmaWVsZC12Y2hhciAgID0gVkNIQVIgLyBvYnMtdGV4dFxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcbiAqL1xuY29uc3QgZmllbGRDb250ZW50UmVnRXhwID0gL15bXFx1MDAwOVxcdTAwMjAtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl0rJC87XG5cbi8qXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIHRyeURlY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtGdW5jdGlvbn0gZFxuICogQHN1bW1hcnkgVHJ5IGRlY29kaW5nIGEgc3RyaW5nIHVzaW5nIGEgZGVjb2RpbmcgZnVuY3Rpb24uXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0cnlEZWNvZGUgPSAoc3RyLCBkKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGQoc3RyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn07XG5cbi8qXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIHBhcnNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc3VtbWFyeVxuICogUGFyc2UgYSBjb29raWUgaGVhZGVyLlxuICogUGFyc2UgdGhlIGdpdmVuIGNvb2tpZSBoZWFkZXIgc3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKiBUaGUgb2JqZWN0IGhhcyB0aGUgdmFyaW91cyBjb29raWVzIGFzIGtleXMobmFtZXMpID0+IHZhbHVlc1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgcGFyc2UgPSAoc3RyLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDA0LCAnYXJndW1lbnQgc3RyIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgbGV0IHZhbDtcbiAgbGV0IGtleTtcbiAgbGV0IGVxSW5keDtcblxuICBzdHIuc3BsaXQocGFpclNwbGl0UmVnRXhwKS5mb3JFYWNoKChwYWlyKSA9PiB7XG4gICAgZXFJbmR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgaWYgKGVxSW5keCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAga2V5ID0gcGFpci5zdWJzdHIoMCwgZXFJbmR4KS50cmltKCk7XG4gICAga2V5ID0gdHJ5RGVjb2RlKHVuZXNjYXBlKGtleSksIChvcHQuZGVjb2RlIHx8IGRlY29kZSkpO1xuICAgIHZhbCA9IHBhaXIuc3Vic3RyKCsrZXFJbmR4LCBwYWlyLmxlbmd0aCkudHJpbSgpO1xuICAgIGlmICh2YWxbMF0gPT09ICdcIicpIHtcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIGlmICh2b2lkIDAgPT09IG9ialtrZXldKSB7XG4gICAgICBvYmpba2V5XSA9IHRyeURlY29kZSh2YWwsIChvcHQuZGVjb2RlIHx8IGRlY29kZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG4vKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBhbnRpQ2lyY3VsYXJcbiAqIEBwYXJhbSBkYXRhIHtPYmplY3R9IC0gQ2lyY3VsYXIgb3IgYW55IG90aGVyIG9iamVjdCB3aGljaCBuZWVkcyB0byBiZSBub24tY2lyY3VsYXJcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGFudGlDaXJjdWxhciA9IChfb2JqKSA9PiB7XG4gIGNvbnN0IG9iamVjdCA9IGhlbHBlcnMuY2xvbmUoX29iaik7XG4gIGNvbnN0IGNhY2hlICA9IG5ldyBNYXAoKTtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgKGtleSwgdmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGNhY2hlLmdldCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIGNhY2hlLnNldCh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSk7XG59O1xuXG4vKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBzZXJpYWxpemVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHsgY29va2llU3RyaW5nOiBTdHJpbmcsIHNhbml0aXplZFZhbHVlOiBNaXhlZCB9XG4gKiBAc3VtbWFyeVxuICogU2VyaWFsaXplIGRhdGEgaW50byBhIGNvb2tpZSBoZWFkZXIuXG4gKiBTZXJpYWxpemUgdGhlIGEgbmFtZSB2YWx1ZSBwYWlyIGludG8gYSBjb29raWUgc3RyaW5nIHN1aXRhYmxlIGZvclxuICogaHR0cCBoZWFkZXJzLiBBbiBvcHRpb25hbCBvcHRpb25zIG9iamVjdCBzcGVjaWZpZWQgY29va2llIHBhcmFtZXRlcnMuXG4gKiBzZXJpYWxpemUoJ2ZvbycsICdiYXInLCB7IGh0dHBPbmx5OiB0cnVlIH0pID0+IFwiZm9vPWJhcjsgaHR0cE9ubHlcIlxuICogQHByaXZhdGVcbiAqL1xuY29uc3Qgc2VyaWFsaXplID0gKGtleSwgdmFsLCBvcHQgPSB7fSkgPT4ge1xuICBsZXQgbmFtZTtcblxuICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KGtleSkpIHtcbiAgICBuYW1lID0gZXNjYXBlKGtleSk7XG4gIH0gZWxzZSB7XG4gICAgbmFtZSA9IGtleTtcbiAgfVxuXG4gIGxldCBzYW5pdGl6ZWRWYWx1ZSA9IHZhbDtcbiAgbGV0IHZhbHVlID0gdmFsO1xuICBpZiAoIWhlbHBlcnMuaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgaWYgKGhlbHBlcnMuaXNPYmplY3QodmFsdWUpIHx8IGhlbHBlcnMuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHN0cmluZ2lmaWVkID0gYW50aUNpcmN1bGFyKHZhbHVlKTtcbiAgICAgIHZhbHVlID0gZW5jb2RlKGBKU09OLnBhcnNlKCR7c3RyaW5naWZpZWR9KWApO1xuICAgICAgc2FuaXRpemVkVmFsdWUgPSBKU09OLnBhcnNlKHN0cmluZ2lmaWVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBlbmNvZGUodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlICYmICFmaWVsZENvbnRlbnRSZWdFeHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBlc2NhcGUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9ICcnO1xuICB9XG5cbiAgY29uc3QgcGFpcnMgPSBbYCR7bmFtZX09JHt2YWx1ZX1gXTtcblxuICBpZiAoaGVscGVycy5pc051bWJlcihvcHQubWF4QWdlKSkge1xuICAgIHBhaXJzLnB1c2goYE1heC1BZ2U9JHtvcHQubWF4QWdlfWApO1xuICB9XG5cbiAgaWYgKG9wdC5kb21haW4gJiYgdHlwZW9mIG9wdC5kb21haW4gPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChvcHQuZG9tYWluKSkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDQsICdvcHRpb24gZG9tYWluIGlzIGludmFsaWQnKTtcbiAgICB9XG4gICAgcGFpcnMucHVzaChgRG9tYWluPSR7b3B0LmRvbWFpbn1gKTtcbiAgfVxuXG4gIGlmIChvcHQucGF0aCAmJiB0eXBlb2Ygb3B0LnBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChvcHQucGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDA0LCAnb3B0aW9uIHBhdGggaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgICBwYWlycy5wdXNoKGBQYXRoPSR7b3B0LnBhdGh9YCk7XG4gIH0gZWxzZSB7XG4gICAgcGFpcnMucHVzaCgnUGF0aD0vJyk7XG4gIH1cblxuICBvcHQuZXhwaXJlcyA9IG9wdC5leHBpcmVzIHx8IG9wdC5leHBpcmUgfHwgZmFsc2U7XG4gIGlmIChvcHQuZXhwaXJlcyA9PT0gSW5maW5pdHkpIHtcbiAgICBwYWlycy5wdXNoKCdFeHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UJyk7XG4gIH0gZWxzZSBpZiAob3B0LmV4cGlyZXMgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcGFpcnMucHVzaChgRXhwaXJlcz0ke29wdC5leHBpcmVzLnRvVVRDU3RyaW5nKCl9YCk7XG4gIH0gZWxzZSBpZiAob3B0LmV4cGlyZXMgPT09IDApIHtcbiAgICBwYWlycy5wdXNoKCdFeHBpcmVzPTAnKTtcbiAgfSBlbHNlIGlmIChoZWxwZXJzLmlzTnVtYmVyKG9wdC5leHBpcmVzKSkge1xuICAgIHBhaXJzLnB1c2goYEV4cGlyZXM9JHsobmV3IERhdGUob3B0LmV4cGlyZXMpKS50b1VUQ1N0cmluZygpfWApO1xuICB9XG5cbiAgaWYgKG9wdC5odHRwT25seSkge1xuICAgIHBhaXJzLnB1c2goJ0h0dHBPbmx5Jyk7XG4gIH1cblxuICBpZiAob3B0LnNlY3VyZSkge1xuICAgIHBhaXJzLnB1c2goJ1NlY3VyZScpO1xuICB9XG5cbiAgaWYgKG9wdC5maXJzdFBhcnR5T25seSkge1xuICAgIHBhaXJzLnB1c2goJ0ZpcnN0LVBhcnR5LU9ubHknKTtcbiAgfVxuXG4gIGlmIChvcHQuc2FtZVNpdGUpIHtcbiAgICBwYWlycy5wdXNoKG9wdC5zYW1lU2l0ZSA9PT0gdHJ1ZSA/ICdTYW1lU2l0ZScgOiBgU2FtZVNpdGU9JHtvcHQuc2FtZVNpdGV9YCk7XG4gIH1cblxuICByZXR1cm4geyBjb29raWVTdHJpbmc6IHBhaXJzLmpvaW4oJzsgJyksIHNhbml0aXplZFZhbHVlIH07XG59O1xuXG5jb25zdCBpc1N0cmluZ2lmaWVkUmVnRXggPSAvSlNPTlxcLnBhcnNlXFwoKC4qKVxcKS87XG5jb25zdCBpc1R5cGVkUmVnRXggPSAvZmFsc2V8dHJ1ZXxudWxsLztcbmNvbnN0IGRlc2VyaWFsaXplID0gKHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5naWZpZWRSZWdFeC50ZXN0KHN0cmluZykpIHtcbiAgICBsZXQgb2JqID0gc3RyaW5nLm1hdGNoKGlzU3RyaW5naWZpZWRSZWdFeClbMV07XG4gICAgaWYgKG9iaikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlKG9iaikpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbb3N0cmlvOmNvb2tpZXNdIFsuZ2V0KCldIFtkZXNlcmlhbGl6ZSgpXSBFeGNlcHRpb246JywgZSwgc3RyaW5nLCBvYmopO1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9IGVsc2UgaWYgKGlzVHlwZWRSZWdFeC50ZXN0KHN0cmluZykpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyaW5nO1xufTtcblxuLypcbiAqIEBsb2N1cyBBbnl3aGVyZVxuICogQGNsYXNzIF9fY29va2llc1xuICogQHBhcmFtIG9wdHMge09iamVjdH0gLSBPcHRpb25zIChjb25maWd1cmF0aW9uKSBvYmplY3RcbiAqIEBwYXJhbSBvcHRzLl9jb29raWVzIHtPYmplY3R8U3RyaW5nfSAtIEN1cnJlbnQgY29va2llcyBhcyBTdHJpbmcgb3IgT2JqZWN0XG4gKiBAcGFyYW0gb3B0cy5UVEwge051bWJlcnxCb29sZWFufSAtIERlZmF1bHQgY29va2llcyBleHBpcmF0aW9uIHRpbWUgKG1heC1hZ2UpIGluIG1pbGxpc2Vjb25kcywgYnkgZGVmYXVsdCAtIHNlc3Npb24gKGZhbHNlKVxuICogQHBhcmFtIG9wdHMucnVuT25TZXJ2ZXIge0Jvb2xlYW59IC0gRXhwb3NlIENvb2tpZXMgY2xhc3MgdG8gU2VydmVyXG4gKiBAcGFyYW0gb3B0cy5yZXNwb25zZSB7aHR0cC5TZXJ2ZXJSZXNwb25zZXxPYmplY3R9IC0gVGhpcyBvYmplY3QgaXMgY3JlYXRlZCBpbnRlcm5hbGx5IGJ5IGEgSFRUUCBzZXJ2ZXJcbiAqIEBwYXJhbSBvcHRzLmFsbG93UXVlcnlTdHJpbmdDb29raWVzIHtCb29sZWFufSAtIEFsbG93IHBhc3NpbmcgQ29va2llcyBpbiBhIHF1ZXJ5IHN0cmluZyAoaW4gVVJMKS4gUHJpbWFyeSBzaG91bGQgYmUgdXNlZCBvbmx5IGluIENvcmRvdmEgZW52aXJvbm1lbnRcbiAqIEBwYXJhbSBvcHRzLmFsbG93ZWRDb3Jkb3ZhT3JpZ2lucyB7UmVnZXh8Qm9vbGVhbn0gLSBbU2VydmVyXSBBbGxvdyBzZXR0aW5nIENvb2tpZXMgZnJvbSB0aGF0IHNwZWNpZmljIG9yaWdpbiB3aGljaCBpbiBNZXRlb3IvQ29yZG92YSBpcyBsb2NhbGhvc3Q6MTJYWFggKF5odHRwOi8vbG9jYWxob3N0OjEyWzAtOV17M30kKVxuICogQHN1bW1hcnkgSW50ZXJuYWwgQ2xhc3NcbiAqL1xuY2xhc3MgX19jb29raWVzIHtcbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHRoaXMuX19wZW5kaW5nQ29va2llcyA9IFtdO1xuICAgIHRoaXMuVFRMID0gb3B0cy5UVEwgfHwgZmFsc2U7XG4gICAgdGhpcy5yZXNwb25zZSA9IG9wdHMucmVzcG9uc2UgfHwgZmFsc2U7XG4gICAgdGhpcy5ydW5PblNlcnZlciA9IG9wdHMucnVuT25TZXJ2ZXIgfHwgZmFsc2U7XG4gICAgdGhpcy5hbGxvd1F1ZXJ5U3RyaW5nQ29va2llcyA9IG9wdHMuYWxsb3dRdWVyeVN0cmluZ0Nvb2tpZXMgfHwgZmFsc2U7XG4gICAgdGhpcy5hbGxvd2VkQ29yZG92YU9yaWdpbnMgPSBvcHRzLmFsbG93ZWRDb3Jkb3ZhT3JpZ2lucyB8fCBmYWxzZTtcblxuICAgIGlmICh0aGlzLmFsbG93ZWRDb3Jkb3ZhT3JpZ2lucyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5hbGxvd2VkQ29yZG92YU9yaWdpbnMgPSAvXmh0dHA6XFwvXFwvbG9jYWxob3N0OjEyWzAtOV17M30kLztcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdpblJFID0gbmV3IFJlZ0V4cChgXmh0dHBzPzpcXC9cXC8oJHtyb290VXJsID8gcm9vdFVybCA6ICcnfSR7bW9iaWxlUm9vdFVybCA/ICgnfCcgKyBtb2JpbGVSb290VXJsKSA6ICcnfSkkYCk7XG5cbiAgICBpZiAoaGVscGVycy5pc09iamVjdChvcHRzLl9jb29raWVzKSkge1xuICAgICAgdGhpcy5jb29raWVzID0gb3B0cy5fY29va2llcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb29raWVzID0gcGFyc2Uob3B0cy5fY29va2llcyk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBfX2Nvb2tpZXNcbiAgICogQG5hbWUgZ2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgIC0gVGhlIG5hbWUgb2YgdGhlIGNvb2tpZSB0byByZWFkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBfdG1wIC0gVW5wYXJzZWQgc3RyaW5nIGluc3RlYWQgb2YgdXNlcidzIGNvb2tpZXNcbiAgICogQHN1bW1hcnkgUmVhZCBhIGNvb2tpZS4gSWYgdGhlIGNvb2tpZSBkb2Vzbid0IGV4aXN0IGEgbnVsbCB2YWx1ZSB3aWxsIGJlIHJldHVybmVkLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfHZvaWR9XG4gICAqL1xuICBnZXQoa2V5LCBfdG1wKSB7XG4gICAgY29uc3QgY29va2llU3RyaW5nID0gX3RtcCA/IHBhcnNlKF90bXApIDogdGhpcy5jb29raWVzO1xuICAgIGlmICgha2V5IHx8ICFjb29raWVTdHJpbmcpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgaWYgKGNvb2tpZVN0cmluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm4gZGVzZXJpYWxpemUoY29va2llU3RyaW5nW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIF9fY29va2llc1xuICAgKiBAbmFtZSBzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAgIC0gVGhlIG5hbWUgb2YgdGhlIGNvb2tpZSB0byBjcmVhdGUvb3ZlcndyaXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSAtIFRoZSB2YWx1ZSBvZiB0aGUgY29va2llXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzICAtIFtPcHRpb25hbF0gQ29va2llIG9wdGlvbnMgKHNlZSByZWFkbWUgZG9jcylcbiAgICogQHN1bW1hcnkgQ3JlYXRlL292ZXJ3cml0ZSBhIGNvb2tpZS5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBzZXQoa2V5LCB2YWx1ZSwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKGtleSAmJiAhaGVscGVycy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgIGlmIChoZWxwZXJzLmlzTnVtYmVyKHRoaXMuVFRMKSAmJiBvcHRzLmV4cGlyZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRzLmV4cGlyZXMgPSBuZXcgRGF0ZSgrbmV3IERhdGUoKSArIHRoaXMuVFRMKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgY29va2llU3RyaW5nLCBzYW5pdGl6ZWRWYWx1ZSB9ID0gc2VyaWFsaXplKGtleSwgdmFsdWUsIG9wdHMpO1xuXG4gICAgICB0aGlzLmNvb2tpZXNba2V5XSA9IHNhbml0aXplZFZhbHVlO1xuICAgICAgaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWVTdHJpbmc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fX3BlbmRpbmdDb29raWVzLnB1c2goY29va2llU3RyaW5nKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZS5zZXRIZWFkZXIoJ1NldC1Db29raWUnLCB0aGlzLl9fcGVuZGluZ0Nvb2tpZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgX19jb29raWVzXG4gICAqIEBuYW1lIHJlbW92ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5ICAgIC0gVGhlIG5hbWUgb2YgdGhlIGNvb2tpZSB0byBjcmVhdGUvb3ZlcndyaXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoICAgLSBbT3B0aW9uYWxdIFRoZSBwYXRoIGZyb20gd2hlcmUgdGhlIGNvb2tpZSB3aWxsIGJlXG4gICAqIHJlYWRhYmxlLiBFLmcuLCBcIi9cIiwgXCIvbXlkaXJcIjsgaWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gdGhlIGN1cnJlbnRcbiAgICogcGF0aCBvZiB0aGUgY3VycmVudCBkb2N1bWVudCBsb2NhdGlvbiAoc3RyaW5nIG9yIG51bGwpLiBUaGUgcGF0aCBtdXN0IGJlXG4gICAqIGFic29sdXRlIChzZWUgUkZDIDI5NjUpLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBob3cgdG8gdXNlIHJlbGF0aXZlIHBhdGhzXG4gICAqIGluIHRoaXMgYXJndW1lbnQsIHNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL2RvY3VtZW50LmNvb2tpZSNVc2luZ19yZWxhdGl2ZV9VUkxzX2luX3RoZV9wYXRoX3BhcmFtZXRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIC0gW09wdGlvbmFsXSBUaGUgZG9tYWluIGZyb20gd2hlcmUgdGhlIGNvb2tpZSB3aWxsXG4gICAqIGJlIHJlYWRhYmxlLiBFLmcuLCBcImV4YW1wbGUuY29tXCIsIFwiLmV4YW1wbGUuY29tXCIgKGluY2x1ZGVzIGFsbCBzdWJkb21haW5zKVxuICAgKiBvciBcInN1YmRvbWFpbi5leGFtcGxlLmNvbVwiOyBpZiBub3Qgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byB0aGUgaG9zdCBwb3J0aW9uXG4gICAqIG9mIHRoZSBjdXJyZW50IGRvY3VtZW50IGxvY2F0aW9uIChzdHJpbmcgb3IgbnVsbCkuXG4gICAqIEBzdW1tYXJ5IFJlbW92ZSBhIGNvb2tpZShzKS5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICByZW1vdmUoa2V5LCBwYXRoID0gJy8nLCBkb21haW4gPSAnJykge1xuICAgIGlmIChrZXkgJiYgdGhpcy5jb29raWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnN0IHsgY29va2llU3RyaW5nIH0gPSBzZXJpYWxpemUoa2V5LCAnJywge1xuICAgICAgICBkb21haW4sXG4gICAgICAgIHBhdGgsXG4gICAgICAgIGV4cGlyZXM6IG5ldyBEYXRlKDApXG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHRoaXMuY29va2llc1trZXldO1xuICAgICAgaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWVTdHJpbmc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5yZXNwb25zZS5zZXRIZWFkZXIoJ1NldC1Db29raWUnLCBjb29raWVTdHJpbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICgha2V5ICYmIHRoaXMua2V5cygpLmxlbmd0aCA+IDAgJiYgdGhpcy5rZXlzKClbMF0gIT09ICcnKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb29raWVzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlbW92ZShrZXlzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIF9fY29va2llc1xuICAgKiBAbmFtZSBoYXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAgLSBUaGUgbmFtZSBvZiB0aGUgY29va2llIHRvIGNyZWF0ZS9vdmVyd3JpdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IF90bXAgLSBVbnBhcnNlZCBzdHJpbmcgaW5zdGVhZCBvZiB1c2VyJ3MgY29va2llc1xuICAgKiBAc3VtbWFyeSBDaGVjayB3aGV0aGVyIGEgY29va2llIGV4aXN0cyBpbiB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBoYXMoa2V5LCBfdG1wKSB7XG4gICAgY29uc3QgY29va2llU3RyaW5nID0gX3RtcCA/IHBhcnNlKF90bXApIDogdGhpcy5jb29raWVzO1xuICAgIGlmICgha2V5IHx8ICFjb29raWVTdHJpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29va2llU3RyaW5nLmhhc093blByb3BlcnR5KGtleSk7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIF9fY29va2llc1xuICAgKiBAbmFtZSBrZXlzXG4gICAqIEBzdW1tYXJ5IFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHJlYWRhYmxlIGNvb2tpZXMgZnJvbSB0aGlzIGxvY2F0aW9uLlxuICAgKiBAcmV0dXJucyB7W1N0cmluZ119XG4gICAqL1xuICBrZXlzKCkge1xuICAgIGlmICh0aGlzLmNvb2tpZXMpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvb2tpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQ2xpZW50XG4gICAqIEBtZW1iZXJPZiBfX2Nvb2tpZXNcbiAgICogQG5hbWUgc2VuZFxuICAgKiBAcGFyYW0gY2Ige0Z1bmN0aW9ufSAtIENhbGxiYWNrXG4gICAqIEBzdW1tYXJ5IFNlbmQgYWxsIGNvb2tpZXMgb3ZlciBYSFIgdG8gc2VydmVyLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHNlbmQoY2IgPSBOb09wKSB7XG4gICAgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgICAgY2IobmV3IE1ldGVvci5FcnJvcig0MDAsICdDYW5cXCd0IHJ1biBgLnNlbmQoKWAgb24gc2VydmVyLCBpdFxcJ3MgQ2xpZW50IG9ubHkgbWV0aG9kIScpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ydW5PblNlcnZlcikge1xuICAgICAgbGV0IHBhdGggPSBgJHt3aW5kb3cuX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5ST09UX1VSTF9QQVRIX1BSRUZJWCB8fCB3aW5kb3cuX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5tZXRlb3JFbnYuUk9PVF9VUkxfUEFUSF9QUkVGSVggfHwgJyd9L19fX2Nvb2tpZV9fXy9zZXRgO1xuICAgICAgbGV0IHF1ZXJ5ID0gJyc7XG5cbiAgICAgIGlmIChNZXRlb3IuaXNDb3Jkb3ZhICYmIHRoaXMuYWxsb3dRdWVyeVN0cmluZ0Nvb2tpZXMpIHtcbiAgICAgICAgY29uc3QgY29va2llc0tleXMgPSB0aGlzLmtleXMoKTtcbiAgICAgICAgY29uc3QgY29va2llc0FycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llc0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCB7IHNhbml0aXplZFZhbHVlIH0gPSBzZXJpYWxpemUoY29va2llc0tleXNbaV0sIHRoaXMuZ2V0KGNvb2tpZXNLZXlzW2ldKSk7XG4gICAgICAgICAgY29uc3QgcGFpciA9IGAke2Nvb2tpZXNLZXlzW2ldfT0ke3Nhbml0aXplZFZhbHVlfWA7XG4gICAgICAgICAgaWYgKCFjb29raWVzQXJyYXkuaW5jbHVkZXMocGFpcikpIHtcbiAgICAgICAgICAgIGNvb2tpZXNBcnJheS5wdXNoKHBhaXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb29raWVzQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgcGF0aCA9IE1ldGVvci5hYnNvbHV0ZVVybCgnX19fY29va2llX19fL3NldCcpO1xuICAgICAgICAgIHF1ZXJ5ID0gYD9fX19jb29raWVzX19fPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvb2tpZXNBcnJheS5qb2luKCc7ICcpKX1gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZldGNoKGAke3BhdGh9JHtxdWVyeX1gLCB7XG4gICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgIHR5cGU6ICdjb3JzJ1xuICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY2Iodm9pZCAwLCByZXNwb25zZSk7XG4gICAgICB9KS5jYXRjaChjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKG5ldyBNZXRlb3IuRXJyb3IoNDAwLCAnQ2FuXFwndCBzZW5kIGNvb2tpZXMgb24gc2VydmVyIHdoZW4gYHJ1bk9uU2VydmVyYCBpcyBmYWxzZS4nKSk7XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbn1cblxuLypcbiAqIEBmdW5jdGlvblxuICogQGxvY3VzIFNlcnZlclxuICogQHN1bW1hcnkgTWlkZGxld2FyZSBoYW5kbGVyXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBfX21pZGRsZXdhcmVIYW5kbGVyID0gKHJlcXVlc3QsIHJlc3BvbnNlLCBvcHRzKSA9PiB7XG4gIGxldCBfY29va2llcyA9IHt9O1xuICBpZiAob3B0cy5ydW5PblNlcnZlcikge1xuICAgIGlmIChyZXF1ZXN0LmhlYWRlcnMgJiYgcmVxdWVzdC5oZWFkZXJzLmNvb2tpZSkge1xuICAgICAgX2Nvb2tpZXMgPSBwYXJzZShyZXF1ZXN0LmhlYWRlcnMuY29va2llKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IF9fY29va2llcyh7XG4gICAgICBfY29va2llcyxcbiAgICAgIFRUTDogb3B0cy5UVEwsXG4gICAgICBydW5PblNlcnZlcjogb3B0cy5ydW5PblNlcnZlcixcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgYWxsb3dRdWVyeVN0cmluZ0Nvb2tpZXM6IG9wdHMuYWxsb3dRdWVyeVN0cmluZ0Nvb2tpZXNcbiAgICB9KTtcbiAgfVxuXG4gIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAwLCAnQ2FuXFwndCB1c2UgbWlkZGxld2FyZSB3aGVuIGBydW5PblNlcnZlcmAgaXMgZmFsc2UuJyk7XG59O1xuXG4vKlxuICogQGxvY3VzIEFueXdoZXJlXG4gKiBAY2xhc3MgQ29va2llc1xuICogQHBhcmFtIG9wdHMge09iamVjdH1cbiAqIEBwYXJhbSBvcHRzLlRUTCB7TnVtYmVyfSAtIERlZmF1bHQgY29va2llcyBleHBpcmF0aW9uIHRpbWUgKG1heC1hZ2UpIGluIG1pbGxpc2Vjb25kcywgYnkgZGVmYXVsdCAtIHNlc3Npb24gKGZhbHNlKVxuICogQHBhcmFtIG9wdHMuYXV0byB7Qm9vbGVhbn0gLSBbU2VydmVyXSBBdXRvLWJpbmQgaW4gbWlkZGxld2FyZSBhcyBgcmVxLkNvb2tpZXNgLCBieSBkZWZhdWx0IGB0cnVlYFxuICogQHBhcmFtIG9wdHMuaGFuZGxlciB7RnVuY3Rpb259IC0gW1NlcnZlcl0gTWlkZGxld2FyZSBoYW5kbGVyXG4gKiBAcGFyYW0gb3B0cy5ydW5PblNlcnZlciB7Qm9vbGVhbn0gLSBFeHBvc2UgQ29va2llcyBjbGFzcyB0byBTZXJ2ZXJcbiAqIEBwYXJhbSBvcHRzLmFsbG93UXVlcnlTdHJpbmdDb29raWVzIHtCb29sZWFufSAtIEFsbG93IHBhc3NpbmcgQ29va2llcyBpbiBhIHF1ZXJ5IHN0cmluZyAoaW4gVVJMKS4gUHJpbWFyeSBzaG91bGQgYmUgdXNlZCBvbmx5IGluIENvcmRvdmEgZW52aXJvbm1lbnRcbiAqIEBwYXJhbSBvcHRzLmFsbG93ZWRDb3Jkb3ZhT3JpZ2lucyB7UmVnZXh8Qm9vbGVhbn0gLSBbU2VydmVyXSBBbGxvdyBzZXR0aW5nIENvb2tpZXMgZnJvbSB0aGF0IHNwZWNpZmljIG9yaWdpbiB3aGljaCBpbiBNZXRlb3IvQ29yZG92YSBpcyBsb2NhbGhvc3Q6MTJYWFggKF5odHRwOi8vbG9jYWxob3N0OjEyWzAtOV17M30kKVxuICogQHN1bW1hcnkgTWFpbiBDb29raWUgY2xhc3NcbiAqL1xuY2xhc3MgQ29va2llcyBleHRlbmRzIF9fY29va2llcyB7XG4gIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgIG9wdHMuVFRMID0gaGVscGVycy5pc051bWJlcihvcHRzLlRUTCkgPyBvcHRzLlRUTCA6IGZhbHNlO1xuICAgIG9wdHMucnVuT25TZXJ2ZXIgPSAob3B0cy5ydW5PblNlcnZlciAhPT0gZmFsc2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIG9wdHMuYWxsb3dRdWVyeVN0cmluZ0Nvb2tpZXMgPSAob3B0cy5hbGxvd1F1ZXJ5U3RyaW5nQ29va2llcyAhPT0gdHJ1ZSkgPyBmYWxzZSA6IHRydWU7XG5cbiAgICBpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG4gICAgICBvcHRzLl9jb29raWVzID0gZG9jdW1lbnQuY29va2llO1xuICAgICAgc3VwZXIob3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdHMuX2Nvb2tpZXMgPSB7fTtcbiAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgb3B0cy5hdXRvID0gKG9wdHMuYXV0byAhPT0gZmFsc2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgIHRoaXMuaGFuZGxlciA9IGhlbHBlcnMuaXNGdW5jdGlvbihvcHRzLmhhbmRsZXIpID8gb3B0cy5oYW5kbGVyIDogZmFsc2U7XG4gICAgICB0aGlzLm9uQ29va2llcyA9IGhlbHBlcnMuaXNGdW5jdGlvbihvcHRzLm9uQ29va2llcykgPyBvcHRzLm9uQ29va2llcyA6IGZhbHNlO1xuXG4gICAgICBpZiAob3B0cy5ydW5PblNlcnZlciAmJiAhQ29va2llcy5pc0xvYWRlZE9uU2VydmVyKSB7XG4gICAgICAgIENvb2tpZXMuaXNMb2FkZWRPblNlcnZlciA9IHRydWU7XG4gICAgICAgIGlmIChvcHRzLmF1dG8pIHtcbiAgICAgICAgICBXZWJBcHAuY29ubmVjdEhhbmRsZXJzLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgICAgIGlmICh1cmxSRS50ZXN0KHJlcS5fcGFyc2VkVXJsLnBhdGgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRDb3Jkb3ZhT3JpZ2luID0gISFyZXEuaGVhZGVycy5vcmlnaW5cbiAgICAgICAgICAgICAgICAmJiB0aGlzLmFsbG93ZWRDb3Jkb3ZhT3JpZ2luc1xuICAgICAgICAgICAgICAgICYmIHRoaXMuYWxsb3dlZENvcmRvdmFPcmlnaW5zLnRlc3QocmVxLmhlYWRlcnMub3JpZ2luKTtcbiAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZE9yaWdpbiA9IG1hdGNoZWRDb3Jkb3ZhT3JpZ2luXG4gICAgICAgICAgICAgICAgfHwgKCEhcmVxLmhlYWRlcnMub3JpZ2luICYmIHRoaXMub3JpZ2luUkUudGVzdChyZXEuaGVhZGVycy5vcmlnaW4pKTtcblxuICAgICAgICAgICAgICBpZiAobWF0Y2hlZE9yaWdpbikge1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCByZXEuaGVhZGVycy5vcmlnaW4pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgY29va2llc0FycmF5ID0gW107XG4gICAgICAgICAgICAgIGxldCBjb29raWVzT2JqZWN0ID0ge307XG4gICAgICAgICAgICAgIGlmIChtYXRjaGVkQ29yZG92YU9yaWdpbiAmJiBvcHRzLmFsbG93UXVlcnlTdHJpbmdDb29raWVzICYmIHJlcS5xdWVyeS5fX19jb29raWVzX19fKSB7XG4gICAgICAgICAgICAgICAgY29va2llc09iamVjdCA9IHBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChyZXEucXVlcnkuX19fY29va2llc19fXykpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcS5oZWFkZXJzLmNvb2tpZSkge1xuICAgICAgICAgICAgICAgIGNvb2tpZXNPYmplY3QgPSBwYXJzZShyZXEuaGVhZGVycy5jb29raWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgY29va2llc0tleXMgPSBPYmplY3Qua2V5cyhjb29raWVzT2JqZWN0KTtcbiAgICAgICAgICAgICAgaWYgKGNvb2tpZXNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llc0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY29va2llU3RyaW5nIH0gPSBzZXJpYWxpemUoY29va2llc0tleXNbaV0sIGNvb2tpZXNPYmplY3RbY29va2llc0tleXNbaV1dKTtcbiAgICAgICAgICAgICAgICAgIGlmICghY29va2llc0FycmF5LmluY2x1ZGVzKGNvb2tpZVN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29va2llc0FycmF5LnB1c2goY29va2llU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29va2llc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignU2V0LUNvb2tpZScsIGNvb2tpZXNBcnJheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaGVscGVycy5pc0Z1bmN0aW9uKHRoaXMub25Db29raWVzKSAmJiB0aGlzLm9uQ29va2llcyhfX21pZGRsZXdhcmVIYW5kbGVyKHJlcSwgcmVzLCBvcHRzKSk7XG5cbiAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCgyMDApO1xuICAgICAgICAgICAgICByZXMuZW5kKCcnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlcS5Db29raWVzID0gX19taWRkbGV3YXJlSGFuZGxlcihyZXEsIHJlcywgb3B0cyk7XG4gICAgICAgICAgICAgIGhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmhhbmRsZXIpICYmIHRoaXMuaGFuZGxlcihyZXEuQ29va2llcyk7XG4gICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIENvb2tpZXNcbiAgICogQG5hbWUgbWlkZGxld2FyZVxuICAgKiBAc3VtbWFyeSBHZXQgQ29va2llcyBpbnN0YW5jZSBpbnRvIGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgbWlkZGxld2FyZSgpIHtcbiAgICBpZiAoIU1ldGVvci5pc1NlcnZlcikge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig1MDAsICdbb3N0cmlvOmNvb2tpZXNdIENhblxcJ3QgdXNlIGAubWlkZGxld2FyZSgpYCBvbiBDbGllbnQsIGl0XFwncyBTZXJ2ZXIgb25seSEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICBoZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5oYW5kbGVyKSAmJiB0aGlzLmhhbmRsZXIoX19taWRkbGV3YXJlSGFuZGxlcihyZXEsIHJlcywgdGhpcy5vcHRzKSk7XG4gICAgICBuZXh0KCk7XG4gICAgfTtcbiAgfVxufVxuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gIENvb2tpZXMuaXNMb2FkZWRPblNlcnZlciA9IGZhbHNlO1xufVxuXG4vKiBFeHBvcnQgdGhlIENvb2tpZXMgY2xhc3MgKi9cbmV4cG9ydCB7IENvb2tpZXMgfTtcbiJdfQ==
