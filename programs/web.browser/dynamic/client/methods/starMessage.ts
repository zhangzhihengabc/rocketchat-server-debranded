function module(e,s,t){let a,i,r,d,n,l;t.link("meteor/meteor",{Meteor(e){a=e}},0),t.link("../../app/models/client",{ChatMessage(e){i=e},ChatSubscription(e){r=e}},1),t.link("../../app/settings/client",{settings(e){d=e}},2),t.link("../../app/utils/lib/i18n",{t(e){n=e}},3),t.link("../lib/toast",{dispatchToastMessage(e){l=e}},4),a.methods({starMessage(e){let s=a.userId();return s&&r.findOne({rid:e.rid})&&i.findOneByRoomIdAndMessageId(e.rid,e._id)&&d.get("Message_AllowStarring")?(e.starred?(i.update({_id:e._id},{$addToSet:{starred:{_id:s}}}),l({type:"success",message:n("Message_has_been_starred")})):(i.update({_id:e._id},{$pull:{starred:{_id:s}}}),l({type:"success",message:n("Message_has_been_unstarred")})),!0):(l({type:"error",message:n("error-starring-message")}),!1)}})}
//# sourceMappingURL=/dynamic/client/methods/3afbd7b4471f60fc874b020ea6441ccdb67a2415.map