function module(e,t,r){let n,o,l;r.link("meteor/meteor",{Meteor(e){n=e}},0),r.link("meteor/tracker",{Tracker(e){o=e}},1),r.link("../../settings/client",{settings(e){l=e}},2),n.startup(()=>{o.autorun(()=>{n.absoluteUrl.defaultOptions.secure=!!l.get("Force_SSL")})})}
//# sourceMappingURL=/dynamic/app/cors/client/22b4bdcc0bc6e874f85066742da1009ac9a4f3a8.map
