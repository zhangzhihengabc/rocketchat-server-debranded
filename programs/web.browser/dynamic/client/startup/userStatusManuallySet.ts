function module(l,e,t){let a,s,u;t.link("meteor/meteor",{Meteor(l){a=l}},0),t.link("../../lib/callbacks",{callbacks(l){s=l}},1),t.link("../lib/utils/fireGlobalEvent",{fireGlobalEvent(l){u=l}},2),a.startup(()=>{s.add("userStatusManuallySet",l=>{u("user-status-manually-set",l)})})}
//# sourceMappingURL=/dynamic/client/startup/b161c2e8fafee3217b641648c6709dcde8bd253c.map
