function module(e,o,t){let l,n;t.link("meteor/accounts-base",{Accounts(e){l=e}},0),t.link("meteor/meteor",{Meteor(e){n=e}},1),n.loginWithLDAP=function(e,o,t){l.callLoginMethod({methodArguments:[{ldap:!0,username:e,ldapPass:o,ldapOptions:{}}],userCallback:t})}}
//# sourceMappingURL=/dynamic/client/startup/5443d341f19b2e371dfef2988d6aaac889396473.map
