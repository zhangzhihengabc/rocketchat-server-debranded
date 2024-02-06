function module(e,t,l){let n,r,a,o,c,i,m,d,s,u,E,f,h,p,y,b,x,w,_,k,C,g,R,v,F,D,P,j,M,S,T,G,A,O,I,N,B,q,H,V,z,W,L;let U=["hideSysMes"],J=["value"],K=["value"],Q=["value"],X=["value"],Y=["value"],Z=["value"],$=["value"],ee=["value"],et=["onChange"],el=["value"],en=["value"];l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectSpread2",{default(e){r=e}},1),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},2),l.link("@rocket.chat/core-typings",{isRoomFederated(e){o=e}},0),l.link("@rocket.chat/fuselage",{Field(e){c=e},FieldRow(e){i=e},FieldLabel(e){m=e},FieldHint(e){d=e},TextInput(e){s=e},PasswordInput(e){u=e},ToggleSwitch(e){E=e},MultiSelect(e){f=e},Accordion(e){h=e},Callout(e){p=e},NumberInput(e){y=e},FieldGroup(e){b=e},Button(e){x=e},ButtonGroup(e){w=e},Box(e){_=e},TextAreaInput(e){k=e}},1),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){C=e},useUniqueId(e){g=e}},2),l.link("@rocket.chat/ui-contexts",{useSetting(e){R=e},useTranslation(e){v=e},useToastMessageDispatch(e){F=e},useEndpoint(e){D=e}},3),l.link("react",{default(e){P=e},useMemo(e){j=e}},4),l.link("react-hook-form",{useForm(e){M=e},Controller(e){S=e}},5),l.link("../../../../../../app/lib/lib/MessageTypes",{MessageTypesValues(e){T=e}},6),l.link("../../../../../components/Contextualbar",{ContextualbarHeader(e){G=e},ContextualbarBack(e){A=e},ContextualbarTitle(e){O=e},ContextualbarClose(e){I=e},ContextualbarScrollableContent(e){N=e},ContextualbarFooter(e){B=e}},7),l.link("../../../../../components/RawText",{default(e){q=e}},8),l.link("../../../../../components/avatar/RoomAvatarEditor",{default(e){H=e}},9),l.link("../../../../../lib/getDirtyFields",{getDirtyFields(e){V=e}},10),l.link("../../../../hooks/roomActions/useDeleteRoom",{useDeleteRoom(e){z=e}},11),l.link("./useEditRoomInitialValues",{useEditRoomInitialValues(e){W=e}},12),l.link("./useEditRoomPermissions",{useEditRoomPermissions(e){L=e}},13),l.exportDefault(e=>{let{room:t,onClickClose:l,onClickBack:er}=e,ea=v(),eo=F(),ec=j(()=>o(t),[t]),ei=R("RetentionPolicy_Enabled"),{handleDelete:em,canDeleteRoom:ed}=z(t),es=W(t),{watch:eu,reset:eE,control:ef,handleSubmit:eh,formState:{isDirty:ep,dirtyFields:ey,errors:eb,isSubmitting:ex}}=M({mode:"onBlur",defaultValues:es}),ew=j(()=>T.map(e=>{let{key:t,i18nLabel:l}=e;return[t,ea(l)]}),[ea]),{readOnly:e_,archived:ek,joinCodeRequired:eC,hideSysMes:eg,retentionEnabled:eR,retentionMaxAge:ev,retentionOverrideGlobal:eF}=eu(),{canChangeType:eD,canSetReadOnly:eP,canSetReactWhenReadOnly:ej,canEditRoomRetentionPolicy:eM,canArchiveOrUnarchive:eS,canToggleEncryption:eT,canViewName:eG,canViewTopic:eA,canViewAnnouncement:eO,canViewArchived:eI,canViewDescription:eN,canViewType:eB,canViewReadOnly:eq,canViewHideSysMes:eH,canViewJoinCode:eV,canViewEncrypted:ez}=L(t),eW=!!t.archived!==ek,eL=D("POST","/v1/rooms.saveRoomSettings"),eU=D("POST","/v1/rooms.changeArchivationState"),eJ=C(async e=>{let{hideSysMes:n}=e,o=a(e,U),c=V(o,ey);delete c.archived;try{await eL(r(r(r({rid:t._id},c),c.joinCode&&{joinCode:eC?c.joinCode:""}),(c.systemMessages||!n)&&{systemMessages:n&&c.systemMessages})),eo({type:"success",message:ea("Room_updated_successfully")}),l()}catch(e){eo({type:"error",message:e})}}),eK=C(async()=>{try{await eU({rid:t._id,action:t.archived?"unarchive":"archive"}),eo({type:"success",message:t.archived?ea("Room_has_been_unarchived"):ea("Room_has_been_archived")})}catch(e){eo({type:"error",message:e})}}),eQ=C(async e=>{await Promise.all([ep&&eJ(e),eW&&eK()].filter(Boolean))}),eX=g(),eY=g(),eZ=g(),e$=g(),e1=g(),e0=g(),e2=g(),e4=g(),e3=g(),e8=g(),e5=g(),e6=g(),e7=g(),e9=g(),te=g(),tt=g(),tl=g();return P.createElement(P.Fragment,null,P.createElement(G,null,er&&P.createElement(A,{onClick:er}),P.createElement(O,null,t.teamId?ea("edit-team"):ea("edit-room")),l&&P.createElement(I,{onClick:l})),P.createElement(N,{p:24},P.createElement("form",{id:eX,onSubmit:eh(eQ)},P.createElement(_,{display:"flex",justifyContent:"center"},P.createElement(S,{control:ef,name:"roomAvatar",render:e=>{let{field:{onChange:l,value:n}}=e;return P.createElement(H,{room:t,roomAvatar:n,onChangeAvatar:l})}})),P.createElement(b,null,P.createElement(c,null,P.createElement(m,{htmlFor:eY,required:!0},ea("Name")),P.createElement(i,null,P.createElement(S,{name:"roomName",control:ef,rules:{required:ea("error-the-field-is-required",{field:ea("Name")})},render:e=>{let{field:t}=e;return P.createElement(s,n({id:eY},t,{disabled:!eG}))}})),eb.roomName&&P.createElement(c.Error,null,eb.roomName.message)),eN&&P.createElement(c,null,P.createElement(m,{htmlFor:eZ},ea("Description")),P.createElement(i,null,P.createElement(S,{name:"roomDescription",control:ef,render:e=>{let{field:t}=e;return P.createElement(k,n({id:eZ},t,{disabled:ec,rows:4}))}}))),eO&&P.createElement(c,null,P.createElement(m,{htmlFor:e$},ea("Announcement")),P.createElement(i,null,P.createElement(S,{name:"roomAnnouncement",control:ef,render:e=>{let{field:t}=e;return P.createElement(k,n({id:e$},t,{disabled:ec,rows:4}))}}))),eA&&P.createElement(c,null,P.createElement(m,{htmlFor:e1},ea("Topic")),P.createElement(i,null,P.createElement(S,{name:"roomTopic",control:ef,render:e=>{let{field:t}=e;return P.createElement(k,n({id:e1},t,{rows:4}))}}))),eB&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e0},ea("Private")),P.createElement(i,null,P.createElement(S,{control:ef,name:"roomType",render:e=>{let{field:{name:t,onBlur:l,onChange:n,value:r,ref:a}}=e;return P.createElement(E,{id:e0,ref:a,name:t,onBlur:l,disabled:!eD||ec,checked:"p"===r,onChange:()=>n("p"===r?"c":"p"),"aria-describedby":"".concat(e0,"-hint")})}}))),P.createElement(d,{id:"".concat(e0,"-hint")},ea("Teams_New_Private_Description_Enabled"))),eq&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e2},ea("Read_only")),P.createElement(i,null,P.createElement(S,{control:ef,name:"readOnly",render:e=>{let{field:{value:t}}=e,l=a(e.field,J);return P.createElement(E,n({id:e2},l,{checked:t,disabled:!eP||ec,"aria-describedby":"".concat(e2,"-hint")}))}}))),P.createElement(d,{id:"".concat(e2,"-hint")},ea("Only_authorized_users_can_write_new_messages"))),e_&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e4},ea("React_when_read_only")),P.createElement(i,null,P.createElement(S,{control:ef,name:"reactWhenReadOnly",render:e=>{let{field:{value:t}}=e,l=a(e.field,K);return P.createElement(E,n({id:e4},l,{disabled:!ej,checked:t,"aria-describedby":"".concat(e4,"-hint")}))}}))),P.createElement(d,{id:"".concat(e4,"-hint")},ea("Only_authorized_users_can_react_to_messages"))),eI&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e3},ea("Room_archivation_state_true")),P.createElement(i,null,P.createElement(S,{control:ef,name:"archived",render:e=>{let{field:{value:t}}=e,l=a(e.field,Q);return P.createElement(E,n({id:e3},l,{disabled:!eS,checked:t}))}})))),eV&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e8},ea("Password_to_access")),P.createElement(i,null,P.createElement(S,{control:ef,name:"joinCodeRequired",render:e=>{let{field:{value:t}}=e,l=a(e.field,X);return P.createElement(E,n({id:e8},l,{disabled:ec,checked:t}))}}))),P.createElement(i,null,P.createElement(S,{name:"joinCode",control:ef,render:e=>{let{field:t}=e;return P.createElement(u,n({},t,{placeholder:ea("Reset_password"),disabled:!eC}))}}))),eH&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e5},ea("Hide_System_Messages")),P.createElement(i,null,P.createElement(S,{control:ef,name:"hideSysMes",render:e=>{let{field:{value:t}}=e,l=a(e.field,Y);return P.createElement(E,n({id:e5},l,{checked:t,disabled:ec}))}}))),P.createElement(i,null,P.createElement(S,{control:ef,name:"systemMessages",render:e=>{let{field:t}=e;return P.createElement(f,n({},t,{options:ew,disabled:!eg||ec,placeholder:ea("Select_an_option")}))}}))),ez&&P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e6},ea("Encrypted")),P.createElement(i,null,P.createElement(S,{control:ef,name:"encrypted",render:e=>{let{field:{value:t}}=e,l=a(e.field,Z);return P.createElement(E,n({id:e6},l,{disabled:!eT||ec,checked:t}))}}))))),ei&&P.createElement(h,null,P.createElement(h.Item,{title:ea("Prune")},P.createElement(b,null,P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e7},ea("RetentionPolicyRoom_Enabled")),P.createElement(i,null,P.createElement(S,{control:ef,name:"retentionEnabled",render:e=>{let{field:{value:t}}=e,l=a(e.field,$);return P.createElement(E,n({id:e7},l,{checked:t}))}})))),P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:e9},ea("RetentionPolicyRoom_OverrideGlobal")),P.createElement(i,null,P.createElement(S,{control:ef,name:"retentionOverrideGlobal",render:e=>{let{field:{value:t}}=e,l=a(e.field,ee);return P.createElement(E,n({id:e9},l,{disabled:!eR||!eM,checked:t}))}})))),eF&&P.createElement(P.Fragment,null,P.createElement(p,{type:"danger"},P.createElement(q,null,ea("RetentionPolicyRoom_ReadTheDocs"))),P.createElement(c,null,P.createElement(m,{htmlFor:te},ea("RetentionPolicyRoom_MaxAge",{max:ev})),P.createElement(i,null,P.createElement(S,{control:ef,name:"retentionMaxAge",render:e=>{let{field:{onChange:t}}=e,l=a(e.field,et);return P.createElement(y,n({id:te},l,{onChange:e=>t(Math.max(1,Number(e)))}))}}))),P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:tt},ea("RetentionPolicyRoom_ExcludePinned")),P.createElement(i,null,P.createElement(S,{control:ef,name:"retentionExcludePinned",render:e=>{let{field:{value:t}}=e,l=a(e.field,el);return P.createElement(E,n({id:tt},l,{checked:t}))}})))),P.createElement(c,null,P.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"space-between",flexGrow:1},P.createElement(m,{htmlFor:tl},ea("RetentionPolicyRoom_FilesOnly")),P.createElement(i,null,P.createElement(S,{control:ef,name:"retentionFilesOnly",render:e=>{let{field:{value:t}}=e,l=a(e.field,en);return P.createElement(E,n({id:tl},l,{checked:t}))}})))))))))),P.createElement(B,null,P.createElement(w,{stretch:!0},P.createElement(x,{type:"reset",disabled:!ep||ex,onClick:()=>eE(es)},ea("Reset")),P.createElement(x,{form:eX,type:"submit",loading:ex,disabled:!ep},ea("Save"))),P.createElement(w,{stretch:!0,mbs:8},P.createElement(x,{icon:"trash",danger:!0,disabled:!ed||ec||ex,onClick:em},ea("Delete")))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Info/EditRoomInfo/f8a59e5a6a4a21f0b5946477498f86f89b65e361.map