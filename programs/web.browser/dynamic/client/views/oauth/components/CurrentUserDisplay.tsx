function module(e,t,n){var a;let l,r,i,s,o,c,u,m,k,d,f,b;n.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){l=e}},0),n.link("@rocket.chat/css-in-js",{css(e){r=e}},0),n.link("@rocket.chat/ui-client",{UserStatus(e){i=e}},1),n.link("@rocket.chat/ui-contexts",{useRolesDescription(e){s=e},useSetting(e){o=e}},2),n.link("react",{default(e){c=e}},3),n.link("react-i18next",{useTranslation(e){u=e}},4),n.link("../../../components/LocalTime",{default(e){m=e}},5),n.link("../../../components/MarkdownText",{default(e){k=e}},6),n.link("../../../components/UserCard",{default(e){d=e}},7),n.link("../../../components/UserCard/UserCardInfo",{default(e){f=e}},8),n.link("../../../components/UserCard/UserCardRole",{default(e){b=e}},9);let p=r(a||(a=l(["\n	display: -webkit-box;\n	overflow: hidden;\n	-webkit-line-clamp: 3;\n	-webkit-box-orient: vertical;\n	word-break: break-all;\n"])));n.exportDefault(e=>{var t;let{user:n}=e,a=o("UI_Use_Real_Name"),l=s(),{t:r}=u();return c.createElement(c.Fragment,null,c.createElement("p",null,r("core.You_are_logged_in_as")),c.createElement(d,{username:n.username,etag:n.avatarETag,name:a?n.name:n.username,nickname:n.nickname,status:c.createElement(i.Online,null),customStatus:null!==(t=n.statusText)&&void 0!==t?t:c.createElement(c.Fragment,null),roles:n.roles&&l(n.roles).map((e,t)=>c.createElement(b,{key:t},e)),localTime:n.utcOffset&&Number.isInteger(n.utcOffset)&&c.createElement(m,{utcOffset:n.utcOffset}),bio:n.bio?c.createElement(f,{withTruncatedText:!1,className:p,height:"x60"},"string"==typeof n.bio?c.createElement(k,{variant:"inline",content:n.bio}):n.bio):c.createElement(c.Fragment,null)}))})}
//# sourceMappingURL=/dynamic/client/views/oauth/components/42ba97a6566e74f3dc2d18ef78abcce64bccb0f2.map