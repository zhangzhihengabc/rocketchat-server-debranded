function module(n,e,t){var o,i,c,l,a,u,r,s,f,k;t.link("@babel/runtime/helpers/extends",{default:function(n){o=n}},0),t.link("@rocket.chat/ui-client",{HeaderToolbox:function(n){i=n},HeaderToolboxAction:function(n){c=n},HeaderToolboxDivider:function(n){l=n}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(n){a=n}},1),t.link("react",{default:function(n){u=n},memo:function(n){r=n}},2),t.link("../../../contexts/RoomContext",{useOmnichannelRoom:function(n){s=n}},3),t.link("./QuickActionOptions",{default:function(n){f=n}},4),t.link("./hooks/useQuickActions",{useQuickActions:function(n){k=n}},5),t.exportDefault(r(function(n){var e=n.className,t=a(),r=s(),m=k(),d=m.quickActions,x=m.actionDefault;return u.createElement(i,{"aria-label":t("Omnichannel_quick_actions")},d.map(function(n,i){var l=n.id,a=n.color,s=n.icon,k=n.title,m=n.action,d=n.options,h={id:l,icon:s,color:a,title:t(k),className:e,index:i,primary:!1,action:void 0===m?x:m,room:r};return d?u.createElement(f,o({options:d},h,{key:l})):u.createElement(c,o({},h,{key:l}))}),d.length>0&&u.createElement(l,null))}))}
//# sourceMappingURL=/dynamic/client/views/room/Header/Omnichannel/QuickActions/993b3b61ec1252fa56149fba5fd0b258399d78cd.map