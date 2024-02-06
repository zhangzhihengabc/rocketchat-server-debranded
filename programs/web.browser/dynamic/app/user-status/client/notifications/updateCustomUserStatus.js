function module(t,e,o){let s,u,i;o.link("meteor/meteor",{Meteor(t){s=t}},0),o.link("../../../notifications/client",{Notifications(t){u=t}},1),o.link("../lib/customUserStatus",{updateCustomUserStatus(t){i=t}},2),s.startup(()=>u.onLogged("updateCustomUserStatus",t=>i(t.userStatusData)))}
//# sourceMappingURL=/dynamic/app/user-status/client/notifications/84bd3c69867b9889650cbccbeeb1955f5e2d85ee.map
