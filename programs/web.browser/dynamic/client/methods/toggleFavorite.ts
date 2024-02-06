function module(e,t,o){let i,d;o.link("meteor/meteor",{Meteor(e){i=e}},0),o.link("../../app/models/client",{ChatSubscription(e){d=e}},1),i.methods({toggleFavorite:async(e,t)=>i.userId()?d.update({rid:e,"u._id":i.userId()},{$set:{f:t}}):0})}
//# sourceMappingURL=/dynamic/client/methods/3ff57bb2e51a565c2f439f3d67f8fdbd5b6bd385.map
