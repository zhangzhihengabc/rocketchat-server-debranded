function module(e,o,t){let n,l,i,c,a,r,u,f,C,m,d,s,p,k,V,E,P,_,v;t.link("@rocket.chat/fuselage-hooks",{useOutsideClick(e){n=e},useMutableCallback(e){l=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation(e){i=e}},1),t.link("@rocket.chat/ui-video-conf",{VideoConfPopup(e){c=e},VideoConfPopupHeader(e){a=e},VideoConfPopupContent(e){r=e},VideoConfPopupControllers(e){u=e},VideoConfController(e){f=e},useVideoConfControllers(e){C=e},VideoConfButton(e){m=e},VideoConfPopupFooter(e){d=e},VideoConfPopupTitle(e){s=e},VideoConfPopupFooterButtons(e){p=e}},2),t.link("react",{default(e){k=e},useRef(e){V=e}},3),t.link("../../../../../../contexts/VideoConfContext",{useVideoConfSetPreferences(e){E=e},useVideoConfCapabilities(e){P=e},useVideoConfPreferences(e){_=e}},4),t.link("./VideoConfPopupRoomInfo",{default(e){v=e}},5),t.exportDefault(e=>{let{loading:o,room:t,onClose:x,onConfirm:b}=e,h=V(null);n([h],o?()=>void 0:x);let M=i(),S=E(),B=_(),{controllersConfig:F,handleToggleMic:R,handleToggleCam:T}=C(B),g=P(),y=!!g.cam,D=!!g.mic,H=l(()=>{S(F),b()});return k.createElement(c,{ref:h},k.createElement(a,null,k.createElement(s,{text:M("Start_a_call")}),(y||D)&&k.createElement(u,null,y&&k.createElement(f,{active:F.cam,title:M(F.cam?"Cam_on":"Cam_off"),icon:F.cam?"video":"video-off",onClick:T}),D&&k.createElement(f,{active:F.mic,title:M(F.mic?"Mic_on":"Mic_off"),icon:F.mic?"mic":"mic-off",onClick:R}))),k.createElement(r,null,k.createElement(v,{room:t})),k.createElement(d,null,k.createElement(p,null,k.createElement(m,{disabled:o,primary:!0,onClick:H},M("Start_call")))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/2f21342f853d908ea5003661c2b0a644a08dc5a0.map