function module(e,n,t){var i,s,o,u,r,l,a;t.link("@rocket.chat/ui-contexts",{useRouteParameter:function(e){i=e},usePermission:function(e){s=e}},0),t.link("react",{default:function(e){o=e}},1),t.link("../../../components/PageSkeleton",{default:function(e){}},2),t.link("../../../hooks/useIsEnterprise",{useIsEnterprise:function(e){u=e}},3),t.link("../../notAuthorized/NotAuthorizedPage",{default:function(e){r=e}},4),t.link("./PermissionsTable",{default:function(e){l=e}},5),t.link("./UsersInRole",{default:function(e){a=e}},6),t.exportDefault(function(){var e=s("access-permissions"),n=s("access-setting-permissions"),t=i("context"),c=u(),f=c.data;return(c.isLoading,e||n)?"users-in-role"===t?o.createElement(a,null):o.createElement(l,{isEnterprise:!!(null!=f&&f.isEnterprise)}):o.createElement(r,null)})}
//# sourceMappingURL=/dynamic/client/views/admin/permissions/3e80de8fedd610999fbf2d0cc54abd26c40a96ed.map