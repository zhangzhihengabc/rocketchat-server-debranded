function module(e,t,s){let o,n,r,u;s.export({useRoomExportMutation:()=>a}),s.link("@rocket.chat/ui-contexts",{useEndpoint(e){o=e},useToastMessageDispatch(e){n=e},useTranslation(e){r=e}},0),s.link("@tanstack/react-query",{useMutation(e){u=e}},1);let a=()=>{let e=r(),t=o("POST","/v1/rooms.export"),s=n();return u({mutationFn:t,onSuccess:()=>{s({type:"success",message:e("Your_email_has_been_queued_for_sending")})},onError:e=>{s({type:"error",message:e})}})}}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/ExportMessages/4524e96b80b762769953e9b77e3dde5f1bf0ebd8.map