function module(e,n,t){var a,l,c,i,o,u,r;t.link("@rocket.chat/ui-contexts",{useRouteParameter:function(e){a=e},useTranslation:function(e){l=e}},0),t.link("react",{default:function(e){c=e},useRef:function(e){i=e}},1),t.link("../../../../../client/components/Page",{default:function(e){o=e}},2),t.link("./DeviceManagementAdminTable",{default:function(e){u=e}},3),t.link("./DeviceManagementInfo",{default:function(e){r=e}},4),t.exportDefault(function(){var e=l(),n=a("context"),t=a("id"),f=i(function(){return null});return c.createElement(o,{flexDirection:"row"},c.createElement(o,null,c.createElement(o.Header,{title:e("Device_Management")}),c.createElement(o.Content,null,c.createElement(u,{reloadRef:f}))),"info"===n&&t&&c.createElement(r,{deviceId:t,onReload:f.current}))})}
//# sourceMappingURL=/dynamic/ee/client/views/admin/deviceManagement/94d11c65d81392a34309898c0ae79f0d327804ed.map