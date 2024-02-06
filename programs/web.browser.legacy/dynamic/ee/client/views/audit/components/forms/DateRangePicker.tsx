function module(t,e,n){var a,r,o,u,i,l,c,f,s,d,h,m,k,b,y=["value","onChange"];n.link("@babel/runtime/helpers/extends",{default:function(t){a=t}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(t){r=t}},1),n.link("@babel/runtime/helpers/objectSpread2",{default:function(t){o=t}},2),n.link("@babel/runtime/helpers/typeof",{default:function(t){u=t}},3),n.link("@rocket.chat/fuselage",{Box:function(t){i=t},InputBox:function(t){l=t},Menu:function(t){c=t},Margins:function(t){f=t},Option:function(t){s=t}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(t){d=t}},1),n.link("@rocket.chat/ui-contexts",{useTranslation:function(t){h=t}},2),n.link("moment",{default:function(t){m=t}},3),n.link("react",{default:function(t){k=t},useMemo:function(t){b=t}},4);var w=function(t){return t?t.getFullYear().toString().padStart(4,"0").slice(0,4)+"-"+(t.getMonth()+1).toString().padStart(2,"0").slice(0,2)+"-"+t.getDate().toString().padStart(2,"0").slice(0,2):""},D=function(t){if(t)return m(t,"YYYY-MM-DD").startOf("day").toDate()},v=function(t){if(t)return m(t,"YYYY-MM-DD").endOf("day").toDate()},g=function(t,e){switch(e){case"today":return{start:m().startOf("day").toDate(),end:m().endOf("day").toDate()};case"yesterday":return{start:m().subtract(1,"day").startOf("day").toDate(),end:m().subtract(1,"day").endOf("day").toDate()};case"this-week":return{start:m().startOf("week").toDate(),end:m().endOf("day").toDate()};case"last-week":return{start:m().subtract(1,"week").startOf("week").toDate(),end:m().subtract(1,"week").endOf("week").toDate()};case"this-month":return{start:m().startOf("month").toDate(),end:m().endOf("day").toDate()};case"last-month":return{start:m().subtract(1,"month").startOf("month").toDate(),end:m().subtract(1,"month").endOf("month").toDate()};default:if("object"===u(e)&&"newStart"in e){if(e.newStart===w(t.start))return t;return o(o({},t),{},{start:D(e.newStart)})}if("object"===u(e)&&"newEnd"in e){if(e.newEnd===w(t.end))return t;return o(o({},t),{},{end:v(e.newEnd)})}return"function"==typeof e?e(t):e}};n.exportDefault(function(t){var e=t.value,n=t.onChange,o=r(t,y),u=d(function(t){var a=g(null!=e?e:{start:void 0,end:void 0},t);null==n||n(a)}),D=d(function(t){u({newStart:t.currentTarget.value})}),v=d(function(t){u({newEnd:t.currentTarget.value})}),p=b(function(){return w(null==e?void 0:e.start)},[null==e?void 0:e.start]),O=b(function(){return w(null==e?void 0:e.end)},[null==e?void 0:e.end]),S=b(function(){return w(null!=e&&e.end?m.min(m(e.end),m()).toDate():new Date)},[null==e?void 0:e.end]),M=b(function(){return w(new Date)},[]),E=h(),Y=b(function(){return{today:{label:E("Today"),action:function(){return u("today")}},yesterday:{label:E("Yesterday"),action:function(){return u("yesterday")}},thisWeek:{label:E("This_week"),action:function(){return u("this-week")}},previousWeek:{label:E("Previous_week"),action:function(){return u("last-week")}},thisMonth:{label:E("This_month"),action:function(){return u("this-month")}},lastMonth:{label:E("Previous_month"),action:function(){return u("last-month")}}}},[u,E]);return k.createElement(i,a({marginInline:-4},o),k.createElement(f,{inline:4},k.createElement(l,{type:"date",value:p,max:S,flexGrow:1,height:20,onChange:D}),k.createElement(l,{type:"date",min:p,value:O,max:M,flexGrow:1,height:20,onChange:v}),k.createElement(c,{options:Y,renderItem:function(t){return k.createElement(s,a({icon:"history"},t))},alignSelf:"center"})))})}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/forms/93c123a15d666982d49625603d089dbd1845d6fb.map