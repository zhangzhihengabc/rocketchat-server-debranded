function module(e,t,l){let n,u,a,c,o,r,i;l.link("@rocket.chat/ui-contexts",{useSession(e){n=e},useUserId(e){u=e},useSetting(e){a=e}},0),l.link("@rocket.chat/web-ui-registration",{default(e){c=e}},1),l.link("react",{default(e){o=e}},2),l.link("./LoginPage",{default(e){r=e}},3),l.link("./UsernameCheck",{default(e){i=e}},4),l.exportDefault(e=>{let{children:t,guest:l}=e,s=u(),d=a("Accounts_AllowAnonymousRead"),f=n("forceLogin");return s?o.createElement(i,null,t):!f&&l?o.createElement(c,{defaultRoute:"guest",children:t}):!f&&d?o.createElement(i,null,t):o.createElement(r,null)})}
//# sourceMappingURL=/dynamic/client/views/root/MainLayout/7b49f491735873d185f55d0413a860a6225e6c0a.map