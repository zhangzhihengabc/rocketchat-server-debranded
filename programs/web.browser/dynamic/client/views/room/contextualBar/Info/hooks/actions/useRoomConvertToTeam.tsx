function module(e,n,t){let o,a,l,s,c,r,i,u,m,d;t.export({useRoomConvertToTeam:()=>k}),t.link("@rocket.chat/core-typings",{isRoomFederated(e){o=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){a=e}},1),t.link("@rocket.chat/ui-contexts",{useSetModal(e){l=e},useToastMessageDispatch(e){s=e},useTranslation(e){c=e},useEndpoint(e){r=e},usePermission(e){i=e}},2),t.link("react",{default(e){u=e}},3),t.link("../../../../../../components/GenericModal",{default(e){m=e}},4),t.link("../useCanEditRoom",{useCanEditRoom(e){d=e}},5);let k=e=>{let n=c(),t=l(),k=s(),h=d(e),C=i("create-team"),T=!o(e)&&C,p=!e.teamId&&!e.prid&&T&&h,v=r("POST","c"===e.t?"/v1/channels.convertToTeam":"/v1/groups.convertToTeam"),_=a(async()=>{let o=async()=>{try{await v("c"===e.t?{channelId:e._id}:{roomId:e._id}),k({type:"success",message:n("Room_has_been_converted")})}catch(e){k({type:"error",message:e})}finally{t(null)}};t(u.createElement(m,{title:n("Confirmation"),variant:"warning",onClose:()=>t(null),onCancel:()=>t(null),onConfirm:o,confirmText:n("Convert")},n("Converting_channel_to_a_team")))});return p?_:null}}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Info/hooks/actions/fb7b258c9bd43730b4250621279913c36e6206cb.map