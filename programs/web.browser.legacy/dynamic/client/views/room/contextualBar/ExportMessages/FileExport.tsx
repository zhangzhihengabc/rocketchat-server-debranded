function module(e,t,n){var o,r,l,a,c,u,i,m,f,d,E,p,s,F,h,k,b,x,y;n.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Field:function(e){r=e},FieldLabel:function(e){l=e},FieldRow:function(e){a=e},Select:function(e){c=e},ButtonGroup:function(e){u=e},Button:function(e){i=e},FieldGroup:function(e){m=e},InputBox:function(e){f=e}},0),n.link("@rocket.chat/fuselage-hooks",{useAutoFocus:function(e){d=e},useUniqueId:function(e){E=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){p=e}},2),n.link("react",{default:function(e){s=e},useMemo:function(e){F=e}},3),n.link("react-hook-form",{Controller:function(e){h=e},useFormContext:function(e){k=e}},4),n.link("../../../../components/Contextualbar",{ContextualbarScrollableContent:function(e){b=e},ContextualbarFooter:function(e){x=e}},5),n.link("./useRoomExportMutation",{useRoomExportMutation:function(e){y=e}},6),n.exportDefault(function(e){var t=e.formId,n=e.rid,C=e.exportOptions,v=e.onCancel,T=p(),M=k(),S=M.control,I=M.handleSubmit,g=y(),B=d(),D=F(function(){return[["html",T("HTML")],["json",T("JSON")]]},[T]),O=E(),R=E(),_=E(),A=E();return s.createElement(s.Fragment,null,s.createElement(b,null,s.createElement("form",{ref:B,tabIndex:-1,"aria-labelledby":t+"-title",id:t,onSubmit:I(function(e){var t=e.type,o=e.dateFrom,r=e.dateTo,l=e.format;g.mutateAsync({rid:n,type:t,dateFrom:o,dateTo:r,format:l})})},s.createElement(m,null,s.createElement(r,null,s.createElement(l,{htmlFor:O},T("Method")),s.createElement(a,null,s.createElement(h,{name:"type",control:S,render:function(e){var t=e.field;return s.createElement(c,o({id:O},t,{placeholder:T("Type"),options:C}))}}))),s.createElement(r,null,s.createElement(l,{htmlFor:R},T("Date_From")),s.createElement(a,null,s.createElement(h,{name:"dateFrom",control:S,render:function(e){var t=e.field;return s.createElement(f,o({id:R,type:"date"},t))}}))),s.createElement(r,null,s.createElement(l,{htmlFor:_},T("Date_to")),s.createElement(a,null,s.createElement(h,{name:"dateTo",control:S,render:function(e){var t=e.field;return s.createElement(f,o({id:_},t,{type:"date"}))}}))),s.createElement(r,null,s.createElement(l,{htmlFor:A},T("Output_format")),s.createElement(a,null,s.createElement(h,{name:"format",control:S,render:function(e){var t=e.field;return s.createElement(c,o({},t,{id:A,placeholder:T("Format"),options:D}))}})))))),s.createElement(x,null,s.createElement(u,{stretch:!0},s.createElement(i,{onClick:v},T("Cancel")),s.createElement(i,{form:t,primary:!0,type:"submit"},T("Export")))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/ExportMessages/9d924a7823de31c175396b56043089f6ef1be2b1.map