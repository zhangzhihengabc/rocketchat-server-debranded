function module(e,l,a){var n,t,c,r,i,o,m,u;a.link("@rocket.chat/fuselage",{Box:function(e){n=e},Field:function(e){t=e},TextInput:function(e){c=e},ToggleSwitch:function(e){r=e},Select:function(e){i=e}},0),a.link("@rocket.chat/ui-contexts",{useTranslation:function(e){o=e}},1),a.link("react",{default:function(e){m=e},useMemo:function(e){u=e}},2),a.exportDefault(function(e){var l=e.values,a=void 0===l?{}:l,s=e.handlers,d=void 0===s?{}:s,h=e.className,E=o(),b=a.id,f=a.field,p=a.label,v=a.scope,g=a.visibility,x=a.searchable,w=a.regexp,L=d.handleField,R=d.handleLabel,k=d.handleScope,F=d.handleVisibility,N=d.handleSearchable,C=d.handleRegexp,S=u(function(){return[["visitor",E("Visitor")],["room",E("Room")]]},[E]);return m.createElement(m.Fragment,null,m.createElement(t,{className:h},m.createElement(t.Label,null,E("Field"),"*"),m.createElement(t.Row,null,m.createElement(c,{disabled:b,value:f,onChange:L,placeholder:E("Field")}))),m.createElement(t,{className:h},m.createElement(t.Label,null,E("Label"),"*"),m.createElement(t.Row,null,m.createElement(c,{value:p,onChange:R,placeholder:E("Label")}))),m.createElement(t,{className:h},m.createElement(t.Label,null,E("Scope")),m.createElement(t.Row,null,m.createElement(i,{options:S,value:v,onChange:k}))),m.createElement(t,{className:h},m.createElement(n,{display:"flex",flexDirection:"row"},m.createElement(t.Label,{htmlFor:"visible"},E("Visible")),m.createElement(t.Row,null,m.createElement(r,{id:"visible",checked:g,onChange:F})))),m.createElement(t,{className:h},m.createElement(n,{display:"flex",flexDirection:"row"},m.createElement(t.Label,{htmlFor:"searchable"},E("Searchable")),m.createElement(t.Row,null,m.createElement(r,{id:"searchable",checked:x,onChange:N})))),m.createElement(t,{className:h},m.createElement(t.Label,null,E("Validation")),m.createElement(t.Row,null,m.createElement(c,{value:w,onChange:C,placeholder:E("Validation")}))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/customFields/eb4f1fd68c2aad67d29a3e8ebc623f813a27be92.map