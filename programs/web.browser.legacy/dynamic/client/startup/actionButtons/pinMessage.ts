function module(e,n,i){var t,s,o,r,a,c,l,u,p,d;i.link("@babel/runtime/regenerator",{default:function(e){t=e}},0),i.link("meteor/meteor",{Meteor:function(e){s=e}},0),i.link("../../../app/authorization/client",{hasAtLeastOnePermission:function(e){o=e}},1),i.link("../../../app/settings/client",{settings:function(e){r=e}},2),i.link("../../../app/ui-utils/client",{MessageAction:function(e){a=e}},3),i.link("../../../app/utils/client/lib/SDKClient",{sdk:function(e){c=e}},4),i.link("../../lib/queryClient",{queryClient:function(e){l=e}},5),i.link("../../lib/rooms/roomCoordinator",{roomCoordinator:function(e){u=e}},6),i.link("../../lib/toast",{dispatchToastMessage:function(e){p=e}},7),i.link("../../lib/utils/messageArgs",{messageArgs:function(e){d=e}},8),s.startup(function(){a.addButton({id:"pin-message",icon:"pin",label:"Pin",type:"interaction",context:["pinned","message","message-mobile","threads","direct","videoconf","videoconf-threads"],action:function(e,n){var i,s;return t.async(function(e){for(;;)switch(e.prev=e.next){case 0:return(s=void 0===(i=n.message)?d(this).msg:i).pinned=!0,e.prev=2,e.next=5,t.awrap(c.call("pinMessage",s));case 5:l.invalidateQueries(["rooms",s.rid,"pinned-messages"]),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),p({type:"error",message:e.t0});case 11:case"end":return e.stop()}},null,this,[[2,8]],Promise)},condition:function(e){var n=e.message,i=e.subscription,t=e.room;return!!r.get("Message_AllowPinning")&&!n.pinned&&!!i&&!u.isLivechatRoom(t.t)&&o("pin-message",n.rid)},order:2,group:"menu"})})}
//# sourceMappingURL=/dynamic/client/startup/actionButtons/66bc0c9a4c1c0bd78d8b9180ca977081020823c4.map