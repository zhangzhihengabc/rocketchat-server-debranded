function module(t,e,n){let o,r;n.export({useSendTelemetryMutation:()=>u}),n.link("@rocket.chat/ui-contexts",{useEndpoint(t){o=t}},0),n.link("@tanstack/react-query",{useMutation(t){r=t}},1);let u=()=>{let t=o("POST","/v1/statistics.telemetry");return r(t,{onError:t=>{console.warn(t)}})}}
//# sourceMappingURL=/dynamic/ee/client/views/audit/hooks/ab3eaf1c02b274e2845594abb4cf76efd858e4a1.map
