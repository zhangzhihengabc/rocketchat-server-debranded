function module(e,t,n){var i,o,l,u,c,a,r;n.link("@rocket.chat/fuselage",{MessageBlock:function(e){i=e}},0),n.link("@rocket.chat/fuselage-ui-kit",{UiKitComponent:function(e){o=e},UiKitMessage:function(e){l=e},UiKitContext:function(e){u=e}},1),n.link("react",{default:function(e){c=e}},2),n.link("../../../uikit/hooks/useMessageBlockContextValue",{useMessageBlockContextValue:function(e){a=e}},3),n.link("../../GazzodownText",{default:function(e){r=e}},4),n.exportDefault(function(e){var t=e.rid,n=e.mid,f=e.blocks,k=a(t,n);return c.createElement(i,{fixedWidth:!0},c.createElement(u.Provider,{value:k},c.createElement(r,null,c.createElement(o,{render:l,blocks:f}))))})}
//# sourceMappingURL=/dynamic/client/components/message/uikit/19994eecbab2562761e2ea354c753b8d751535be.map