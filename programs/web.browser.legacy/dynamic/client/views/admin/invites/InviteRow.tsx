function module(e,n,t){var l,o,i,r,c,u,a,m,s,f,d;t.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){o=e},IconButton:function(e){i=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){r=e}},1),t.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){c=e},useTranslation:function(e){u=e}},2),t.link("react",{default:function(e){a=e}},3),t.link("../../../components/GenericTable",{GenericTableCell:function(e){m=e},GenericTableRow:function(e){s=e}},4),t.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime:function(e){f=e}},5),t.link("../../../hooks/useTimeFromNow",{useTimeFromNow:function(e){d=e}},6),t.exportDefault(function(e){var n,t,k,E=e._id,p=e.createdAt,T=e.expires,h=e.uses,g=e.maxUses,v=e.onRemove,w=u(),x=f(),D=c("DELETE","/v1/removeInvite/:_id",{_id:E}),b=d(!1),F=r("(min-width: 768px)");return a.createElement(s,null,a.createElement(m,null,a.createElement(o,{color:"hint",fontScale:"p2"},E)),F&&a.createElement(a.Fragment,null,a.createElement(m,null,x(new Date(p))),a.createElement(m,null,(n=T?new Date(T):null)?n&&n.getTime()<new Date().getTime()?w("Expired"):b(n):w("Never")),a.createElement(m,null,h),a.createElement(m,null,g>0?h>=g?0:g-h:w("Unlimited"))),a.createElement(m,null,a.createElement(i,{icon:"cross",danger:!0,small:!0,onClick:function(e){return l.async(function(n){for(;;)switch(n.prev=n.next){case 0:e.stopPropagation(),v(function(){return D()});case 2:case"end":return n.stop()}},null,null,null,Promise)}})))})}
//# sourceMappingURL=/dynamic/client/views/admin/invites/dbda4ec9af5dca2484dd5c4f45a58ddd1f63fea0.map