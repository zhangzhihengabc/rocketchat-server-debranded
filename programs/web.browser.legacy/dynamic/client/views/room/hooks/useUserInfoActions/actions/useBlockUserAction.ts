function module(e,n,o){o.link("@babel/runtime/regenerator",{default:function(e){t=e}},0),o.export({useBlockUserAction:function(){return b}}),o.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){r=e}},0),o.link("@rocket.chat/ui-contexts",{useTranslation:function(e){c=e},useMethod:function(e){s=e},useToastMessageDispatch:function(e){i=e},useUserId:function(e){u=e},useUserSubscription:function(e){a=e},useUserRoom:function(e){l=e}},1),o.link("react",{useMemo:function(e){k=e}},2),o.link("../../../lib/getRoomDirectives",{getRoomDirectives:function(e){f=e}},3);var t,r,c,s,i,u,a,l,k,f,b=function(e,n){var o=c(),b=i(),d=a(n),m=u(),p=e._id,v=l(n);if(!v)throw Error("Room not provided");var U=f({room:v,showingUserId:p,userSubscription:d}).roomCanBlock,h=null==d?void 0:d.blocker,g=s(h?"unblockUser":"blockUser"),x=r(function(){return t.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.awrap(g({rid:n,blocked:p}));case 3:b({type:"success",message:o(h?"User_is_unblocked":"User_is_blocked")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),b({type:"error",message:e.t0});case 9:case"end":return e.stop()}},null,null,[[0,6]],Promise)});return k(function(){return U&&p!==m?{content:o(h?"Unblock":"Block"),icon:"ban",onClick:x}:void 0},[h,m,U,o,x,p])}}
//# sourceMappingURL=/dynamic/client/views/room/hooks/useUserInfoActions/actions/5adc287a0c24b9d0ab1a033141f52ba523893c55.map