function module(e,l,t){let o,u,n,r,a,c,f;t.link("@rocket.chat/fuselage",{Box(e){o=e}},0),t.link("@rocket.chat/fuselage-hooks",{useOutsideClick(e){u=e}},1),t.link("@rocket.chat/ui-contexts",{useLayout(e){n=e}},2),t.link("react",{default(e){r=e},useRef(e){a=e}},3),t.link("./DesktopToolboxDropdown",{default(e){c=e}},4),t.link("./MobileToolboxDropdown",{default(e){f=e}},5),t.exportDefault(e=>{let{children:l,handleClose:t,reference:k}=e,{isMobile:i}=n(),s=a(null),d=a(null),h=i?f:c;return u([d],t),r.createElement(h,{ref:s,reference:k},r.createElement(o,{w:"full",h:"full",ref:d},l))})}
//# sourceMappingURL=/dynamic/client/components/message/toolbox/0776191e1dd4a1d55825fca0f564780c2f289cd2.map