function module(e,t,n){let l,a,o,i,s;n.link("react",{default(e){l=e}},0),n.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){a=e}},1),n.link("../../../hooks/useEndpointData",{useEndpointData(e){o=e}},2),n.link("../Skeleton",{FormSkeleton(e){i=e}},3),n.link("./CloseChatModal",{default(e){s=e}},4),n.exportDefault(e=>{let{departmentId:t,visitorEmail:n,onCancel:d,onConfirm:r}=e,{value:u,phase:k}=o("/v1/livechat/department/:_id",{keys:{_id:t}});return[k].includes(a.LOADING)?l.createElement(i,null):l.createElement(s,{onCancel:d,onConfirm:r,visitorEmail:n,department:u.department})})}
//# sourceMappingURL=/dynamic/client/components/Omnichannel/modals/bc0f4b5e1e02685e6fac2fd8de07cfc5686e7d65.map