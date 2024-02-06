function module(e,n,t){var a;let l,o,i,r,s,d,u,c,m,p,f,k,h,v,g,b,x,y;t.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){l=e}},0),t.link("@rocket.chat/css-in-js",{css(e){o=e}},0),t.link("@rocket.chat/fuselage",{Box(e){i=e}},1),t.link("@rocket.chat/fuselage-hooks",{useResizeObserver(e){r=e}},2),t.link("@rocket.chat/ui-contexts",{useUserPreference(e){s=e},useUserId(e){d=e},useTranslation(e){u=e}},3),t.link("react",{default(e){c=e},useMemo(e){m=e}},4),t.link("react-virtuoso",{Virtuoso(e){p=e}},5),t.link("../../lib/RoomManager",{useOpenedRoom(e){f=e}},6),t.link("../hooks/useAvatarTemplate",{useAvatarTemplate(e){k=e}},7),t.link("../hooks/usePreventDefault",{usePreventDefault(e){h=e}},8),t.link("../hooks/useRoomList",{useRoomList(e){v=e}},9),t.link("../hooks/useShortcutOpenMenu",{useShortcutOpenMenu(e){g=e}},10),t.link("../hooks/useTemplateByViewMode",{useTemplateByViewMode(e){b=e}},11),t.link("./RoomListRow",{default(e){x=e}},12),t.link("./ScrollerWithCustomProps",{default(e){y=e}},13);let _=(e,n)=>n._id||e;t.exportDefault(()=>{var e;let n=u(),t=!d(),w=v(),T=k(),M=b(),{ref:R}=r({debounceDelay:100}),z=null!==(e=f())&&void 0!==e?e:"",B=s("sidebarViewMode")||"extended",S="extended"===B,C=m(()=>({extended:S,t:n,SideBarItemTemplate:M,AvatarTemplate:T,openedRoom:z,sidebarViewMode:B,isAnonymous:t}),[T,S,t,z,M,B,n]);h(R),g(R);let D=o(a||(a=l(["\n		position: relative;\n\n		display: flex;\n\n		overflow-x: hidden;\n		overflow-y: hidden;\n\n		flex: 1 1 auto;\n\n		height: 100%;\n\n		&--embedded {\n			margin-top: 2rem;\n		}\n\n		&__list:not(:last-child) {\n			margin-bottom: 22px;\n		}\n\n		&__type {\n			display: flex;\n\n			flex-direction: row;\n\n			padding: 0 var(--sidebar-default-padding) 1rem var(--sidebar-default-padding);\n\n			color: var(--rooms-list-title-color);\n\n			font-size: var(--rooms-list-title-text-size);\n			align-items: center;\n			justify-content: space-between;\n\n			&-text--livechat {\n				flex: 1;\n			}\n		}\n\n		&__empty-room {\n			padding: 0 var(--sidebar-default-padding);\n\n			color: var(--rooms-list-empty-text-color);\n\n			font-size: var(--rooms-list-empty-text-size);\n		}\n\n		&__toolbar-search {\n			position: absolute;\n			z-index: 10;\n			left: 0;\n\n			overflow-y: scroll;\n\n			height: 100%;\n\n			background-color: var(--sidebar-background);\n\n			padding-block-start: 12px;\n		}\n\n		@media (max-width: 400px) {\n			padding: 0 calc(var(--sidebar-small-default-padding) - 4px);\n\n			&__type,\n			&__empty-room {\n				padding: 0 calc(var(--sidebar-small-default-padding) - 4px) 0.5rem calc(var(--sidebar-small-default-padding) - 4px);\n			}\n		}\n	"])));return c.createElement(i,{className:[D,"sidebar--custom-colors"].filter(Boolean),"aria-label":n("Channels"),role:"navigation"},c.createElement(i,{h:"full",w:"full",ref:R},c.createElement(p,{totalCount:w.length,data:w,components:{Scroller:y},computeItemKey:_,itemContent:(e,n)=>c.createElement(x,{data:C,item:n})})))})}
//# sourceMappingURL=/dynamic/client/sidebar/RoomList/7b55fce343c6ef040850b9285eb0a6954d8d0ca9.map