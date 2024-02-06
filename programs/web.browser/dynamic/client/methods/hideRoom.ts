function module(e,t,o){let d,i;o.link("meteor/meteor",{Meteor(e){d=e}},0),o.link("../../app/models/client",{ChatSubscription(e){i=e}},1),d.methods({hideRoom:async e=>d.userId()?i.update({rid:e,"u._id":d.userId()},{$set:{alert:!1,open:!1}}):0})}
//# sourceMappingURL=/dynamic/client/methods/7275440b732fb7ecf445be2e0c52c664042049d2.map
