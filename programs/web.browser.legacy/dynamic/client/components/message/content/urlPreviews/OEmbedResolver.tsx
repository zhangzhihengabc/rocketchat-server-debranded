function module(e,t,n){var a,i,r,u;n.link("react",{default:function(e){a=e}},0),n.link("./OEmbedHtmlPreview",{default:function(e){i=e}},1),n.link("./OEmbedImagePreview",{default:function(e){r=e}},2),n.link("./OEmbedLinkPreview",{default:function(e){u=e}},3),n.exportDefault(function(e){var t=e.meta;switch(t.type){case"rich":case"video":return a.createElement(i,t);case"photo":return a.createElement(r,t);default:return a.createElement(u,t)}})}
//# sourceMappingURL=/dynamic/client/components/message/content/urlPreviews/c649263777bd1d6b53447fcdd806c68610540ada.map