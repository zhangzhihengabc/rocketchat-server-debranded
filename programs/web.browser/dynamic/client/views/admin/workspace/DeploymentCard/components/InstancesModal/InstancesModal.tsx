function module(e,t,l){let n,a,r,c,u,m,o;l.link("@rocket.chat/fuselage",{Accordion(e){n=e}},0),l.link("@rocket.chat/ui-contexts",{useTranslation(e){a=e}},1),l.link("react",{default(e){r=e}},2),l.link("../../../../../../components/GenericModal",{default(e){c=e}},3),l.link("../../../../../../hooks/useFormatDateAndTime",{useFormatDateAndTime(e){u=e}},4),l.link("./DescriptionList",{default(e){m=e}},5),l.link("./DescriptionListEntry",{default(e){o=e}},6),l.exportDefault(e=>{let{instances:t=[],onClose:l}=e,i=a(),d=u();return r.createElement(c,{onConfirm:l,confirmText:i("Close"),icon:null,title:i("Instances"),onClose:l},r.createElement(n,null,t.map(e=>{let{address:t,broadcastAuth:l,currentStatus:a,instanceRecord:c}=e;return r.createElement(n.Item,{defaultExpanded:!0,title:t,key:t},r.createElement(m,null,r.createElement(o,{label:i("Address")},t),r.createElement(o,{label:i("Auth")},l?"true":"false"),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Current_Status")," > ",i("Connected"))},a.connected?"true":"false"),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Current_Status")," > ",i("Local"))},a.local?"true":"false"),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Current_Status")," > ",i("Last_Heartbeat_Time"))},a.lastHeartbeatTime),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Instance_Record")," > ID")},null==c?void 0:c._id),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Instance_Record")," > ",i("PID"))},null==c?void 0:c.pid),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Instance_Record")," > ",i("Created_at"))},d(null==c?void 0:c._createdAt)),r.createElement(o,{label:r.createElement(r.Fragment,null,i("Instance_Record")," > ",i("Updated_at"))},d(null==c?void 0:c._updatedAt))))})))})}
//# sourceMappingURL=/dynamic/client/views/admin/workspace/DeploymentCard/components/InstancesModal/a8dd54a0c0967a0d267af54c0eb4b3bdc2c0c49e.map