function module(n,t,r){r.export({asReactiveSource:function(){return u}}),r.link("meteor/tracker",{Tracker:function(n){e=n}},0);var e,u=function(n,t){if(!e.active)return t();var r=e.currentComputation,u=n(function(){return null==r?void 0:r.invalidate()});return null==r||r.onInvalidate(function(){u()}),t()}}
//# sourceMappingURL=/dynamic/client/lib/e35c3e81c13d580cf7c5c9c46f98e11ca556dc7d.map
