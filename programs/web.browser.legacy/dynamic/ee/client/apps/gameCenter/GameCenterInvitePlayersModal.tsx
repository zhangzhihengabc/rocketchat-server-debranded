function module(e,n,t){var o,r,a,i,l,c,u,s,m,d,f;t.link("@babel/runtime/regenerator",{default:function(e){o=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),t.link("@rocket.chat/fuselage",{Box:function(e){a=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){i=e}},1),t.link("react",{default:function(e){l=e},useState:function(e){c=e}},2),t.link("../../../../client/components/GenericModal",{default:function(e){u=e}},3),t.link("../../../../client/components/UserAutoCompleteMultiple/UserAutoCompleteMultipleFederated",{default:function(e){s=e}},4),t.link("../../../../client/lib/RoomManager",{useOpenedRoom:function(e){m=e}},5),t.link("../../../../client/lib/rooms/roomCoordinator",{roomCoordinator:function(e){d=e}},6),t.link("../../../../client/lib/utils/callWithErrorHandling",{callWithErrorHandling:function(e){f=e}},7),t.exportDefault(function(e){var n=e.game,t=e.onClose,p=i(),k=r(c([]),2),g=k[0],C=k[1],_=n.name,b=m();return l.createElement(l.Fragment,null,l.createElement(u,{onClose:t,onCancel:t,onConfirm:function(){var e,n;return o.async(function(r){for(;;)switch(r.prev=r.next){case 0:return e=_.replace(/\s/g,"-")+"-"+Random.id(10),r.prev=1,r.next=4,o.awrap(f("createPrivateGroup",e,g));case 4:n=r.sent,d.openRouteLink(n.t,n),Tracker.autorun(function(e){b===n.rid&&(f("sendMessage",{_id:Random.id(),rid:n.rid,msg:p("Apps_Game_Center_Play_Game_Together",{name:_})}),e.stop())}),t(),r.next=13;break;case 10:r.prev=10,r.t0=r.catch(1),console.warn(r.t0);case 13:case"end":return r.stop()}},null,null,[[1,10]],Promise)},title:p("Apps_Game_Center_Invite_Friends")},l.createElement(a,{mbe:16},p("Invite_Users")),l.createElement(a,{mbe:16,display:"flex",justifyContent:"stretch"},l.createElement(s,{value:g,onChange:C}))))})}
//# sourceMappingURL=/dynamic/ee/client/apps/gameCenter/ac34046e9b0afe001300764c3be81766008aa1c5.map