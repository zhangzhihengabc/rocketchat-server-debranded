function module(e,r,n){var t,l,u,i;n.link("react",{default:function(e){t=e}},0),n.link("./UrlAudioPreview",{default:function(e){l=e}},1),n.link("./UrlImagePreview",{default:function(e){u=e}},2),n.link("./UrlVideoPreview",{default:function(e){i=e}},3),n.exportDefault(function(e){var r=e.url,n=e.type,a=e.originalType;switch(n){case"audio":return t.createElement(l,{url:r});case"video":return t.createElement(i,{url:r,originalType:a});case"image":return t.createElement(u,{url:r});default:return null}})}
//# sourceMappingURL=/dynamic/client/components/message/content/urlPreviews/a1877c8c5d5a1c55d33bbafb246e31e3477c2db0.map