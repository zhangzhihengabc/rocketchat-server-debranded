function module(n,e,t){var i;let a,r,l,s,o,c,d;t.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(n){a=n}},0),t.link("@rocket.chat/css-in-js",{css(n){r=n}},0),t.link("@rocket.chat/fuselage",{Box(n){l=n},Icon(n){s=n}},1),t.link("react",{default(n){o=n},useState(n){c=n}},2),t.link("../../../../lib/isTruthy",{isTruthy(n){d=n}},3);let u=r(i||(i=a(["\n	position: absolute;\n	z-index: 2;\n	bottom: 8px;\n	left: 50%;\n	user-select: none;\n	transform: translate(-50%, 0);\n	text-align: center;\n	border-radius: 20px;\n	cursor: pointer;\n\n	&.not {\n		visibility: hidden;\n	}\n\n	&.clicked {\n		animation: fadeout 1s linear forwards;\n	}\n\n	@keyframes fadeout {\n		50% {\n			visibility: visible;\n			transform: translate(-50%, 150%);\n		}\n		100% {\n			visibility: hidden;\n			transform: translate(-50%, 150%);\n			position: fixed;\n		}\n	}\n"])));t.exportDefault(n=>{let{visible:e,onClick:t,text:i}=n,[a,r]=c(!1);return o.createElement(l,{is:"button",fontScale:"c2",minWidth:"x130",bg:"status-background-info",h:"x30",pi:16,className:[u,!e&&"not",a&&"clicked"].filter(d),onClick:n=>{t(n),r(!0)}},i,o.createElement(s,{name:"arrow-down",size:"x16"}))})}
//# sourceMappingURL=/dynamic/client/views/room/body/344cfa4720b707ae268690a6824029acbee1cb33.map