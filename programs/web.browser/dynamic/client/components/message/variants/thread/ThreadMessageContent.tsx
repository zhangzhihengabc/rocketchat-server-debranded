function module(e,t,n){let l,a,s,i,o,r,c,u,d,m,k,g,h,b,E,f,p,v,_,M,y;let L=["method_id","i18nLabel"];n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},1),n.link("@rocket.chat/core-typings",{isE2EEMessage(e){s=e}},0),n.link("@rocket.chat/ui-contexts",{useSetting(e){i=e},useUserId(e){o=e},useTranslation(e){r=e}},1),n.link("react",{default(e){c=e},memo(e){u=e}},2),n.link("../../../../hooks/useUserData",{useUserData(e){d=e}},3),n.link("../../MessageContentBody",{default(e){m=e}},4),n.link("../../ReadReceiptIndicator",{default(e){k=e}},5),n.link("../../content/Attachments",{default(e){g=e}},6),n.link("../../content/BroadcastMetrics",{default(e){h=e}},7),n.link("../../content/Location",{default(e){b=e}},8),n.link("../../content/MessageActions",{default(e){E=e}},9),n.link("../../content/Reactions",{default(e){f=e}},10),n.link("../../content/UrlPreviews",{default(e){p=e}},11),n.link("../../hooks/useNormalizedMessage",{useNormalizedMessage(e){v=e}},12),n.link("../../hooks/useOembedLayout",{useOembedLayout(e){_=e}},13),n.link("../../hooks/useSubscriptionFromMessageQuery",{useSubscriptionFromMessageQuery(e){M=e}},14),n.link("../../uikit/UiKitMessageBlock",{default(e){y=e}},15),n.exportDefault(u(e=>{var t,n,u,R,U,F;let{message:S}=e,j=s(S),{enabled:B}=_(),D=null!==(t=M(S).data)&&void 0!==t?t:void 0,O=null!==(n=null==D?void 0:D.broadcast)&&void 0!==n&&n,x=o(),z=a(a({},S.u),{},{roles:[]},d(S.u._id)),A=i("Message_Read_Receipt_Enabled",!1),I=r(),N=v(S);return c.createElement(c.Fragment,null,!(null!==(u=N.blocks)&&void 0!==u&&u.length)&&!!(null!==(R=N.md)&&void 0!==R&&R.length)&&c.createElement(c.Fragment,null,(!j||"done"===N.e2e)&&c.createElement(m,{md:N.md,mentions:N.mentions,channels:N.channels}),j&&"pending"===N.e2e&&I("E2E_message_encrypted_placeholder")),N.blocks&&c.createElement(y,{rid:N.rid,mid:N._id,blocks:N.blocks}),N.attachments&&c.createElement(g,{attachments:N.attachments}),B&&!!(null!==(U=N.urls)&&void 0!==U&&U.length)&&c.createElement(p,{urls:N.urls}),(null===(F=N.actionLinks)||void 0===F?void 0:F.length)&&c.createElement(E,{message:N,actions:N.actionLinks.map(e=>{let{method_id:t,i18nLabel:n}=e;return a({methodId:t,i18nLabel:n},l(e,L))})}),N.reactions&&Object.keys(N.reactions).length&&c.createElement(f,{message:N}),N.location&&c.createElement(b,{location:N.location}),O&&!!z.username&&N.u._id!==x&&c.createElement(h,{username:z.username,message:N}),A&&c.createElement(k,{unread:N.unread}))}))}
//# sourceMappingURL=/dynamic/client/components/message/variants/thread/2714548120d97c2860b4f135a0504ce85ef850df.map