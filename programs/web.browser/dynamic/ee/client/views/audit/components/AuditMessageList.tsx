function module(e,s,t){let a,n,l,i,r,m,o,c,u,g;t.link("@rocket.chat/fuselage",{MessageDivider(e){a=e}},0),t.link("@rocket.chat/ui-contexts",{useUserPreference(e){n=e}},1),t.link("react",{default(e){l=e},Fragment(e){i=e},memo(e){r=e}},2),t.link("../../../../../app/ui-utils/client",{MessageTypes(e){m=e}},3),t.link("../../../../../client/components/message/variants/RoomMessage",{default(e){o=e}},4),t.link("../../../../../client/components/message/variants/SystemMessage",{default(e){c=e}},5),t.link("../../../../../client/hooks/useFormatDate",{useFormatDate(e){u=e}},6),t.link("../../../../../client/views/room/MessageList/lib/isMessageNewDay",{isMessageNewDay(e){g=e}},7),t.exportDefault(r(e=>{let{messages:s}=e,t=u(),r=!!n("displayAvatars");return l.createElement(l.Fragment,null,s.map((e,s,n)=>{let{[s-1]:u}=n,k=g(e,u),d=m.isSystemMessage(e);return l.createElement(i,{key:e._id},k&&l.createElement(a,null,t(e.ts)),!d&&l.createElement(o,{message:e,sequential:!1,unread:!1,mention:!1,all:!1,ignoredUser:!1,showUserAvatar:r}),d&&l.createElement(c,{message:e,showUserAvatar:r}))}))}))}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/94c32a71aeefe1dea105bd4a9f6d9725ce3dd701.map