function module(e,n,o){let l,t,a,r,i,s,m;let c=["onClose","onCancel","onConfirm","username","results","rooms","onToggleAllRooms","onChangeRoomSelection","selectedRooms","eligibleRoomsLength"];o.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),o.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){t=e}},1),o.link("@rocket.chat/fuselage",{Box(e){a=e}},0),o.link("@rocket.chat/ui-contexts",{useTranslation(e){r=e}},1),o.link("react",{default(e){i=e}},2),o.link("../../../../../components/GenericModal",{default(e){s=e}},3),o.link("../../../ChannelDesertionTable",{default(e){m=e}},4),o.exportDefault(e=>{let{onClose:n,onCancel:o,onConfirm:u,username:_,results:g,rooms:h,onToggleAllRooms:f,onChangeRoomSelection:C,selectedRooms:b,eligibleRoomsLength:d}=e,k=t(e,c),R=r();return i.createElement(s,l({variant:"warning",icon:"warning",title:R("Teams_removing_member"),cancelText:R("Cancel"),confirmText:R("Continue"),onClose:n,onCancel:o,onConfirm:u},k),i.createElement(a,{mbe:24,fontScale:"p2"},R("Select_the_channels_you_want_the_user_to_be_removed_from")),i.createElement(m,{lastOwnerWarning:R("Teams_channels_last_owner_leave_channel_warning"),onToggleAllRooms:f,rooms:h,params:{},onChangeParams:()=>{},onChangeRoomSelection:C,selectedRooms:b,eligibleRoomsLength:d}))})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/members/RemoveUsersModal/6e13a42c21ddbebdbdacd2dfecc521877808b835.map