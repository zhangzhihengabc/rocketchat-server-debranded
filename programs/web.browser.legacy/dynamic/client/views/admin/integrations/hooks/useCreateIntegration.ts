function module(n,t,e){e.export({useCreateIntegration:function(){return s}}),e.link("@rocket.chat/ui-contexts",{useEndpoint:function(n){i=n},useRouter:function(n){o=n},useToastMessageDispatch:function(n){u=n},useTranslation:function(n){a=n}},0),e.link("@tanstack/react-query",{useMutation:function(n){r=n}},1);var i,o,u,a,r,s=function(n){var t=a(),e=o(),s=i("POST","/v1/integrations.create"),c=u();return r({mutationFn:s,onSuccess:function(i){c({type:"success",message:t("Integration_added")}),e.navigate("/admin/integrations/edit/"+("webhook-incoming"===n?"incoming":"outgoing")+"/"+i.integration._id)},onError:function(n){c({type:"error",message:n})}})}}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/hooks/09b64ff712d1207569f40e6418881a229ded0c79.map