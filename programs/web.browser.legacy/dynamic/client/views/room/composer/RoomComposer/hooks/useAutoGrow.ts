function module(e,n,t){t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},1),t.export({useAutoGrow:function(){return c}}),t.link("@rocket.chat/fuselage-hooks",{useContentBoxSize:function(e){o=e}},0),t.link("react",{useEffect:function(e){l=e},useState:function(e){u=e}},1);var r,i,o,l,u,a={position:"fixed",top:"-10000px",left:"-10000px",resize:"none",whiteSpace:"pre-wrap",wordWrap:"break-word",willChange:"contents"},c=function(e,n,t){var c=i(u(function(){return e.current&&window.getComputedStyle(e.current)}),2),p=c[0],d=c[1];l(function(){e.current&&d(function(){return e.current&&window.getComputedStyle(e.current)})},[e]),l(function(){var t=e.current;if(t){var r=function(){var e=t.value,r=n.current;r&&(r.innerHTML=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>"))};return t.addEventListener("input",r),function(){t.removeEventListener("input",r)}}},[e,n]);var f=o(n),w=o(e);return{textAreaStyle:r(r({},t&&{visibility:"hidden"}),{},{whiteSpace:"pre-wrap",wordWrap:"break-word",overflowWrap:"break-word",willChange:"contents",wordBreak:"normal",overflowY:f.blockSize>parseInt((null==p?void 0:p.maxHeight)||"0")?"scroll":"hidden"},f.blockSize&&{height:f.blockSize+"px"}),shadowStyle:r(r({},a),{},{font:null==p?void 0:p.font,width:w.inlineSize,minHeight:null==p?void 0:p.lineHeight,lineHeight:null==p?void 0:p.lineHeight})}}}
//# sourceMappingURL=/dynamic/client/views/room/composer/RoomComposer/hooks/09599ad2d4065f67e5040181125f9d0c960e761e.map