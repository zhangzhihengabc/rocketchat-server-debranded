function module(e,t,l){let n,a,r,o,u,i,s,c,m,p,d,k,h,f,E,v,b;let g=["onChange"],x=["selected","onRemove"],C=["value","label"];l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),l.link("@rocket.chat/fuselage",{AutoComplete(e){r=e},Box(e){o=e},OptionAvatar(e){u=e},Option(e){i=e},OptionContent(e){s=e},Chip(e){c=e},OptionDescription(e){m=e}},0),l.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){p=e}},1),l.link("@rocket.chat/ui-contexts",{useEndpoint(e){d=e}},2),l.link("@tanstack/react-query",{useQuery(e){k=e}},3),l.link("react",{default(e){h=e},memo(e){f=e},useMemo(e){E=e},useState(e){v=e}},4),l.link("../avatar/UserAvatar",{default(e){b=e}},5);let y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{selector:JSON.stringify({term:e})}};l.exportDefault(f(e=>{let{onChange:t}=e,l=a(e,g),[f,O]=v(""),A=p(f,1e3),D=d("GET","/v1/users.autocomplete"),{data:S}=k(["usersAutoComplete",A],async()=>D(y(A))),q=E(()=>(null==S?void 0:S.items.map(e=>({value:e.username,label:e.name})))||[],[S]);return h.createElement(r,n({},l,{filter:f,setFilter:O,onChange:t,multiple:!0,renderSelected:e=>{let{selected:{value:t,label:l},onRemove:r}=e,u=a(e,x);return h.createElement(c,n({},u,{height:"x20",value:t,onClick:r,mie:4}),h.createElement(b,{size:"x20",username:t}),h.createElement(o,{is:"span",margin:"none",mis:4},l))},renderItem:e=>{let{value:t,label:l}=e,r=a(e,C);return h.createElement(i,n({"data-qa-type":"autocomplete-user-option",key:t},r),h.createElement(u,null,h.createElement(b,{username:t,size:"x20"})),h.createElement(s,null,l," ",h.createElement(m,null,"(",t,")")))},options:q}))}))}
//# sourceMappingURL=/dynamic/client/components/UserAutoCompleteMultiple/eaa48432a4a47cf18f79217e68cb3db0442a5557.map