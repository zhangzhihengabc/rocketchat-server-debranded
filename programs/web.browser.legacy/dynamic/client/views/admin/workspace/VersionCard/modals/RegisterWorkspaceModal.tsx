function module(e,t,n){var l,o,r,i,a,c,u,s,f,m,k,E,p=["onClose","onStatusChange"];n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){o=e},Button:function(e){r=e},ButtonGroup:function(e){i=e},Modal:function(e){a=e}},0),n.link("@rocket.chat/ui-client",{ExternalLink:function(e){c=e}},1),n.link("@rocket.chat/ui-contexts",{useSetModal:function(e){u=e},useTranslation:function(e){s=e}},2),n.link("react",{default:function(e){f=e}},3),n.link("../hooks/useFeatureBullets",{default:function(e){m=e}},4),n.link("./RegisterWorkspaceSetupModal",{default:function(e){k=e}},5),n.link("./RegisterWorkspaceTokenModal",{default:function(e){E=e}},6),n.exportDefault(function(e){var t=e.onClose,n=e.onStatusChange,d=l(e,p),g=u(),C=m(),h=s();return f.createElement(a,d,f.createElement(a.Header,null,f.createElement(a.HeaderText,null,f.createElement(a.Title,null,h("RegisterWorkspace_NotRegistered_Title"))),f.createElement(a.Close,{onClick:t})),f.createElement(a.Content,null,f.createElement(o,{withRichContent:!0},f.createElement("span",null,h("RegisterWorkspace_NotRegistered_Subtitle")+":"),f.createElement("ul",null,C.map(function(e){return f.createElement("li",{key:e.key},f.createElement("strong",null,e.title),f.createElement(o,{is:"p",mbs:4},e.description))})),f.createElement(o,{is:"p",fontSize:"p2"},h("RegisterWorkspace_Registered_Benefits")))),f.createElement(a.Footer,null,f.createElement(o,{is:"div",display:"flex",justifyContent:"space-between",alignItems:"center",w:"full"},f.createElement(c,{to:"https://go.rocket.chat/i/register-info-collected"},h("Learn_more")),f.createElement(i,{align:"end"},f.createElement(r,{onClick:function(){g(f.createElement(E,{onClose:function(){return g(null)},onStatusChange:n}))}},h("Use_token")),f.createElement(r,{primary:!0,onClick:function(){g(f.createElement(k,{onClose:function(){return g(null)},onStatusChange:n}))}},h("RegisterWorkspace_Button"))))))})}
//# sourceMappingURL=/dynamic/client/views/admin/workspace/VersionCard/modals/8497d517e531354e4893cfe698dce38a0f763b8f.map