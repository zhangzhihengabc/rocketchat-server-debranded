function module(t,n,e){var o,i,a,r,u,c,l,s,f,h,d,m,b,k,y,v=["onChange"];e.link("@babel/runtime/helpers/extends",{default:function(t){o=t}},0),e.link("@babel/runtime/helpers/slicedToArray",{default:function(t){i=t}},1),e.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(t){a=t}},2),e.link("@rocket.chat/fuselage",{Box:function(t){r=t},InputBox:function(t){u=t},Menu:function(t){c=t},Margins:function(t){l=t},Option:function(t){s=t}},0),e.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(t){f=t}},1),e.link("@rocket.chat/ui-contexts",{useTranslation:function(t){h=t}},2),e.link("moment",{default:function(t){d=t}},3),e.link("react",{default:function(t){m=t},useState:function(t){b=t},useMemo:function(t){k=t},useEffect:function(t){y=t}},4);var g=function(t){return t.locale("en").format("YYYY-MM-DD")},p=g(d()),x=function(t){return{start:g(d().subtract(t,"month").date(1)),end:g(0===t?d():d().subtract(t).date(0))}},M=function(t,n){return{start:g(d().subtract(t,"day")),end:g(d().subtract(n,"day"))}};e.exportDefault(function(t){var n=t.onChange,e=void 0===n?function(){}:n,E=a(t,v),T=h(),C=i(b({start:"",end:""}),2),Y=C[0],w=C[1],_=Y.start,D=Y.end,I=f(function(t){var n={start:t.currentTarget.value,end:Y.end};w(n),e(n)}),P=f(function(t){var n={end:t.currentTarget.value,start:Y.start};w(n),e(n)}),W=f(function(t){w(t),e(t)});y(function(){W({start:g(d().subtract(1,"month")),end:p})},[W]);var B=k(function(){return{today:{icon:"history",label:T("Today"),action:function(){W(M(0,0))}},yesterday:{icon:"history",label:T("Yesterday"),action:function(){W(M(1,1))}},thisWeek:{icon:"history",label:T("This_week"),action:function(){W(M(7,0))}},previousWeek:{icon:"history",label:T("Previous_week"),action:function(){W(M(14,7))}},thisMonth:{icon:"history",label:T("This_month"),action:function(){W(x(0))}},lastMonth:{icon:"history",label:T("Previous_month"),action:function(){W(x(1))}}}},[W,T]);return m.createElement(r,o({marginInline:-4},E),m.createElement(l,{inline:4},m.createElement(u,{type:"date",value:_,max:p,flexGrow:1,height:20,onChange:I}),m.createElement(u,{type:"date",min:_,value:D,max:p,flexGrow:1,height:20,onChange:P}),m.createElement(c,{options:B,renderItem:function(t){return m.createElement(s,o({icon:"history"},t))},alignSelf:"center"})))})}
//# sourceMappingURL=/dynamic/client/views/admin/moderation/helpers/b5c8a17e447b54fd858ec329314b437276d8eacb.map