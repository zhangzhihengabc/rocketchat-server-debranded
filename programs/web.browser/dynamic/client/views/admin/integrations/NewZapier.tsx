function module(e,t,a){let r,n,l,i,c,s,m,o,d,h;a.link("@babel/runtime/helpers/objectDestructuringEmpty",{default(e){r=e}},0),a.link("@babel/runtime/helpers/extends",{default(e){n=e}},1),a.link("@rocket.chat/fuselage",{Box(e){l=e},Skeleton(e){i=e},Margins(e){c=e},Callout(e){s=e}},0),a.link("@rocket.chat/ui-contexts",{useTranslation(e){m=e}},1),a.link("react",{default(e){o=e},useEffect(e){d=e},useState(e){h=e}},2);let u=e=>new Promise(t=>{let a=document.createElement("script");a.type="text/javascript",document.body.appendChild(a);let r=e=>t(e.currentTarget);a.addEventListener("readystatechange",e=>r(e)),a.addEventListener("load",e=>r(e)),a.src=e});a.exportDefault(e=>{let t=n({},(r(e),e)),a=m(),[p,g]=h();return d(()=>{let e=async()=>{let e=await u("https://zapier.com/apps/embed/widget.js?services=rocketchat&html_id=zapier-goes-here");g(e)};return p||e(),()=>{if(p){var e;null===(e=p.parentNode)||void 0===e||e.removeChild(p)}}},[p]),o.createElement(o.Fragment,null,o.createElement(s,{type:"warning",icon:"warning",title:a("Zapier_integration_has_been_deprecated"),mbs:16,mbe:4},a("Install_Zapier_from_marketplace")),!p&&o.createElement(l,{display:"flex",flexDirection:"column",alignItems:"stretch",mbs:10},o.createElement(c,{blockEnd:14},o.createElement(i,{variant:"rect",height:71}),o.createElement(i,{variant:"rect",height:71}),o.createElement(i,{variant:"rect",height:71}),o.createElement(i,{variant:"rect",height:71}),o.createElement(i,{variant:"rect",height:71}))),o.createElement(l,n({id:"zapier-goes-here"},t)))})}
//# sourceMappingURL=/dynamic/client/views/admin/integrations/9b85ba2947954b1f657fa9879fdc96ba8384abde.map