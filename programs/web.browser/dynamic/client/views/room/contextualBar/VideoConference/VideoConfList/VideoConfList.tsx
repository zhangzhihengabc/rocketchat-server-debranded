function module(e,t,n){let l,a,o,r,i,c,u,s,m,d,h,C,f,x,E,k,b,g,p;n.link("@rocket.chat/fuselage",{Box(e){l=e},States(e){a=e},StatesIcon(e){o=e},StatesTitle(e){r=e},StatesSubtitle(e){i=e}},0),n.link("@rocket.chat/fuselage-hooks",{useResizeObserver(e){c=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation(e){u=e}},2),n.link("react",{default(e){s=e}},3),n.link("react-virtuoso",{Virtuoso(e){m=e}},4),n.link("../../../../../components/Contextualbar",{ContextualbarSkeleton(e){d=e},ContextualbarHeader(e){h=e},ContextualbarIcon(e){C=e},ContextualbarTitle(e){f=e},ContextualbarClose(e){x=e},ContextualbarContent(e){E=e},ContextualbarEmptyContent(e){k=e}},5),n.link("../../../../../components/ScrollableContentWrapper",{default(e){b=e}},6),n.link("../../../../../lib/errorHandling",{getErrorMessage(e){g=e}},7),n.link("./VideoConfListItem",{default(e){p=e}},8),n.exportDefault(e=>{let{onClose:t,total:n,videoConfs:S,loading:_,error:y,reload:v,loadMoreItems:w}=e,D=u(),{ref:I,contentBoxSize:{inlineSize:T=378,blockSize:z=1}={}}=c({debounceDelay:200});return _?s.createElement(d,null):s.createElement(s.Fragment,null,s.createElement(h,null,s.createElement(C,{name:"phone"}),s.createElement(f,null,D("Calls")),s.createElement(x,{onClick:t})),s.createElement(E,{paddingInline:0,ref:I},(0===n||y)&&s.createElement(l,{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%"},y&&s.createElement(a,null,s.createElement(o,{name:"circle-exclamation",variation:"danger"}),s.createElement(r,null,D("Something_went_wrong")),s.createElement(i,null,g(y))),!y&&0===n&&s.createElement(k,{icon:"phone",title:D("No_history"),subtitle:D("There_is_no_video_conference_history_in_this_room")})),S.length>0&&s.createElement(l,{flexGrow:1,flexShrink:1,overflow:"hidden",display:"flex"},s.createElement(m,{style:{height:z,width:T},totalCount:n,endReached:e=>w(e,Math.min(50,n-e)),overscan:25,data:S,components:{Scroller:b},itemContent:(e,t)=>s.createElement(p,{videoConfData:t,reload:v})}))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/VideoConference/VideoConfList/32d6ee99cbf1f447f426eb0470d91621deebad0c.map