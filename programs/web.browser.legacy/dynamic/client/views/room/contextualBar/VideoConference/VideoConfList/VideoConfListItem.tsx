function module(e,t,n){var a,l,o,r,c,i,s,u,m,f,d,k,E,g,_,b,h,C,p=["videoConfData","className","reload"];n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/taggedTemplateLiteralLoose",{default:function(e){o=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},2),n.link("@rocket.chat/css-in-js",{css:function(e){c=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){i=e},Message:function(e){s=e},Box:function(e){u=e},Avatar:function(e){m=e},Palette:function(e){f=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){d=e}},2),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){k=e},useSetting:function(e){E=e}},3),n.link("react",{default:function(e){g=e}},4),n.link("../../../../../components/avatar/UserAvatar",{default:function(e){_=e}},5),n.link("../../../../../contexts/VideoConfContext",{useVideoConfJoinCall:function(e){b=e}},6),n.link("../../../../../hooks/useTimeAgo",{useTimeAgo:function(e){h=e}},7),n.link("../../../../../lib/constants",{VIDEOCONF_STACK_MAX_USERS:function(e){C=e}},8),n.exportDefault(function(e){var t=e.videoConfData,n=e.className,x=void 0===n?[]:n,v=e.reload,B=r(e,p),A=k(),y=h(),S=b(),N=!!E("UI_Use_Real_Name"),T=t._id,j=t.createdBy,D=j.name,I=j.username,U=j._id,L=t.users,M=t.createdAt,V=t.endedAt,z=L.filter(function(e){return e._id!==U}),J=c(a||(a=o(["\n		&:hover,\n		&:focus {\n			background: ",";\n			.rcx-message {\n				background: ",";\n			}\n		}\n	"])),f.surface["surface-tint"],f.surface["surface-tint"]),O=d(function(){return S(T),v()});return g.createElement(u,{color:"default",borderBlockEndWidth:2,borderBlockEndColor:"stroke-extra-light",borderBlockEndStyle:"solid",className:[].concat(l(x),[J]).filter(Boolean),pb:8},g.createElement(s,B,g.createElement(s.LeftContainer,null,I&&g.createElement(_,{username:I,className:"rcx-message__avatar",size:"x36"})),g.createElement(s.Container,null,g.createElement(s.Header,null,g.createElement(s.Name,{title:I},N?D:I),g.createElement(s.Timestamp,null,y(M))),g.createElement(s.Body,{clamp:2}),g.createElement(u,{display:"flex"}),g.createElement(s.Block,{flexDirection:"row",alignItems:"center"},g.createElement(i,{disabled:!!V,small:!0,alignItems:"center",display:"flex",onClick:O},A(V?"Call_ended":"Join_call")),z.length>0&&g.createElement(u,{mis:8,fontScale:"c1",display:"flex",alignItems:"center"},g.createElement(m.Stack,null,z.map(function(e,t){return e.username&&t+1<=C&&g.createElement(_,{"data-tooltip":e.username,key:e.username,username:e.username,etag:e.avatarETag,size:"x28"})})),g.createElement(u,{mis:4},z.length>C?A("__usersCount__member_joined",{usersCount:z.length-C}):A("joined"))),0===z.length&&!V&&g.createElement(u,{mis:8,fontScale:"c1"},A("Be_the_first_to_join"))))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/VideoConference/VideoConfList/2f4dc43d40fbd3d39f6079985e9f189fbecae4fe.map