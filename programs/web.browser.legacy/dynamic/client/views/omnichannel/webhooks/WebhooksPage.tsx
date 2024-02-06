function module(e,t,n){n.link("@babel/runtime/regenerator",{default:function(e){o=e}},0),n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){c=e}},2),n.link("@rocket.chat/fuselage",{Box:function(e){i=e},FieldGroup:function(e){l=e},Field:function(e){r=e},FieldRow:function(e){_=e},TextInput:function(e){h=e},MultiSelect:function(e){u=e},Button:function(e){s=e},ButtonGroup:function(e){k=e},NumberInput:function(e){m=e},FieldLabel:function(e){v=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){f=e}},1),n.link("@rocket.chat/ui-client",{ExternalLink:function(e){b=e}},2),n.link("@rocket.chat/ui-contexts",{useToastMessageDispatch:function(e){d=e},useTranslation:function(e){L=e},useEndpoint:function(e){w=e}},3),n.link("@tanstack/react-query",{useMutation:function(e){g=e}},4),n.link("react",{default:function(e){p=e},useMemo:function(e){E=e}},5),n.link("react-hook-form",{Controller:function(e){C=e},useForm:function(e){S=e},useWatch:function(e){y=e}},6),n.link("../../../components/Page",{default:function(e){O=e}},7);var o,a,c,i,l,r,_,h,u,s,k,m,v,f,b,d,L,w,g,p,E,C,S,y,O,W=function(e){var t=e.Livechat_webhookUrl,n=e.Livechat_secret_token,o=e.Livechat_webhook_on_start,i=e.Livechat_webhook_on_close,l=e.Livechat_webhook_on_chat_taken,r=e.Livechat_webhook_on_chat_queued,_=e.Livechat_webhook_on_forward,h=e.Livechat_webhook_on_offline_msg,u=e.Livechat_webhook_on_visitor_message,s=e.Livechat_webhook_on_agent_message;return{Livechat_webhookUrl:t,Livechat_secret_token:n,Livechat_http_timeout:e.Livechat_http_timeout,sendOn:Object.entries({Livechat_webhook_on_start:o,Livechat_webhook_on_close:i,Livechat_webhook_on_chat_taken:l,Livechat_webhook_on_chat_queued:r,Livechat_webhook_on_forward:_,Livechat_webhook_on_offline_msg:h,Livechat_webhook_on_visitor_message:u,Livechat_webhook_on_agent_message:s}).reduce(function(e,t){var n=c(t,2),o=n[0];return n[1]&&(e=[].concat(a(e),[o])),e},[])}};n.exportDefault(function(e){var t=e.settings,n=L(),a=d(),c=S({defaultValues:W(t)}),x=c.control,T=c.reset,M=c.formState,F=M.isDirty,U=M.isSubmitting,q=c.handleSubmit,A=w("POST","/v1/omnichannel/integrations"),R=w("POST","/v1/livechat/webhook.test"),H=!(y({name:"Livechat_webhookUrl",control:x})&&!F),I=E(function(){return[["Livechat_webhook_on_start",n("Chat_start")],["Livechat_webhook_on_close",n("Chat_close")],["Livechat_webhook_on_chat_taken",n("Chat_taken")],["Livechat_webhook_on_chat_queued",n("Chat_queued")],["Livechat_webhook_on_forward",n("Forwarding")],["Livechat_webhook_on_offline_msg",n("Offline_messages")],["Livechat_webhook_on_visitor_message",n("Visitor_message")],["Livechat_webhook_on_agent_message",n("Agent_messages")]]},[n]),P=f(function(e){var t,c,i,l;return o.async(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.sendOn,c=e.Livechat_webhookUrl,i=e.Livechat_secret_token,l=e.Livechat_http_timeout,r.prev=1,r.next=4,o.awrap(A({LivechatWebhookUrl:c,LivechatSecretToken:i,LivechatHttpTimeout:l,LivechatWebhookOnStart:t.includes("Livechat_webhook_on_start"),LivechatWebhookOnClose:t.includes("Livechat_webhook_on_close"),LivechatWebhookOnChatTaken:t.includes("Livechat_webhook_on_chat_taken"),LivechatWebhookOnChatQueued:t.includes("Livechat_webhook_on_chat_queued"),LivechatWebhookOnForward:t.includes("Livechat_webhook_on_forward"),LivechatWebhookOnOfflineMsg:t.includes("Livechat_webhook_on_offline_msg"),LivechatWebhookOnVisitorMessage:t.includes("Livechat_webhook_on_visitor_message"),LivechatWebhookOnAgentMessage:t.includes("Livechat_webhook_on_agent_message")}));case 4:T(e),a({type:"success",message:n("Saved")}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),a({type:"error",message:r.t0});case 11:case"end":return r.stop()}},null,null,[[1,8]],Promise)}),B=g({mutationFn:function(){return R()},onSuccess:function(){return a({type:"success",message:n("It_works")})},onError:function(e){return a({type:"error",message:e})}});return p.createElement(O,null,p.createElement(O.Header,{title:n("Webhooks")},p.createElement(k,null,p.createElement(s,{onClick:function(){return T()},disabled:!F||U},n("Reset")),p.createElement(s,{onClick:function(){return B.mutateAsync()},disabled:H||B.isLoading,title:H?n("Webhook_URL_not_set"):""},B.isLoading?n("Sending"):n("Send_Test")),p.createElement(s,{primary:!0,onClick:q(P),loading:U,disabled:!F},n("Save")))),p.createElement(O.ScrollableContentWithShadow,null,p.createElement(i,{maxWidth:"x600",w:"full",alignSelf:"center"},p.createElement("p",null,n("You_can_use_webhooks_to_easily_integrate_livechat_with_your_CRM")),p.createElement("p",null,p.createElement(b,{to:"https://docs.rocket.chat/use-rocket.chat/omnichannel/webhooks"},n("Click_here"))," ",n("to_see_more_details_on_how_to_integrate")),p.createElement(l,{style:{marginTop:"1.5rem"}},p.createElement(r,null,p.createElement(v,null,n("Webhook_URL")),p.createElement(_,null,p.createElement(C,{control:x,name:"Livechat_webhookUrl",render:function(e){var t=e.field,n=t.onChange,o=t.value;return p.createElement(h,{onChange:n,value:o,placeholder:"https://yourdomain.com/webhook/entrypoint"})}}))),p.createElement(r,null,p.createElement(v,null,n("Secret_token")),p.createElement(_,null,p.createElement(C,{control:x,name:"Livechat_secret_token",render:function(e){var t=e.field,o=t.onChange,a=t.value;return p.createElement(h,{onChange:o,value:a,placeholder:n("Secret_token")})}}))),p.createElement(r,null,p.createElement(v,null,n("Send_request_on")),p.createElement(_,null,p.createElement(i,{w:"full",display:"flex",alignItems:"stretch",justifyContent:"stretch"},p.createElement(C,{control:x,name:"sendOn",render:function(e){var t=e.field,o=t.onChange,a=t.value;return p.createElement(u,{w:"full",value:a,onChange:o,options:I,placeholder:n("Select_an_option")})}})))),p.createElement(r,null,p.createElement(v,null,n("Http_timeout")),p.createElement(_,null,p.createElement(C,{control:x,name:"Livechat_http_timeout",render:function(e){var t=e.field,o=t.onChange,a=t.value;return p.createElement(m,{onChange:o,value:a,placeholder:n("Http_timeout_value")})}})))))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/webhooks/ab64e82a5835d48af22ecd3df0086612f14c421e.map