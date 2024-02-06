function module(e,t,i){var n,s,a,r,o,l,d,u,c,m,f;i.link("@babel/runtime/regenerator",{default:function(e){n=e}},0),i.link("meteor/meteor",{Meteor:function(e){s=e}},0),i.link("meteor/tracker",{Tracker:function(e){a=e}},1),i.link("moment",{default:function(e){r=e}},2),i.link("../../app/authorization/client",{hasAtLeastOnePermission:function(e){o=e},hasPermission:function(e){l=e}},3),i.link("../../app/models/client",{ChatMessage:function(e){d=e}},4),i.link("../../app/settings/client",{settings:function(e){u=e}},5),i.link("../../app/utils/lib/i18n",{t:function(e){c=e}},6),i.link("../../lib/callbacks",{callbacks:function(e){m=e}},7),i.link("../lib/toast",{dispatchToastMessage:function(e){f=e}},8),s.methods({updateMessage:function(e){var t,i,g,p,v=s.userId();if(v){var k=d.findOne(e._id);if(k){var h=o("edit-message",e.rid),b=u.get("Message_AllowEditing"),_=!1;if((null!==(t=null==k?void 0:null===(i=k.attachments)||void 0===i?void 0:null===(g=i[0])||void 0===g?void 0:g.description)&&void 0!==t?t:k.msg)!==e.msg){null!=k&&null!==(p=k.u)&&void 0!==p&&p._id&&(_=k.u._id===v);var M=s.users.findOne(v);if(M){if(!(h||b&&_)){f({type:"error",message:c("error-action-not-allowed",{action:c("Message_editing")})});return}var w=Number(u.get("Message_AllowEditing_BlockEditInMinutes"));if(!l("bypass-time-limit-edit-and-delete")&&0!==w&&k.ts){var y=r(k.ts);if(y&&r().diff(y,"minutes")>w){f({type:"error",message:c("error-message-editing-blocked")});return}}a.nonreactive(function(){var t,i;return n.async(function(s){for(;;)switch(s.prev=s.next){case 0:return e.editedAt=new Date(Date.now()),e.editedBy={_id:v,username:M.username},s.next=4,n.awrap(m.run("beforeSaveMessage",e));case 4:i={editedAt:(e=s.sent).editedAt,editedBy:e.editedBy,msg:e.msg},null!==(t=k.attachments)&&void 0!==t&&t.length&&void 0!==k.attachments[0].description&&(delete i.msg,k.attachments[0].description=e.msg),d.update({_id:e._id,"u._id":v},{$set:i});case 8:case"end":return s.stop()}},null,null,null,Promise)})}}}}}})}
//# sourceMappingURL=/dynamic/client/methods/54e11592c7d2c138a93543dfa6ff398a4183a4c6.map