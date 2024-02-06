function module(e,t,n){let r,l,a,i,u,c,s,o,m,d,k,E,p,v,y,f,h,T,b,g,x,P,B,I,G;let S=["current","itemsPerPage","setItemsPerPage","setCurrent"];n.link("@babel/runtime/helpers/extends",{default(e){r=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},2),n.link("@rocket.chat/core-typings",{UserStatus(e){i=e}},0),n.link("@rocket.chat/fuselage",{Box(e){u=e},Pagination(e){c=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery(e){s=e}},2),n.link("@rocket.chat/ui-contexts",{useTranslation(e){o=e},useEndpoint(e){m=e}},3),n.link("@tanstack/react-query",{useQuery(e){d=e}},4),n.link("react",{default(e){k=e},useMemo(e){E=e},useState(e){p=e}},5),n.link("../../../components/GenericNoResults",{default(e){v=e}},6),n.link("../../../components/GenericTable",{GenericTable(e){y=e},GenericTableHeader(e){f=e},GenericTableHeaderCell(e){h=e},GenericTableBody(e){T=e},GenericTableRow(e){b=e},GenericTableCell(e){g=e},GenericTableLoadingRow(e){x=e}},7),n.link("../../../components/GenericTable/hooks/usePagination",{usePagination(e){P=e}},8),n.link("../../../components/GenericTable/hooks/useSort",{useSort(e){B=e}},9),n.link("../../../components/avatar/UserAvatar",{default(e){I=e}},10),n.link("./QueueListFilter",{QueueListFilter(e){G=e}},11),n.exportDefault(()=>{let e=o(),t=P(),{current:n,itemsPerPage:w,setItemsPerPage:C,setCurrent:F}=t,q=a(t,S),{sortBy:O,sortDirection:A,setSort:L}=B("servedBy"),[N,Q]=p({servedBy:"",status:"",departmentId:""}),R=s("(min-width: 1024px)"),U=k.createElement(k.Fragment,null,R&&k.createElement(h,{key:"servedBy",direction:A,active:"servedBy"===O,onClick:L,sort:"servedBy"},e("Served_By")),k.createElement(h,{key:"department",direction:A,active:"department"===O,onClick:L,sort:"department"},e("Department")),k.createElement(h,{key:"total",direction:A,active:"total"===O,onClick:L,sort:"total"},e("Total")),k.createElement(h,{key:"status",direction:A,active:"status"===O,onClick:L,sort:"status"},e("Status"))),j=E(()=>{let e=l(l({sort:'{ "'.concat(O,'": ').concat("asc"===A?1:-1," }")},w&&{count:w}),n&&{offset:n});return"online"!==N.status&&(e.includeOfflineAgents="true"),N.servedBy&&(e.agentId=N.servedBy),N.departmentId&&(e.departmentId=N.departmentId),e},[O,A,w,n,N.status,N.departmentId,N.servedBy]),D=t=>{if(!t)return e("Offline");switch(t){case i.ONLINE:return e("Online");case i.AWAY:return e("Away");case i.BUSY:return e("Busy");case i.OFFLINE:return e("Offline");default:return t}},H=m("GET","/v1/livechat/queue"),{data:M,isSuccess:W,isLoading:Y}=d(["livechat-queue",j],async()=>H(j));return k.createElement(k.Fragment,null,k.createElement(G,{setFilter:Q}),Y&&k.createElement(y,null,k.createElement(f,null,U),k.createElement(T,null,k.createElement(x,{cols:4}))),W&&(null==M?void 0:M.queue.length)===0&&k.createElement(v,null),W&&(null==M?void 0:M.queue.length)>0&&k.createElement(k.Fragment,null,k.createElement(y,null,k.createElement(f,null,U),k.createElement(T,null,null==M?void 0:M.queue.map(e=>{let{user:t,department:n,chats:r}=e;return k.createElement(b,{key:t._id,tabIndex:0},k.createElement(g,{withTruncatedText:!0},k.createElement(u,{display:"flex",alignItems:"center",mb:"5px"},k.createElement(I,{size:R?"x28":"x40",username:t.username}),k.createElement(u,{display:"flex",mi:8},t.username))),k.createElement(g,{withTruncatedText:!0},n?n.name:""),k.createElement(g,{withTruncatedText:!0},r),k.createElement(g,{withTruncatedText:!0},D(null==t?void 0:t.status)))}))),k.createElement(c,r({divider:!0,current:n,itemsPerPage:w,count:(null==M?void 0:M.total)||0,onSetItemsPerPage:C,onSetCurrent:F},q))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/queueList/c451415b79611ae04f04cdd3df01bae3dea49de3.map