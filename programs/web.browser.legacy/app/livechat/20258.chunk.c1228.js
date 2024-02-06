"use strict";(self.webpackChunk_rocket_chat_livechat=self.webpackChunk_rocket_chat_livechat||[]).push([[20258,12022,45212],{12022:function(e,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){return function(a){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.width,r=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],n=a.match(r);if(!n)return null;var l,u=n[0],d=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(d)?function(e,a){for(var t=0;t<e.length;t++)if(e[t].test(u))return t}(d):function(e,a){for(var t in e)if(e.hasOwnProperty(t)&&e[t].test(u))return t}(d);return l=e.valueCallback?e.valueCallback(c):c,{value:l=t.valueCallback?t.valueCallback(l):l,rest:a.slice(u.length)}}},e.exports=a.default},45212:function(e,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){return function(a){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=a.match(e.matchPattern);if(!i)return null;var r=i[0],n=a.match(e.parsePattern);if(!n)return null;var l=e.valueCallback?e.valueCallback(n[0]):n[0];return{value:l=t.valueCallback?t.valueCallback(l):l,rest:a.slice(r.length)}}},e.exports=a.default},20258:function(e,a,t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=r(t(12022));function r(e){return e&&e.__esModule?e:{default:e}}var n={ordinalNumber:(0,r(t(45212)).default)({matchPattern:/^(\d+)(ম|য়|র্থ|ষ্ঠ|শে|ই|তম)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,i.default)({matchPatterns:{narrow:/^(খ্রিঃপূঃ|খ্রিঃ)/i,abbreviated:/^(খ্রিঃপূর্ব|খ্রিঃ)/i,wide:/^(খ্রিস্টপূর্ব|খ্রিস্টাব্দ)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^খ্রিঃপূঃ/i,/^খ্রিঃ/i],abbreviated:[/^খ্রিঃপূর্ব/i,/^খ্রিঃ/i],wide:[/^খ্রিস্টপূর্ব/i,/^খ্রিস্টাব্দ/i]},defaultParseWidth:"wide"}),quarter:(0,i.default)({matchPatterns:{narrow:/^[১২৩৪]/i,abbreviated:/^[১২৩৪]ত্রৈ/i,wide:/^[১২৩৪](ম|য়|র্থ)? ত্রৈমাসিক/i},defaultMatchWidth:"wide",parsePatterns:{any:[/১/i,/২/i,/৩/i,/৪/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,i.default)({matchPatterns:{narrow:/^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,abbreviated:/^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,wide:/^(জানুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^জানু/i,/^ফেব্রু/i,/^মার্চ/i,/^এপ্রিল/i,/^মে/i,/^জুন/i,/^জুলাই/i,/^আগস্ট/i,/^সেপ্ট/i,/^অক্টো/i,/^নভে/i,/^ডিসে/i]},defaultParseWidth:"any"}),day:(0,i.default)({matchPatterns:{narrow:/^(র|সো|ম|বু|বৃ|শু|শ)+/i,short:/^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,abbreviated:/^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,wide:/^(রবিবার|সোমবার|মঙ্গলবার|বুধবার|বৃহস্পতিবার |শুক্রবার|শনিবার)+/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^র/i,/^সো/i,/^ম/i,/^বু/i,/^বৃ/i,/^শু/i,/^শ/i],short:[/^রবি/i,/^সোম/i,/^মঙ্গল/i,/^বুধ/i,/^বৃহ/i,/^শুক্র/i,/^শনি/i],abbreviated:[/^রবি/i,/^সোম/i,/^মঙ্গল/i,/^বুধ/i,/^বৃহ/i,/^শুক্র/i,/^শনি/i],wide:[/^রবিবার/i,/^সোমবার/i,/^মঙ্গলবার/i,/^বুধবার/i,/^বৃহস্পতিবার /i,/^শুক্রবার/i,/^শনিবার/i]},defaultParseWidth:"wide"}),dayPeriod:(0,i.default)({matchPatterns:{narrow:/^(পূ|অপ|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,abbreviated:/^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,wide:/^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i},defaultMatchWidth:"wide",parsePatterns:{any:{am:/^পূ/i,pm:/^অপ/i,midnight:/^মধ্যরাত/i,noon:/^মধ্যাহ্ন/i,morning:/সকাল/i,afternoon:/বিকাল/i,evening:/সন্ধ্যা/i,night:/রাত/i}},defaultParseWidth:"any"})};a.default=n,e.exports=a.default}}]);
//# sourceMappingURL=20258.chunk.c1228.js.map