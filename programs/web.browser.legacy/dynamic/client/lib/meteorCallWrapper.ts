function module(e,n,t){t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},0),t.link("meteor/ddp-common",{DDPCommon:function(e){r=e}},0),t.link("meteor/meteor",{Meteor:function(e){c=e}},1),t.link("meteor/tracker",{Tracker:function(e){s=e}},2),t.link("../../app/utils/client/lib/SDKClient",{sdk:function(e){l=e}},3);var o,i,r,c,s,l,a=["setUserStatus","logout"];window.USE_REST_FOR_DDP_CALLS&&(o=c.connection._send,c.connection._send=function(e){if("method"!==e.msg||(t=e.method,d=e.params,"login"===t&&null!==(n=d[0])&&void 0!==n&&n.resume||t.startsWith("UserPresence:")||a.includes(t)||t.startsWith("stream-")))return o.call(c.connection,e);var n,t,d,u=s.nonreactive(function(){return c.userId()?"method.call":"method.callAnon"}),m={message:r.stringifyDDP(i({},e))},f=function(n){c.connection._methodInvokers[e.id]&&(c.connection._livedata_data({msg:"updated",methods:[e.id]}),c.connection.onMessage(n))},h=encodeURIComponent(e.method.replace(/\//g,":"));l.rest.post("/v1/"+u+"/"+h,m).then(function(n){var t=n.message;if(f(t),"login"===e.method){var o,i=r.parseDDP(t);null!==(o=i.result)&&void 0!==o&&o.token&&c.loginWithToken(i.result.token)}}).catch(function(e){console.error(e)})})}
//# sourceMappingURL=/dynamic/client/lib/2d0c0f55c503f36942aa074a10d92934d010e9a2.map