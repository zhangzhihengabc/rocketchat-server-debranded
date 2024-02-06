function module(t,e,n){let u,s;n.export({useAvatarSuggestions:()=>a}),n.link("@rocket.chat/ui-contexts",{useEndpoint(t){u=t}},0),n.link("@tanstack/react-query",{useQuery(t){s=t}},1);let a=()=>{let t=u("GET","/v1/users.getAvatarSuggestion");return s(["getAvatarSuggestion"],async()=>t())}}
//# sourceMappingURL=/dynamic/client/hooks/e2036b1d5f88337d3b653de9573f3d131e419044.map
