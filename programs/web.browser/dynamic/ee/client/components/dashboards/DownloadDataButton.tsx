function module(e,t,a){let l,n,o,r,s,i,c;let d=["attachmentName","headers","dataAvailable","dataExtractor"];a.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},1),a.link("@rocket.chat/fuselage",{IconButton(e){o=e}},0),a.link("@rocket.chat/ui-contexts",{useToastMessageDispatch(e){r=e},useTranslation(e){s=e}},1),a.link("react",{default(e){i=e}},2),a.link("../../../../client/lib/download",{downloadCsvAs(e){c=e}},3),a.exportDefault(e=>{let{attachmentName:t,headers:a,dataAvailable:u,dataExtractor:h}=e,m=n(e,d),b=s(),k=r();return i.createElement(o,l({secondary:!0,small:!0,mis:16,disabled:!u,onClick:()=>{u&&Promise.resolve(h()).then(e=>{e&&c([a,...e],t)}).catch(e=>{k({type:"error",message:e})})},"aria-label":b("Download_Info"),icon:"download"},m))})}
//# sourceMappingURL=/dynamic/ee/client/components/dashboards/38b65f0fd0cf2713078cd1908915c777ef2c9a76.map