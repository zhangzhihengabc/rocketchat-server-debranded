function module(n,e,t){t.link("@babel/runtime/regenerator",{default:function(n){r=n}},0),t.export({useReportUser:function(){return p}}),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(n){o=n},useSetModal:function(n){u=n},useToastMessageDispatch:function(n){s=n},useUserId:function(n){i=n}},0),t.link("@tanstack/react-query",{useMutation:function(n){a=n}},1),t.link("react",{default:function(n){c=n},useMemo:function(n){l=n}},2),t.link("react-i18next",{useTranslation:function(n){f=n}},3),t.link("../../../../../hooks/useUserDisplayName",{useUserDisplayName:function(n){m=n}},4),t.link("../../../contextualBar/UserInfo/ReportUserModal",{default:function(n){d=n}},5);var r,o,u,s,i,a,c,l,f,m,d,p=function(n){var e=n._id,t=n.username,p=n.name,k=i(),y=u(),U=f().t,g=s(),v=m({username:t,name:p}),h=o("POST","/v1/moderation.reportUser"),x=a(["reportUser",e],function(n){return r.async(function(t){for(;;)switch(t.prev=t.next){case 0:h({description:n,userId:e});case 1:case"end":return t.stop()}},null,null,null,Promise)},{onSuccess:function(){return g({type:"success",message:U("Report_has_been_sent")})},onError:function(n){return g({type:"error",message:n})},onSettled:function(){return y()}});return l(function(){return k!==e?{icon:"warning",content:U("Report"),onClick:function(){return y(c.createElement(d,{onConfirm:x.mutate,onClose:function(){return y()},displayName:v||"",username:t||""}))},type:"moderation",variant:"danger"}:void 0},[k,e,U,y,t,x.mutate,v])}}
//# sourceMappingURL=/dynamic/client/views/room/hooks/useUserInfoActions/actions/07c5bd9b5e5f67a208a074df273871491b930776.map