function module(e,n,t){let i,l,s,o,a,u;t.link("@rocket.chat/ui-contexts",{useTranslation(e){i=e}},0),t.link("react",{default(e){l=e},memo(e){s=e}},1),t.link("../../../../hooks/useTimeAgo",{useTimeAgo(e){o=e}},2),t.link("../../../../lib/normalizeThreadMessage",{normalizeThreadMessage(e){a=e}},3),t.link("./components/DiscussionsListItem",{default(e){u=e}},4),t.exportDefault(s(function(e){var n;let{discussion:t,showRealNames:s,userId:r,onClick:m}=e,d=i(),c=o(),k=a(t),{name:f=t.u.username}=t.u;return l.createElement(u,{replies:t.replies,dcount:t.dcount,dlm:t.dlm,name:s?f:t.u.username,username:t.u.username,following:null===(n=t.replies)||void 0===n?void 0:n.includes(r),"data-drid":t.drid,ts:t.ts,msg:k,t:d,formatDate:c,onClick:m})}))}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Discussions/43f9b8f836366062b103d8ac2d53429b575f7329.map