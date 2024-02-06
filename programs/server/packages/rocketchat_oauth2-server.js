(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __coffeescriptShare, OAuth2Server;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_oauth2-server/model.coffee                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AccessTokens, AuthCodes, Clients, Model, RefreshTokens, debug;
AccessTokens = void 0;
RefreshTokens = void 0;
Clients = void 0;
AuthCodes = void 0;
debug = void 0;
this.Model = Model = function () {
  class Model {
    constructor() {
      let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (config.accessTokensCollectionName == null) {
        config.accessTokensCollectionName = 'oauth_access_tokens';
      }
      if (config.refreshTokensCollectionName == null) {
        config.refreshTokensCollectionName = 'oauth_refresh_tokens';
      }
      if (config.clientsCollectionName == null) {
        config.clientsCollectionName = 'oauth_clients';
      }
      if (config.authCodesCollectionName == null) {
        config.authCodesCollectionName = 'oauth_auth_codes';
      }
      this.debug = debug = config.debug;
      this.AccessTokens = AccessTokens = config.accessTokensCollection || new Meteor.Collection(config.accessTokensCollectionName);
      this.RefreshTokens = RefreshTokens = config.refreshTokensCollection || new Meteor.Collection(config.refreshTokensCollectionName);
      this.Clients = Clients = config.clientsCollection || new Meteor.Collection(config.clientsCollectionName);
      this.AuthCodes = AuthCodes = config.authCodesCollection || new Meteor.Collection(config.authCodesCollectionName);
    }
    grantTypeAllowed(clientId, grantType, callback) {
      if (debug === true) {
        console.log('[OAuth2Server]', 'in grantTypeAllowed (clientId:', clientId, ', grantType:', grantType + ')');
      }
      return callback(false, grantType === 'authorization_code' || grantType === 'refresh_token');
    }
  }
  ;
  Model.prototype.getAccessToken = Meteor.bindEnvironment(function (bearerToken, callback) {
    var e, token;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in getAccessToken (bearerToken:', bearerToken, ')');
    }
    try {
      token = AccessTokens.findOne({
        accessToken: bearerToken
      });
      return callback(null, token);
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  Model.prototype.getClient = Meteor.bindEnvironment(function (clientId, clientSecret, callback) {
    var client, e;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in getClient (clientId:', clientId, ', clientSecret:', clientSecret, ')');
    }
    try {
      if (clientSecret == null) {
        client = Clients.findOne({
          active: true,
          clientId: clientId
        });
      } else {
        client = Clients.findOne({
          active: true,
          clientId: clientId,
          clientSecret: clientSecret
        });
      }
      return callback(null, client);
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  Model.prototype.saveAccessToken = Meteor.bindEnvironment(function (token, clientId, expires, user, callback) {
    var e, tokenId;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in saveAccessToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')');
    }
    try {
      tokenId = AccessTokens.insert({
        accessToken: token,
        clientId: clientId,
        userId: user.id,
        expires: expires
      });
      return callback(null, tokenId);
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  Model.prototype.getAuthCode = Meteor.bindEnvironment(function (authCode, callback) {
    var code, e;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in getAuthCode (authCode: ' + authCode + ')');
    }
    try {
      code = AuthCodes.findOne({
        authCode: authCode
      });
      return callback(null, code);
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  Model.prototype.saveAuthCode = Meteor.bindEnvironment(function (code, clientId, expires, user, callback) {
    var codeId, e;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in saveAuthCode (code:', code, ', clientId:', clientId, ', expires:', expires, ', user:', user, ')');
    }
    try {
      codeId = AuthCodes.upsert({
        authCode: code
      }, {
        authCode: code,
        clientId: clientId,
        userId: user.id,
        expires: expires
      });
      return callback(null, codeId);
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  Model.prototype.saveRefreshToken = Meteor.bindEnvironment(function (token, clientId, expires, user, callback) {
    var e, tokenId;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in saveRefreshToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')');
    }
    try {
      return tokenId = RefreshTokens.insert({
        refreshToken: token,
        clientId: clientId,
        userId: user.id,
        expires: expires
      }, callback(null, tokenId));
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  Model.prototype.getRefreshToken = Meteor.bindEnvironment(function (refreshToken, callback) {
    var e, token;
    if (debug === true) {
      console.log('[OAuth2Server]', 'in getRefreshToken (refreshToken: ' + refreshToken + ')');
    }
    try {
      token = RefreshTokens.findOne({
        refreshToken: refreshToken
      });
      return callback(null, token);
    } catch (error) {
      e = error;
      return callback(e);
    }
  });
  return Model;
}.call(this);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_oauth2-server/oauth.coffee                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var express, oauthserver;
oauthserver = Npm.require('oauth2-server');
express = Npm.require('express');

// WebApp.rawConnectHandlers.use app
// JsonRoutes.Middleware.use app
OAuth2Server = class OAuth2Server {
  constructor() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.config = config;
    this.app = express();
    this.routes = express();
    this.model = new Model(this.config);
    this.oauth = oauthserver({
      model: this.model,
      grants: ['authorization_code', 'refresh_token'],
      debug: this.config.debug
    });
    this.publishAuhorizedClients();
    this.initRoutes();
    return this;
  }
  publishAuhorizedClients() {
    return Meteor.publish('authorizedOAuth', function () {
      if (this.userId == null) {
        return this.ready();
      }
      return Meteor.users.find({
        _id: this.userId
      }, {
        fields: {
          'oauth.authorizedClients': 1
        }
      });
      return typeof user !== "undefined" && user !== null;
    });
  }
  initRoutes() {
    var debugMiddleware, self, transformRequestsNotUsingFormUrlencodedType;
    self = this;
    debugMiddleware = function (req, res, next) {
      if (self.config.debug === true) {
        console.log('[OAuth2Server]', req.method, req.url);
      }
      return next();
    };
    // Transforms requests which are POST and aren't "x-www-form-urlencoded" content type
    // and they pass the required information as query strings
    transformRequestsNotUsingFormUrlencodedType = function (req, res, next) {
      if (!req.is('application/x-www-form-urlencoded') && req.method === 'POST') {
        if (self.config.debug === true) {
          console.log('[OAuth2Server]', 'Transforming a request to form-urlencoded with the query going to the body.');
        }
        req.headers['content-type'] = 'application/x-www-form-urlencoded';
        req.body = Object.assign({}, req.body, req.query);
      }
      return next();
    };
    this.app.all('/oauth/token', debugMiddleware, transformRequestsNotUsingFormUrlencodedType, this.oauth.grant());
    this.app.get('/oauth/authorize', debugMiddleware, Meteor.bindEnvironment(function (req, res, next) {
      var client;
      client = self.model.Clients.findOne({
        active: true,
        clientId: req.query.client_id
      });
      if (client == null) {
        return res.redirect('/oauth/error/404');
      }
      if (![].concat(client.redirectUri).includes(req.query.redirect_uri)) {
        return res.redirect('/oauth/error/invalid_redirect_uri');
      }
      return next();
    }));
    this.app.post('/oauth/authorize', debugMiddleware, Meteor.bindEnvironment(function (req, res, next) {
      var user;
      if (req.body.token == null) {
        return res.sendStatus(401).send('No token');
      }
      user = Meteor.users.findOne({
        'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(req.body.token)
      });
      if (user == null) {
        return res.sendStatus(401).send('Invalid token');
      }
      req.user = {
        id: user._id
      };
      return next();
    }));
    this.app.post('/oauth/authorize', debugMiddleware, this.oauth.authCodeGrant(function (req, next) {
      if (req.body.allow === 'yes') {
        Meteor.users.update(req.user.id, {
          $addToSet: {
            'oauth.authorizedClients': this.clientId
          }
        });
      }
      return next(null, req.body.allow === 'yes', req.user);
    }));
    this.app.use(this.routes);
    return this.app.all('/oauth/*', this.oauth.errorHandler());
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("rocketchat:oauth2-server", {
  OAuth2Server: OAuth2Server
});

})();

//# sourceURL=meteor://💻app/packages/rocketchat_oauth2-server.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcm9ja2V0Y2hhdF9vYXV0aDItc2VydmVyL21vZGVsLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvbW9kZWwuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yb2NrZXRjaGF0X29hdXRoMi1zZXJ2ZXIvb2F1dGguY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9vYXV0aC5jb2ZmZWUiXSwibmFtZXMiOlsiQWNjZXNzVG9rZW5zIiwiQXV0aENvZGVzIiwiQ2xpZW50cyIsIk1vZGVsIiwiUmVmcmVzaFRva2VucyIsImRlYnVnIiwiY29uc3RydWN0b3IiLCJjb25maWciLCJhY2Nlc3NUb2tlbnNDb2xsZWN0aW9uTmFtZSIsInJlZnJlc2hUb2tlbnNDb2xsZWN0aW9uTmFtZSIsImNsaWVudHNDb2xsZWN0aW9uTmFtZSIsImF1dGhDb2Rlc0NvbGxlY3Rpb25OYW1lIiwiYWNjZXNzVG9rZW5zQ29sbGVjdGlvbiIsIk1ldGVvciIsIkNvbGxlY3Rpb24iLCJyZWZyZXNoVG9rZW5zQ29sbGVjdGlvbiIsImNsaWVudHNDb2xsZWN0aW9uIiwiYXV0aENvZGVzQ29sbGVjdGlvbiIsImdyYW50VHlwZUFsbG93ZWQiLCJjbGllbnRJZCIsImdyYW50VHlwZSIsImNhbGxiYWNrIiwiY29uc29sZSIsImxvZyIsInByb3RvdHlwZSIsImdldEFjY2Vzc1Rva2VuIiwiYmluZEVudmlyb25tZW50IiwiYmVhcmVyVG9rZW4iLCJlIiwidG9rZW4iLCJmaW5kT25lIiwiYWNjZXNzVG9rZW4iLCJlcnJvciIsImdldENsaWVudCIsImNsaWVudFNlY3JldCIsImNsaWVudCIsImFjdGl2ZSIsInNhdmVBY2Nlc3NUb2tlbiIsImV4cGlyZXMiLCJ1c2VyIiwidG9rZW5JZCIsImluc2VydCIsInVzZXJJZCIsImlkIiwiZ2V0QXV0aENvZGUiLCJhdXRoQ29kZSIsImNvZGUiLCJzYXZlQXV0aENvZGUiLCJjb2RlSWQiLCJ1cHNlcnQiLCJzYXZlUmVmcmVzaFRva2VuIiwicmVmcmVzaFRva2VuIiwiZ2V0UmVmcmVzaFRva2VuIiwiY2FsbCIsImV4cHJlc3MiLCJvYXV0aHNlcnZlciIsIk5wbSIsInJlcXVpcmUiLCJPQXV0aDJTZXJ2ZXIiLCJhcHAiLCJyb3V0ZXMiLCJtb2RlbCIsIm9hdXRoIiwiZ3JhbnRzIiwicHVibGlzaEF1aG9yaXplZENsaWVudHMiLCJpbml0Um91dGVzIiwicHVibGlzaCIsInJlYWR5IiwidXNlcnMiLCJmaW5kIiwiX2lkIiwiZmllbGRzIiwiZGVidWdNaWRkbGV3YXJlIiwic2VsZiIsInRyYW5zZm9ybVJlcXVlc3RzTm90VXNpbmdGb3JtVXJsZW5jb2RlZFR5cGUiLCJyZXEiLCJyZXMiLCJuZXh0IiwibWV0aG9kIiwidXJsIiwiaXMiLCJoZWFkZXJzIiwiYm9keSIsIk9iamVjdCIsImFzc2lnbiIsInF1ZXJ5IiwiYWxsIiwiZ3JhbnQiLCJnZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdCIsImNvbmNhdCIsInJlZGlyZWN0VXJpIiwiaW5jbHVkZXMiLCJyZWRpcmVjdF91cmkiLCJwb3N0Iiwic2VuZFN0YXR1cyIsInNlbmQiLCJBY2NvdW50cyIsIl9oYXNoTG9naW5Ub2tlbiIsImF1dGhDb2RlR3JhbnQiLCJhbGxvdyIsInVwZGF0ZSIsIiRhZGRUb1NldCIsInVzZSIsImVycm9ySGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxZQUFBLEVBQUFDLFNBQUEsRUFBQUMsT0FBQSxFQUFBQyxLQUFBLEVBQUFDLGFBQUEsRUFBQUMsS0FBQTtBQUFBTCxZQUFBLEdBQWU7QUFDZkksYUFBQSxHQUFnQjtBQUNoQkYsT0FBQSxHQUFVO0FBQ1ZELFNBQUEsR0FBWTtBQUNaSSxLQUFBLEdBQVE7QUFFUixJQUFDLENBQUFGLEtBQUQsR0FBZUEsS0FBQTtFQUFOLE1BQUFBLEtBQUE7SUFDUkcsV0FBYTtNQUFBLElBQUNDLE1BQUEsdUVBQU8sRUFBUjtNQ1FSLElBQUlBLE1BQU0sQ0FBQ0Ms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VUFBN0I7UUFBWixDQUFqQztNQ1lFO01BQ0EsT0RYSDBELElBQUEsQ0FBSyxJQUFMLEVBQVdGLEdBQUcsQ0FBQ08sSUFBSSxDQUFDbUIsS0FBVCxLQUFrQixLQUE3QixFQUFvQzFCLEdBQUcsQ0FBQ3BDLElBQXhDO0lBSm1FLENBQXJCLENBQS9DO0lBTUEsSUFBQyxDQUFBb0IsR0FBRyxDQUFDNkMsR0FBTCxDQUFTLElBQUMsQ0FBQTVDLE1BQVY7SUNZRSxPRFZGLElBQUMsQ0FBQUQsR0FBRyxDQUFDMkIsR0FBTCxDQUFTLFVBQVQsRUFBcUIsSUFBQyxDQUFBeEIsS0FBSyxDQUFDMkMsWUFBUCxFQUFyQjtFQXJEVztBQWpDYixFIiwiZmlsZSI6Ii9wYWNrYWdlcy9yb2NrZXRjaGF0X29hdXRoMi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJBY2Nlc3NUb2tlbnMgPSB1bmRlZmluZWRcblJlZnJlc2hUb2tlbnMgPSB1bmRlZmluZWRcbkNsaWVudHMgPSB1bmRlZmluZWRcbkF1dGhDb2RlcyA9IHVuZGVmaW5lZFxuZGVidWcgPSB1bmRlZmluZWRcblxuQE1vZGVsID0gY2xhc3MgTW9kZWxcblx0Y29uc3RydWN0b3I6IChjb25maWc9e30pIC0+XG5cdFx0Y29uZmlnLmFjY2Vzc1Rva2Vuc0NvbGxlY3Rpb25OYW1lID89ICdvYXV0aF9hY2Nlc3NfdG9rZW5zJ1xuXHRcdGNvbmZpZy5yZWZyZXNoVG9rZW5zQ29sbGVjdGlvbk5hbWUgPz0gJ29hdXRoX3JlZnJlc2hfdG9rZW5zJ1xuXHRcdGNvbmZpZy5jbGllbnRzQ29sbGVjdGlvbk5hbWUgPz0gJ29hdXRoX2NsaWVudHMnXG5cdFx0Y29uZmlnLmF1dGhDb2Rlc0NvbGxlY3Rpb25OYW1lID89ICdvYXV0aF9hdXRoX2NvZGVzJ1xuXG5cdFx0QGRlYnVnID0gZGVidWcgPSBjb25maWcuZGVidWdcblxuXHRcdEBBY2Nlc3NUb2tlbnMgPSBBY2Nlc3NUb2tlbnMgPSBjb25maWcuYWNjZXNzVG9rZW5zQ29sbGVjdGlvbiBvciBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24gY29uZmlnLmFjY2Vzc1Rva2Vuc0NvbGxlY3Rpb25OYW1lXG5cdFx0QFJlZnJlc2hUb2tlbnMgPSBSZWZyZXNoVG9rZW5zID0gY29uZmlnLnJlZnJlc2hUb2tlbnNDb2xsZWN0aW9uIG9yIG5ldyBNZXRlb3IuQ29sbGVjdGlvbiBjb25maWcucmVmcmVzaFRva2Vuc0NvbGxlY3Rpb25OYW1lXG5cdFx0QENsaWVudHMgPSBDbGllbnRzID0gY29uZmlnLmNsaWVudHNDb2xsZWN0aW9uIG9yIG5ldyBNZXRlb3IuQ29sbGVjdGlvbiBjb25maWcuY2xpZW50c0NvbGxlY3Rpb25OYW1lXG5cdFx0QEF1dGhDb2RlcyA9IEF1dGhDb2RlcyA9IGNvbmZpZy5hdXRoQ29kZXNDb2xsZWN0aW9uIG9yIG5ldyBNZXRlb3IuQ29sbGVjdGlvbiBjb25maWcuYXV0aENvZGVzQ29sbGVjdGlvbk5hbWVcblxuXG5cdGdldEFjY2Vzc1Rva2VuOiBNZXRlb3IuYmluZEVudmlyb25tZW50IChiZWFyZXJUb2tlbiwgY2FsbGJhY2spIC0+XG5cdFx0aWYgZGVidWcgaXMgdHJ1ZVxuXHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIGdldEFjY2Vzc1Rva2VuIChiZWFyZXJUb2tlbjonLCBiZWFyZXJUb2tlbiwgJyknXG5cblx0XHR0cnlcblx0XHRcdHRva2VuID0gQWNjZXNzVG9rZW5zLmZpbmRPbmUgYWNjZXNzVG9rZW46IGJlYXJlclRva2VuXG5cdFx0XHRjYWxsYmFjayBudWxsLCB0b2tlblxuXHRcdGNhdGNoIGVcblx0XHRcdGNhbGxiYWNrIGVcblxuXG5cdGdldENsaWVudDogTWV0ZW9yLmJpbmRFbnZpcm9ubWVudCAoY2xpZW50SWQsIGNsaWVudFNlY3JldCwgY2FsbGJhY2spIC0+XG5cdFx0aWYgZGVidWcgaXMgdHJ1ZVxuXHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIGdldENsaWVudCAoY2xpZW50SWQ6JywgY2xpZW50SWQsICcsIGNsaWVudFNlY3JldDonLCBjbGllbnRTZWNyZXQsICcpJ1xuXG5cdFx0dHJ5XG5cdFx0XHRpZiBub3QgY2xpZW50U2VjcmV0P1xuXHRcdFx0XHRjbGllbnQgPSBDbGllbnRzLmZpbmRPbmUgeyBhY3RpdmU6IHRydWUsIGNsaWVudElkOiBjbGllbnRJZCB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNsaWVudCA9IENsaWVudHMuZmluZE9uZSB7IGFjdGl2ZTogdHJ1ZSwgY2xpZW50SWQ6IGNsaWVudElkLCBjbGllbnRTZWNyZXQ6IGNsaWVudFNlY3JldCB9XG5cdFx0XHRjYWxsYmFjayBudWxsLCBjbGllbnRcblx0XHRjYXRjaCBlXG5cdFx0XHRjYWxsYmFjayBlXG5cblxuXHRncmFudFR5cGVBbGxvd2VkOiAoY2xpZW50SWQsIGdyYW50VHlwZSwgY2FsbGJhY2spIC0+XG5cdFx0aWYgZGVidWcgaXMgdHJ1ZVxuXHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIGdyYW50VHlwZUFsbG93ZWQgKGNsaWVudElkOicsIGNsaWVudElkLCAnLCBncmFudFR5cGU6JywgZ3JhbnRUeXBlICsgJyknXG5cblx0XHRyZXR1cm4gY2FsbGJhY2soZmFsc2UsIGdyYW50VHlwZSBpbiBbJ2F1dGhvcml6YXRpb25fY29kZScsICdyZWZyZXNoX3Rva2VuJ10pXG5cblxuXHRzYXZlQWNjZXNzVG9rZW46IE1ldGVvci5iaW5kRW52aXJvbm1lbnQgKHRva2VuLCBjbGllbnRJZCwgZXhwaXJlcywgdXNlciwgY2FsbGJhY2spIC0+XG5cdFx0aWYgZGVidWcgaXMgdHJ1ZVxuXHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIHNhdmVBY2Nlc3NUb2tlbiAodG9rZW46JywgdG9rZW4sICcsIGNsaWVudElkOicsIGNsaWVudElkLCAnLCB1c2VyOicsIHVzZXIsICcsIGV4cGlyZXM6JywgZXhwaXJlcywgJyknXG5cblx0XHR0cnlcblx0XHRcdHRva2VuSWQgPSBBY2Nlc3NUb2tlbnMuaW5zZXJ0XG5cdFx0XHRcdGFjY2Vzc1Rva2VuOiB0b2tlblxuXHRcdFx0XHRjbGllbnRJZDogY2xpZW50SWRcblx0XHRcdFx0dXNlcklkOiB1c2VyLmlkXG5cdFx0XHRcdGV4cGlyZXM6IGV4cGlyZXNcblxuXHRcdFx0Y2FsbGJhY2sgbnVsbCwgdG9rZW5JZFxuXHRcdGNhdGNoIGVcblx0XHRcdGNhbGxiYWNrIGVcblxuXG5cdGdldEF1dGhDb2RlOiBNZXRlb3IuYmluZEVudmlyb25tZW50IChhdXRoQ29kZSwgY2FsbGJhY2spIC0+XG5cdFx0aWYgZGVidWcgaXMgdHJ1ZVxuXHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIGdldEF1dGhDb2RlIChhdXRoQ29kZTogJyArIGF1dGhDb2RlICsgJyknXG5cblx0XHR0cnlcblx0XHRcdGNvZGUgPSBBdXRoQ29kZXMuZmluZE9uZSBhdXRoQ29kZTogYXV0aENvZGVcblx0XHRcdGNhbGxiYWNrIG51bGwsIGNvZGVcblx0XHRjYXRjaCBlXG5cdFx0XHRjYWxsYmFjayBlXG5cblxuXHRzYXZlQXV0aENvZGU6IE1ldGVvci5iaW5kRW52aXJvbm1lbnQgKGNvZGUsIGNsaWVudElkLCBleHBpcmVzLCB1c2VyLCBjYWxsYmFjaykgLT5cblx0XHRpZiBkZWJ1ZyBpcyB0cnVlXG5cdFx0XHRjb25zb2xlLmxvZyAnW09BdXRoMlNlcnZlcl0nLCAnaW4gc2F2ZUF1dGhDb2RlIChjb2RlOicsIGNvZGUsICcsIGNsaWVudElkOicsIGNsaWVudElkLCAnLCBleHBpcmVzOicsIGV4cGlyZXMsICcsIHVzZXI6JywgdXNlciwgJyknXG5cblx0XHR0cnlcblx0XHRcdGNvZGVJZCA9IEF1dGhDb2Rlcy51cHNlcnRcblx0XHRcdFx0YXV0aENvZGU6IGNvZGVcblx0XHRcdCxcblx0XHRcdFx0YXV0aENvZGU6IGNvZGVcblx0XHRcdFx0Y2xpZW50SWQ6IGNsaWVudElkXG5cdFx0XHRcdHVzZXJJZDogdXNlci5pZFxuXHRcdFx0XHRleHBpcmVzOiBleHBpcmVzXG5cblx0XHRcdGNhbGxiYWNrIG51bGwsIGNvZGVJZFxuXHRcdGNhdGNoIGVcblx0XHRcdGNhbGxiYWNrIGVcblxuXG5cdHNhdmVSZWZyZXNoVG9rZW46IE1ldGVvci5iaW5kRW52aXJvbm1lbnQgKHRva2VuLCBjbGllbnRJZCwgZXhwaXJlcywgdXNlciwgY2FsbGJhY2spIC0+XG5cdFx0aWYgZGVidWcgaXMgdHJ1ZVxuXHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIHNhdmVSZWZyZXNoVG9rZW4gKHRva2VuOicsIHRva2VuLCAnLCBjbGllbnRJZDonLCBjbGllbnRJZCwgJywgdXNlcjonLCB1c2VyLCAnLCBleHBpcmVzOicsIGV4cGlyZXMsICcpJ1xuXG5cdFx0dHJ5XG5cdFx0XHR0b2tlbklkID0gUmVmcmVzaFRva2Vucy5pbnNlcnRcblx0XHRcdFx0cmVmcmVzaFRva2VuOiB0b2tlblxuXHRcdFx0XHRjbGllbnRJZDogY2xpZW50SWRcblx0XHRcdFx0dXNlcklkOiB1c2VyLmlkXG5cdFx0XHRcdGV4cGlyZXM6IGV4cGlyZXNcblxuXHRcdFx0XHRjYWxsYmFjayBudWxsLCB0b2tlbklkXG5cdFx0Y2F0Y2ggZVxuXHRcdFx0Y2FsbGJhY2sgZVxuXG5cblx0Z2V0UmVmcmVzaFRva2VuOiBNZXRlb3IuYmluZEVudmlyb25tZW50IChyZWZyZXNoVG9rZW4sIGNhbGxiYWNrKSAtPlxuXHRcdGlmIGRlYnVnIGlzIHRydWVcblx0XHRcdGNvbnNvbGUubG9nICdbT0F1dGgyU2VydmVyXScsICdpbiBnZXRSZWZyZXNoVG9rZW4gKHJlZnJlc2hUb2tlbjogJyArIHJlZnJlc2hUb2tlbiArICcpJ1xuXG5cdFx0dHJ5XG5cdFx0XHR0b2tlbiA9IFJlZnJlc2hUb2tlbnMuZmluZE9uZSByZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlblxuXHRcdFx0Y2FsbGJhY2sgbnVsbCwgdG9rZW5cblx0XHRjYXRjaCBlXG5cdFx0XHRjYWxsYmFjayBlXG4iLCJ2YXIgQWNjZXNzVG9rZW5zLCBBdXRoQ29kZXMsIENsaWVudHMsIE1vZGVsLCBSZWZyZXNoVG9rZW5zLCBkZWJ1ZztcblxuQWNjZXNzVG9rZW5zID0gdm9pZCAwO1xuXG5SZWZyZXNoVG9rZW5zID0gdm9pZCAwO1xuXG5DbGllbnRzID0gdm9pZCAwO1xuXG5BdXRoQ29kZXMgPSB2b2lkIDA7XG5cbmRlYnVnID0gdm9pZCAwO1xuXG50aGlzLk1vZGVsID0gTW9kZWwgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIE1vZGVsIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgICAgaWYgKGNvbmZpZy5hY2Nlc3NUb2tlbnNDb2xsZWN0aW9uTmFtZSA9PSBudWxsKSB7XG4gICAgICAgIGNvbmZpZy5hY2Nlc3NUb2tlbnNDb2xsZWN0aW9uTmFtZSA9ICdvYXV0aF9hY2Nlc3NfdG9rZW5zJztcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcucmVmcmVzaFRva2Vuc0NvbGxlY3Rpb25OYW1lID09IG51bGwpIHtcbiAgICAgICAgY29uZmlnLnJlZnJlc2hUb2tlbnNDb2xsZWN0aW9uTmFtZSA9ICdvYXV0aF9yZWZyZXNoX3Rva2Vucyc7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmNsaWVudHNDb2xsZWN0aW9uTmFtZSA9PSBudWxsKSB7XG4gICAgICAgIGNvbmZpZy5jbGllbnRzQ29sbGVjdGlvbk5hbWUgPSAnb2F1dGhfY2xpZW50cyc7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmF1dGhDb2Rlc0NvbGxlY3Rpb25OYW1lID09IG51bGwpIHtcbiAgICAgICAgY29uZmlnLmF1dGhDb2Rlc0NvbGxlY3Rpb25OYW1lID0gJ29hdXRoX2F1dGhfY29kZXMnO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1ZyA9IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgICAgdGhpcy5BY2Nlc3NUb2tlbnMgPSBBY2Nlc3NUb2tlbnMgPSBjb25maWcuYWNjZXNzVG9rZW5zQ29sbGVjdGlvbiB8fCBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24oY29uZmlnLmFjY2Vzc1Rva2Vuc0NvbGxlY3Rpb25OYW1lKTtcbiAgICAgIHRoaXMuUmVmcmVzaFRva2VucyA9IFJlZnJlc2hUb2tlbnMgPSBjb25maWcucmVmcmVzaFRva2Vuc0NvbGxlY3Rpb24gfHwgbmV3IE1ldGVvci5Db2xsZWN0aW9uKGNvbmZpZy5yZWZyZXNoVG9rZW5zQ29sbGVjdGlvbk5hbWUpO1xuICAgICAgdGhpcy5DbGllbnRzID0gQ2xpZW50cyA9IGNvbmZpZy5jbGllbnRzQ29sbGVjdGlvbiB8fCBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24oY29uZmlnLmNsaWVudHNDb2xsZWN0aW9uTmFtZSk7XG4gICAgICB0aGlzLkF1dGhDb2RlcyA9IEF1dGhDb2RlcyA9IGNvbmZpZy5hdXRoQ29kZXNDb2xsZWN0aW9uIHx8IG5ldyBNZXRlb3IuQ29sbGVjdGlvbihjb25maWcuYXV0aENvZGVzQ29sbGVjdGlvbk5hbWUpO1xuICAgIH1cblxuICAgIGdyYW50VHlwZUFsbG93ZWQoY2xpZW50SWQsIGdyYW50VHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmIChkZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW09BdXRoMlNlcnZlcl0nLCAnaW4gZ3JhbnRUeXBlQWxsb3dlZCAoY2xpZW50SWQ6JywgY2xpZW50SWQsICcsIGdyYW50VHlwZTonLCBncmFudFR5cGUgKyAnKScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlLCBncmFudFR5cGUgPT09ICdhdXRob3JpemF0aW9uX2NvZGUnIHx8IGdyYW50VHlwZSA9PT0gJ3JlZnJlc2hfdG9rZW4nKTtcbiAgICB9XG5cbiAgfTtcblxuICBNb2RlbC5wcm90b3R5cGUuZ2V0QWNjZXNzVG9rZW4gPSBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKGJlYXJlclRva2VuLCBjYWxsYmFjaykge1xuICAgIHZhciBlLCB0b2tlbjtcbiAgICBpZiAoZGVidWcgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbT0F1dGgyU2VydmVyXScsICdpbiBnZXRBY2Nlc3NUb2tlbiAoYmVhcmVyVG9rZW46JywgYmVhcmVyVG9rZW4sICcpJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0b2tlbiA9IEFjY2Vzc1Rva2Vucy5maW5kT25lKHtcbiAgICAgICAgYWNjZXNzVG9rZW46IGJlYXJlclRva2VuXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0b2tlbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGUgPSBlcnJvcjtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG4gIH0pO1xuXG4gIE1vZGVsLnByb3RvdHlwZS5nZXRDbGllbnQgPSBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKGNsaWVudElkLCBjbGllbnRTZWNyZXQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNsaWVudCwgZTtcbiAgICBpZiAoZGVidWcgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbT0F1dGgyU2VydmVyXScsICdpbiBnZXRDbGllbnQgKGNsaWVudElkOicsIGNsaWVudElkLCAnLCBjbGllbnRTZWNyZXQ6JywgY2xpZW50U2VjcmV0LCAnKScpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgaWYgKGNsaWVudFNlY3JldCA9PSBudWxsKSB7XG4gICAgICAgIGNsaWVudCA9IENsaWVudHMuZmluZE9uZSh7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgIGNsaWVudElkOiBjbGllbnRJZFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsaWVudCA9IENsaWVudHMuZmluZE9uZSh7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgICAgICBjbGllbnRTZWNyZXQ6IGNsaWVudFNlY3JldFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBjbGllbnQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlID0gZXJyb3I7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuICB9KTtcblxuICBNb2RlbC5wcm90b3R5cGUuc2F2ZUFjY2Vzc1Rva2VuID0gTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbih0b2tlbiwgY2xpZW50SWQsIGV4cGlyZXMsIHVzZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUsIHRva2VuSWQ7XG4gICAgaWYgKGRlYnVnID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygnW09BdXRoMlNlcnZlcl0nLCAnaW4gc2F2ZUFjY2Vzc1Rva2VuICh0b2tlbjonLCB0b2tlbiwgJywgY2xpZW50SWQ6JywgY2xpZW50SWQsICcsIHVzZXI6JywgdXNlciwgJywgZXhwaXJlczonLCBleHBpcmVzLCAnKScpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdG9rZW5JZCA9IEFjY2Vzc1Rva2Vucy5pbnNlcnQoe1xuICAgICAgICBhY2Nlc3NUb2tlbjogdG9rZW4sXG4gICAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICBleHBpcmVzOiBleHBpcmVzXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0b2tlbklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZSA9IGVycm9yO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgIH1cbiAgfSk7XG5cbiAgTW9kZWwucHJvdG90eXBlLmdldEF1dGhDb2RlID0gTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbihhdXRoQ29kZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29kZSwgZTtcbiAgICBpZiAoZGVidWcgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbT0F1dGgyU2VydmVyXScsICdpbiBnZXRBdXRoQ29kZSAoYXV0aENvZGU6ICcgKyBhdXRoQ29kZSArICcpJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb2RlID0gQXV0aENvZGVzLmZpbmRPbmUoe1xuICAgICAgICBhdXRoQ29kZTogYXV0aENvZGVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGNvZGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlID0gZXJyb3I7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuICB9KTtcblxuICBNb2RlbC5wcm90b3R5cGUuc2F2ZUF1dGhDb2RlID0gTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbihjb2RlLCBjbGllbnRJZCwgZXhwaXJlcywgdXNlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29kZUlkLCBlO1xuICAgIGlmIChkZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIHNhdmVBdXRoQ29kZSAoY29kZTonLCBjb2RlLCAnLCBjbGllbnRJZDonLCBjbGllbnRJZCwgJywgZXhwaXJlczonLCBleHBpcmVzLCAnLCB1c2VyOicsIHVzZXIsICcpJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb2RlSWQgPSBBdXRoQ29kZXMudXBzZXJ0KHtcbiAgICAgICAgYXV0aENvZGU6IGNvZGVcbiAgICAgIH0sIHtcbiAgICAgICAgYXV0aENvZGU6IGNvZGUsXG4gICAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICBleHBpcmVzOiBleHBpcmVzXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBjb2RlSWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlID0gZXJyb3I7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuICB9KTtcblxuICBNb2RlbC5wcm90b3R5cGUuc2F2ZVJlZnJlc2hUb2tlbiA9IE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24odG9rZW4sIGNsaWVudElkLCBleHBpcmVzLCB1c2VyLCBjYWxsYmFjaykge1xuICAgIHZhciBlLCB0b2tlbklkO1xuICAgIGlmIChkZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ1tPQXV0aDJTZXJ2ZXJdJywgJ2luIHNhdmVSZWZyZXNoVG9rZW4gKHRva2VuOicsIHRva2VuLCAnLCBjbGllbnRJZDonLCBjbGllbnRJZCwgJywgdXNlcjonLCB1c2VyLCAnLCBleHBpcmVzOicsIGV4cGlyZXMsICcpJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdG9rZW5JZCA9IFJlZnJlc2hUb2tlbnMuaW5zZXJ0KHtcbiAgICAgICAgcmVmcmVzaFRva2VuOiB0b2tlbixcbiAgICAgICAgY2xpZW50SWQ6IGNsaWVudElkLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGV4cGlyZXM6IGV4cGlyZXNcbiAgICAgIH0sIGNhbGxiYWNrKG51bGwsIHRva2VuSWQpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZSA9IGVycm9yO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgIH1cbiAgfSk7XG5cbiAgTW9kZWwucHJvdG90eXBlLmdldFJlZnJlc2hUb2tlbiA9IE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24ocmVmcmVzaFRva2VuLCBjYWxsYmFjaykge1xuICAgIHZhciBlLCB0b2tlbjtcbiAgICBpZiAoZGVidWcgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbT0F1dGgyU2VydmVyXScsICdpbiBnZXRSZWZyZXNoVG9rZW4gKHJlZnJlc2hUb2tlbjogJyArIHJlZnJlc2hUb2tlbiArICcpJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0b2tlbiA9IFJlZnJlc2hUb2tlbnMuZmluZE9uZSh7XG4gICAgICAgIHJlZnJlc2hUb2tlbjogcmVmcmVzaFRva2VuXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0b2tlbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGUgPSBlcnJvcjtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBNb2RlbDtcblxufSkuY2FsbCh0aGlzKTtcbiIsIm9hdXRoc2VydmVyID0gTnBtLnJlcXVpcmUoJ29hdXRoMi1zZXJ2ZXInKVxuZXhwcmVzcyA9IE5wbS5yZXF1aXJlKCdleHByZXNzJylcblxuIyBXZWJBcHAucmF3Q29ubmVjdEhhbmRsZXJzLnVzZSBhcHBcbiMgSnNvblJvdXRlcy5NaWRkbGV3YXJlLnVzZSBhcHBcblxuXG5jbGFzcyBPQXV0aDJTZXJ2ZXJcblx0Y29uc3RydWN0b3I6IChAY29uZmlnPXt9KSAtPlxuXHRcdEBhcHAgPSBleHByZXNzKClcblxuXHRcdEByb3V0ZXMgPSBleHByZXNzKClcblxuXHRcdEBtb2RlbCA9IG5ldyBNb2RlbChAY29uZmlnKVxuXG5cdFx0QG9hdXRoID0gb2F1dGhzZXJ2ZXJcblx0XHRcdG1vZGVsOiBAbW9kZWxcblx0XHRcdGdyYW50czogWydhdXRob3JpemF0aW9uX2NvZGUnLCAncmVmcmVzaF90b2tlbiddXG5cdFx0XHRkZWJ1ZzogQGNvbmZpZy5kZWJ1Z1xuXG5cdFx0QHB1Ymxpc2hBdWhvcml6ZWRDbGllbnRzKClcblx0XHRAaW5pdFJvdXRlcygpXG5cblx0XHRyZXR1cm4gQFxuXG5cblx0cHVibGlzaEF1aG9yaXplZENsaWVudHM6IC0+XG5cdFx0TWV0ZW9yLnB1Ymxpc2ggJ2F1dGhvcml6ZWRPQXV0aCcsIC0+XG5cdFx0XHRcdGlmIG5vdCBAdXNlcklkP1xuXHRcdFx0XHRcdHJldHVybiBAcmVhZHkoKVxuXG5cdFx0XHRcdHJldHVybiBNZXRlb3IudXNlcnMuZmluZFxuXHRcdFx0XHRcdF9pZDogQHVzZXJJZFxuXHRcdFx0XHQsXG5cdFx0XHRcdFx0ZmllbGRzOlxuXHRcdFx0XHRcdFx0J29hdXRoLmF1dGhvcml6ZWRDbGllbnRzJzogMVxuXG5cdFx0XHRcdHJldHVybiB1c2VyP1xuXG5cblx0aW5pdFJvdXRlczogLT5cblx0XHRzZWxmID0gQFxuXHRcdGRlYnVnTWlkZGxld2FyZSA9IChyZXEsIHJlcywgbmV4dCkgLT5cblx0XHRcdGlmIHNlbGYuY29uZmlnLmRlYnVnIGlzIHRydWVcblx0XHRcdFx0Y29uc29sZS5sb2cgJ1tPQXV0aDJTZXJ2ZXJdJywgcmVxLm1ldGhvZCwgcmVxLnVybFxuXHRcdFx0bmV4dCgpXG5cblx0XHQjIFRyYW5zZm9ybXMgcmVxdWVzdHMgd2hpY2ggYXJlIFBPU1QgYW5kIGFyZW4ndCBcIngtd3d3LWZvcm0tdXJsZW5jb2RlZFwiIGNvbnRlbnQgdHlwZVxuXHRcdCMgYW5kIHRoZXkgcGFzcyB0aGUgcmVxdWlyZWQgaW5mb3JtYXRpb24gYXMgcXVlcnkgc3RyaW5nc1xuXHRcdHRyYW5zZm9ybVJlcXVlc3RzTm90VXNpbmdGb3JtVXJsZW5jb2RlZFR5cGUgPSAocmVxLCByZXMsIG5leHQpIC0+XG5cdFx0XHRpZiBub3QgcmVxLmlzKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSBhbmQgcmVxLm1ldGhvZCBpcyAnUE9TVCdcblx0XHRcdFx0aWYgc2VsZi5jb25maWcuZGVidWcgaXMgdHJ1ZVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nICdbT0F1dGgyU2VydmVyXScsICdUcmFuc2Zvcm1pbmcgYSByZXF1ZXN0IHRvIGZvcm0tdXJsZW5jb2RlZCB3aXRoIHRoZSBxdWVyeSBnb2luZyB0byB0aGUgYm9keS4nXG5cdFx0XHRcdHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG5cdFx0XHRcdHJlcS5ib2R5ID0gT2JqZWN0LmFzc2lnbiB7fSwgcmVxLmJvZHksIHJlcS5xdWVyeVxuXHRcdFx0bmV4dCgpXG5cblx0XHRAYXBwLmFsbCAnL29hdXRoL3Rva2VuJywgZGVidWdNaWRkbGV3YXJlLCB0cmFuc2Zvcm1SZXF1ZXN0c05vdFVzaW5nRm9ybVVybGVuY29kZWRUeXBlLCBAb2F1dGguZ3JhbnQoKVxuXG5cdFx0QGFwcC5nZXQgJy9vYXV0aC9hdXRob3JpemUnLCBkZWJ1Z01pZGRsZXdhcmUsIE1ldGVvci5iaW5kRW52aXJvbm1lbnQgKHJlcSwgcmVzLCBuZXh0KSAtPlxuXHRcdFx0Y2xpZW50ID0gc2VsZi5tb2RlbC5DbGllbnRzLmZpbmRPbmUoeyBhY3RpdmU6IHRydWUsIGNsaWVudElkOiByZXEucXVlcnkuY2xpZW50X2lkIH0pXG5cdFx0XHRpZiBub3QgY2xpZW50P1xuXHRcdFx0XHRyZXR1cm4gcmVzLnJlZGlyZWN0ICcvb2F1dGgvZXJyb3IvNDA0J1xuXG5cdFx0XHRpZiBub3QgW10uY29uY2F0KGNsaWVudC5yZWRpcmVjdFVyaSkuaW5jbHVkZXMocmVxLnF1ZXJ5LnJlZGlyZWN0X3VyaSlcblx0XHRcdFx0cmV0dXJuIHJlcy5yZWRpcmVjdCAnL29hdXRoL2Vycm9yL2ludmFsaWRfcmVkaXJlY3RfdXJpJ1xuXG5cdFx0XHRuZXh0KClcblxuXHRcdEBhcHAucG9zdCAnL29hdXRoL2F1dGhvcml6ZScsIGRlYnVnTWlkZGxld2FyZSwgTWV0ZW9yLmJpbmRFbnZpcm9ubWVudCAocmVxLCByZXMsIG5leHQpIC0+XG5cdFx0XHRpZiBub3QgcmVxLmJvZHkudG9rZW4/XG5cdFx0XHRcdHJldHVybiByZXMuc2VuZFN0YXR1cyg0MDEpLnNlbmQoJ05vIHRva2VuJylcblxuXHRcdFx0dXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lXG5cdFx0XHRcdCdzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuaGFzaGVkVG9rZW4nOiBBY2NvdW50cy5faGFzaExvZ2luVG9rZW4gcmVxLmJvZHkudG9rZW5cblxuXHRcdFx0aWYgbm90IHVzZXI/XG5cdFx0XHRcdHJldHVybiByZXMuc2VuZFN0YXR1cyg0MDEpLnNlbmQoJ0ludmFsaWQgdG9rZW4nKVxuXG5cdFx0XHRyZXEudXNlciA9XG5cdFx0XHRcdGlkOiB1c2VyLl9pZFxuXG5cdFx0XHRuZXh0KClcblxuXG5cdFx0QGFwcC5wb3N0ICcvb2F1dGgvYXV0aG9yaXplJywgZGVidWdNaWRkbGV3YXJlLCBAb2F1dGguYXV0aENvZGVHcmFudCAocmVxLCBuZXh0KSAtPlxuXHRcdFx0aWYgcmVxLmJvZHkuYWxsb3cgaXMgJ3llcydcblx0XHRcdFx0TWV0ZW9yLnVzZXJzLnVwZGF0ZSByZXEudXNlci5pZCwgeyRhZGRUb1NldDogeydvYXV0aC5hdXRob3JpemVkQ2xpZW50cyc6IEBjbGllbnRJZH19XG5cblx0XHRcdG5leHQobnVsbCwgcmVxLmJvZHkuYWxsb3cgaXMgJ3llcycsIHJlcS51c2VyKVxuXG5cdFx0QGFwcC51c2UgQHJvdXRlc1xuXG5cdFx0QGFwcC5hbGwgJy9vYXV0aC8qJywgQG9hdXRoLmVycm9ySGFuZGxlcigpXG4iLCJ2YXIgZXhwcmVzcywgb2F1dGhzZXJ2ZXI7ICAgICAgICAgICAgICBcblxub2F1dGhzZXJ2ZXIgPSBOcG0ucmVxdWlyZSgnb2F1dGgyLXNlcnZlcicpO1xuXG5leHByZXNzID0gTnBtLnJlcXVpcmUoJ2V4cHJlc3MnKTtcblxuLy8gV2ViQXBwLnJhd0Nvbm5lY3RIYW5kbGVycy51c2UgYXBwXG4vLyBKc29uUm91dGVzLk1pZGRsZXdhcmUudXNlIGFwcFxuT0F1dGgyU2VydmVyID0gY2xhc3MgT0F1dGgyU2VydmVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLmFwcCA9IGV4cHJlc3MoKTtcbiAgICB0aGlzLnJvdXRlcyA9IGV4cHJlc3MoKTtcbiAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKHRoaXMuY29uZmlnKTtcbiAgICB0aGlzLm9hdXRoID0gb2F1dGhzZXJ2ZXIoe1xuICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICBncmFudHM6IFsnYXV0aG9yaXphdGlvbl9jb2RlJywgJ3JlZnJlc2hfdG9rZW4nXSxcbiAgICAgIGRlYnVnOiB0aGlzLmNvbmZpZy5kZWJ1Z1xuICAgIH0pO1xuICAgIHRoaXMucHVibGlzaEF1aG9yaXplZENsaWVudHMoKTtcbiAgICB0aGlzLmluaXRSb3V0ZXMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1Ymxpc2hBdWhvcml6ZWRDbGllbnRzKCkge1xuICAgIHJldHVybiBNZXRlb3IucHVibGlzaCgnYXV0aG9yaXplZE9BdXRoJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51c2VySWQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1ldGVvci51c2Vycy5maW5kKHtcbiAgICAgICAgX2lkOiB0aGlzLnVzZXJJZFxuICAgICAgfSwge1xuICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAnb2F1dGguYXV0aG9yaXplZENsaWVudHMnOiAxXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHR5cGVvZiB1c2VyICE9PSBcInVuZGVmaW5lZFwiICYmIHVzZXIgIT09IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBpbml0Um91dGVzKCkge1xuICAgIHZhciBkZWJ1Z01pZGRsZXdhcmUsIHNlbGYsIHRyYW5zZm9ybVJlcXVlc3RzTm90VXNpbmdGb3JtVXJsZW5jb2RlZFR5cGU7XG4gICAgc2VsZiA9IHRoaXM7XG4gICAgZGVidWdNaWRkbGV3YXJlID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgIGlmIChzZWxmLmNvbmZpZy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW09BdXRoMlNlcnZlcl0nLCByZXEubWV0aG9kLCByZXEudXJsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfTtcbiAgICAvLyBUcmFuc2Zvcm1zIHJlcXVlc3RzIHdoaWNoIGFyZSBQT1NUIGFuZCBhcmVuJ3QgXCJ4LXd3dy1mb3JtLXVybGVuY29kZWRcIiBjb250ZW50IHR5cGVcbiAgICAvLyBhbmQgdGhleSBwYXNzIHRoZSByZXF1aXJlZCBpbmZvcm1hdGlvbiBhcyBxdWVyeSBzdHJpbmdzXG4gICAgdHJhbnNmb3JtUmVxdWVzdHNOb3RVc2luZ0Zvcm1VcmxlbmNvZGVkVHlwZSA9IGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICBpZiAoIXJlcS5pcygnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdbT0F1dGgyU2VydmVyXScsICdUcmFuc2Zvcm1pbmcgYSByZXF1ZXN0IHRvIGZvcm0tdXJsZW5jb2RlZCB3aXRoIHRoZSBxdWVyeSBnb2luZyB0byB0aGUgYm9keS4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAgICAgcmVxLmJvZHkgPSBPYmplY3QuYXNzaWduKHt9LCByZXEuYm9keSwgcmVxLnF1ZXJ5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfTtcbiAgICB0aGlzLmFwcC5hbGwoJy9vYXV0aC90b2tlbicsIGRlYnVnTWlkZGxld2FyZSwgdHJhbnNmb3JtUmVxdWVzdHNOb3RVc2luZ0Zvcm1VcmxlbmNvZGVkVHlwZSwgdGhpcy5vYXV0aC5ncmFudCgpKTtcbiAgICB0aGlzLmFwcC5nZXQoJy9vYXV0aC9hdXRob3JpemUnLCBkZWJ1Z01pZGRsZXdhcmUsIE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgIHZhciBjbGllbnQ7XG4gICAgICBjbGllbnQgPSBzZWxmLm1vZGVsLkNsaWVudHMuZmluZE9uZSh7XG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgY2xpZW50SWQ6IHJlcS5xdWVyeS5jbGllbnRfaWRcbiAgICAgIH0pO1xuICAgICAgaWYgKGNsaWVudCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoJy9vYXV0aC9lcnJvci80MDQnKTtcbiAgICAgIH1cbiAgICAgIGlmICghW10uY29uY2F0KGNsaWVudC5yZWRpcmVjdFVyaSkuaW5jbHVkZXMocmVxLnF1ZXJ5LnJlZGlyZWN0X3VyaSkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgnL29hdXRoL2Vycm9yL2ludmFsaWRfcmVkaXJlY3RfdXJpJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH0pKTtcbiAgICB0aGlzLmFwcC5wb3N0KCcvb2F1dGgvYXV0aG9yaXplJywgZGVidWdNaWRkbGV3YXJlLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICB2YXIgdXNlcjtcbiAgICAgIGlmIChyZXEuYm9keS50b2tlbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cyg0MDEpLnNlbmQoJ05vIHRva2VuJyk7XG4gICAgICB9XG4gICAgICB1c2VyID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUoe1xuICAgICAgICAnc2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLmhhc2hlZFRva2VuJzogQWNjb3VudHMuX2hhc2hMb2dpblRva2VuKHJlcS5ib2R5LnRva2VuKVxuICAgICAgfSk7XG4gICAgICBpZiAodXNlciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cyg0MDEpLnNlbmQoJ0ludmFsaWQgdG9rZW4nKTtcbiAgICAgIH1cbiAgICAgIHJlcS51c2VyID0ge1xuICAgICAgICBpZDogdXNlci5faWRcbiAgICAgIH07XG4gICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH0pKTtcbiAgICB0aGlzLmFwcC5wb3N0KCcvb2F1dGgvYXV0aG9yaXplJywgZGVidWdNaWRkbGV3YXJlLCB0aGlzLm9hdXRoLmF1dGhDb2RlR3JhbnQoZnVuY3Rpb24ocmVxLCBuZXh0KSB7XG4gICAgICBpZiAocmVxLmJvZHkuYWxsb3cgPT09ICd5ZXMnKSB7XG4gICAgICAgIE1ldGVvci51c2Vycy51cGRhdGUocmVxLnVzZXIuaWQsIHtcbiAgICAgICAgICAkYWRkVG9TZXQ6IHtcbiAgICAgICAgICAgICdvYXV0aC5hdXRob3JpemVkQ2xpZW50cyc6IHRoaXMuY2xpZW50SWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQobnVsbCwgcmVxLmJvZHkuYWxsb3cgPT09ICd5ZXMnLCByZXEudXNlcik7XG4gICAgfSkpO1xuICAgIHRoaXMuYXBwLnVzZSh0aGlzLnJvdXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYXBwLmFsbCgnL29hdXRoLyonLCB0aGlzLm9hdXRoLmVycm9ySGFuZGxlcigpKTtcbiAgfVxuXG59O1xuIl19
