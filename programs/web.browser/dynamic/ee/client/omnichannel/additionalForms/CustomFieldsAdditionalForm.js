function module(e,l,t){let a,n,c,r,i,u,o,m;t.link("@rocket.chat/fuselage",{Box(e){a=e},Field(e){n=e},TextInput(e){c=e},ToggleSwitch(e){r=e},Select(e){i=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation(e){u=e}},1),t.link("react",{default(e){o=e},useMemo(e){m=e}},2),t.exportDefault(e=>{let{values:l={},handlers:t={},state:s,className:E,errors:d}=e,p=u(),{type:h,required:b,defaultValue:f,options:_,public:g}=l,{handleType:v,handleRequired:w,handleDefaultValue:x,handleOptions:k,handlePublic:L}=t,{optionsError:R}=d,C=m(()=>[["input",p("Input")],["select",p("Select")]],[p]);return o.createElement(o.Fragment,null,o.createElement(n,{className:E},o.createElement(a,{display:"flex",flexDirection:"row"},o.createElement(n.Label,{htmlFor:"required"},p("Required")),o.createElement(n.Row,null,o.createElement(r,{id:"required",checked:b,onChange:w})))),o.createElement(n,{className:E},o.createElement(n.Label,null,p("Type")),o.createElement(n.Row,null,o.createElement(i,{options:C,value:h,onChange:v}))),o.createElement(n,{className:E},o.createElement(n.Label,null,p("Default_value")),o.createElement(n.Row,null,o.createElement(c,{value:f,onChange:x,placeholder:p("Default_value")}))),o.createElement(n,{className:E},o.createElement(n.Label,null,p("Options")),o.createElement(n.Row,null,o.createElement(c,{value:_,onChange:k,error:R,disabled:"input"===h,placeholder:p("Options")})),o.createElement(n.Hint,null,p("Livechat_custom_fields_options_placeholder")),R&&o.createElement(n.Error,null,R)),o.createElement(n,{className:E},o.createElement(a,{display:"flex",flexDirection:"row"},o.createElement(n.Label,{htmlFor:"public"},p("Public")),o.createElement(n.Row,null,o.createElement(r,{disabled:!s.visibility,id:"public",checked:g,onChange:L}))),o.createElement(n.Hint,null,p("Livechat_custom_fields_public_description"))))})}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/additionalForms/273e8d57897f987157e2260414c01d6b1f655e8e.map