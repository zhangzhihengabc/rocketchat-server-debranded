function module(e,t,n){n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},1),n.export({useRecordList:function(){return c}}),n.link("react",{useEffect:function(e){o=e},useState:function(e){u=e}},0);var r,i,o,u,c=function(e){var t=i(u(function(){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:void 0}}),2),n=t[0],c=t[1];return o(function(){var t=e.on("mutating",function(){c(function(){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:void 0}})}),n=e.on("mutated",function(){c(function(t){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:t.error}})}),i=e.on("cleared",function(){c(function(){return{phase:e.phase,items:e.items,itemCount:e.itemCount,error:void 0}})}),o=e.on("errored",function(e){c(function(t){return r(r({},t),{},{error:e})})});return function(){t(),n(),i(),o()}},[e]),n}}
//# sourceMappingURL=/dynamic/client/hooks/lists/76635dac67bf551c8679c5455102ac5a00ca00cf.map