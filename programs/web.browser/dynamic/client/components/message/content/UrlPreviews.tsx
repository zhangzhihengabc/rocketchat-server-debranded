function module(e,t,i){let r,l,a,m,o,d,n;i.link("@babel/runtime/helpers/objectSpread2",{default(e){r=e}},0),i.link("@rocket.chat/fuselage",{MessageBlock(e){l=e}},0),i.link("react",{default(e){a=e}},1),i.link("../hooks/useOembedLayout",{useOembedLayout(e){m=e}},2),i.link("./urlPreviews/OEmbedResolver",{default(e){o=e}},3),i.link("./urlPreviews/UrlPreview",{default(e){d=e}},4),i.link("./urlPreviews/buildImageURL",{buildImageURL(e){n=e}},5);let u=e=>{let{url:t,meta:i}=e,l=i.ogImage||i.twitterImage||i.msapplicationTileImage||i.oembedThumbnailUrl||i.oembedThumbnailUrl,a=i.ogImageHeight||i.oembedHeight||i.oembedThumbnailHeight,m=i.ogImageWidth||i.oembedWidth||i.oembedThumbnailWidth;return Object.fromEntries(Object.entries(r(r({siteName:i.ogSiteName||i.oembedProviderName,siteUrl:i.ogUrl||i.oembedProviderUrl,title:i.ogTitle||i.twitterTitle||i.title||i.pageTitle||i.oembedTitle,description:i.ogDescription||i.twitterDescription||i.description,authorName:i.oembedAuthorName,authorUrl:i.oembedAuthorUrl},l&&{image:{url:n(t,l),dimensions:r(r({},a&&{height:a}),m&&{width:m})}}),{},{url:i.oembedUrl||t,type:i.ogType||i.oembedType},i.oembedHtml&&{html:i.oembedHtml})).filter(e=>{let[,t]=e;return t}))},h=e=>!!e&&"contentType"in e,b=e=>h(e)?e.contentType.match(/image\/.*/)?"image":e.contentType.match(/audio\/.*/)?"audio":e.contentType.match(/video\/.*/)?"video":void 0:void 0,s=e=>{let{siteName:t,siteUrl:i,authorName:r,authorUrl:l,title:a,description:m,image:o,html:d}=e;return!((!t||!i)&&(!r||!l)&&!a&&!m&&!o&&!d)},c=e=>!!e.meta&&!!Object.values(e.meta),g=e=>{var t;if(!e.headers&&!e.meta)return!1;let i=c(e)?u(e):void 0;if(i&&s(i))return{type:"oembed",data:i};let r=b(e.headers);return!!r&&{type:"headers",data:{url:e.url,type:r,originalType:h(e.headers)?null===(t=e.headers)||void 0===t?void 0:t.contentType:""}}},p=e=>!!e,T=(e,t)=>"oembed"===t;i.exportDefault(e=>{let{urls:t}=e,{maxWidth:i}=m(),r=t.map(g).filter(p);return a.createElement(a.Fragment,null,r.map((e,t)=>{let{type:r,data:m}=e;return T(m,r)?a.createElement(l,{width:"100%",maxWidth:i,key:t},a.createElement(o,{meta:m})):a.createElement(l,{width:"100%",maxWidth:i,key:t},a.createElement(d,m))}))})}
//# sourceMappingURL=/dynamic/client/components/message/content/f8deaa96cf6d7916f5432a5b44fdbe1a8fbb4831.map