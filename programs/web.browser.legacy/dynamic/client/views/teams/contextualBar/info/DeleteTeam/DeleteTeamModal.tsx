function module(e,n,t){t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){r=e}},0),t.link("react",{default:function(e){l=e},useState:function(e){u=e}},1),t.link("./DeleteTeamChannels",{default:function(e){f=e}},2),t.link("./DeleteTeamConfirmation",{default:function(e){a=e}},3);var o,i,r,l,u,f,a,c={LIST_ROOMS:"LIST_ROOMS",CONFIRM_DELETE:"CONFIRM_DELETE"};t.exportDefault(function(e){var n=e.onCancel,t=e.onConfirm,m=e.rooms,d=m&&m.length>0,E=i(u(d?c.LIST_ROOMS:c.CONFIRM_DELETE),2),s=E[0],O=E[1],C=i(u({}),2),R=C[0],_=C[1],T=i(u({}),2),S=T[0],b=T[1],k=r(function(e){if(R[e._id]){_(function(n){return delete n[e._id],o({},n)});return}_(function(n){var t;return o(o({},n),{},((t={})[e._id]=e,t))})}),M=r(function(){if(0===Object.values(R).filter(Boolean).length)return _(Object.fromEntries(m.map(function(e){return[e._id,e]})));_({})}),I=r(function(){b(Object.fromEntries(m.filter(function(e){return!R[e._id]}).map(function(e){return[e._id,e]}))),O(c.CONFIRM_DELETE)});return s===c.CONFIRM_DELETE?l.createElement(a,{onConfirm:t,onReturn:d?function(){return O(c.LIST_ROOMS)}:void 0,onCancel:n,deletedRooms:R,keptRooms:S}):l.createElement(f,{rooms:m,onCancel:n,selectedRooms:R,onToggleAllRooms:M,onConfirm:I,onChangeRoomSelection:k})})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/info/DeleteTeam/117364237c003e0c55552083b017c6141e503620.map