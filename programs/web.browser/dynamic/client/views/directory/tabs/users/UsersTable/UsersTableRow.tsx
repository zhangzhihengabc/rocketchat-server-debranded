function module(e,t,n){let l,a,r,c,o,i,m,u;n.link("@rocket.chat/fuselage",{Box(e){l=e},Flex(e){a=e}},0),n.link("react",{default(e){r=e}},1),n.link("../../../../../components/GenericTable",{GenericTableRow(e){c=e},GenericTableCell(e){o=e}},2),n.link("../../../../../components/MarkdownText",{default(e){i=e}},3),n.link("../../../../../components/avatar/UserAvatar",{default(e){m=e}},4),n.link("../../../../../hooks/useFormatDate",{useFormatDate(e){u=e}},5),n.exportDefault(e=>{let{user:{createdAt:t,emails:n,domain:d,_id:T,username:E,name:s,bio:x,avatarETag:h,nickname:k},onClick:f,mediaQuery:p,federation:w,canViewFullOtherUserInfo:b}=e,v=u();return r.createElement(c,{key:T,onKeyDown:f(E),onClick:f(E),tabIndex:0,role:"link",action:!0},r.createElement(o,null,r.createElement(a.Container,null,r.createElement(l,null,r.createElement(a.Item,null,E&&r.createElement(m,{size:"x40",title:E,username:E,etag:h})),r.createElement(l,{withTruncatedText:!0,mi:8},r.createElement(l,{display:"flex"},r.createElement(l,{fontScale:"p2m",withTruncatedText:!0},s||E,k&&" (".concat(k,")"))," ",r.createElement(l,{mi:4})," ",r.createElement(l,{fontScale:"p2",color:"hint",withTruncatedText:!0},E)),r.createElement(i,{variant:"inline",fontScale:"p2",color:"hint",content:x}))))),p&&b&&r.createElement(o,{withTruncatedText:!0},(null==n?void 0:n.length)&&n[0].address),w&&r.createElement(o,{withTruncatedText:!0},d),p&&r.createElement(o,{fontScale:"p2",color:"hint",withTruncatedText:!0},v(t)))})}
//# sourceMappingURL=/dynamic/client/views/directory/tabs/users/UsersTable/9ae115f78ed1ecf186ac67eb99d6f8599e368ade.map