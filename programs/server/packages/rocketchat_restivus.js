(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;
var Accounts = Package['accounts-base'].Accounts;

/* Package-scope variables */
var path, statusCode, headers, body;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:restivus":{"lib":{"restivus.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_restivus/lib/restivus.js                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
module.export({
  Restivus: () => Restivus
});
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }
}, 0);
let Users;
module.link("@rocket.chat/models", {
  Users(v) {
    Users = v;
  }
}, 1);
let Auth;
module.link("./auth", {
  Auth(v) {
    Auth = v;
  }
}, 2);
let Route;
module.link("./route", {
  Route(v) {
    Route = v;
  }
}, 3);
class Restivus {
  constructor(options) {
    this._routes = [];
    this._config = _objectSpread({
      paths: [],
      useDefaultAuth: false,
      apiPath: 'api/',
      version: null,
      prettyJson: false,
      auth: {
        token: 'services.resume.loginTokens.hashedToken',
        user() {
          let token;
          if (this.request.headers['x-auth-token']) {
            token = Accounts._hashLoginToken(this.request.headers['x-auth-token']);
          }
          return {
            userId: this.request.headers['x-user-id'],
            token
          };
        }
      },
      defaultHeaders: {
        'Content-Type': 'application/json'
      },
      enableCors: true
    }, options);
    if (this._config.enableCors) {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      };
      if (this._config.useDefaultAuth) {
        corsHeaders['Access-Control-Allow-Headers'] += ', X-User-Id, X-Auth-Token';
      }
      this._config.defaultHeaders = _objectSpread(_objectSpread({}, this._config.defaultHeaders), corsHeaders);
      if (!this._config.defaultOptionsEndpoint) {
        this._config.defaultOptionsEndpoint = function () {
          this.response.writeHead(200, corsHeaders);
          return this.done();
        };
      }
    }
    if (this._config.apiPath.startsWith('/')) {
      this._config.apiPath = this._config.apiPath.slice(1);
    }
    if (!this._config.apiPath.endsWith('/')) {
      this._config.apiPath = "".concat(this._config.apiPath, "/");
    }
    if (this._config.version) {
      this._config.apiPath += "".concat(this._config.version, "/");
    }
    if (this._config.useDefaultAuth) {
      this._initAuth();
    } else if (this._config.useAuth) {
      this._initAuth();
      console.warn('Warning: useAuth API config option will be removed in Restivus v1.0 \n    Use the useDefaultAuth option instead');
    }
  }

  /**
   	Add endpoints for the given HTTP methods at the given path
  		@param path {String} The extended URL path (will be appended to base path of the API)
  	@param options {Object} Route configuration options
  	@param options.authRequired {Boolean} The default auth requirement for each endpoint on the route
  	@param options.roleRequired {String or String[]} The default role required for each endpoint on the route
  	@param endpoints {Object} A set of endpoints available on the new route (get, post, put, patch, delete, options)
  	@param endpoints.<method> {Function or Object} If a function is provided, all default route
  		configuration options will be applied to the endpoint. Otherwise an object with an `action`
  		and all other route config options available. An `action` must be provided with the object.
  */

  addRoute(path, options, endpoints) {
    const route = new Route(this, path, options, endpoints);
    this._routes.push(route);
    route.addToApi();
    return this;
  }

  /*
  	Add /login and /logout endpoints to the API
  */

  _initAuth() {
    const self = this;

    /*
    	Add a login endpoint to the API
    		After the user is logged in, the onLoggedIn hook is called (see Restfully.configure() for
    	adding hook).
    */
    this.addRoute('login', {
      authRequired: false
    }, {
      post() {
        return Promise.asyncApply(() => {
          var _self$_config$onLogge;
          const user = {};
          if (this.bodyParams.user) {
            if (this.bodyParams.user.indexOf('@') === -1) {
              user.username = this.bodyParams.user;
            } else {
              user.email = this.bodyParams.user;
            }
          } else if (this.bodyParams.username) {
            user.username = this.bodyParams.username;
          } else if (this.bodyParams.email) {
            user.email = this.bodyParams.email;
          }
          let {
            password
          } = this.bodyParams;
          if (this.bodyParams.hashed) {
            password = {
              digest: password,
              algorithm: 'sha-256'
            };
          }
          let auth;
          try {
            auth = Promise.await(Auth.loginWithPassword(user, password));
          } catch (e) {
            return {
              statusCode: e.error
            };
          }
          if (auth.userId && auth.authToken) {
            var _this$user;
            const searchQuery = {};
            searchQuery[self._config.auth.token] = Accounts._hashLoginToken(auth.authToken);
            this.user = Promise.await(Users.findOne({
              _id: auth.userId
            }, searchQuery));
            this.userId = (_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user._id;
          }
          const response = {
            status: 'success',
            data: auth
          };
          const extraData = (_self$_config$onLogge = self._config.onLoggedIn) === null || _self$_config$onLogge === void 0 ? void 0 : _self$_config$onLogge.call(this);
          if (extraData != null) {
            Object.assign(response.data, {
              extra: extraData
            });
          }
          return response;
        });
      }
    });
    const logout = function () {
      return Promise.asyncApply(() => {
        var _self$_config$onLogge2;
        const authToken = this.request.headers['x-auth-token'];
        const hashedToken = Accounts._hashLoginToken(authToken);
        const tokenLocation = self._config.auth.token;
        const index = tokenLocation.lastIndexOf('.');
        const tokenPath = tokenLocation.substring(0, index);
        const tokenFieldName = tokenLocation.substring(index + 1);
        const tokenToRemove = {};
        tokenToRemove[tokenFieldName] = hashedToken;
        const tokenRemovalQuery = {};
        tokenRemovalQuery[tokenPath] = tokenToRemove;
        Promise.await(Users.updateOne({
          _id: this.user._id
        }, {
          $pull: tokenRemovalQuery
        }));
        const response = {
          status: 'success',
          data: {
            message: "You've been logged out!"
          }
        };
        const extraData = (_self$_config$onLogge2 = self._config.onLoggedOut) === null || _self$_config$onLogge2 === void 0 ? void 0 : _self$_config$onLogge2.call(this);
        if (extraData != null) {
          Object.assign(response.data, {
            extra: extraData
          });
        }
        return response;
      });
    };

    /*
    	Add a logout endpoint to the API
    		After the user is logged out, the onLoggedOut hook is called (see Restfully.configure() for
    	adding hook).
    */
    return this.addRoute('logout', {
      authRequired: true
    }, {
      get() {
        return Promise.asyncApply(() => {
          console.warn('Warning: Default logout via GET will be removed in Restivus v1.0. Use POST instead.');
          console.warn('    See https://github.com/kahmali/meteor-restivus/issues/100');
          return logout.call(this);
        });
      },
      post: logout
    });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"auth.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_restivus/lib/auth.js                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  Auth: () => Auth
});
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }
}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },
  Match(v) {
    Match = v;
  }
}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 2);
let Users;
module.link("@rocket.chat/models", {
  Users(v) {
    Users = v;
  }
}, 3);
/*
  A valid user will have exactly one of the following identification fields: id, username, or email
*/
const userValidator = Match.Where(function (user) {
  check(user, {
    id: Match.Optional(String),
    username: Match.Optional(String),
    email: Match.Optional(String)
  });
  if (Object.keys(user).length !== 1) {
    throw new Match.Error('User must have exactly one identifier field');
  }
  return true;
});

/*
  A password can be either in plain text or hashed
*/
const passwordValidator = Match.OneOf(String, {
  digest: String,
  algorithm: String
});

/*
  Return a MongoDB query selector for finding the given user
*/
const getUserQuerySelector = function (user) {
  if (user.id) {
    return {
      _id: user.id
    };
  }
  if (user.username) {
    return {
      username: user.username
    };
  }
  if (user.email) {
    return {
      'emails.address': user.email
    };
  }

  // We shouldn't be here if the user object was properly validated
  throw new Error('Cannot create selector from invalid user');
};

/*
  Log a user in with their password
*/
class Auth {
  loginWithPassword(user, password) {
    return Promise.asyncApply(() => {
      if (!user || !password) {
        throw new Meteor.Error(401, 'Unauthorized');
      }

      // Validate the login input types
      check(user, userValidator);
      check(password, passwordValidator);

      // Retrieve the user from the database
      const authenticatingUserSelector = getUserQuerySelector(user);
      const authenticatingUser = Promise.await(Users.findOne(authenticatingUserSelector));
      if (!authenticatingUser) {
        throw new Meteor.Error(401, 'Unauthorized');
      }
      if (!(authenticatingUser.services != null ? authenticatingUser.services.password : undefined)) {
        throw new Meteor.Error(401, 'Unauthorized');
      }

      // Authenticate the user's password
      const passwordVerification = Promise.await(Accounts._checkPasswordAsync(authenticatingUser, password));
      if (passwordVerification.error) {
        throw new Meteor.Error(401, 'Unauthorized');
      }

      // Add a new auth token to the user's account
      const authToken = Accounts._generateStampedLoginToken();
      const hashedToken = Accounts._hashLoginToken(authToken.token);
      Accounts._insertHashedLoginToken(authenticatingUser._id, {
        hashedToken
      });
      return {
        authToken: authToken.token,
        userId: authenticatingUser._id
      };
    });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iron-router-error-to-response.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_restivus/lib/iron-router-error-to-response.js                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  ironRouterSendErrorToResponse: () => ironRouterSendErrorToResponse
});
// We need a function that treats thrown errors exactly like Iron Router would.
// This file is written in JavaScript to enable copy-pasting Iron Router code.

// Taken from: https://github.com/iron-meteor/iron-router/blob/9c369499c98af9fd12ef9e68338dee3b1b1276aa/lib/router_server.js#L3
const env = process.env.NODE_ENV || 'development';

// Taken from: https://github.com/iron-meteor/iron-router/blob/9c369499c98af9fd12ef9e68338dee3b1b1276aa/lib/router_server.js#L47
function ironRouterSendErrorToResponse(err, req, res) {
  if (res.statusCode < 400) res.statusCode = 500;
  if (err.status) res.statusCode = err.status;
  let msg;
  if (env === 'development') msg = "".concat(err.stack || err.toString(), "\n");
  // XXX get this from standard dict of error messages?
  else msg = 'Server error.';
  console.error(err.stack || err.toString());
  if (res.headersSent) return req.socket.destroy();
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(msg));
  if (req.method === 'HEAD') return res.end();
  res.end(msg);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"json-routes.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_restivus/lib/json-routes.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  JsonRoutes: () => JsonRoutes
});
let WebApp;
module.link("meteor/webapp", {
  WebApp(v) {
    WebApp = v;
  }
}, 0);
const connect = Npm.require('connect');
const connectRoute = Npm.require('connect-route');
WebApp.connectHandlers.use(connect.urlencoded({
  limit: '50mb'
})); // Override default request size
WebApp.connectHandlers.use(connect.json({
  limit: '50mb'
})); // Override default request size
WebApp.connectHandlers.use(connect.query());

