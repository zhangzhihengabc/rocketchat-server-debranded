function module(e,t,r){let a,n,l,o,c,i,u,d,m;r.link("@rocket.chat/fuselage",{Button(e){a=e}},0),r.link("@rocket.chat/ui-client",{Card(e){n=e},CardBody(e){l=e},CardFooter(e){o=e},CardFooterWrapper(e){c=e},CardTitle(e){i=e}},1),r.link("@rocket.chat/ui-contexts",{useTranslation(e){u=e},useRouter(e){d=e}},2),r.link("react",{default(e){m=e}},3),r.exportDefault(()=>{let e=u(),t=d();return m.createElement(n,{"data-qa-id":"homepage-join-rooms-card"},m.createElement(i,null,e("Join_rooms")),m.createElement(l,null,e("Discover_public_channels_and_teams_in_the_workspace_directory")),m.createElement(c,null,m.createElement(o,null,m.createElement(a,{onClick:()=>{t.navigate("/directory")}},e("Open_directory")))))})}
//# sourceMappingURL=/dynamic/client/views/home/cards/e1fab9355217e4c14fca99f6bfb7b78be7c830a7.map