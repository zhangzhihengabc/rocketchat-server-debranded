function module(t,e,n){var i,o,u,r,l,c,a,s,f,d,v,m,b;n.link("@babel/runtime/helpers/slicedToArray",{default:function(t){i=t}},0),n.link("@rocket.chat/fuselage-hooks",{useDebouncedState:function(t){o=t},useMediaQuery:function(t){u=t}},0),n.link("@rocket.chat/ui-client",{TooltipComponent:function(t){r=t}},1),n.link("@rocket.chat/ui-contexts",{TooltipContext:function(t){l=t}},2),n.link("react",{default:function(t){c=t},useEffect:function(t){a=t},useMemo:function(t){s=t},useRef:function(t){f=t},memo:function(t){d=t},useCallback:function(t){v=t},useState:function(t){m=t}},3),n.link("../components/TooltipPortal",{default:function(t){b=t}},4),n.exportDefault(d(function(t){var e=t.children,n=f(),d=!u("(hover: none)"),p=i(o(null,300),2),k=p[0],A=p[1],E=v(function(t){setTimeout(function(){if(t&&!t.getAttribute("title")){var e;t.setAttribute("title",null!==(e=t.getAttribute("data-title"))&&void 0!==e?e:""),t.removeAttribute("data-title")}},0)},[]),g=s(function(){return{open:function(t,e){var i=n.current;A(c.createElement(r,{key:new Date().toISOString(),title:t,anchor:e})),n.current=e,i&&E(i)},close:function(){var t=n.current;A(null),A.flush(),n.current=void 0,t&&E(t)},dismiss:function(){A(null),A.flush()}}},[A,E]);return a(function(){if(d){var t=function(t){var e,o,u=t.target;if(n.current!==u){var r=u.closest("[title], [data-tooltip]");if(n.current!==r){if(!r){g.close();return}var l=null!==(e=null!==(o=r.getAttribute("title"))&&void 0!==o?o:r.getAttribute("data-tooltip"))&&void 0!==e?e:"";if(!l){g.close();return}g.open(c.createElement(function(){var t=i(m(l),2),e=t[0],n=t[1];return a(function(){var t=function(){return g.close()};r.setAttribute("data-title",l),r.setAttribute("title",""),r.addEventListener("mouseleave",t);var e=new MutationObserver(function(){var t,e,i=null!==(t=null!==(e=r.getAttribute("title"))&&void 0!==e?e:r.getAttribute("data-tooltip"))&&void 0!==t?t:"";""!==i&&(r.setAttribute("data-title",i),r.setAttribute("title",""),n(i))});return e.observe(r,{attributes:!0,attributeFilter:["title","data-tooltip"]}),function(){r.removeEventListener("mouseleave",t),e.disconnect()}},[]),c.createElement(c.Fragment,null,e)},null),r)}}},e=function(){g.dismiss()};return document.body.addEventListener("mouseover",t,{passive:!0}),document.body.addEventListener("click",e,{capture:!0}),function(){g.close(),document.body.removeEventListener("mouseover",t),document.body.removeEventListener("click",e)}}},[g,A,d]),c.createElement(l.Provider,{value:g},e,k&&c.createElement(b,null,k))}))}
//# sourceMappingURL=/dynamic/client/providers/2eda670517fceea9a367cd77813fe5c0c44b5e81.map