function module(e,n,t){var a,l,u,r,o,i,c,f,m,s,v,d,k,p,b,h,g=["value","onChange"],E=["value","label"];t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){l=e}},1),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},2),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},3),t.link("@rocket.chat/fuselage",{AutoComplete:function(e){o=e},Option:function(e){i=e},Box:function(e){c=e}},0),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){f=e}},1),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){m=e}},2),t.link("@tanstack/react-query",{useQuery:function(e){s=e}},3),t.link("react",{default:function(e){v=e},memo:function(e){d=e},useMemo:function(e){k=e},useState:function(e){p=e}},4),t.link("../avatar/RoomAvatar",{default:function(e){b=e}},5),t.link("./Avatar",{default:function(e){h=e}},6);var y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{selector:JSON.stringify({name:e})}};t.exportDefault(d(function(e){var n,t=e.value,d=e.onChange,A=r(e,g),S=u(p(""),2),x=S[0],C=S[1],P=f(x,300),T=m("GET","/v1/rooms.autocomplete.channelAndPrivate"),D=s(["rooms.autocomplete.channelAndPrivate",P],function(){return T(y(P))},{keepPreviousData:!0}),j=k(function(){return D.isSuccess?D.data.items.map(function(e){var n=e.name;return{value:e._id,label:{name:n,avatarETag:e.avatarETag,type:e.t}}}):[]},[null===(n=D.data)||void 0===n?void 0:n.items,D.isSuccess]);return v.createElement(o,a({},A,{value:t,onChange:d,filter:x,setFilter:C,renderSelected:function(e){var n=e.selected,t=n.value,a=n.label;return v.createElement(v.Fragment,null,v.createElement(c,{margin:"none",mi:2},v.createElement(b,{size:"x20",room:l({type:(null==a?void 0:a.type)||"c",_id:t},a)})),v.createElement(c,{margin:"none",mi:2},null==a?void 0:a.name))},renderItem:function(e){var n=e.value,t=e.label,l=r(e,E);return v.createElement(i,a({key:n},l,{label:t.name,avatar:v.createElement(h,a({value:n},t))}))},options:j}))}))}
//# sourceMappingURL=/dynamic/client/components/RoomAutoComplete/5ea0d732649c7a316e99ca2aba12d974015af76e.map