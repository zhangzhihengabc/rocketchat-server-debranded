function module(e,n,t){let l,i,o,r,a,u,d,s,g,c,m,v,k,p,y,E,b,h,f,C,I,W,_,D;t.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),t.link("@babel/runtime/helpers/objectDestructuringEmpty",{default(e){i=e}},1),t.link("@babel/runtime/helpers/extends",{default(e){o=e}},2),t.link("@rocket.chat/fuselage",{Button(e){r=e},ButtonGroup(e){a=e},Tabs(e){u=e},TabsItem(e){d=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId(e){s=e}},1),t.link("@rocket.chat/ui-contexts",{useSetModal(e){g=e},useTranslation(e){c=e},useRouter(e){m=e},useRouteParameter(e){v=e}},2),t.link("react",{default(e){k=e},useCallback(e){p=e}},3),t.link("react-hook-form",{FormProvider(e){y=e},useForm(e){E=e}},4),t.link("../../../../components/GenericModal",{default(e){b=e}},5),t.link("../../../../components/Page",{default(e){h=e}},6),t.link("../helpers/triggerWords",{triggerWordsToArray(e){f=e},triggerWordsToString(e){C=e}},7),t.link("../hooks/useCreateIntegration",{useCreateIntegration(e){I=e}},8),t.link("../hooks/useDeleteIntegration",{useDeleteIntegration(e){W=e}},9),t.link("../hooks/useUpdateIntegration",{useUpdateIntegration(e){_=e}},10),t.link("./OutgoingWebhookForm",{default(e){D=e}},11);let w=(e,n)=>{var t,l;return{enabled:(null==e?void 0:e.enabled)||!0,impersonateUser:(null==e?void 0:e.impersonateUser)||!1,event:(null==e?void 0:e.event)||"sendMessage",urls:null!==(t=null==e?void 0:null===(l=e.urls)||void 0===l?void 0:l.join("\n"))&&void 0!==t?t:"",token:(null==e?void 0:e.token)||n,triggerWords:C(null==e?void 0:e.triggerWords)||"",targetRoom:(null==e?void 0:e.targetRoom)||"",channel:(null==e?void 0:e.channel.join(", "))||"",username:(null==e?void 0:e.username)||"",name:(null==e?void 0:e.name)||"",alias:(null==e?void 0:e.alias)||"",avatar:(null==e?void 0:e.avatar)||"",emoji:(null==e?void 0:e.emoji)||"",scriptEnabled:(null==e?void 0:e.scriptEnabled)||!1,scriptEngine:(null==e?void 0:e.scriptEngine)||"isolated-vm",script:(null==e?void 0:e.script)||"",retryFailedCalls:(null==e?void 0:e.retryFailedCalls)||!0,retryCount:(null==e?void 0:e.retryCount)||6,retryDelay:(null==e?void 0:e.retryDelay)||"powers-of-ten",triggerWordAnywhere:(null==e?void 0:e.triggerWordAnywhere)||!1,runOnEdits:(null==e?void 0:e.runOnEdits)||!0}},S="webhook-outgoing";t.exportDefault(e=>{let{webhookData:n}=e,t=c(),C=g(),j=m(),F=v("type"),T=s(),x=E({mode:"onBlur",values:w(n,T)}),{reset:O,handleSubmit:U,formState:{isDirty:B},watch:R}=x,A=W(S),H=I(S),M=_(S),P=p(()=>{let e=async()=>{A.mutate({type:S,integrationId:null==n?void 0:n._id})};C(k.createElement(b,{variant:"danger",onConfirm:e,onCancel:()=>C(null),confirmText:t("Delete")},t("Integration_Delete_Warning")))},[null==n?void 0:n._id,A,C,t]),{urls:G,triggerWords:q}=R(),z=p(async e=>{let t=o({},(i(e),e));return null!=n&&n._id?M.mutate(l(l({type:S,integrationId:null==n?void 0:n._id},t),{},{triggerWords:f(q),urls:G.split("\n")})):H.mutate(l(l({type:S},t),{},{triggerWords:f(q),urls:G.split("\n")}))},[null==n?void 0:n._id,H,M,q,G]),J=s();return k.createElement(h,{flexDirection:"column"},k.createElement(h.Header,{title:t("Integration_Outgoing_WebHook")},k.createElement(a,null,k.createElement(r,{icon:"back",onClick:()=>j.navigate("/admin/integrations/webhook-outgoing")},t("Back")),(null==n?void 0:n._id)&&k.createElement(r,{onClick:()=>j.navigate("/admin/integrations/history/outgoing/".concat(n._id))},t("History")),(null==n?void 0:n._id)&&k.createElement(r,{danger:!0,onClick:P},t("Delete")))),!(null!=n&&n._id)&&k.createElement(u,null,k.createElement(d,{selected:"incoming"===F,onClick:()=>j.navigate("/admin/integrations/new/incoming")},t("Incoming")),k.createElement(d,{selected:"outgoing"===F,onClick:()=>j.navigate("/admin/integrations/new/outgoing")},t("Outgoing"))),k.createElement(h.ScrollableContentWithShadow,{is:"form",id:J,onSubmit:U(z)},k.createElement(y,x,k.createElement(D,null))),k.createElement(h.Footer,{isDirty:B},k.createElement(a,null,k.createElement(r,{type:"reset",onClick:()=>O()},t("Cancel")),k.createElement(r,{form:J,primary:!0,type:"submit"},t("Save")))))})}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/outgoing/06ff3f039bb5109f31da75aca283ef95b4ede369.map