function module(e,n,a){var t;let l,i,s,r,c,o,u,d,m,f,k,h,b,x,g;a.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){l=e}},0),a.link("@rocket.chat/css-in-js",{css(e){i=e}},0),a.link("@rocket.chat/fuselage",{Box(e){s=e}},1),a.link("@rocket.chat/fuselage-hooks",{useSessionStorage(e){r=e}},2),a.link("@rocket.chat/ui-contexts",{useLayout(e){c=e},useSetting(e){o=e},useUserPreference(e){u=e}},3),a.link("react",{default(e){d=e},memo(e){m=e}},4),a.link("../hooks/omnichannel/useOmnichannelEnabled",{useOmnichannelEnabled(e){f=e}},5),a.link("./RoomList",{default(e){k=e}},6),a.link("./footer",{default(e){h=e}},7),a.link("./header",{default(e){b=e}},8),a.link("./sections/OmnichannelSection",{default(e){x=e}},9),a.link("./sections/StatusDisabledSection",{default(e){g=e}},10),a.exportDefault(m(()=>{let e=f(),n=u("sidebarViewMode"),a=!u("sidebarDisplayAvatar"),{sidebar:m}=c(),[p,E]=r("presence_cap_notifier",!1),S=o("Presence_broadcast_disabled"),v=i(t||(t=l(["\n		a {\n			text-decoration: none;\n		}\n	"])));return d.createElement(d.Fragment,null,d.createElement(s,{display:"flex",flexDirection:"column",height:"100%",is:"nav",className:["rcx-sidebar--main","rcx-sidebar rcx-sidebar--".concat(n),a&&"rcx-sidebar--hide-avatar",v].filter(Boolean),role:"navigation","data-qa-opened":m.isCollapsed?"false":"true"},d.createElement(b,null),S&&!p&&d.createElement(g,{onDismiss:()=>E(!0)}),e&&d.createElement(x,null),d.createElement(k,null),d.createElement(h,null)))}))}
//# sourceMappingURL=/dynamic/client/sidebar/ce9e3745d342f6a02c7551c341b89e96dceae3e3.map