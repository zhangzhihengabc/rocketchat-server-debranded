function module(e,n,t){var l,o,r,i,u,a,s,c,m,f;t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){l=e}},0),t.link("react",{default:function(e){o=e},useMemo:function(e){r=e}},1),t.link("ua-parser-js",{default:function(e){i=e}},2),t.link("../../../../../hooks/useEndpointData",{useEndpointData:function(e){u=e}},3),t.link("../../../../../lib/asyncState",{AsyncStatePhase:function(e){a=e}},4),t.link("../../../components/Field",{default:function(e){s=e}},5),t.link("../../../components/Info",{default:function(e){c=e}},6),t.link("../../../components/Label",{default:function(e){m=e}},7),t.link("../../components/FormSkeleton",{FormSkeleton:function(e){f=e}},8),t.exportDefault(function(e){var n=e.uid,t=l(),E=u("/v1/livechat/visitors.info",{params:r(function(){return{visitorId:n}},[n])}),p=E.value,v=E.phase,k=E.error;if(v===a.LOADING)return o.createElement(f,null);if(k||!p||!p.visitor.userAgent)return null;var d={},h=new i;return h.setUA(p.visitor.userAgent),d.os=h.getOS().name+" "+h.getOS().version,d.browser=h.getBrowser().name+" "+h.getBrowser().version,d.host=p.visitor.host,d.ip=p.visitor.ip,o.createElement(o.Fragment,null,d.os&&o.createElement(s,null,o.createElement(m,null,t("OS")),o.createElement(c,null,d.os)),d.browser&&o.createElement(s,null,o.createElement(m,null,t("Browser")),o.createElement(c,null,d.browser)),d.host&&o.createElement(s,null,o.createElement(m,null,t("Host")),o.createElement(c,null,d.host)),d.ip&&o.createElement(s,null,o.createElement(m,null,t("IP")),o.createElement(c,null,d.ip)))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/directory/chats/contextualBar/c8cb6d12aa8d4968f25b1b36c7b83afa82c6aa07.map