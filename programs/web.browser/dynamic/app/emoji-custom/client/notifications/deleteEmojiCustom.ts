function module(e,o,t){let i,m,n;t.link("meteor/meteor",{Meteor(e){i=e}},0),t.link("../../../notifications/client",{Notifications(e){m=e}},1),t.link("../lib/emojiCustom",{deleteEmojiCustom(e){n=e}},2),i.startup(()=>m.onLogged("deleteEmojiCustom",e=>n(e.emojiData)))}
//# sourceMappingURL=/dynamic/app/emoji-custom/client/notifications/d74a60cf77cda0c1dc6f47c863263227ea700bb3.map
