function module(e,t,n){var l,r,i,a,o,u,c,f,m,s,d,p,k,E,g,b,h,x,y,S;n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},1),n.link("@rocket.chat/fuselage",{Box:function(e){i=e},Field:function(e){a=e},FieldLabel:function(e){o=e},FieldRow:function(e){u=e},FieldError:function(e){c=e},TextInput:function(e){f=e},Button:function(e){m=e},ButtonGroup:function(e){s=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){d=e}},1),n.link("react",{default:function(e){p=e}},2),n.link("react-hook-form",{useController:function(e){k=e}},3),n.link("../hooks/useAuditForm",{useAuditForm:function(e){E=e}},4),n.link("../hooks/useSendTelemetryMutation",{useSendTelemetryMutation:function(e){g=e}},5),n.link("./forms/DateRangePicker",{default:function(e){b=e}},6),n.link("./tabs/DirectTab",{default:function(e){h=e}},7),n.link("./tabs/OmnichannelTab",{default:function(e){x=e}},8),n.link("./tabs/RoomsTab",{default:function(e){y=e}},9),n.link("./tabs/UsersTab",{default:function(e){S=e}},10),n.exportDefault(function(e){var t,n,v=e.type,D=e.onSubmit,T=d(),w=E(),C=w.control,F=w.handleSubmit,I=w.register,_=k({name:"dateRange",control:C}),A=_.field,B=_.fieldState,M=g();return p.createElement("form",{onSubmit:F(function(){M.mutate({params:[{eventName:"updateCounter",settingsId:"Message_Auditing_Apply_Count",timestamp:Date.now()}]}),null==D||D(r({type:v},w.getValues()))})},p.createElement(i,{display:"flex",flexDirection:"row",justifyContent:"stretch",marginInline:-4},p.createElement(a,{flexShrink:1,marginInline:4},p.createElement(o,null,T("Message")),p.createElement(u,null,p.createElement(f,l({placeholder:T("Search")},I("msg"))))),p.createElement(a,{flexShrink:1,marginInline:4},p.createElement(o,null,T("Date")),p.createElement(u,null,p.createElement(b,{value:A.value,onChange:A.onChange,display:"flex",flexGrow:1}),(null===(t=B.error)||void 0===t?void 0:t.type)==="required"&&p.createElement(c,null,T("The_field_is_required",T("Date"))),(null===(n=B.error)||void 0===n?void 0:n.type)==="validate"&&p.createElement(c,null,B.error.message)))),p.createElement(i,{display:"flex",flexDirection:"row",alignItems:"flex-start"},""===v&&p.createElement(y,{form:w}),"u"===v&&p.createElement(S,{form:w}),"d"===v&&p.createElement(h,{form:w}),"l"===v&&p.createElement(x,{form:w}),p.createElement(s,{align:"end",flexShrink:0,marginBlockStart:28,marginInlineStart:8},p.createElement(m,{secondary:!0,onClick:function(){return window.print()}},T("Export")," ",T("PDF")),p.createElement(m,{primary:!0,type:"submit"},T("Apply")))))})}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/c8e65f998e21c3e67a0fde51c86a25025e2ad5cb.map