function module(t,e,n){var i,o,l,a,u,c,r,s,f,d,k,p,m,x,b,C,v,w,E,h,y,g,B,I,V,S;n.link("@babel/runtime/helpers/extends",{default:function(t){i=t}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(t){o=t}},1),n.link("@rocket.chat/fuselage",{Avatar:function(t){l=t},Box:function(t){a=t},Button:function(t){u=t},ButtonGroup:function(t){c=t},ContextualbarFooter:function(t){r=t},ContextualbarHeader:function(t){s=t},ContextualbarTitle:function(t){f=t}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(t){d=t}},1),n.link("@rocket.chat/fuselage-ui-kit",{UiKitComponent:function(t){k=t},UiKitContextualBar:function(t){p=t},contextualBarParser:function(t){m=t},UiKitContext:function(t){x=t}},2),n.link("@rocket.chat/ui-kit",{BlockContext:function(t){b=t}},3),n.link("react",{default:function(t){C=t},memo:function(t){v=t}},4),n.link("../../../../../app/utils/client",{getURL:function(t){w=t}},5),n.link("../../../../components/Contextualbar",{ContextualbarClose:function(t){E=t},ContextualbarScrollableContent:function(t){h=t}},6),n.link("../../../../lib/utils/preventSyntheticEvent",{preventSyntheticEvent:function(t){y=t}},7),n.link("../../../../uikit/hooks/useContextualBarContextValue",{useContextualBarContextValue:function(t){g=t}},8),n.link("../../../../uikit/hooks/useUiKitActionManager",{useUiKitActionManager:function(t){B=t}},9),n.link("../../../../uikit/hooks/useUiKitView",{useUiKitView:function(t){I=t}},10),n.link("../../../modal/uikit/getButtonStyle",{getButtonStyle:function(t){V=t}},11),n.link("../../contexts/RoomToolboxContext",{useRoomToolbox:function(t){S=t}},12),n.exportDefault(v(function(t){var e=t.initialView,n=B(),v=I(e),U=v.view,K=v.values,N=v.updateValues,T=v.state,A=g({view:U,values:K,updateValues:N}),M=S().closeTab,O=d(function(t){y(t),M(),n.emitInteraction(U.appId,{type:"viewSubmit",payload:{view:o(o({},U),{},{state:T})},viewId:U.id}).finally(function(){n.disposeView(U.id)})}),R=d(function(t){y(t),M(),n.emitInteraction(U.appId,{type:"viewClosed",payload:{viewId:U.id,view:o(o({},U),{},{state:T}),isCleared:!1}}).finally(function(){n.disposeView(U.id)})}),P=d(function(t){y(t),M(),n.emitInteraction(U.appId,{type:"viewClosed",payload:{viewId:U.id,view:o(o({},U),{},{state:T}),isCleared:!0}}).finally(function(){n.disposeView(U.id)})});return C.createElement(x.Provider,{value:A},C.createElement(s,null,C.createElement(l,{url:w("/api/apps/"+U.appId+"/icon")}),C.createElement(f,null,m.text(U.title,b.NONE,0)),P&&C.createElement(E,{onClick:P})),C.createElement(h,null,C.createElement(a,{is:"form",method:"post",action:"#",onSubmit:O},C.createElement(k,{render:p,blocks:U.blocks}))),C.createElement(r,null,C.createElement(c,{stretch:!0},U.close&&C.createElement(u,{danger:"danger"===U.close.style,onClick:R},m.text(U.close.text,b.NONE,0)),U.submit&&C.createElement(u,i({},V(U.submit),{onClick:O}),m.text(U.submit.text,b.NONE,1)))))}))}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/uikit/23d71912ce03f4aa8ae797e7ecc983e3d5067dba.map