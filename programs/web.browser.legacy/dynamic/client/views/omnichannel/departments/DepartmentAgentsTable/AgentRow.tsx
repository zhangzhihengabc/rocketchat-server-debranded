function module(e,t,n){var a,l,r,c,i,o,u,m,d;n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),n.link("@rocket.chat/fuselage",{NumberInput:function(e){l=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){r=e}},1),n.link("react",{default:function(e){c=e},memo:function(e){i=e}},2),n.link("../../../../components/GenericTable",{GenericTableRow:function(e){o=e},GenericTableCell:function(e){u=e}},3),n.link("./AgentAvatar",{default:function(e){m=e}},4),n.link("./RemoveAgentButton",{default:function(e){d=e}},5),n.exportDefault(i(function(e){var t=e.index,n=e.agent,i=e.register,f=e.onRemove,s=r();return c.createElement(o,{key:n.agentId,tabIndex:0,role:"link",action:!0,"qa-user-id":n.agentId},c.createElement(u,{withTruncatedText:!0},c.createElement(m,{name:n.name||"",username:n.username||""})),c.createElement(u,{fontScale:"p2",color:"hint",withTruncatedText:!0},c.createElement(l,a({title:s("Count"),maxWidth:"100%"},i("agentList."+t+".count",{valueAsNumber:!0})))),c.createElement(u,{fontScale:"p2",color:"hint",withTruncatedText:!0},c.createElement(l,a({title:s("Order"),maxWidth:"100%"},i("agentList."+t+".order",{valueAsNumber:!0})))),c.createElement(u,{fontScale:"p2",color:"hint"},c.createElement(d,{agentId:n.agentId,onRemove:f})))}))}
//# sourceMappingURL=/dynamic/client/views/omnichannel/departments/DepartmentAgentsTable/97c084e181393f8471e55334fdee2f5f5fb295eb.map