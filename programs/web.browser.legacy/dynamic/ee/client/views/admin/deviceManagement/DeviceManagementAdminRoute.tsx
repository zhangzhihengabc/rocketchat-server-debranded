function module(e,n,t){var i,l,o,u,c,a,s,r,f,d,m,g,k,p;t.link("@rocket.chat/ui-contexts",{usePermission:function(e){i=e},useRouter:function(e){l=e},useSetModal:function(e){o=e},useCurrentModal:function(e){u=e},useTranslation:function(e){c=e}},0),t.link("react",{default:function(e){a=e},useEffect:function(e){s=e}},1),t.link("../../../../../app/utils/client/getURL",{getURL:function(e){r=e}},2),t.link("../../../../../client/components/GenericUpsellModal",{default:function(e){f=e}},3),t.link("../../../../../client/components/GenericUpsellModal/hooks",{useUpsellActions:function(e){d=e}},4),t.link("../../../../../client/components/PageSkeleton",{default:function(e){m=e}},5),t.link("../../../../../client/views/notAuthorized/NotAuthorizedPage",{default:function(e){g=e}},6),t.link("../../../hooks/useHasLicenseModule",{useHasLicenseModule:function(e){k=e}},7),t.link("./DeviceManagementAdminPage",{default:function(e){p=e}},8),t.exportDefault(function(){var e=c(),n=l(),t=o(),h=null!==u(),v=k("device-management"),M=i("view-device-management"),E=d(v),U=E.shouldShowUpsell,_=E.handleManageSubscription;return(s(function(){U&&t(a.createElement(f,{title:e("Device_Management"),img:r("images/device-management.png"),subtitle:e("Ensure_secure_workspace_access"),description:e("Manage_which_devices"),onClose:function(){return t(null)},onConfirm:_,onCancel:function(){return t(null)}}))},[U,n,t,e,_]),h)?a.createElement(m,null):M&&v?a.createElement(p,null):a.createElement(g,null)})}
//# sourceMappingURL=/dynamic/ee/client/views/admin/deviceManagement/b93c270ca0a24957fcb81bb4b551540ae3604683.map