function module(e,t,l){let n,a,o,r,i,u,c,m,s,d,E,k,p,f,v,h,g,b,F,C,T,y,_,D,x,A,M,I,S,B,Q,w,z;l.link("@rocket.chat/fuselage",{Box(e){n=e},Margins(e){a=e},Tag(e){o=e},Button(e){r=e},ButtonGroup(e){i=e}},0),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){u=e}},1),l.link("@rocket.chat/ui-contexts",{useToastMessageDispatch(e){c=e},useRoute(e){m=e},useUserSubscription(e){s=e},useTranslation(e){d=e}},2),l.link("meteor/meteor",{Meteor(e){E=e}},3),l.link("moment",{default(e){k=e}},4),l.link("react",{default(e){p=e},useEffect(e){f=e},useMemo(e){v=e},useState(e){h=e}},5),l.link("../../../../../../app/authorization/client",{hasPermission(e){g=e}},6),l.link("../../../../../components/Contextualbar",{ContextualbarScrollableContent(e){b=e},ContextualbarFooter(e){F=e}},7),l.link("../../../../../hooks/useEndpointData",{useEndpointData(e){C=e}},8),l.link("../../../../../hooks/useFormatDateAndTime",{useFormatDateAndTime(e){T=e}},9),l.link("../../../../../hooks/useFormatDuration",{useFormatDuration(e){y=e}},10),l.link("../../../components/CustomField",{default(e){_=e}},11),l.link("../../../components/Field",{default(e){D=e}},12),l.link("../../../components/Info",{default(e){x=e}},13),l.link("../../../components/Label",{default(e){A=e}},14),l.link("../../components",{AgentField(e){M=e},ContactField(e){I=e},SlaField(e){S=e}},15),l.link("../../components/PriorityField",{default(e){B=e}},16),l.link("../../utils/formatQueuedAt",{formatQueuedAt(e){Q=e}},17),l.link("./DepartmentField",{default(e){w=e}},18),l.link("./VisitorClientInfo",{default(e){z=e}},19),l.exportDefault(function(e){var t;let{id:l,route:N,room:P}=e,j=d(),G=T(),{value:L,phase:O}=C("/v1/livechat/custom-fields"),[R,U]=h([]),V=y(),{ts:q,tags:H,closedAt:J,departmentId:K,v:W,servedBy:X,metrics:Y,topic:Z,waitingResponse:$,responseBy:ee,slaId:et,priorityId:el,livechatData:en,queuedAt:ea}=P||{room:{v:{}}},eo=m(N||"omnichannel-directory"),er=s(l),ei=g("save-others-livechat-room-info"),eu=(null==X?void 0:X._id)===E.userId(),ec=null==W?void 0:W._id,em=ea||q,es=v(()=>Q(P),[P]),ed=c();f(()=>{if(L){let{customFields:e}=L;U(e)}},[L,O]);let eE=e=>{let t=R.find(t=>{let{_id:l}=t;return l===e});return!!t&&"visible"===t.visibility&&"room"===t.scope},ek=u(()=>{if(!(er||eu||ei))return ed({type:"error",message:j("Not_authorized")});eo.push(N?{tab:"room-info",context:"edit",id:l}:{page:"chats",id:l,bar:"edit"})});return p.createElement(p.Fragment,null,p.createElement(b,{p:24},p.createElement(a,{block:"x4"},P&&W&&p.createElement(I,{contact:W,room:P}),ec&&p.createElement(z,{uid:ec}),X&&p.createElement(M,{agent:X}),K&&p.createElement(w,{departmentId:K}),H&&H.length>0&&p.createElement(D,null,p.createElement(A,null,j("Tags")),p.createElement(x,null,H.map(e=>p.createElement(n,{key:e,mie:4,display:"inline"},p.createElement(o,{style:{display:"inline"},disabled:!0},e))))),Z&&p.createElement(D,null,p.createElement(A,null,j("Topic")),p.createElement(x,null,Z)),em&&p.createElement(D,null,p.createElement(A,null,j("Queue_Time")),es),J&&p.createElement(D,null,p.createElement(A,null,j("Chat_Duration")),p.createElement(x,null,k(J).from(k(q),!0))),q&&p.createElement(D,null,p.createElement(A,null,j("Created_at")),p.createElement(x,null,G(q))),J&&p.createElement(D,null,p.createElement(A,null,j("Closed_At")),p.createElement(x,null,G(J))),(null==X?void 0:X.ts)&&p.createElement(D,null,p.createElement(A,null,j("Taken_at")),p.createElement(x,null,G(X.ts))),(null==Y?void 0:null===(t=Y.response)||void 0===t?void 0:t.avg)&&V(Y.response.avg)&&p.createElement(D,null,p.createElement(A,null,j("Avg_response_time")),p.createElement(x,null,V(Y.response.avg))),!$&&(null==ee?void 0:ee.lastMessageTs)&&p.createElement(D,null,p.createElement(A,null,j("Inactivity_Time")),p.createElement(x,null,k(ee.lastMessageTs).fromNow(!0))),g("view-livechat-room-customfields")&&en&&Object.keys(en).map(e=>eE(e)&&en[e]&&p.createElement(_,{key:e,id:e,value:en[e]})),et&&p.createElement(S,{id:et}),el&&p.createElement(B,{id:el}))),p.createElement(F,null,p.createElement(i,{stretch:!0},p.createElement(r,{icon:"pencil",onClick:ek},j("Edit")))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/directory/chats/contextualBar/bad6d2e78326a40d545f4f482488f2c237e9d6a5.map