function module(e,n,t){var o,l,a,i,c,r,u,f,m,s,C,d;t.link("@rocket.chat/fuselage",{Button:function(e){o=e},ButtonGroup:function(e){l=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){a=e}},1),t.link("react",{default:function(e){i=e}},2),t.link("react-hook-form",{useFormContext:function(e){c=e}},3),t.link("../../../../components/Contextualbar",{ContextualbarHeader:function(e){r=e},ContextualbarIcon:function(e){u=e},ContextualbarTitle:function(e){f=e},ContextualbarClose:function(e){m=e},ContextualbarScrollableContent:function(e){s=e},ContextualbarFooter:function(e){C=e}},4),t.link("./NotificationPreferencesForm",{default:function(e){d=e}},5),t.exportDefault(function(e){var n=e.handleClose,t=e.handleSave,k=e.notificationOptions,b=e.handlePlaySound,E=a(),x=c().formState,h=x.isDirty,S=x.isSubmitting;return i.createElement(i.Fragment,null,i.createElement(r,null,i.createElement(u,{name:"bell"}),i.createElement(f,null,E("Notifications_Preferences")),n&&i.createElement(m,{onClick:n})),i.createElement(s,null,i.createElement(d,{notificationOptions:k,handlePlaySound:b})),i.createElement(C,null,i.createElement(l,{stretch:!0},n&&i.createElement(o,{onClick:n},E("Cancel")),i.createElement(o,{primary:!0,disabled:!h,loading:S,onClick:t},E("Save")))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/NotificationPreferences/8c242a7e98d856268d52b3217f9fa4d3460442d1.map