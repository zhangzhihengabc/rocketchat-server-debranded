function module(e,l,o){let i,t,n,a,p;o.export({uploadFiles:()=>s}),o.link("@rocket.chat/core-typings",{isRoomFederated(e){i=e}},0),o.link("../../../../app/utils/client",{fileUploadIsValidContentType(e){t=e}},1),o.link("../../../views/room/modals/FileUploadModal",{default(e){n=e}},2),o.link("../../imperativeModal",{imperativeModal(e){a=e}},3),o.link("../../utils/prependReplies",{prependReplies(e){p=e}},4);let s=async(e,l,o)=>{var s,d;let r=null!==(s=null===(d=e.composer)||void 0===d?void 0:d.quotedMessages.get())&&void 0!==s?s:[],u=await p("",r),c=await e.data.getRoom(),m=[...l],v=()=>{var l,o,p;let s=m.pop();if(!s){null===(p=e.composer)||void 0===p||p.dismissAllQuotedMessages();return}a.open({component:n,props:{file:s,fileName:s.name,fileDescription:null!==(l=null===(o=e.composer)||void 0===o?void 0:o.text)&&void 0!==l?l:"",showDescription:c&&!i(c),onClose:()=>{a.close(),v()},onSubmit:(l,o)=>{var i;Object.defineProperty(s,"name",{writable:!0,value:l}),e.uploads.send(s,{description:o,msg:u}),null===(i=e.composer)||void 0===i||i.clear(),a.close(),v()},invalidContentType:!!(s.type&&!t(s.type))}})};v(),null==o||o()}}
//# sourceMappingURL=/dynamic/client/lib/chats/flows/aefa2469d981fa64bc7f91fb3295559775a17309.map