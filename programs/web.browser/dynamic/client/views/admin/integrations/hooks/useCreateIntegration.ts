function module(e,t,n){let o,a,i,s,r;n.export({useCreateIntegration:()=>c}),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){o=e},useRouter(e){a=e},useToastMessageDispatch(e){i=e},useTranslation(e){s=e}},0),n.link("@tanstack/react-query",{useMutation(e){r=e}},1);let c=e=>{let t=s(),n=a(),c=o("POST","/v1/integrations.create"),u=i();return r({mutationFn:c,onSuccess:o=>{u({type:"success",message:t("Integration_added")}),n.navigate("/admin/integrations/edit/".concat("webhook-incoming"===e?"incoming":"outgoing","/").concat(o.integration._id))},onError:e=>{u({type:"error",message:e})}})}}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/hooks/ef20b9d718e6cdbc70e4f6bf2ba7c7527e58b56f.map