// Save reference to router for later
let connectRouter;
const responseHeaders = {
  'Cache-Control': 'no-store',
  'Pragma': 'no-cache'
};

// Register as a middleware
WebApp.connectHandlers.use(connectRoute(function (router) {
  connectRouter = router;
}));
function setHeaders(res, headers) {
  Object.entries(headers).forEach(_ref => {
    let [key, value] = _ref;
    res.setHeader(key, value);
  });
}
const JsonRoutes = {
  add(method, path, handler) {
    // Make sure path starts with a slash
    if (path[0] !== '/') {
      path = "/".concat(path);
    }
    connectRouter[method.toLowerCase()](path, (req, res, next) => Promise.asyncApply(() => {
      // Set headers on response
      setHeaders(res, responseHeaders);
      try {
        Promise.await(handler(req, res, next));
      } catch (error) {
        next(error);
      }
    }));
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"route.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_restivus/lib/route.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
module.export({
  Route: () => Route
});
let Users;
module.link("@rocket.chat/models", {
  Users(v) {
    Users = v;
  }
}, 0);
let ironRouterSendErrorToResponse;
module.link("./iron-router-error-to-response", {
  ironRouterSendErrorToResponse(v) {
    ironRouterSendErrorToResponse = v;
  }
}, 1);
let JsonRoutes;
module.link("./json-routes", {
  JsonRoutes(v) {
    JsonRoutes = v;
  }
}, 2);
const availableMethods = ['get', 'post', 'put', 'patch', 'delete', 'options'];
class Route {
  constructor(api, path, options, endpoints1) {
    this.api = api;
    this.path = path;
    this.options = options;
    this.endpoints = endpoints1;
    if (!this.endpoints) {
      this.endpoints = this.options;
      this.options = {};
    }
  }
  addToApi() {
    const self = this;
    if (this.api._config.paths.includes(this.path)) {
      throw new Error("Cannot add a route at an existing path: ".concat(this.path));
    }
    this.endpoints = _objectSpread({
      options: this.api._config.defaultOptionsEndpoint
    }, this.endpoints);
    this._resolveEndpoints();
    this._configureEndpoints();
    this.api._config.paths.push(this.path);
    const allowedMethods = availableMethods.filter(function (method) {
      return Object.keys(self.endpoints).includes(method);
    });
    const rejectedMethods = availableMethods.filter(function (method) {
      return !Object.keys(self.endpoints).includes(method);
    });
    const fullPath = this.api._config.apiPath + this.path;
    allowedMethods.forEach(function (method) {
      const endpoint = self.endpoints[method];
      return JsonRoutes.add(method, fullPath, function (req, res) {
        return Promise.asyncApply(() => {
          let responseInitiated = false;
          const doneFunc = function () {
            responseInitiated = true;
          };
          const endpointContext = _objectSpread({
            urlParams: req.params,
            queryParams: req.query,
            bodyParams: req.body,
            request: req,
            response: res,
            done: doneFunc
          }, endpoint);
          let responseData = null;
          try {
            responseData = Promise.await(self._callEndpoint(endpointContext, endpoint));
          } catch (e) {
            ironRouterSendErrorToResponse(e, req, res);
            return;
          }
          if (responseInitiated) {
            res.end();
            return;
          }
          if (res.headersSent) {
            throw new Error("Must call this.done() after handling endpoint response manually: ".concat(method, " ").concat(fullPath));
          } else if (responseData === null || responseData === void 0) {
            throw new Error("Cannot return null or undefined from an endpoint: ".concat(method, " ").concat(fullPath));
          }
          if (responseData.body && (responseData.statusCode || responseData.headers)) {
            return self._respond(res, responseData.body, responseData.statusCode, responseData.headers);
          }
          return self._respond(res, responseData);
        });
      });
    });
    return rejectedMethods.forEach(function (method) {
      return JsonRoutes.add(method, fullPath, function (req, res) {
        const responseData = {
          status: 'error',
          message: 'API endpoint does not exist'
        };
        const headers = {
          Allow: allowedMethods.join(', ').toUpperCase()
        };
        return self._respond(res, responseData, 405, headers);
      });
    });
  }

  /*
  	Convert all endpoints on the given route into our expected endpoint object if it is a bare
  	function
  		@param {Route} route The route the endpoints belong to
  	*/

  _resolveEndpoints() {
    Object.entries(this.endpoints).forEach(_ref => {
      let [method, endpoint] = _ref;
      if (typeof endpoint === 'function') {
        this.endpoints[method] = {
          action: endpoint
        };
      }
    });
  }

  /*
  	Configure the authentication and role requirement on all endpoints (except OPTIONS, which must
  	be configured directly on the endpoint)
  		Authentication can be required on an entire route or individual endpoints. If required on an
  	entire route, that serves as the default. If required in any individual endpoints, that will
  	override the default.
  		After the endpoint is configured, all authentication and role requirements of an endpoint can be
  	accessed at <code>endpoint.authRequired</code> and <code>endpoint.roleRequired</code>,
  	respectively.
  		@param {Route} route The route the endpoints belong to
  	@param {Endpoint} endpoint The endpoint to configure
  	*/

  _configureEndpoints() {
    Object.entries(this.endpoints).forEach(_ref2 => {
      let [method, endpoint] = _ref2;
      if (method !== 'options') {
        var _this$options;
        if (!((_this$options = this.options) !== null && _this$options !== void 0 && _this$options.roleRequired)) {
          this.options.roleRequired = [];
        }
        if (!endpoint.roleRequired) {
          endpoint.roleRequired = [];
        }
        endpoint.roleRequired = [...endpoint.roleRequired, ...this.options.roleRequired];
        if (endpoint.roleRequired.length === 0) {
          endpoint.roleRequired = false;
        }
        if (endpoint.authRequired === void 0) {
          var _this$options2;
          if ((_this$options2 = this.options) !== null && _this$options2 !== void 0 && _this$options2.authRequired || endpoint.roleRequired) {
            endpoint.authRequired = true;
          } else {
            endpoint.authRequired = false;
          }
        }
      }
    });
  }

  /*
  	Authenticate an endpoint if required, and return the result of calling it
  		@returns The endpoint response or a 401 if authentication fails
  	*/

  _callEndpoint(endpointContext, endpoint) {
    return Promise.asyncApply(() => {
      const auth = Promise.await(this._authAccepted(endpointContext, endpoint));
      if (auth.success) {
        if (this._roleAccepted(endpointContext, endpoint)) {
          return endpoint.action.call(endpointContext);
        }
        return {
          statusCode: 403,
          body: {
            status: 'error',
            message: 'You do not have permission to do this.'
          }
        };
      }
      if (auth.data) {
        return auth.data;
      }
      return {
        statusCode: 401,
        body: {
          status: 'error',
          message: 'You must be logged in to do this.'
        }
      };
    });
  }

  /*
  	Authenticate the given endpoint if required
  		Once it's globally configured in the API, authentication can be required on an entire route or
  	individual endpoints. If required on an entire endpoint, that serves as the default. If required
  	in any individual endpoints, that will override the default.
  		@returns An object of the following format:
  				{
  				success: Boolean
  				data: String or Object
  			}
  			where `success` is `true` if all required authentication checks pass and the optional `data`
  		will contain the auth data when successful and an optional error response when auth fails.
  	*/

  _authAccepted(endpointContext, endpoint) {
    return Promise.asyncApply(() => {
      if (endpoint.authRequired) {
        return this._authenticate(endpointContext);
      }
      return {
        success: true
      };
    });
  }

  /*
  	Verify the request is being made by an actively logged in user
  		If verified, attach the authenticated user to the context.
  		@returns An object of the following format:
  				{
  				success: Boolean
  				data: String or Object
  			}
  			where `success` is `true` if all required authentication checks pass and the optional `data`
  		will contain the auth data when successful and an optional error response when auth fails.
  	*/

  _authenticate(endpointContext) {
    return Promise.asyncApply(() => {
      const auth = Promise.await(this.api._config.auth.user.call(endpointContext));
      if (!auth) {
        return {
          success: false
        };
      }
      if (auth.userId && auth.token && !auth.user) {
        const userSelector = {};
        userSelector._id = auth.userId;
        userSelector[this.api._config.auth.token] = auth.token;
        auth.user = Promise.await(Users.findOne(userSelector));
      }
      if (auth.error) {
        return {
          success: false,
          data: auth.error
        };
      }
      if (auth.user) {
        endpointContext.user = auth.user;
        endpointContext.userId = auth.user._id;
        return {
          success: true,
          data: auth
        };
      }
      return {
        success: false
      };
    });
  }

  /*
  	Authenticate the user role if required
  		Must be called after _authAccepted().
  		@returns True if the authenticated user belongs to <i>any</i> of the acceptable roles on the
  						endpoint
  	*/

  _roleAccepted(endpointContext, endpoint) {
    if (endpoint.roleRequired) {
      const intersection = [endpoint.roleRequired, endpointContext.user.roles].reduce((a, b) => a.filter(c => b.includes(c)));
      if (intersection.length === 0) {
        return false;
      }
    }
    return true;
  }

  /*
  	Respond to an HTTP request
  	*/

  _respond(response, body, statusCode, headers) {
    let delayInMilliseconds;
    let minimumDelayInMilliseconds;
    let randomMultiplierBetweenOneAndTwo;
    if (statusCode == null) {
      statusCode = 200;
    }
    if (headers == null) {
      headers = {};
    }
    const defaultHeaders = this._lowerCaseKeys(this.api._config.defaultHeaders);
    headers = this._lowerCaseKeys(headers);
    headers = _objectSpread(_objectSpread({}, defaultHeaders), headers);
    if (headers['content-type'].match(/json|javascript/) !== null) {
      if (this.api._config.prettyJson) {
        body = JSON.stringify(body, void 0, 2);
      } else {
        body = JSON.stringify(body);
      }
    }
    const sendResponse = function () {
      response.writeHead(statusCode, headers);
      response.write(body);
      return response.end();
    };
    if (statusCode === 401 || statusCode === 403) {
      minimumDelayInMilliseconds = 500;
      randomMultiplierBetweenOneAndTwo = 1 + Math.random();
      delayInMilliseconds = minimumDelayInMilliseconds * randomMultiplierBetweenOneAndTwo;
      return setTimeout(sendResponse, delayInMilliseconds);
    }
    return sendResponse();
  }

  /*
  	Return the object with all of the keys converted to lowercase
  	*/

  _lowerCaseKeys(object) {
    return Object.keys(object).reduce((accumulator, key) => {
      accumulator[key.toLowerCase()] = object[key];
      return accumulator;
    }, {});
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/rocketchat:restivus/lib/restivus.js");

/* Exports */
Package._define("rocketchat:restivus", exports);

})();

//# sourceURL=meteor://💻app/packages/rocketchat_restivus.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcm9ja2V0Y2hhdDpyZXN0aXZ1cy9saWIvcmVzdGl2dXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3JvY2tldGNoYXQ6cmVzdGl2dXMvbGliL2F1dGguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3JvY2tldGNoYXQ6cmVzdGl2dXMvbGliL2lyb24tcm91dGVyLWVycm9yLXRvLXJlc3BvbnNlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yb2NrZXRjaGF0OnJlc3RpdnVzL2xpYi9qc29uLXJvdXRlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcm9ja2V0Y2hhdDpyZXN0aXZ1cy9saWIvcm91dGUuanMiXSwibmFtZXMiOlsiX29iamVjdFNwcmVhZCIsIm1vZHVsZSIsImxpbmsiLCJkZWZhdWx0IiwidiIsImV4cG9ydCIsIlJlc3RpdnVzIiwiQWNjb3VudHMiLCJVc2VycyIsIkF1dGgiLCJSb3V0ZSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsIl9yb3V0ZXMiLCJfY29uZmlnIiwicGF0aHMiLCJ1c2VEZWZhdWx0QXV0aCIsImFwaVBhdGgiLCJ2ZXJzaW9uIiwicHJldHR5SnNvbiIsImF1dGgiLCJ0b2tlbiIsInVzZXIiLCJyZXF1ZXN0IiwiaGVhZGVycyIsIl9oYXNoTG9naW5Ub2tlbiIsInVzZXJJZCIsImRlZmF1bHRIZWFkZXJzIiwiZW5hYmxlQ29ycyIsImNvcnNIZWFkZXJzIiwiZGVmYXVsdE9wdGlvbnNFbmRwb2ludCIsInJlc3BvbnNlIiwid3JpdGVIZWFkIiwiZG9uZSIsInN0YXJ0c1dpdGgiLCJzbGljZSIsImVuZHNXaXRoIiwiX2luaXRBdXRoIiwidXNlQXV0aCIsImNvbnNvbGUiLCJ3YXJuIiwiYWRkUm91dGUiLCJwYXRoIiwiZW5kcG9pbnRzIiwicm91dGUiLCJwdXNoIiwiYWRkVG9BcGkiLCJzZWxmIiwiYXV0aFJlcXVpcmVkIiwicG9zdCIsImJvZHlQYXJhbXMiLCJpbmRleE9mIiwidXNlcm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiaGFzaGVkIiwiZGlnZXN0IiwiYWxnb3JpdGhtIiwibG9naW5XaXRoUGFzc3dvcmQiLCJlIiwic3RhdHVzQ29kZSIsImVycm9yIiwiYXV0aFRva2VuIiwic2VhcmNoUXVlcnkiLCJmaW5kT25lIiwiX2lkIiwic3RhdHVzIiwiZGF0YSIsImV4dHJhRGF0YSIsIm9uTG9nZ2VkSW4iLCJjYWxsIiwiT2JqZWN0IiwiYXNzaWduIiwiZXh0cmEiLCJsb2dvdXQiLCJoYXNoZWRUb2tlbiIsInRva2VuTG9jYXRpb24iLCJpbmRleCIsImxhc3RJbmRleE9mIiwidG9rZW5QYXRoIiwic3Vic3RyaW5nIiwidG9rZW5GaWVsZE5hbWUiLCJ0b2tlblRvUmVtb3ZlIiwidG9rZW5SZW1vdmFsUXVlcnkiLCJ1cGRhdGVPbmUiLCIkcHVsbCIsIm1lc3NhZ2UiLCJvbkxvZ2dlZE91dCIsImdldCIsImNoZWNrIiwiTWF0Y2giLCJNZXRlb3IiLCJ1c2VyVmFsaWRhdG9yIiwiV2hlcmUiLCJpZCIsIk9wdGlvbmFsIiwiU3RyaW5nIiwia2V5cyIsImxlbmd0aCIsIkVycm9yIiwicGFzc3dvcmRWYWxpZGF0b3IiLCJPbmVPZiIsImdldFVzZXJRdWVyeVNlbGVjdG9yIiwiYXV0aGVudGljYXRpbmdVc2VyU2VsZWN0b3IiLCJhdXRoZW50aWNhdGluZ1VzZXIiLCJzZXJ2aWNlcyIsInVuZGVmaW5lZCIsInBhc3N3b3JkVmVyaWZpY2F0aW9uIiwiX2NoZWNrUGFzc3dvcmRBc3luYyIsIl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuIiwiX2luc2VydEhhc2hlZExvZ2luVG9rZW4iLCJpcm9uUm91dGVyU2VuZEVycm9yVG9SZXNwb25zZSIsImVudiIsInByb2Nlc3MiLCJOT0RFX0VOViIsImVyciIsInJlcSIsInJlcyIsIm1zZyIsInN0YWNrIiwidG9TdHJpbmciLCJoZWFkZXJzU2VudCIsInNvY2tldCIsImRlc3Ryb3kiLCJzZXRIZWFkZXIiLCJCdWZmZXIiLCJieXRlTGVuZ3RoIiwibWV0aG9kIiwiZW5kIiwiSnNvblJvdXRlcyIsIldlYkFwcCIsImNvbm5lY3QiLCJOcG0iLCJyZXF1aXJlIiwiY29ubmVjdFJvdXRlIiwiY29ubmVjdEhhbmRsZXJzIiwidXNlIiwidXJsZW5jb2RlZCIsImxpbWl0IiwianNvbiIsInF1ZXJ5IiwiY29ubmVjdFJvdXRlciIsInJlc3BvbnNlSGVhZGVycyIsInJvdXRlciIsInNldEhlYWRlcnMiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImtleSIsInZhbHVlIiwiYWRkIiwiaGFuZGxlciIsInRvTG93ZXJDYXNlIiwibmV4dCIsImF2YWlsYWJsZU1ldGhvZHMiLCJhcGkiLCJlbmRwb2ludHMxIiwiaW5jbHVkZXMiLCJfcmVzb2x2ZUVuZHBvaW50cyIsIl9jb25maWd1cmVFbmRwb2ludHMiLCJhbGxvd2VkTWV0aG9kcyIsImZpbHRlciIsInJlamVjdGVkTWV0aG9kcyIsImZ1bGxQYXRoIiwiZW5kcG9pbnQiLCJyZXNwb25zZUluaXRpYXRlZCIsImRvbmVGdW5jIiwiZW5kcG9pbnRDb250ZXh0IiwidXJsUGFyYW1zIiwicGFyYW1zIiwicXVlcnlQYXJhbXMiLCJib2R5IiwicmVzcG9uc2VEYXRhIiwiX2NhbGxFbmRwb2ludCIsIl9yZXNwb25kIiwiQWxsb3ciLCJqb2luIiwidG9VcHBlckNhc2UiLCJhY3Rpb24iLCJyb2xlUmVxdWlyZWQiLCJfYXV0aEFjY2VwdGVkIiwic3VjY2VzcyIsIl9yb2xlQWNjZXB0ZWQiLCJfYXV0aGVudGljYXRlIiwidXNlclNlbGVjdG9yIiwiaW50ZXJzZWN0aW9uIiwicm9sZXMiLCJyZWR1Y2UiLCJhIiwiYiIsImMiLCJkZWxheUluTWlsbGlzZWNvbmRzIiwibWluaW11bURlbGF5SW5NaWxsaXNlY29uZHMiLCJyYW5kb21NdWx0aXBsaWVyQmV0d2Vlbk9uZUFuZFR3byIsIl9sb3dlckNhc2VLZXlzIiwibWF0Y2giLCJKU09OIiwic3RyaW5naWZ5Iiwic2VuZFJlc3BvbnNlIiwid3JpdGUiLCJN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TTJCLFlBQVksR0FBRyxZQUFZO01BQ2hDdEssUUFBUSxDQUFDQyxTQUFTLENBQUM0QixVQUFVLEVBQUVwQyxPQUFPLENBQUM7TUFDdkNPLFFBQVEsQ0FBQ3VLLEtBQUssQ0FBQzVCLElBQUksQ0FBQztNQUNwQixPQUFPM0ksUUFBUSxDQUFDaUcsR0FBRyxFQUFFO0lBQ3RCLENBQUM7SUFDRCxJQUFJcEUsVUFBVSxLQUFLLEdBQUcsSUFBSUEsVUFBVSxLQUFLLEdBQUcsRUFBRTtNQUM3Q21JLDBCQUEwQixHQUFHLEdBQUc7TUFDaENDLGdDQUFnQyxHQUFHLENBQUMsR0FBR08sSUFBSSxDQUFDQyxNQUFNLEVBQUU7TUFDcERWLG1CQUFtQixHQUFHQywwQkFBMEIsR0FBR0MsZ0NBQWdDO01BQ25GLE9BQU9TLFVBQVUsQ0FBQ0osWUFBWSxFQUFFUCxtQkFBbUIsQ0FBQztJQUNyRDtJQUNBLE9BQU9PLFlBQVksRUFBRTtFQUN0Qjs7RUFFQTtBQUNEO0FBQ0E7O0VBRUNKLGNBQWMsQ0FBQ1MsTUFBTSxFQUFFO0lBQ3RCLE9BQU9uSSxNQUFNLENBQUMwQixJQUFJLENBQUN5RyxNQUFNLENBQUMsQ0FBQ2hCLE1BQU0sQ0FBQyxDQUFDaUIsV0FBVyxFQUFFeEQsR0FBRyxLQUFLO01BQ3ZEd0QsV0FBVyxDQUFDeEQsR0FBRyxDQUFDSSxXQUFXLEVBQUUsQ0FBQyxHQUFHbUQsTUFBTSxDQUFDdkQsR0FBRyxDQUFDO01BQzVDLE9BQU93RCxXQUFXO0lBQ25CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNQO0FBQ0QsQyIsImZpbGUiOiIvcGFja2FnZXMvcm9ja2V0Y2hhdF9yZXN0aXZ1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY291bnRzIH0gZnJvbSAnbWV0ZW9yL2FjY291bnRzLWJhc2UnO1xuaW1wb3J0IHsgVXNlcnMgfSBmcm9tICdAcm9ja2V0LmNoYXQvbW9kZWxzJztcblxuaW1wb3J0IHsgQXV0aCB9IGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4vcm91dGUnO1xuXG5leHBvcnQgY2xhc3MgUmVzdGl2dXMge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5fcm91dGVzID0gW107XG5cdFx0dGhpcy5fY29uZmlnID0ge1xuXHRcdFx0cGF0aHM6IFtdLFxuXHRcdFx0dXNlRGVmYXVsdEF1dGg6IGZhbHNlLFxuXHRcdFx0YXBpUGF0aDogJ2FwaS8nLFxuXHRcdFx0dmVyc2lvbjogbnVsbCxcblx0XHRcdHByZXR0eUpzb246IGZhbHNlLFxuXHRcdFx0YXV0aDoge1xuXHRcdFx0XHR0b2tlbjogJ3NlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy5oYXNoZWRUb2tlbicsXG5cdFx0XHRcdHVzZXIoKSB7XG5cdFx0XHRcdFx0bGV0IHRva2VuO1xuXHRcdFx0XHRcdGlmICh0aGlzLnJlcXVlc3QuaGVhZGVyc1sneC1hdXRoLXRva2VuJ10pIHtcblx0XHRcdFx0XHRcdHRva2VuID0gQWNjb3VudHMuX2hhc2hMb2dpblRva2VuKHRoaXMucmVxdWVzdC5oZWFkZXJzWyd4LWF1dGgtdG9rZW4nXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR1c2VySWQ6IHRoaXMucmVxdWVzdC5oZWFkZXJzWyd4LXVzZXItaWQnXSxcblx0XHRcdFx0XHRcdHRva2VuLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0ZGVmYXVsdEhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0XHRlbmFibGVDb3JzOiB0cnVlLFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9O1xuXG5cdFx0aWYgKHRoaXMuX2NvbmZpZy5lbmFibGVDb3JzKSB7XG5cdFx0XHRjb25zdCBjb3JzSGVhZGVycyA9IHtcblx0XHRcdFx0J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcblx0XHRcdFx0J0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCcsXG5cdFx0XHR9O1xuXHRcdFx0aWYgKHRoaXMuX2NvbmZpZy51c2VEZWZhdWx0QXV0aCkge1xuXHRcdFx0XHRjb3JzSGVhZGVyc1snQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyddICs9ICcsIFgtVXNlci1JZCwgWC1BdXRoLVRva2VuJztcblx0XHRcdH1cblx0XHRcdHRoaXMuX2NvbmZpZy5kZWZhdWx0SGVhZGVycyA9IHtcblx0XHRcdFx0Li4udGhpcy5fY29uZmlnLmRlZmF1bHRIZWFkZXJzLFxuXHRcdFx0XHQuLi5jb3JzSGVhZGVycyxcblx0XHRcdH07XG5cdFx0XHRpZiAoIXRoaXMuX2NvbmZpZy5kZWZhdWx0T3B0aW9uc0VuZHBvaW50KSB7XG5cdFx0XHRcdHRoaXMuX2NvbmZpZy5kZWZhdWx0T3B0aW9uc0VuZHBvaW50ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRoaXMucmVzcG9uc2Uud3JpdGVIZWFkKDIwMCwgY29yc0hlYWRlcnMpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmRvbmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2NvbmZpZy5hcGlQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuXHRcdFx0dGhpcy5fY29uZmlnLmFwaVBhdGggPSB0aGlzLl9jb25maWcuYXBpUGF0aC5zbGljZSgxKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLl9jb25maWcuYXBpUGF0aC5lbmRzV2l0aCgnLycpKSB7XG5cdFx0XHR0aGlzLl9jb25maWcuYXBpUGF0aCA9IGAke3RoaXMuX2NvbmZpZy5hcGlQYXRofS9gO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fY29uZmlnLnZlcnNpb24pIHtcblx0XHRcdHRoaXMuX2NvbmZpZy5hcGlQYXRoICs9IGAke3RoaXMuX2NvbmZpZy52ZXJzaW9ufS9gO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fY29uZmlnLnVzZURlZmF1bHRBdXRoKSB7XG5cdFx0XHR0aGlzLl9pbml0QXV0aCgpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5fY29uZmlnLnVzZUF1dGgpIHtcblx0XHRcdHRoaXMuX2luaXRBdXRoKCk7XG5cdFx0XHRjb25zb2xlLndhcm4oJ1dhcm5pbmc6IHVzZUF1dGggQVBJIGNvbmZpZyBvcHRpb24gd2lsbCBiZSByZW1vdmVkIGluIFJlc3RpdnVzIHYxLjAgXFxuICAgIFVzZSB0aGUgdXNlRGVmYXVsdEF1dGggb3B0aW9uIGluc3RlYWQnKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0IFx0QWRkIGVuZHBvaW50cyBmb3IgdGhlIGdpdmVuIEhUVFAgbWV0aG9kcyBhdCB0aGUgZ2l2ZW4gcGF0aFxuXG5cdFx0QHBhcmFtIHBhdGgge1N0cmluZ30gVGhlIGV4dGVuZGVkIFVSTCBwYXRoICh3aWxsIGJlIGFwcGVuZGVkIHRvIGJhc2UgcGF0aCBvZiB0aGUgQVBJKVxuXHRcdEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IFJvdXRlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuXHRcdEBwYXJhbSBvcHRpb25zLmF1dGhSZXF1aXJlZCB7Qm9vbGVhbn0gVGhlIGRlZmF1bHQgYXV0aCByZXF1aXJlbWVudCBmb3IgZWFjaCBlbmRwb2ludCBvbiB0aGUgcm91dGVcblx0XHRAcGFyYW0gb3B0aW9ucy5yb2xlUmVxdWlyZWQge1N0cmluZyBvciBTdHJpbmdbXX0gVGhlIGRlZmF1bHQgcm9sZSByZXF1aXJlZCBmb3IgZWFjaCBlbmRwb2ludCBvbiB0aGUgcm91dGVcblx0XHRAcGFyYW0gZW5kcG9pbnRzIHtPYmplY3R9IEEgc2V0IG9mIGVuZHBvaW50cyBhdmFpbGFibGUgb24gdGhlIG5ldyByb3V0ZSAoZ2V0LCBwb3N0LCBwdXQsIHBhdGNoLCBkZWxldGUsIG9wdGlvbnMpXG5cdFx0QHBhcmFtIGVuZHBvaW50cy48bWV0aG9kPiB7RnVuY3Rpb24gb3IgT2JqZWN0fSBJZiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkLCBhbGwgZGVmYXVsdCByb3V0ZVxuXHRcdFx0Y29uZmlndXJhdGlvbiBvcHRpb25zIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgZW5kcG9pbnQuIE90aGVyd2lzZSBhbiBvYmplY3Qgd2l0aCBhbiBgYWN0aW9uYFxuXHRcdFx0YW5kIGFsbCBvdGhlciByb3V0ZSBjb25maWcgb3B0aW9ucyBhdmFpbGFibGUuIEFuIGBhY3Rpb25gIG11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgb2JqZWN0LlxuXHQqL1xuXG5cdGFkZFJvdXRlKHBhdGgsIG9wdGlvbnMsIGVuZHBvaW50cykge1xuXHRcdGNvbnN0IHJvdXRlID0gbmV3IFJvdXRlKHRoaXMsIHBhdGgsIG9wdGlvbnMsIGVuZHBvaW50cyk7XG5cdFx0dGhpcy5fcm91dGVzLnB1c2gocm91dGUpO1xuXHRcdHJvdXRlLmFkZFRvQXBpKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdEFkZCAvbG9naW4gYW5kIC9sb2dvdXQgZW5kcG9pbnRzIHRvIHRoZSBBUElcblx0Ki9cblxuXHRfaW5pdEF1dGgoKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHQvKlxuXHRcdFx0QWRkIGEgbG9naW4gZW5kcG9pbnQgdG8gdGhlIEFQSVxuXG5cdFx0XHRBZnRlciB0aGUgdXNlciBpcyBsb2dnZWQgaW4sIHRoZSBvbkxvZ2dlZEluIGhvb2sgaXMgY2FsbGVkIChzZWUgUmVzdGZ1bGx5LmNvbmZpZ3VyZSgpIGZvclxuXHRcdFx0YWRkaW5nIGhvb2spLlxuXHRcdCovXG5cdFx0dGhpcy5hZGRSb3V0ZShcblx0XHRcdCdsb2dpbicsXG5cdFx0XHR7IGF1dGhSZXF1aXJlZDogZmFsc2UgfSxcblx0XHRcdHtcblx0XHRcdFx0YXN5bmMgcG9zdCgpIHtcblx0XHRcdFx0XHRjb25zdCB1c2VyID0ge307XG5cdFx0XHRcdFx0aWYgKHRoaXMuYm9keVBhcmFtcy51c2VyKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5ib2R5UGFyYW1zLnVzZXIuaW5kZXhPZignQCcpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHR1c2VyLnVzZXJuYW1lID0gdGhpcy5ib2R5UGFyYW1zLnVzZXI7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR1c2VyLmVtYWlsID0gdGhpcy5ib2R5UGFyYW1zLnVzZXI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmJvZHlQYXJhbXMudXNlcm5hbWUpIHtcblx0XHRcdFx0XHRcdHVzZXIudXNlcm5hbWUgPSB0aGlzLmJvZHlQYXJhbXMudXNlcm5hbWU7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmJvZHlQYXJhbXMuZW1haWwpIHtcblx0XHRcdFx0XHRcdHVzZXIuZW1haWwgPSB0aGlzLmJvZHlQYXJhbXMuZW1haWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxldCB7IHBhc3N3b3JkIH0gPSB0aGlzLmJvZHlQYXJhbXM7XG5cdFx0XHRcdFx0aWYgKHRoaXMuYm9keVBhcmFtcy5oYXNoZWQpIHtcblx0XHRcdFx0XHRcdHBhc3N3b3JkID0ge1xuXHRcdFx0XHRcdFx0XHRkaWdlc3Q6IHBhc3N3b3JkLFxuXHRcdFx0XHRcdFx0XHRhbGdvcml0aG06ICdzaGEtMjU2Jyxcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxldCBhdXRoO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRhdXRoID0gYXdhaXQgQXV0aC5sb2dpbldpdGhQYXNzd29yZCh1c2VyLCBwYXNzd29yZCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogZS5lcnJvcixcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChhdXRoLnVzZXJJZCAmJiBhdXRoLmF1dGhUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2VhcmNoUXVlcnkgPSB7fTtcblx0XHRcdFx0XHRcdHNlYXJjaFF1ZXJ5W3NlbGYuX2NvbmZpZy5hdXRoLnRva2VuXSA9IEFjY291bnRzLl9oYXNoTG9naW5Ub2tlbihhdXRoLmF1dGhUb2tlbik7XG5cdFx0XHRcdFx0XHR0aGlzLnVzZXIgPSBhd2FpdCBVc2Vycy5maW5kT25lKFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0X2lkOiBhdXRoLnVzZXJJZCxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c2VhcmNoUXVlcnksXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0dGhpcy51c2VySWQgPSB0aGlzLnVzZXI/Ll9pZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB7XG5cdFx0XHRcdFx0XHRzdGF0dXM6ICdzdWNjZXNzJyxcblx0XHRcdFx0XHRcdGRhdGE6IGF1dGgsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRjb25zdCBleHRyYURhdGEgPSBzZWxmLl9jb25maWcub25Mb2dnZWRJbj8uY2FsbCh0aGlzKTtcblx0XHRcdFx0XHRpZiAoZXh0cmFEYXRhICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5hc3NpZ24ocmVzcG9uc2UuZGF0YSwge1xuXHRcdFx0XHRcdFx0XHRleHRyYTogZXh0cmFEYXRhLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0KTtcblx0XHRjb25zdCBsb2dvdXQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCBhdXRoVG9rZW4gPSB0aGlzLnJlcXVlc3QuaGVhZGVyc1sneC1hdXRoLXRva2VuJ107XG5cdFx0XHRjb25zdCBoYXNoZWRUb2tlbiA9IEFjY291bnRzLl9oYXNoTG9naW5Ub2tlbihhdXRoVG9rZW4pO1xuXHRcdFx0Y29uc3QgdG9rZW5Mb2NhdGlvbiA9IHNlbGYuX2NvbmZpZy5hdXRoLnRva2VuO1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0b2tlbkxvY2F0aW9uLmxhc3RJbmRleE9mKCcuJyk7XG5cdFx0XHRjb25zdCB0b2tlblBhdGggPSB0b2tlbkxvY2F0aW9uLnN1YnN0cmluZygwLCBpbmRleCk7XG5cdFx0XHRjb25zdCB0b2tlbkZpZWxkTmFtZSA9IHRva2VuTG9jYXRpb24uc3Vic3RyaW5nKGluZGV4ICsgMSk7XG5cdFx0XHRjb25zdCB0b2tlblRvUmVtb3ZlID0ge307XG5cdFx0XHR0b2tlblRvUmVtb3ZlW3Rva2VuRmllbGROYW1lXSA9IGhhc2hlZFRva2VuO1xuXHRcdFx0Y29uc3QgdG9rZW5SZW1vdmFsUXVlcnkgPSB7fTtcblx0XHRcdHRva2VuUmVtb3ZhbFF1ZXJ5W3Rva2VuUGF0aF0gPSB0b2tlblRvUmVtb3ZlO1xuXHRcdFx0YXdhaXQgVXNlcnMudXBkYXRlT25lKFxuXHRcdFx0XHR7IF9pZDogdGhpcy51c2VyLl9pZCB9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JHB1bGw6IHRva2VuUmVtb3ZhbFF1ZXJ5LFxuXHRcdFx0XHR9LFxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0ge1xuXHRcdFx0XHRzdGF0dXM6ICdzdWNjZXNzJyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiWW91J3ZlIGJlZW4gbG9nZ2VkIG91dCFcIixcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0XHRjb25zdCBleHRyYURhdGEgPSBzZWxmLl9jb25maWcub25Mb2dnZWRPdXQ/LmNhbGwodGhpcyk7XG5cdFx0XHRpZiAoZXh0cmFEYXRhICE9IG51bGwpIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihyZXNwb25zZS5kYXRhLCB7XG5cdFx0XHRcdFx0ZXh0cmE6IGV4dHJhRGF0YSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fTtcblxuXHRcdC8qXG5cdFx0XHRBZGQgYSBsb2dvdXQgZW5kcG9pbnQgdG8gdGhlIEFQSVxuXG5cdFx0XHRBZnRlciB0aGUgdXNlciBpcyBsb2dnZWQgb3V0LCB0aGUgb25Mb2dnZWRPdXQgaG9vayBpcyBjYWxsZWQgKHNlZSBSZXN0ZnVsbHkuY29uZmlndXJlKCkgZm9yXG5cdFx0XHRhZGRpbmcgaG9vaykuXG5cdFx0Ki9cblx0XHRyZXR1cm4gdGhpcy5hZGRSb3V0ZShcblx0XHRcdCdsb2dvdXQnLFxuXHRcdFx0eyBhdXRoUmVxdWlyZWQ6IHRydWUgfSxcblx0XHRcdHtcblx0XHRcdFx0YXN5bmMgZ2V0KCkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignV2FybmluZzogRGVmYXVsdCBsb2dvdXQgdmlhIEdFVCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVzdGl2dXMgdjEuMC4gVXNlIFBPU1QgaW5zdGVhZC4nKTtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJyAgICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2thaG1hbGkvbWV0ZW9yLXJlc3RpdnVzL2lzc3Vlcy8xMDAnKTtcblx0XHRcdFx0XHRyZXR1cm4gbG9nb3V0LmNhbGwodGhpcyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHBvc3Q6IGxvZ291dCxcblx0XHRcdH0sXG5cdFx0KTtcblx0fVxufVxuIiwiLypcbiAqIGRlY2FmZmVpbmF0ZSBzdWdnZXN0aW9uczpcbiAqIERTMjA3OiBDb25zaWRlciBzaG9ydGVyIHZhcmlhdGlvbnMgb2YgbnVsbCBjaGVja3NcbiAqIERTMjA4OiBBdm9pZCB0b3AtbGV2ZWwgdGhpc1xuICogRnVsbCBkb2NzOiBodHRwczovL2dpdGh1Yi5jb20vZGVjYWZmZWluYXRlL2RlY2FmZmVpbmF0ZS9ibG9iL21haW4vZG9jcy9zdWdnZXN0aW9ucy5tZFxuICovXG5cbmltcG9ydCB7IEFjY291bnRzIH0gZnJvbSAnbWV0ZW9yL2FjY291bnRzLWJhc2UnO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgVXNlcnMgfSBmcm9tICdAcm9ja2V0LmNoYXQvbW9kZWxzJztcblxuLypcbiAgQSB2YWxpZCB1c2VyIHdpbGwgaGF2ZSBleGFjdGx5IG9uZSBvZiB0aGUgZm9sbG93aW5nIGlkZW50aWZpY2F0aW9uIGZpZWxkczogaWQsIHVzZXJuYW1lLCBvciBlbWFpbFxuKi9cbmNvbnN0IHVzZXJWYWxpZGF0b3IgPSBNYXRjaC5XaGVyZShmdW5jdGlvbiAodXNlcikge1xuXHRjaGVjayh1c2VyLCB7XG5cdFx0aWQ6IE1hdGNoLk9wdGlvbmFsKFN0cmluZyksXG5cdFx0dXNlcm5hbWU6IE1hdGNoLk9wdGlvbmFsKFN0cmluZyksXG5cdFx0ZW1haWw6IE1hdGNoLk9wdGlvbmFsKFN0cmluZyksXG5cdH0pO1xuXG5cdGlmIChPYmplY3Qua2V5cyh1c2VyKS5sZW5ndGggIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgTWF0Y2guRXJyb3IoJ1VzZXIgbXVzdCBoYXZlIGV4YWN0bHkgb25lIGlkZW50aWZpZXIgZmllbGQnKTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufSk7XG5cbi8qXG4gIEEgcGFzc3dvcmQgY2FuIGJlIGVpdGhlciBpbiBwbGFpbiB0ZXh0IG9yIGhhc2hlZFxuKi9cbmNvbnN0IHBhc3N3b3JkVmFsaWRhdG9yID0gTWF0Y2guT25lT2YoU3RyaW5nLCB7XG5cdGRpZ2VzdDogU3RyaW5nLFxuXHRhbGdvcml0aG06IFN0cmluZyxcbn0pO1xuXG4vKlxuICBSZXR1cm4gYSBNb25nb0RCIHF1ZXJ5IHNlbGVjdG9yIGZvciBmaW5kaW5nIHRoZSBnaXZlbiB1c2VyXG4qL1xuY29uc3QgZ2V0VXNlclF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbiAodXNlcikge1xuXHRpZiAodXNlci5pZCkge1xuXHRcdHJldHVybiB7IF9pZDogdXNlci5pZCB9O1xuXHR9XG5cdGlmICh1c2VyLnVzZXJuYW1lKSB7XG5cdFx0cmV0dXJuIHsgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUgfTtcblx0fVxuXHRpZiAodXNlci5lbWFpbCkge1xuXHRcdHJldHVybiB7ICdlbWFpbHMuYWRkcmVzcyc6IHVzZXIuZW1haWwgfTtcblx0fVxuXG5cdC8vIFdlIHNob3VsZG4ndCBiZSBoZXJlIGlmIHRoZSB1c2VyIG9iamVjdCB3YXMgcHJvcGVybHkgdmFsaWRhdGVkXG5cdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSBzZWxlY3RvciBmcm9tIGludmFsaWQgdXNlcicpO1xufTtcblxuLypcbiAgTG9nIGEgdXNlciBpbiB3aXRoIHRoZWlyIHBhc3N3b3JkXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGgge1xuXHRhc3luYyBsb2dpbldpdGhQYXNzd29yZCh1c2VyLCBwYXNzd29yZCkge1xuXHRcdGlmICghdXNlciB8fCAhcGFzc3dvcmQpIHtcblx0XHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnVW5hdXRob3JpemVkJyk7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWRhdGUgdGhlIGxvZ2luIGlucHV0IHR5cGVzXG5cdFx0Y2hlY2sodXNlciwgdXNlclZhbGlkYXRvcik7XG5cdFx0Y2hlY2socGFzc3dvcmQsIHBhc3N3b3JkVmFsaWRhdG9yKTtcblxuXHRcdC8vIFJldHJpZXZlIHRoZSB1c2VyIGZyb20gdGhlIGRhdGFiYXNlXG5cdFx0Y29uc3QgYXV0aGVudGljYXRpbmdVc2VyU2VsZWN0b3IgPSBnZXRVc2VyUXVlcnlTZWxlY3Rvcih1c2VyKTtcblx0XHRjb25zdCBhdXRoZW50aWNhdGluZ1VzZXIgPSBhd2FpdCBVc2Vycy5maW5kT25lKGF1dGhlbnRpY2F0aW5nVXNlclNlbGVjdG9yKTtcblxuXHRcdGlmICghYXV0aGVudGljYXRpbmdVc2VyKSB7XG5cdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ1VuYXV0aG9yaXplZCcpO1xuXHRcdH1cblx0XHRpZiAoIShhdXRoZW50aWNhdGluZ1VzZXIuc2VydmljZXMgIT0gbnVsbCA/IGF1dGhlbnRpY2F0aW5nVXNlci5zZXJ2aWNlcy5wYXNzd29yZCA6IHVuZGVmaW5lZCkpIHtcblx0XHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCAnVW5hdXRob3JpemVkJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQXV0aGVudGljYXRlIHRoZSB1c2VyJ3MgcGFzc3dvcmRcblx0XHRjb25zdCBwYXNzd29yZFZlcmlmaWNhdGlvbiA9IGF3YWl0IEFjY291bnRzLl9jaGVja1Bhc3N3b3JkQXN5bmMoYXV0aGVudGljYXRpbmdVc2VyLCBwYXNzd29yZCk7XG5cdFx0aWYgKHBhc3N3b3JkVmVyaWZpY2F0aW9uLmVycm9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ1VuYXV0aG9yaXplZCcpO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBhIG5ldyBhdXRoIHRva2VuIHRvIHRoZSB1c2VyJ3MgYWNjb3VudFxuXHRcdGNvbnN0IGF1dGhUb2tlbiA9IEFjY291bnRzLl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuKCk7XG5cdFx0Y29uc3QgaGFzaGVkVG9rZW4gPSBBY2NvdW50cy5faGFzaExvZ2luVG9rZW4oYXV0aFRva2VuLnRva2VuKTtcblx0XHRBY2NvdW50cy5faW5zZXJ0SGFzaGVkTG9naW5Ub2tlbihhdXRoZW50aWNhdGluZ1VzZXIuX2lkLCB7IGhhc2hlZFRva2VuIH0pO1xuXG5cdFx0cmV0dXJuIHsgYXV0aFRva2VuOiBhdXRoVG9rZW4udG9rZW4sIHVzZXJJZDogYXV0aGVudGljYXRpbmdVc2VyLl9pZCB9O1xuXHR9XG59XG4iLCIvLyBXZSBuZWVkIGEgZnVuY3Rpb24gdGhhdCB0cmVhdHMgdGhyb3duIGVycm9ycyBleGFjdGx5IGxpa2UgSXJvbiBSb3V0ZXIgd291bGQuXG4vLyBUaGlzIGZpbGUgaXMgd3JpdHRlbiBpbiBKYXZhU2NyaXB0IHRvIGVuYWJsZSBjb3B5LXBhc3RpbmcgSXJvbiBSb3V0ZXIgY29kZS5cblxuLy8gVGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2lyb24tbWV0ZW9yL2lyb24tcm91dGVyL2Jsb2IvOWMzNjk0OTljOThhZjlmZDEyZWY5ZTY4MzM4ZGVlM2IxYjEyNzZhYS9saWIvcm91dGVyX3NlcnZlci5qcyNMM1xuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcblxuLy8gVGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2lyb24tbWV0ZW9yL2lyb24tcm91dGVyL2Jsb2IvOWMzNjk0OTljOThhZjlmZDEyZWY5ZTY4MzM4ZGVlM2IxYjEyNzZhYS9saWIvcm91dGVyX3NlcnZlci5qcyNMNDdcbmV4cG9ydCBmdW5jdGlvbiBpcm9uUm91dGVyU2VuZEVycm9yVG9SZXNwb25zZShlcnIsIHJlcSwgcmVzKSB7XG5cdGlmIChyZXMuc3RhdHVzQ29kZSA8IDQwMCkgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG5cblx0aWYgKGVyci5zdGF0dXMpIHJlcy5zdGF0dXNDb2RlID0gZXJyLnN0YXR1cztcblxuXHRsZXQgbXNnO1xuXHRpZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSBtc2cgPSBgJHtlcnIuc3RhY2sgfHwgZXJyLnRvU3RyaW5nKCl9XFxuYDtcblx0Ly8gWFhYIGdldCB0aGlzIGZyb20gc3RhbmRhcmQgZGljdCBvZiBlcnJvciBtZXNzYWdlcz9cblx0ZWxzZSBtc2cgPSAnU2VydmVyIGVycm9yLic7XG5cblx0Y29uc29sZS5lcnJvcihlcnIuc3RhY2sgfHwgZXJyLnRvU3RyaW5nKCkpO1xuXG5cdGlmIChyZXMuaGVhZGVyc1NlbnQpIHJldHVybiByZXEuc29ja2V0LmRlc3Ryb3koKTtcblxuXHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XG5cdHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtTGVuZ3RoJywgQnVmZmVyLmJ5dGVMZW5ndGgobXNnKSk7XG5cdGlmIChyZXEubWV0aG9kID09PSAnSEVBRCcpIHJldHVybiByZXMuZW5kKCk7XG5cdHJlcy5lbmQobXNnKTtcbn1cbiIsImltcG9ydCB7IFdlYkFwcCB9IGZyb20gJ21ldGVvci93ZWJhcHAnO1xuXG5jb25zdCBjb25uZWN0ID0gTnBtLnJlcXVpcmUoJ2Nvbm5lY3QnKTtcbmNvbnN0IGNvbm5lY3RSb3V0ZSA9IE5wbS5yZXF1aXJlKCdjb25uZWN0LXJvdXRlJyk7XG5cbldlYkFwcC5jb25uZWN0SGFuZGxlcnMudXNlKGNvbm5lY3QudXJsZW5jb2RlZCh7IGxpbWl0OiAnNTBtYicgfSkpOyAvLyBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3Qgc2l6ZVxuV2ViQXBwLmNvbm5lY3RIYW5kbGVycy51c2UoY29ubmVjdC5qc29uKHsgbGltaXQ6ICc1MG1iJyB9KSk7IC8vIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBzaXplXG5XZWJBcHAuY29ubmVjdEhhbmRsZXJzLnVzZShjb25uZWN0LnF1ZXJ5KCkpO1xuXG4vLyBTYXZlIHJlZmVyZW5jZSB0byByb3V0ZXIgZm9yIGxhdGVyXG5sZXQgY29ubmVjdFJvdXRlcjtcblxuY29uc3QgcmVzcG9uc2VIZWFkZXJzID0ge1xuXHQnQ2FjaGUtQ29udHJvbCc6ICduby1zdG9yZScsXG5cdCdQcmFnbWEnOiAnbm8tY2FjaGUnLFxufTtcblxuLy8gUmVnaXN0ZXIgYXMgYSBtaWRkbGV3YXJlXG5XZWJBcHAuY29ubmVjdEhhbmRsZXJzLnVzZShcblx0Y29ubmVjdFJvdXRlKGZ1bmN0aW9uIChyb3V0ZXIpIHtcblx0XHRjb25uZWN0Um91dGVyID0gcm91dGVyO1xuXHR9KSxcbik7XG5cbmZ1bmN0aW9uIHNldEhlYWRlcnMocmVzLCBoZWFkZXJzKSB7XG5cdE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdHJlcy5zZXRIZWFkZXIoa2V5LCB2YWx1ZSk7XG5cdH0pO1xufVxuXG5leHBvcnQgY29uc3QgSnNvblJvdXRlcyA9IHtcblx0YWRkKG1ldGhvZCwgcGF0aCwgaGFuZGxlcikge1xuXHRcdC8vIE1ha2Ugc3VyZSBwYXRoIHN0YXJ0cyB3aXRoIGEgc2xhc2hcblx0XHRpZiAocGF0aFswXSAhPT0gJy8nKSB7XG5cdFx0XHRwYXRoID0gYC8ke3BhdGh9YDtcblx0XHR9XG5cblx0XHRjb25uZWN0Um91dGVyW21ldGhvZC50b0xvd2VyQ2FzZSgpXShwYXRoLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHRcdC8vIFNldCBoZWFkZXJzIG9uIHJlc3BvbnNlXG5cdFx0XHRzZXRIZWFkZXJzKHJlcywgcmVzcG9uc2VIZWFkZXJzKTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXdhaXQgaGFuZGxlcihyZXEsIHJlcywgbmV4dCk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRuZXh0KGVycm9yKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcbn07XG4iLCJpbXBvcnQgeyBVc2VycyB9IGZyb20gJ0Byb2NrZXQuY2hhdC9tb2RlbHMnO1xuXG5pbXBvcnQgeyBpcm9uUm91dGVyU2VuZEVycm9yVG9SZXNwb25zZSB9IGZyb20gJy4vaXJvbi1yb3V0ZXItZXJyb3ItdG8tcmVzcG9uc2UnO1xuaW1wb3J0IHsgSnNvblJvdXRlcyB9IGZyb20gJy4vanNvbi1yb3V0ZXMnO1xuXG5jb25zdCBhdmFpbGFibGVNZXRob2RzID0gWydnZXQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnZGVsZXRlJywgJ29wdGlvbnMnXTtcblxuZXhwb3J0IGNsYXNzIFJvdXRlIHtcblx0Y29uc3RydWN0b3IoYXBpLCBwYXRoLCBvcHRpb25zLCBlbmRwb2ludHMxKSB7XG5cdFx0dGhpcy5hcGkgPSBhcGk7XG5cdFx0dGhpcy5wYXRoID0gcGF0aDtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuZW5kcG9pbnRzID0gZW5kcG9pbnRzMTtcblx0XHRpZiAoIXRoaXMuZW5kcG9pbnRzKSB7XG5cdFx0XHR0aGlzLmVuZHBvaW50cyA9IHRoaXMub3B0aW9ucztcblx0XHRcdHRoaXMub3B0aW9ucyA9IHt9O1xuXHRcdH1cblx0fVxuXG5cdGFkZFRvQXBpKCkge1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdGlmICh0aGlzLmFwaS5fY29uZmlnLnBhdGhzLmluY2x1ZGVzKHRoaXMucGF0aCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGFkZCBhIHJvdXRlIGF0IGFuIGV4aXN0aW5nIHBhdGg6ICR7dGhpcy5wYXRofWApO1xuXHRcdH1cblx0XHR0aGlzLmVuZHBvaW50cyA9IHtcblx0XHRcdG9wdGlvbnM6IHRoaXMuYXBpLl9jb25maWcuZGVmYXVsdE9wdGlvbnNFbmRwb2ludCxcblx0XHRcdC4uLnRoaXMuZW5kcG9pbnRzLFxuXHRcdH07XG5cdFx0dGhpcy5fcmVzb2x2ZUVuZHBvaW50cygpO1xuXHRcdHRoaXMuX2NvbmZpZ3VyZUVuZHBvaW50cygpO1xuXHRcdHRoaXMuYXBpLl9jb25maWcucGF0aHMucHVzaCh0aGlzLnBhdGgpO1xuXHRcdGNvbnN0IGFsbG93ZWRNZXRob2RzID0gYXZhaWxhYmxlTWV0aG9kcy5maWx0ZXIoZnVuY3Rpb24gKG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHNlbGYuZW5kcG9pbnRzKS5pbmNsdWRlcyhtZXRob2QpO1xuXHRcdH0pO1xuXHRcdGNvbnN0IHJlamVjdGVkTWV0aG9kcyA9IGF2YWlsYWJsZU1ldGhvZHMuZmlsdGVyKGZ1bmN0aW9uIChtZXRob2QpIHtcblx0XHRcdHJldHVybiAhT2JqZWN0LmtleXMoc2VsZi5lbmRwb2ludHMpLmluY2x1ZGVzKG1ldGhvZCk7XG5cdFx0fSk7XG5cdFx0Y29uc3QgZnVsbFBhdGggPSB0aGlzLmFwaS5fY29uZmlnLmFwaVBhdGggKyB0aGlzLnBhdGg7XG5cdFx0YWxsb3dlZE1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG5cdFx0XHRjb25zdCBlbmRwb2ludCA9IHNlbGYuZW5kcG9pbnRzW21ldGhvZF07XG5cdFx0XHRyZXR1cm4gSnNvblJvdXRlcy5hZGQobWV0aG9kLCBmdWxsUGF0aCwgYXN5bmMgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG5cdFx0XHRcdGxldCByZXNwb25zZUluaXRpYXRlZCA9IGZhbHNlO1xuXHRcdFx0XHRjb25zdCBkb25lRnVuYyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXNwb25zZUluaXRpYXRlZCA9IHRydWU7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNvbnN0IGVuZHBvaW50Q29udGV4dCA9IHtcblx0XHRcdFx0XHR1cmxQYXJhbXM6IHJlcS5wYXJhbXMsXG5cdFx0XHRcdFx0cXVlcnlQYXJhbXM6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRib2R5UGFyYW1zOiByZXEuYm9keSxcblx0XHRcdFx0XHRyZXF1ZXN0OiByZXEsXG5cdFx0XHRcdFx0cmVzcG9uc2U6IHJlcyxcblx0XHRcdFx0XHRkb25lOiBkb25lRnVuYyxcblx0XHRcdFx0XHQuLi5lbmRwb2ludCxcblx0XHRcdFx0fTtcblx0XHRcdFx0bGV0IHJlc3BvbnNlRGF0YSA9IG51bGw7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgc2VsZi5fY2FsbEVuZHBvaW50KGVuZHBvaW50Q29udGV4dCwgZW5kcG9pbnQpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0aXJvblJvdXRlclNlbmRFcnJvclRvUmVzcG9uc2UoZSwgcmVxLCByZXMpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocmVzcG9uc2VJbml0aWF0ZWQpIHtcblx0XHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyZXMuaGVhZGVyc1NlbnQpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE11c3QgY2FsbCB0aGlzLmRvbmUoKSBhZnRlciBoYW5kbGluZyBlbmRwb2ludCByZXNwb25zZSBtYW51YWxseTogJHttZXRob2R9ICR7ZnVsbFBhdGh9YCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzcG9uc2VEYXRhID09PSBudWxsIHx8IHJlc3BvbnNlRGF0YSA9PT0gdm9pZCAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmV0dXJuIG51bGwgb3IgdW5kZWZpbmVkIGZyb20gYW4gZW5kcG9pbnQ6ICR7bWV0aG9kfSAke2Z1bGxQYXRofWApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyZXNwb25zZURhdGEuYm9keSAmJiAocmVzcG9uc2VEYXRhLnN0YXR1c0NvZGUgfHwgcmVzcG9uc2VEYXRhLmhlYWRlcnMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuX3Jlc3BvbmQocmVzLCByZXNwb25zZURhdGEuYm9keSwgcmVzcG9uc2VEYXRhLnN0YXR1c0NvZGUsIHJlc3BvbnNlRGF0YS5oZWFkZXJzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2VsZi5fcmVzcG9uZChyZXMsIHJlc3BvbnNlRGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVqZWN0ZWRNZXRob2RzLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIEpzb25Sb3V0ZXMuYWRkKG1ldGhvZCwgZnVsbFBhdGgsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuXHRcdFx0XHRjb25zdCByZXNwb25zZURhdGEgPSB7XG5cdFx0XHRcdFx0c3RhdHVzOiAnZXJyb3InLFxuXHRcdFx0XHRcdG1lc3NhZ2U6ICdBUEkgZW5kcG9pbnQgZG9lcyBub3QgZXhpc3QnLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb25zdCBoZWFkZXJzID0ge1xuXHRcdFx0XHRcdEFsbG93OiBhbGxvd2VkTWV0aG9kcy5qb2luKCcsICcpLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiBzZWxmLl9yZXNwb25kKHJlcywgcmVzcG9uc2VEYXRhLCA0MDUsIGhlYWRlcnMpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKlxuXHRcdENvbnZlcnQgYWxsIGVuZHBvaW50cyBvbiB0aGUgZ2l2ZW4gcm91dGUgaW50byBvdXIgZXhwZWN0ZWQgZW5kcG9pbnQgb2JqZWN0IGlmIGl0IGlzIGEgYmFyZVxuXHRcdGZ1bmN0aW9uXG5cblx0XHRAcGFyYW0ge1JvdXRlfSByb3V0ZSBUaGUgcm91dGUgdGhlIGVuZHBvaW50cyBiZWxvbmcgdG9cblx0XHQqL1xuXG5cdF9yZXNvbHZlRW5kcG9pbnRzKCkge1xuXHRcdE9iamVjdC5lbnRyaWVzKHRoaXMuZW5kcG9pbnRzKS5mb3JFYWNoKChbbWV0aG9kLCBlbmRwb2ludF0pID0+IHtcblx0XHRcdGlmICh0eXBlb2YgZW5kcG9pbnQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhpcy5lbmRwb2ludHNbbWV0aG9kXSA9IHtcblx0XHRcdFx0XHRhY3Rpb246IGVuZHBvaW50LFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Lypcblx0XHRDb25maWd1cmUgdGhlIGF1dGhlbnRpY2F0aW9uIGFuZCByb2xlIHJlcXVpcmVtZW50IG9uIGFsbCBlbmRwb2ludHMgKGV4Y2VwdCBPUFRJT05TLCB3aGljaCBtdXN0XG5cdFx0YmUgY29uZmlndXJlZCBkaXJlY3RseSBvbiB0aGUgZW5kcG9pbnQpXG5cblx0XHRBdXRoZW50aWNhdGlvbiBjYW4gYmUgcmVxdWlyZWQgb24gYW4gZW50aXJlIHJvdXRlIG9yIGluZGl2aWR1YWwgZW5kcG9pbnRzLiBJZiByZXF1aXJlZCBvbiBhblxuXHRcdGVudGlyZSByb3V0ZSwgdGhhdCBzZXJ2ZXMgYXMgdGhlIGRlZmF1bHQuIElmIHJlcXVpcmVkIGluIGFueSBpbmRpdmlkdWFsIGVuZHBvaW50cywgdGhhdCB3aWxsXG5cdFx0b3ZlcnJpZGUgdGhlIGRlZmF1bHQuXG5cblx0XHRBZnRlciB0aGUgZW5kcG9pbnQgaXMgY29uZmlndXJlZCwgYWxsIGF1dGhlbnRpY2F0aW9uIGFuZCByb2xlIHJlcXVpcmVtZW50cyBvZiBhbiBlbmRwb2ludCBjYW4gYmVcblx0XHRhY2Nlc3NlZCBhdCA8Y29kZT5lbmRwb2ludC5hdXRoUmVxdWlyZWQ8L2NvZGU+IGFuZCA8Y29kZT5lbmRwb2ludC5yb2xlUmVxdWlyZWQ8L2NvZGU+LFxuXHRcdHJlc3BlY3RpdmVseS5cblxuXHRcdEBwYXJhbSB7Um91dGV9IHJvdXRlIFRoZSByb3V0ZSB0aGUgZW5kcG9pbnRzIGJlbG9uZyB0b1xuXHRcdEBwYXJhbSB7RW5kcG9pbnR9IGVuZHBvaW50IFRoZSBlbmRwb2ludCB0byBjb25maWd1cmVcblx0XHQqL1xuXG5cdF9jb25maWd1cmVFbmRwb2ludHMoKSB7XG5cdFx0T2JqZWN0LmVudHJpZXModGhpcy5lbmRwb2ludHMpLmZvckVhY2goKFttZXRob2QsIGVuZHBvaW50XSkgPT4ge1xuXHRcdFx0aWYgKG1ldGhvZCAhPT0gJ29wdGlvbnMnKSB7XG5cdFx0XHRcdGlmICghdGhpcy5vcHRpb25zPy5yb2xlUmVxdWlyZWQpIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMucm9sZVJlcXVpcmVkID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFlbmRwb2ludC5yb2xlUmVxdWlyZWQpIHtcblx0XHRcdFx0XHRlbmRwb2ludC5yb2xlUmVxdWlyZWQgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbmRwb2ludC5yb2xlUmVxdWlyZWQgPSBbLi4uZW5kcG9pbnQucm9sZVJlcXVpcmVkLCAuLi50aGlzLm9wdGlvbnMucm9sZVJlcXVpcmVkXTtcblx0XHRcdFx0aWYgKGVuZHBvaW50LnJvbGVSZXF1aXJlZC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRlbmRwb2ludC5yb2xlUmVxdWlyZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZW5kcG9pbnQuYXV0aFJlcXVpcmVkID09PSB2b2lkIDApIHtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zPy5hdXRoUmVxdWlyZWQgfHwgZW5kcG9pbnQucm9sZVJlcXVpcmVkKSB7XG5cdFx0XHRcdFx0XHRlbmRwb2ludC5hdXRoUmVxdWlyZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbmRwb2ludC5hdXRoUmVxdWlyZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qXG5cdFx0QXV0aGVudGljYXRlIGFuIGVuZHBvaW50IGlmIHJlcXVpcmVkLCBhbmQgcmV0dXJuIHRoZSByZXN1bHQgb2YgY2FsbGluZyBpdFxuXG5cdFx0QHJldHVybnMgVGhlIGVuZHBvaW50IHJlc3BvbnNlIG9yIGEgNDAxIGlmIGF1dGhlbnRpY2F0aW9uIGZhaWxzXG5cdFx0Ki9cblxuXHRhc3luYyBfY2FsbEVuZHBvaW50KGVuZHBvaW50Q29udGV4dCwgZW5kcG9pbnQpIHtcblx0XHRjb25zdCBhdXRoID0gYXdhaXQgdGhpcy5fYXV0aEFjY2VwdGVkKGVuZHBvaW50Q29udGV4dCwgZW5kcG9pbnQpO1xuXHRcdGlmIChhdXRoLnN1Y2Nlc3MpIHtcblx0XHRcdGlmICh0aGlzLl9yb2xlQWNjZXB0ZWQoZW5kcG9pbnRDb250ZXh0LCBlbmRwb2ludCkpIHtcblx0XHRcdFx0cmV0dXJuIGVuZHBvaW50LmFjdGlvbi5jYWxsKGVuZHBvaW50Q29udGV4dCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzdGF0dXNDb2RlOiA0MDMsXG5cdFx0XHRcdGJvZHk6IHtcblx0XHRcdFx0XHRzdGF0dXM6ICdlcnJvcicsXG5cdFx0XHRcdFx0bWVzc2FnZTogJ1lvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGRvIHRoaXMuJyxcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0fVxuXHRcdGlmIChhdXRoLmRhdGEpIHtcblx0XHRcdHJldHVybiBhdXRoLmRhdGE7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGF0dXNDb2RlOiA0MDEsXG5cdFx0XHRib2R5OiB7XG5cdFx0XHRcdHN0YXR1czogJ2Vycm9yJyxcblx0XHRcdFx0bWVzc2FnZTogJ1lvdSBtdXN0IGJlIGxvZ2dlZCBpbiB0byBkbyB0aGlzLicsXG5cdFx0XHR9LFxuXHRcdH07XG5cdH1cblxuXHQvKlxuXHRcdEF1dGhlbnRpY2F0ZSB0aGUgZ2l2ZW4gZW5kcG9pbnQgaWYgcmVxdWlyZWRcblxuXHRcdE9uY2UgaXQncyBnbG9iYWxseSBjb25maWd1cmVkIGluIHRoZSBBUEksIGF1dGhlbnRpY2F0aW9uIGNhbiBiZSByZXF1aXJlZCBvbiBhbiBlbnRpcmUgcm91dGUgb3Jcblx0XHRpbmRpdmlkdWFsIGVuZHBvaW50cy4gSWYgcmVxdWlyZWQgb24gYW4gZW50aXJlIGVuZHBvaW50LCB0aGF0IHNlcnZlcyBhcyB0aGUgZGVmYXVsdC4gSWYgcmVxdWlyZWRcblx0XHRpbiBhbnkgaW5kaXZpZHVhbCBlbmRwb2ludHMsIHRoYXQgd2lsbCBvdmVycmlkZSB0aGUgZGVmYXVsdC5cblxuXHRcdEByZXR1cm5zIEFuIG9iamVjdCBvZiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcblxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3VjY2VzczogQm9vbGVhblxuXHRcdFx0XHRcdGRhdGE6IFN0cmluZyBvciBPYmplY3Rcblx0XHRcdFx0fVxuXG5cdFx0XHR3aGVyZSBgc3VjY2Vzc2AgaXMgYHRydWVgIGlmIGFsbCByZXF1aXJlZCBhdXRoZW50aWNhdGlvbiBjaGVja3MgcGFzcyBhbmQgdGhlIG9wdGlvbmFsIGBkYXRhYFxuXHRcdFx0d2lsbCBjb250YWluIHRoZSBhdXRoIGRhdGEgd2hlbiBzdWNjZXNzZnVsIGFuZCBhbiBvcHRpb25hbCBlcnJvciByZXNwb25zZSB3aGVuIGF1dGggZmFpbHMuXG5cdFx0Ki9cblxuXHRhc3luYyBfYXV0aEFjY2VwdGVkKGVuZHBvaW50Q29udGV4dCwgZW5kcG9pbnQpIHtcblx0XHRpZiAoZW5kcG9pbnQuYXV0aFJlcXVpcmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlKGVuZHBvaW50Q29udGV4dCk7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRzdWNjZXNzOiB0cnVlLFxuXHRcdH07XG5cdH1cblxuXHQvKlxuXHRcdFZlcmlmeSB0aGUgcmVxdWVzdCBpcyBiZWluZyBtYWRlIGJ5IGFuIGFjdGl2ZWx5IGxvZ2dlZCBpbiB1c2VyXG5cblx0XHRJZiB2ZXJpZmllZCwgYXR0YWNoIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgdG8gdGhlIGNvbnRleHQuXG5cblx0XHRAcmV0dXJucyBBbiBvYmplY3Qgb2YgdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN1Y2Nlc3M6IEJvb2xlYW5cblx0XHRcdFx0XHRkYXRhOiBTdHJpbmcgb3IgT2JqZWN0XG5cdFx0XHRcdH1cblxuXHRcdFx0d2hlcmUgYHN1Y2Nlc3NgIGlzIGB0cnVlYCBpZiBhbGwgcmVxdWlyZWQgYXV0aGVudGljYXRpb24gY2hlY2tzIHBhc3MgYW5kIHRoZSBvcHRpb25hbCBgZGF0YWBcblx0XHRcdHdpbGwgY29udGFpbiB0aGUgYXV0aCBkYXRhIHdoZW4gc3VjY2Vzc2Z1bCBhbmQgYW4gb3B0aW9uYWwgZXJyb3IgcmVzcG9uc2Ugd2hlbiBhdXRoIGZhaWxzLlxuXHRcdCovXG5cblx0YXN5bmMgX2F1dGhlbnRpY2F0ZShlbmRwb2ludENvbnRleHQpIHtcblx0XHRjb25zdCBhdXRoID0gYXdhaXQgdGhpcy5hcGkuX2NvbmZpZy5hdXRoLnVzZXIuY2FsbChlbmRwb2ludENvbnRleHQpO1xuXHRcdGlmICghYXV0aCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c3VjY2VzczogZmFsc2UsXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRpZiAoYXV0aC51c2VySWQgJiYgYXV0aC50b2tlbiAmJiAhYXV0aC51c2VyKSB7XG5cdFx0XHRjb25zdCB1c2VyU2VsZWN0b3IgPSB7fTtcblx0XHRcdHVzZXJTZWxlY3Rvci5faWQgPSBhdXRoLnVzZXJJZDtcblx0XHRcdHVzZXJTZWxlY3Rvclt0aGlzLmFwaS5fY29uZmlnLmF1dGgudG9rZW5dID0gYXV0aC50b2tlbjtcblx0XHRcdGF1dGgudXNlciA9IGF3YWl0IFVzZXJzLmZpbmRPbmUodXNlclNlbGVjdG9yKTtcblx0XHR9XG5cdFx0aWYgKGF1dGguZXJyb3IpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN1Y2Nlc3M6IGZhbHNlLFxuXHRcdFx0XHRkYXRhOiBhdXRoLmVycm9yLFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0aWYgKGF1dGgudXNlcikge1xuXHRcdFx0ZW5kcG9pbnRDb250ZXh0LnVzZXIgPSBhdXRoLnVzZXI7XG5cdFx0XHRlbmRwb2ludENvbnRleHQudXNlcklkID0gYXV0aC51c2VyLl9pZDtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHRcdGRhdGE6IGF1dGgsXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogZmFsc2UsXG5cdFx0fTtcblx0fVxuXG5cdC8qXG5cdFx0QXV0aGVudGljYXRlIHRoZSB1c2VyIHJvbGUgaWYgcmVxdWlyZWRcblxuXHRcdE11c3QgYmUgY2FsbGVkIGFmdGVyIF9hdXRoQWNjZXB0ZWQoKS5cblxuXHRcdEByZXR1cm5zIFRydWUgaWYgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBiZWxvbmdzIHRvIDxpPmFueTwvaT4gb2YgdGhlIGFjY2VwdGFibGUgcm9sZXMgb24gdGhlXG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50XG5cdFx0Ki9cblxuXHRfcm9sZUFjY2VwdGVkKGVuZHBvaW50Q29udGV4dCwgZW5kcG9pbnQpIHtcblx0XHRpZiAoZW5kcG9pbnQucm9sZVJlcXVpcmVkKSB7XG5cdFx0XHRjb25zdCBpbnRlcnNlY3Rpb24gPSBbZW5kcG9pbnQucm9sZVJlcXVpcmVkLCBlbmRwb2ludENvbnRleHQudXNlci5yb2xlc10ucmVkdWNlKChhLCBiKSA9PiBhLmZpbHRlcigoYykgPT4gYi5pbmNsdWRlcyhjKSkpO1xuXHRcdFx0aWYgKGludGVyc2VjdGlvbi5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qXG5cdFx0UmVzcG9uZCB0byBhbiBIVFRQIHJlcXVlc3Rcblx0XHQqL1xuXG5cdF9yZXNwb25kKHJlc3BvbnNlLCBib2R5LCBzdGF0dXNDb2RlLCBoZWFkZXJzKSB7XG5cdFx0bGV0IGRlbGF5SW5NaWxsaXNlY29uZHM7XG5cdFx0bGV0IG1pbmltdW1EZWxheUluTWlsbGlzZWNvbmRzO1xuXHRcdGxldCByYW5kb21NdWx0aXBsaWVyQmV0d2Vlbk9uZUFuZFR3bztcblx0XHRpZiAoc3RhdHVzQ29kZSA9PSBudWxsKSB7XG5cdFx0XHRzdGF0dXNDb2RlID0gMjAwO1xuXHRcdH1cblx0XHRpZiAoaGVhZGVycyA9PSBudWxsKSB7XG5cdFx0XHRoZWFkZXJzID0ge307XG5cdFx0fVxuXHRcdGNvbnN0IGRlZmF1bHRIZWFkZXJzID0gdGhpcy5fbG93ZXJDYXNlS2V5cyh0aGlzLmFwaS5fY29uZmlnLmRlZmF1bHRIZWFkZXJzKTtcblx0XHRoZWFkZXJzID0gdGhpcy5fbG93ZXJDYXNlS2V5cyhoZWFkZXJzKTtcblx0XHRoZWFkZXJzID0geyAuLi5kZWZhdWx0SGVhZGVycywgLi4uaGVhZGVycyB9O1xuXHRcdGlmIChoZWFkZXJzWydjb250ZW50LXR5cGUnXS5tYXRjaCgvanNvbnxqYXZhc2NyaXB0LykgIT09IG51bGwpIHtcblx0XHRcdGlmICh0aGlzLmFwaS5fY29uZmlnLnByZXR0eUpzb24pIHtcblx0XHRcdFx0Ym9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHksIHZvaWQgMCwgMik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvbnN0IHNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlc3BvbnNlLndyaXRlSGVhZChzdGF0dXNDb2RlLCBoZWFkZXJzKTtcblx0XHRcdHJlc3BvbnNlLndyaXRlKGJvZHkpO1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmVuZCgpO1xuXHRcdH07XG5cdFx0aWYgKHN0YXR1c0NvZGUgPT09IDQwMSB8fCBzdGF0dXNDb2RlID09PSA0MDMpIHtcblx0XHRcdG1pbmltdW1EZWxheUluTWlsbGlzZWNvbmRzID0gNTAwO1xuXHRcdFx0cmFuZG9tTXVsdGlwbGllckJldHdlZW5PbmVBbmRUd28gPSAxICsgTWF0aC5yYW5kb20oKTtcblx0XHRcdGRlbGF5SW5NaWxsaXNlY29uZHMgPSBtaW5pbXVtRGVsYXlJbk1pbGxpc2Vjb25kcyAqIHJhbmRvbU11bHRpcGxpZXJCZXR3ZWVuT25lQW5kVHdvO1xuXHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoc2VuZFJlc3BvbnNlLCBkZWxheUluTWlsbGlzZWNvbmRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHNlbmRSZXNwb25zZSgpO1xuXHR9XG5cblx0Lypcblx0XHRSZXR1cm4gdGhlIG9iamVjdCB3aXRoIGFsbCBvZiB0aGUga2V5cyBjb252ZXJ0ZWQgdG8gbG93ZXJjYXNlXG5cdFx0Ki9cblxuXHRfbG93ZXJDYXNlS2V5cyhvYmplY3QpIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBrZXkpID0+IHtcblx0XHRcdGFjY3VtdWxhdG9yW2tleS50b0xvd2VyQ2FzZSgpXSA9IG9iamVjdFtrZXldO1xuXHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yO1xuXHRcdH0sIHt9KTtcblx0fVxufVxuIl19
