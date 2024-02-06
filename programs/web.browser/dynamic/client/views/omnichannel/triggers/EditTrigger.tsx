function module(e,t,n){let l,r,a,o,i,c,u,m,s,d,v,E,g,p,_,h,b,f,k,x,y,C,F,q,S,T,w,A,D,M,O,B,I;let N=["value"],R=["value"];n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){r=e}},1),n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},2),n.link("@rocket.chat/fuselage",{FieldGroup(e){o=e},Button(e){i=e},ButtonGroup(e){c=e},Box(e){u=e},Field(e){m=e},FieldLabel(e){s=e},FieldRow(e){d=e},FieldError(e){v=e},TextInput(e){E=e},ToggleSwitch(e){g=e},Select(e){p=e},TextAreaInput(e){_=e}},0),n.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){h=e}},1),n.link("@rocket.chat/ui-contexts",{useToastMessageDispatch(e){b=e},useRouter(e){f=e},useEndpoint(e){k=e},useTranslation(e){x=e}},2),n.link("@tanstack/react-query",{useMutation(e){y=e},useQueryClient(e){C=e}},3),n.link("react",{default(e){F=e},useMemo(e){q=e}},4),n.link("react-hook-form",{Controller(e){S=e},useFieldArray(e){T=e},useForm(e){w=e}},5),n.link("../../../components/Contextualbar",{ContextualbarScrollableContent(e){A=e},ContextualbarTitle(e){D=e},ContextualbarFooter(e){M=e},Contextualbar(e){O=e},ContextualbarHeader(e){B=e},ContextualbarClose(e){I=e}},6);let j=e=>({name:(null==e?void 0:e.name)||"",description:(null==e?void 0:e.description)||"",enabled:(null==e?void 0:e.enabled)||!0,runOnce:!!(null!=e&&e.runOnce),conditions:(null==e?void 0:e.conditions.map(e=>{let{name:t,value:n}=e;return{name:t||"page-url",value:n||""}}))||[{name:"page-url",value:""}],actions:(null==e?void 0:e.actions.map(e=>{let{name:t,params:n}=e;return{name:t||"",params:{sender:(null==n?void 0:n.sender)||"queue",msg:(null==n?void 0:n.msg)||"",name:(null==n?void 0:n.name)||""}}}))||[{name:"send-message",params:{sender:"queue",msg:"",name:""}}]});n.exportDefault(e=>{let{triggerData:t}=e,n=x(),G=f(),L=C(),P=b(),Q=k("POST","/v1/livechat/triggers"),{control:U,handleSubmit:V,formState:{isDirty:H,errors:W},watch:z}=w({mode:"onBlur",values:j(t)}),{fields:J}=T({control:U,name:"conditions"}),{fields:K}=T({control:U,name:"actions"}),{description:X,conditions:Y,actions:Z}=z(),$=q(()=>[["page-url",n("Visitor_page_URL")],["time-on-site",n("Visitor_time_on_site")],["chat-opened-by-visitor",n("Chat_opened_by_visitor")],["after-guest-registration",n("After_guest_registration")]],[n]),ee=q(()=>({"page-url":n("Enter_a_regex"),"time-on-site":n("Time_in_seconds")}),[n]),et=q(()=>[["queue",n("Impersonate_next_agent_from_queue")],["custom",n("Custom_agent")]],[n]),en=y({mutationFn:Q,onSuccess:()=>{P({type:"success",message:n("Saved")}),L.invalidateQueries(["livechat-triggers"]),G.navigate("/omnichannel/triggers")},onError:e=>{P({type:"error",message:e})}}),el=async e=>{en.mutateAsync(a(a({},e),{},{_id:null==t?void 0:t._id}))},er=h(),ea=h(),eo=h(),ei=h(),ec=h(),eu=h(),em=h(),es=h();return F.createElement(O,null,F.createElement(B,null,F.createElement(D,null,null!=t&&t._id?n("Edit_Trigger"):n("New_Trigger")),F.createElement(I,{onClick:()=>G.navigate("/omnichannel/triggers")})),F.createElement(A,null,F.createElement("form",{id:er,onSubmit:V(el)},F.createElement(o,null,F.createElement(m,null,F.createElement(u,{display:"flex",flexDirection:"row"},F.createElement(s,{htmlFor:ea},n("Enabled")),F.createElement(d,null,F.createElement(S,{name:"enabled",control:U,render:e=>{let{field:{value:t}}=e,n=r(e.field,N);return F.createElement(g,l({id:ea},n,{checked:t}))}})))),F.createElement(m,null,F.createElement(u,{display:"flex",flexDirection:"row"},F.createElement(s,{htmlFor:eo},n("Run_only_once_for_each_visitor")),F.createElement(d,null,F.createElement(S,{name:"runOnce",control:U,render:e=>{let{field:{value:t}}=e,n=r(e.field,R);return F.createElement(g,l({id:eo},n,{checked:t}))}})))),F.createElement(m,null,F.createElement(s,{htmlFor:ei,required:!0},n("Name")),F.createElement(d,null,F.createElement(S,{name:"name",control:U,rules:{required:n("The_field_is_required",n("Name"))},render:e=>{var t;let{field:n}=e;return F.createElement(E,l({},n,{id:ei,error:null==W?void 0:null===(t=W.name)||void 0===t?void 0:t.message,"aria-required":!0,"aria-invalid":!!(null==W?void 0:W.name),"aria-describedby":"".concat(ei,"-error")}))}})),(null==W?void 0:W.name)&&F.createElement(v,{"aria-live":"assertive",id:"".concat(ei,"-error")},null==W?void 0:W.name.message)),F.createElement(m,null,F.createElement(s,{htmlFor:ec},n("Description")),F.createElement(d,null,F.createElement(S,{name:"description",control:U,render:e=>{let{field:t}=e;return F.createElement(E,l({id:ec},t,{value:X}))}}))),J.map((e,t)=>{let r=ee[Y[t].name];return F.createElement(m,{key:t},F.createElement(s,{htmlFor:eu},n("Condition")),F.createElement(d,null,F.createElement(S,{name:"conditions.".concat(t,".name"),control:U,render:e=>{let{field:t}=e;return F.createElement(p,l({id:eu},t,{options:$}))}})),r&&F.createElement(d,null,F.createElement(S,{name:"conditions.".concat(t,".value"),control:U,render:e=>{let{field:t}=e;return F.createElement(E,l({},t,{placeholder:r}))}})))}),K.map((e,t)=>{var r,a,o,i,c,u,g,h;return F.createElement(m,{key:t},F.createElement(s,{htmlFor:em},n("Action")),F.createElement(d,null,F.createElement(E,{value:n("Send_a_message"),readOnly:!0})),F.createElement(d,null,F.createElement(S,{name:"actions.".concat(t,".params.sender"),control:U,render:e=>{let{field:t}=e;return F.createElement(p,l({id:em},t,{options:et,placeholder:n("Select_an_option")}))}})),(null===(r=Z[t].params)||void 0===r?void 0:r.sender)==="custom"&&F.createElement(d,null,F.createElement(S,{name:"actions.".concat(t,".params.name"),control:U,render:e=>{let{field:t}=e;return F.createElement(E,l({},t,{placeholder:n("Name_of_agent")}))}})),F.createElement(d,null,F.createElement(S,{name:"actions.".concat(t,".params.msg"),control:U,rules:{required:n("The_field_is_required",n("Message"))},render:e=>{var r,a,o,i,c,u,m;let{field:s}=e;return F.createElement(_,l({error:null===(r=W.actions)||void 0===r?void 0:null===(a=r[t])||void 0===a?void 0:null===(o=a.params)||void 0===o?void 0:null===(i=o.msg)||void 0===i?void 0:i.message,"aria-invalid":!!(null===(c=W.actions)||void 0===c?void 0:null===(u=c[t])||void 0===u?void 0:null===(m=u.params)||void 0===m?void 0:m.msg),"aria-describedby":"".concat(es,"-error"),"aria-required":!0},s,{rows:3,placeholder:"".concat(n("Message"),"*")}))}})),(null===(a=W.actions)||void 0===a?void 0:null===(o=a[t])||void 0===o?void 0:null===(i=o.params)||void 0===i?void 0:i.msg)&&F.createElement(v,{"aria-live":"assertive",id:"".concat(es,"-error")},null===(c=W.actions)||void 0===c?void 0:null===(u=c[t])||void 0===u?void 0:null===(g=u.params)||void 0===g?void 0:null===(h=g.msg)||void 0===h?void 0:h.message))})))),F.createElement(M,null,F.createElement(c,{stretch:!0},F.createElement(i,{onClick:()=>G.navigate("/omnichannel/triggers")},n("Cancel")),F.createElement(i,{form:er,type:"submit",primary:!0,disabled:!H},n("Save")))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/triggers/dfa8d5feb6688314cf77288d1936739e8f7b5698.map