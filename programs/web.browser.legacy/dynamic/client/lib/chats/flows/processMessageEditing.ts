function module(e,t,r){r.link("@babel/runtime/regenerator",{default:function(e){n=e}},0),r.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},1),r.export({processMessageEditing:function(){return i}}),r.link("../../../../app/ui-utils/client",{MessageTypes:function(e){s=e}},0),r.link("../../toast",{dispatchToastMessage:function(e){u=e}},1);var n,a,s,u,i=function(e,t,r){var i;return n.async(function(c){for(;;)switch(c.prev=c.next){case 0:if(e.currentEditing){c.next=2;break}return c.abrupt("return",!1);case 2:if(!s.isSystemMessage(t)){c.next=4;break}return c.abrupt("return",!1);case 4:if(!(!t.msg&&!(null!==(i=t.attachments)&&void 0!==i&&i.length))){c.next=6;break}return c.abrupt("return",!1);case 6:return c.prev=6,c.next=9,n.awrap(e.data.updateMessage(a(a({},t),{},{_id:e.currentEditing.mid}),r));case 9:c.next=14;break;case 11:c.prev=11,c.t0=c.catch(6),u({type:"error",message:c.t0});case 14:return e.currentEditing.stop(),c.abrupt("return",!0);case 16:case"end":return c.stop()}},null,null,[[6,11]],Promise)}}
//# sourceMappingURL=/dynamic/client/lib/chats/flows/183b1f797dbd5024993f35b2eff79490d3fe9be4.map