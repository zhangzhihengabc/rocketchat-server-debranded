function module(e,n,t){t.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},2),t.export({useQuickActions:function(){return Q}}),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e}},0),t.link("@rocket.chat/ui-contexts",{useSetModal:function(e){s=e},useToastMessageDispatch:function(e){i=e},useUserId:function(e){u=e},useSetting:function(e){l=e},usePermission:function(e){p=e},useRole:function(e){d=e},useEndpoint:function(e){f=e},useMethod:function(e){m=e},useTranslation:function(e){h=e},useRouter:function(e){v=e}},1),t.link("react",{default:function(e){k=e},useCallback:function(e){b=e},useState:function(e){g=e},useEffect:function(e){C=e}},2),t.link("../../../../../../../app/livechat/client/collections/LivechatInquiry",{LivechatInquiry:function(e){_=e}},3),t.link("../../../../../../../app/ui-utils/client",{LegacyRoomManager:function(e){x=e}},4),t.link("../../../../../../../ee/app/livechat-enterprise/client/components/modals/PlaceChatOnHoldModal",{default:function(e){y=e}},5),t.link("../../../../../../../ee/client/hooks/useHasLicenseModule",{useHasLicenseModule:function(e){w=e}},6),t.link("../../../../../../components/Omnichannel/modals/CloseChatModal",{default:function(e){M=e}},7),t.link("../../../../../../components/Omnichannel/modals/CloseChatModalData",{default:function(e){T=e}},8),t.link("../../../../../../components/Omnichannel/modals/ForwardChatModal",{default:function(e){E=e}},9),t.link("../../../../../../components/Omnichannel/modals/ReturnChatQueueModal",{default:function(e){O=e}},10),t.link("../../../../../../components/Omnichannel/modals/TranscriptModal",{default:function(e){P=e}},11),t.link("../../../../../../hooks/omnichannel/useIsRoomOverMacLimit",{useIsRoomOverMacLimit:function(e){S=e}},12),t.link("../../../../../../hooks/omnichannel/useOmnichannelRouteConfig",{useOmnichannelRouteConfig:function(e){L=e}},13),t.link("../../../../../../ui",{quickActionHooks:function(e){R=e}},14),t.link("../../../../contexts/RoomContext",{useOmnichannelRoom:function(e){q=e}},15),t.link("../../../../lib/quickActions",{QuickActionsEnum:function(e){I=e}},16),t.link("./usePutChatOnHoldMutation",{usePutChatOnHoldMutation:function(e){H=e}},17),t.link("./useReturnChatToQueueMutation",{useReturnChatToQueueMutation:function(e){D=e}},18);var r,a,o,c,s,i,u,l,p,d,f,m,h,v,k,b,g,C,_,x,y,w,M,T,E,O,P,S,L,R,q,I,H,D,Q=function(){var e,n,t,Q=q(),A=s(),F=v(),j=h(),U=i(),V=o(g(!1),2),B=V[0],G=V[1],z=Q.v._id,J=Q._id,K=u(),N=Q.lastMessage,W=f("GET","/v1/livechat/visitors.info"),X=c(function(){var e;return r.async(function(n){for(;;)switch(n.prev=n.next){case 0:if(z){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,r.awrap(W({visitorId:z}));case 4:if(!(null!=(e=n.sent.visitor.visitorEmails)&&e.length&&e[0].address)){n.next=8;break}return n.abrupt("return",e[0].address);case 8:case"end":return n.stop()}},null,null,null,Promise)});C(function(){B&&null!=N&&N.token&&A(null)},[N,B,A]);var Y=b(function(){return A(null)},[A]),Z=f("POST","/v1/livechat/transcript/:rid",{rid:J}),$=b(function(e,n){return r.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.awrap(Z({email:e,subject:n}));case 3:Y(),U({type:"success",message:j("Livechat_email_transcript_has_been_requested")}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),U({type:"error",message:t.t0});case 10:case"end":return t.stop()}},null,null,[[0,7]],Promise)},[Y,U,Z,j]),ee=f("POST","/v1/omnichannel/:rid/request-transcript",{rid:J}),en=b(function(){return r.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.awrap(ee());case 3:U({type:"success",message:j("Livechat_transcript_has_been_requested")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),U({type:"error",message:e.t0});case 9:case"end":return e.stop()}},null,null,[[0,6]],Promise)},[U,ee,j]),et=m("livechat:sendTranscript"),er=b(function(e,n,t){return r.async(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,r.awrap(et(t,J,e,n));case 3:Y(),a.next=9;break;case 6:a.prev=6,a.t0=a.catch(0),U({type:"error",message:a.t0});case 9:case"end":return a.stop()}},null,null,[[0,6]],Promise)},[Y,U,J,et]),ea=f("DELETE","/v1/livechat/transcript/:rid",{rid:J}),eo=b(function(){return r.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.awrap(ea());case 3:U({type:"success",message:j("Livechat_transcript_request_has_been_canceled")}),Y(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),U({type:"error",message:e.t0});case 10:case"end":return e.stop()}},null,null,[[0,7]],Promise)},[Y,ea,U,j]),ec=f("POST","/v1/livechat/room.forward"),es=b(function(e,n,t){var a;return r.async(function(o){for(;;)switch(o.prev=o.next){case 0:if(!(e&&n)){o.next=2;break}return o.abrupt("return");case 2:return a={roomId:J,comment:t,clientAction:!0},e&&(a.departmentId=e),n&&(a.userId=n),o.prev=5,o.next=8,r.awrap(ec(a));case 8:U({type:"success",message:j("Transferred")}),F.navigate("/home"),x.close(Q.t+J),Y(),o.next=17;break;case 14:o.prev=14,o.t0=o.catch(5),U({type:"error",message:o.t0});case 17:case"end":return o.stop()}},null,null,[[5,14]],Promise)},[Y,U,ec,Q.t,J,F,j]),ei=f("POST","/v1/livechat/room.closeByUser"),eu=b(function(e,n,t,o){return r.async(function(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,c.next=3,r.awrap(ei(a(a(a(a({rid:J},e&&{comment:e}),n&&{tags:n}),(null==t?void 0:t.omnichannelTranscriptPDF)&&{generateTranscriptPdf:!0}),null!=t&&t.omnichannelTranscriptEmail&&o?{transcriptEmail:{sendToVisitor:null==t?void 0:t.omnichannelTranscriptEmail,requestData:o}}:{transcriptEmail:{sendToVisitor:!1}})));case 3:_.remove({rid:J}),Y(),U({type:"success",message:j("Chat_closed_successfully")}),c.next=11;break;case 8:c.prev=8,c.t0=c.catch(0),U({type:"error",message:c.t0});case 11:case"end":return c.stop()}},null,null,[[0,8]],Promise)},[ei,Y,U,J,j]),el=D({onSuccess:function(){x.close(Q.t+J),F.navigate("/home")},onError:function(e){U({type:"error",message:e})},onSettled:function(){Y()}}),ep=H({onSuccess:function(){U({type:"success",message:j("Chat_On_Hold_Successfully")})},onError:function(e){U({type:"error",message:e})},onSettled:function(){Y()}}),ed=c(function(e){var n,t;return r.async(function(a){for(;;)switch(a.prev=a.next){case 0:a.t0=e,a.next=a.t0===I.MoveQueue?3:a.t0===I.TranscriptPDF?5:a.t0===I.TranscriptEmail?7:a.t0===I.ChatForward?15:a.t0===I.CloseChat?17:a.t0===I.OnHoldChat?22:25;break;case 3:return A(k.createElement(O,{onMoveChat:function(){return el.mutate(J)},onCancel:function(){Y()}})),a.abrupt("break",26);case 5:return en(),a.abrupt("break",26);case 7:return a.next=9,r.awrap(X());case 9:if(n=a.sent){a.next=13;break}return U({type:"error",message:j("Customer_without_registered_email")}),a.abrupt("break",26);case 13:return A(k.createElement(P,{room:Q,email:n,onRequest:$,onSend:er,onDiscard:eo,onCancel:Y})),a.abrupt("break",26);case 15:return A(k.createElement(E,{room:Q,onForward:es,onCancel:Y})),a.abrupt("break",26);case 17:return a.next=19,r.awrap(X());case 19:return t=a.sent,A(Q.departmentId?k.createElement(T,{visitorEmail:t,departmentId:Q.departmentId,onConfirm:eu,onCancel:Y}):k.createElement(M,{visitorEmail:t,onConfirm:eu,onCancel:Y})),a.abrupt("break",26);case 22:return A(k.createElement(y,{onOnHoldChat:function(){return ep.mutate(J)},onCancel:function(){Y(),G(!1)}})),G(!0),a.abrupt("break",26);case 25:return a.abrupt("break",26);case 26:case"end":return a.stop()}},null,null,null,Promise)}),ef=L(),em=l("Livechat_allow_manual_on_hold"),eh=d("livechat-manager"),ev=d("livechat-monitor"),ek=(null==Q?void 0:Q.open)&&((null===(e=Q.u)||void 0===e?void 0:e._id)===K||eh||ev)&&(null==Q?void 0:null===(n=Q.lastMessage)||void 0===n?void 0:n.t)!=="livechat-close",eb=!!(null!=ef&&ef.returnQueue)&&(null==Q?void 0:Q.u)!==void 0,eg=p("transfer-livechat-guest"),eC=p("send-omnichannel-chat-transcript"),e_=w("livechat-enterprise"),ex=p("request-pdf-transcript"),ey=p("close-livechat-room"),ew=p("close-others-livechat-room"),eM=l("Livechat_allow_manual_on_hold_upon_agent_engagement_only"),eT=!Q.onHold&&Q.u,eE=!(null!==(t=Q.lastMessage)&&void 0!==t&&t.token),eO=!!(em&&eT&&(!eM||eE)),eP=S(Q),eS=function(e){switch(e){case I.MoveQueue:return!eP&&!!ek&&eb;case I.ChatForward:return!eP&&!!ek&&eg;case I.Transcript:return!eP&&(eC||e_&&ex);case I.TranscriptEmail:return!eP&&eC;case I.TranscriptPDF:return e_&&!eP&&ex;case I.CloseChat:return!!ek&&(ey||ew);case I.OnHoldChat:return!!ek&&eO}return!1};return{quickActions:R.map(function(e){return e()}).filter(function(e){return!!e}).filter(function(e){var n=e.options,t=e.id;return n&&(e.options=n.filter(function(e){return eS(e.id)})),eS(t)}).sort(function(e,n){var t,r;return(null!==(t=e.order)&&void 0!==t?t:0)-(null!==(r=n.order)&&void 0!==r?r:0)}),actionDefault:c(function(e){ed(e)})}}}
//# sourceMappingURL=/dynamic/client/views/room/Header/Omnichannel/QuickActions/hooks/c5b6c9c26a8aa4dc53c1d49be5ebb4be9c3fa35d.map