function module(e,t,l){let n,r,a,u,s,i,c,o;l.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),l.link("@rocket.chat/fuselage",{Box(e){r=e}},0),l.link("@rocket.chat/ui-contexts",{useTranslation(e){a=e}},1),l.link("react",{default(e){u=e},useMemo(e){s=e},useEffect(e){i=e}},2),l.link("../../../../../hooks/useForm",{useForm(e){c=e}},3),l.link("./AppSettingsAssembler",{default(e){o=e}},4),l.exportDefault(e=>{let{settings:t,setHasUnsavedChanges:l,settingsRef:m}=e,f=a(),d=JSON.stringify(t),k=s(()=>{let e=JSON.parse(d);return Object.values(e).reduce((e,t)=>{let{id:l,value:r,packageValue:a}=t;return n(n({},e),{},{[l]:null!=r?r:a})},{})},[d]),{values:g,handlers:p,hasUnsavedChanges:S}=c(k),h=JSON.stringify(g);return i(()=>{let e=JSON.parse(h);l(S),m.current=e},[S,h,l,m]),u.createElement(u.Fragment,null,u.createElement(r,{display:"flex",flexDirection:"column",maxWidth:"x640",w:"full",marginInline:"auto"},u.createElement(r,{fontScale:"h4",mb:12},f("Settings")),u.createElement(o,{settings:t,values:g,handlers:p})))})}
//# sourceMappingURL=/dynamic/client/views/marketplace/AppDetailsPage/tabs/AppSettings/5cf53db040e1fad9e031e53c7bc426d6b139257d.map