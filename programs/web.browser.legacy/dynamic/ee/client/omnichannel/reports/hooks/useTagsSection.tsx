function module(t,n,o){o.link("@babel/runtime/regenerator",{default:function(t){e=t}},0),o.link("@babel/runtime/helpers/slicedToArray",{default:function(t){r=t}},1),o.link("@babel/runtime/helpers/objectSpread2",{default:function(t){a=t}},2),o.export({useTagsSection:function(){return m}}),o.link("@rocket.chat/fuselage",{Palette:function(t){i=t}},0),o.link("@rocket.chat/ui-contexts",{useEndpoint:function(t){s=t},useTranslation:function(t){u=t}},1),o.link("@tanstack/react-query",{useQuery:function(t){c=t}},2),o.link("react",{useMemo:function(t){l=t}},3),o.link("../../../components/dashboards/periods",{getPeriodRange:function(t){d=t}},4),o.link("../../../components/dashboards/usePeriodSelectorStorage",{usePeriodSelectorStorage:function(t){f=t}},5),o.link("../components/constants",{PERIOD_OPTIONS:function(t){g=t}},6),o.link("../utils/formatPeriodDescription",{formatPeriodDescription:function(t){p=t}},7),o.link("./useDefaultDownload",{useDefaultDownload:function(t){_=t}},8);var e,r,a,i,s,u,c,l,d,f,g,p,_,S={warning:i.statusColor["status-font-on-warning"].toString(),danger:i.statusColor["status-font-on-danger"].toString(),success:i.statusColor["status-font-on-success"].toString(),info:i.statusColor["status-font-on-info"].toString()},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.map(function(t){return a(a({},t),{},{color:S.info})})},m=function(){var t=u(),n=r(f("reports-tags-period",g),2),o=n[0],i=n[1],S=s("GET","/v1/livechat/analytics/dashboards/conversations-by-tags"),m=c(["omnichannel-reports","conversations-by-tags",o],function(){var t,n,r,i;return e.async(function(s){for(;;)switch(s.prev=s.next){case 0:return n=(t=d(o)).start,r=t.end,s.next=3,e.awrap(S({start:n.toISOString(),end:r.toISOString()}));case 3:return i=s.sent,s.abrupt("return",a(a({},i),{},{data:b(i.data)}));case 5:case"end":return s.stop()}},null,null,null,Promise)},{refetchInterval:3e5}),v=m.data,h=(v=void 0===v?{data:[],total:0}:v).data,k=v.total,y=void 0===k?0:k,P=v.unspecified,w=void 0===P?0:P,D=m.refetch,T=m.isLoading,E=m.isError,O=m.isSuccess,C=t("Conversations_by_tag"),I=t("__count__tags__and__count__conversations__period__",{count:h.length,conversations:y,period:p(o,t)})+" "+(w>0?"("+t("__count__without__tags__",{count:w})+")":""),x=t("Omnichannel_Reports_Tags_Empty_Subtitle"),R=_({columnName:t("Tags"),title:C,data:h,period:o});return l(function(){return{id:"conversations-by-tags",title:C,subtitle:I,emptyStateSubtitle:x,data:h,total:y,period:o,periodSelectorProps:i,downloadProps:R,isError:E,isLoading:T,isDataFound:O&&h.length>0,onRetry:D}},[C,I,x,h,y,E,T,O,i,o,R,D])}}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/reports/hooks/7ac24fa970194758ec7b30dc5ee554c3985bcd3d.map