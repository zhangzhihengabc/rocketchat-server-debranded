function module(e,t,n){var l,a,c,o,i,r;n.link("@rocket.chat/fuselage",{Skeleton:function(e){l=e},Box:function(e){a=e},Accordion:function(e){c=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){o=e}},1),n.link("react",{default:function(e){i=e}},2),n.link("./HistoryItem",{default:function(e){r=e}},3),n.exportDefault(function(e){var t=e.data,n=e.isLoading,m=o();return n?i.createElement(a,{w:"full",pb:24},i.createElement(l,{mbe:4}),i.createElement(l,{mbe:8}),i.createElement(l,{mbe:4}),i.createElement(l,{mbe:8}),i.createElement(l,{mbe:4}),i.createElement(l,{mbe:8})):t.length<1?i.createElement(a,{mbs:16},m("Integration_Outgoing_WebHook_No_History")):i.createElement(a,{display:"flex",alignItems:"center",flexDirection:"column"},i.createElement(c,{w:"full",maxWidth:"x600",alignSelf:"center",key:"content"},t.map(function(e){return i.createElement(r,{data:e,key:e._id})})))})}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/outgoing/history/5286bb3ab7ee58cd50fc9545841d1df33748f353.map