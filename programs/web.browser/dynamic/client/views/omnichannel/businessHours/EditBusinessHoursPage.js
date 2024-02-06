function module(e,s,t){let n,u,a,l,r,o,i,c,m,p,d,h,k,E,H,b,f,B,y,g,S;let v=["departments"];t.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){u=e}},1),t.link("@rocket.chat/fuselage",{Button(e){a=e},ButtonGroup(e){l=e},Callout(e){r=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){o=e}},1),t.link("@rocket.chat/ui-contexts",{useToastMessageDispatch(e){i=e},useRoute(e){c=e},useMethod(e){m=e},useTranslation(e){p=e}},2),t.link("react",{default(e){d=e},useRef(e){h=e},useMemo(e){k=e},useState(e){E=e}},3),t.link("../../../components/Page",{default(e){H=e}},4),t.link("../../../components/PageSkeleton",{default(e){b=e}},5),t.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){f=e}},6),t.link("../../../hooks/useEndpointData",{useEndpointData(e){B=e}},7),t.link("./BusinessHoursFormContainer",{default(e){y=e}},8),t.link("./BusinessHoursRouter",{useIsSingleBusinessHours(e){g=e}},9),t.link("./mapBusinessHoursForm",{mapBusinessHoursForm(e){S=e}},10),t.exportDefault(e=>{let{id:s,type:t}=e,C=p(),D=i(),R=g(),{value:_,phase:w}=B("/v1/livechat/business-hour",{params:k(()=>({_id:s,type:t}),[s,t])}),A=h({form:{}}),[M,P]=E(!1),T=m("livechat:saveBusinessHour"),j=m("livechat:removeBusinessHour"),z=c("omnichannel-businessHours"),F=o(async()=>{if(w!==f.RESOLVED||!_.success)return;let{current:{form:e,multiple:{departments:s}={},timezone:{name:t}={}}}=A,a=u(A.current.multiple,v);if("default"!==_.businessHour.type&&""===a.name)return D({type:"error",message:C("error-the-field-is-required",{field:C("Name")})});let l=S(e,_.businessHour),r=(null==s?void 0:s.map(e=>e.value).join(","))||"";try{let e=n(n(n({},_.businessHour),a),{},{departmentsToApplyBusinessHour:null!=r?r:"",timezoneName:t||_.businessHour.timezone.name,workHours:l});await T(e),D({type:"success",message:C("Business_hours_updated")}),z.push({})}catch(e){D({type:"error",message:e})}}),L=o(async()=>{if("custom"===t)try{await j(s,t),D({type:"success",message:C("Business_Hour_Removed")}),z.push({})}catch(e){D({type:"error",message:e})}}),N=o(()=>{z.push({})});return w===f.LOADING?d.createElement(b,null):w===f.REJECTED||f.RESOLVED&&!_.businessHour?d.createElement(H,null,d.createElement(H.Header,{title:C("Business_Hours")},d.createElement(a,{onClick:N},C("Back"))),d.createElement(H.ScrollableContentWithShadow,null,d.createElement(r,{type:"danger"},C("Error")))):d.createElement(H,null,d.createElement(H.Header,{title:C("Business_Hours")},d.createElement(l,null,!R&&d.createElement(a,{onClick:N},C("Back")),"custom"===t&&d.createElement(a,{danger:!0,onClick:L},C("Delete")),d.createElement(a,{primary:!0,onClick:F,disabled:!M},C("Save")))),d.createElement(H.ScrollableContentWithShadow,null,d.createElement(y,{data:_.businessHour,saveRef:A,onChange:P})))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/businessHours/c47034db9bbc57973da1ea591a5dcff8e5363508.map