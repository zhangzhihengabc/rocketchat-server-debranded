function module(e,n,o){o.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},0),o.export({useEditRoomInitialValues:function(){return a}}),o.link("@rocket.chat/ui-contexts",{useSetting:function(e){t=e}},0),o.link("react",{useMemo:function(e){r=e}},1),o.link("../../../../../lib/rooms/roomCoordinator",{roomCoordinator:function(e){l=e}},2);var i,t,r,l,u=function(e){switch(e){case"c":return"Channels";case"p":return"Groups";case"d":return"DMs"}},a=function(e){var n=e.t,o=e.ro,a=e.archived,d=e.topic,c=e.description,s=e.announcement,m=e.joinCodeRequired,y=e.sysMes,v=e.encrypted,p=e.retention,f=e.reactWhenReadOnly,h=t("RetentionPolicy_Enabled"),R=t("RetentionPolicy_MaxAge_"+u(e.t))||30,A=t("RetentionPolicy_AppliesTo"+u(e.t)),b=t("RetentionPolicy_DoNotPrunePinned"),P=t("RetentionPolicy_FilesOnly");return r(function(){var t,r,u;return i({roomName:"d"===n&&e.usernames?e.usernames.join(" x "):l.getRoomName(n,e),roomType:n,readOnly:!!o,reactWhenReadOnly:f,archived:!!a,roomTopic:null!=d?d:"",roomDescription:null!=c?c:"",roomAnnouncement:null!=s?s:"",roomAvatar:void 0,joinCode:"",joinCodeRequired:!!m,systemMessages:Array.isArray(y)?y:[],hideSysMes:Array.isArray(y)?!!(null!=y&&y.length):!!y,encrypted:v},h&&{retentionEnabled:null!==(t=null==p?void 0:p.enabled)&&void 0!==t?t:A,retentionOverrideGlobal:!!(null!=p&&p.overrideGlobal),retentionMaxAge:Math.min(null==p?void 0:p.maxAge,R)||R,retentionExcludePinned:null!==(r=null==p?void 0:p.excludePinned)&&void 0!==r?r:b,retentionFilesOnly:null!==(u=null==p?void 0:p.filesOnly)&&void 0!==u?u:P})},[s,a,c,b,P,m,R,p,A,h,o,e,y,n,d,v,f])}}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Info/EditRoomInfo/38b7e7aa3ec07d4f48afcf6ff796ae64325d4852.map