function module(o,e,n){n.link("meteor/accounts-base",{Accounts:function(o){i=o}},0),n.link("meteor/google-oauth",{Google:function(o){t=o}},1),n.link("meteor/meteor",{Meteor:function(o){r=o}},2),n.link("../../../client/lib/2fa/overrideLoginMethod",{overrideLoginMethod:function(o){l=o}},3);var i,t,r,l,a=function(o,e,n){if(n||"function"!=typeof o||(n=o,o=null),r.isCordova&&t.signIn){t.signIn(o,n);return}"string"==typeof i._options.restrictCreationByEmailDomain&&((o=Object.assign({},o||{})).loginUrlParameters=Object.assign({},o.loginUrlParameters||{}),o.loginUrlParameters.hd=i._options.restrictCreationByEmailDomain);var l=i.oauth.credentialRequestCompleteHandler(n,e);t.requestCredential(o,l)},s=r.loginWithGoogle;r.loginWithGoogle=function(o,e){l(s,[o],e,a)}}
//# sourceMappingURL=/dynamic/app/2fa/client/6caa4e6aaf0c7f9de6b5f298ccddc18053da5497.map