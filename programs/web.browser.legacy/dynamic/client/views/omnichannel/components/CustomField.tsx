function module(e,n,t){var l,u,i,o,c,r,a,f,d;t.link("@rocket.chat/fuselage",{Box:function(e){l=e}},0),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){u=e},useTranslation:function(e){i=e}},1),t.link("@tanstack/react-query",{useQuery:function(e){o=e}},2),t.link("react",{default:function(e){c=e}},3),t.link("../directory/components/FormSkeleton",{FormSkeleton:function(e){r=e}},4),t.link("./Field",{default:function(e){a=e}},5),t.link("./Info",{default:function(e){f=e}},6),t.link("./Label",{default:function(e){d=e}},7),t.exportDefault(function(e){var n=e.id,t=e.value,s=i(),m=u("GET","/v1/livechat/custom-fields/:_id",{_id:n}),k=o(["/v1/livechat/custom-field",n],function(){return m()}),v=k.data,E=k.isLoading,F=k.isError;if(E)return c.createElement(r,null);if(F||!(null!=v&&v.customField))return c.createElement(l,{mbs:16},s("Custom_Field_Not_Found"));var _=v.customField.label;return _?c.createElement(a,null,c.createElement(d,null,_),c.createElement(f,null,t)):null})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/components/7e305ddcfd7673707b840641cde34fd22dd185ff.map