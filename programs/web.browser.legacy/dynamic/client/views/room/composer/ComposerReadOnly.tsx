function module(n,t,o){var e,i,u,r,c,a,l,s,f,k;o.link("@rocket.chat/fuselage",{Button:function(n){e=n}},0),o.link("@rocket.chat/ui-composer",{MessageFooterCallout:function(n){i=n},MessageFooterCalloutContent:function(n){u=n}},1),o.link("@rocket.chat/ui-contexts",{useEndpoint:function(n){r=n},useTranslation:function(n){c=n}},2),o.link("@tanstack/react-query",{useMutation:function(n){a=n}},3),o.link("react",{default:function(n){l=n}},4),o.link("../../../lib/toast",{dispatchToastMessage:function(n){s=n}},5),o.link("../contexts/RoomContext",{useRoom:function(n){f=n},useUserIsSubscribed:function(n){k=n}},6),o.exportDefault(function(){var n=c(),t=f(),o=k(),m=r("POST","/v1/channels.join"),d=a(function(){return m({roomId:t._id})},{onError:function(n){s({type:"error",message:n})}});return l.createElement(i,null,l.createElement(u,null,n("room_is_read_only")),!o&&l.createElement(e,{primary:!0,onClick:function(){return d.mutate()},loading:d.isLoading},n("Join")))})}
//# sourceMappingURL=/dynamic/client/views/room/composer/9819bd7ea2beefd372a09963edc288e1ae516b64.map