function module(t,e,a){let n,i,s,m,o,l,r;a.export({processSlashCommand:()=>u}),a.link("@rocket.chat/random",{Random(t){n=t}},0),a.link("@rocket.chat/string-helpers",{escapeHTML(t){i=t}},1),a.link("../../../../app/authorization/client",{hasAtLeastOnePermission(t){s=t}},2),a.link("../../../../app/settings/client",{settings(t){m=t}},3),a.link("../../../../app/utils/client",{slashCommands(t){o=t}},4),a.link("../../../../app/utils/client/lib/SDKClient",{sdk(t){l=t}},5),a.link("../../../../app/utils/lib/i18n",{t(t){r=t}},6);let c=t=>{let e=t.match(/^\/([^\s]+)(.*)/);if(!e)return;let[,a,n]=e,i=o.commands[a];return i?{command:i,params:n}:{command:a,params:n}},d=async(t,e)=>{console.error(e),await t.data.pushEphemeralMessage({_id:n.id(),ts:new Date,msg:e,u:{_id:"rocket.cat",username:"rocket.cat",name:"Rocket.Cat"},private:!0,_updatedAt:new Date})},u=async(t,e)=>{let a=c(e.msg);if(!a)return!1;let{command:n,params:o}=a;if("string"==typeof n)return!m.get("Message_AllowUnrecognizedSlashCommand")&&(await d(t,r("No_such_command",{command:i(n)})),!0);let{permission:u,clientOnly:p,callback:g,result:h,appId:_,command:k}=n;if(u&&!s(u,e.rid))return await d(t,r("You_do_not_have_permission_to_execute_this_command",{command:i(k)})),!0;if(p&&t.uid)return null==g||g({command:k,message:e,params:o,userId:t.uid}),!0;await l.rest.post("/v1/statistics.telemetry",{params:[{eventName:"slashCommandsStats",timestamp:Date.now(),command:k}]});let w=t.ActionManager.generateTriggerId(_),f={cmd:k,params:o,msg:e,userId:t.uid};try{_&&t.ActionManager.notifyBusy();let a=await l.call("slashCommand",{cmd:k,params:o,msg:e,triggerId:w});null==h||h(void 0,a,f)}catch(e){await d(t,r("Something_went_wrong_while_executing_command",{command:k})),null==h||h(e,void 0,f)}return _&&t.ActionManager.notifyIdle(),!0}}
//# sourceMappingURL=/dynamic/client/lib/chats/flows/2e0e4fa09e754c39d6955a7a1ab694e0cd615c7f.map