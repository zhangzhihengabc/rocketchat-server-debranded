function module(e,t,n){let l,a,i,r,s,o,c,u,m;n.link("@rocket.chat/fuselage",{Box(e){l=e},Margins(e){a=e}},0),n.link("@rocket.chat/ui-contexts",{useSetting(e){i=e},useTranslation(e){r=e}},1),n.link("react",{default(e){s=e}},2),n.link("../../components/MarkdownText",{default(e){o=e}},3),n.link("../../components/UserStatus",{UserStatus(e){c=e}},4),n.link("../../components/avatar/UserAvatar",{default(e){u=e}},5),n.link("../../hooks/useUserDisplayName",{useUserDisplayName(e){m=e}},6),n.exportDefault(e=>{var t;let{user:n}=e,d=r(),x=i("Presence_broadcast_disabled"),f=m(n);return s.createElement(l,{display:"flex",flexDirection:"row",alignItems:"center",minWidth:"x208",mbe:"neg-x4",mbs:"neg-x8"},s.createElement(l,{mie:4},s.createElement(u,{size:"x36",username:(null==n?void 0:n.username)||"",etag:null==n?void 0:n.avatarETag})),s.createElement(l,{mis:4,display:"flex",overflow:"hidden",flexDirection:"column",fontScale:"p2",mb:"neg-x4",flexGrow:1,flexShrink:1},s.createElement(l,{withTruncatedText:!0,w:"full",display:"flex",alignItems:"center",flexDirection:"row"},s.createElement(a,{inline:4},s.createElement(c,{status:x?"disabled":n.status}),s.createElement(l,{is:"span",withTruncatedText:!0,display:"inline-block",fontWeight:"700"},f))),s.createElement(l,{color:"hint"},s.createElement(o,{withTruncatedText:!0,parseEmoji:!0,content:(null==n?void 0:n.statusText)||d(null!==(t=null==n?void 0:n.status)&&void 0!==t?t:"offline"),variant:"inlineWithoutBreaks"}))))})}
//# sourceMappingURL=/dynamic/client/sidebar/header/4fa745e3d90474c2008528f53a439ccf5ee71e01.map