function module(e,t,r){let a,s,n,o,l,c,i,u;r.link("@rocket.chat/fuselage-toastbar",{ToastBarProvider(e){a=e},useToastBarDispatch(e){s=e}},0),r.link("@rocket.chat/ui-contexts",{ToastMessagesContext(e){n=e}},1),r.link("react",{default(e){o=e},useEffect(e){l=e}},2),r.link("../lib/errorHandling",{getErrorMessage(e){c=e}},3),r.link("../lib/toast",{dispatchToastMessage(e){i=e},subscribeToToastMessages(e){u=e}},4);let g={dispatch:i},f=e=>{let{children:t}=e,r=s();return l(()=>u(e=>{let{type:t,message:a,title:s=""}=e;if("error"===t&&"object"==typeof a){r({type:t,message:c(a)});return}"string"!=typeof a&&a instanceof Error&&(a="[".concat(a.name,"] ").concat(a.message)),"warning"!==t&&r({type:t,message:s+a})}),[r]),o.createElement(n.Provider,{children:t,value:g})};r.exportDefault(e=>{let{children:t}=e;return o.createElement(a,null,o.createElement(f,{children:t}))})}
//# sourceMappingURL=/dynamic/client/providers/10aa9179eea7a11f6183a07ec62dffdd8f73b1eb.map