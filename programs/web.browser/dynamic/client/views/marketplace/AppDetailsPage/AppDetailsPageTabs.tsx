function module(e,t,l){let s,a,c,n,r,i;l.link("@babel/runtime/helpers/objectSpread2",{default(e){s=e}},0),l.link("@rocket.chat/fuselage",{Tabs(e){a=e}},0),l.link("@rocket.chat/ui-contexts",{usePermission(e){c=e},useRouter(e){n=e},useTranslation(e){r=e}},1),l.link("react",{default(e){i=e}},2),l.exportDefault(e=>{let{context:t,installed:l,isSecurityVisible:u,settings:m,tab:o}=e,k=r(),d=c("manage-apps"),g=n(),p=e=>{g.navigate({name:"marketplace",params:s(s({},g.getRouteParameters()),{},{tab:e})},{replace:!0})};return i.createElement(a,null,i.createElement(a.Item,{onClick:()=>p("details"),selected:!o||"details"===o},k("Details")),d&&"private"!==t&&i.createElement(a.Item,{onClick:()=>p("requests"),selected:"requests"===o},k("Requests")),u&&i.createElement(a.Item,{onClick:()=>p("security"),selected:"security"===o},k("Security")),"private"!==t&&i.createElement(a.Item,{onClick:()=>p("releases"),selected:"releases"===o},k("Releases")),!!(l&&m&&Object.values(m).length)&&d&&i.createElement(a.Item,{onClick:()=>p("settings"),selected:"settings"===o},k("Settings")),!!l&&d&&d&&i.createElement(a.Item,{onClick:()=>p("logs"),selected:"logs"===o},k("Logs")))})}
//# sourceMappingURL=/dynamic/client/views/marketplace/AppDetailsPage/98b0974b0b10c5f96f08d3af2f3ac09401f7a47c.map