function module(e,t,n){var a,l,r,c,i,o,u,m,s,f;n.link("@rocket.chat/fuselage",{Box:function(e){a=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){l=e}},1),n.link("react",{default:function(e){r=e},memo:function(e){c=e},useMemo:function(e){i=e}},2),n.link("../../../../../client/components/GenericTable",{GenericTableRow:function(e){o=e},GenericTableCell:function(e){u=e}},3),n.link("../../../../../client/components/avatar/UserAvatar",{default:function(e){m=e}},4),n.link("../../../../../client/hooks/useFormatDateAndTime",{useFormatDateAndTime:function(e){s=e}},5),n.link("./AuditFiltersDisplay",{default:function(e){f=e}},6),n.exportDefault(c(function(e){var t=e.value,n=t.u,c=t.results,d=t.ts,T=t._id,x=t.fields,h=s(),E=n.username,k=n.name,p=n.avatarETag,w=x.msg,D=x.users,g=x.room,v=x.startDate,y=x.endDate,S=i(function(){return h(d)},[h,d]),b=l("(min-width: 1024px)");return r.createElement(o,{key:T,tabIndex:0,role:"link"},r.createElement(u,{withTruncatedText:!0},r.createElement(a,{display:"flex",alignItems:"center"},E&&r.createElement(m,{size:b?"x28":"x40",title:E,username:E,etag:p}),r.createElement(a,{display:"flex",withTruncatedText:!0,marginInline:8},r.createElement(a,{display:"flex",flexDirection:"column",alignSelf:"center",withTruncatedText:!0},r.createElement(a,{fontScale:"p2m",withTruncatedText:!0,color:"default"},k||E),k&&r.createElement(a,{fontScale:"p2",color:"hint",withTruncatedText:!0}," ","@"+E," "))))),r.createElement(u,{fontScale:"p2m",color:"hint",withTruncatedText:!0},w),r.createElement(u,{withTruncatedText:!0},S),r.createElement(u,{withTruncatedText:!0},c),r.createElement(u,{fontScale:"p2",color:"hint",withTruncatedText:!0},r.createElement(f,{users:D,room:g,startDate:v,endDate:y})))}))}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/676111ec7a0da48193b68037b2ade794a42e7bf2.map