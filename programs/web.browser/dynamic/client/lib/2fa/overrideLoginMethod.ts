function module(l,e,r){let i,t,n,o,a;r.export({overrideLoginMethod:()=>s}),r.link("../../../app/utils/lib/i18n",{t(l){i=l}},0),r.link("../toast",{dispatchToastMessage(l){t=l}},1),r.link("./process2faReturn",{process2faReturn(l){n=l}},2),r.link("./utils",{isTotpInvalidError(l){o=l},isTotpRequiredError(l){a=l}},3);let s=(l,e,r,s,u)=>{l.call(null,...e,async(l,c)=>{if(!a(l)){r(l);return}await n({error:l,result:c,emailOrUsername:u,originalCallback:r,onCode:l=>{null==s||s.call(null,...e,l,l=>{if(o(l)){t({type:"error",message:i("Invalid_two_factor_code")}),r(null);return}r(l)})}})})}}
//# sourceMappingURL=/dynamic/client/lib/2fa/5c88bba90fe08828491b44cc7ed362dd647d0ac4.map