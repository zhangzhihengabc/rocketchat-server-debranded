function module(e,t,n){var i,l,a,c,r,o,s,u,f,m;n.link("@rocket.chat/fuselage",{Box:function(e){i=e},Flex:function(e){l=e}},0),n.link("@rocket.chat/fuselage-hooks",{useBreakpoints:function(e){a=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){c=e}},2),n.link("react",{default:function(e){r=e}},3),n.link("../EngagementDashboardCard",{default:function(e){o=e}},4),n.link("./ActiveUsersSection",{default:function(e){s=e}},5),n.link("./BusiestChatTimesSection",{default:function(e){u=e}},6),n.link("./NewUsersSection",{default:function(e){f=e}},7),n.link("./UsersByTimeOfTheDaySection",{default:function(e){m=e}},8),n.exportDefault(function(e){var t=e.timezone,n=c(),k=a().includes("xxl");return r.createElement(r.Fragment,null,r.createElement(o,{title:n("New_users")},r.createElement(f,{timezone:t})),r.createElement(o,{title:n("Active_users")},r.createElement(s,{timezone:t})),r.createElement(i,{display:"flex",flexWrap:"wrap",style:{columnGap:"16px"}},r.createElement(l.Item,{grow:1,shrink:0,basis:k?"0":"100%"},r.createElement(o,{title:n("Users_by_time_of_day")},r.createElement(m,{timezone:t}))),r.createElement(i,{flexGrow:1,flexShrink:0,flexBasis:k?"0":"100%"},r.createElement(o,{title:n("When_is_the_chat_busier?")},r.createElement(u,{timezone:t})))))})}
//# sourceMappingURL=/dynamic/ee/client/views/admin/engagementDashboard/users/c05ed69a2baff3a7615e3441f7172da838b5e7b5.map