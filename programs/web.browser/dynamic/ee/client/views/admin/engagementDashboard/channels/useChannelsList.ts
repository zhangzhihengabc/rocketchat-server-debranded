function module(e,t,n){let a,r,s,o;n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),n.export({useChannelsList:()=>i}),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){r=e}},0),n.link("@tanstack/react-query",{useQuery(e){s=e}},1),n.link("../../../../components/dashboards/periods",{getPeriodRange(e){o=e}},2);let i=e=>{let{period:t,offset:n,count:i}=e,l=r("GET","/v1/engagement-dashboard/channels/list");return s(["admin/engagement-dashboard/channels/list",{period:t,offset:n,count:i}],async()=>{let{start:e,end:r}=o(t),s=await l({start:e.toISOString(),end:r.toISOString(),offset:n,count:i});return s?a(a({},s),{},{start:e,end:r}):void 0},{keepPreviousData:!0,refetchInterval:3e5,useErrorBoundary:!0})}}
//# sourceMappingURL=/dynamic/ee/client/views/admin/engagementDashboard/channels/5ae5dc21f2e80a35d3c8aafbc675b7fb74a2166b.map