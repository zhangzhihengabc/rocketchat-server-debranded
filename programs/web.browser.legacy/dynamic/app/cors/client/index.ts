function module(t,e,n){var o,r,i;n.link("meteor/meteor",{Meteor:function(t){o=t}},0),n.link("meteor/tracker",{Tracker:function(t){r=t}},1),n.link("../../settings/client",{settings:function(t){i=t}},2),o.startup(function(){r.autorun(function(){o.absoluteUrl.defaultOptions.secure=!!i.get("Force_SSL")})})}
//# sourceMappingURL=/dynamic/app/cors/client/9daf95b0e1b9e30fd7ad969e1378ee71b9bdb433.map
