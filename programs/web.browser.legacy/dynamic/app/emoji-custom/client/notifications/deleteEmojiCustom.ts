function module(t,o,n){var i,e,u;n.link("meteor/meteor",{Meteor:function(t){i=t}},0),n.link("../../../notifications/client",{Notifications:function(t){e=t}},1),n.link("../lib/emojiCustom",{deleteEmojiCustom:function(t){u=t}},2),i.startup(function(){return e.onLogged("deleteEmojiCustom",function(t){return u(t.emojiData)})})}
//# sourceMappingURL=/dynamic/app/emoji-custom/client/notifications/a74e79db184979d0096fa7c171169cadb9353502.map