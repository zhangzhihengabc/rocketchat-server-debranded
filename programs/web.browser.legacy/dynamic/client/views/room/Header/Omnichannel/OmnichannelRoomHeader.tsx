function module(n,e,t){var o,u,c,l,i,r,a,s,f,m,k,d,h;t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){o=n}},0),t.link("@rocket.chat/ui-client",{HeaderToolbox:function(n){u=n}},0),t.link("@rocket.chat/ui-contexts",{useLayout:function(n){c=n},useRouter:function(n){l=n}},1),t.link("react",{default:function(n){i=n},useCallback:function(n){r=n},useMemo:function(n){a=n}},2),t.link("use-sync-external-store/shim",{useSyncExternalStore:function(n){s=n}},3),t.link("../../../../components/BurgerMenu",{default:function(n){f=n}},4),t.link("../../contexts/RoomContext",{useOmnichannelRoom:function(n){m=n}},5),t.link("../RoomHeader",{default:function(n){k=n}},6),t.link("./BackButton",{BackButton:function(n){d=n}},7),t.link("./QuickActions",{default:function(n){h=n}},8),t.exportDefault(function(n){var e=n.slots,t=l(),b=s(t.subscribeToRouteChange,r(function(){return t.getRouteName()},[t])),x=c().isMobile,E=m(),R=a(function(){return o(o({},e),{},{start:(!!x||"omnichannel-directory"===b||"omnichannel-current-chats"===b)&&i.createElement(u,null,x&&i.createElement(f,null),i.createElement(d,{routeName:b})),posContent:i.createElement(h,null)})},[x,b,e]);return i.createElement(k,{slots:R,room:E})})}
//# sourceMappingURL=/dynamic/client/views/room/Header/Omnichannel/7f838b72d1f0cfd408ba2e081403a854086913fd.map