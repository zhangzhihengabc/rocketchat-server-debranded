function module(e,t,n){let o,l,a,r,c,i,m,u,T,d;n.link("@rocket.chat/fuselage",{Box(e){o=e},Avatar(e){l=e}},0),n.link("react",{default(e){a=e}},1),n.link("../../../../../components/GenericTable",{GenericTableRow(e){r=e},GenericTableCell(e){c=e}},2),n.link("../../../../../components/MarkdownText",{default(e){i=e}},3),n.link("../../../../../components/RoomIcon",{RoomIcon(e){m=e}},4),n.link("../../../../../hooks/useFormatDate",{useFormatDate(e){u=e}},5),n.link("../../../../../lib/rooms/roomCoordinator",{roomCoordinator(e){T=e}},6),n.link("../../../RoomTags",{default(e){d=e}},7),n.exportDefault(e=>{let{onClick:t,room:n,mediaQuery:f}=e,s=u(),{_id:h,ts:k,t:x,name:E,fname:p,usersCount:w,lastMessage:S,topic:b,belongsTo:g}=n,D=T.getRoomDirectives(x).getAvatarPath(n);return a.createElement(r,{key:h,onKeyDown:t(E,x),onClick:t(E,x),tabIndex:0,role:"link",action:!0},a.createElement(c,null,a.createElement(o,{display:"flex"},a.createElement(o,{flexGrow:0},D&&a.createElement(l,{size:"x40",title:p||E,url:D})),a.createElement(o,{flexGrow:1,mi:8,withTruncatedText:!0},a.createElement(o,{display:"flex",alignItems:"center"},a.createElement(m,{room:n}),a.createElement(o,{fontScale:"p2m",mi:4},p||E),a.createElement(d,{room:n})),b&&a.createElement(i,{variant:"inlineWithoutBreaks",fontScale:"p2",color:"hint",withTruncatedText:!0,content:b})))),a.createElement(c,{fontScale:"p2",color:"hint",withTruncatedText:!0},w),f&&k&&a.createElement(c,{fontScale:"p2",color:"hint",withTruncatedText:!0},s(k)),f&&a.createElement(c,{fontScale:"p2",color:"hint",withTruncatedText:!0},S&&s(S.ts)),f&&a.createElement(c,{fontScale:"p2",color:"hint",withTruncatedText:!0},g))})}
//# sourceMappingURL=/dynamic/client/views/directory/tabs/channels/ChannelsTable/322eda5429ee4a6ed83a97af41570fcd2c67a2c8.map