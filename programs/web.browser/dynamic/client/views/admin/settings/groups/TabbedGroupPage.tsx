function module(e,t,l){let n,a,i,u,r,o,s,c,d,m,k,b,f;let p=["_id"];l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),l.link("@rocket.chat/fuselage",{Tabs(e){i=e}},0),l.link("@rocket.chat/ui-contexts",{useTranslation(e){u=e}},1),l.link("react",{default(e){r=e},memo(e){o=e},useState(e){s=e},useMemo(e){c=e}},2),l.link("../../EditableSettingsContext",{useEditableSettingsGroupSections(e){d=e},useEditableSettingsGroupTabs(e){m=e}},3),l.link("../GroupPage",{default(e){k=e}},4),l.link("../Section",{default(e){b=e}},5),l.link("./GenericGroupPage",{default(e){f=e}},6),l.exportDefault(o(function(e){let{_id:t}=e,l=a(e,p),o=u(),g=m(t),[h,E]=s(g[0]),S=c(()=>e=>()=>E(e),[E]),G=d(t,h),x=1===G.length;if(!g.length||1===g.length&&!g[0])return r.createElement(f,n({_id:t},l));!h&&g[0]&&E(g[0]);let P=r.createElement(i,null,g.map(e=>r.createElement(i.Item,{key:e||"",selected:h===e,onClick:S(e)},e?o(e):o(t))));return r.createElement(k,n({_id:t},l,{tabs:P}),G.map(e=>r.createElement(b,{key:e||"",groupId:t,sectionName:e,tabName:h,solo:x})))}))}
//# sourceMappingURL=/dynamic/client/views/admin/settings/groups/d10a72f9bc63af1c48b66dbfce1ec31b7ffc2fc0.map