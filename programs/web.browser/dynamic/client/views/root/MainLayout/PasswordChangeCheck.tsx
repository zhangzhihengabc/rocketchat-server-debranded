function module(e,t,l){let r,n,u,a;l.link("@rocket.chat/ui-contexts",{useUser(e){r=e}},0),l.link("react",{default(e){n=e},lazy(e){u=e}},1),l.link("./TwoFactorAuthSetupCheck",{default(e){a=e}},2);let o=u(()=>l.dynamicImport("@rocket.chat/web-ui-registration").then(e=>{let{ResetPasswordPage:t}=e;return{default:t}}));l.exportDefault(e=>{var t;let{children:l}=e,u=(null===(t=r())||void 0===t?void 0:t.requirePasswordChange)===!0;return u?n.createElement(o,null):n.createElement(a,null,l)})}
//# sourceMappingURL=/dynamic/client/views/root/MainLayout/59c60d288a02098ba8da2437f0e68334540af78f.map