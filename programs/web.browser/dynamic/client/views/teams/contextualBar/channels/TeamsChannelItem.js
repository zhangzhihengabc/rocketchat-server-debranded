function module(e,t,n){let o,a,l,i,r,c,m,s,u,d,k,E,p,h,f,g,x,O,b,v;n.link("@babel/runtime/helpers/extends",{default(e){o=e}},0),n.link("@rocket.chat/fuselage",{Box(e){a=e},Icon(e){l=e},IconButton(e){i=e},Option(e){r=e},OptionAvatar(e){c=e},OptionColumn(e){m=e},OptionContent(e){s=e},OptionMenu(e){u=e},OptionSkeleton(e){d=e},Tag(e){k=e}},0),n.link("@rocket.chat/fuselage-hooks",{usePrefersReducedMotion(e){E=e}},1),n.link("@rocket.chat/ui-contexts",{usePermission(e){p=e},useTranslation(e){h=e}},2),n.link("react",{default(e){f=e},useState(e){g=e}},3),n.link("../../../../components/avatar/RoomAvatar",{default(e){x=e}},4),n.link("../../../../hooks/usePreventPropagation",{usePreventPropagation(e){O=e}},5),n.link("../../../../lib/rooms/roomCoordinator",{roomCoordinator(e){b=e}},6),n.link("./RoomActions",{default(e){v=e}},7),n.exportDefault(Object.assign(e=>{let{room:t,onClickView:n,reload:d}=e,C=h(),P=t._id,A=t.t,[R,T]=g(),_=p("remove-team-channel",P),z=p("edit-team-channel",P),I=p("c"===A?"delete-c":"delete-p",P),M=E(),S=O();return f.createElement(r,o({id:t._id,"data-rid":t._id},{[M?"onMouseEnter":"onTransitionEnd"]:T},{onClick:n}),f.createElement(c,null,f.createElement(x,{room:t,size:"x28"})),f.createElement(m,null,"c"===t.t?f.createElement(l,{name:"hash",size:"x15"}):f.createElement(l,{name:"hashtag-lock",size:"x15"})),f.createElement(s,null,f.createElement(a,{display:"inline-flex",alignItems:"center"},b.getRoomName(t.t,t)," ",t.teamDefault?f.createElement(a,{mi:4},f.createElement(k,null,C("Team_Auto-join"))):"")),(_||z||I)&&f.createElement(u,{onClick:S},R?f.createElement(v,{room:t,reload:d}):f.createElement(i,{tiny:!0,icon:"kebab"})))},{Skeleton:d}))}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/channels/15e2149984f83520558f4690ba6dffd53f028d6b.map