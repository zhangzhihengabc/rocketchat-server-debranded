function module(t,n,e){var o,i,r;e.link("meteor/meteor",{Meteor:function(t){o=t}},0),e.link("meteor/tracker",{Tracker:function(t){i=t}},1),e.link("../../settings/client",{settings:function(t){r=t}},2),o.startup(function(){i.autorun(function(t){r.get("Webdav_Integration_Enabled")&&(t.stop(),e.dynamicImport("./startup/sync"),e.dynamicImport("./actionButton"))})})}
//# sourceMappingURL=/dynamic/app/webdav/client/70bd5821abea3e39acd67b7bb515dcf4c6f5a78d.map