function module(e,t,o){let l,n,r,m,a,c,i,u;o.link("@rocket.chat/core-typings",{isVoipRoom(e){l=e}},0),o.link("@rocket.chat/ui-client",{HeaderToolbox(e){n=e}},1),o.link("@rocket.chat/ui-contexts",{useLayout(e){r=e}},2),o.link("react",{default(e){m=e},lazy(e){a=e},memo(e){c=e},useMemo(e){i=e}},3),o.link("../../../components/BurgerMenu",{default(e){u=e}},4);let d=a(()=>o.dynamicImport("./DirectRoomHeader")),s=a(()=>o.dynamicImport("./Omnichannel/OmnichannelRoomHeader")),p=a(()=>o.dynamicImport("./Omnichannel/VoipRoomHeader")),k=a(()=>o.dynamicImport("./RoomHeader"));o.exportDefault(c(e=>{var t,o;let{room:a}=e,{isMobile:c,isEmbedded:h,showTopNavbarEmbeddedLayout:y}=r(),E=i(()=>({start:c&&m.createElement(n,null,m.createElement(u,null))}),[c]);return h&&!y?null:"d"===a.t&&(null!==(t=null===(o=a.uids)||void 0===o?void 0:o.length)&&void 0!==t?t:0)<3?m.createElement(d,{slots:E,room:a}):"l"===a.t?m.createElement(s,{slots:E}):l(a)?m.createElement(p,{slots:E,room:a}):m.createElement(k,{slots:E,room:a,topic:a.topic})}))}
//# sourceMappingURL=/dynamic/client/views/room/Header/5fa3a524cef7247d1a812804444efa73fdd553c3.map