function module(e,t,n){var o,a,i,s,u,c,l,r,m,f,d,p,h,g;n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/taggedTemplateLiteralLoose",{default:function(e){i=e}},1),n.link("@rocket.chat/css-in-js",{css:function(e){s=e}},0),n.link("@rocket.chat/fuselage",{IconButton:function(e){u=e},Box:function(e){c=e},Margins:function(e){l=e}},1),n.link("@rocket.chat/ui-contexts",{useSetting:function(e){r=e}},2),n.link("react",{default:function(e){m=e},memo:function(e){f=e}},3),n.link("use-subscription",{useSubscription:function(e){d=e}},4),n.link("../../../../../lib/getUserDisplayName",{getUserDisplayName:function(e){p=e}},5),n.link("../../../../components/message/content/attachments/QuoteAttachment",{QuoteAttachment:function(e){h=e}},6),n.link("../../contexts/ChatContext",{useChat:function(e){g=e}},7),n.exportDefault(f(function(){var e,t=g();if(!(null!=t&&null!==(e=t.composer)&&void 0!==e&&e.quotedMessages))throw Error("Chat context not found");var n=d({getCurrentValue:t.composer.quotedMessages.get,subscribe:t.composer.quotedMessages.subscribe}),f=!!r("UI_Use_Real_Name");if(!n.length)return null;var k=s(o||(o=i(["\n		position: absolute;\n		right: 0.5rem;\n		top: 0.75rem;\n	"])));return m.createElement(c,{mbe:8,position:"relative",overflowY:"auto",maxHeight:"x256"},n.map(function(e,n){var o;return m.createElement(l,{block:4,key:n},m.createElement(c,{display:"flex",position:"relative"},m.createElement(h,{attachment:{text:e.msg,md:e.md,author_name:e.alias||p(e.u.name,e.u.username,f),author_icon:"/avatar/"+e.u.username,ts:e.ts,attachments:null==e?void 0:null===(o=e.attachments)||void 0===o?void 0:o.map(function(e){return a(a({},e),{},{collapsed:!0})}),collapsed:!0}}),m.createElement(c,{className:k,"data-mid":e._id,onClick:function(){var n;null===(n=t.composer)||void 0===n||n.dismissQuotedMessage(e._id)}},m.createElement(u,{mini:!0,icon:"cross"}))))}))}))}
//# sourceMappingURL=/dynamic/client/views/room/composer/messageBox/a5c96cad897d91a8cc20a92b06f36c4d10c5a34a.map