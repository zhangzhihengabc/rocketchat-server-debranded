function module(e,n,t){let l,a,r,u,c,i,o;t.link("@rocket.chat/ui-contexts",{useRouter(e){l=e}},0),t.link("react",{default(e){a=e},Suspense(e){r=e},useEffect(e){u=e}},1),t.link("../../components/PageSkeleton",{default(e){c=e}},2),t.link("../../sidebar/SidebarPortal",{default(e){i=e}},3),t.link("./sidebar/OmnichannelSidebar",{default(e){o=e}},4),t.exportDefault(e=>{let{children:n}=e,t=l();return(u(()=>t.subscribeToRouteChange(()=>{"omnichannel-index"===t.getRouteName()&&t.navigate({name:"omnichannel-current-chats"},{replace:!0})}),[t]),n)?a.createElement(a.Fragment,null,a.createElement(r,{fallback:a.createElement(c,null)},n),a.createElement(i,null,a.createElement(o,null))):a.createElement(c,null)})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/5fc5fde5dbe2533c26743b380f5a87ca30576d5b.map