function module(e,i,t){let n,s,a,l,r,o;t.link("meteor/meteor",{Meteor(e){n=e}},0),t.link("../../../app/ui-utils/client",{MessageAction(e){s=e}},1),t.link("../../../app/utils/lib/i18n",{t(e){a=e}},2),t.link("../../lib/getPermaLink",{getPermaLink(e){l=e}},3),t.link("../../lib/toast",{dispatchToastMessage(e){r=e}},4),t.link("../../lib/utils/messageArgs",{messageArgs(e){o=e}},5),n.startup(()=>{s.addButton({id:"permalink-pinned",icon:"permalink",label:"Copy_link",context:["pinned"],async action(e,i){try{let{message:e=o(this).msg}=i,t=await l(e._id);navigator.clipboard.writeText(t),r({type:"success",message:a("Copied")})}catch(e){r({type:"error",message:e})}},condition(e){let{subscription:i}=e;return!!i},order:5,group:"menu"})})}
//# sourceMappingURL=/dynamic/client/startup/actionButtons/281e79869789907be1027ef4ca82fe90b4285530.map