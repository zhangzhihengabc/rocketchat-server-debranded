function module(e,t,n){var l,o,r,a,c,u=["onCancel","onMoveChat"];n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){o=e},Modal:function(e){r=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){a=e}},1),n.link("react",{default:function(e){c=e}},2),n.exportDefault(function(e){var t=e.onCancel,n=e.onMoveChat,i=l(e,u),m=a();return c.createElement(r,i,c.createElement(r.Header,null,c.createElement(r.Icon,{name:"burger-arrow-left"}),c.createElement(r.Title,null,m("Return_to_the_queue")),c.createElement(r.Close,{onClick:t})),c.createElement(r.Content,{fontScale:"p2"},m("Would_you_like_to_return_the_queue")),c.createElement(r.Footer,null,c.createElement(r.FooterControllers,null,c.createElement(o,{onClick:t},m("Cancel")),c.createElement(o,{primary:!0,onClick:n},m("Confirm")))))})}
//# sourceMappingURL=/dynamic/client/components/Omnichannel/modals/a57b9957f1729803dd0de5f31928a874dc2026ea.map