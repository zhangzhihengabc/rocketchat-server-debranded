function module(e,t,l){let a,n,r,o,c,u,m,d,i,s,k,E,f,p,_,g,C,h,b;l.link("@rocket.chat/fuselage",{Box(e){a=e},Grid(e){n=e}},0),l.link("@rocket.chat/ui-contexts",{useAtLeastOnePermission(e){r=e},useSetting(e){o=e},useTranslation(e){c=e},useRole(e){u=e},usePermission(e){m=e}},1),l.link("react",{default(e){d=e}},2),l.link("../../components/Page/Page",{default(e){i=e}},3),l.link("../../components/Page/PageScrollableContent",{default(e){s=e}},4),l.link("./HomePageHeader",{default(e){k=e}},5),l.link("./HomepageGridItem",{default(e){E=e}},6),l.link("./cards/AddUsersCard",{default(e){f=e}},7),l.link("./cards/CreateChannelsCard",{default(e){p=e}},8),l.link("./cards/CustomContentCard",{default(e){_=e}},9),l.link("./cards/DesktopAppsCard",{default(e){g=e}},10),l.link("./cards/DocumentationCard",{default(e){C=e}},11),l.link("./cards/JoinRoomsCard",{default(e){h=e}},12),l.link("./cards/MobileAppsCard",{default(e){b=e}},13);let P=["create-c","create-p"];l.exportDefault(()=>{let e=c(),t=m("view-user-administration"),l=u("admin"),S=r(P),x=o("Site_Name"),y=""===o("Layout_Home_Body"),H=!!o("Layout_Home_Custom_Block_Visible");return d.createElement(i,{color:"default","data-qa":"page-home","data-qa-type":"default",background:"tint"},d.createElement(k,null),d.createElement(s,null,d.createElement(a,{is:"h2",fontScale:"h1",mb:20,"data-qa-id":"homepage-welcome-text"},e("Welcome_to_workspace",{Site_Name:x||"Rocket.Chat"})),d.createElement(a,{is:"h3",fontScale:"h3",mb:16},e("Some_ideas_to_get_you_started")),d.createElement(n,{margin:"neg-x8"},t&&d.createElement(E,null,d.createElement(f,null)),S&&d.createElement(E,null,d.createElement(p,null)),d.createElement(E,null,d.createElement(h,null)),d.createElement(E,null,d.createElement(b,null)),d.createElement(E,null,d.createElement(g,null)),d.createElement(E,null,d.createElement(C,null))),(l||H&&!y)&&d.createElement(a,{pbs:16,mbe:32},d.createElement(_,null))))})}
//# sourceMappingURL=/dynamic/client/views/home/53df9241678a82ea70b61026e1a506a91403748f.map