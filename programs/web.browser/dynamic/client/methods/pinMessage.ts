function module(e,n,i){let r,s,o,t;i.link("meteor/meteor",{Meteor(e){r=e}},0),i.link("../../app/models/client",{ChatMessage(e){s=e},ChatSubscription(e){o=e}},1),i.link("../../app/settings/client",{settings(e){t=e}},2),r.methods({pinMessage(e){if(!r.userId())throw new r.Error("error-not-authorized","Not authorized",{method:"pinMessage"});if(!t.get("Message_AllowPinning"))throw new r.Error("pinning-not-allowed","Pinning messages is not allowed",{method:"pinMessage"});if(!o.findOne({rid:e.rid}))throw new r.Error("error-pinning-message","Pinning messages is not allowed",{method:"pinMessage"});if("string"!=typeof e._id)throw new r.Error("error-pinning-message","Invalid message",{method:"pinMessage"});s.update({_id:e._id,rid:e.rid},{$set:{pinned:!0}});let n=s.findOne({_id:e._id});if(!n)throw new r.Error("error-pinning-message","Error pinning message",{method:"pinMessage"});return n}})}
//# sourceMappingURL=/dynamic/client/methods/d3422f89aa0cd3a0fef5b3c5507978cc58a51302.map