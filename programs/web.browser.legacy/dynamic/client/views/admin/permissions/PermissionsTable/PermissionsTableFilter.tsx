function module(e,n,t){var a,u,o,c,l,i,r,f;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},0),t.link("@rocket.chat/fuselage",{TextInput:function(e){u=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){o=e},useDebouncedValue:function(e){c=e}},1),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){l=e}},2),t.link("react",{default:function(e){i=e},useState:function(e){r=e},useEffect:function(e){f=e}},3),t.exportDefault(function(e){var n=e.onChange,t=l(),s=a(r(""),2),k=s[0],h=s[1],b=c(k,500);f(function(){n(b)},[b,n]);var d=o(function(e){h(e.currentTarget.value)});return i.createElement(u,{"data-qa":"PermissionTable-PermissionsTableFilter",value:k,onChange:d,placeholder:t("Search"),flexGrow:0})})}
//# sourceMappingURL=/dynamic/client/views/admin/permissions/PermissionsTable/e64318b3c31ffd4973e7022a83673afce62473dd.map