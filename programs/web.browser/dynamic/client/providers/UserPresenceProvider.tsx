function module(e,t,s){let n,r,l,c,a,i;s.link("@rocket.chat/ui-contexts",{useSetting(e){n=e}},0),s.link("react",{default(e){r=e},useMemo(e){l=e},useEffect(e){c=e}},1),s.link("../contexts/UserPresenceContext",{UserPresenceContext(e){a=e}},2),s.link("../lib/presence",{Presence(e){i=e}},3),s.exportDefault(e=>{let{children:t}=e,s=n("Presence_broadcast_disabled");return c(()=>{i.setStatus(s?"disabled":"enabled")},[s]),r.createElement(a.Provider,{value:l(()=>({queryUserData:e=>({subscribe:t=>(i.listen(e,t),()=>{i.stop(e,t)}),get:()=>i.store.get(e)})}),[])},t)})}
//# sourceMappingURL=/dynamic/client/providers/e341fdf9bb152f2b6f3983d432a6665b10a1920a.map