function module(e,t,i){let o,n,l,r,a,s,c;i.link("meteor/meteor",{Meteor(e){o=e}},0),i.link("meteor/tracker",{Tracker(e){n=e}},1),i.link("../../app/models/client",{ChatMessage(e){l=e},ChatSubscription(e){r=e}},2),i.link("../../app/ui-utils/client",{LegacyRoomManager(e){a=e},upsertMessage(e){s=e}},3),i.link("../lib/utils/callWithErrorHandling",{callWithErrorHandling(e){c=e}},4);let d=async function(e){let t=l.findOne({rid:e,_hidden:{$ne:!0},temp:{$exists:!1}},{sort:{ts:-1},limit:1});if(t)try{let i=await c("loadMissedMessages",e,t.ts);if(i){let t=r.findOne({rid:e});await Promise.all(Array.from(i).map(e=>s({msg:e,subscription:t})))}}catch(e){console.error(e)}};o.startup(()=>{let e=!0;n.autorun(()=>{let{connected:t}=o.connection.status();!0===t&&!1===e&&a.openedRooms&&Object.keys(a.openedRooms).forEach(e=>{let t=a.openedRooms[e];t.rid&&d(t.rid)}),e=t})})}
//# sourceMappingURL=/dynamic/client/startup/72b845675459aa5183c4e8ae7c86c8dd4f20a375.map