function module(e,t,n){var l;let o,r,a,i,c,s,u,m,d,f;n.link("@babel/runtime/helpers/extends",{default(e){o=e}},0),n.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){r=e}},1),n.link("@rocket.chat/css-in-js",{css(e){a=e}},0),n.link("@rocket.chat/fuselage",{Box(e){i=e}},1),n.link("react",{default(e){c=e},forwardRef(e){s=e},useRef(e){u=e}},2),n.link("react-virtuoso",{Virtuoso(e){m=e}},3),n.link("../../../components/ScrollableContentWrapper",{default(e){d=e}},4),n.link("./EmojiCategoryRow",{default(e){f=e}},5);let p=s(function e(e,t){let{emojiListByCategory:n,categoriesPosition:s,customItemsLimit:p,handleLoadMore:k,handleSelectEmoji:g,handleScroll:h}=e,b=u(null);return c.createElement(i,{ref:b,className:a(l||(l=r(["\n				&.pointer-none .rcx-emoji-picker__element {\n					pointer-events: none;\n				}\n			"]))),height:"full"},c.createElement(m,{ref:t,totalCount:n.length,data:n,onScroll:h,components:{Scroller:d},isScrolling:e=>{b.current&&(e?b.current.classList.add("pointer-none"):b.current.classList.remove("pointer-none"))},itemContent:(e,t)=>c.createElement(f,o({categoryKey:t.key,categoriesPosition:s,customItemsLimit:p,handleLoadMore:k,handleSelectEmoji:g},t))}))});n.exportDefault(p)}
//# sourceMappingURL=/dynamic/client/views/composer/EmojiPicker/7f9c923f4209288c6039af063af3fe674216b176.map