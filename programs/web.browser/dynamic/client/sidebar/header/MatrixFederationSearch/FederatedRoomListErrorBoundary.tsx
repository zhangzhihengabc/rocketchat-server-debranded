function module(e,t,r){let n,l,a,c,o,u,i,s,m,E,d;r.link("@rocket.chat/fuselage",{States(e){n=e},StatesIcon(e){l=e},StatesTitle(e){a=e},StatesSubtitle(e){c=e},StatesActions(e){o=e},StatesAction(e){u=e},Icon(e){i=e}},0),r.link("@rocket.chat/ui-contexts",{useTranslation(e){s=e}},1),r.link("@tanstack/react-query",{QueryErrorResetBoundary(e){m=e}},2),r.link("react",{default(e){E=e}},3),r.link("react-error-boundary",{ErrorBoundary(e){d=e}},4),r.exportDefault(e=>{let{children:t,resetKeys:r}=e,k=s();return E.createElement(m,null,e=>{let{reset:s}=e;return E.createElement(d,{children:t,resetKeys:r,fallbackRender:e=>{let{resetErrorBoundary:t}=e;return E.createElement(n,null,E.createElement(l,{name:"circle-exclamation",variation:"danger"}),E.createElement(a,null,k("Error")),E.createElement(c,null,k("Error_something_went_wrong")),E.createElement(o,null,E.createElement(u,{onClick:()=>{s(),t()}},E.createElement(i,{name:"reload"})," ",k("Reload"))))}})})})}
//# sourceMappingURL=/dynamic/client/sidebar/header/MatrixFederationSearch/bf58c39afc5bc36503eac5da72eb3780c66eb67f.map