function module(e,t,n){let a,s,r,o,d,l,i,p,u,c,m,_,h,g;n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),n.link("@rocket.chat/ui-contexts",{useSetModal(e){s=e},useToastMessageDispatch(e){r=e},usePermission(e){o=e},useEndpoint(e){d=e},useTranslation(e){l=e}},0),n.link("react",{default(e){i=e},memo(e){p=e},useCallback(e){u=e},useEffect(e){c=e},useMemo(e){m=e},useState(e){_=e}},1),n.link("../../../../../../../client/hooks/useForm",{useForm(e){h=e}},2),n.link("./CreateCannedResponseModal",{default(e){g=e}},3),n.exportDefault(p(e=>{let{data:t,reloadCannedList:n}=e,p=l(),S=s(),v=r(),C=d("POST","/v1/canned-responses"),D=o("view-all-canned-responses"),b=o("save-department-canned-responses"),f=h({_id:t?t._id:"",shortcut:t?t.shortcut:"",text:t?t.text:"",tags:null!=t&&t.tags&&Array.isArray(t.tags)?t.tags.map(e=>({label:e,value:e})):[],scope:t?t.scope:"user",departmentId:null!=t&&t.departmentId?t.departmentId:""}),{values:k,handlers:I,hasUnsavedChanges:P}=f,[R,x]=_({}),[y,M]=_(p("Canned_Response_Sharing_Private_Description")),[w,F]=_(!1),E=m(()=>{let e={};for(let[t,n]of Object.entries(k))["shortcut","text"].includes(t)&&!n&&(e[t]=p("Field_required"));return"department"!==k.scope||k.departmentId||(e.departmentId=p("Field_required")),e},[p,k]);c(()=>{x(E)},[k.shortcut,k.text,k.departmentId,E]);let T=u(async()=>{try{let{_id:e,shortcut:t,text:s,scope:r,tags:o,departmentId:d}=k;await C(a(a({},e&&{_id:e}),{},{shortcut:t,text:s,scope:r,tags:o},d&&{departmentId:d})),v({type:"success",message:p(e?"Canned_Response_Updated":"Canned_Response_Created")}),S(null),null==n||n()}catch(e){v({type:"error",message:e})}},[k,C,v,p,S,n]);return i.createElement(g,{isManager:D,isMonitor:b,values:k,handlers:I,errors:R,hasUnsavedChanges:P,radioHandlers:{setPublic:()=>{I.handleScope("global"),I.handleDepartmentId(""),M(p("Canned_Response_Sharing_Public_Description"))},setDepartment:()=>{I.handleScope("department"),M(p("Canned_Response_Sharing_Department_Description"))},setPrivate:()=>{I.handleScope("user"),I.handleDepartmentId(""),M(p("Canned_Response_Sharing_Private_Description"))}},radioDescription:y,onClose:S,onSave:T,onPreview:()=>{F(!w)},previewState:w})}))}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/components/CannedResponse/modals/CreateCannedResponse/d4901636467ddc73859728ddf887bfca2db8e069.map