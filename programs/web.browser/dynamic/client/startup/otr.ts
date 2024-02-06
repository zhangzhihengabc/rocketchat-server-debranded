function module(e,t,r){let n,i,l,o,a,s,u,c,d,f;r.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),r.link("@rocket.chat/core-typings",{isOTRMessage(e){i=e}},0),r.link("meteor/meteor",{Meteor(e){l=e}},1),r.link("meteor/tracker",{Tracker(e){o=e}},2),r.link("../../app/otr/client/OTR",{default(e){a=e}},3),r.link("../../app/otr/lib/OtrRoomState",{OtrRoomState(e){s=e}},4),r.link("../../app/utils/client/lib/SDKClient",{sdk(e){u=e}},5),r.link("../../app/utils/lib/i18n",{t(e){c=e}},6),r.link("../lib/onClientBeforeSendMessage",{onClientBeforeSendMessage(e){d=e}},7),r.link("../lib/onClientMessageReceived",{onClientMessageReceived(e){f=e}},8),l.startup(()=>{o.autorun(()=>{let e=l.userId();e&&u.stream("notify-user",["".concat(e,"/otr")],(t,r)=>{if(!r.roomId||!r.userId||r.userId===e)return;let n=a.getInstanceByRoomId(e,r.roomId);null==n||n.onUserStream(t,r)})}),d.use(async e=>{let t=l.userId();if(!t)return e;let r=a.getInstanceByRoomId(t,e.rid);if(r&&r.getState()===s.ESTABLISHED){let t=await r.encrypt(e);return n(n({},e),{},{msg:t,t:"otr"})}return e}),f.use(async e=>{let t=l.userId();if(!t||!i(e))return e;if("notification"in e)return n(n({},e),{},{msg:c("Encrypted_message")});let r=a.getInstanceByRoomId(t,e.rid);if(r&&r.getState()===s.ESTABLISHED){let t=await r.decrypt(e.msg);if("string"==typeof t)return n(n({},e),{},{msg:t});let{_id:i,text:o,ack:a,ts:s,userId:c}=t;if(s&&(e.ts=s),e.otrAck){let t=await r.decrypt(e.otrAck);if("string"==typeof t)return n(n({},e),{},{msg:t});if(a===t.text)return n(n({},e),{},{_id:i,t:"otr-ack",msg:o})}else if(c!==l.userId()){let t=await r.encryptText(a);u.call("updateOTRAck",{message:e,ack:t})}return n(n({},e),{},{_id:i,msg:o})}return"otr"===e.t&&(e.msg=""),e})})}
//# sourceMappingURL=/dynamic/client/startup/780f67f4782cf35a3da21ef6b9951e5e1e5115f2.map