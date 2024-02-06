function module(e,a,t){let r,l,n,i,s,o,c,m,d,u,v,E,f,h,g,b,x,k,_,p,y,T,S,F,U,C,A,w,q,M,D,G,N,P;t.link("@babel/runtime/helpers/extends",{default(e){r=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},1),t.link("@rocket.chat/fuselage",{Field(e){n=e},FieldGroup(e){i=e},FieldLabel(e){s=e},FieldRow(e){o=e},FieldError(e){c=e},FieldHint(e){m=e},TextInput(e){d=e},TextAreaInput(e){u=e},Box(e){v=e},Icon(e){E=e},Button(e){f=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){h=e}},1),t.link("@rocket.chat/ui-client",{CustomFieldsForm(e){g=e}},2),t.link("@rocket.chat/ui-contexts",{useAccountsCustomFields(e){b=e},useToastMessageDispatch(e){x=e},useTranslation(e){k=e},useEndpoint(e){_=e},useUser(e){p=e},useMethod(e){y=e}},3),t.link("@tanstack/react-query",{useMutation(e){T=e}},4),t.link("react",{default(e){S=e},useCallback(e){F=e}},5),t.link("react-hook-form",{Controller(e){U=e},useFormContext(e){C=e}},6),t.link("../../../../lib/emailValidator",{validateEmail(e){A=e}},7),t.link("../../../../lib/getUserEmailAddress",{getUserEmailAddress(e){w=e}},8),t.link("../../../components/UserStatusMenu",{default(e){q=e}},9),t.link("../../../components/avatar/UserAvatarEditor",{default(e){M=e}},10),t.link("../../../hooks/useUpdateAvatar",{useUpdateAvatar(e){D=e}},11),t.link("../../../lib/constants",{USER_STATUS_TEXT_MAX_LENGTH(e){G=e},BIO_TEXT_MAX_LENGTH(e){N=e}},12),t.link("./useAccountProfileSettings",{useAccountProfileSettings(e){P=e}},13),t.exportDefault(e=>{var a,t,I,L;let j=k(),z=p(),B=x(),R=_("GET","/v1/users.checkUsernameAvailability"),X=_("POST","/v1/users.sendConfirmationEmail"),H=b(),{allowRealNameChange:O,allowUserStatusMessageChange:V,allowEmailChange:J,allowUserAvatarChange:K,canChangeUsername:Q,requireName:W,namesRegex:Y}=P(),{control:Z,watch:$,handleSubmit:ee,reset:ea,formState:{errors:et}}=C(),{email:er,avatar:el,username:en}=$(),ei=z?w(z):"",es=(null==z?void 0:z.username)||"",eo=null!==(a=null==z?void 0:null===(t=z.emails)||void 0===t?void 0:null===(I=t[0])||void 0===I?void 0:I.verified)&&void 0!==a&&a,ec=T({mutationFn:X,onSuccess:()=>B({type:"success",message:j("Verification_email_sent")}),onError:e=>B({type:"error",message:e})}),em=F(async()=>{er===ei&&ec.mutateAsync({email:er})},[er,ei,ec]),ed=async e=>{if(!e||e===es)return;if(!Y.test(e))return j("error-invalid-username");let{result:a}=await R({username:e});if(!a)return j("Username_already_exist")},eu=y("saveUserProfile"),ev=D(el,(null==z?void 0:z._id)||""),eE=async e=>{let{email:a,name:t,username:r,statusType:n,statusText:i,nickname:s,bio:o,customFields:c}=e;try{await eu(l(l({realname:t},z?w(z)!==a&&{email:a}:{}),{},{username:r,statusText:i,statusType:n,nickname:s,bio:o}),c),await ev(),B({type:"success",message:j("Profile_saved_successfully")})}catch(e){B({type:"error",message:e})}finally{ea({email:a,name:t,username:r,statusType:n,statusText:i,nickname:s,bio:o,customFields:c})}},ef=h(),eh=h(),eg=h(),eb=h(),ex=h(),ek=h();return S.createElement(v,r({},e,{is:"form",autoComplete:"off",onSubmit:ee(eE)}),S.createElement(i,null,S.createElement(n,null,S.createElement(U,{control:Z,name:"avatar",render:e=>{let{field:{onChange:a}}=e;return S.createElement(M,{etag:null==z?void 0:z.avatarETag,currentUsername:null==z?void 0:z.username,username:en,setAvatarObj:a,disabled:!K})}})),S.createElement(v,{display:"flex",flexDirection:"row",justifyContent:"space-between"},S.createElement(n,{mie:8,flexShrink:1},S.createElement(s,{required:!0,htmlFor:ef},j("Name")),S.createElement(o,null,S.createElement(U,{control:Z,name:"name",rules:{validate:e=>!W||""!==e||j("error-the-field-is-required",{field:j("Name")})},render:e=>{var a;let{field:t}=e;return S.createElement(d,r({},t,{id:ef,error:null===(a=et.name)||void 0===a?void 0:a.message,disabled:!O,"aria-required":"true","aria-invalid":et.username?"true":"false","aria-describedby":"".concat(ef,"-error ").concat(ef,"-hint")}))}})),et.name&&S.createElement(c,{"aria-live":"assertive",id:"".concat(ef,"-error")},et.name.message),!O&&S.createElement(m,{id:"".concat(ef,"-hint")},j("RealName_Change_Disabled"))),S.createElement(n,{mis:8,flexShrink:1},S.createElement(s,{required:!0,htmlFor:eh},j("Username")),S.createElement(o,null,S.createElement(U,{control:Z,name:"username",rules:{required:j("error-the-field-is-required",{field:j("Username")}),validate:e=>ed(e)},render:e=>{var a;let{field:t}=e;return S.createElement(d,r({},t,{id:eh,disabled:!Q,error:null===(a=et.username)||void 0===a?void 0:a.message,addon:S.createElement(E,{name:"at",size:"x20"}),"aria-required":"true","aria-invalid":et.username?"true":"false","aria-describedby":"".concat(eh,"-error ").concat(eh,"-hint")}))}})),(null==et?void 0:et.username)&&S.createElement(c,{"aria-live":"assertive",id:"".concat(eh,"-error")},et.username.message),!Q&&S.createElement(m,{id:"".concat(eh,"-hint")},j("Username_Change_Disabled")))),S.createElement(n,null,S.createElement(s,{htmlFor:eb},j("StatusMessage")),S.createElement(o,null,S.createElement(U,{control:Z,name:"statusText",rules:{maxLength:{value:G,message:j("Max_length_is",G)}},render:e=>{var a;let{field:t}=e;return S.createElement(d,r({},t,{id:eb,error:null==et?void 0:null===(a=et.statusText)||void 0===a?void 0:a.message,disabled:!V,flexGrow:1,placeholder:j("StatusMessage_Placeholder"),"aria-invalid":et.statusText?"true":"false","aria-describedby":"".concat(eb,"-error ").concat(eb,"-hint"),addon:S.createElement(U,{control:Z,name:"statusType",render:e=>{let{field:{value:a,onChange:t}}=e;return S.createElement(q,{margin:"neg-x2",onChange:t,initialStatus:a})}})}))}})),(null==et?void 0:et.statusText)&&S.createElement(c,{"aria-live":"assertive",id:"".concat(eb,"-error")},null==et?void 0:et.statusText.message),!V&&S.createElement(m,{id:"".concat(eb,"-hint")},j("StatusMessage_Change_Disabled"))),S.createElement(n,null,S.createElement(s,{htmlFor:eg},j("Nickname")),S.createElement(o,null,S.createElement(U,{control:Z,name:"nickname",render:e=>{let{field:a}=e;return S.createElement(d,r({},a,{id:eg,flexGrow:1,addon:S.createElement(E,{name:"edit",size:"x20",alignSelf:"center"})}))}}))),S.createElement(n,null,S.createElement(s,{htmlFor:ex},j("Bio")),S.createElement(o,null,S.createElement(U,{control:Z,name:"bio",rules:{maxLength:{value:N,message:j("Max_length_is",N)}},render:e=>{var a;let{field:t}=e;return S.createElement(u,r({},t,{id:ex,error:null===(a=et.bio)||void 0===a?void 0:a.message,rows:3,flexGrow:1,addon:S.createElement(E,{name:"edit",size:"x20",alignSelf:"center"}),"aria-invalid":et.statusText?"true":"false","aria-describedby":"".concat(ex,"-error")}))}})),(null==et?void 0:et.bio)&&S.createElement(c,{"aria-live":"assertive",id:"".concat(ex,"-error")},et.bio.message)),S.createElement(n,null,S.createElement(s,{required:!0,htmlFor:ek},j("Email")),S.createElement(o,{display:"flex",flexDirection:"row",justifyContent:"space-between"},S.createElement(U,{control:Z,name:"email",rules:{validate:{validateEmail:e=>A(e)?void 0:j("error-invalid-email-address")}},render:e=>{var a;let{field:t}=e;return S.createElement(d,r({},t,{id:ek,flexGrow:1,error:null===(a=et.email)||void 0===a?void 0:a.message,addon:S.createElement(E,{name:eo?"circle-check":"mail",size:"x20"}),disabled:!J,"aria-required":"true","aria-invalid":et.email?"true":"false","aria-describedby":"".concat(ek,"-error ").concat(ek,"-hint")}))}}),!eo&&S.createElement(f,{disabled:er!==ei,onClick:em,mis:24},j("Resend_verification_email"))),et.email&&S.createElement(c,{"aria-live":"assertive",id:"".concat(ek,"-error")},null==et?void 0:null===(L=et.email)||void 0===L?void 0:L.message),!J&&S.createElement(m,{id:"".concat(ek,"-hint")},j("Email_Change_Disabled"))),H&&S.createElement(g,{formName:"customFields",formControl:Z,metadata:H})))})}
//# sourceMappingURL=/dynamic/client/views/account/profile/67211dff49dcbc81ab6de1a54c1236a134c924aa.map