function module(t,e,n){n.link("@babel/runtime/regenerator",{default:function(t){i=t}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(t){r=t}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(t){o=t}},2),n.export({useTagsList:function(){return d}}),n.link("@rocket.chat/ui-contexts",{useEndpoint:function(t){u=t}},0),n.link("react",{useCallback:function(t){l=t},useState:function(t){a=t}},1),n.link("../../../client/hooks/lists/useScrollableRecordList",{useScrollableRecordList:function(t){s=t}},2),n.link("../../../client/hooks/useComponentDidUpdate",{useComponentDidUpdate:function(t){c=t}},3),n.link("../../../client/lib/lists/RecordList",{RecordList:function(t){f=t}},4);var i,r,o,u,l,a,s,c,f,d=function(t){var e=t.viewAll,n=t.department,d=t.filter,m=o(a(function(){return new f}),2),p=m[0],b=m[1],k=l(function(){return b(new f)},[]),v=u("GET","/v1/livechat/tags");c(function(){t&&k()},[t,k]);var h=s(p,l(function(t,o){var u,l,a;return i.async(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,i.awrap(v(r(r(r({text:d,offset:t,count:o+t},e&&{viewAll:"true"}),n&&{department:n}),{},{sort:JSON.stringify({name:1})})));case 2:return l=(u=s.sent).tags,a=u.total,s.abrupt("return",{items:l.map(function(t){return{_id:t._id,label:t.name,value:t.name}}),itemCount:a});case 6:case"end":return s.stop()}},null,null,null,Promise)},[v,d,e,n]),25),w=h.loadMoreItems,C=h.initialItemCount;return{reload:k,itemsList:p,loadMoreItems:w,initialItemCount:C}}}
//# sourceMappingURL=/dynamic/ee/client/hooks/fd03814a885760180ba7241a87e394c20833278e.map