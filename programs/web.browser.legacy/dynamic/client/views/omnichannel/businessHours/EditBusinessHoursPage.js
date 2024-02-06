function module(e,n,t){var s,u,r,a,o,i,l,c,m,f,p,d,k,h,b,E,v,H,y,B,g,S,x,C=["departments"];t.link("@babel/runtime/regenerator",{default:function(e){s=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){u=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},3),t.link("@rocket.chat/fuselage",{Button:function(e){o=e},ButtonGroup:function(e){i=e},Callout:function(e){l=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e}},1),t.link("@rocket.chat/ui-contexts",{useToastMessageDispatch:function(e){m=e},useRoute:function(e){f=e},useMethod:function(e){p=e},useTranslation:function(e){d=e}},2),t.link("react",{default:function(e){k=e},useRef:function(e){h=e},useMemo:function(e){b=e},useState:function(e){E=e}},3),t.link("../../../components/Page",{default:function(e){v=e}},4),t.link("../../../components/PageSkeleton",{default:function(e){H=e}},5),t.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){y=e}},6),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){B=e}},7),t.link("./BusinessHoursFormContainer",{default:function(e){g=e}},8),t.link("./BusinessHoursRouter",{useIsSingleBusinessHours:function(e){S=e}},9),t.link("./mapBusinessHoursForm",{mapBusinessHoursForm:function(e){x=e}},10),t.exportDefault(function(e){var n=e.id,t=e.type,D=d(),R=m(),w=S(),_=B("/v1/livechat/business-hour",{params:b(function(){return{_id:n,type:t}},[n,t])}),P=_.value,A=_.phase,T=h({form:{}}),M=a(E(!1),2),j=M[0],z=M[1],F=p("livechat:saveBusinessHour"),L=p("livechat:removeBusinessHour"),N=f("omnichannel-businessHours"),O=c(function(){var e,n,t,a,o,i,l,c,m,f;return s.async(function(p){for(;;)switch(p.prev=p.next){case 0:if(!(A!==y.RESOLVED||!P.success)){p.next=2;break}return p.abrupt("return");case 2:if(n=(e=T.current).form,a=(t=void 0===(t=e.multiple)?{}:t).departments,o=r(t,C),l=(i=void 0===(i=e.timezone)?{}:i).name,!("default"!==P.businessHour.type&&""===o.name)){p.next=9;break}return p.abrupt("return",R({type:"error",message:D("error-the-field-is-required",{field:D("Name")})}));case 9:return c=x(n,P.businessHour),m=(null==a?void 0:a.map(function(e){return e.value}).join(","))||"",p.prev=11,f=u(u(u({},P.businessHour),o),{},{departmentsToApplyBusinessHour:null!=m?m:"",timezoneName:l||P.businessHour.timezone.name,workHours:c}),p.next=15,s.awrap(F(f));case 15:R({type:"success",message:D("Business_hours_updated")}),N.push({}),p.next=22;break;case 19:p.prev=19,p.t0=p.catch(11),R({type:"error",message:p.t0});case 22:case"end":return p.stop()}},null,null,[[11,19]],Promise)}),W=c(function(){return s.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(!("custom"!==t)){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,s.awrap(L(n,t));case 5:R({type:"success",message:D("Business_Hour_Removed")}),N.push({}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),R({type:"error",message:e.t0});case 12:case"end":return e.stop()}},null,null,[[2,9]],Promise)}),G=c(function(){N.push({})});return A===y.LOADING?k.createElement(H,null):A===y.REJECTED||y.RESOLVED&&!P.businessHour?k.createElement(v,null,k.createElement(v.Header,{title:D("Business_Hours")},k.createElement(o,{onClick:G},D("Back"))),k.createElement(v.ScrollableContentWithShadow,null,k.createElement(l,{type:"danger"},D("Error")))):k.createElement(v,null,k.createElement(v.Header,{title:D("Business_Hours")},k.createElement(i,null,!w&&k.createElement(o,{onClick:G},D("Back")),"custom"===t&&k.createElement(o,{danger:!0,onClick:W},D("Delete")),k.createElement(o,{primary:!0,onClick:O,disabled:!j},D("Save")))),k.createElement(v.ScrollableContentWithShadow,null,k.createElement(g,{data:P.businessHour,saveRef:T,onChange:z})))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/businessHours/46e7fa7cbe2b3a078744bd96fad1c1b88b428731.map