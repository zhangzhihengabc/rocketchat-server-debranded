function module(e,o,t){let l,r,a,n,s,i,u;t.export({useUserCard:()=>c}),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){l=e}},0),t.link("react",{useCallback(e){r=e},useEffect(e){a=e}},1),t.link("../../../../../app/ui/client/lib/userCard",{openUserCard(e){n=e},closeUserCard(e){s=e}},2),t.link("../../contexts/RoomContext",{useRoom(e){i=e}},3),t.link("../../contexts/RoomToolboxContext",{useRoomToolbox(e){u=e}},4);let c=()=>{a(()=>()=>{s()},[]);let e=i(),{openTab:o}=u(),t=l(t=>{var l,r;switch(e.t){case"l":o("room-info",t);break;case"v":o("voip-room-info",t);break;case"d":(null!==(l=null===(r=e.uids)||void 0===r?void 0:r.length)&&void 0!==l?l:0)>2?o("user-info-group",t):o("user-info",t);break;default:o("members-list",t)}}),c=r(o=>l=>{l.preventDefault(),n({username:o,target:l.currentTarget,rid:e._id,open:e=>{e.preventDefault(),t(o)}})},[t,e._id]);return{open:c,close:s}}}
//# sourceMappingURL=/dynamic/client/views/room/providers/hooks/85f7d9836eac6da5cb2990441fd11a53ef4ff655.map