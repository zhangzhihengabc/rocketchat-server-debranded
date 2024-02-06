function module(e,t,i){let o,n,l;i.link("meteor/meteor",{Meteor(e){o=e}},0),i.link("../../app/models/client",{ChatMessage(e){n=e}},1),i.link("../../app/notifications/client",{Notifications(e){l=e}},2),o.startup(()=>{l.onLogged("Users:Deleted",e=>{let{userId:t}=e;n.remove({"u._id":t})})})}
//# sourceMappingURL=/dynamic/client/startup/c41f125eab5c1b7e7919562073c0c0da1e3f48ef.map
