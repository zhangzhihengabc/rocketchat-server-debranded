function module(e,t,n){let l,a,o,r,c,i,m,u,s,h,E,p,x,C,f,k,d,b,g,w,S,T,_,A,F;n.link("@rocket.chat/fuselage",{Box(e){l=e},Icon(e){a=e},TextInput(e){o=e},Margins(e){r=e},Select(e){c=e},Throbber(e){i=e},ButtonGroup(e){m=e},Button(e){u=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){s=e},useAutoFocus(e){h=e},useDebouncedCallback(e){E=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation(e){p=e}},2),n.link("react",{default(e){x=e},useMemo(e){C=e}},3),n.link("react-virtuoso",{Virtuoso(e){f=e}},4),n.link("../../../../components/Contextualbar",{ContextualbarHeader(e){k=e},ContextualbarIcon(e){d=e},ContextualbarTitle(e){b=e},ContextualbarClose(e){g=e},ContextualbarContent(e){w=e},ContextualbarFooter(e){S=e},ContextualbarEmptyContent(e){T=e}},5),n.link("../../../../components/InfiniteListAnchor",{default(e){_=e}},6),n.link("../../../../components/ScrollableContentWrapper",{default(e){A=e}},7),n.link("./Row",{default(e){F=e}},8),n.exportDefault(e=>{let{loading:t,channels:n=[],text:M,type:v,setText:y,setType:D,onClickClose:I,onClickAddExisting:B,onClickCreateNew:z,total:G,loadMoreItems:V,onClickView:j,reload:H}=e,J=p(),L=h(!0),N=C(()=>[["all",J("All")],["autoJoin",J("Team_Auto-join")]],[J]),R=s(e=>!t&&V(e,Math.min(50,G-e))),W=E(()=>{n.length>=G||R(n.length)},300,[R,n]);return x.createElement(x.Fragment,null,x.createElement(k,null,x.createElement(d,{name:"hash"}),x.createElement(b,null,J("Team_Channels")),I&&x.createElement(g,{onClick:I})),x.createElement(w,{p:12},x.createElement(l,{display:"flex",flexDirection:"row",p:12,flexShrink:0},x.createElement(l,{display:"flex",flexDirection:"row",flexGrow:1,mi:"neg-x4"},x.createElement(r,{inline:4},x.createElement(o,{placeholder:J("Search"),value:M,ref:L,onChange:y,addon:x.createElement(a,{name:"magnifier",size:"x20"})}),x.createElement(l,{w:"x144"},x.createElement(c,{onChange:e=>D(e),value:v,options:N}))))),t&&x.createElement(l,{pi:24,pb:12},x.createElement(i,{size:"x12"})),!t&&0===n.length&&x.createElement(T,{title:J("No_channels_in_team")}),!t&&n.length>0&&x.createElement(x.Fragment,null,x.createElement(l,{pi:18,pb:12},x.createElement(l,{is:"span",color:"hint",fontScale:"p2"},J("Showing"),": ",n.length),x.createElement(l,{is:"span",color:"hint",fontScale:"p2",mis:8},J("Total"),": ",G)),x.createElement(l,{w:"full",h:"full",overflow:"hidden",flexShrink:1},x.createElement(f,{totalCount:G,data:n,components:{Scroller:A,Footer:()=>x.createElement(_,{loadMore:W})},itemContent:(e,t)=>x.createElement(F,{onClickView:j,room:t,reload:H,key:e})})))),(B||z)&&x.createElement(S,null,x.createElement(m,{stretch:!0},B&&x.createElement(u,{onClick:B,width:"50%"},J("Team_Add_existing")),z&&x.createElement(u,{onClick:z,width:"50%"},J("Create_new")))))})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/channels/f1ee0588a8f82c952d58c3bb6a5ecb42bfb99f60.map