function module(e,i,t){let n,l;t.link("../lib/utils/domEvents",{"*"(e){n=e}},0),t.link("../lib/utils/isIOsDevice",{isIOsDevice(e){l=e}},1),l&&window.matchMedia("(hover: none)").matches&&n.delegate({parent:document.body,eventName:"touchend",elementSelector:"a:hover",listener:(e,i)=>{n.triggerClick(i)}})}
//# sourceMappingURL=/dynamic/client/polyfills/83ffe8deaf1e19eeca35598125462cc85ddb4722.map
