function module(e,n,t){var a,o,s,u,r,i,c,l,f;t.link("@babel/runtime/regenerator",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){o=e}},1),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){s=e},useTranslation:function(e){u=e}},0),t.link("@tanstack/react-query",{useQuery:function(e){r=e}},1),t.link("react",{default:function(e){i=e}},2),t.link("../../../lib/utils/mapMessageFromApi",{mapMessageFromApi:function(e){c=e}},3),t.link("../contexts/RoomContext",{useRoom:function(e){l=e}},4),t.link("./MessageListTab",{default:function(e){f=e}},5),t.exportDefault(function(){var e=s("GET","/v1/chat.getMentionedMessages"),n=l(),t=r(["rooms",n._id,"mentioned-messages"],function(){var t,s,u;return a.async(function(r){for(;;)switch(r.prev=r.next){case 0:return t=[],s=0,r.next=4,a.awrap(e({roomId:n._id,offset:0}));case 4:u=r.sent;case 5:if(!(u.count>0)){r.next=13;break}t.push.apply(t,o(u.messages.map(c)));case 7:return s+=u.count,r.next=10,a.awrap(e({roomId:n._id,offset:s}));case 10:u=r.sent,r.next=5;break;case 13:return r.abrupt("return",t);case 14:case"end":return r.stop()}},null,null,null,Promise)}),m=u();return i.createElement(f,{iconName:"at",title:m("Mentions"),emptyResultMessage:m("No_mentions_found"),context:"mentions",queryResult:t})})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/b7ad3d79c8b331c25f6dd77b628998b61a7370e9.map