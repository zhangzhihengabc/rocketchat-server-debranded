function module(e,t,n){let a,r,o,s;n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),n.export({useTopFivePopularChannels:()=>l}),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){r=e}},0),n.link("@tanstack/react-query",{useQuery(e){o=e}},1),n.link("../../../../components/dashboards/periods",{getPeriodRange(e){s=e}},2);let l=e=>{let{period:t}=e,n=r("GET","/v1/engagement-dashboard/messages/top-five-popular-channels");return o(["admin/engagement-dashboard/messages/top-five-popular-channels",{period:t}],async()=>{let{start:e,end:r}=s(t),o=await n({start:e.toISOString(),end:r.toISOString()});return o?a(a({},o),{},{start:e,end:r}):void 0},{refetchInterval:3e5,useErrorBoundary:!0})}}
//# sourceMappingURL=/dynamic/ee/client/views/admin/engagementDashboard/messages/489855b8f8b4755094a08a29973e103ea84ca163.map