function module(t,e,n){let i,c,r;n.export({useAppUiKitInteraction:()=>u}),n.link("@rocket.chat/ui-contexts",{useStream(t){i=t},useUserId(t){c=t}},0),n.link("react",{useEffect(t){r=t}},1);let u=t=>{let e=i("notify-user"),n=c();r(()=>{if(n)return e("".concat(n,"/uiInteraction"),e=>{t(e)})},[e,n,t])}}
//# sourceMappingURL=/dynamic/client/hooks/4306387e3b4ac839bad33cb8b0cfe68c62140675.map
