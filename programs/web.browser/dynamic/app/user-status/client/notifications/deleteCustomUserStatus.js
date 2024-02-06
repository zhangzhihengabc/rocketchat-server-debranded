function module(t,e,o){let s,i,u;o.link("meteor/meteor",{Meteor(t){s=t}},0),o.link("../../../notifications/client",{Notifications(t){i=t}},1),o.link("../lib/customUserStatus",{deleteCustomUserStatus(t){u=t}},2),s.startup(()=>i.onLogged("deleteCustomUserStatus",t=>u(t.userStatusData)))}
//# sourceMappingURL=/dynamic/app/user-status/client/notifications/85400121606b7e35d0654acfa82b02dc268621ca.map
