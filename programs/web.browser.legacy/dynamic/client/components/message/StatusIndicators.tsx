function module(e,t,n){var a,s,i,l,c,o,d,r,u,m,g,_,f;n.link("@rocket.chat/core-typings",{isEditedMessage:function(e){a=e},isE2EEMessage:function(e){s=e},isOTRMessage:function(e){i=e},isOTRAckMessage:function(e){l=e}},0),n.link("@rocket.chat/fuselage",{MessageStatusIndicator:function(e){c=e},MessageStatusIndicatorItem:function(e){o=e}},1),n.link("@rocket.chat/ui-contexts",{useUserId:function(e){d=e},useTranslation:function(e){r=e}},2),n.link("react",{default:function(e){u=e}},3),n.link("./list/MessageListContext",{useMessageDateFormatter:function(e){m=e},useShowStarred:function(e){g=e},useShowTranslated:function(e){_=e},useShowFollowing:function(e){f=e}},4),n.exportDefault(function(e){var t=e.message,n=r(),E=_(t),M=g({message:t}),h=f({message:t}),k=s(t),y=i(t)||l(t),b=d(),p=m();return u.createElement(c,null,E&&u.createElement(o,{name:"language",title:n("Translated")}),h&&u.createElement(o,{name:"bell",title:n("Following")}),t.sentByEmail&&u.createElement(o,{name:"mail",title:n("Message_sent_by_email")}),a(t)&&u.createElement(o,{name:"edit",color:t.u._id!==t.editedBy._id?"danger":void 0,title:t.editedBy._id===b?n("Message_has_been_edited_at",{date:p(t.editedAt)}):n("Message_has_been_edited_by_at",{username:t.editedBy.username||"?",date:p(t.editedAt)})}),t.pinned&&u.createElement(o,{name:"pin",title:n("Message_has_been_pinned")}),k&&u.createElement(o,{name:"key"}),y&&u.createElement(o,{name:"stopwatch"}),M&&u.createElement(o,{name:"star-filled",title:n("Message_has_been_starred")}))})}
//# sourceMappingURL=/dynamic/client/components/message/e349c41f002a167fa9943fc17da876c7589485fc.map