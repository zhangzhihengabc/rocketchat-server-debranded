function module(e,t,n){let a,l,o,i,r,s,u,c;n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){a=e}},0),n.link("react",{default(e){l=e},useState(e){o=e}},1),n.link("../../../../client/lib/utils/preventSyntheticEvent",{preventSyntheticEvent(e){i=e}},2),n.link("../../../../client/views/room/contexts/RoomToolboxContext",{useRoomToolbox(e){r=e}},3),n.link("./GameCenterContainer",{default(e){s=e}},4),n.link("./GameCenterList",{default(e){u=e}},5),n.link("./hooks/useExternalComponentsQuery",{useExternalComponentsQuery(e){c=e}},6),n.exportDefault(()=>{let[e,t]=o(),{closeTab:n}=r(),m=c(),d=a(e=>{i(e),n()}),k=a(e=>{t(void 0),i(e)});return l.createElement(l.Fragment,null,!e&&l.createElement(u,{"data-testid":"game-center-list",handleClose:d,handleOpenGame:t,games:m.data,isLoading:m.isLoading}),e&&l.createElement(s,{"data-testid":"game-center-container",handleBack:k,handleClose:d,game:e}))})}
//# sourceMappingURL=/dynamic/ee/client/apps/gameCenter/630101b29cc148ee173e0e2086af89970798058a.map