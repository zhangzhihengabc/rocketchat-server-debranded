function module(e,i,n){let o,t,r,a,l,s,c,u,d,C,f,k;n.export({useCallAction:()=>g}),n.link("@rocket.chat/core-typings",{isRoomFederated(e){o=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(e){t=e},useUserRoom(e){r=e},useUserId(e){a=e},useUserSubscriptionByName(e){l=e}},1),n.link("react",{useMemo(e){s=e}},2),n.link("../../../../../../app/ui/client/lib/userCard",{closeUserCard(e){c=e}},3),n.link("../../../../../contexts/VideoConfContext",{useVideoConfDispatchOutgoing(e){u=e},useVideoConfIsCalling(e){d=e},useVideoConfIsRinging(e){C=e}},4),n.link("../../../../../lib/VideoConfManager",{VideoConfManager(e){f=e}},5),n.link("../../../contextualBar/VideoConference/hooks/useVideoConfWarning",{useVideoConfWarning(e){k=e}},6);let g=e=>{var i;let n=t(),g=l(null!==(i=e.username)&&void 0!==i?i:""),p=r((null==g?void 0:g.rid)||""),V=k(),m=u(),h=d(),x=C(),y=a(),b=s(()=>{let i=async()=>{if(!h&&!x&&p)try{await f.loadCapabilities(),c(),m({rid:p._id})}catch(e){V(e.error)}};return p&&!o(p)&&e._id!==y?{content:n("Start_call"),icon:"phone",onClick:i,type:"communication"}:void 0},[n,p,m,V,h,x,y,e._id]);return b}}
//# sourceMappingURL=/dynamic/client/views/room/hooks/useUserInfoActions/actions/471520cbff2f0c18710eb5dbfbcb54f736335542.map