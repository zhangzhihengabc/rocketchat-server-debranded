function module(e,t,l){let a,n,r,s,c,u,o,m,i,E,d,b,v,U,_,k,S,g;l.link("@rocket.chat/fuselage",{ButtonGroup(e){a=e},Button(e){n=e}},0),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){r=e}},1),l.link("@rocket.chat/ui-client",{TextSeparator(e){s=e},Card(e){c=e},CardBody(e){u=e},CardCol(e){o=e},CardColSection(e){m=e},CardColTitle(e){i=e},CardFooter(e){E=e},CardIcon(e){d=e}},2),l.link("@rocket.chat/ui-contexts",{useRouter(e){b=e},useTranslation(e){v=e}},3),l.link("react",{default(e){U=e},memo(e){_=e}},4),l.link("../../../../../ee/client/hooks/useHasLicenseModule",{useHasLicenseModule(e){k=e}},5),l.link("../../../../components/UserStatus",{UserStatus(e){S=e}},6),l.link("../../../../hooks/useFormatMemorySize",{useFormatMemorySize(e){g=e}},7),l.exportDefault(_(e=>{let{statistics:t}=e,l=v(),_=g(),p=b(),C=r(()=>{p.navigate("/admin/engagement")}),f=k("engagement-dashboard");return U.createElement(c,null,U.createElement(u,null,U.createElement(o,null,U.createElement(m,{mbs:0,mbe:16},U.createElement(i,null,l("Users")),U.createElement(s,{label:U.createElement(U.Fragment,null,U.createElement(d,null,U.createElement(S,{status:"online"})),l("Online")),value:t.onlineUsers}),U.createElement(s,{label:U.createElement(U.Fragment,null,U.createElement(d,null,U.createElement(S,{status:"busy"})),l("Busy")),value:t.busyUsers}),U.createElement(s,{label:U.createElement(U.Fragment,null,U.createElement(d,null,U.createElement(S,{status:"away"})),l("Away")),value:t.awayUsers}),U.createElement(s,{label:U.createElement(U.Fragment,null,U.createElement(d,null,U.createElement(S,{status:"offline"})),l("Offline")),value:t.offlineUsers}),U.createElement(s,{label:l("Total"),value:t.totalUsers})),U.createElement(m,{mb:16},U.createElement(i,null,l("Types")),U.createElement(s,{label:l("Users_Connected"),value:t.totalConnectedUsers}),U.createElement(s,{label:l("Stats_Active_Users"),value:t.activeUsers}),U.createElement(s,{label:l("Stats_Active_Guests"),value:t.activeGuests}),U.createElement(s,{label:l("Stats_Non_Active_Users"),value:t.nonActiveUsers}),U.createElement(s,{label:l("Stats_App_Users"),value:t.appUsers})),U.createElement(m,{mb:16},U.createElement(i,null,l("Uploads")),U.createElement(s,{label:l("Stats_Total_Uploads"),value:t.uploadsTotal}),U.createElement(s,{label:l("Stats_Total_Uploads_Size"),value:_(t.uploadsTotalSize)})))),U.createElement(E,null,U.createElement(a,{align:"end"},U.createElement(n,{disabled:!f,small:!0,onClick:C},l("See_on_Engagement_Dashboard")))))}))}
//# sourceMappingURL=/dynamic/client/views/admin/workspace/UsersUploadsCard/c1793cefd6e201886ddff5df4e4b07cfd1bfa419.map