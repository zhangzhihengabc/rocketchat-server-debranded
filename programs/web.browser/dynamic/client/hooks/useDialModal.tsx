function module(e,t,l){let a,n,o,i,s,r,u,c,d;l.export({useDialModal:()=>p}),l.link("@rocket.chat/ui-contexts",{useSetModal(e){a=e},useTranslation(e){n=e}},0),l.link("react",{default(e){o=e},Suspense(e){i=e},lazy(e){s=e},useCallback(e){r=e},useMemo(e){u=e}},1),l.link("../contexts/CallContext",{useIsVoipEnterprise(e){c=e}},2),l.link("../lib/toast",{dispatchToastMessage(e){d=e}},3);let m=s(()=>l.dynamicImport("../../ee/client/voip/modal/DialPad/DialPadModal")),p=()=>{let e=a(),t=c(),l=n(),s=r(()=>e(null),[e]),p=r(function(){let{initialValue:a,errorMessage:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!t){d({type:"error",message:l("You_do_not_have_permission_to_do_this")});return}e(o.createElement(i,{fallback:o.createElement("div",null)},o.createElement(m,{initialValue:a,errorMessage:n,handleClose:s})))},[e,t,l,s]);return u(()=>({openDialModal:p,closeDialModal:s}),[p,s])}}
//# sourceMappingURL=/dynamic/client/hooks/d4d95c168a6e7ebb816ee50b7724d0f3ef57183a.map