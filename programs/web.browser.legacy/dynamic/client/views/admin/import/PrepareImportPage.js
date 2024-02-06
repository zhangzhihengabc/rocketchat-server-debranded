function module(e,t,n){n.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},2),n.link("@rocket.chat/fuselage",{Badge:function(e){u=e},Box:function(e){o=e},Button:function(e){c=e},ButtonGroup:function(e){s=e},Margins:function(e){l=e},ProgressBar:function(e){m=e},Throbber:function(e){p=e},Tabs:function(e){f=e}},0),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){d=e},useSafely:function(e){g=e}},1),n.link("@rocket.chat/ui-contexts",{useEndpoint:function(e){k=e},useTranslation:function(e){b=e},useStream:function(e){_=e},useRouter:function(e){E=e}},2),n.link("react",{default:function(e){v=e},useEffect:function(e){h=e},useState:function(e){x=e},useMemo:function(e){I=e}},3),n.link("../../../../app/importer/lib/ImporterProgressStep",{ProgressStep:function(e){S=e},ImportWaitingStates:function(e){C=e},ImportFileReadyStates:function(e){P=e},ImportPreparingStartedStates:function(e){T=e},ImportingStartedStates:function(e){w=e},ImportingErrorStates:function(e){y=e}},4),n.link("../../../../lib/utils/stringUtils",{numberFormat:function(e){F=e}},5),n.link("../../../components/Page",{default:function(e){D=e}},6),n.link("./PrepareChannels",{default:function(e){B=e}},7),n.link("./PrepareUsers",{default:function(e){U=e}},8),n.link("./useErrorHandler",{useErrorHandler:function(e){O=e}},9);var r,a,i,u,o,c,s,l,m,p,f,d,g,k,b,_,E,v,h,x,I,S,C,P,T,w,y,F,D,B,U,O,L=function(e,t){return new Promise(function(n,r){var a=function(){e().then(function(e){if(t(e)){n(e);return}setTimeout(a,1e3)},r)};a()})};n.exportDefault(function(){var e=b(),t=O(),n=i(g(x(!0)),2),j=n[0],G=n[1],H=i(g(x(null)),2),M=H[0],R=H[1],W=i(g(x(null)),2),N=W[0],A=W[1],V=i(g(x(0)),2),q=V[0],z=V[1],J=i(x([]),2),K=J[0],Q=J[1],X=i(x([]),2),Y=X[0],Z=X[1],$=i(g(x(!1)),2),ee=$[0],et=$[1],en=I(function(){return K.filter(function(e){return e.do_import}).length},[K]),er=I(function(){return Y.filter(function(e){return e.do_import}).length},[Y]),ea=E(),ei=k("GET","/v1/getImportFileData"),eu=k("GET","/v1/getCurrentImportOperation"),eo=k("POST","/v1/startImport"),ec=_("importers");h(function(){return ec("progress",function(e){R(e.rate)})},[ec,R]),h(function(){var n,i=function(){var n;return r.async(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,r.awrap(L(ei,function(e){return e&&!e.waiting}));case 3:if(n=i.sent){i.next=8;break}return t(e("Importer_not_setup")),ea.navigate("/admin/import"),i.abrupt("return");case 8:if(!n.step){i.next=12;break}return t(e("Failed_To_Load_Import_Data")),ea.navigate("/admin/import"),i.abrupt("return");case 12:z(n.message_count),Q(n.users.map(function(e){return a(a({},e),{},{do_import:!0})})),Z(n.channels.map(function(e){return a(a({},e),{},{do_import:!0})})),G(!1),R(null),i.next=23;break;case 19:i.prev=19,i.t0=i.catch(0),t(i.t0,e("Failed_To_Load_Import_Data")),ea.navigate("/admin/import");case 23:case"end":return i.stop()}},null,null,[[0,19]],Promise)};r.async(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,r.awrap(L(eu,function(e){var t=e.operation;return t.valid&&!C.includes(t.status)}));case 3:if((n=a.sent.operation).valid){a.next=8;break}return ea.navigate("/admin/import/new"),a.abrupt("return");case 8:if(!w.includes(n.status)){a.next=11;break}return ea.navigate("/admin/import/progress"),a.abrupt("return");case 11:if(!(n.status===S.USER_SELECTION||T.includes(n.status)||P.includes(n.status))){a.next=15;break}return A(n.status),i(),a.abrupt("return");case 15:if(!y.includes(n.status)){a.next=19;break}return t(e("Import_Operation_Failed")),ea.navigate("/admin/import"),a.abrupt("return");case 19:if(n.status!==S.DONE){a.next=22;break}return ea.navigate("/admin/import"),a.abrupt("return");case 22:t(e("Unknown_Import_State")),ea.navigate("/admin/import"),a.next=30;break;case 26:a.prev=26,a.t0=a.catch(0),t(e("Failed_To_Load_Import_Data")),ea.navigate("/admin/import");case 30:case"end":return a.stop()}},null,null,[[0,26]],Promise)},[eu,ei,t,ea,z,G,R,A,e]);var es=i(x("users"),2),el=es[0],em=es[1],ep=I(function(){return function(e){return function(){return em(e)}}},[]),ef=d(N,100),ed=!!(!en&&!er&&!q||!en&&!er&&0!==q);return v.createElement(D,null,v.createElement(D.Header,{title:e("Importing_Data")},v.createElement(s,null,v.createElement(c,{icon:"back",secondary:!0,onClick:function(){ea.navigate("/admin/import")}},e("Back_to_imports")),v.createElement(c,{primary:!0,disabled:ee||ed,onClick:function(){return r.async(function(n){for(;;)switch(n.prev=n.next){case 0:return et(!0),n.prev=1,n.next=4,r.awrap(eo({input:{users:K,channels:Y}}));case 4:ea.navigate("/admin/import/progress"),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(1),t(n.t0,e("Failed_To_Start_Import")),ea.navigate("/admin/import");case 11:case"end":return n.stop()}},null,null,[[1,7]],Promise)}},e("Importer_Prepare_Start_Import")))),v.createElement(D.ScrollableContentWithShadow,null,v.createElement(o,{marginInline:"auto",marginBlock:"x24",width:"full",maxWidth:"590px"},v.createElement(o,{is:"h2",fontScale:"p2m"},ef&&e(ef.replace("importer_","importer_status_"))),!j&&v.createElement(f,{flexShrink:0},v.createElement(f.Item,{selected:"users"===el,onClick:ep("users")},e("Users")," ",v.createElement(u,null,en)),v.createElement(f.Item,{selected:"channels"===el,onClick:ep("channels")},e("Channels")," ",v.createElement(u,null,er)),v.createElement(f.Item,{disabled:!0},e("Messages"),v.createElement(u,null,q))),v.createElement(l,{block:"x24"},j&&v.createElement(v.Fragment,null,M?v.createElement(o,{display:"flex",justifyContent:"center",fontScale:"p2"},v.createElement(m,{percentage:M.toFixed(0)}),v.createElement(o,{is:"span",mis:"x24"},F(M,0),"%")):v.createElement(p,{justifyContent:"center"})),!j&&"users"===el&&v.createElement(U,{usersCount:en,users:K,setUsers:Q}),!j&&"channels"===el&&v.createElement(B,{channels:Y,channelsCount:er,setChannels:Z})))))})}
//# sourceMappingURL=/dynamic/client/views/admin/import/80f3d40e486ceb48f3b10c439b47564e69b254fa.map