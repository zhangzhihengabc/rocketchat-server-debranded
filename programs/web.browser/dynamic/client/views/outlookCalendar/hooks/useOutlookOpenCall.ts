function module(e,n,o){let l,a,s;o.export({useOutlookOpenCall:()=>u}),o.link("@rocket.chat/ui-contexts",{useUser(e){l=e}},0),o.link("../../../hooks/useUserDisplayName",{useUserDisplayName(e){a=e}},1),o.link("../../room/contextualBar/VideoConference/hooks/useVideoConfOpenCall",{useVideoConfOpenCall(e){s=e}},2);let u=e=>{let n=l(),o=s(),u=a({name:null==n?void 0:n.name,username:null==n?void 0:n.username}),t="".concat(e,"&name=").concat(u);if(e)return()=>o(t)}}
//# sourceMappingURL=/dynamic/client/views/outlookCalendar/hooks/a987266cb88075ab3558c8ccf9cd535e7b03e110.map