function module(e,n,t){var a,r,l,i,c,o,u,s,m,d,f,g,E,k,T,h,b,p,v,x,y,P,G,_,S=["current","itemsPerPage","setItemsPerPage","setCurrent"];t.link("@babel/runtime/regenerator",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},2),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Pagination:function(e){c=e}},0),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){o=e}},1),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){u=e},useEndpoint:function(e){s=e}},2),t.link("@tanstack/react-query",{useQuery:function(e){m=e}},3),t.link("react",{default:function(e){d=e},useMemo:function(e){f=e}},4),t.link("../../../components/GenericNoResults/GenericNoResults",{default:function(e){g=e}},5),t.link("../../../components/GenericTable",{GenericTable:function(e){E=e},GenericTableBody:function(e){k=e},GenericTableCell:function(e){T=e},GenericTableHeader:function(e){h=e},GenericTableHeaderCell:function(e){b=e},GenericTableLoadingTable:function(e){p=e},GenericTableRow:function(e){v=e}},6),t.link("../../../components/GenericTable/hooks/usePagination",{usePagination:function(e){x=e}},7),t.link("../../../components/GenericTable/hooks/useSort",{useSort:function(e){y=e}},8),t.link("../../../components/avatar/UserAvatar",{default:function(e){P=e}},9),t.link("./AddManager",{default:function(e){G=e}},10),t.link("./RemoveManagerButton",{default:function(e){_=e}},11),t.exportDefault(function(){var e=u(),n=y("name"),t=n.sortBy,w=n.sortDirection,C=n.setSort,I=x(),N=I.current,B=I.itemsPerPage,R=I.setItemsPerPage,D=I.setCurrent,M=l(I,S),q=o(f(function(){return{fields:JSON.stringify({name:1,username:1,emails:1,avatarETag:1}),sort:'{ "'+t+'": '+("asc"===w?1:-1)+" }",count:B,offset:N}},[B,N,t,w]),500),F=s("GET","/v1/livechat/users/manager"),H=m(["livechat-manager",q],function(){return a.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",F(q));case 1:case"end":return e.stop()}},null,null,null,Promise)}),L=H.data,A=H.isLoading,U=H.isSuccess,j=H.refetch,z=d.createElement(d.Fragment,null,d.createElement(b,{key:"name",direction:w,active:"name"===t,onClick:C,sort:"name"},e("Name")),d.createElement(b,{key:"username",direction:w,active:"username"===t,onClick:C,sort:"username"},e("Username")),d.createElement(b,{key:"email",direction:w,active:"emails.address"===t,onClick:C,sort:"emails.address"},e("Email")),d.createElement(b,{key:"remove",w:"x60"},e("Remove")));return d.createElement(d.Fragment,null,d.createElement(G,{reload:j}),A&&d.createElement(E,null,d.createElement(h,null,z),d.createElement(k,null,d.createElement(p,{headerCells:2}))),U&&0===L.users.length&&d.createElement(g,{icon:"shield",title:e("No_managers_yet"),description:e("No_managers_yet_description"),linkHref:"https://go.rocket.chat/omnichannel-docs",linkText:e("Learn_more_about_managers")}),U&&L.users.length>0&&d.createElement(d.Fragment,null,d.createElement(E,null,d.createElement(h,null,z),d.createElement(k,{"data-qa-id":"GenericTableManagerInfoBody"},L.users.map(function(e){var n;return d.createElement(v,{key:e._id,tabIndex:0,"qa-user-id":e._id},d.createElement(T,{withTruncatedText:!0},d.createElement(i,{display:"flex",alignItems:"center"},d.createElement(P,{size:"x28",username:e.username||"",etag:e.avatarETag}),d.createElement(i,{display:"flex",withTruncatedText:!0,mi:8},d.createElement(i,{display:"flex",flexDirection:"column",alignSelf:"center",withTruncatedText:!0},d.createElement(i,{fontScale:"p2m",withTruncatedText:!0,color:"default"},e.name||e.username))))),d.createElement(T,null,d.createElement(i,{fontScale:"p2m",withTruncatedText:!0,color:"hint"},e.username),d.createElement(i,{mi:4})),d.createElement(T,{withTruncatedText:!0},(null===(n=e.emails)||void 0===n?void 0:n.length)&&e.emails[0].address),d.createElement(_,{_id:e._id,reload:j}))}))),d.createElement(c,r({divider:!0,current:N,itemsPerPage:B,count:L.total||0,onSetItemsPerPage:R,onSetCurrent:D},M))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/managers/9cdaba16562d71bad739bac9d3ec9f78f2494a3b.map