function module(e,t,n){let o,a,l,i,r,u,c,m,g;n.link("@rocket.chat/fuselage",{Box(e){o=e},Skeleton(e){a=e}},0),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){l=e},useTranslation(e){i=e}},1),n.link("@tanstack/react-query",{useQuery(e){r=e}},2),n.link("react",{default(e){u=e},useMemo(e){c=e}},3),n.link("./incoming/EditIncomingWebhook",{default(e){m=e}},4),n.link("./outgoing/EditOutgoingWebhook",{default(e){g=e}},5),n.exportDefault(e=>{let{integrationId:t}=e,n=i(),k=c(()=>({integrationId:t}),[t]),E=l("GET","/v1/integrations.get"),{data:s,isLoading:b,isError:d}=r(["integrations",k],async()=>E(k));return b?u.createElement(o,{w:"full",p:24},u.createElement(a,{mbe:4}),u.createElement(a,{mbe:8}),u.createElement(a,{mbe:4}),u.createElement(a,{mbe:8}),u.createElement(a,{mbe:4}),u.createElement(a,{mbe:8})):d?u.createElement(o,{mbs:16},n("Oops_page_not_found")):(null==s?void 0:s.integration.type)==="webhook-outgoing"?u.createElement(g,{webhookData:null==s?void 0:s.integration}):u.createElement(m,{webhookData:null==s?void 0:s.integration})})}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/0be416313f235867c0b481a3b685503af68b7dd1.map