function module(e,t,n){n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){a=e}},0),n.export({useAppsItems:function(){return d}}),n.link("@rocket.chat/fuselage",{Badge:function(e){o=e},Skeleton:function(e){c=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){i=e},useRoute:function(e){s=e},usePermission:function(e){u=e}},1),n.link("react",{default:function(e){r=e}},2),n.link("../../../../hooks/useAppActionButtons",{useUserDropdownAppsActionButtons:function(e){l=e}},3),n.link("../../../../views/marketplace/hooks/useAppRequestStats",{useAppRequestStats:function(e){p=e}},4);var a,o,c,i,s,u,r,l,p,d=function(){var e=i(),t=l(),n=u("manage-apps"),d=u("access-marketplace")||n,k=s("marketplace"),f="list",m=p(),h=[{id:"marketplace",icon:"store",content:e("Marketplace"),onClick:function(){return k.push({context:"explore",page:f})}},{id:"installed",icon:"circle-arrow-down",content:e("Installed"),onClick:function(){return k.push({context:"installed",page:f})}}],g={id:"requested-apps",icon:"cube",content:e("Requested"),onClick:function(){k.push({context:"requested",page:f})},addon:r.createElement(r.Fragment,null,m.isLoading&&r.createElement(c,{variant:"circle",height:16,width:16}),m.isSuccess&&m.data.totalUnseen>0&&r.createElement(o,{variant:"primary"},m.data.totalUnseen))};return[].concat(a(d?h:[]),a(n?[g]:[]),a(t.isSuccess?t.data:[]))}}
//# sourceMappingURL=/dynamic/client/sidebar/header/actions/hooks/87aefda487880fd4b3cc9919ae27f99af14c745c.map