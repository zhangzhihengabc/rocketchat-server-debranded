function module(o,t,e){let i,n,l,s,a,u,d,r,c,f,m;e.link("@rocket.chat/ui-contexts",{useTranslation(o){i=o},useCustomSound(o){n=o}},0),e.link("react",{default(o){l=o},memo(o){s=o}},1),e.link("react-hook-form",{useForm(o){a=o},FormProvider(o){u=o}},2),e.link("../../../../hooks/useEndpointAction",{useEndpointAction(o){d=o}},3),e.link("../../contexts/RoomContext",{useRoom(o){r=o},useRoomSubscription(o){c=o}},4),e.link("../../contexts/RoomToolboxContext",{useRoomToolbox(o){f=o}},5),e.link("./NotificationPreferences",{default(o){m=o}},6),e.exportDefault(s(()=>{var o;let t=i(),e=r(),s=c(),{closeTab:p}=f(),h=n(),k=d("POST","/v1/rooms.saveNotification",{successMessage:t("Room_updated_successfully")}),N=null==h?void 0:null===(o=h.getList())||void 0===o?void 0:o.map(o=>[o._id,o.name]),b=[["default",t("Default")],["all",t("All_messages")],["mentions",t("Mentions")],["nothing",t("Nothing")]],v=[["none",t("None")],["default",t("Default")]],S={alerts:b,sounds:N?[...v,...N]:v},P=a({defaultValues:{turnOn:!(null!=s&&s.disableNotifications),muteGroupMentions:!!(null!=s&&s.muteGroupMentions),showCounter:!(null!=s&&s.hideUnreadStatus),showMentions:!(null!=s&&s.hideMentionStatus),desktopAlert:(null==s?void 0:s.desktopPrefOrigin)==="subscription"&&s.desktopNotifications||"default",desktopSound:(null==s?void 0:s.audioNotificationValue)||"default",mobileAlert:(null==s?void 0:s.mobilePrefOrigin)==="subscription"&&s.mobilePushNotifications||"default",emailAlert:(null==s?void 0:s.emailPrefOrigin)==="subscription"&&s.emailNotifications||"default"}}),{desktopSound:g}=P.watch(),x=P.handleSubmit(o=>{let{turnOn:t,muteGroupMentions:i,showCounter:n,showMentions:l,desktopAlert:s,desktopSound:a,mobileAlert:u,emailAlert:d}=o;k({roomId:e._id,notifications:{disableNotifications:t?"0":"1",muteGroupMentions:i?"1":"0",hideUnreadStatus:n?"0":"1",hideMentionStatus:l?"0":"1",desktopNotifications:s,audioNotificationValue:a,mobilePushNotifications:u,emailNotifications:d}})});return l.createElement(u,P,l.createElement(m,{handleClose:p,handleSave:x,handlePlaySound:()=>{h.play(g)},notificationOptions:S}))}))}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/NotificationPreferences/6d770e06c42603c9cabf3fabd8f170c7613aebe7.map