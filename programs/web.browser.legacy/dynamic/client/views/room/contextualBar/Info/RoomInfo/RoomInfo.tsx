function module(e,n,t){var l,o,a,c,i,r,u,m,f,s,E,d,k,b,x,p,C,h,T,A,v,y,R,P,S=["label"];t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},1),t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},2),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){c=e}},3),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Callout:function(e){r=e},Menu:function(e){u=e},Option:function(e){m=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){f=e}},1),t.link("react",{default:function(e){s=e},useMemo:function(e){E=e}},2),t.link("../../../../../components/Contextualbar",{ContextualbarHeader:function(e){d=e},ContextualbarScrollableContent:function(e){k=e},ContextualbarBack:function(e){b=e},ContextualbarIcon:function(e){x=e},ContextualbarClose:function(e){p=e},ContextualbarTitle:function(e){C=e}},3),t.link("../../../../../components/InfoPanel",{default:function(e){h=e}},4),t.link("../../../../../components/InfoPanel/RetentionPolicyCallout",{default:function(e){T=e}},5),t.link("../../../../../components/MarkdownText",{default:function(e){A=e}},6),t.link("../../../../../components/avatar/RoomAvatar",{default:function(e){v=e}},7),t.link("../../../../hooks/useActionSpread",{useActionSpread:function(e){y=e}},8),t.link("../../../body/hooks/useRetentionPolicy",{useRetentionPolicy:function(e){R=e}},9),t.link("../hooks/useRoomActions",{useRoomActions:function(e){P=e}},10),t.exportDefault(function(e){var n=e.room,t=e.icon,g=e.onClickBack,B=e.onClickClose,D=e.onClickEnterRoom,w=e.onClickEdit,F=e.resetState,I=f(),_=n.name,L=n.fname,M=n.description,O=n.topic,H=n.archived,j=n.broadcast,z=n.announcement,G=L||_,W=R(n),q=y(P(n,{onClickEnterRoom:D,onClickEdit:w},F)),J=q.actions,K=q.menu,N=E(function(){return K?s.createElement(u,{small:!1,flexShrink:0,mi:4,key:"menu",maxHeight:"initial",secondary:!0,renderItem:function(e){var n=e.label,t=n.label,l=n.icon,o=c(e,S);return s.createElement(m,a({},o,{label:t,icon:l}))},options:K}):null},[K]),Q=E(function(){return[].concat(l(J.map(function(e){var n=o(e,2),t=n[0],l=n[1],a=l.label,c=l.icon,i=l.action;return s.createElement(h.Action,{key:t,label:a,onClick:i,icon:c})})),[N]).filter(Boolean)},[J,N]);return s.createElement(s.Fragment,null,s.createElement(d,null,g?s.createElement(b,{onClick:g}):s.createElement(x,{name:"info-circled"}),s.createElement(C,null,I("Room_Info")),B&&s.createElement(p,{onClick:B})),s.createElement(k,{p:24},s.createElement(h,null,s.createElement(h.Avatar,null,s.createElement(v,{size:"x332",room:n})),s.createElement(h.ActionGroup,null,Q),H&&s.createElement(h.Section,null,s.createElement(i,{mb:16},s.createElement(r,{type:"warning"},I("Room_archived")))),G&&s.createElement(h.Section,null,s.createElement(h.Title,{title:G,icon:t})),s.createElement(h.Section,null,j&&s.createElement(h.Field,null,s.createElement(h.Label,null,s.createElement("b",null,I("Broadcast_channel"))," ",I("Broadcast_channel_Description"))),M&&""!==M&&s.createElement(h.Field,null,s.createElement(h.Label,null,I("Description")),s.createElement(h.Text,{withTruncatedText:!1},s.createElement(A,{variant:"inline",content:M}))),z&&""!==z&&s.createElement(h.Field,null,s.createElement(h.Label,null,I("Announcement")),s.createElement(h.Text,{withTruncatedText:!1},s.createElement(A,{variant:"inline",content:z}))),O&&""!==O&&s.createElement(h.Field,null,s.createElement(h.Label,null,I("Topic")),s.createElement(h.Text,{withTruncatedText:!1},s.createElement(A,{variant:"inline",content:O}))),W&&s.createElement(T,{filesOnlyDefault:W.filesOnly,excludePinnedDefault:W.excludePinned,maxAgeDefault:W.maxAge})))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Info/RoomInfo/c9312858ff2b3a0c9e052ef4eead9cc06ff4ce4b.map