function module(e,t,a){let n,l,r,i,o,u,c,s,d,m,p,b,k,g;let h=["options","onChangeMenuVisibility"];a.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),a.link("@rocket.chat/fuselage",{MessageToolboxItem(e){r=e},Option(e){i=e},OptionDivider(e){o=e},OptionTitle(e){u=e}},0),a.link("@rocket.chat/ui-contexts",{useTranslation(e){c=e}},1),a.link("react",{default(e){s=e},Fragment(e){d=e},useCallback(e){m=e},useRef(e){p=e},useState(e){b=e}},2),a.link("../../../hooks/useEmbeddedLayout",{useEmbeddedLayout(e){k=e}},3),a.link("./ToolboxDropdown",{default(e){g=e}},4);let f=e=>{switch(e){case"communication":return 0;case"interaction":return 1;case"duplication":return 2;case"apps":return 3;case"management":return 4;default:return 5}};a.exportDefault(e=>{let{options:t,onChangeMenuVisibility:a}=e,y=l(e,h),E=p(null),v=c(),[x,C]=b(!1),q=k(),T=m(e=>{C(e),a(e)},[a]),D=t.reduce((e,t)=>{var a;let{type:n=""}=t;"alert"===t.color&&(t.variant="danger");let l=f(n),[r,i]=null!==(a=e[f(n)])&&void 0!==a?a:[n,[]];return q&&"reply-directly"===t.id||i.push(t),0===i.length||(e[l]=[r,i]),e},[]),F=m(()=>{T(!1)},[T]);return s.createElement(s.Fragment,null,s.createElement(r,{ref:E,icon:"kebab",onClick:()=>T(!x),"data-qa-id":"menu","data-qa-type":"message-action-menu",title:v("More")}),x&&s.createElement(s.Fragment,null,s.createElement(g,n({handleClose:F,reference:E},y),D.map((e,t,a)=>{let[n,l]=e;return s.createElement(d,{key:t},"apps"===n&&s.createElement(u,null,"Apps"),l.map(e=>s.createElement(i,{variant:e.variant,key:e.id,id:e.id,icon:e.icon,label:v(e.label),onClick:t=>{F(),e.action(t)},"data-qa-type":"message-action","data-qa-id":e.id,role:e.role?e.role:"button",gap:!e.icon&&"apps"===e.type})),t!==a.length-1&&s.createElement(o,null))}))))})}
//# sourceMappingURL=/dynamic/client/components/message/toolbox/f773d53fe17e2a41801e2ecf1cc237c4f53cb567.map