function module(e,n,t){var o,r,s,u,a,i,c,l,f;t.link("@babel/runtime/regenerator",{default:function(e){o=e}},0),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){r=e},useSetModal:function(e){s=e},useToastMessageDispatch:function(e){u=e},useTranslation:function(e){a=e}},0),t.link("@tanstack/react-query",{useMutation:function(e){i=e},useQueryClient:function(e){c=e}},1),t.link("react",{default:function(e){l=e}},2),t.link("../../../../components/GenericModal",{default:function(e){f=e}},3),t.exportDefault(function(e,n,t){var d=a(),m=r("POST","/v1/chat.delete"),_=r("POST","/v1/moderation.dismissReports"),p=u(),y=s(),g=c(),M=i({mutationFn:m,onError:function(e){p({type:"error",message:e}),y()},onSuccess:function(){return o.async(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.awrap(v.mutateAsync({msgId:e}));case 2:case"end":return n.stop()}},null,null,null,Promise)}}),v=i({mutationFn:_,onError:function(e){p({type:"error",message:e})},onSuccess:function(){p({type:"success",message:d("Moderation_Message_deleted")})},onSettled:function(){t(),g.invalidateQueries({queryKey:["moderation.reports"]}),y()}});return function(){y(l.createElement(f,{confirmText:d("Moderation_Dismiss_and_delete"),title:d("Moderation_Delete_this_message"),variant:"danger",onConfirm:function(){return o.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.awrap(M.mutateAsync({msgId:e,roomId:n,asUser:!0}));case 2:case"end":return t.stop()}},null,null,null,Promise)},onCancel:function(){return y()}},d("Moderation_Are_you_sure_you_want_to_delete_this_message")))}})}
//# sourceMappingURL=/dynamic/client/views/admin/moderation/hooks/abc8297ba5e4da06662ef9d4854ef8eef6ca4cd3.map