function module(e,n,t){let a,l,o,s,i,r,u,m;t.link("@rocket.chat/fuselage",{Skeleton(e){a=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation(e){l=e}},1),t.link("react",{default(e){o=e},useMemo(e){s=e}},2),t.link("../../../../../components/GenericModal",{default(e){i=e}},3),t.link("../../../../../hooks/useEndpointData",{useEndpointData(e){r=e}},4),t.link("../../../../../lib/asyncState",{AsyncStatePhase(e){u=e}},5),t.link("./BaseRemoveUsersModal",{default(e){m=e}},6);let c={user:{username:""}};t.exportDefault(e=>{let{teamId:n,userId:t,onClose:d,onCancel:f,onConfirm:k}=e,v=l(),{value:h,phase:p}=r("/v1/teams.listRoomsOfUser",{params:s(()=>({teamId:n,userId:t}),[n,t])}),C=r("/v1/users.info",{params:s(()=>({userId:t}),[t]),initialValue:c}),{user:{username:E}}=null==C?void 0:C.value;return p===u.LOADING?o.createElement(i,{variant:"warning",onClose:d,title:o.createElement(a,{width:"50%"}),confirmText:v("Cancel"),onConfirm:d},o.createElement(a,{width:"full"})):o.createElement(m,{onClose:d,username:E,onCancel:f,onConfirm:k,rooms:null==h?void 0:h.rooms})})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/members/RemoveUsersModal/c49700742bc69145531c2f87236c425c9912a4db.map