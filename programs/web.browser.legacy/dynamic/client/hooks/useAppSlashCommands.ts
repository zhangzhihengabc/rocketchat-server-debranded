function module(n,e,a){a.link("@babel/runtime/helpers/slicedToArray",{default:function(n){t=n}},0),a.export({useAppSlashCommands:function(){return m}}),a.link("@rocket.chat/fuselage-hooks",{useDebouncedCallback:function(n){o=n}},0),a.link("@rocket.chat/ui-contexts",{useEndpoint:function(n){u=n},useSingleStream:function(n){s=n},useUserId:function(n){c=n}},1),a.link("@tanstack/react-query",{useQuery:function(n){i=n},useQueryClient:function(n){d=n}},2),a.link("react",{useEffect:function(n){r=n}},3),a.link("../../app/utils/lib/slashCommand",{slashCommands:function(n){l=n}},4);var t,o,u,s,c,i,d,r,l,m=function(){var n=d(),e=s("apps"),a=c(),m=o(function(){n.invalidateQueries(["apps","slashCommands"])},100,[]);r(function(){if(a)return e("apps",function(n){var e=t(n,2),a=e[0],o=t(e[1],1)[0];["command/added","command/updated","command/disabled","command/removed"].includes(a)&&("string"==typeof o&&delete l.commands[o],m())})},[e,a,m]);var f=u("GET","/v1/commands.list");i(["apps","slashCommands"],function(){return f()},{enabled:!!a,onSuccess:function(n){n.commands.forEach(function(n){return l.add(n)})}})}}
//# sourceMappingURL=/dynamic/client/hooks/dc08f843bcbc566d96e2a71f799db1e4322a8377.map