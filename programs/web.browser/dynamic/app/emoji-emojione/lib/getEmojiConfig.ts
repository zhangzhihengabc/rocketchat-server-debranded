function module(e,o,t){let i,a,c,s,n;t.export({getEmojiConfig:()=>u}),t.link("emojione",{default(e){i=e}},0),t.link("mem",{default(e){a=e}},1),t.link("./emojiPicker",{emojisByCategory(e){c=e},emojiCategories(e){s=e},toneList(e){n=e}},2),i.shortnames+="|:tm:|:copyright:|:registered:|:digit_zero:|:digit_one:|:digit_two:|:digit_three:|:digit_four:|:digit_five:|:digit_six:|:digit_seven:|:digit_eight:|:digit_nine:|:pound_symbol:|:asterisk_symbol:",i.regShortNames=RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(".concat(i.shortnames,")"),"gi"),i.emojioneList[":tm:"]={uc_base:"2122",uc_output:"2122-fe0f",uc_match:"2122-fe0f",uc_greedy:"2122-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":copyright:"]={uc_base:"00a9",uc_output:"00a9-f0ef",uc_match:"00a9-fe0f",uc_greedy:"00a9-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":registered:"]={uc_base:"00ae",uc_output:"00ae-fe0f",uc_match:"00ae-fe0f",uc_greedy:"00ae-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_zero:"]={uc_base:"0030",uc_output:"0030-fe0f",uc_match:"0030-fe0f",uc_greedy:"0030-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_one:"]={uc_base:"0031",uc_output:"0031-fe0f",uc_match:"0031-fe0f",uc_greedy:"0031-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_two:"]={uc_base:"0032",uc_output:"0032-fe0f",uc_match:"0032-fe0f",uc_greedy:"0032-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_three:"]={uc_base:"0033",uc_output:"0033-fe0f",uc_match:"0033-fe0f",uc_greedy:"0033-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_four:"]={uc_base:"0034",uc_output:"0034-fe0f",uc_match:"0034-fe0f",uc_greedy:"0034-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_five:"]={uc_base:"0035",uc_output:"0035-fe0f",uc_match:"0035-fe0f",uc_greedy:"0035-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_six:"]={uc_base:"0036",uc_output:"0036-fe0f",uc_match:"0036-fe0f",uc_greedy:"0036-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_seven:"]={uc_base:"0037",uc_output:"0037-fe0f",uc_match:"0037-fe0f",uc_greedy:"0037-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_eight:"]={uc_base:"0038",uc_output:"0038-fe0f",uc_match:"0038-fe0f",uc_greedy:"0038-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":digit_nine:"]={uc_base:"0039",uc_output:"0039-fe0f",uc_match:"0039-fe0f",uc_greedy:"0039-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":pound_symbol:"]={uc_base:"0023",uc_output:"0023-fe0f",uc_match:"0023-fe0f",uc_greedy:"0023-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.emojioneList[":asterisk_symbol:"]={uc_base:"002a",uc_output:"002a-fe0f",uc_match:"002a-fe0f",uc_greedy:"002a-fe0f",shortnames:[],category:"symbols",emojiPackage:"emojione"},i.shortnameConversionMap=a(i.shortnameConversionMap,{maxAge:1e3}),i.unicodeCharRegex=a(i.unicodeCharRegex,{maxAge:1e3});let m=a(e=>{if(void 0===e||""===e||-1===i.shortnames.indexOf(e.replace(/[+]/g,"\\$&")))return e;if(!i.emojioneList[e]){for(let o in i.emojioneList)if(i.emojioneList.hasOwnProperty(o)&&""!==o&&-1!==i.emojioneList[o].shortnames.indexOf(e)){e=o;break}}let o=i.emojioneList[e].uc_output,t=i.emojioneList[e].uc_base,a=t.indexOf("-1f3f")>=0?"diversity":i.emojioneList[e].category,c=i.imageTitleTag?'title="'.concat(e,'"'):"",s=i.defaultPathPNG!==i.imagePathPNG?i.imagePathPNG:"".concat(i.defaultPathPNG+i.emojiSize,"/"),n=i.unicodeAlt?i.convert(o.toUpperCase()):e;return i.sprites?'<span class="emojione emojione-'.concat(a," _").concat(t,'" ').concat(c,">").concat(n,"</span>"):'<img class="emojione" alt="'.concat(n,'" ').concat(c,' src="').concat(s).concat(t).concat(i.fileExtension,'"/>')},{maxAge:1e3}),r=a((e,o,t,a)=>{if(void 0===a||""===a||!(i.unescapeHTML(a) in i.asciiList))return e;a=i.unescapeHTML(a);let c=i.asciiList[a],s=i.mapUnicodeToShort()[c],n=c.indexOf("-1f3f")>=0?"diversity":i.emojioneList[s].category,m=i.imageTitleTag?'title="'.concat(i.escapeHTML(a),'"'):"",r=i.defaultPathPNG!==i.imagePathPNG?i.imagePathPNG:"".concat(i.defaultPathPNG+i.emojiSize,"/"),f=i.unicodeAlt?i.convert(c.toUpperCase()):i.escapeHTML(a);return i.sprites?"".concat(t,'<span class="emojione emojione-').concat(n," _").concat(c,'"  ').concat(m,">").concat(f,"</span>"):"".concat(t,'<img class="emojione" alt="').concat(f,'" ').concat(m,' src="').concat(r).concat(c).concat(i.fileExtension,'"/>')},{maxAge:1e3,cacheKey:JSON.stringify});i.shortnameToImage=e=>{if(e=e.replace(i.regShortNames,m),i.ascii){let o=i.riskyMatchAscii?i.regAsciiRisky:i.regAscii;return e.replace(o,r)}return e};let f=e=>{if(e=e.replace(i.regShortNames,m),i.ascii){let o=i.riskyMatchAscii?i.regAsciiRisky:i.regAscii;return e.replace(o,r)}return e},u=()=>({emojione:i,emojisByCategory:c,emojiCategories:s,toneList:n,render:i.toImage,renderPicker:i.shortnameToImage,sprites:!0,isEmojiSupported:f})}
//# sourceMappingURL=/dynamic/app/emoji-emojione/lib/1c0c8b54a85d08e672a1386442a7b73855665f93.map