function module(e,n,t){var o,r,c,i,u,a,s,l,f,k,d;t.link("@babel/runtime/regenerator",{default:function(e){o=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){r=e}},0),t.link("@rocket.chat/fuselage-tokens/colors",{default:function(e){c=e}},1),t.link("@rocket.chat/ui-client",{HeaderState:function(e){i=e}},2),t.link("@rocket.chat/ui-contexts",{useSetting:function(e){u=e},usePermission:function(e){a=e},useTranslation:function(e){s=e},useEndpoint:function(e){l=e}},3),t.link("react",{default:function(e){f=e},memo:function(e){k=e}},4),t.link("../../../../lib/toast",{dispatchToastMessage:function(e){d=e}},5),t.exportDefault(k(function(e){var n=e.room,t=s(),k=u("E2E_Enable"),m=l("POST","/v1/rooms.saveRoomSettings"),p=a("toggle-room-e2e-encryption"),y=p?t("Encrypted_key_title"):t("Encrypted"),b=r(function(){return o.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(p){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,o.awrap(m({rid:n._id,encrypted:!n.encrypted}));case 4:if(e.sent.success){e.next=8;break}return e.abrupt("return");case 8:d({type:"success",message:t("E2E_Encryption_disabled_for_room",{roomName:n.name})});case 9:case"end":return e.stop()}},null,null,null,Promise)});return k&&null!=n&&n.encrypted?f.createElement(i,{title:y,icon:"key",onClick:b,color:c.g500,tiny:!0}):null}))}
//# sourceMappingURL=/dynamic/client/views/room/Header/icons/bd5b26cb46f100a9b609593a35e8f6c440e03f23.map