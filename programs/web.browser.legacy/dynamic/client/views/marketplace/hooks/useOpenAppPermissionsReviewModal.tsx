function module(n,e,i){i.export({useOpenAppPermissionsReviewModal:function(){return s}}),i.link("@rocket.chat/ui-contexts",{useSetModal:function(n){o=n}},0),i.link("react",{default:function(n){t=n},useCallback:function(n){u=n}},1),i.link("../AppPermissionsReviewModal",{default:function(n){r=n}},2);var o,t,u,r,s=function(n){var e=n.app,i=n.onCancel,s=n.onConfirm,c=o();return u(function(){return c(t.createElement(r,{appPermissions:e.permissions,onCancel:function(){c(null),i()},onConfirm:function(n){c(null),s(n)}}))},[e.permissions,i,s,c])}}
//# sourceMappingURL=/dynamic/client/views/marketplace/hooks/27489b5156a50141e4190df76fa8597f77df0fa1.map