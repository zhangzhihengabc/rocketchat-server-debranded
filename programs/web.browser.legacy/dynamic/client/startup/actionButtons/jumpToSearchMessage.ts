function module(e,t,n){var s,i,r,u,a;n.link("@babel/runtime/regenerator",{default:function(e){s=e}},0),n.link("meteor/meteor",{Meteor:function(e){i=e}},0),n.link("../../../app/ui-utils/client",{MessageAction:function(e){r=e}},1),n.link("../../lib/utils/messageArgs",{messageArgs:function(e){u=e}},2),n.link("../../lib/utils/setMessageJumpQueryStringParameter",{setMessageJumpQueryStringParameter:function(e){a=e}},3),i.startup(function(){r.addButton({id:"jump-to-search-message",icon:"jump",label:"Jump_to_message",context:["search"],action:function(e,t){var n;return s.async(function(e){for(;;)switch(e.prev=e.next){case 0:a((void 0===(n=t.message)?u(this).msg:n)._id);case 2:case"end":return e.stop()}},null,this,null,Promise)},order:100,group:"message"})})}
//# sourceMappingURL=/dynamic/client/startup/actionButtons/41416b999421f082f18a9d801a9c4df5b4160fc9.map