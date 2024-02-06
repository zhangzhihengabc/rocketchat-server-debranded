"use strict";(self.webpackChunk_rocket_chat_livechat=self.webpackChunk_rocket_chat_livechat||[]).push([[88665,15780,99283,12022,45212,29681,79098,32581,65042,84799],{15780:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.width?String(t.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}},e.exports=t.default},99283:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,a){var n,i=a||{};if("formatting"===(i.context?String(i.context):"standalone")&&e.formattingValues){var r=e.defaultFormattingWidth||e.defaultWidth,u=i.width?String(i.width):r;n=e.formattingValues[u]||e.formattingValues[r]}else{var d=e.defaultWidth,o=i.width?String(i.width):e.defaultWidth;n=e.values[o]||e.values[d]}return n[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},12022:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a.width,i=n&&e.matchPatterns[n]||e.matchPatterns[e.defaultMatchWidth],r=t.match(i);if(!r)return null;var u,d=r[0],o=n&&e.parsePatterns[n]||e.parsePatterns[e.defaultParseWidth],l=Array.isArray(o)?function(e,t){for(var a=0;a<e.length;a++)if(e[a].test(d))return a}(o):function(e,t){for(var a in e)if(e.hasOwnProperty(a)&&e[a].test(d))return a}(o);return u=e.valueCallback?e.valueCallback(l):l,{value:u=a.valueCallback?a.valueCallback(u):u,rest:t.slice(d.length)}}},e.exports=t.default},45212:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(e.matchPattern);if(!n)return null;var i=n[0],r=t.match(e.parsePattern);if(!r)return null;var u=e.valueCallback?e.valueCallback(r[0]):r[0];return{value:u=a.valueCallback?a.valueCallback(u):u,rest:t.slice(i.length)}}},e.exports=t.default},29681:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={lessThanXSeconds:"តិចជាង {{count}} វិនាទី",xSeconds:"{{count}} វិនាទី",halfAMinute:"កន្លះនាទី",lessThanXMinutes:"តិចជាង {{count}} នាទី",xMinutes:"{{count}} នាទី",aboutXHours:"ប្រហែល {{count}} ម៉ោង",xHours:"{{count}} ម៉ោង",xDays:"{{count}} ថ្ងៃ",aboutXWeeks:"ប្រហែល {{count}} សប្តាហ៍",xWeeks:"{{count}} សប្តាហ៍",aboutXMonths:"ប្រហែល {{count}} ខែ",xMonths:"{{count}} ខែ",aboutXYears:"ប្រហែល {{count}} ឆ្នាំ",xYears:"{{count}} ឆ្នាំ",overXYears:"ជាង {{count}} ឆ្នាំ",almostXYears:"ជិត {{count}} ឆ្នាំ"};t.default=function(e,t,n){var i=a[e];return"number"==typeof t&&(i=i.replace("{{count}}",t.toString())),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"ក្នុងរយៈពេល "+i:i+"មុន":i},e.exports=t.default},79098:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=(n=a(15780))&&n.__esModule?n:{default:n},r={date:(0,i.default)({formats:{full:"EEEE do MMMM y",long:"do MMMM y",medium:"d MMM y",short:"dd/MM/yyyy"},defaultWidth:"full"}),time:(0,i.default)({formats:{full:"h:mm:ss a",long:"h:mm:ss a",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:(0,i.default)({formats:{full:"{{date}} 'ម៉ោង' {{time}}",long:"{{date}} 'ម៉ោង' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})};t.default=r,e.exports=t.default},32581:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={lastWeek:"'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​មុនម៉ោង' p",yesterday:"'ម្សិលមិញនៅម៉ោង' p",today:"'ថ្ងៃនេះម៉ោង' p",tomorrow:"'ថ្ងៃស្អែកម៉ោង' p",nextWeek:"'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​ក្រោយម៉ោង' p",other:"P"};t.default=function(e,t,n,i){return a[e]},e.exports=t.default},65042:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=(n=a(99283))&&n.__esModule?n:{default:n},r={ordinalNumber:function(e,t){return Number(e).toString()},era:(0,i.default)({values:{narrow:["ម.គស","គស"],abbreviated:["មុនគ.ស","គ.ស"],wide:["មុនគ្រិស្តសករាជ","នៃគ្រិស្តសករាជ"]},defaultWidth:"wide"}),quarter:(0,i.default)({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["ត្រីមាសទី 1","ត្រីមាសទី 2","ត្រីមាសទី 3","ត្រីមាសទី 4"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,i.default)({values:{narrow:["ម.ក","ក.ម","មិ","ម.ស","ឧ.ស","ម.ថ","ក.ដ","សី","កញ","តុ","វិ","ធ"],abbreviated:["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],wide:["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"]},defaultWidth:"wide"}),day:(0,i.default)({values:{narrow:["អា","ច","អ","ព","ព្រ","សុ","ស"],short:["អា","ច","អ","ព","ព្រ","សុ","ស"],abbreviated:["អា","ច","អ","ព","ព្រ","សុ","ស"],wide:["អាទិត្យ","ចន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"]},defaultWidth:"wide"}),dayPeriod:(0,i.default)({values:{narrow:{am:"ព្រឹក",pm:"ល្ងាច",midnight:"​ពេលកណ្ដាលអធ្រាត្រ",noon:"ពេលថ្ងៃត្រង់",morning:"ពេលព្រឹក",afternoon:"ពេលរសៀល",evening:"ពេលល្ងាច",night:"ពេលយប់"},abbreviated:{am:"ព្រឹក",pm:"ល្ងាច",midnight:"​ពេលកណ្ដាលអធ្រាត្រ",noon:"ពេលថ្ងៃត្រង់",morning:"ពេលព្រឹក",afternoon:"ពេលរសៀល",evening:"ពេលល្ងាច",night:"ពេលយប់"},wide:{am:"ព្រឹក",pm:"ល្ងាច",midnight:"​ពេលកណ្ដាលអធ្រាត្រ",noon:"ពេលថ្ងៃត្រង់",morning:"ពេលព្រឹក",afternoon:"ពេលរសៀល",evening:"ពេលល្ងាច",night:"ពេលយប់"}},defaultWidth:"wide",formattingValues:{narrow:{am:"ព្រឹក",pm:"ល្ងាច",midnight:"​ពេលកណ្ដាលអធ្រាត្រ",noon:"ពេលថ្ងៃត្រង់",morning:"ពេលព្រឹក",afternoon:"ពេលរសៀល",evening:"ពេលល្ងាច",night:"ពេលយប់"},abbreviated:{am:"ព្រឹក",pm:"ល្ងាច",midnight:"​ពេលកណ្ដាលអធ្រាត្រ",noon:"ពេលថ្ងៃត្រង់",morning:"ពេលព្រឹក",afternoon:"ពេលរសៀល",evening:"ពេលល្ងាច",night:"ពេលយប់"},wide:{am:"ព្រឹក",pm:"ល្ងាច",midnight:"​ពេលកណ្ដាលអធ្រាត្រ",noon:"ពេលថ្ងៃត្រង់",morning:"ពេលព្រឹក",afternoon:"ពេលរសៀល",evening:"ពេលល្ងាច",night:"ពេលយប់"}},defaultFormattingWidth:"wide"})};t.default=r,e.exports=t.default},84799:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a(12022));function i(e){return e&&e.__esModule?e:{default:e}}var r={ordinalNumber:(0,i(a(45212)).default)({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:{narrow:/^(ម\.)?គស/i,abbreviated:/^(មុន)?គ\.ស/i,wide:/^(មុន|នៃ)គ្រិស្តសករាជ/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^(ម|មុន)គ\.?ស/i,/^(នៃ)?គ\.?ស/i]},defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^(ត្រីមាស)(ទី)?\s?[1234]/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:{narrow:/^(ម\.ក|ក\.ម|មិ|ម\.ស|ឧ\.ស|ម\.ថ|ក\.ដ|សី|កញ|តុ|វិ|ធ)/i,abbreviated:/^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i,wide:/^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ម\.ក/i,/^ក\.ម/i,/^មិ/i,/^ម\.ស/i,/^ឧ\.ស/i,/^ម\.ថ/i,/^ក\.ដ/i,/^សី/i,/^កញ/i,/^តុ/i,/^វិ/i,/^ធ/i],any:[/^មក/i,/^កុ/i,/^មីន/i,/^មេ/i,/^ឧស/i,/^មិថ/i,/^កក/i,/^សី/i,/^កញ/i,/^តុ/i,/^វិច/i,/^ធ/i]},defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:{narrow:/^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,short:/^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,abbreviated:/^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,wide:/^(អាទិត្យ|ចន្ទ|អង្គារ|ពុធ|ព្រហស្បតិ៍|សុក្រ|សៅរ៍)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^អា/i,/^ច/i,/^អ/i,/^ព/i,/^ព្រ/i,/^សុ/i,/^ស/i],any:[/^អា/i,/^ច/i,/^អ/i,/^ព/i,/^ព្រ/i,/^សុ/i,/^សៅ/i]},defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:{narrow:/^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i,any:/^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^ព្រឹក/i,pm:/^ល្ងាច/i,midnight:/^ពេលកណ្ដាលអធ្រាត្រ/i,noon:/^ពេលថ្ងៃត្រង់/i,morning:/ពេលព្រឹក/i,afternoon:/ពេលរសៀល/i,evening:/ពេលល្ងាច/i,night:/ពេលយប់/i}},defaultParseWidth:"any"})};t.default=r,e.exports=t.default},88665:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a(29681)),i=o(a(79098)),r=o(a(32581)),u=o(a(65042)),d=o(a(84799));function o(e){return e&&e.__esModule?e:{default:e}}var l={code:"km",formatDistance:n.default,formatLong:i.default,formatRelative:r.default,localize:u.default,match:d.default,options:{weekStartsOn:0,firstWeekContainsDate:1}};t.default=l,e.exports=t.default}}]);
//# sourceMappingURL=88665.chunk.93885.js.map