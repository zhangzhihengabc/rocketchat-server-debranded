function module(e,n,t){var o,l,u,a,r,c,i,f,m,d,s,k,g,h;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Accordion:function(e){l=e},Field:function(e){u=e},FieldGroup:function(e){a=e},FieldLabel:function(e){r=e},FieldRow:function(e){c=e},Select:function(e){i=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){f=e}},1),t.link("@rocket.chat/ui-contexts",{useLanguages:function(e){m=e},useTranslation:function(e){d=e}},2),t.link("react",{default:function(e){s=e},useMemo:function(e){k=e}},3),t.link("react-hook-form",{useFormContext:function(e){g=e},Controller:function(e){h=e}},4),t.exportDefault(function(){var e=d(),n=m(),t=g().control,E=k(function(){var e=n.map(function(e){return[e.key,e.name]});return e.sort(function(e,n){var t=o(e,1)[0],l=o(n,1)[0];return t.localeCompare(l)}),e},[n]),p=f();return s.createElement(l.Item,{title:e("Localization"),defaultExpanded:!0},s.createElement(a,null,s.createElement(u,null,s.createElement(r,{htmlFor:p},e("Language")),s.createElement(c,null,s.createElement(h,{control:t,name:"language",render:function(e){var n=e.field,t=n.value,o=n.onChange;return s.createElement(i,{id:p,value:t,onChange:o,options:E})}})))))})}
//# sourceMappingURL=/dynamic/client/views/account/preferences/429d7979023f334456eb23356be33ab2fa2802cb.map