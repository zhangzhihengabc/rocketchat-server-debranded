function module(n,e,t){t.link("@babel/runtime/helpers/slicedToArray",{default:function(n){o=n}},0),t.link("react",{default:function(n){i=n},useState:function(n){a=n}},0),t.link("./ChannelToTeamConfirmation",{default:function(n){l=n}},1),t.link("./ChannelToTeamSelection",{default:function(n){r=n}},2);var o,i,a,l,r,f={SELECTION:"selection",CONFIRMATION:"confirmation"};t.exportDefault(function(n){var e=n.onCancel,t=n.onConfirm,u=o(a(f.SELECTION),2),c=u[0],C=u[1],m=o(a(),2),T=m[0],I=m[1];return c===f.CONFIRMATION&&T?i.createElement(l,{onCancel:e,onConfirm:function(){return t(T)}}):i.createElement(r,{onCancel:e,onConfirm:function(){return C(f.CONFIRMATION)},onChange:function(n){"string"==typeof n&&I(n)},teamId:T})})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Info/ChannelToTeamModal/0119f00d20673a0088840ef6142edbd459ddb9b5.map