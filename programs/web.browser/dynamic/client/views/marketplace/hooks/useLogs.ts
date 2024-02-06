function module(e,t,s){let l,n;s.export({useLogs:()=>o}),s.link("@rocket.chat/ui-contexts",{useEndpoint(e){l=e}},0),s.link("@tanstack/react-query",{useQuery(e){n=e}},1);let o=e=>{let t=l("GET","/apps/:id/logs",{id:e});return n(["marketplace","apps",e,"logs"],()=>t())}}
//# sourceMappingURL=/dynamic/client/views/marketplace/hooks/be31a3bde7b6810c21d504d88944d55d3bd4a1c8.map
