function module(e,t,l){let n,a,r,s,u,o,c,i,m,d,p,f,E,y,h,k,b,C,S,_,v,g,T,x;l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},1),l.link("@rocket.chat/fuselage",{FieldGroup(e){r=e},Button(e){s=e},ButtonGroup(e){u=e},TextInput(e){o=e},Field(e){c=e},FieldLabel(e){i=e},FieldRow(e){m=e},FieldError(e){d=e},Select(e){p=e}},0),l.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){f=e}},1),l.link("@rocket.chat/ui-contexts",{useSetModal(e){E=e},useRoute(e){y=e},useToastMessageDispatch(e){h=e},useTranslation(e){k=e},useEndpoint(e){b=e}},2),l.link("react",{default(e){C=e},useCallback(e){S=e}},3),l.link("react-hook-form",{useForm(e){_=e},Controller(e){v=e}},4),l.link("../../../components/Contextualbar",{ContextualbarScrollableContent(e){g=e},ContextualbarFooter(e){T=e}},5),l.link("../../../components/GenericModal",{default(e){x=e}},6),l.exportDefault(e=>{var t,l;let{onClose:F,onReload:D,status:U}=e,q=k(),{_id:w,name:P,statusType:B}=U||{},O=E(),G=y("user-status"),I=h(),M=f(),{register:N,control:R,handleSubmit:j,formState:{isDirty:A,errors:H}}=_({defaultValues:{name:null!==(t=null==U?void 0:U.name)&&void 0!==t?t:"",statusType:null!==(l=null==U?void 0:U.statusType)&&void 0!==l?l:""}}),L=b("POST",w?"/v1/custom-user-status.update":"/v1/custom-user-status.create"),V=b("POST","/v1/custom-user-status.delete"),W=S(async e=>{try{await L(a({_id:w,name:P,statusType:B},e)),I({type:"success",message:q("Custom_User_Status_Updated_Successfully")}),D(),G.push({})}catch(e){I({type:"error",message:e})}},[L,w,P,B,G,I,q,D]),z=S(()=>{let e=()=>{O(null)},t=async()=>{try{await V({customUserStatusId:w||""}),I({type:"success",message:q("Custom_User_Status_Has_Been_Deleted")}),D(),G.push({})}catch(e){I({type:"error",message:e})}finally{O(null)}};O(()=>C.createElement(x,{variant:"danger",onConfirm:t,onCancel:e,onClose:e,confirmText:q("Delete")},q("Custom_User_Status_Delete_Warning")))},[w,G,V,I,D,O,q]),J=[["online",q("Online")],["busy",q("Busy")],["away",q("Away")],["offline",q("Offline")]];return C.createElement(C.Fragment,null,C.createElement(g,null,C.createElement(r,{id:M,is:"form",onSubmit:j(W)},C.createElement(c,null,C.createElement(i,null,q("Name")),C.createElement(m,null,C.createElement(o,n({},N("name",{required:!0}),{placeholder:q("Name")}))),(null==H?void 0:H.name)&&C.createElement(d,null,q("error-the-field-is-required",{field:q("Name")}))),C.createElement(c,null,C.createElement(i,null,q("Presence")),C.createElement(m,null,C.createElement(v,{name:"statusType",control:R,rules:{required:!0},render:e=>{let{field:t}=e;return C.createElement(p,n({},t,{placeholder:q("Presence"),options:J}))}})),(null==H?void 0:H.statusType)&&C.createElement(d,null,q("error-the-field-is-required",{field:q("Presence")}))))),C.createElement(T,null,C.createElement(u,{stretch:!0},C.createElement(s,{onClick:F},q("Cancel")),C.createElement(s,{form:M,primary:!0,type:"submit",disabled:!A},q("Save"))),w&&C.createElement(u,{mbs:8,stretch:!0},C.createElement(s,{icon:"trash",danger:!0,onClick:z},q("Delete")))))})}
//# sourceMappingURL=/dynamic/client/views/admin/customUserStatus/901fe5b6cc4e96afe2638084dd9712b863f4c441.map