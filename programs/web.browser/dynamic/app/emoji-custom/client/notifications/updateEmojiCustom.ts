function module(o,t,i){let e,m,n;i.link("meteor/meteor",{Meteor(o){e=o}},0),i.link("../../../notifications/client",{Notifications(o){m=o}},1),i.link("../lib/emojiCustom",{updateEmojiCustom(o){n=o}},2),e.startup(()=>m.onLogged("updateEmojiCustom",o=>n(o.emojiData)))}
//# sourceMappingURL=/dynamic/app/emoji-custom/client/notifications/e16bf7ea1f08b544b5db8d71eeb5ad6b084aeee8.map
