function module(e,t,a){let l,n,r,i,c,o,m,s,d,u,_,E,p,f,b,h,y,w,T,g,x,k,C,N,D,F,v,I;a.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),a.link("@rocket.chat/fuselage",{Box(e){n=e},Button(e){r=e},Field(e){i=e},Icon(e){c=e},Modal(e){o=e},TextInput(e){m=e},ToggleSwitch(e){s=e},FieldGroup(e){d=e},FieldLabel(e){u=e},FieldRow(e){_=e},FieldError(e){E=e},FieldDescription(e){p=e}},0),a.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){f=e}},1),a.link("@rocket.chat/ui-contexts",{useEndpoint(e){b=e},usePermission(e){h=e},usePermissionWithScopedRoles(e){y=e},useSetting(e){w=e},useToastMessageDispatch(e){T=e},useTranslation(e){g=e}},2),a.link("react",{default(e){x=e},memo(e){k=e},useEffect(e){C=e},useMemo(e){N=e}},3),a.link("react-hook-form",{Controller(e){D=e},useForm(e){F=e}},4),a.link("../../../components/UserAutoCompleteMultiple",{default(e){v=e}},5),a.link("../../../lib/utils/goToRoomById",{goToRoomById(e){I=e}},6),a.exportDefault(k(e=>{var t;let{onClose:a}=e,k=g(),P=w("E2E_Enable"),L=w("E2E_Enabled_Default_PrivateRooms"),R=w("UTF8_Channel_Names_Validation"),B=w("UI_Allow_room_names_with_special_chars"),S=T(),q=h("create-team"),O=y("set-readonly",["owner"]),j=b("GET","/v1/rooms.nameExists"),A=b("POST","/v1/teams.create"),M=N(()=>B?null:new RegExp("^".concat(R,"$")),[B,R]),U=async e=>{if(!e)return;if(M&&!(null!=M&&M.test(e)))return k("Teams_Errors_team_name",{name:e});let{exists:t}=await j({roomName:e});if(t)return k("Teams_Errors_Already_exists",{name:e})},{register:z,control:G,handleSubmit:V,setValue:H,watch:W,formState:{isDirty:$,errors:J,isSubmitting:K}}=F({defaultValues:{isPrivate:!0,readOnly:!1,encrypted:null!=L&&L,broadcast:!1,members:[]}}),{isPrivate:Q,broadcast:X,readOnly:Y}=W();C(()=>{Q||H("encrypted",!1),X&&H("encrypted",!1),H("readOnly",X)},[W,H,X,Q]);let Z=!X,ee=Q&&!X&&P&&!L,et=async e=>{let{name:t,members:l,isPrivate:n,readOnly:r,topic:i,broadcast:c,encrypted:o}=e;try{let{team:e}=await A({name:t,members:l,type:n?1:0,room:{readOnly:r,extraData:{topic:i,broadcast:c,encrypted:o}}});S({type:"success",message:k("Team_has_been_created")}),I(e.roomId)}catch(e){S({type:"error",message:e})}finally{a()}},ea=f(),el=f(),en=f(),er=f(),ei=f(),ec=f(),eo=f(),em=f();return x.createElement(o,{"aria-labelledby":"".concat(ea,"-title"),wrapperFunction:e=>x.createElement(n,l({is:"form",id:ea,onSubmit:V(et)},e))},x.createElement(o.Header,null,x.createElement(o.Title,{id:"".concat(ea,"-title")},k("Teams_New_Title")),x.createElement(o.Close,{title:k("Close"),onClick:a,tabIndex:-1})),x.createElement(o.Content,{mbe:2},x.createElement(d,null,x.createElement(i,null,x.createElement(u,{required:!0,htmlFor:el},k("Teams_New_Name_Label")),x.createElement(_,null,x.createElement(m,l({id:el,"aria-invalid":J.name?"true":"false"},z("name",{required:k("error-the-field-is-required",{field:k("Name")}),validate:e=>U(e)}),{placeholder:k("Team_Name"),addon:x.createElement(c,{size:"x20",name:Q?"team-lock":"team"}),error:null===(t=J.name)||void 0===t?void 0:t.message,"aria-describedby":"".concat(el,"-error"),"aria-required":"true"}))),(null==J?void 0:J.name)&&x.createElement(E,{"aria-live":"assertive",id:"".concat(el,"-error")},J.name.message)),x.createElement(i,null,x.createElement(u,{htmlFor:en},k("Teams_New_Description_Label")," ",x.createElement(n,{is:"span",color:"annotation"},"(",k("optional"),")")),x.createElement(_,null,x.createElement(m,l({id:en,"aria-describedby":"".concat(en,"-hint")},z("topic"),{placeholder:k("Teams_New_Description_Placeholder")})))),x.createElement(i,null,x.createElement(n,{display:"flex",justifyContent:"space-between",alignItems:"start"},x.createElement(n,{display:"flex",flexDirection:"column",width:"full"},x.createElement(u,{htmlFor:er},k("Teams_New_Private_Label")),x.createElement(p,{id:"".concat(er,"-hint")},Q?k("Teams_New_Private_Description_Enabled"):k("Teams_New_Private_Description_Disabled"))),x.createElement(D,{control:G,name:"isPrivate",render:e=>{let{field:{onChange:t,value:a,ref:l}}=e;return x.createElement(s,{id:er,"aria-describedby":"".concat(er,"-hint"),onChange:t,checked:a,ref:l})}}))),x.createElement(i,null,x.createElement(n,{display:"flex",justifyContent:"space-between",alignItems:"start"},x.createElement(n,{display:"flex",flexDirection:"column",width:"full"},x.createElement(u,{htmlFor:ei},k("Teams_New_Read_only_Label")),x.createElement(p,{id:"".concat(ei,"-hint")},Y?k("Only_authorized_users_can_write_new_messages"):k("Teams_New_Read_only_Description"))),x.createElement(D,{control:G,name:"readOnly",render:e=>{let{field:{onChange:t,value:a,ref:l}}=e;return x.createElement(s,{id:ei,"aria-describedby":"".concat(ei,"-hint"),disabled:!Z,onChange:t,checked:a,ref:l})}}))),x.createElement(i,null,x.createElement(n,{display:"flex",justifyContent:"space-between",alignItems:"start"},x.createElement(n,{display:"flex",flexDirection:"column",width:"full"},x.createElement(u,{htmlFor:ec},k("Teams_New_Encrypted_Label")),x.createElement(p,{id:"".concat(ec,"-hint")},Q?k("Teams_New_Encrypted_Description_Enabled"):k("Teams_New_Encrypted_Description_Disabled"))),x.createElement(D,{control:G,name:"encrypted",render:e=>{let{field:{onChange:t,value:a,ref:l}}=e;return x.createElement(s,{id:ec,disabled:!O||!ee,onChange:t,"aria-describedby":"".concat(ec,"-hint"),checked:a,ref:l})}}))),x.createElement(i,null,x.createElement(n,{display:"flex",justifyContent:"space-between",alignItems:"start"},x.createElement(n,{display:"flex",flexDirection:"column",width:"full"},x.createElement(u,{htmlFor:eo},k("Teams_New_Broadcast_Label")),x.createElement(p,{d:"".concat(eo,"-hint")},k("Teams_New_Broadcast_Description"))),x.createElement(D,{control:G,name:"broadcast",render:e=>{let{field:{onChange:t,value:a,ref:l}}=e;return x.createElement(s,{"aria-describedby":"".concat(eo,"-hint"),id:eo,onChange:t,checked:a,ref:l})}}))),x.createElement(i,null,x.createElement(u,{htmlFor:em},k("Teams_New_Add_members_Label")," ",x.createElement(n,{is:"span",color:"annotation"},"(",k("optional"),")")),x.createElement(D,{control:G,name:"members",render:e=>{let{field:{onChange:t,value:a}}=e;return x.createElement(v,{value:a,onChange:t})}})))),x.createElement(o.Footer,null,x.createElement(o.FooterControllers,null,x.createElement(r,{onClick:a},k("Cancel")),x.createElement(r,{disabled:!($&&q),loading:K,type:"submit",primary:!0},k("Create")))))}))}
//# sourceMappingURL=/dynamic/client/sidebar/header/CreateTeam/9d0a44046127a444763de67331153a76fc799562.map