"use strict";(self.webpackChunk_rocket_chat_livechat=self.webpackChunk_rocket_chat_livechat||[]).push([[17162,15780,99283,12022,45212,11017,80362,28429,32223,92745],{15780:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.width?String(t.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}},e.exports=t.default},99283:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,a){var n,r=a||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=r.width?String(r.width):o;n=e.formattingValues[i]||e.formattingValues[o]}else{var u=e.defaultWidth,d=r.width?String(r.width):e.defaultWidth;n=e.values[d]||e.values[u]}return n[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},12022:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a.width,r=n&&e.matchPatterns[n]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;var i,u=o[0],d=n&&e.parsePatterns[n]||e.parsePatterns[e.defaultParseWidth],l=Array.isArray(d)?function(e,t){for(var a=0;a<e.length;a++)if(e[a].test(u))return a}(d):function(e,t){for(var a in e)if(e.hasOwnProperty(a)&&e[a].test(u))return a}(d);return i=e.valueCallback?e.valueCallback(l):l,{value:i=a.valueCallback?a.valueCallback(i):i,rest:t.slice(u.length)}}},e.exports=t.default},45212:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(e.matchPattern);if(!n)return null;var r=n[0],o=t.match(e.parsePattern);if(!o)return null;var i=e.valueCallback?e.valueCallback(o[0]):o[0];return{value:i=a.valueCallback?a.valueCallback(i):i,rest:t.slice(r.length)}}},e.exports=t.default},11017:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={lessThanXSeconds:{one:"أقل من ثانية",two:"أقل من زوز ثواني",threeToTen:"أقل من {{count}} ثواني",other:"أقل من {{count}} ثانية"},xSeconds:{one:"ثانية",two:"زوز ثواني",threeToTen:"{{count}} ثواني",other:"{{count}} ثانية"},halfAMinute:"نص دقيقة",lessThanXMinutes:{one:"أقل من دقيقة",two:"أقل من دقيقتين",threeToTen:"أقل من {{count}} دقايق",other:"أقل من {{count}} دقيقة"},xMinutes:{one:"دقيقة",two:"دقيقتين",threeToTen:"{{count}} دقايق",other:"{{count}} دقيقة"},aboutXHours:{one:"ساعة تقريب",two:"ساعتين تقريب",threeToTen:"{{count}} سوايع تقريب",other:"{{count}} ساعة تقريب"},xHours:{one:"ساعة",two:"ساعتين",threeToTen:"{{count}} سوايع",other:"{{count}} ساعة"},xDays:{one:"نهار",two:"نهارين",threeToTen:"{{count}} أيام",other:"{{count}} يوم"},aboutXWeeks:{one:"جمعة تقريب",two:"جمعتين تقريب",threeToTen:"{{count}} جماع تقريب",other:"{{count}} جمعة تقريب"},xWeeks:{one:"جمعة",two:"جمعتين",threeToTen:"{{count}} جماع",other:"{{count}} جمعة"},aboutXMonths:{one:"شهر تقريب",two:"شهرين تقريب",threeToTen:"{{count}} أشهرة تقريب",other:"{{count}} شهر تقريب"},xMonths:{one:"شهر",two:"شهرين",threeToTen:"{{count}} أشهرة",other:"{{count}} شهر"},aboutXYears:{one:"عام تقريب",two:"عامين تقريب",threeToTen:"{{count}} أعوام تقريب",other:"{{count}} عام تقريب"},xYears:{one:"عام",two:"عامين",threeToTen:"{{count}} أعوام",other:"{{count}} عام"},overXYears:{one:"أكثر من عام",two:"أكثر من عامين",threeToTen:"أكثر من {{count}} أعوام",other:"أكثر من {{count}} عام"},almostXYears:{one:"عام تقريب",two:"عامين تقريب",threeToTen:"{{count}} أعوام تقريب",other:"{{count}} عام تقريب"}};t.default=function(e,t,n){var r,o=a[e];return r="string"==typeof o?o:1===t?o.one:2===t?o.two:t<=10?o.threeToTen.replace("{{count}}",String(t)):o.other.replace("{{count}}",String(t)),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"في "+r:"عندو "+r:r},e.exports=t.default},80362:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,r=(n=a(15780))&&n.__esModule?n:{default:n},o={date:(0,r.default)({formats:{full:"EEEE، do MMMM y",long:"do MMMM y",medium:"d MMM y",short:"dd/MM/yyyy"},defaultWidth:"full"}),time:(0,r.default)({formats:{full:"HH:mm:ss",long:"HH:mm:ss",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,r.default)({formats:{full:"{{date}} 'مع' {{time}}",long:"{{date}} 'مع' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})};t.default=o,e.exports=t.default},28429:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={lastWeek:"eeee 'إلي فات مع' p",yesterday:"'البارح مع' p",today:"'اليوم مع' p",tomorrow:"'غدوة مع' p",nextWeek:"eeee 'الجمعة الجاية مع' p 'نهار'",other:"P"};t.default=function(e){return a[e]},e.exports=t.default},32223:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,r=(n=a(99283))&&n.__esModule?n:{default:n},o={ordinalNumber:function(e){return String(e)},era:(0,r.default)({values:{narrow:["ق","ب"],abbreviated:["ق.م.","ب.م."],wide:["قبل الميلاد","بعد الميلاد"]},defaultWidth:"wide"}),quarter:(0,r.default)({values:{narrow:["1","2","3","4"],abbreviated:["ر1","ر2","ر3","ر4"],wide:["الربع الأول","الربع الثاني","الربع الثالث","الربع الرابع"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,r.default)({values:{narrow:["د","ن","أ","س","أ","ج","ج","م","أ","م","ف","ج"],abbreviated:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],wide:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]},defaultWidth:"wide"}),day:(0,r.default)({values:{narrow:["ح","ن","ث","ر","خ","ج","س"],short:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],abbreviated:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],wide:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]},defaultWidth:"wide"}),dayPeriod:(0,r.default)({values:{narrow:{am:"ص",pm:"ع",morning:"الصباح",noon:"القايلة",afternoon:"بعد القايلة",evening:"العشية",night:"الليل",midnight:"نص الليل"},abbreviated:{am:"ص",pm:"ع",morning:"الصباح",noon:"القايلة",afternoon:"بعد القايلة",evening:"العشية",night:"الليل",midnight:"نص الليل"},wide:{am:"ص",pm:"ع",morning:"الصباح",noon:"القايلة",afternoon:"بعد القايلة",evening:"العشية",night:"الليل",midnight:"نص الليل"}},defaultWidth:"wide",formattingValues:{narrow:{am:"ص",pm:"ع",morning:"في الصباح",noon:"في القايلة",afternoon:"بعد القايلة",evening:"في العشية",night:"في الليل",midnight:"نص الليل"},abbreviated:{am:"ص",pm:"ع",morning:"في الصباح",noon:"في القايلة",afternoon:"بعد القايلة",evening:"في العشية",night:"في الليل",midnight:"نص الليل"},wide:{am:"ص",pm:"ع",morning:"في الصباح",noon:"في القايلة",afternoon:"بعد القايلة",evening:"في العشية",night:"في الليل",midnight:"نص الليل"}},defaultFormattingWidth:"wide"})};t.default=o,e.exports=t.default},92745:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a(45212)),r=o(a(12022));function o(e){return e&&e.__esModule?e:{default:e}}var i={ordinalNumber:(0,n.default)({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,r.default)({matchPatterns:{narrow:/[قب]/,abbreviated:/[قب]\.م\./,wide:/(قبل|بعد) الميلاد/},defaultMatchWidth:"wide",parsePatterns:{any:[/قبل/,/بعد/]},defaultParseWidth:"any"}),quarter:(0,r.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/ر[1234]/,wide:/الربع (الأول|الثاني|الثالث|الرابع)/},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,r.default)({matchPatterns:{narrow:/^[جفمأسند]/,abbreviated:/^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,wide:/^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ج/i,/^ف/i,/^م/i,/^أ/i,/^م/i,/^ج/i,/^ج/i,/^أ/i,/^س/i,/^أ/i,/^ن/i,/^د/i],any:[/^جانفي/i,/^فيفري/i,/^مارس/i,/^أفريل/i,/^ماي/i,/^جوان/i,/^جويلية/i,/^أوت/i,/^سبتمبر/i,/^أكتوبر/i,/^نوفمبر/i,/^ديسمبر/i]},defaultParseWidth:"any"}),day:(0,r.default)({matchPatterns:{narrow:/^[حنثرخجس]/i,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,abbreviated:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ح/i,/^ن/i,/^ث/i,/^ر/i,/^خ/i,/^ج/i,/^س/i],wide:[/^الأحد/i,/^الاثنين/i,/^الثلاثاء/i,/^الأربعاء/i,/^الخميس/i,/^الجمعة/i,/^السبت/i],any:[/^أح/i,/^اث/i,/^ث/i,/^أر/i,/^خ/i,/^ج/i,/^س/i]},defaultParseWidth:"any"}),dayPeriod:(0,r.default)({matchPatterns:{narrow:/^(ص|ع|ن ل|ل|(في|مع) (صباح|قايلة|عشية|ليل))/,any:/^([صع]|نص الليل|قايلة|(في|مع) (صباح|قايلة|عشية|ليل))/},defaultMatchWidth:"any",parsePatterns:{any:{am:/^ص/,pm:/^ع/,midnight:/نص الليل/,noon:/قايلة/,afternoon:/بعد القايلة/,morning:/صباح/,evening:/عشية/,night:/ليل/}},defaultParseWidth:"any"})};t.default=i,e.exports=t.default},17162:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=d(a(11017)),r=d(a(80362)),o=d(a(28429)),i=d(a(32223)),u=d(a(92745));function d(e){return e&&e.__esModule?e:{default:e}}var l={code:"ar-TN",formatDistance:n.default,formatLong:r.default,formatRelative:o.default,localize:i.default,match:u.default,options:{weekStartsOn:1,firstWeekContainsDate:1}};t.default=l,e.exports=t.default}}]);
//# sourceMappingURL=17162.chunk.5a630.js.map