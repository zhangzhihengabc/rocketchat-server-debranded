function module(e,t,n){var o,u,i,r;n.link("@rocket.chat/ui-contexts",{useUserId:function(e){o=e}},0),n.link("react",{default:function(e){u=e}},1),n.link("../../../hooks/usePresence",{usePresence:function(e){i=e}},2),n.link("./RoomHeader",{default:function(e){r=e}},3),n.exportDefault(function(e){var t,n=e.room,l=e.slots,s=o(),c=i(null===(t=n.uids)||void 0===t?void 0:t.filter(function(e){return e!==s}).shift());return u.createElement(r,{slots:l,room:n,topic:null==c?void 0:c.statusText})})}
//# sourceMappingURL=/dynamic/client/views/room/Header/eb3e4c331abc5a7bb29d387c637f05a9e750a69c.map