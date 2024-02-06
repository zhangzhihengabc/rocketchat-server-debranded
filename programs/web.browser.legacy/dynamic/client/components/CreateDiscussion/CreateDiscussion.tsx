function module(e,n,t){var r,l,a,i,o,u,c,s,m,d,f,E,p,h,b,g,_,v,k,y,F,C,R,D,x,q,w,B,I=["value"];t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){l=e}},1),t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},2),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},3),t.link("@rocket.chat/fuselage",{Modal:function(e){o=e},Field:function(e){u=e},FieldGroup:function(e){c=e},ToggleSwitch:function(e){s=e},TextInput:function(e){m=e},TextAreaInput:function(e){d=e},Button:function(e){f=e},Icon:function(e){E=e},Box:function(e){p=e},FieldHint:function(e){h=e},FieldLabel:function(e){b=e},FieldRow:function(e){g=e},FieldError:function(e){_=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){v=e}},1),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){k=e},useEndpoint:function(e){y=e}},2),t.link("@tanstack/react-query",{useMutation:function(e){F=e}},3),t.link("react",{default:function(e){C=e}},4),t.link("react-hook-form",{useForm:function(e){R=e},Controller:function(e){D=e}},5),t.link("../../lib/utils/goToRoomById",{goToRoomById:function(e){x=e}},6),t.link("../RoomAutoComplete",{default:function(e){q=e}},7),t.link("../UserAutoCompleteMultiple",{default:function(e){w=e}},8),t.link("./DefaultParentRoomField",{default:function(e){B=e}},9),t.exportDefault(function(e){var n=e.onClose,t=e.defaultParentRoom,S=e.parentMessageId,T=e.nameSuggestion,M=k(),P=R({mode:"onBlur",defaultValues:{name:T||"",parentRoom:"",encrypted:!1,usernames:[],firstMessage:""}}),U=P.formState,j=U.isDirty,A=U.isSubmitting,G=U.isValidating,H=U.errors,N=P.handleSubmit,V=P.control,z=(0,P.watch)().encrypted,L=F({mutationFn:y("POST","/v1/rooms.createDiscussion"),onSuccess:function(e){x(e.discussion._id),n()}}),O=function(e){var n,r,a,o,u;return l.async(function(l){for(;;)switch(l.prev=l.next){case 0:n=e.name,r=e.parentRoom,a=e.encrypted,o=e.usernames,u=e.firstMessage,L.mutate(i({prid:t||r,t_name:n,users:o,reply:a?void 0:u},S&&{pmid:S}));case 2:case"end":return l.stop()}},null,null,null,Promise)},W=v(),J=v(),K=v(),Q=v(),X=v();return C.createElement(o,{"data-qa":"create-discussion-modal",wrapperFunction:function(e){return C.createElement(p,a({is:"form",onSubmit:N(O)},e))}},C.createElement(o.Header,null,C.createElement(o.Title,null,M("Discussion_title")),C.createElement(o.Close,{tabIndex:-1,onClick:n})),C.createElement(o.Content,null,C.createElement(p,{mbe:24},M("Discussion_description")),C.createElement(c,null,C.createElement(u,null,C.createElement(b,{htmlFor:W,required:!0},M("Discussion_target_channel")),C.createElement(g,null,t&&C.createElement(D,{control:V,name:"parentRoom",render:function(){return C.createElement(B,{defaultParentRoom:t})}}),!t&&C.createElement(D,{control:V,name:"parentRoom",rules:{required:M("error-the-field-is-required",{field:M("Discussion_target_channel")})},render:function(e){var n=e.field,r=n.name,l=n.onBlur,a=n.onChange,i=n.value;return C.createElement(q,{name:r,onBlur:l,onChange:a,value:i,id:W,placeholder:M("Discussion_target_channel_description"),disabled:!!t,"aria-invalid":!!H.parentRoom,"aria-required":"true","aria-describedby":W+"-error"})}})),H.parentRoom&&C.createElement(_,{"aria-live":"assertive",id:W+"-error"},H.parentRoom.message)),C.createElement(u,null,C.createElement(p,{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},C.createElement(b,{htmlFor:J},M("Encrypted")),C.createElement(g,null,C.createElement(D,{control:V,name:"encrypted",render:function(e){var n=e.field,t=n.value,l=r(n,I);return C.createElement(s,a({id:J},l,{checked:t}))}})))),C.createElement(u,null,C.createElement(b,{htmlFor:K,required:!0},M("Discussion_name")),C.createElement(g,null,C.createElement(D,{name:"name",control:V,rules:{required:M("Field_required")},render:function(e){var n=e.field;return C.createElement(m,a({id:K},n,{placeholder:M("New_discussion_name"),"aria-invalid":!!H.name,"aria-required":"true","aria-describedby":K+"-error",addon:C.createElement(E,{name:"baloons",size:"x20"})}))}})),H.name&&C.createElement(_,{"aria-live":"assertive",id:K+"-error"},H.name.message)),C.createElement(u,null,C.createElement(b,{htmlFor:Q},M("Invite_Users")),C.createElement(g,null,C.createElement(D,{control:V,name:"usernames",render:function(e){var n=e.field,t=n.name,r=n.onChange,l=n.value,a=n.onBlur;return C.createElement(w,{id:Q,name:t,onChange:r,value:l,onBlur:a,placeholder:M("Username_Placeholder")})}}))),C.createElement(u,null,C.createElement(b,{htmlFor:X},M("Discussion_first_message_title")),C.createElement(g,null,C.createElement(D,{control:V,name:"firstMessage",render:function(e){var n=e.field;return C.createElement(d,a({id:X},n,{placeholder:M("New_discussion_first_message"),rows:5,disabled:z,"aria-describedby":X+"-hint"}))}})),z&&C.createElement(h,{id:X+"-hint"},M("Discussion_first_message_disabled_due_to_e2e"))))),C.createElement(o.Footer,null,C.createElement(o.FooterControllers,null,C.createElement(f,{onClick:n},M("Cancel")),C.createElement(f,{type:"submit",primary:!0,disabled:!j,loading:A||G},M("Create")))))})}
//# sourceMappingURL=/dynamic/client/components/CreateDiscussion/76544bbba5152b5633c95e3ccc515d033aa057f7.map