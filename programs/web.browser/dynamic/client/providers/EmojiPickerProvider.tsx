function module(e,t,l){let n,i,o,r,u,a,c,m,s,k,j,p,f,E,d,h;l.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),l.link("@rocket.chat/fuselage-hooks",{useDebouncedState(e){i=e},useLocalStorage(e){o=e}},0),l.link("react",{default(e){r=e},useState(e){u=e},useCallback(e){a=e},useMemo(e){c=e},useEffect(e){m=e}},1),l.link("../../app/emoji/client",{emoji(e){s=e},getFrequentEmoji(e){k=e},updateRecent(e){j=e},createEmojiList(e){p=e},createPickerEmojis(e){f=e},CUSTOM_CATEGORY(e){E=e}},2),l.link("../contexts/EmojiPickerContext",{EmojiPickerContext(e){d=e}},3),l.link("../views/composer/EmojiPicker/EmojiPicker",{default(e){h=e}},4),l.exportDefault(e=>{let{children:t}=e,[l,g]=u(null),[C,P]=i(null,100),[b,x]=o("emoji.recent",[]),[v,y]=o("emoji.tone",0),[S,M]=u("recent"),[O,q]=u(90),[D,L]=o("emoji.frequent",[]),[R,T]=u(()=>k(D.map(e=>{let[t]=e;return t}))),w=a(e=>{let t=D.some(t=>{let[l]=t;return l===e})?[]:[[e,0]],l=[...t,...D].map(t=>{let[l,n]=t;return l===e?[l,Math.min(n+5,100)]:[l,Math.max(n-1,0)]}).sort((e,t)=>{let[,l]=e,[,n]=t;return n-l});L(l),T(k(l.map(e=>{let[t]=e;return t})))},[D,L]),[A,B]=u(()=>()=>[]),F=a(function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:90;B(l=>()=>l().map(l=>e===l.key?n(n({},l),{},{emojis:{list:p(l.key,null,b,x),limit:l.key===E?t|O:null}}):l))},[O,b,x]);m(()=>{(null==b?void 0:b.length)>0&&j(b),B(()=>()=>f(O,v,b,x))},[v,b,O,S,x,D]);let G=a(e=>{w(e);let t=b||[],l=t.indexOf(e);-1!==l&&t.splice(l,1),t.unshift(e),t.splice(27),x(t),s.packages.base.emojisByCategory.recent=t,F("recent")},[b,x,F,w]),U=a((e,t)=>g(r.createElement(h,{reference:e,onClose:()=>g(null),onPickEmoji:e=>t(e)})),[]),Y=a((e,t)=>P({emoji:e,name:t}),[P]),_=a(()=>P(null),[P]),z=c(()=>({isOpen:null!==l,close:()=>g(null),open:U,emojiToPreview:C,handlePreview:Y,handleRemovePreview:_,addRecentEmoji:G,getEmojiListsByCategory:A,recentEmojis:b,setRecentEmojis:x,actualTone:v,currentCategory:S,setCurrentCategory:M,customItemsLimit:O,setCustomItemsLimit:q,setActualTone:y,quickReactions:R}),[l,U,C,G,A,b,x,v,S,M,O,y,R,Y,_]);return r.createElement(d.Provider,{value:z},t,l)})}
//# sourceMappingURL=/dynamic/client/providers/aa83a9de7861e2fd230cd7a22ea643db588c11b1.map