function module(e,t,a){let s,n,l,i,o,r,d,u,g,c,m,k,h,M,C,f,x,v,E,p,S,_,I;a.link("@babel/runtime/helpers/extends",{default(e){s=e}},0),a.link("@rocket.chat/fuselage",{Message(e){n=e},MessageLeftContainer(e){l=e},MessageContainer(e){i=e},CheckBox(e){o=e}},0),a.link("@rocket.chat/fuselage-hooks",{useToggle(e){r=e}},1),a.link("@rocket.chat/ui-contexts",{useUserId(e){d=e}},2),a.link("react",{default(e){u=e},useRef(e){g=e},memo(e){c=e}},3),a.link("../../../views/room/MessageList/contexts/MessageHighlightContext",{useIsMessageHighlight(e){m=e}},4),a.link("../../../views/room/MessageList/contexts/SelectedMessagesContext",{useIsSelecting(e){k=e},useToggleSelect(e){h=e},useIsSelectedMessage(e){M=e},useCountSelected(e){C=e}},5),a.link("../../../views/room/MessageList/hooks/useJumpToMessage",{useJumpToMessage(e){f=e}},6),a.link("../../../views/room/contexts/ChatContext",{useChat(e){x=e}},7),a.link("../IgnoredContent",{default(e){v=e}},8),a.link("../MessageHeader",{default(e){E=e}},9),a.link("../MessageToolboxHolder",{default(e){p=e}},10),a.link("../StatusIndicators",{default(e){S=e}},11),a.link("../header/MessageAvatar",{default(e){_=e}},12),a.link("./room/RoomMessageContent",{default(e){I=e}},13),a.exportDefault(c(e=>{let{message:t,showUserAvatar:a,sequential:c,all:w,mention:T,unread:q,context:b,ignoredUser:H,searchText:L}=e,y=d(),j=m(t._id),[J,R]=r(!1),U=(H||t.ignored)&&!J,z=x(),A=g(null),B=k(),D=h(t._id),P=M(t._id);return C(),f(t._id,A),u.createElement(n,{ref:A,id:t._id,onClick:B?D:void 0,isSelected:P,isEditing:j,isPending:t.temp,sequential:c,"data-qa-editing":j,"data-qa-selected":P,"data-id":t._id,"data-mid":t._id,"data-unread":q,"data-sequential":c,"data-own":t.u._id===y,"data-qa-type":"message","aria-busy":t.temp},u.createElement(l,null,!c&&t.u.username&&!B&&a&&u.createElement(_,s({emoji:t.emoji,avatarUrl:t.avatar,username:t.u.username,size:"x36"},(null==z?void 0:z.userCard)&&{onClick:null==z?void 0:z.userCard.open(t.u.username),style:{cursor:"pointer"}})),B&&u.createElement(o,{checked:P,onChange:D}),c&&u.createElement(S,{message:t})),u.createElement(i,null,!c&&u.createElement(E,{message:t}),U?u.createElement(v,{onShowMessageIgnored:R}):u.createElement(I,{message:t,unread:q,mention:T,all:w,searchText:L})),!t.private&&u.createElement(p,{message:t,context:b}))}))}
//# sourceMappingURL=/dynamic/client/components/message/variants/04a366e91539c69f77d16866790e425f3b87a9ba.map