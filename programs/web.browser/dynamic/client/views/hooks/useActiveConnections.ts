function module(e,t,n){let c,i;n.export({useActiveConnections:()=>o}),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){c=e}},0),n.link("@tanstack/react-query",{useQuery(e){i=e}},1);let o=()=>{let e=c("GET","/v1/presence.getConnections");return i(["userConnections"],async()=>{let{current:t,max:n}=await e();return{current:t,max:n,percentage:Math.min(t/n*100,100)}},{staleTime:6e4})}}
//# sourceMappingURL=/dynamic/client/views/hooks/d6becdbd9e474aac72f13e5fd8b06f6152f34b95.map