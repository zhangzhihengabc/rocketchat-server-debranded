function module(e,o,n){n.export({useChangeLeaderAction:function(){return m}}),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){r=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){s=e},usePermission:function(e){t=e},useUserRoom:function(e){i=e},useUserSubscription:function(e){u=e}},1),n.link("react",{useMemo:function(e){a=e}},2),n.link("../../../../../hooks/useEndpointAction",{useEndpointAction:function(e){c=e}},3),n.link("../../../lib/getRoomDirectives",{getRoomDirectives:function(e){l=e}},4),n.link("../../useUserHasRoomRole",{useUserHasRoomRole:function(e){d=e}},5);var r,s,t,i,u,a,c,l,d,m=function(e,o){var n=s(),m=i(o),_=e._id,f=t("set-leader",o),v=u(o);if(!m)throw Error("Room not provided");var k="p"===m.t?"/v1/groups":"/v1/channels",p=l({room:m,showingUserId:_,userSubscription:v}).roomCanSetLeader,h=d(_,o,"leader"),R=c("POST",k+"."+(h?"removeLeader":"addLeader"),{successMessage:n(h?"removed__username__as__role_":"set__username__as__role_",{username:e.username,role:"leader"})}),g=r(function(){return R({roomId:o,userId:_})});return a(function(){return p&&f?{content:n(h?"Remove_as_leader":"Set_as_leader"),icon:"shield-alt",onClick:g,type:"privileges"}:void 0},[h,p,n,f,g])}}
//# sourceMappingURL=/dynamic/client/views/room/hooks/useUserInfoActions/actions/061c07feb009be90b486b67acbbe094e9b9ec0ce.map