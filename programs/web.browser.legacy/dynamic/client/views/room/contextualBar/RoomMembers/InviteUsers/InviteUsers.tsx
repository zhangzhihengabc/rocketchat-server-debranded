function module(n,e,t){var l,i,a,o,c,r,u,k,C,f;t.link("@rocket.chat/fuselage",{Callout:function(n){l=n}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(n){i=n}},1),t.link("react",{default:function(n){a=n}},2),t.link("../../../../../components/Contextualbar",{ContextualbarHeader:function(n){o=n},ContextualbarTitle:function(n){c=n},ContextualbarBack:function(n){r=n},ContextualbarClose:function(n){u=n},ContextualbarScrollableContent:function(n){k=n}},3),t.link("./EditInviteLink",{default:function(n){C=n}},4),t.link("./InviteLink",{default:function(n){f=n}},5),t.exportDefault(function(n){var e=n.onClickBackMembers,t=n.onClickBackLink,s=n.onClickNewLink,d=n.onClose,x=n.isEditing,m=n.onClickEdit,E=n.daysAndMaxUses,b=n.captionText,T=n.linkText,g=n.error,p=i();return a.createElement(a.Fragment,null,a.createElement(o,null,(e||t)&&a.createElement(r,{onClick:x?t:e}),a.createElement(c,null,p("Invite_Users")),d&&a.createElement(u,{onClick:d})),a.createElement(k,null,g&&a.createElement(l,{type:"danger"},g.toString()),x&&!g&&a.createElement(C,{onClickNewLink:s,daysAndMaxUses:E}),!x&&!g&&a.createElement(f,{captionText:b,onClickEdit:m,linkText:T})))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/RoomMembers/InviteUsers/8cb07c1086bdb6c0262f6d716c5f41b143828a0e.map