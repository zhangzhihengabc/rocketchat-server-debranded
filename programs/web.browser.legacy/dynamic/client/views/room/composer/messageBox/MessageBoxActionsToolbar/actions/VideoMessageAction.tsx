function module(e,i,n){var o,t,l,c,a,d,u,s,r,f,m,p,k,v,b,h,g,M=["collapsed","chatContext","disabled"];n.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){t=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},2),n.link("@rocket.chat/fuselage",{Option:function(e){c=e},OptionIcon:function(e){a=e},OptionContent:function(e){d=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){u=e}},1),n.link("@rocket.chat/ui-composer",{MessageComposerAction:function(e){s=e}},2),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){r=e},useSetting:function(e){f=e}},3),n.link("react",{default:function(e){m=e},useEffect:function(e){p=e},useMemo:function(e){k=e}},4),n.link("../../../../../../../app/ui/client/lib/recorderjs/videoRecorder",{VideoRecorder:function(e){v=e}},5),n.link("../../../../contexts/ChatContext",{useChat:function(e){b=e}},6),n.link("../../hooks/useMediaActionTitle",{useMediaActionTitle:function(e){h=e}},7),n.link("../../hooks/useMediaPermissions",{useMediaPermissions:function(e){g=e}},8),n.exportDefault(function(e){var i,n=e.collapsed,C=e.chatContext,x=e.disabled,E=l(e,M),T=r(),R=f("FileUpload_Enabled"),V=f("Message_VideoRecorderEnabled"),_=f("FileUpload_MediaTypeBlackList"),w=f("FileUpload_MediaTypeWhiteList"),y=t(g("camera"),2),A=y[0],F=y[1],O=k(function(){return!!(!A&&navigator.mediaDevices&&window.MediaRecorder&&R&&V&&!(null!=_&&_.match(/video\/webm|video\/\*/i))&&(!w||w.match(/video\/webm|video\/\*/i))&&v.getSupportedMimeTypes())},[_,w,R,A,V]),P=h("video",A,R,V,O),U=null!==(i=b())&&void 0!==i?i:C,j=function(){var e,i;null!=U&&null!==(e=U.composer)&&void 0!==e&&e.recordingVideo.get()||null==U||null===(i=U.composer)||void 0===i||i.setRecordingVideo(!0)},D=u(function(e){if(e){var i;null==U||null===(i=U.composer)||void 0===i||i.setRecordingVideo(!1)}F(e)});return(p(function(){D(A)},[D,A]),n)?m.createElement(c,{title:P,disabled:!O||x,onClick:j},m.createElement(a,{name:"video"}),m.createElement(d,null,T("Video_message"))):m.createElement(s,o({"data-qa-id":"video-message",icon:"video",disabled:!O||x,onClick:j,title:P},E))})}
//# sourceMappingURL=/dynamic/client/views/room/composer/messageBox/MessageBoxActionsToolbar/actions/d3cb386fa985bc185950cc161273eceb0e415826.map