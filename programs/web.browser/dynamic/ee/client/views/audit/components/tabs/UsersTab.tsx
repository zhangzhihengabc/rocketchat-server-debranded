function module(e,l,r){let t,n,a,i,o,u,d,s;r.link("@rocket.chat/fuselage",{Field(e){t=e},FieldLabel(e){n=e},FieldRow(e){a=e},FieldError(e){i=e}},0),r.link("@rocket.chat/ui-contexts",{useTranslation(e){o=e}},1),r.link("react",{default(e){u=e}},2),r.link("react-hook-form",{useController(e){d=e}},3),r.link("../../../../../../client/components/UserAutoCompleteMultiple",{default(e){s=e}},4),r.exportDefault(e=>{var l,r;let{form:{control:c}}=e,m=o(),{field:f,fieldState:h}=d({name:"users",control:c,rules:{required:!0,validate:e=>{if(e.length<1)return m("The_field_is_required",m("Users"))}}});return u.createElement(t,{flexShrink:1},u.createElement(n,null,m("Users")),u.createElement(a,null,u.createElement(s,{error:!!h.error,value:f.value,onChange:f.onChange,placeholder:m("Username_Placeholder")})),(null===(l=h.error)||void 0===l?void 0:l.type)==="required"&&u.createElement(i,null,m("The_field_is_required",m("Users"))),(null===(r=h.error)||void 0===r?void 0:r.type)==="validate"&&u.createElement(i,null,h.error.message))})}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/tabs/6f02855a6a8b0f62b65b8126d9a1eff8d0ff56cf.map