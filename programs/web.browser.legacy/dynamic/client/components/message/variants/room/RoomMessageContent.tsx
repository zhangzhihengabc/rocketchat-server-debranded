function module(e,n,t){var i,l,o,a,s,c,u,r,d,m,f,k,h,g,b,v,E,p,M,_,y,L,x,D,R,T,U=["method_id","i18nLabel"];t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){l=e}},1),t.link("@rocket.chat/core-typings",{isDiscussionMessage:function(e){o=e},isThreadMainMessage:function(e){a=e},isE2EEMessage:function(e){s=e}},0),t.link("@rocket.chat/ui-contexts",{useSetting:function(e){c=e},useTranslation:function(e){u=e},useUserId:function(e){r=e}},1),t.link("react",{default:function(e){d=e},memo:function(e){m=e}},2),t.link("../../../../hooks/useUserData",{useUserData:function(e){f=e}},3),t.link("../../../../views/room/contexts/ChatContext",{useChat:function(e){k=e}},4),t.link("../../MessageContentBody",{default:function(e){h=e}},5),t.link("../../ReadReceiptIndicator",{default:function(e){g=e}},6),t.link("../../content/Attachments",{default:function(e){b=e}},7),t.link("../../content/BroadcastMetrics",{default:function(e){v=e}},8),t.link("../../content/DiscussionMetrics",{default:function(e){E=e}},9),t.link("../../content/Location",{default:function(e){p=e}},10),t.link("../../content/MessageActions",{default:function(e){M=e}},11),t.link("../../content/Reactions",{default:function(e){_=e}},12),t.link("../../content/ThreadMetrics",{default:function(e){y=e}},13),t.link("../../content/UrlPreviews",{default:function(e){L=e}},14),t.link("../../hooks/useNormalizedMessage",{useNormalizedMessage:function(e){x=e}},15),t.link("../../hooks/useOembedLayout",{useOembedLayout:function(e){D=e}},16),t.link("../../hooks/useSubscriptionFromMessageQuery",{useSubscriptionFromMessageQuery:function(e){R=e}},17),t.link("../../uikit/UiKitMessageBlock",{default:function(e){T=e}},18),t.exportDefault(m(function(e){var n,t,m,C,F,O,S,j,w,B=e.message,I=e.unread,z=e.all,A=e.mention,N=e.searchText,P=s(B),Q=D().enabled,K=null!==(n=R(B).data)&&void 0!==n?n:void 0,W=null!==(t=null==K?void 0:K.broadcast)&&void 0!==t&&t,q=r(),G=l(l({},B.u),{},{roles:[]},f(B.u._id)),H=c("Message_Read_Receipt_Enabled",!1),J=k(),V=u(),X=x(B);return d.createElement(d.Fragment,null,!(null!==(m=X.blocks)&&void 0!==m&&m.length)&&!!(null!==(C=X.md)&&void 0!==C&&C.length)&&d.createElement(d.Fragment,null,(!P||"done"===X.e2e)&&d.createElement(h,{md:X.md,mentions:X.mentions,channels:X.channels,searchText:N}),P&&"pending"===X.e2e&&V("E2E_message_encrypted_placeholder")),X.blocks&&d.createElement(T,{rid:X.rid,mid:X._id,blocks:X.blocks}),!!(null!=X&&null!==(F=X.attachments)&&void 0!==F&&F.length)&&d.createElement(b,{attachments:X.attachments}),Q&&!!(null!==(O=X.urls)&&void 0!==O&&O.length)&&d.createElement(L,{urls:X.urls}),(null===(S=X.actionLinks)||void 0===S?void 0:S.length)&&d.createElement(M,{message:X,actions:X.actionLinks.map(function(e){return l({methodId:e.method_id,i18nLabel:e.i18nLabel},i(e,U))})}),X.reactions&&Object.keys(X.reactions).length&&d.createElement(_,{message:X}),J&&a(X)&&d.createElement(y,{counter:X.tcount,following:!!(q&&(null==X?void 0:null===(j=X.replies)||void 0===j?void 0:j.indexOf(q))>-1),mid:X._id,rid:X.rid,lm:X.tlm,unread:I,mention:A,all:z,participants:null==X?void 0:null===(w=X.replies)||void 0===w?void 0:w.length}),o(X)&&d.createElement(E,{count:X.dcount,drid:X.drid,lm:X.dlm,rid:X.rid}),X.location&&d.createElement(p,{location:X.location}),W&&!!G.username&&X.u._id!==q&&d.createElement(v,{username:G.username,message:X}),H&&d.createElement(g,{unread:X.unread}))}))}
//# sourceMappingURL=/dynamic/client/components/message/variants/room/15bd4f2d3bf12e616f45bf057e4a241bfb0f809b.map