function module(e,t,n){var o,c,l,i,u,a,r,s;n.link("@rocket.chat/fuselage",{MessageBlock:function(e){o=e},MessageMetrics:function(e){c=e},MessageMetricsItem:function(e){l=e},MessageMetricsReply:function(e){i=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){u=e}},1),n.link("react",{default:function(e){a=e}},2),n.link("../../../hooks/useTimeAgo",{useTimeAgo:function(e){r=e}},3),n.link("../../../views/room/hooks/useGoToRoom",{useGoToRoom:function(e){s=e}},4),n.exportDefault(function(e){var t=e.lm,n=e.count,m=e.rid,f=e.drid,k=u(),d=r(),g=s();return a.createElement(o,null,a.createElement(c,null,a.createElement(i,{"data-rid":m,"data-drid":f,onClick:function(){return g(f)}},n?k("message_counter",{counter:n,count:n}):k("Reply")),a.createElement(l,{title:null==t?void 0:t.toLocaleString()},a.createElement(l.Icon,{name:"clock"}),a.createElement(l.Label,null,t?d(t):k("No_messages_yet")))))})}
//# sourceMappingURL=/dynamic/client/components/message/content/f9a0b8f81e54ba2659e3a0b506e6a88f91081e4a.map