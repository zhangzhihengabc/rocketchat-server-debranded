function module(t,l,e){var n;let a,o,i,r,s,u,c;e.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(t){a=t}},0),e.export({CallDialpadButton:()=>k}),e.link("@rocket.chat/css-in-js",{css(t){o=t}},0),e.link("@rocket.chat/fuselage",{IconButton(t){i=t}},1),e.link("@rocket.chat/ui-contexts",{useTranslation(t){r=t}},2),e.link("react",{default(t){s=t}},3),e.link("../../../../contexts/CallContext",{useVoipOutboundStates(t){u=t}},4),e.link("../../../../hooks/useDialModal",{useDialModal(t){c=t}},5);let d=o(n||(n=a(["\n	.rcx-show-call-button-on-hover:not(:hover) & {\n		display: none !important;\n	}\n"]))),k=t=>{let{phoneNumber:l}=t,e=r(),{outBoundCallsAllowed:n,outBoundCallsEnabledForUser:a}=u(),{openDialModal:o}=c();return s.createElement(i,{"rcx-call-dial-button":!0,title:e(n?"Call_number":"Call_number_premium_only"),className:d,disabled:!a||!l,tiny:!0,icon:"phone",onClick:t=>{t.stopPropagation(),o({initialValue:l})}})}}
//# sourceMappingURL=/dynamic/client/views/omnichannel/directory/components/f6c8a214e41d86a98bdd870432c053234ee75e70.map