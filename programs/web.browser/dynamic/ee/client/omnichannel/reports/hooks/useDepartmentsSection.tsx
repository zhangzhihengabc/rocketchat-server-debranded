function module(t,e,n){let o,a,r,s,i,c,d,l,u,p,_;n.link("@babel/runtime/helpers/objectSpread2",{default(t){o=t}},0),n.export({useDepartmentsSection:()=>h}),n.link("@rocket.chat/ui-contexts",{useEndpoint(t){a=t},useTranslation(t){r=t}},0),n.link("@tanstack/react-query",{useQuery(t){s=t}},1),n.link("react",{useMemo(t){i=t}},2),n.link("../../../components/dashboards/periods",{getPeriodRange(t){c=t}},3),n.link("../../../components/dashboards/usePeriodSelectorStorage",{usePeriodSelectorStorage(t){d=t}},4),n.link("../components/constants",{COLORS(t){l=t},PERIOD_OPTIONS(t){u=t}},5),n.link("../utils/formatPeriodDescription",{formatPeriodDescription(t){p=t}},6),n.link("./useDefaultDownload",{useDefaultDownload(t){_=t}},7);let m=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.map(t=>o(o({},t),{},{color:l.info}))},h=()=>{var t;let e=r(),[n,l]=d("reports-department-period",u),h=a("GET","/v1/livechat/analytics/dashboards/conversations-by-department"),{data:{data:S,total:b=0,unspecified:k=0}={data:[],total:0},isLoading:v,isError:D,isSuccess:y,refetch:f}=s(["omnichannel-reports","conversations-by-department",n],async()=>{let{start:t,end:e}=c(n),a=await h({start:t.toISOString(),end:e.toISOString()});return o(o({},a),{},{data:m(a.data)})},{refetchInterval:3e5}),g=e("Conversations_by_department"),O=e("__departments__departments_and__count__conversations__period__",{departments:null!==(t=S.length)&&void 0!==t?t:0,count:b,period:p(n,e)}),P=k>0?"(".concat(e("__count__without__department__",{count:k}),")"):"",I="".concat(O," ").concat(P),R=e("Omnichannel_Reports_Departments_Empty_Subtitle"),w=_({columnName:e("Departments"),title:g,data:S,period:n});return i(()=>({id:"conversations-by-department",title:g,subtitle:I,emptyStateSubtitle:R,data:S,total:b,isLoading:v,isError:D,isDataFound:y&&S.length>0,periodSelectorProps:l,period:n,downloadProps:w,onRetry:f}),[g,I,R,S,b,v,D,y,l,n,w,f])}}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/reports/hooks/3887e0d3e8734065197ae1f8a2962518b8625f10.map