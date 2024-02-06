function module(e,t,n){let o,a,l,r,s,i,u,c,d,_,p,b;n.link("@babel/runtime/helpers/objectSpread2",{default(e){o=e}},0),n.export({useStatusSection:()=>h}),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){a=e},useTranslation(e){l=e}},0),n.link("@tanstack/react-query",{useQuery(e){r=e}},1),n.link("react",{useMemo(e){s=e}},2),n.link("../../../components/dashboards/periods",{getPeriodRange(e){i=e}},3),n.link("../../../components/dashboards/usePeriodSelectorStorage",{usePeriodSelectorStorage(e){u=e}},4),n.link("../components/constants",{COLORS(e){c=e},PERIOD_OPTIONS(e){d=e}},5),n.link("../utils/formatPeriodDescription",{formatPeriodDescription(e){_=e}},6),n.link("../utils/round",{round(e){p=e}},7),n.link("./useDefaultDownload",{useDefaultDownload(e){b=e}},8);let S={Open:{label:"Omnichannel_Reports_Status_Open",color:c.success},Queued:{label:"Queued",color:c.warning2},On_Hold:{label:"On_Hold",color:c.warning},Closed:{label:"Omnichannel_Reports_Status_Closed",color:c.danger}},m=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0;return e.map(e=>{let a=S[e.label],l=t>0?p(e.value/t*100):0,r=n(a.label);return o(o({},e),{},{id:e.label,label:"".concat(r," ").concat(e.value," (").concat(l,"%)"),rawLabel:r,color:a.color})})},h=()=>{let e=l(),[t,n]=u("reports-status-period",d),c=a("GET","/v1/livechat/analytics/dashboards/conversations-by-status"),{start:p,end:S}=i(t),{data:{data:h,total:O}={data:[],total:0},isLoading:g,isError:v,isSuccess:k,refetch:y}=r(["omnichannel-reports","conversations-by-status",t,e],async()=>{let t=await c({start:p.toISOString(),end:S.toISOString()});return o(o({},t),{},{data:m(t.data,t.total,e)})},{refetchInterval:3e5}),f=e("Conversations_by_status"),D=e("__count__conversations__period__",{count:null!=O?O:0,period:_(t,e)}),P=e("Omnichannel_Reports_Status_Empty_Subtitle"),R=b({columnName:e("Status"),title:f,data:h,period:t});return s(()=>({id:"conversations-by-status",title:f,subtitle:D,emptyStateSubtitle:P,data:h,total:O,period:t,periodSelectorProps:n,downloadProps:R,isLoading:g,isError:v,isDataFound:k&&h.length>0,onRetry:y}),[f,D,P,h,O,t,n,R,g,v,k,y])}}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/reports/hooks/60f1d23ed328c5734c1e1cdd94a2647d42978ace.map