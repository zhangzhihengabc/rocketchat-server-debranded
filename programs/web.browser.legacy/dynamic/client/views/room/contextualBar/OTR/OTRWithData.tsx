function module(n,e,t){var o,u,i,l,c,a,f,s,r,k,d,R;t.link("@rocket.chat/ui-contexts",{useUserId:function(n){o=n}},0),t.link("react",{default:function(n){u=n},useCallback:function(n){i=n},useEffect:function(n){l=n},useMemo:function(n){c=n}},1),t.link("../../../../../app/otr/client/OTR",{default:function(n){a=n}},2),t.link("../../../../../app/otr/lib/OtrRoomState",{OtrRoomState:function(n){f=n}},3),t.link("../../../../hooks/usePresence",{usePresence:function(n){s=n}},4),t.link("../../../../hooks/useReactiveValue",{useReactiveValue:function(n){r=n}},5),t.link("../../contexts/RoomContext",{useRoom:function(n){k=n}},6),t.link("../../contexts/RoomToolboxContext",{useRoomToolbox:function(n){d=n}},7),t.link("./OTR",{default:function(n){R=n}},8),t.exportDefault(function(){var n=o(),e=k(),t=d().closeTab,m=c(function(){if(n)return a.getInstanceByRoomId(n,e._id)},[n,e._id]),T=r(i(function(){return m?m.getState():f.ERROR},[m])),h=s(null==m?void 0:m.getPeerId()),v=null==h?void 0:h.status,x=null==h?void 0:h.username,C=!["offline","loading"].includes(v||"");return l(function(){if(T===f.ESTABLISHING){var n=setTimeout(function(){null==m||m.setState(f.TIMEOUT)},1e4);return function(){clearTimeout(n)}}},[m,T]),u.createElement(R,{isOnline:C,onClickClose:t,onClickStart:function(){null==m||m.handshake()},onClickEnd:function(){null==m||m.end()},onClickRefresh:function(){null==m||m.reset(),null==m||m.handshake(!0)},otrState:T,peerUsername:x})})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/OTR/7e631dfebcb811e02a811488f6f0a716b403b727.map