function module(e,n,t){let r,i,o,a;t.link("@rocket.chat/fuselage",{Box(e){r=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation(e){i=e}},1),t.link("react",{default(e){o=e}},2),t.link("./GenericModal",{default(e){a=e}},3),t.exportDefault(e=>{let{onConfirm:n,onCancel:t,newWorkspace:c}=e,l=i();return o.createElement(a,{variant:"warning",title:l(c?"Confirm_new_workspace":"Confirm_configuration_update"),onConfirm:n,onCancel:t,cancelText:l("Back"),confirmText:l(c?"Confirm_new_workspace":"Confirm_configuration_update")},o.createElement(r,{is:"p",mbe:16,dangerouslySetInnerHTML:{__html:l(c?"Confirm_new_workspace_description":"Confirm_configuration_update_description")}}),o.createElement(r,{is:"p",mbe:16,dangerouslySetInnerHTML:{__html:l("Unique_ID_change_detected_learn_more_link")}}))})}
//# sourceMappingURL=/dynamic/client/components/c7342edd2aff78fdc8797624d316f8a8711843c6.map