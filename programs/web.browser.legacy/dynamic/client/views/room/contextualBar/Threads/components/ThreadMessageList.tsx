function module(e,s,a){var n,t,i,l,o,r,u,c,d,f,g,m,h,k,M,y,p,v,L,S,b,E,T;a.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){n=e}},0),a.link("@rocket.chat/fuselage",{MessageDivider:function(e){t=e}},0),a.link("@rocket.chat/fuselage-hooks",{useMergedRefs:function(e){i=e}},1),a.link("@rocket.chat/ui-contexts",{useSetting:function(e){l=e},useTranslation:function(e){o=e},useUserPreference:function(e){r=e}},2),a.link("date-fns",{differenceInSeconds:function(e){u=e}},3),a.link("react",{default:function(e){c=e},Fragment:function(e){d=e}},4),a.link("../../../../../../app/ui-utils/client",{MessageTypes:function(e){f=e}},5),a.link("../../../../../../lib/isTruthy",{isTruthy:function(e){g=e}},6),a.link("../../../../../components/ScrollableContentWrapper",{default:function(e){m=e}},7),a.link("../../../../../components/message/variants/SystemMessage",{default:function(e){h=e}},8),a.link("../../../../../components/message/variants/ThreadMessage",{default:function(e){k=e}},9),a.link("../../../../../hooks/useFormatDate",{useFormatDate:function(e){M=e}},10),a.link("../../../MessageList/lib/isMessageNewDay",{isMessageNewDay:function(e){y=e}},11),a.link("../../../MessageList/providers/MessageListProvider",{default:function(e){p=e}},12),a.link("../../../body/LoadingMessagesIndicator",{default:function(e){v=e}},13),a.link("../../../hooks/useFirstUnreadMessageId",{useFirstUnreadMessageId:function(e){L=e}},14),a.link("../../../hooks/useScrollMessageList",{useScrollMessageList:function(e){S=e}},15),a.link("../hooks/useLegacyThreadMessageJump",{useLegacyThreadMessageJump:function(e){b=e}},16),a.link("../hooks/useLegacyThreadMessageListScrolling",{useLegacyThreadMessageListScrolling:function(e){E=e}},17),a.link("../hooks/useLegacyThreadMessages",{useLegacyThreadMessages:function(e){T=e}},18),a.exportDefault(function(e){var s=e.mainMessage,a=T(s._id),w=a.messages,U=a.loading,_=E(s),D=_.listWrapperRef,N=_.listRef,F=_.onScroll,A=i(N,b({enabled:!U}).parentRef),I=r("hideUsernames"),R=!!r("displayAvatars"),C=M(),P=o(),j=Number(l("Message_GroupingPeriod")),x=S(D),B=L();return c.createElement("div",{className:["thread-list js-scroll-thread",I&&"hide-usernames"].filter(g).join(" ")},c.createElement(m,{ref:D,onScroll:F,style:{scrollBehavior:"smooth",overflowX:"hidden"}},c.createElement("ul",{className:"thread",ref:A,style:{scrollBehavior:"smooth",overflowX:"hidden"}},U?c.createElement("li",{className:"load-more"},c.createElement(v,null)):c.createElement(p,{scrollMessageList:x},[s].concat(n(w)).map(function(e,s,a){var n=a[s-1],i=!(!n||f.isSystemMessage(e)||f.isSystemMessage(n))&&!1!==e.groupable&&e.u._id===n.u._id&&e.alias===n.alias&&u(e.ts,n.ts)<j&&!y(e,n),l=y(e,n),o=B===e._id,r=l||o,g=i&&!l,m=f.isSystemMessage(e);return c.createElement(d,{key:e._id},r&&c.createElement(t,{unreadLabel:o?P("Unread_Messages").toLowerCase():void 0},l&&C(e.ts)),c.createElement("li",null,m?c.createElement(h,{message:e,showUserAvatar:R}):c.createElement(k,{message:e,sequential:g,unread:o,showUserAvatar:R})))})))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Threads/components/171f5e4a532a0966abf0cb9f6dd5017285070fa3.map