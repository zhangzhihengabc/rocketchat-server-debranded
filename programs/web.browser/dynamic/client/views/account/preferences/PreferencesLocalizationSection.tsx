function module(e,t,l){let n,r,a,o,u,c,i,m,d,s,k,g,f;l.link("@rocket.chat/fuselage",{Accordion(e){n=e},Field(e){r=e},FieldGroup(e){a=e},FieldLabel(e){o=e},FieldRow(e){u=e},Select(e){c=e}},0),l.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){i=e}},1),l.link("@rocket.chat/ui-contexts",{useLanguages(e){m=e},useTranslation(e){d=e}},2),l.link("react",{default(e){s=e},useMemo(e){k=e}},3),l.link("react-hook-form",{useFormContext(e){g=e},Controller(e){f=e}},4),l.exportDefault(()=>{let e=d(),t=m(),{control:l}=g(),E=k(()=>{let e=t.map(e=>{let{key:t,name:l}=e;return[t,l]});return e.sort((e,t)=>{let[l]=e,[n]=t;return l.localeCompare(n)}),e},[t]),h=i();return s.createElement(n.Item,{title:e("Localization"),defaultExpanded:!0},s.createElement(a,null,s.createElement(r,null,s.createElement(o,{htmlFor:h},e("Language")),s.createElement(u,null,s.createElement(f,{control:l,name:"language",render:e=>{let{field:{value:t,onChange:l}}=e;return s.createElement(c,{id:h,value:t,onChange:l,options:E})}})))))})}
//# sourceMappingURL=/dynamic/client/views/account/preferences/2fb065c0e438f1c07f6ee0f1fdc9702c5c585140.map