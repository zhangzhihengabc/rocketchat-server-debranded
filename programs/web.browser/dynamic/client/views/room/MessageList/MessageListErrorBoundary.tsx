function module(e,t,n){let l,a,r,o,c,i,s,u,m,E,d;n.link("@rocket.chat/fuselage",{States(e){l=e},StatesIcon(e){a=e},StatesTitle(e){r=e},StatesSubtitle(e){o=e},StatesActions(e){c=e},StatesAction(e){i=e},Icon(e){s=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(e){u=e}},1),n.link("react",{default(e){m=e}},2),n.link("react-error-boundary",{ErrorBoundary(e){E=e}},3),n.link("../contexts/RoomContext",{useRoom(e){d=e}},4),n.exportDefault(e=>{let{children:t}=e,n=u(),k=d();return m.createElement(E,{children:t,resetKeys:[k._id],fallback:m.createElement(l,null,m.createElement(a,{name:"circle-exclamation",variation:"danger"}),m.createElement(r,null,n("Error")),m.createElement(o,null,n("Error_something_went_wrong")),m.createElement(c,null,m.createElement(i,{onClick:()=>{location.reload()}},m.createElement(s,{name:"reload"})," ",n("Reload"))))})})}
//# sourceMappingURL=/dynamic/client/views/room/MessageList/5ec614147267a00d3536a3c00104b114ef50e133.map