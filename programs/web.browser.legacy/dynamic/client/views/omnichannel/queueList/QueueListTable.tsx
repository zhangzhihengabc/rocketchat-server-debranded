function module(e,t,n){var r,a,l,u,i,c,o,s,d,m,f,k,p,v,E,y,b,h,g,T,P,x,B,I,G,S,w,C=["current","itemsPerPage","setItemsPerPage","setCurrent"];n.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){l=e}},2),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},3),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},4),n.link("@rocket.chat/core-typings",{UserStatus:function(e){c=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){o=e},Pagination:function(e){s=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){d=e}},2),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){m=e},useEndpoint:function(e){f=e}},3),n.link("@tanstack/react-query",{useQuery:function(e){k=e}},4),n.link("react",{default:function(e){p=e},useMemo:function(e){v=e},useState:function(e){E=e}},5),n.link("../../../components/GenericNoResults",{default:function(e){y=e}},6),n.link("../../../components/GenericTable",{GenericTable:function(e){b=e},GenericTableHeader:function(e){h=e},GenericTableHeaderCell:function(e){g=e},GenericTableBody:function(e){T=e},GenericTableRow:function(e){P=e},GenericTableCell:function(e){x=e},GenericTableLoadingRow:function(e){B=e}},7),n.link("../../../components/GenericTable/hooks/usePagination",{usePagination:function(e){I=e}},8),n.link("../../../components/GenericTable/hooks/useSort",{useSort:function(e){G=e}},9),n.link("../../../components/avatar/UserAvatar",{default:function(e){S=e}},10),n.link("./QueueListFilter",{QueueListFilter:function(e){w=e}},11),n.exportDefault(function(){var e=m(),t=I(),n=t.current,F=t.itemsPerPage,q=t.setItemsPerPage,A=t.setCurrent,L=i(t,C),O=G("servedBy"),N=O.sortBy,Q=O.sortDirection,D=O.setSort,R=u(E({servedBy:"",status:"",departmentId:""}),2),U=R[0],j=R[1],H=d("(min-width: 1024px)"),M=p.createElement(p.Fragment,null,H&&p.createElement(g,{key:"servedBy",direction:Q,active:"servedBy"===N,onClick:D,sort:"servedBy"},e("Served_By")),p.createElement(g,{key:"department",direction:Q,active:"department"===N,onClick:D,sort:"department"},e("Department")),p.createElement(g,{key:"total",direction:Q,active:"total"===N,onClick:D,sort:"total"},e("Total")),p.createElement(g,{key:"status",direction:Q,active:"status"===N,onClick:D,sort:"status"},e("Status"))),W=v(function(){var e=l(l({sort:'{ "'+N+'": '+("asc"===Q?1:-1)+" }"},F&&{count:F}),n&&{offset:n});return"online"!==U.status&&(e.includeOfflineAgents="true"),U.servedBy&&(e.agentId=U.servedBy),U.departmentId&&(e.departmentId=U.departmentId),e},[N,Q,F,n,U.status,U.departmentId,U.servedBy]),Y=function(t){if(!t)return e("Offline");switch(t){case c.ONLINE:return e("Online");case c.AWAY:return e("Away");case c.BUSY:return e("Busy");case c.OFFLINE:return e("Offline");default:return t}},_=f("GET","/v1/livechat/queue"),z=k(["livechat-queue",W],function(){return r.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",_(W));case 1:case"end":return e.stop()}},null,null,null,Promise)}),J=z.data,K=z.isSuccess,V=z.isLoading;return p.createElement(p.Fragment,null,p.createElement(w,{setFilter:j}),V&&p.createElement(b,null,p.createElement(h,null,M),p.createElement(T,null,p.createElement(B,{cols:4}))),K&&(null==J?void 0:J.queue.length)===0&&p.createElement(y,null),K&&(null==J?void 0:J.queue.length)>0&&p.createElement(p.Fragment,null,p.createElement(b,null,p.createElement(h,null,M),p.createElement(T,null,null==J?void 0:J.queue.map(function(e){var t=e.user,n=e.department,r=e.chats;return p.createElement(P,{key:t._id,tabIndex:0},p.createElement(x,{withTruncatedText:!0},p.createElement(o,{display:"flex",alignItems:"center",mb:"5px"},p.createElement(S,{size:H?"x28":"x40",username:t.username}),p.createElement(o,{display:"flex",mi:8},t.username))),p.createElement(x,{withTruncatedText:!0},n?n.name:""),p.createElement(x,{withTruncatedText:!0},r),p.createElement(x,{withTruncatedText:!0},Y(null==t?void 0:t.status)))}))),p.createElement(s,a({divider:!0,current:n,itemsPerPage:F,count:(null==J?void 0:J.total)||0,onSetItemsPerPage:q,onSetCurrent:A},L))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/queueList/ef7ef64ba557f63113ef8d525dd954926c2b4fd0.map