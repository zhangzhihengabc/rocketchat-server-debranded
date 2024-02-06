function module(e,t,n){let l,a,r,o,c,s,i,u,m,d,k,E,g,f,p,y,h,T,b,v,x,C,P,w,S,G,F,R;let _=["current","itemsPerPage","setItemsPerPage","setCurrent"];n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("@rocket.chat/fuselage",{Pagination(e){r=e},States(e){o=e},StatesIcon(e){c=e},StatesTitle(e){s=e},StatesActions(e){i=e},StatesAction(e){u=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery(e){m=e},useDebouncedValue(e){d=e}},1),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){k=e},useTranslation(e){E=e}},2),n.link("@tanstack/react-query",{useQuery(e){g=e}},3),n.link("react",{default(e){f=e},useRef(e){p=e},useState(e){y=e},useEffect(e){h=e},useMemo(e){T=e}},4),n.link("../../../components/GenericNoResults",{default(e){b=e}},5),n.link("../../../components/GenericTable",{GenericTable(e){v=e},GenericTableBody(e){x=e},GenericTableHeader(e){C=e},GenericTableHeaderCell(e){P=e},GenericTableLoadingTable(e){w=e}},6),n.link("../../../components/GenericTable/hooks/usePagination",{usePagination(e){S=e}},7),n.link("../../../components/GenericTable/hooks/useSort",{useSort(e){G=e}},8),n.link("./RoomRow",{default(e){F=e}},9),n.link("./RoomsTableFilters",{default(e){R=e}},10);let D=["d","p","c","l","discussions","teams"];n.exportDefault(e=>{var t;let{reload:n}=e,I=E(),M=m("(min-width: 1024px)"),[A,H]=y({searchText:"",types:[]}),N=p(A.searchText),{sortBy:Q,sortDirection:j,setSort:q}=G("name"),B=S(),{current:L,itemsPerPage:U,setItemsPerPage:V,setCurrent:W}=B,z=a(B,_),J=d(A.searchText,500),K=d(T(()=>(J!==N.current&&W(0),{filter:J||"",sort:'{ "'.concat(Q,'": ').concat("asc"===j?1:-1," }"),count:U,offset:J===N.current?L:0,types:A.types.length?[...A.types.map(e=>e.id)]:D}),[J,Q,j,U,L,A.types,W]),500),O=k("GET","/v1/rooms.adminRooms"),{data:X,refetch:Y,isSuccess:Z,isLoading:$,isError:ee}=g(["rooms",K,"admin"],async()=>O(K));h(()=>{n.current=Y},[n,Y]),h(()=>{N.current=J},[J]);let et=f.createElement(f.Fragment,null,f.createElement(P,{key:"name",direction:j,active:"name"===Q,onClick:q,sort:"name",w:"x200"},I("Name")),f.createElement(P,{key:"type",direction:j,active:"t"===Q,onClick:q,sort:"t",w:"x100"},I("Type")),f.createElement(P,{key:"users",direction:j,active:"usersCount"===Q,onClick:q,sort:"usersCount",w:"x80"},I("Users")),M&&f.createElement(f.Fragment,null,f.createElement(P,{key:"messages",direction:j,active:"msgs"===Q,onClick:q,sort:"msgs",w:"x80"},I("Msgs")),f.createElement(P,{key:"default",direction:j,active:"default"===Q,onClick:q,sort:"default",w:"x80"},I("Default")),f.createElement(P,{key:"featured",direction:j,active:"featured"===Q,onClick:q,sort:"featured",w:"x80"},I("Featured"))));return f.createElement(f.Fragment,null,f.createElement(R,{setFilters:H}),$&&f.createElement(v,null,f.createElement(C,null,et),f.createElement(x,null,f.createElement(w,{headerCells:M?6:3}))),Z&&0===X.rooms.length&&f.createElement(b,null),Z&&X.rooms.length>0&&f.createElement(f.Fragment,null,f.createElement(v,null,f.createElement(C,null,et),f.createElement(x,null,null===(t=X.rooms)||void 0===t?void 0:t.map(e=>f.createElement(F,{key:e._id,room:e})))),f.createElement(r,l({divider:!0,current:L,itemsPerPage:U,count:(null==X?void 0:X.total)||0,onSetItemsPerPage:V,onSetCurrent:W},z))),ee&&f.createElement(o,null,f.createElement(c,{name:"warning",variation:"danger"}),f.createElement(s,null,I("Something_went_wrong")),f.createElement(i,null,f.createElement(u,{onClick:()=>Y()},I("Reload_page")))))})}
//# sourceMappingURL=/dynamic/client/views/admin/rooms/0c0b25860b5d06202828be8096daa02840b4b259.map