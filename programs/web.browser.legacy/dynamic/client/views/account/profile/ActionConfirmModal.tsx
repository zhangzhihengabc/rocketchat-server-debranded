function module(e,n,t){var o,u,l,r,a,c,i,f,d,s,m,_,E,p;t.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},1),t.link("@rocket.chat/fuselage",{Box:function(e){l=e},PasswordInput:function(e){r=e},TextInput:function(e){a=e},FieldGroup:function(e){c=e},Field:function(e){i=e},FieldRow:function(e){f=e},FieldError:function(e){d=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){s=e}},1),t.link("react",{default:function(e){m=e},useState:function(e){_=e},useCallback:function(e){E=e}},2),t.link("../../../components/GenericModal",{default:function(e){p=e}},3),t.exportDefault(function(e){var n=e.isPassword,t=e.onConfirm,v=e.onCancel,k=s(),C=u(_(""),2),b=C[0],g=C[1],h=u(_(),2),w=h[0],x=h[1],y=E(function(e){""!==e.target.value&&x(void 0),g(e.currentTarget.value)},[g]),F=E(function(e){if(e.preventDefault(),""===b){x(k("Invalid_field"));return}t(b),v()},[b,t,v,k]);return m.createElement(p,{wrapperFunction:function(e){return m.createElement(l,o({is:"form",onSubmit:F},e))},onClose:v,onConfirm:F,onCancel:v,variant:"danger",title:k("Delete_account?"),confirmText:k("Delete_account")},m.createElement(l,{mb:8},n?k("Enter_your_password_to_delete_your_account"):k("Enter_your_username_to_delete_your_account")),m.createElement(c,{w:"full"},m.createElement(i,null,m.createElement(f,null,n&&m.createElement(r,{value:b,onChange:y}),!n&&m.createElement(a,{value:b,onChange:y})),m.createElement(d,null,w))))})}
//# sourceMappingURL=/dynamic/client/views/account/profile/e522ece0e372c99eb2a2707991083e5f19e6e227.map