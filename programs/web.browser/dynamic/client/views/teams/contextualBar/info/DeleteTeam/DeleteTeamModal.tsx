function module(e,t,l){let o,n,a,i,r,m;l.link("@babel/runtime/helpers/objectSpread2",{default(e){o=e}},0),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){n=e}},0),l.link("react",{default(e){a=e},useState(e){i=e}},1),l.link("./DeleteTeamChannels",{default(e){r=e}},2),l.link("./DeleteTeamConfirmation",{default(e){m=e}},3);let E={LIST_ROOMS:"LIST_ROOMS",CONFIRM_DELETE:"CONFIRM_DELETE"};l.exportDefault(e=>{let{onCancel:t,onConfirm:l,rooms:d}=e,u=d&&d.length>0,[f,O]=i(u?E.LIST_ROOMS:E.CONFIRM_DELETE),[c,s]=i({}),[R,_]=i({}),C=n(e=>{if(c[e._id]){s(t=>(delete t[e._id],o({},t)));return}s(t=>o(o({},t),{},{[e._id]:e}))}),T=n(()=>{if(0===Object.values(c).filter(Boolean).length)return s(Object.fromEntries(d.map(e=>[e._id,e])));s({})}),S=n(()=>{let e=Object.fromEntries(d.filter(e=>!c[e._id]).map(e=>[e._id,e]));_(e),O(E.CONFIRM_DELETE)});return f===E.CONFIRM_DELETE?a.createElement(m,{onConfirm:l,onReturn:u?()=>O(E.LIST_ROOMS):void 0,onCancel:t,deletedRooms:c,keptRooms:R}):a.createElement(r,{rooms:d,onCancel:t,selectedRooms:c,onToggleAllRooms:T,onConfirm:S,onChangeRoomSelection:C})})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/info/DeleteTeam/f3b5bea6d353420b938b18ce4bb93ea198572590.map