function module(n,e,t){t.link("@babel/runtime/regenerator",{default:function(n){o=n}},0),t.export({useDismissMessageAction:function(){return m}}),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(n){s=n},useSetModal:function(n){i=n},useToastMessageDispatch:function(n){r=n},useTranslation:function(n){u=n}},0),t.link("@tanstack/react-query",{useMutation:function(n){a=n},useQueryClient:function(n){c=n}},1),t.link("react",{default:function(n){f=n}},2),t.link("../../../../components/GenericModal",{default:function(n){l=n}},3);var o,s,i,r,u,a,c,f,l,m=function(n){var e=u(),t=i(),m=r(),d=c(),p=a({mutationFn:s("POST","/v1/moderation.dismissReports"),onError:function(n){m({type:"error",message:n})},onSuccess:function(){m({type:"success",message:e("Moderation_Reports_dismissed")})}}),M=function(){t(f.createElement(l,{title:e("Moderation_Dismiss_reports"),confirmText:e("Moderation_Dismiss_reports"),variant:"danger",onConfirm:function(){return o.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.awrap(p.mutateAsync({msgId:n}));case 2:d.invalidateQueries({queryKey:["moderation.userMessages"]}),t();case 4:case"end":return e.stop()}},null,null,null,Promise)},onCancel:function(){return t()}},e("Moderation_Dismiss_reports_confirm")))};return{action:function(){return M()}}}}
//# sourceMappingURL=/dynamic/client/views/admin/moderation/hooks/55ce3e8e7821a8b6a38d2fd058849687b1300379.map