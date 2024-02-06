function module(e,t,n){let u,s;n.export({useAgentsQuery:()=>a}),n.link("@rocket.chat/ui-contexts",{useEndpoint(e){u=e}},0),n.link("@tanstack/react-query",{useQuery(e){s=e}},1);let a=e=>{let t=u("GET","/v1/livechat/users/agent");return s(["livechat-agents",e],async()=>t(e||{}))}}
//# sourceMappingURL=/dynamic/client/views/omnichannel/agents/hooks/7587b180d563dd5cab2fae43781d9c3dbe02c565.map
