function module(n,e,t){var i,o,u,r,c,l,a,f,m,s,j,k,d,p,v,E,h,C;t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){i=n}},0),t.link("@babel/runtime/helpers/toConsumableArray",{default:function(n){o=n}},1),t.link("@babel/runtime/helpers/slicedToArray",{default:function(n){u=n}},2),t.link("@rocket.chat/fuselage-hooks",{useDebouncedState:function(n){r=n},useLocalStorage:function(n){c=n}},0),t.link("react",{default:function(n){l=n},useState:function(n){a=n},useCallback:function(n){f=n},useMemo:function(n){m=n},useEffect:function(n){s=n}},1),t.link("../../app/emoji/client",{emoji:function(n){j=n},getFrequentEmoji:function(n){k=n},updateRecent:function(n){d=n},createEmojiList:function(n){p=n},createPickerEmojis:function(n){v=n},CUSTOM_CATEGORY:function(n){E=n}},2),t.link("../contexts/EmojiPickerContext",{EmojiPickerContext:function(n){h=n}},3),t.link("../views/composer/EmojiPicker/EmojiPicker",{default:function(n){C=n}},4),t.exportDefault(function(n){var e=n.children,t=u(a(null),2),b=t[0],g=t[1],y=u(r(null,100),2),P=y[0],x=y[1],R=u(c("emoji.recent",[]),2),T=R[0],L=R[1],S=u(c("emoji.tone",0),2),w=S[0],A=S[1],M=u(a("recent"),2),O=M[0],q=M[1],B=u(a(90),2),D=B[0],I=B[1],F=u(c("emoji.frequent",[]),2),G=F[0],U=F[1],Y=a(function(){return k(G.map(function(n){return u(n,1)[0]}))}),_=u(Y,2),z=_[0],H=_[1],J=f(function(n){var e=[].concat(G.some(function(e){return u(e,1)[0]===n})?[]:[[n,0]],o(G)).map(function(e){var t=u(e,2),i=t[0],o=t[1];return i===n?[i,Math.min(o+5,100)]:[i,Math.max(o-1,0)]}).sort(function(n,e){var t=u(n,2)[1];return u(e,2)[1]-t});U(e),H(k(e.map(function(n){return u(n,1)[0]})))},[G,U]),K=u(a(function(){return function(){return[]}}),2),N=K[0],Q=K[1],V=f(function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:90;Q(function(t){return function(){return t().map(function(t){return n===t.key?i(i({},t),{},{emojis:{list:p(t.key,null,T,L),limit:t.key===E?e|D:null}}):t})}})},[D,T,L]);s(function(){(null==T?void 0:T.length)>0&&d(T),Q(function(){return function(){return v(D,w,T,L)}})},[w,T,D,O,L,G]);var W=f(function(n){J(n);var e=T||[],t=e.indexOf(n);-1!==t&&e.splice(t,1),e.unshift(n),e.splice(27),L(e),j.packages.base.emojisByCategory.recent=e,V("recent")},[T,L,V,J]),X=f(function(n,e){return g(l.createElement(C,{reference:n,onClose:function(){return g(null)},onPickEmoji:function(n){return e(n)}}))},[]),Z=f(function(n,e){return x({emoji:n,name:e})},[x]),$=f(function(){return x(null)},[x]),nn=m(function(){return{isOpen:null!==b,close:function(){return g(null)},open:X,emojiToPreview:P,handlePreview:Z,handleRemovePreview:$,addRecentEmoji:W,getEmojiListsByCategory:N,recentEmojis:T,setRecentEmojis:L,actualTone:w,currentCategory:O,setCurrentCategory:q,customItemsLimit:D,setCustomItemsLimit:I,setActualTone:A,quickReactions:z}},[b,X,P,W,N,T,L,w,O,q,D,A,z,Z,$]);return l.createElement(h.Provider,{value:nn},e,b)})}
//# sourceMappingURL=/dynamic/client/providers/ea76207ac61c5de32b899ed0df4be51b07f729ac.map