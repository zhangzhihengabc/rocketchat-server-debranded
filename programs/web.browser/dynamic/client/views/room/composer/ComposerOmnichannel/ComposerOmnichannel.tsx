function module(e,n,o){let l,t,i,r,a,s,c,m,u,d,k;o.link("@rocket.chat/ui-composer",{MessageFooterCallout(e){l=e}},0),o.link("@rocket.chat/ui-contexts",{useTranslation(e){t=e},useUserId(e){i=e}},1),o.link("react",{default(e){r=e}},2),o.link("../../../../hooks/omnichannel/useIsRoomOverMacLimit",{useIsRoomOverMacLimit(e){a=e}},3),o.link("../../contexts/RoomContext",{useOmnichannelRoom(e){s=e},useUserIsSubscribed(e){c=e}},4),o.link("../ComposerMessage",{default(e){m=e}},5),o.link("./ComposerOmnichannelInquiry",{ComposerOmnichannelInquiry(e){u=e}},6),o.link("./ComposerOmnichannelJoin",{ComposerOmnichannelJoin(e){d=e}},7),o.link("./ComposerOmnichannelOnHold",{ComposerOmnichannelOnHold(e){k=e}},8),o.exportDefault(e=>{let n=s(),{servedBy:o,queuedAt:h,open:O,onHold:p}=n,C=i(),_=c(),f=t(),E=(null==o?void 0:o._id)===C,I=a(n);return O?I?r.createElement(l,{color:"default"},f("Workspace_exceeded_MAC_limit_disclaimer")):p?r.createElement(k,null):!o&&h?r.createElement(u,null):_||E?r.createElement(m,e):r.createElement(d,null):r.createElement(l,{color:"default"},f("This_conversation_is_already_closed"))})}
//# sourceMappingURL=/dynamic/client/views/room/composer/ComposerOmnichannel/838dc69a8e8d3ca1b945cef2faf3fe82be07cd7f.map