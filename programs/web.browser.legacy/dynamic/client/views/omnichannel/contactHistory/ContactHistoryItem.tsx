function module(e,t,n){var l,i,a,s,o,c,r,u,m,d,f,g,v,E,h,M=["history","setChatId"];n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},1),n.link("@rocket.chat/fuselage",{Message:function(e){a=e},Box:function(e){s=e},MessageGenericPreview:function(e){o=e},MessageGenericPreviewContent:function(e){c=e},MessageGenericPreviewDescription:function(e){r=e},MessageGenericPreviewTitle:function(e){u=e},MessageSystemBody:function(e){m=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){d=e}},1),n.link("react",{default:function(e){f=e},memo:function(e){g=e}},2),n.link("../../../components/avatar/UserAvatar",{default:function(e){v=e}},3),n.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime:function(e){E=e}},4),n.link("../../../lib/clickableItem",{clickableItem:function(e){h=e}},5),n.exportDefault(g(h(function(e){var t,n,g,h,k,_,b,p=e.history,C=e.setChatId,I=i(e,M),y=d(),w=E(),x=null===(t=p.servedBy)||void 0===t?void 0:t.username,P=!!(null!==(n=p.closingMessage)&&void 0!==n&&null!==(g=n.msg)&&void 0!==g&&g.trim());return f.createElement(s,l({pbs:16,is:a,onClick:function(){C(p._id)},"data-qa":"chat-history-item"},I),f.createElement(a.LeftContainer,null,x&&f.createElement(v,{username:x,className:"rcx-message__avatar",size:"x36"})),f.createElement(a.Container,null,f.createElement(a.Header,null,f.createElement(a.Name,{title:x},x),(null===(h=p.closingMessage)||void 0===h?void 0:h.ts)&&f.createElement(a.Timestamp,null,w(null===(k=p.closingMessage)||void 0===k?void 0:k.ts))),f.createElement(a.Body,null,f.createElement(m,{title:y("Conversation_closed_without_comment")},y("Conversation_closed_without_comment")),P&&f.createElement(o,null,f.createElement(c,null,f.createElement(u,null,y("Closing_chat_message"),":"),f.createElement(r,{clamp:!0},f.createElement(s,{title:null===(_=p.closingMessage)||void 0===_?void 0:_.msg},null===(b=p.closingMessage)||void 0===b?void 0:b.msg))))),f.createElement(a.Metrics,null,f.createElement(a.Metrics.Item,null,f.createElement(a.Metrics.Item.Icon,{name:"thread"}),f.createElement(a.Metrics.Item.Label,null,p.msgs)))))})))}
//# sourceMappingURL=/dynamic/client/views/omnichannel/contactHistory/8a98941c4dc45aa44d3523de73241d8301dcbcdf.map