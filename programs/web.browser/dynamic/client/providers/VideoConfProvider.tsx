function module(e,n,i){let l,a,o,r,t,c,s,u,g;i.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),i.link("react",{default(e){a=e},useState(e){o=e},useMemo(e){r=e},useEffect(e){t=e}},0),i.link("../contexts/VideoConfContext",{VideoConfContext(e){c=e}},1),i.link("../lib/VideoConfManager",{VideoConfManager(e){s=e}},2),i.link("../views/room/contextualBar/VideoConference/VideoConfPopups",{default(e){u=e}},3),i.link("../views/room/contextualBar/VideoConference/hooks/useVideoConfOpenCall",{useVideoConfOpenCall(e){g=e}},4),i.exportDefault(e=>{let{children:n}=e,[i,C]=o(),d=g();t(()=>s.on("call/join",e=>{d(e.url,e.providerName)}),[d]),t(()=>{s.on("direct/stopped",()=>C(void 0)),s.on("calling/ended",()=>C(void 0))},[]);let f=r(()=>({manager:s,dispatchOutgoing:e=>C(l(l({},e),{},{id:e.rid})),dismissOutgoing:()=>C(void 0),startCall:(e,n)=>s.startCall(e,n),acceptCall:e=>s.acceptIncomingCall(e),joinCall:e=>s.joinCall(e),dismissCall:e=>{s.dismissIncomingCall(e)},rejectIncomingCall:e=>s.rejectIncomingCall(e),abortCall:()=>s.abortCall(),setPreferences:e=>s.setPreferences(e),queryIncomingCalls:{getCurrentValue:()=>s.getIncomingDirectCalls(),subscribe:e=>s.on("incoming/changed",e)},queryRinging:{getCurrentValue:()=>s.isRinging(),subscribe:e=>s.on("ringing/changed",e)},queryCalling:{getCurrentValue:()=>s.isCalling(),subscribe:e=>s.on("calling/changed",e)},queryCapabilities:{getCurrentValue:()=>s.capabilities,subscribe:e=>s.on("capabilities/changed",e)},queryPreferences:{getCurrentValue:()=>s.preferences,subscribe:e=>s.on("preference/changed",e)}}),[]);return a.createElement(c.Provider,{value:f},n,a.createElement(u,null,i))})}
//# sourceMappingURL=/dynamic/client/providers/768cd07b2b4fee287a075c40c9629396fcb52724.map