function module(e,t,s){let r,n,o,a,i,u,l,c,d,p;s.export({useReportUser:()=>m}),s.link("@rocket.chat/ui-contexts",{useEndpoint(e){r=e},useSetModal(e){n=e},useToastMessageDispatch(e){o=e},useUserId(e){a=e}},0),s.link("@tanstack/react-query",{useMutation(e){i=e}},1),s.link("react",{default(e){u=e},useMemo(e){l=e}},2),s.link("react-i18next",{useTranslation(e){c=e}},3),s.link("../../../../../hooks/useUserDisplayName",{useUserDisplayName(e){d=e}},4),s.link("../../../contextualBar/UserInfo/ReportUserModal",{default(e){p=e}},5);let m=e=>{let{_id:t,username:s,name:m}=e,k=a(),y=n(),{t:U}=c(),f=o(),g=d({username:s,name:m}),M=r("POST","/v1/moderation.reportUser"),h=i(["reportUser",t],async e=>{M({description:e,userId:t})},{onSuccess:()=>f({type:"success",message:U("Report_has_been_sent")}),onError:e=>f({type:"error",message:e}),onSettled:()=>y()}),x=l(()=>k!==t?{icon:"warning",content:U("Report"),onClick:()=>y(u.createElement(p,{onConfirm:h.mutate,onClose:()=>y(),displayName:g||"",username:s||""})),type:"moderation",variant:"danger"}:void 0,[k,t,U,y,s,h.mutate,g]);return x}}
//# sourceMappingURL=/dynamic/client/views/room/hooks/useUserInfoActions/actions/e1bfe3dde80daeb73f9ac8e4a4d02579860e29dd.map