function module(e,t,r){let n,a,s,o;r.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),r.export({useUsersByTimeOfTheDay:()=>i}),r.link("@rocket.chat/ui-contexts",{useEndpoint(e){a=e}},0),r.link("@tanstack/react-query",{useQuery(e){s=e}},1),r.link("../../../../components/dashboards/periods",{getPeriodRange(e){o=e}},2);let i=e=>{let{period:t,utc:r}=e,i=a("GET","/v1/engagement-dashboard/users/users-by-time-of-the-day-in-a-week");return s(["admin/engagement-dashboard/users/users-by-time-of-the-day",{period:t,utc:r}],async()=>{let{start:e,end:a}=o(t,r),s=await i({start:e.toISOString(),end:a.toISOString()});return s?n(n({},s),{},{start:e,end:a}):void 0},{refetchInterval:3e5,useErrorBoundary:!0})}}
//# sourceMappingURL=/dynamic/ee/client/views/admin/engagementDashboard/users/484b8a966169277bbc3f8050e76afcdb92ac528d.map