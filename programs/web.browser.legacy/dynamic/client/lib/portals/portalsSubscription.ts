function module(t,n,e){e.export({portalsSubscription:function(){return c},unregisterPortal:function(){return f},registerPortal:function(){return s}}),e.link("@rocket.chat/emitter",{Emitter:function(t){r=t}},0),e.link("@rocket.chat/random",{Random:function(t){u=t}},1);var r,u,o,i,a,c=(i=Array.from((o=new Map).values()),a=new r,{getSnapshot:function(){return i},subscribe:function(t){return a.on("update",t)},delete:function(t){o.delete(t),i=Array.from(o.values()),a.emit("update")},set:function(t,n){o.set(t,{portal:n,key:u.id()}),i=Array.from(o.values()),a.emit("update")},has:function(t){return o.has(t)}}),f=function(t){c.delete(t)},s=function(t,n){return c.set(t,n),function(){f(t)}}}
//# sourceMappingURL=/dynamic/client/lib/portals/6beca32fd21bd13f6fa6602c8c6b44424efb354e.map