function module(e,t,l){let n,a,r,i,u,c,o,s;l.link("@rocket.chat/fuselage",{States(e){n=e},StatesIcon(e){a=e},StatesSubtitle(e){r=e},StatesTitle(e){i=e}},0),l.link("react",{default(e){u=e}},1),l.link("react-i18next",{useTranslation(e){c=e}},2),l.link("../../../lib/errorHandling",{getErrorMessage(e){o=e}},3),l.link("./Layout",{default(e){s=e}},4),l.exportDefault(e=>{let{error:t}=e,{t:l}=c();return u.createElement(s,null,u.createElement(n,null,u.createElement(a,{name:"warning",variation:"danger"}),u.createElement(i,null,l("core.Error")),u.createElement(r,null,o(t))))})}
//# sourceMappingURL=/dynamic/client/views/oauth/components/22ec3a4864d633ef37dae326f367cde3656b67d2.map