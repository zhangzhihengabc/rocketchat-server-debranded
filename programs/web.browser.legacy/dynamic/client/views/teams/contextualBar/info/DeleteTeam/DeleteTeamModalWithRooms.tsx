function module(n,e,t){var o,a,r,i,u,l,c,f,s;t.link("@babel/runtime/regenerator",{default:function(n){o=n}},0),t.link("@rocket.chat/fuselage",{Skeleton:function(n){a=n}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(n){r=n},useEndpoint:function(n){i=n}},1),t.link("@tanstack/react-query",{useQuery:function(n){u=n}},2),t.link("react",{default:function(n){l=n},useMemo:function(n){c=n}},3),t.link("../../../../../components/GenericModal",{default:function(n){f=n}},4),t.link("./DeleteTeamModal",{default:function(n){s=n}},5),t.exportDefault(function(n){var e=n.teamId,t=n.onConfirm,m=n.onCancel,d=r(),k=c(function(){return{teamId:e}},[e]),C=i("GET","/v1/teams.listRooms"),p=u(["getTeamsListRooms",k],function(){return o.async(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",C(k));case 1:case"end":return n.stop()}},null,null,null,Promise)}),v=p.data;return p.isLoading?l.createElement(f,{variant:"warning",onClose:m,onConfirm:m,title:l.createElement(a,{width:"50%"}),confirmText:d("Cancel")},l.createElement(a,{width:"full"})):l.createElement(s,{onCancel:m,onConfirm:t,rooms:(null==v?void 0:v.rooms)||[]})})}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/info/DeleteTeam/89a9c6f2ba716c449223a9d17c9ea322d18f2587.map