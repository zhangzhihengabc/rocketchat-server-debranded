function module(e,n,t){t.export({registerAccountSidebarItem:function(){return f},unregisterSidebarItem:function(){return d},getAccountSidebarItems:function(){return b},subscribeToAccountSidebarItems:function(){return m}}),t.link("@rocket.chat/ui-client",{defaultFeaturesPreview:function(e){i=e}},0),t.link("react",{default:function(e){r=e}},1),t.link("../../../app/authorization/client",{hasPermission:function(e){c=e},hasAtLeastOnePermission:function(e){a=e}},2),t.link("../../../app/settings/client",{settings:function(e){o=e}},3),t.link("../../lib/createSidebarItems",{createSidebarItems:function(e){s=e}},4),t.link("./featurePreview/AccountFeaturePreviewBadge",{default:function(e){u=e}},5);var i,r,c,a,o,s,u,l=s([{href:"/account/profile",i18nLabel:"Profile",icon:"user",permissionGranted:function(){return o.get("Accounts_AllowUserProfileChange")}},{href:"/account/preferences",i18nLabel:"Preferences",icon:"customize"},{href:"/account/security",i18nLabel:"Security",icon:"lock",permissionGranted:function(){return o.get("Accounts_TwoFactorAuthentication_Enabled")||o.get("E2E_Enable")}},{href:"/account/integrations",i18nLabel:"Integrations",icon:"code",permissionGranted:function(){return o.get("Webdav_Integration_Enabled")}},{href:"/account/tokens",i18nLabel:"Personal_Access_Tokens",icon:"key",permissionGranted:function(){return c("create-personal-access-tokens")}},{href:"/account/omnichannel",i18nLabel:"Omnichannel",icon:"headset",permissionGranted:function(){return a(["send-omnichannel-chat-transcript","request-pdf-transcript"])}},{href:"/account/feature-preview",i18nLabel:"Feature_preview",icon:"flask",badge:function(){return r.createElement(u,null)},permissionGranted:function(){var e;return o.get("Accounts_AllowFeaturePreview")&&(null===(e=i)||void 0===e?void 0:e.length)>0}},{href:"/account/accessibility-and-appearance",i18nLabel:"Accessibility_and_Appearance",icon:"person-arms-spread"}]),f=l.registerSidebarItem,d=l.unregisterSidebarItem,b=l.getSidebarItems,m=l.subscribeToSidebarItems}
//# sourceMappingURL=/dynamic/client/views/account/86702c45371fdbc9135bf39815fe09ab82fe087c.map