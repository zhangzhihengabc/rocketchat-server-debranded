function module(e,t,l){var r,n;let a,i;l.link("../../lib/utils/highOrderFunctions",{withDebouncing(e){a=e}},0);let s=e=>{var t;return(null!==(t=e.match(/(--[^:; ]+:..*?;)/g))&&void 0!==t?t:[]).map(e=>{let t=/(.*?):\s*(.*?)\s*;/.exec(e);if(null===t)throw Error();let[,l,r]=t;return[l,r.indexOf("var(")>=0?e=>r.replace(/var\((--.*?)\)/gm,(t,l)=>{var r;return null===(r=e[l])||void 0===r?void 0:r.call(null,e)}):()=>r]})},c=(e,t)=>e.replace(/var\((--.*?)\)/gm,(e,l)=>{var r;return null===(r=t[l])||void 0===r?void 0:r.call(null,t)}),o=new Map,u=a({wait:100})(()=>{let e=[].concat(...Array.from(o.values(),s),s(i.innerHTML)),t=Object.fromEntries(e);o.forEach((e,l)=>{let r=c(e,t),n=l.nextElementSibling;n&&n.classList.contains("patched-css-variables")||((n=document.createElement("style")).type="text/css",n.classList.add("patched-css-variables"),l.insertAdjacentElement("afterend",n));let{sheet:a}=n;for(;a.cssRules.length>0;)a.deleteRule(0);a.insertRule("@media all {".concat(r,"}"),0)})}),d=()=>{Array.from(document.querySelectorAll('link[type="text/css"].__meteor-css__')).forEach(async e=>{let t=e.getAttribute("href");if(null!==t)try{let l=await fetch(t),r=await l.text();o.set(e,r)}catch(e){console.warn(e)}finally{u()}})},m=()=>{if("complete"!==document.readyState){requestAnimationFrame(m);return}let e=document.getElementById("css-variables");if(null===e){requestAnimationFrame(m);return}i=e;let t=new MutationObserver(()=>{u()});t.observe(i,{childList:!0}),d()};null!==(r=window.CSS)&&void 0!==r&&null!==(n=r.supports)&&void 0!==n&&n.call(r,"(--foo: red)")||m()}
//# sourceMappingURL=/dynamic/client/polyfills/aed12f5c146dca6fb0b963c22154f9edca7d9991.map