function module(e,o,t){let n,r,l,i,a,c;t.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),t.link("@rocket.chat/ui-client",{HeaderTag(e){r=e},HeaderTagIcon(e){l=e}},0),t.link("react",{default(e){i=e}},1),t.link("../../../hooks/useRoomIcon",{useRoomIcon(e){a=e}},2),t.link("../../../lib/rooms/roomCoordinator",{roomCoordinator(e){c=e}},3),t.exportDefault(e=>{let{room:o}=e,t=a(o);return i.createElement(r,{onClick:()=>c.openRouteLink(o.t,n({rid:o._id},o))},i.createElement(l,{icon:t}),c.getRoomName(o.t,o))})}
//# sourceMappingURL=/dynamic/client/views/room/Header/f9834526a1b03b6d01f4b5ab5743a87fa2461d1d.map