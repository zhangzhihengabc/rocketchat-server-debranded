function module(e,t,n){var r,a,l,i,o,c,s,m,u,d,f,_,E,p,b,h,y,v,w,g,x,T,C,k,D,N,F,P,I;n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),n.link("@babel/runtime/regenerator",{default:function(e){a=e}},1),n.link("@rocket.chat/fuselage",{Box:function(e){l=e},Button:function(e){i=e},Field:function(e){o=e},Icon:function(e){c=e},Modal:function(e){s=e},TextInput:function(e){m=e},ToggleSwitch:function(e){u=e},FieldGroup:function(e){d=e},FieldLabel:function(e){f=e},FieldRow:function(e){_=e},FieldError:function(e){E=e},FieldDescription:function(e){p=e}},0),n.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){b=e}},1),n.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){h=e},usePermission:function(e){y=e},usePermissionWithScopedRoles:function(e){v=e},useSetting:function(e){w=e},useToastMessageDispatch:function(e){g=e},useTranslation:function(e){x=e}},2),n.link("react",{default:function(e){T=e},memo:function(e){C=e},useEffect:function(e){k=e},useMemo:function(e){D=e}},3),n.link("react-hook-form",{Controller:function(e){N=e},useForm:function(e){F=e}},4),n.link("../../../components/UserAutoCompleteMultiple",{default:function(e){P=e}},5),n.link("../../../lib/utils/goToRoomById",{goToRoomById:function(e){I=e}},6),n.exportDefault(C(function(e){var t,n=e.onClose,C=x(),L=w("E2E_Enable"),O=w("E2E_Enabled_Default_PrivateRooms"),R=w("UTF8_Channel_Names_Validation"),S=w("UI_Allow_room_names_with_special_chars"),B=g(),q=y("create-team"),j=v("set-readonly",["owner"]),A=h("GET","/v1/rooms.nameExists"),M=h("POST","/v1/teams.create"),U=D(function(){return S?null:RegExp("^"+R+"$")},[S,R]),V=F({defaultValues:{isPrivate:!0,readOnly:!1,encrypted:null!=O&&O,broadcast:!1,members:[]}}),z=V.register,G=V.control,H=V.handleSubmit,W=V.setValue,$=V.watch,J=V.formState,K=J.isDirty,Q=J.errors,X=J.isSubmitting,Y=$(),Z=Y.isPrivate,ee=Y.broadcast,et=Y.readOnly;k(function(){Z||W("encrypted",!1),ee&&W("encrypted",!1),W("readOnly",ee)},[$,W,ee,Z]);var en=!ee,er=Z&&!ee&&L&&!O,ea=function(e){var t,r,l,i,o,c;return a.async(function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.name,r=e.members,l=e.isPrivate,i=e.readOnly,o={name:t,members:r,type:l?1:0,room:{readOnly:i,extraData:{topic:e.topic,broadcast:e.broadcast,encrypted:e.encrypted}}},s.prev=2,s.next=5,a.awrap(M(o));case 5:c=s.sent.team,B({type:"success",message:C("Team_has_been_created")}),I(c.roomId),s.next=14;break;case 11:s.prev=11,s.t0=s.catch(2),B({type:"error",message:s.t0});case 14:return s.prev=14,n(),s.finish(14);case 17:case"end":return s.stop()}},null,null,[[2,11,14,17]],Promise)},el=b(),ei=b(),eo=b(),ec=b(),es=b(),em=b(),eu=b(),ed=b();return T.createElement(s,{"aria-labelledby":el+"-title",wrapperFunction:function(e){return T.createElement(l,r({is:"form",id:el,onSubmit:H(ea)},e))}},T.createElement(s.Header,null,T.createElement(s.Title,{id:el+"-title"},C("Teams_New_Title")),T.createElement(s.Close,{title:C("Close"),onClick:n,tabIndex:-1})),T.createElement(s.Content,{mbe:2},T.createElement(d,null,T.createElement(o,null,T.createElement(f,{required:!0,htmlFor:ei},C("Teams_New_Name_Label")),T.createElement(_,null,T.createElement(m,r({id:ei,"aria-invalid":Q.name?"true":"false"},z("name",{required:C("error-the-field-is-required",{field:C("Name")}),validate:function(e){var t;return a.async(function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:if(!(U&&!(null!=U&&U.test(e)))){t.next=4;break}return t.abrupt("return",C("Teams_Errors_team_name",{name:e}));case 4:return t.next=6,a.awrap(A({roomName:e}));case 6:if(!t.sent.exists){t.next=10;break}return t.abrupt("return",C("Teams_Errors_Already_exists",{name:e}));case 10:case"end":return t.stop()}},null,null,null,Promise)}}),{placeholder:C("Team_Name"),addon:T.createElement(c,{size:"x20",name:Z?"team-lock":"team"}),error:null===(t=Q.name)||void 0===t?void 0:t.message,"aria-describedby":ei+"-error","aria-required":"true"}))),(null==Q?void 0:Q.name)&&T.createElement(E,{"aria-live":"assertive",id:ei+"-error"},Q.name.message)),T.createElement(o,null,T.createElement(f,{htmlFor:eo},C("Teams_New_Description_Label")," ",T.createElement(l,{is:"span",color:"annotation"},"(",C("optional"),")")),T.createElement(_,null,T.createElement(m,r({id:eo,"aria-describedby":eo+"-hint"},z("topic"),{placeholder:C("Teams_New_Description_Placeholder")})))),T.createElement(o,null,T.createElement(l,{display:"flex",justifyContent:"space-between",alignItems:"start"},T.createElement(l,{display:"flex",flexDirection:"column",width:"full"},T.createElement(f,{htmlFor:ec},C("Teams_New_Private_Label")),T.createElement(p,{id:ec+"-hint"},Z?C("Teams_New_Private_Description_Enabled"):C("Teams_New_Private_Description_Disabled"))),T.createElement(N,{control:G,name:"isPrivate",render:function(e){var t=e.field,n=t.onChange,r=t.value,a=t.ref;return T.createElement(u,{id:ec,"aria-describedby":ec+"-hint",onChange:n,checked:r,ref:a})}}))),T.createElement(o,null,T.createElement(l,{display:"flex",justifyContent:"space-between",alignItems:"start"},T.createElement(l,{display:"flex",flexDirection:"column",width:"full"},T.createElement(f,{htmlFor:es},C("Teams_New_Read_only_Label")),T.createElement(p,{id:es+"-hint"},et?C("Only_authorized_users_can_write_new_messages"):C("Teams_New_Read_only_Description"))),T.createElement(N,{control:G,name:"readOnly",render:function(e){var t=e.field,n=t.onChange,r=t.value,a=t.ref;return T.createElement(u,{id:es,"aria-describedby":es+"-hint",disabled:!en,onChange:n,checked:r,ref:a})}}))),T.createElement(o,null,T.createElement(l,{display:"flex",justifyContent:"space-between",alignItems:"start"},T.createElement(l,{display:"flex",flexDirection:"column",width:"full"},T.createElement(f,{htmlFor:em},C("Teams_New_Encrypted_Label")),T.createElement(p,{id:em+"-hint"},Z?C("Teams_New_Encrypted_Description_Enabled"):C("Teams_New_Encrypted_Description_Disabled"))),T.createElement(N,{control:G,name:"encrypted",render:function(e){var t=e.field,n=t.onChange,r=t.value,a=t.ref;return T.createElement(u,{id:em,disabled:!j||!er,onChange:n,"aria-describedby":em+"-hint",checked:r,ref:a})}}))),T.createElement(o,null,T.createElement(l,{display:"flex",justifyContent:"space-between",alignItems:"start"},T.createElement(l,{display:"flex",flexDirection:"column",width:"full"},T.createElement(f,{htmlFor:eu},C("Teams_New_Broadcast_Label")),T.createElement(p,{d:eu+"-hint"},C("Teams_New_Broadcast_Description"))),T.createElement(N,{control:G,name:"broadcast",render:function(e){var t=e.field,n=t.onChange,r=t.value,a=t.ref;return T.createElement(u,{"aria-describedby":eu+"-hint",id:eu,onChange:n,checked:r,ref:a})}}))),T.createElement(o,null,T.createElement(f,{htmlFor:ed},C("Teams_New_Add_members_Label")," ",T.createElement(l,{is:"span",color:"annotation"},"(",C("optional"),")")),T.createElement(N,{control:G,name:"members",render:function(e){var t=e.field,n=t.onChange,r=t.value;return T.createElement(P,{value:r,onChange:n})}})))),T.createElement(s.Footer,null,T.createElement(s.FooterControllers,null,T.createElement(i,{onClick:n},C("Cancel")),T.createElement(i,{disabled:!(K&&q),loading:X,type:"submit",primary:!0},C("Create")))))}))}
//# sourceMappingURL=/dynamic/client/sidebar/header/CreateTeam/060bd3705b5d6e5dc5aefacd2955f3d1c67a373d.map