function module(e,t,l){let a,n,o,r,i,u,s,c,m,d,p,v,k,h,b,f;let y=["value","onChange"],E=["selected","onRemove"],g=["value","label"];l.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),l.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},1),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},2),l.link("@rocket.chat/fuselage",{AutoComplete(e){r=e},Option(e){i=e},Chip(e){u=e},Box(e){s=e},Skeleton(e){c=e}},0),l.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){m=e}},1),l.link("@rocket.chat/ui-contexts",{useEndpoint(e){d=e}},2),l.link("@tanstack/react-query",{useQuery(e){p=e}},3),l.link("react",{default(e){v=e},memo(e){k=e},useMemo(e){h=e},useState(e){b=e}},4),l.link("../avatar/RoomAvatar",{default(e){f=e}},5);let S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{selector:JSON.stringify({name:e})}};l.exportDefault(k(e=>{var t;let{value:l,onChange:k}=e,x=o(e,y),[C,A]=b(""),P=m(C,300),D=d("GET","/v1/rooms.autocomplete.channelAndPrivate"),j=p(["rooms.autocomplete.channelAndPrivate",P],()=>D(S(P)),{keepPreviousData:!0}),z=h(()=>j.isSuccess?j.data.items.map(e=>{let{fname:t,name:l,_id:a,avatarETag:n,t:o}=e;return{value:a,label:{name:t||l,avatarETag:n,type:o}}}):[],[null===(t=j.data)||void 0===t?void 0:t.items,j.isSuccess]);return j.isLoading?v.createElement(c,null):v.createElement(r,a({},x,{value:l,onChange:k,filter:C,setFilter:A,multiple:!0,renderSelected:e=>{let{selected:{value:t,label:l},onRemove:r}=e,i=o(e,E);return v.createElement(u,a({},i,{key:t,value:t,onClick:r}),v.createElement(f,{size:"x20",room:n({type:(null==l?void 0:l.type)||"c",_id:t},l)}),v.createElement(s,{is:"span",margin:"none",mis:4},null==l?void 0:l.name))},renderItem:e=>{let{value:t,label:l}=e,r=o(e,g);return v.createElement(i,a({key:t},r,{label:l.name,avatar:v.createElement(f,{size:"x20",room:n({type:(null==l?void 0:l.type)||"c",_id:t},l)})}))},options:z}))}))}
//# sourceMappingURL=/dynamic/client/components/RoomAutoCompleteMultiple/c0f6c2cb962b24368014de8bcc7b23a01e764d3b.map