function module(e,n,t){t.export({useViewModeItems:function(){return s}}),t.link("@rocket.chat/fuselage",{RadioButton:function(e){d=e},ToggleSwitch:function(e){o=e}},0),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){c=e},useUserPreference:function(e){i=e},useTranslation:function(e){a=e}},1),t.link("react",{default:function(e){r=e},useCallback:function(e){u=e}},2);var d,o,c,i,a,r,u,s=function(){var e=a(),n=c("POST","/v1/users.setPreferences"),t=function(e){return u(function(){return n({data:{sidebarViewMode:e}})},[e])},s=i("sidebarViewMode","extended"),f=i("sidebarDisplayAvatar",!1),l=t("extended"),m=t("medium"),h=t("condensed"),k=u(function(){return n({data:{sidebarDisplayAvatar:!f}})},[n,f]);return[{id:"extended",content:e("Extended"),icon:"extended-view",addon:r.createElement(d,{onChange:l,checked:"extended"===s})},{id:"medium",content:e("Medium"),icon:"medium-view",addon:r.createElement(d,{onChange:m,checked:"medium"===s})},{id:"condensed",content:e("Condensed"),icon:"condensed-view",addon:r.createElement(d,{onChange:h,checked:"condensed"===s})},{id:"avatars",content:e("Avatars"),icon:"user-rounded",addon:r.createElement(o,{onChange:k,checked:f})}]}}
//# sourceMappingURL=/dynamic/client/sidebar/header/actions/hooks/4a1599f14850877b4aec3077e1e8b78cd26a9686.map