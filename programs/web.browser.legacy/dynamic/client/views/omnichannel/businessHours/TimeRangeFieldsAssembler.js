function module(n,e,t){var a,i,u,l,r,o,c,s;t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){a=n}},0),t.link("@rocket.chat/fuselage",{Field:function(n){i=n}},0),t.link("@rocket.chat/fuselage-hooks",{useStableArray:function(n){u=n}},1),t.link("@rocket.chat/ui-contexts",{useTranslation:function(n){l=n}},2),t.link("react",{default:function(n){r=n},useMemo:function(n){o=n}},3),t.link("./BusinessHoursForm",{DAYS_OF_WEEK:function(n){c=n}},4),t.link("./TimeRangeInput",{default:function(n){s=n}},5),t.exportDefault(function(n){var e=n.onChange,t=n.daysOpen,f=n.daysTime,m=n.className,d=l(),k=u(t),h=o(function(){return c.filter(function(n){return k.includes(n)})},[k]);return r.createElement(r.Fragment,null,h.map(function(n){var t,u;return r.createElement(i,{className:m,key:n},r.createElement(i.Label,null,d(n)),r.createElement(i.Row,null,r.createElement(s,{onChange:function(t,i){var u;return e(a(a({},f),{},((u={})[n]={start:t,finish:i},u)))},start:null===(t=f[n])||void 0===t?void 0:t.start,finish:null===(u=f[n])||void 0===u?void 0:u.finish})))}))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/businessHours/00a279b707dc0ea42ebcb578c4e3fe1fc26156ab.map