function module(e,t,n){var o,c,r,a,l,i,u,f,s,m,d;n.link("@rocket.chat/fuselage",{States:function(e){o=e},StatesIcon:function(e){c=e},StatesTitle:function(e){r=e},StatesSubtitle:function(e){a=e},StatesActions:function(e){l=e},StatesAction:function(e){i=e},Icon:function(e){u=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){f=e}},1),n.link("react",{default:function(e){s=e}},2),n.link("react-error-boundary",{ErrorBoundary:function(e){m=e}},3),n.link("../contexts/RoomContext",{useRoom:function(e){d=e}},4),n.exportDefault(function(e){var t=e.children,n=f(),E=d();return s.createElement(m,{children:t,resetKeys:[E._id],fallback:s.createElement(o,null,s.createElement(c,{name:"circle-exclamation",variation:"danger"}),s.createElement(r,null,n("Error")),s.createElement(a,null,n("Error_something_went_wrong")),s.createElement(l,null,s.createElement(i,{onClick:function(){location.reload()}},s.createElement(u,{name:"reload"})," ",n("Reload"))))})})}
//# sourceMappingURL=/dynamic/client/views/room/MessageList/2ba52ea8d697bd8d652a850055df1a1e919675b9.map