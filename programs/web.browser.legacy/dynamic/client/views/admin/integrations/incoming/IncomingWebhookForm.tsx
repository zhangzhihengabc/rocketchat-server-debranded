function module(e,n,t){var l,r,a,i,o,c,u,d,m,s,_,E,h,f,v,p,b,g,y,k,x,S,C,w,F,j,I,T,D,q=["value"],L=["value"],A=["value"];t.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},1),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},2),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},3),t.link("@rocket.chat/fuselage",{FieldError:function(e){o=e},IconButton:function(e){c=e},Accordion:function(e){u=e},AccordionItem:function(e){d=e},Field:function(e){m=e},TextInput:function(e){s=e},Box:function(e){_=e},ToggleSwitch:function(e){E=e},Icon:function(e){h=e},TextAreaInput:function(e){f=e},FieldGroup:function(e){v=e},Select:function(e){p=e},FieldLabel:function(e){b=e},FieldRow:function(e){g=e},FieldHint:function(e){y=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){k=e}},1),t.link("@rocket.chat/ui-contexts",{useAbsoluteUrl:function(e){x=e},useTranslation:function(e){S=e}},2),t.link("react",{default:function(e){C=e},useMemo:function(e){w=e}},3),t.link("react-hook-form",{Controller:function(e){F=e},useFormContext:function(e){j=e}},4),t.link("../../../../hooks/useClipboardWithToast",{default:function(e){I=e}},5),t.link("../../../../hooks/useHighlightedCode",{useHighlightedCode:function(e){T=e}},6),t.link("../hooks/useExampleIncomingData",{useExampleData:function(e){D=e}},7),t.exportDefault(function(e){var n=e.webhookData,t=S(),H=x(),W=j(),z=W.control,O=W.watch,R=W.formState.errors,U=O(),B=U.alias,G=U.emoji,M=U.avatar,P=H("hooks/"+(null==n?void 0:n._id)+"/"+(null==n?void 0:n.token)),N=a(D({additionalFields:w(function(){return i(i(i({},B&&{alias:B}),G&&{emoji:G}),M&&{avatar:M})},[B,M,G]),url:P}),2),Y=N[0],J=N[1],K=I(P).copy,Q=I((null==n?void 0:n._id)+"/"+(null==n?void 0:n.token)).copy,V=I(J).copy,X=w(function(){return[["vm2",t("Script_Engine_vm2")],["isolated-vm",t("Script_Engine_isolated_vm")]]},[t]),Z=T("json",JSON.stringify(Y,null,2)),$=k(),ee=k(),en=k(),et=k(),el=k(),er=k(),ea=k(),ei=k(),eo=k(),ec=k(),eu=k(),ed=k(),em=k(),es=k();return C.createElement(_,{maxWidth:"x600",alignSelf:"center",w:"full"},C.createElement(u,null,C.createElement(d,{defaultExpanded:!!(null==n?void 0:n._id),title:t("Instructions")},C.createElement(v,null,C.createElement(m,null,C.createElement(b,{htmlFor:ed},t("Webhook_URL")),C.createElement(g,null,C.createElement(s,{id:ed,value:null!=n&&n._id?P:t("Will_be_available_here_after_saving"),readOnly:!0,addon:null!=n&&n._id?C.createElement(c,{mini:!0,onClick:function(){return K()},title:t("Copy"),icon:"copy"}):void 0,"aria-describedby":ed+"-hint"})),C.createElement(y,{id:ed+"-hint"},t("Send_your_JSON_payloads_to_this_URL"))),C.createElement(m,null,C.createElement(b,{htmlFor:em},t("Token")),C.createElement(g,null,C.createElement(s,{id:em,value:null!=n&&n._id?(null==n?void 0:n._id)+"/"+(null==n?void 0:n.token):t("Will_be_available_here_after_saving"),readOnly:!0,addon:null!=n&&n._id?C.createElement(c,{mini:!0,onClick:function(){return Q()},title:t("Copy"),icon:"copy"}):void 0}))),C.createElement(m,null,C.createElement(b,null,t("Example_payload")),C.createElement(g,null,C.createElement(_,{fontScale:"p2",withRichContent:!0,flexGrow:1},C.createElement("pre",null,C.createElement("code",{dangerouslySetInnerHTML:{__html:Z}}))))),(null==n?void 0:n._id)&&C.createElement(m,null,C.createElement(b,{htmlFor:es},"Curl"),C.createElement(g,null,C.createElement(s,{id:es,value:J,readOnly:!0,addon:null!=n&&n._id?C.createElement(c,{mini:!0,onClick:function(){return V()},title:t("Copy"),icon:"copy"}):void 0}))))),C.createElement(d,{title:t("Settings"),defaultExpanded:!0},C.createElement(v,null,C.createElement(m,null,C.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},C.createElement(b,{htmlFor:$},t("Enabled")),C.createElement(g,null,C.createElement(F,{name:"enabled",control:z,render:function(e){var n=e.field,t=n.value,a=r(n,q);return C.createElement(E,l({id:$},a,{checked:t}))}})))),C.createElement(m,null,C.createElement(b,{htmlFor:ee},t("Name")),C.createElement(g,null,C.createElement(F,{name:"name",control:z,render:function(e){var n=e.field;return C.createElement(s,l({id:ee},n,{"aria-describedby":ee+"-hint"}))}})),C.createElement(y,{id:ee+"-hint"},t("You_should_name_it_to_easily_manage_your_integrations"))),C.createElement(m,null,C.createElement(b,{htmlFor:en,required:!0},t("Post_to_Channel")),C.createElement(g,null,C.createElement(F,{name:"channel",control:z,rules:{required:t("The_field_is_required",t("Post_to_Channel"))},render:function(e){var n=e.field;return C.createElement(s,l({id:en},n,{addon:C.createElement(h,{name:"at",size:"x20"}),"aria-describedby":en+"-hint-1 "+en+"-hint-2 "+en+"-error","aria-required":!0,"aria-invalid":!!(null==R?void 0:R.channel)}))}})),C.createElement(y,{id:en+"-hint-1"},t("Messages_that_are_sent_to_the_Incoming_WebHook_will_be_posted_here")),C.createElement(y,{id:en+"-hint-2",dangerouslySetInnerHTML:{__html:t("Start_with_s_for_user_or_s_for_channel_Eg_s_or_s","@","#","@john","#general")}}),(null==R?void 0:R.channel)&&C.createElement(o,{"aria-live":"assertive",id:en+"-error"},null==R?void 0:R.channel.message)),C.createElement(m,null,C.createElement(b,{htmlFor:et,required:!0},t("Post_as")),C.createElement(g,null,C.createElement(F,{name:"username",control:z,rules:{required:t("The_field_is_required",t("Post_to_Channel"))},render:function(e){var n=e.field;return C.createElement(s,l({id:et},n,{addon:C.createElement(h,{name:"user",size:"x20"}),"aria-describedby":et+"-hint-1 "+et+"-hint-2 "+et+"-error","aria-required":!0,"aria-invalid":!!(null==R?void 0:R.username)}))}})),C.createElement(y,{id:et+"-hint-1"},t("Choose_the_username_that_this_integration_will_post_as")),C.createElement(y,{id:et+"-hint-2"},t("Should_exists_a_user_with_this_username")),(null==R?void 0:R.username)&&C.createElement(o,{"aria-live":"assertive",id:et+"-error"},R.username.message)),C.createElement(m,null,C.createElement(b,{htmlFor:el},t("Alias")),C.createElement(g,null,C.createElement(F,{name:"alias",control:z,render:function(e){var n=e.field;return C.createElement(s,l({id:el},n,{"aria-describedby":el+"-hint",addon:C.createElement(h,{name:"edit",size:"x20"})}))}})),C.createElement(y,{id:el+"-hint"},t("Choose_the_alias_that_will_appear_before_the_username_in_messages"))),C.createElement(m,null,C.createElement(b,{htmlFor:er},t("Avatar_URL")),C.createElement(g,null,C.createElement(F,{name:"avatar",control:z,render:function(e){var n=e.field;return C.createElement(s,l({id:er},n,{"aria-describedby":er+"-hint-1 "+er+"-hint-2",addon:C.createElement(h,{name:"user-rounded",size:"x20",alignSelf:"center"})}))}})),C.createElement(y,{id:er+"-hint-1"},t("You_can_change_a_different_avatar_too")),C.createElement(y,{id:er+"-hint-2"},t("Should_be_a_URL_of_an_image"))),C.createElement(m,null,C.createElement(b,{htmlFor:ea},t("Emoji")),C.createElement(g,null,C.createElement(F,{name:"emoji",control:z,render:function(e){var n=e.field;return C.createElement(s,l({id:ea},n,{"aria-describedby":ea+"-hint-1 "+ea+"-hint-2",addon:C.createElement(h,{name:"emoji",size:"x20",alignSelf:"center"})}))}})),C.createElement(y,{id:ea+"-hint-1"},t("You_can_use_an_emoji_as_avatar")),C.createElement(y,{id:ea+"-hint-2",dangerouslySetInnerHTML:{__html:t("Example_s",":ghost:")}})),C.createElement(m,null,C.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},C.createElement(b,{htmlFor:ei},t("Override_Destination_Channel")),C.createElement(g,null,C.createElement(F,{name:"overrideDestinationChannelEnabled",control:z,render:function(e){var n=e.field,t=n.value,a=r(n,L);return C.createElement(E,l({id:ei},a,{checked:t}))}})))),C.createElement(m,null,C.createElement(_,{display:"flex",flexDirection:"row",justifyContent:"spaceBetween",flexGrow:1},C.createElement(b,{htmlFor:eo},t("Script_Enabled")),C.createElement(g,null,C.createElement(F,{name:"scriptEnabled",control:z,render:function(e){var n=e.field,t=n.value,a=r(n,A);return C.createElement(E,l({id:eo},a,{checked:t}))}})))),C.createElement(m,null,C.createElement(b,{htmlFor:ec},t("Script_Engine")),C.createElement(g,null,C.createElement(F,{name:"scriptEngine",control:z,render:function(e){var n=e.field;return C.createElement(p,l({id:ec,"aria-describedby":ec+"-hint"},n,{options:X}))}})),C.createElement(y,{id:ec+"-hint"},t("Script_Engine_Description"))),C.createElement(m,null,C.createElement(b,{htmlFor:eu},t("Script")),C.createElement(g,null,C.createElement(F,{name:"script",control:z,render:function(e){var n=e.field;return C.createElement(f,l({id:eu},n,{rows:10,addon:C.createElement(h,{name:"code",size:"x20",alignSelf:"center"})}))}})))))))})}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/incoming/9eb4572f434e1b952c4da452ea53c1a28db60e06.map