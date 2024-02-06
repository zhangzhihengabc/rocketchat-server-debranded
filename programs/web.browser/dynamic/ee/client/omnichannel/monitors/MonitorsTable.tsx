function module(e,t,n){let l,a,r,i,o,c,s,m,u,d,h,E,k,g,p,b,T,y,v,f,C,x,_,w,P,S,G,M,F,I,B,D,R,A,L,N,Q,q,H,U,j;let K=["current","itemsPerPage","setItemsPerPage","setCurrent"];n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){r=e}},2),n.link("@rocket.chat/fuselage",{IconButton(e){i=e},Pagination(e){o=e},Button(e){c=e},Field(e){s=e},FieldLabel(e){m=e},FieldRow(e){u=e},Box(e){d=e},States(e){h=e},StatesIcon(e){E=e},StatesTitle(e){k=e},StatesActions(e){g=e},StatesAction(e){p=e}},0),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){b=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation(e){T=e},useToastMessageDispatch(e){y=e},useMethod(e){v=e},useEndpoint(e){f=e},useSetModal(e){C=e}},2),n.link("@tanstack/react-query",{useMutation(e){x=e},useQuery(e){_=e},hashQueryKey(e){w=e}},3),n.link("react",{default(e){P=e},useMemo(e){S=e},useState(e){G=e}},4),n.link("../../../../client/components/FilterByText",{default(e){M=e}},5),n.link("../../../../client/components/GenericModal",{default(e){F=e}},6),n.link("../../../../client/components/GenericNoResults",{default(e){I=e}},7),n.link("../../../../client/components/GenericTable",{GenericTable(e){B=e},GenericTableBody(e){D=e},GenericTableCell(e){R=e},GenericTableHeader(e){A=e},GenericTableHeaderCell(e){L=e},GenericTableLoadingTable(e){N=e},GenericTableRow(e){Q=e}},8),n.link("../../../../client/components/GenericTable/hooks/usePagination",{usePagination(e){q=e}},9),n.link("../../../../client/components/GenericTable/hooks/useSort",{useSort(e){H=e}},10),n.link("../../../../client/components/UserAutoComplete",{default(e){U=e}},11),n.link("../../../../client/lib/queryClient",{queryClient(e){j=e}},12),n.exportDefault(()=>{var e;let t=T(),n=C(),[V,W]=G(""),[z,J]=G(""),O=b(V,500),X=y(),Y=q(),Z=H("name"),$=f("GET","/v1/livechat/monitors"),ee=v("livechat:removeMonitor"),et=v("livechat:addMonitor"),{current:en,itemsPerPage:el,setItemsPerPage:ea,setCurrent:er}=Y,ei=r(Y,K),{sortBy:eo,sortDirection:ec,setSort:es}=Z,em=S(()=>a(a({text:O,sort:'{ "'.concat(eo,'": ').concat("asc"===ec?1:-1," }")},el&&{count:el}),en&&{offset:en}),[O,el,en,eo,ec]),{data:eu,refetch:ed,isLoading:eh,isSuccess:eE,isError:ek}=_(["omnichannel","monitors",O,Y,Z],()=>$(em)),[eg]=G(w([em])),ep=eg!==w([em]),eb=x({mutationFn:async e=>{await et(e),await j.invalidateQueries(["omnichannel","monitors"])},onSuccess:()=>{J(""),X({type:"success",message:t("Monitor_added")})},onError:e=>{X({type:"error",message:e})}}),eT=()=>{eb.mutate(z)},ey=e=>{let l=async()=>{try{await ee(e),X({type:"success",message:t("Monitor_removed")})}catch(e){X({type:"error",message:e})}j.invalidateQueries(["omnichannel","monitors"]),n()};n(P.createElement(F,{variant:"danger",onConfirm:l,onCancel:()=>n(),confirmText:t("Delete")}))},ev=S(()=>[P.createElement(L,{key:"name",direction:ec,active:"name"===eo,onClick:es},t("Name")),P.createElement(L,{key:"username",direction:ec,active:"username"===eo,onClick:es},t("Username")),P.createElement(L,{key:"email",direction:ec,active:"email"===eo,onClick:es},t("Email")),P.createElement(L,{key:"spacer",w:40})],[es,eo,ec,t]);return P.createElement(P.Fragment,null,P.createElement(d,{display:"flex",flexDirection:"column"},P.createElement(s,null,P.createElement(m,null,t("Username")),P.createElement(u,null,P.createElement(U,{value:z,onChange:J}),P.createElement(c,{primary:!0,disabled:!z,loading:eb.isLoading,onClick:()=>eT(),mis:8},t("Add_monitor"))))),(eE&&(null==eu?void 0:eu.monitors.length)>0||ep)&&P.createElement(M,{onChange:e=>{let{text:t}=e;return W(t)}}),eh&&P.createElement(B,null,P.createElement(A,null,ev),P.createElement(D,null,P.createElement(N,{headerCells:4}))),eE&&0===eu.monitors.length&&ep&&P.createElement(I,null),eE&&0===eu.monitors.length&&!ep&&P.createElement(I,{icon:"shield-blank",title:t("No_monitors_yet"),description:t("No_monitors_yet_description"),linkHref:"https://go.rocket.chat/omnichannel-docs",linkText:t("Learn_more_about_monitors")}),eE&&eu.monitors.length>0&&P.createElement(P.Fragment,null,P.createElement(B,{"aria-busy":V!==O,"aria-live":"assertive"},P.createElement(A,null,ev),P.createElement(D,null,null===(e=eu.monitors)||void 0===e?void 0:e.map(e=>P.createElement(Q,{key:e._id,tabIndex:0,width:"full"},P.createElement(R,{withTruncatedText:!0},e.name),P.createElement(R,{withTruncatedText:!0},e.username),P.createElement(R,{withTruncatedText:!0},e.email),P.createElement(R,{withTruncatedText:!0},P.createElement(i,{icon:"trash",small:!0,title:t("Remove"),onClick:()=>ey(e.username)})))))),P.createElement(o,l({divider:!0,current:en,itemsPerPage:el,count:(null==eu?void 0:eu.total)||0,onSetItemsPerPage:ea,onSetCurrent:er},ei))),ek&&P.createElement(h,null,P.createElement(E,{name:"warning",variation:"danger"}),P.createElement(k,null,t("Something_went_wrong")),P.createElement(g,null,P.createElement(p,{onClick:()=>ed()},t("Reload_page")))))})}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/monitors/9ee1e5ba1bc2e2717fe09a3e475f0fbe277797d0.map