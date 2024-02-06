function module(e,t,o){let r;o.export({waitUntilFind:()=>i}),o.link("meteor/tracker",{Tracker(e){r=e}},0);let i=e=>new Promise(t=>{r.autorun(o=>{let r=e();void 0!==r&&(o.stop(),t(r))})})}
//# sourceMappingURL=/dynamic/client/lib/utils/8072de132d4bedc3fc226b946e70118961efce9e.map
