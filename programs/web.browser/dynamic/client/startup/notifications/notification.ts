function module(e,n,o){let t,i,s,r,u,l;o.link("meteor/meteor",{Meteor(e){t=e}},0),o.link("meteor/session",{Session(e){i=e}},1),o.link("meteor/tracker",{Tracker(e){s=e}},2),o.link("../../../app/custom-sounds/client/lib/CustomSounds",{CustomSounds(e){r=e}},3),o.link("../../../app/models/client",{Users(e){u=e}},4),o.link("../../../app/utils/client",{getUserPreference(e){l=e}},5),t.startup(()=>{s.autorun(()=>{let e=t.userId();if(!e)return;let n=u.findOne(e,{fields:{"settings.preferences.newRoomNotification":1,"settings.preferences.notificationsSoundVolume":1}}),o=l(n,"newRoomNotification"),s=l(n,"notificationsSoundVolume",100);o&&((i.get("newRoomSound")||[]).length>0?setTimeout(()=>{"none"!==o&&r.play(o,{volume:Number((s/100).toPrecision(2))})},0):r.pause(o))})})}
//# sourceMappingURL=/dynamic/client/startup/notifications/c96e9bbe87c985b3dfbad010c4e63b306bc909b2.map