function module(n,t,e){e.link("@babel/runtime/regenerator",{default:function(n){r=n}},0),e.export({useSendInvitationEmailMutation:function(){return o}}),e.link("@rocket.chat/ui-contexts",{useEndpoint:function(n){u=n},useToastMessageDispatch:function(n){i=n},useTranslation:function(n){a=n}},0),e.link("@tanstack/react-query",{useMutation:function(n){s=n}},1);var r,u,i,a,s,o=function(){var n=a(),t=i(),e=u("POST","/v1/sendInvitationEmail");return s(function(n){var t,u;return r.async(function(i){for(;;)switch(i.prev=i.next){case 0:return t=n.emails,i.next=3,r.awrap(e({emails:t}));case 3:return u=i.sent,i.abrupt("return",u);case 5:case"end":return i.stop()}},null,null,null,Promise)},{onSuccess:function(){return t({type:"success",message:n("Sending_Invitations")})},onError:function(n){return t({type:"error",message:n})}})}}
//# sourceMappingURL=/dynamic/client/views/admin/users/hooks/b05f465c4a00a46e84e464070aeaa7319f4b6f7e.map