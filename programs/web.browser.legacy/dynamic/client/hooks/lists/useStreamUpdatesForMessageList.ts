function module(e,n,t){t.export({useStreamUpdatesForMessageList:function(){return s}}),t.link("@rocket.chat/ui-contexts",{useStream:function(e){r=e}},0),t.link("react",{useEffect:function(e){i=e}},1),t.link("../../lib/minimongo",{createFilterFromQuery:function(e){u=e}},2);var r,i,u,o=function(e){var n,t={ts:e.ts};return e.excludePinned&&(t.pinned={$ne:!0}),e.ignoreDiscussion&&(t.drid={$exists:!1}),null!==(n=e.users)&&void 0!==n&&n.length&&(t["u.username"]={$in:e.users}),u(t)},s=function(e,n,t){var u=r("room-messages"),s=r("notify-room");i(function(){if(!n||!t){e.clear();return}var r=u(t,function(n){e.handle(n)}),i=s(t+"/deleteMessage",function(n){var t=n._id;e.remove(t)}),c=s(t+"/deleteMessageBulk",function(n){var t=o(n);e.prune(t)});return function(){r(),i(),c()}},[u,s,n,t,e])}}
//# sourceMappingURL=/dynamic/client/hooks/lists/f00d258e08822b093b20f009815bed6f4161a18f.map