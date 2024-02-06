function module(e,n,t){var r,a,i,l,o,c,u,s,m,f,d,g,P,k,b,E=["current","itemsPerPage","setItemsPerPage","setCurrent"];t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},1),t.link("@rocket.chat/fuselage",{Pagination:function(e){i=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){l=e}},1),t.link("react",{default:function(e){o=e},useMemo:function(e){c=e}},2),t.link("react-hook-form",{useWatch:function(e){u=e},useFieldArray:function(e){s=e}},3),t.link("../../../../components/GenericTable",{GenericTable:function(e){m=e},GenericTableBody:function(e){f=e},GenericTableHeader:function(e){d=e},GenericTableHeaderCell:function(e){g=e}},4),t.link("../../../../components/GenericTable/hooks/usePagination",{usePagination:function(e){P=e}},5),t.link("./AddAgent",{default:function(e){k=e}},6),t.link("./AgentRow",{default:function(e){b=e}},7),t.exportDefault(function(e){var n=e.control,t=e.register,p=l(),h=s({control:n,name:"agentList"}),x=h.fields,T=h.append,v=h.remove,A=u({control:n,name:"agentList"}),G=P(),w=G.current,C=G.itemsPerPage,y=G.setItemsPerPage,I=G.setCurrent,L=a(G,E),R=c(function(){return x.slice(w,w+C)},[w,x,C]);return o.createElement(o.Fragment,null,o.createElement(k,{agentList:A,"data-qa":"DepartmentSelect-AgentsTable",onAdd:T}),o.createElement(m,null,o.createElement(d,null,o.createElement(g,{w:"x200"},p("Name")),o.createElement(g,{w:"x140"},p("Count")),o.createElement(g,{w:"x120"},p("Order")),o.createElement(g,{w:"x40"},p("Remove"))),o.createElement(f,null,R.map(function(e,n){return o.createElement(b,{key:e.id,index:n,agent:e,register:t,onRemove:function(){return v(n)}})}))),o.createElement(i,r({divider:!0,current:w,itemsPerPage:C,count:x.length,onSetItemsPerPage:y,onSetCurrent:I},L)))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/departments/DepartmentAgentsTable/3cff0e77412bbeb144721f63fcd9c82884f83d90.map