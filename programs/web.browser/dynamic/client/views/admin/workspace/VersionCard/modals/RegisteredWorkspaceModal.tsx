function module(e,t,l){let n,a,r,o,c,s,u,i,m,k,p,E,d;let g=["onClose","onStatusChange"];l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},0),l.link("@rocket.chat/fuselage",{Box(e){a=e},Button(e){r=e},ButtonGroup(e){o=e},Modal(e){c=e}},0),l.link("@rocket.chat/fuselage-hooks",{useSafely(e){s=e}},1),l.link("@rocket.chat/ui-contexts",{useMethod(e){u=e},useSetModal(e){i=e},useToastMessageDispatch(e){m=e},useTranslation(e){k=e}},2),l.link("react",{default(e){p=e},useState(e){E=e}},3),l.link("../hooks/useFeatureBullets",{default(e){d=e}},4),l.exportDefault(e=>{let{onClose:t,onStatusChange:l}=e,h=n(e,g),y=k(),f=i(),C=m(),S=d(),[_,W]=s(E(!1)),b=u("cloud:syncWorkspace"),R=async()=>{W(!0);try{let e=await b();if(!e)throw Error(y("RegisterWorkspace_Syncing_Error"));C({type:"success",message:y("RegisterWorkspace_Syncing_Complete")}),f(null)}catch(e){C({type:"error",message:e})}finally{null==l||l(),W(!1)}};return p.createElement(c,h,p.createElement(c.Header,null,p.createElement(c.HeaderText,null,p.createElement(c.Title,null,y("Workspace_registered"))),p.createElement(c.Close,{onClick:t})),p.createElement(c.Content,null,p.createElement(a,{withRichContent:!0},p.createElement("span",null,"".concat(y("RegisterWorkspace_Registered_Subtitle"),": ")),p.createElement("ul",null,S.map((e,t)=>p.createElement("li",{key:t},p.createElement("strong",null,e.title),p.createElement(a,{is:"p",mbs:4},e.description)))))),p.createElement(c.Footer,null,p.createElement(o,{align:"end"},p.createElement(r,{icon:"reload",onClick:R,loading:_},y("Sync")))))})}
//# sourceMappingURL=/dynamic/client/views/admin/workspace/VersionCard/modals/9aad9c9023268d6da17646a86058ff7b5ff2580b.map