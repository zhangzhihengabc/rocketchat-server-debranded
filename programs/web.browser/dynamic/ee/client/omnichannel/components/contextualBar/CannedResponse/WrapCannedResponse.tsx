function module(e,n,a){let l,t,s,o,d,i;a.link("@rocket.chat/ui-contexts",{useSetModal(e){l=e},usePermission(e){t=e}},0),a.link("react",{default(e){s=e},memo(e){o=e}},1),a.link("../../CannedResponse/modals",{default(e){d=e}},2),a.link("./CannedResponse",{default(e){i=e}},3),a.exportDefault(o(e=>{let{allowUse:n,cannedItem:{_id:a,departmentName:o,departmentId:c,shortcut:r,tags:u,scope:k,text:m}={},onClickBack:p,onClickUse:C,reload:f}=e,E=l(),w=t("view-all-canned-responses"),v=t("save-department-canned-responses");return s.createElement(i,{allowEdit:w||v&&"global"!==k||"user"===k,allowUse:n,data:{departmentName:o,shortcut:r,tags:u,scope:k,text:m},onClickBack:p,onClickEdit:()=>{E(s.createElement(d,{data:{_id:a,departmentId:c,shortcut:r,tags:u,scope:k,text:m},reloadCannedList:f}))},onClickUse:e=>{C(e,m)}})}))}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/components/contextualBar/CannedResponse/64ac42700e8248ef65a55e890932c63678deed1e.map