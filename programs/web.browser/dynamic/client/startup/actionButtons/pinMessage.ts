function module(e,i,t){let n,s,o,a,l,r,d,p,c;t.link("meteor/meteor",{Meteor(e){n=e}},0),t.link("../../../app/authorization/client",{hasAtLeastOnePermission(e){s=e}},1),t.link("../../../app/settings/client",{settings(e){o=e}},2),t.link("../../../app/ui-utils/client",{MessageAction(e){a=e}},3),t.link("../../../app/utils/client/lib/SDKClient",{sdk(e){l=e}},4),t.link("../../lib/queryClient",{queryClient(e){r=e}},5),t.link("../../lib/rooms/roomCoordinator",{roomCoordinator(e){d=e}},6),t.link("../../lib/toast",{dispatchToastMessage(e){p=e}},7),t.link("../../lib/utils/messageArgs",{messageArgs(e){c=e}},8),n.startup(()=>{a.addButton({id:"pin-message",icon:"pin",label:"Pin",type:"interaction",context:["pinned","message","message-mobile","threads","direct","videoconf","videoconf-threads"],async action(e,i){let{message:t=c(this).msg}=i;t.pinned=!0;try{await l.call("pinMessage",t),r.invalidateQueries(["rooms",t.rid,"pinned-messages"])}catch(e){p({type:"error",message:e})}},condition(e){let{message:i,subscription:t,room:n}=e;if(!o.get("Message_AllowPinning")||i.pinned||!t)return!1;let a=d.isLivechatRoom(n.t);return!a&&s("pin-message",i.rid)},order:2,group:"menu"})})}
//# sourceMappingURL=/dynamic/client/startup/actionButtons/2b68ed424f409d3141bac10f7c18011cdd406a0e.map