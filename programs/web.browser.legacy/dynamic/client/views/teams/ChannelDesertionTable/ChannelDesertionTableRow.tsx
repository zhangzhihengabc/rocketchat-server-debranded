function module(e,n,t){var a,c,i,o,l,r,u,s;t.link("@rocket.chat/fuselage",{CheckBox:function(e){a=e},Icon:function(e){c=e},Margins:function(e){i=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){o=e}},1),t.link("react",{default:function(e){l=e}},2),t.link("../../../components/GenericTable",{GenericTableRow:function(e){r=e},GenericTableCell:function(e){u=e}},3),t.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime:function(e){s=e}},4),t.exportDefault(function(e){var n=e.room,t=e.onChange,m=e.selected,f=e.lastOwnerWarning,h=n.name,d=n.fname,k=n.ts,g=n.isLastOwner,T=s(),x=o(function(){return t(n)});return l.createElement(r,{action:!0},l.createElement(u,{maxWidth:"x300",withTruncatedText:!0},l.createElement(a,{checked:m,onChange:x,disabled:n.isLastOwner}),l.createElement(i,{inline:8},l.createElement(c,{name:"p"===n.t?"hashtag-lock":"hashtag"}),null!=d?d:h,g&&l.createElement(c,{size:"x16",name:"info-circled",color:"status-font-on-danger",title:f}))),l.createElement(u,{align:"end",withTruncatedText:!0},T(k)))})}
//# sourceMappingURL=/dynamic/client/views/teams/ChannelDesertionTable/4981306fa4ece59580ec85350b2886fff76a89b4.map