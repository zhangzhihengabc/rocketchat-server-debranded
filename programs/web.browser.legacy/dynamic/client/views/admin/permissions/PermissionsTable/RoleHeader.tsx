function module(e,n,t){var i,c,o,u,a,l;t.link("@rocket.chat/fuselage",{Button:function(e){i=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e}},1),t.link("@rocket.chat/ui-contexts",{useRoute:function(e){o=e}},2),t.link("react",{default:function(e){u=e},memo:function(e){a=e}},3),t.link("../../../../components/GenericTable",{GenericTableHeaderCell:function(e){l=e}},4),t.exportDefault(a(function(e){var n=e._id,t=e.name,a=e.description,r=o("admin-permissions"),f=c(function(){r.push({context:"edit",_id:n})});return u.createElement(l,{pi:4,p:8},u.createElement(i,{icon:"edit",secondary:!0,onClick:f},a||t))}))}
//# sourceMappingURL=/dynamic/client/views/admin/permissions/PermissionsTable/27840f1cd1eed38837b688da82c833586c64594a.map