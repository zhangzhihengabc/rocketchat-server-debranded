function module(e,n,t){var i,r,l,c,o,a,u,s,f,d,m,h;t.link("@babel/runtime/helpers/taggedTemplateLiteralLoose",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},1),t.link("@rocket.chat/css-in-js",{css:function(e){c=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){o=e},Icon:function(e){a=e}},1),t.link("react",{default:function(e){u=e},useCallback:function(e){s=e},useEffect:function(e){f=e},useState:function(e){d=e}},2),t.link("react-dom",{createPortal:function(e){m=e}},3),t.link("./ScreenshotCarousel",{default:function(e){h=e}},4),t.exportDefault(function(e){var n,t=e.screenshots,p=l(d(!1),2),v=p[0],g=p[1],k=l(d(0),2),x=k[0],E=k[1],b=l(d(0),2),S=b[0],w=b[1],y=t.length,I=0===x,L=x===y-1,A=v&&(null==t?void 0:t.length),C=s(function(e){({ArrowLeft:function(){return E(function(e){return 0!==e?e-1:0})},ArrowRight:function(){return E(function(e){return e!==y-1?e+1:y-1})},Escape:function(){return g(!1)}})[e.key]()},[y]);f(function(){var e=setInterval(function(){w(function(e){return e===y-1?0:e+1})},5e3);return document.addEventListener("keydown",C),function(){clearInterval(e),document.removeEventListener("keydown",C)}},[C,y]);var D=m(u.createElement(h,{AppScreenshots:t,setViewCarousel:g,handleNextSlide:function(){E(x+1)},handlePrevSlide:function(){E(x-1)},isFirstSlide:I,isLastSlide:L,currentSlideIndex:x}),document.body);return u.createElement(u.Fragment,null,u.createElement(o,{onClick:function(){return g(!0)},display:"flex",flexDirection:"column",maxWidth:"x640",width:"100%",style:{cursor:"pointer"},tabIndex:0},u.createElement(o,{is:"img",src:null===(n=t[S])||void 0===n?void 0:n.accessUrl,alt:"App preview image",className:[c(i||(i=r(["\n							transition: filter 0.2s ease;\n							&:hover {\n								filter: brightness(90%);\n							}\n						"])))]}),u.createElement(o,{display:"flex",flexDirection:"row",bg:"tint",pi:16,pb:10,alignItems:"center"},u.createElement(a,{name:"image",size:"x24",mie:8})," ",u.createElement(o,{is:"span",fontScale:"p2m",color:"default"},S+1," of ",t.length))),A&&D)})}
//# sourceMappingURL=/dynamic/client/views/marketplace/components/5f8e07dd5cc74f8ade3a2131287482714da44d61.map