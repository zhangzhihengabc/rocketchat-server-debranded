function module(e,t,n){let a,l,c,o;n.link("@rocket.chat/fuselage",{Box(e){a=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(e){l=e}},1),n.link("react",{default(e){c=e}},2),n.link("../../../../../client/hooks/useFormatDate",{useFormatDate(e){o=e}},3),n.exportDefault(e=>{let{users:t,room:n,startDate:r,endDate:i}=e,u=o(),s=l();return c.createElement(a,{display:"flex",flexDirection:"column",alignItems:"stretch",withTruncatedText:!0},c.createElement(a,{withTruncatedText:!0},null!=t&&t.length?t.map(e=>"@".concat(e)).join(" : "):"#".concat(n)),c.createElement(a,{withTruncatedText:!0},u(r)," ",s("Date_to")," ",u(i)," "))})}
//# sourceMappingURL=/dynamic/ee/client/views/audit/components/b7d1a46687218d34a16cb752697ed1ba13d618c0.map