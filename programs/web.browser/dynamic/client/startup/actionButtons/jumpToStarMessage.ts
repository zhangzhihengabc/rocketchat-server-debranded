function module(e,t,s){let i,r,a,l,n;s.link("meteor/meteor",{Meteor(e){i=e}},0),s.link("../../../app/settings/client",{settings(e){r=e}},1),s.link("../../../app/ui-utils/client",{MessageAction(e){a=e}},2),s.link("../../lib/utils/messageArgs",{messageArgs(e){l=e}},3),s.link("../../lib/utils/setMessageJumpQueryStringParameter",{setMessageJumpQueryStringParameter(e){n=e}},4),i.startup(()=>{a.addButton({id:"jump-to-star-message",icon:"jump",label:"Jump_to_message",context:["starred","threads","message-mobile","videoconf-threads"],action(e,t){let{message:s=l(this).msg}=t;n(s._id)},condition(e){var t;let{message:s,subscription:i,user:a}=e;return!!(null!=i&&r.get("Message_AllowStarring"))&&!!(null===(t=s.starred)||void 0===t?void 0:t.find(e=>e._id===(null==a?void 0:a._id)))},order:100,group:"message"})})}
//# sourceMappingURL=/dynamic/client/startup/actionButtons/d180a65d9c2223ff5f184393ad5dfaafff925add.map