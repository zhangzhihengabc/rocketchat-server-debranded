function module(e,t,n){var r,o,i,a,u,c,s,l,f,d;n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),n.link("@rocket.chat/fuselage",{Skeleton:function(e){o=e}},0),n.link("@rocket.chat/ui-contexts",{useMethod:function(e){i=e},useToastMessageDispatch:function(e){a=e},useTranslation:function(e){u=e}},1),n.link("@tanstack/react-query",{useQuery:function(e){c=e}},2),n.link("react",{default:function(e){s=e},useEffect:function(e){l=e}},3),n.link("../../../../components/GenericModal",{default:function(e){f=e}},4),n.link("./ReadReceiptRow",{default:function(e){d=e}},5),n.exportDefault(function(e){var t=e.messageId,n=e.onClose,m=u(),k=a(),p=i("getReadReceipts"),g=c(["read-receipts",t],function(){return p({messageId:t})});if(l(function(){g.isError&&(k({type:"error",message:g.error}),n())},[k,m,n,g.isError,g.error]),g.isLoading||g.isError)return s.createElement(f,{title:m("Read_by"),onConfirm:n,onClose:n},s.createElement(o,{type:"rect",w:"full",h:"x120"}));var E=g.data;return s.createElement(f,{title:m("Read_by"),onConfirm:n,onClose:n},E.length<1&&m("No_results_found"),E.map(function(e){return s.createElement(d,r({},e,{key:e._id}))}))})}
//# sourceMappingURL=/dynamic/client/views/room/modals/ReadReceiptsModal/985eb75232a8ee1ab34b29c28633f668a0b034bc.map