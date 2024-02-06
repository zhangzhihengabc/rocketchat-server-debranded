function module(e,n,t){var l,a,c,o,i,r,u,m,f,d,s,E,b,k,h,p,C,x,T,v,y,A,D,_=["label"];t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/extends",{default:function(e){c=e}},2),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){o=e}},3),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},4),t.link("@rocket.chat/fuselage",{Box:function(e){r=e},Button:function(e){u=e},Callout:function(e){m=e},Option:function(e){f=e},Menu:function(e){d=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){s=e}},1),t.link("react",{default:function(e){E=e},useMemo:function(e){b=e}},2),t.link("../../../../components/Contextualbar",{ContextualbarHeader:function(e){k=e},ContextualbarIcon:function(e){h=e},ContextualbarTitle:function(e){p=e},ContextualbarClose:function(e){C=e},ContextualbarScrollableContent:function(e){x=e}},3),t.link("../../../../components/InfoPanel",{default:function(e){T=e}},4),t.link("../../../../components/InfoPanel/RetentionPolicyCallout",{default:function(e){v=e}},5),t.link("../../../../components/MarkdownText",{default:function(e){y=e}},6),t.link("../../../../components/avatar/RoomAvatar",{default:function(e){A=e}},7),t.link("../../../hooks/useActionSpread",{useActionSpread:function(e){D=e}},8),t.exportDefault(function(e){var n=e.room,t=e.retentionPolicy,P=e.onClickHide,S=e.onClickClose,g=e.onClickLeave,w=e.onClickEdit,L=e.onClickDelete,F=e.onClickViewChannels,B=e.onClickConvertToChannel,I=s(),H=t.retentionPolicyEnabled,M=t.filesOnlyDefault,O=t.excludePinnedDefault,R=t.maxAgeDefault,j=D(b(function(){return i(i(i(i(i({},w&&{edit:{label:I("Edit"),action:w,icon:"edit"}}),L&&{delete:{label:I("Delete"),action:L,icon:"trash"}}),B&&{convertToChannel:{label:I("Convert_to_channel"),action:B,icon:"hash"}}),P&&{hide:{label:I("Hide"),action:P,icon:"eye-off"}}),g&&{leave:{label:I("Leave"),action:g,icon:"sign-out"}})},[I,P,g,w,L,B])),V=j.actions,z=j.menu,G=b(function(){return z?E.createElement(d,{small:!1,flexShrink:0,mi:2,key:"menu",maxHeight:"initial",secondary:!0,renderItem:function(e){var n=e.label,t=n.label,l=n.icon,a=o(e,_);return E.createElement(f,c({},a,{label:t,icon:l}))},options:z}):null},[z]),W=b(function(){return[].concat(l(V.map(function(e){var n=a(e,2),t=n[0],l=n[1],c=l.label,o=l.icon,i=l.action;return E.createElement(T.Action,{key:t,label:c,onClick:i,icon:o})})),[G]).filter(Boolean)},[V,G]);return E.createElement(E.Fragment,null,E.createElement(k,null,E.createElement(h,{name:"info-circled"}),E.createElement(p,null,I("Teams_Info")),S&&E.createElement(C,{onClick:S})),E.createElement(x,{p:24},E.createElement(T,null,E.createElement(T.Avatar,null,E.createElement(A,{size:"x332",room:n})),E.createElement(T.ActionGroup,null,W),E.createElement(T.Section,null,n.archived&&E.createElement(r,{mb:16},E.createElement(m,{type:"warning"},I("Room_archived")))),E.createElement(T.Section,null,E.createElement(T.Title,{title:n.fname||n.name||"",icon:"team"})),E.createElement(T.Section,null,n.broadcast&&E.createElement(T.Field,null,E.createElement(T.Label,null,E.createElement("b",null,I("Broadcast_channel"))," ",I("Broadcast_channel_Description"))),n.description&&E.createElement(T.Field,null,E.createElement(T.Label,null,I("Description")),E.createElement(T.Text,{withTruncatedText:!1},E.createElement(y,{variant:"inline",content:n.description}))),n.announcement&&E.createElement(T.Field,null,E.createElement(T.Label,null,I("Announcement")),E.createElement(T.Text,{withTruncatedText:!1},E.createElement(y,{variant:"inline",content:n.announcement}))),n.topic&&E.createElement(T.Field,null,E.createElement(T.Label,null,I("Topic")),E.createElement(T.Text,{withTruncatedText:!1},E.createElement(y,{variant:"inline",content:n.topic}))),F&&E.createElement(T.Field,null,E.createElement(T.Label,null,I("Teams_channels")),E.createElement(T.Text,null,E.createElement(u,{onClick:F,small:!0},I("View_channels")))),H&&E.createElement(v,{filesOnlyDefault:M,excludePinnedDefault:O,maxAgeDefault:R})))))})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/info/3f51b2070dac9dc5f98163d2f5f48aec33c9af73.map