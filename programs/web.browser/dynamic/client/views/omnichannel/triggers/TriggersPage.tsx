function module(e,t,l){let n,r,a,i,c,u,o,g,d;l.link("@rocket.chat/fuselage",{Button(e){n=e}},0),l.link("@rocket.chat/ui-contexts",{useRouteParameter(e){r=e},useRouter(e){a=e},useTranslation(e){i=e}},1),l.link("react",{default(e){c=e}},2),l.link("../../../components/Page",{default(e){u=e}},3),l.link("./EditTrigger",{default(e){o=e}},4),l.link("./EditTriggerWithData",{default(e){g=e}},5),l.link("./TriggersTable",{default(e){d=e}},6),l.exportDefault(()=>{let e=i(),t=r("id"),l=r("context"),m=a();return c.createElement(u,{flexDirection:"row"},c.createElement(u,null,c.createElement(u.Header,{title:e("Livechat_Triggers")},c.createElement(n,{onClick:()=>m.navigate("/omnichannel/triggers/new")},e("Create_trigger"))),c.createElement(u.Content,null,c.createElement(d,null))),"edit"===l&&t&&c.createElement(g,{triggerId:t}),"new"===l&&c.createElement(o,null))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/triggers/828ff1c0ceea51bdc5cdd9e07dbb1c95ee0526d8.map