function module(t,e,n){var a,o,r,c;n.link("@rocket.chat/fuselage",{Box:function(t){a=t}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(t){o=t}},1),n.link("react",{default:function(t){r=t}},2),n.link("../../../../../client/hooks/useFormatDate",{useFormatDate:function(t){c=t}},3),n.exportDefault(function(t){var e=t.users,n=t.room,u=t.startDate,i=t.endDate,l=c(),s=o();return r.createElement(a,{display:"flex",flexDirection:"column",alignItems:"stretch",withTruncatedText:!0},r.createElement(a,{withTruncatedText:!0},null!=e&&e.length?e.map(function(t){return"@"+t}).join(" : "):"#"+n),r.createElement(a,{withTruncatedText:!0},l(u)," ",s("Date_to")," ",l(i)," "))})}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/5aa1b3e5bb488f19c6a45988d6eed41631ef3db4.map