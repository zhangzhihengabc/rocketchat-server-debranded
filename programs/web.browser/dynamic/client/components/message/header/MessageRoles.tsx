function module(e,t,l){let a,n,c,o;l.link("@rocket.chat/fuselage",{MessageRole(e){a=e},MessageRoles(e){n=e}},0),l.link("@rocket.chat/ui-contexts",{useTranslation(e){c=e}},1),l.link("react",{default(e){o=e}},2),l.exportDefault(e=>{let{roles:t,isBot:l}=e,r=c();return o.createElement(n,null,t.map((e,t)=>o.createElement(a,{key:t},e)),l&&o.createElement(a,null,r("Bot")))})}
//# sourceMappingURL=/dynamic/client/components/message/header/96d2cf6144a5b1259342b6fb80f8dd1ecfbe2b8f.map