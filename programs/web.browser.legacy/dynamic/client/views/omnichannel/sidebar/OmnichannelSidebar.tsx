function module(e,n,t){var i,r,o,l,u,a,c,s,m,f,d;t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){i=e},useLayout:function(e){r=e},useCurrentRoutePath:function(e){o=e}},0),t.link("react",{default:function(e){l=e},memo:function(e){u=e}},1),t.link("use-sync-external-store/shim",{useSyncExternalStore:function(e){a=e}},2),t.link("../../../components/Sidebar",{default:function(e){c=e}},3),t.link("../../../components/Sidebar/SidebarItemsAssembler",{default:function(e){s=e}},4),t.link("../../../providers/SettingsProvider",{default:function(e){m=e}},5),t.link("../sidebarItems",{getOmnichannelSidebarItems:function(e){f=e},subscribeToOmnichannelSidebarItems:function(e){d=e}},6),t.exportDefault(u(function(){var e=a(d,f),n=i(),t=r().sidebar,u=o();return l.createElement(m,{privileged:!0},l.createElement(c,null,l.createElement(c.Header,{onClose:t.close,title:n("Omnichannel")}),l.createElement(c.Content,null,l.createElement(s,{items:e,currentPath:u}))))}))}
//# sourceMappingURL=/dynamic/client/views/omnichannel/sidebar/3b3a9c4545fc3311f2054e859f527a371c46a314.map