function module(e,i,o){let n,r,l,d,t,u;o.export({actionAllowed:()=>R,isEditableByTheUser:()=>c,canCreateInviteLinks:()=>_,isRoomSettingAllowed:()=>S}),o.link("@rocket.chat/core-typings",{isRoomFederated(e){n=e},isDirectMessageRoom(e){r=e},isPublicRoom(e){l=e}},0),o.link("../../../app/models/client",{RoomRoles(e){d=e}},1),o.link("../../../definition/IRoomTypeConfig",{RoomMemberActions(e){t=e},RoomSettingsEnum(e){u=e}},2);let s=[t.REMOVE_USER,t.SET_AS_OWNER,t.SET_AS_MODERATOR],E=[u.NAME,u.TOPIC],R=(e,i,o,l)=>{var u,E;if(!n(e)||r(e))return!1;let R=!(null!=l&&l.roles);if(!l||R)return!1;let c=(null===(u=l.u)||void 0===u?void 0:u._id)===o,_=i===t.REMOVE_USER&&c;if(_)return!1;let S=(null===(E=d.findOne({rid:e._id,"u._id":o}))||void 0===E?void 0:E.roles)||[],m=l.roles||[];if(m.includes("owner")){if(i===t.SET_AS_OWNER||i===t.SET_AS_MODERATOR)return!S.includes("owner")||c;if(i===t.REMOVE_USER)return!S.includes("owner");let e=s.includes(i);return e}if(m.includes("moderator")){if(S.includes("owner"))return!1;if(S.includes("moderator"))return i===t.SET_AS_MODERATOR&&c;let e=i===t.SET_AS_MODERATOR||i===t.REMOVE_USER;return e}return!1},c=(e,i,o)=>{var r,l;return!!e&&!!i&&!!o&&n(i)&&!!((null===(r=o.roles)||void 0===r?void 0:r.includes("owner"))||(null===(l=o.roles)||void 0===l?void 0:l.includes("moderator")))},_=(e,i,o)=>{var r,d;return!!e&&!!i&&!!o&&n(i)&&l(i)&&!!((null===(r=o.roles)||void 0===r?void 0:r.includes("owner"))||(null===(d=o.roles)||void 0===d?void 0:d.includes("moderator")))},S=(e,i)=>!(!n(e)||r(e))&&E.includes(i)}
//# sourceMappingURL=/dynamic/client/lib/federation/c69111ef6b666cde51d23bfd3016ba6d54d52c3e.map