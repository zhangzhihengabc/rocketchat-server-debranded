function module(e,t,n){var l,a,o,i,u,c,r,d;n.link("@rocket.chat/fuselage",{Box:function(e){l=e},FieldLabel:function(e){a=e},FieldRow:function(e){o=e},Flex:function(e){i=e},Select:function(e){u=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){c=e}},1),n.link("react",{default:function(e){r=e}},2),n.link("../ResetSettingButton",{default:function(e){d=e}},3),n.exportDefault(function(e){var t=e._id,n=e.label,f=e.value,s=e.placeholder,m=e.readonly,k=e.autocomplete,g=e.disabled,h=e.values,p=e.hasResetButton,v=e.onChangeValue,E=e.onResetButtonClick,C=c(),b=function(e){null==v||v(e)};return r.createElement(r.Fragment,null,r.createElement(i.Container,null,r.createElement(l,null,r.createElement(a,{htmlFor:t,title:t},n),p&&r.createElement(d,{"data-qa-reset-setting-id":t,onClick:E}))),r.createElement(o,null,r.createElement(u,{"data-qa-setting-id":t,id:t,value:f,placeholder:s,disabled:g,readOnly:m,autoComplete:!1===k?"off":void 0,onChange:function(e){return b(String(e))},options:(void 0===h?[]:h).map(function(e){return[e.key,C(e.i18nLabel)]})})))})}
//# sourceMappingURL=/dynamic/client/views/admin/settings/inputs/f515354987baf2c4dcac96567e3d5a4f86bdce65.map