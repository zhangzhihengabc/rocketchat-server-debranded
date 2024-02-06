function module(e,t,c){let n,u;c.export({useSmtpQuery:()=>r}),c.link("@rocket.chat/ui-contexts",{useEndpoint(e){n=e}},0),c.link("@tanstack/react-query",{useQuery(e){u=e}},1);let r=()=>{let e=n("GET","/v1/smtp.check");return u(["smtp.check"],async()=>e())}}
//# sourceMappingURL=/dynamic/client/views/admin/users/hooks/9902cacb536f3695c449e1f2a916a289988454a2.map
