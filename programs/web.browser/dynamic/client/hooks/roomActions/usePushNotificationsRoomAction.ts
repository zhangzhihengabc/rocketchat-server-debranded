function module(o,t,e){let i,n,r;e.export({usePushNotificationsRoomAction:()=>s}),e.link("react",{lazy(o){i=o},useMemo(o){n=o}},0),e.link("../../views/room/contexts/RoomContext",{useRoomSubscription(o){r=o}},1);let c=i(()=>e.dynamicImport("../../views/room/contextualBar/NotificationPreferences")),s=()=>{let o=r(),t=!!o;return n(()=>{if(t)return{id:"push-notifications",groups:["channel","group","direct","direct_multiple","team"],title:"Notifications_Preferences",icon:"bell",tabComponent:c,order:11,type:"customization"}},[t])}}
//# sourceMappingURL=/dynamic/client/hooks/roomActions/57a966c1b790a74c301fc966304db954011f63ca.map