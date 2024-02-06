"use strict";(self.webpackChunk_rocket_chat_livechat=self.webpackChunk_rocket_chat_livechat||[]).push([[83058,15780,99283,12022,45212,6238,34486,69893,37392,65311],{15780:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.width?String(t.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}},e.exports=t.default},99283:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,a){var n,o=a||{};if("formatting"===(o.context?String(o.context):"standalone")&&e.formattingValues){var r=e.defaultFormattingWidth||e.defaultWidth,u=o.width?String(o.width):r;n=e.formattingValues[u]||e.formattingValues[r]}else{var d=e.defaultWidth,i=o.width?String(o.width):e.defaultWidth;n=e.values[i]||e.values[d]}return n[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},12022:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a.width,o=n&&e.matchPatterns[n]||e.matchPatterns[e.defaultMatchWidth],r=t.match(o);if(!r)return null;var u,d=r[0],i=n&&e.parsePatterns[n]||e.parsePatterns[e.defaultParseWidth],l=Array.isArray(i)?function(e,t){for(var a=0;a<e.length;a++)if(e[a].test(d))return a}(i):function(e,t){for(var a in e)if(e.hasOwnProperty(a)&&e[a].test(d))return a}(i);return u=e.valueCallback?e.valueCallback(l):l,{value:u=a.valueCallback?a.valueCallback(u):u,rest:t.slice(d.length)}}},e.exports=t.default},45212:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(e.matchPattern);if(!n)return null;var o=n[0],r=t.match(e.parsePattern);if(!r)return null;var u=e.valueCallback?e.valueCallback(r[0]):r[0];return{value:u=a.valueCallback?a.valueCallback(u):u,rest:t.slice(o.length)}}},e.exports=t.default},6238:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={lessThanXSeconds:{one:"أقل من ثانية",two:"أقل من ثانيتين",threeToTen:"أقل من {{count}} ثواني",other:"أقل من {{count}} ثانية"},xSeconds:{one:"ثانية",two:"ثانيتين",threeToTen:"{{count}} ثواني",other:"{{count}} ثانية"},halfAMinute:"نص دقيقة",lessThanXMinutes:{one:"أقل من دقيقة",two:"أقل من دقيقتين",threeToTen:"أقل من {{count}} دقايق",other:"أقل من {{count}} دقيقة"},xMinutes:{one:"دقيقة",two:"دقيقتين",threeToTen:"{{count}} دقايق",other:"{{count}} دقيقة"},aboutXHours:{one:"حوالي ساعة",two:"حوالي ساعتين",threeToTen:"حوالي {{count}} ساعات",other:"حوالي {{count}} ساعة"},xHours:{one:"ساعة",two:"ساعتين",threeToTen:"{{count}} ساعات",other:"{{count}} ساعة"},xDays:{one:"يوم",two:"يومين",threeToTen:"{{count}} أيام",other:"{{count}} يوم"},aboutXWeeks:{one:"حوالي أسبوع",two:"حوالي أسبوعين",threeToTen:"حوالي {{count}} أسابيع",other:"حوالي {{count}} أسبوع"},xWeeks:{one:"أسبوع",two:"أسبوعين",threeToTen:"{{count}} أسابيع",other:"{{count}} أسبوع"},aboutXMonths:{one:"حوالي شهر",two:"حوالي شهرين",threeToTen:"حوالي {{count}} أشهر",other:"حوالي {{count}} شهر"},xMonths:{one:"شهر",two:"شهرين",threeToTen:"{{count}} أشهر",other:"{{count}} شهر"},aboutXYears:{one:"حوالي سنة",two:"حوالي سنتين",threeToTen:"حوالي {{count}} سنين",other:"حوالي {{count}} سنة"},xYears:{one:"عام",two:"عامين",threeToTen:"{{count}} أعوام",other:"{{count}} عام"},overXYears:{one:"أكثر من سنة",two:"أكثر من سنتين",threeToTen:"أكثر من {{count}} سنين",other:"أكثر من {{count}} سنة"},almostXYears:{one:"عام تقريبًا",two:"عامين تقريبًا",threeToTen:"{{count}} أعوام تقريبًا",other:"{{count}} عام تقريبًا"}};t.default=function(e,t,n){var o,r=a[e];return o="string"==typeof r?r:1===t?r.one:2===t?r.two:t<=10?r.threeToTen.replace("{{count}}",String(t)):r.other.replace("{{count}}",String(t)),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"في خلال ".concat(o):"منذ ".concat(o):o},e.exports=t.default},34486:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=(n=a(15780))&&n.__esModule?n:{default:n},r={date:(0,o.default)({formats:{full:"EEEE، do MMMM y",long:"do MMMM y",medium:"dd/MMM/y",short:"d/MM/y"},defaultWidth:"full"}),time:(0,o.default)({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:(0,o.default)({formats:{full:"{{date}} 'الساعة' {{time}}",long:"{{date}} 'الساعة' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})};t.default=r,e.exports=t.default},69893:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={lastWeek:"eeee 'اللي جاي الساعة' p",yesterday:"'إمبارح الساعة' p",today:"'النهاردة الساعة' p",tomorrow:"'بكرة الساعة' p",nextWeek:"eeee 'الساعة' p",other:"P"};t.default=function(e,t,n,o){return a[e]},e.exports=t.default},37392:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=(n=a(99283))&&n.__esModule?n:{default:n},r={ordinalNumber:function(e,t){return String(e)},era:(0,o.default)({values:{narrow:["ق","ب"],abbreviated:["ق.م","ب.م"],wide:["قبل الميلاد","بعد الميلاد"]},defaultWidth:"wide"}),quarter:(0,o.default)({values:{narrow:["1","2","3","4"],abbreviated:["ر1","ر2","ر3","ر4"],wide:["الربع الأول","الربع الثاني","الربع الثالث","الربع الرابع"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,o.default)({values:{narrow:["ي","ف","م","أ","م","ي","ي","أ","س","أ","ن","د"],abbreviated:["ينا","فبر","مارس","أبريل","مايو","يونـ","يولـ","أغسـ","سبتـ","أكتـ","نوفـ","ديسـ"],wide:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]},defaultWidth:"wide"}),day:(0,o.default)({values:{narrow:["ح","ن","ث","ر","خ","ج","س"],short:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],abbreviated:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],wide:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]},defaultWidth:"wide"}),dayPeriod:(0,o.default)({values:{narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءً",night:"ليلاً"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهراً",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءً",night:"ليلاً"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهراً",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءً",night:"ليلاً"}},defaultWidth:"wide",formattingValues:{narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"في الصباح",afternoon:"بعد الظهر",evening:"في المساء",night:"في الليل"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهراً",morning:"في الصباح",afternoon:"بعد الظهر",evening:"في المساء",night:"في الليل"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",morning:"في الصباح",noon:"ظهراً",afternoon:"بعد الظهر",evening:"في المساء",night:"في الليل"}},defaultFormattingWidth:"wide"})};t.default=r,e.exports=t.default},65311:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a(12022));function o(e){return e&&e.__esModule?e:{default:e}}var r={ordinalNumber:(0,o(a(45212)).default)({matchPattern:/^(\d+)/,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:{narrow:/^(ق|ب)/g,abbreviated:/^(ق.م|ب.م)/g,wide:/^(قبل الميلاد|بعد الميلاد)/g},defaultMatchWidth:"wide",parsePatterns:{any:[/^ق/g,/^ب/g]},defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:{narrow:/^[1234]/,abbreviated:/^ر[1234]/,wide:/^الربع (الأول|الثاني|الثالث|الرابع)/},defaultMatchWidth:"wide",parsePatterns:{wide:[/الربع الأول/,/الربع الثاني/,/الربع الثالث/,/الربع الرابع/],any:[/1/,/2/,/3/,/4/]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:{narrow:/^(ي|ف|م|أ|س|ن|د)/,abbreviated:/^(ينا|فبر|مارس|أبريل|مايو|يونـ|يولـ|أغسـ|سبتـ|أكتـ|نوفـ|ديسـ)/,wide:/^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ي/,/^ف/,/^م/,/^أ/,/^م/,/^ي/,/^ي/,/^أ/,/^س/,/^أ/,/^ن/,/^د/],any:[/^ينا/,/^فبر/,/^مارس/,/^أبريل/,/^مايو/,/^يون/,/^يول/,/^أغس/,/^سبت/,/^أكت/,/^نوف/,/^ديس/]},defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:{narrow:/^(ح|ن|ث|ر|خ|ج|س)/,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,abbreviated:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ح/,/^ن/,/^ث/,/^ر/,/^خ/,/^ج/,/^س/],any:[/أحد/,/اثنين/,/ثلاثاء/,/أربعاء/,/خميس/,/جمعة/,/سبت/]},defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:{narrow:/^(ص|م|ن|ظ|في الصباح|بعد الظهر|في المساء|في الليل)/,abbreviated:/^(ص|م|نصف الليل|ظهراً|في الصباح|بعد الظهر|في المساء|في الليل)/,wide:/^(ص|م|نصف الليل|في الصباح|ظهراً|بعد الظهر|في المساء|في الليل)/,any:/^(ص|م|صباح|ظهر|مساء|ليل)/},defaultMatchWidth:"any",parsePatterns:{any:{am:/^ص/,pm:/^م/,midnight:/^ن/,noon:/^ظ/,morning:/^ص/,afternoon:/^بعد/,evening:/^م/,night:/^ل/}},defaultParseWidth:"any"})};t.default=r,e.exports=t.default},83058:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a(6238)),o=i(a(34486)),r=i(a(69893)),u=i(a(37392)),d=i(a(65311));function i(e){return e&&e.__esModule?e:{default:e}}var l={code:"ar-EG",formatDistance:n.default,formatLong:o.default,formatRelative:r.default,localize:u.default,match:d.default,options:{weekStartsOn:0,firstWeekContainsDate:1}};t.default=l,e.exports=t.default}}]);
//# sourceMappingURL=83058.chunk.1c3ed.js.map