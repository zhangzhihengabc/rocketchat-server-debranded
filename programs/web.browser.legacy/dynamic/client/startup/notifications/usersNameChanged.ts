function module(n,e,t){var i,a,o,u;t.link("meteor/meteor",{Meteor:function(n){i=n}},0),t.link("../../../app/models/client",{Messages:function(n){a=n},Subscriptions:function(n){o=n}},1),t.link("../../../app/notifications/client",{Notifications:function(n){u=n}},2),i.startup(function(){u.onLogged("Users:NameChanged",function(n){var e=n._id,t=n.name,i=n.username;a.update({"u._id":e},{$set:{"u.username":i,"u.name":t}},{multi:!0}),a.update({mentions:{$elemMatch:{_id:e}}},{$set:{"mentions.$.username":i,"mentions.$.name":t}},{multi:!0}),o.update({name:i,t:"d"},{$set:{fname:t}})})})}
//# sourceMappingURL=/dynamic/client/startup/notifications/d73ecd36e919da3fe72d06ed1f38ff1a416248de.map