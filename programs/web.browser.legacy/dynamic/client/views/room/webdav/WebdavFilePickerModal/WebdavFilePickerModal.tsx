function module(e,n,t){var r,a,i,l,o,u,c,s,f,d,p,m,v,b,k,h,y,g,x,E,w,C,F,B;t.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.link("@rocket.chat/fuselage",{Modal:function(e){i=e},Box:function(e){l=e},IconButton:function(e){o=e},Select:function(e){u=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e},useDebouncedValue:function(e){s=e}},1),t.link("@rocket.chat/ui-contexts",{useMethod:function(e){f=e},useToastMessageDispatch:function(e){d=e},useTranslation:function(e){p=e},useSetModal:function(e){m=e}},2),t.link("react",{default:function(e){v=e},useState:function(e){b=e},useEffect:function(e){k=e},useCallback:function(e){h=e}},3),t.link("../../../../../app/utils/client",{fileUploadIsValidContentType:function(e){y=e}},4),t.link("../../../../components/FilterByText",{default:function(e){g=e}},5),t.link("../../../../components/GenericTable/hooks/useSort",{useSort:function(e){x=e}},6),t.link("../../modals/FileUploadModal",{default:function(e){E=e}},7),t.link("./FilePickerBreadcrumbs",{default:function(e){w=e}},8),t.link("./WebdavFilePickerGrid",{default:function(e){C=e}},9),t.link("./WebdavFilePickerTable",{default:function(e){F=e}},10),t.link("./lib/sortWebdavNodes",{sortWebdavNodes:function(e){B=e}},11),t.exportDefault(function(e){var n=e.onUpload,t=e.onClose,T=e.account,N=p(),P=m(),S=f("getWebdavFilePreview"),M=f("getWebdavFileList"),D=f("getFileFromWebdav"),W=d(),_=a(b("list"),2),L=_[0],U=_[1],A=x("name"),G=A.sortBy,I=A.sortDirection,R=A.setSort,j=a(b("/"),2),z=j[0],O=j[1],V=a(b([]),2),q=V[0],H=V[1],J=a(b([]),2),K=J[0],Q=J[1],X=a(b(""),2),Y=X[0],Z=X[1],$=s(Y,500),ee=a(b(!1),2),en=ee[0],et=ee[1],er=c(function(e,n){var t;return r.async(function(r){for(;;)switch(r.prev=r.next){case 0:if(!(!Array.isArray(n)||!n.length)){r.next=2;break}return r.abrupt("return");case 2:return t=n.map(function(t,r){if("file"===t.type)return S(e,t.filename).then(function(e){if(null!=e&&e.data){var t=new Blob([null==e?void 0:e.data],{type:"image/png"}),a=URL.createObjectURL(t);n[r].preview=a}}).catch(function(e){return e})}).filter(Boolean),r.abrupt("return",Promise.all(t).then(function(){return n}).catch(function(e){return e}));case 4:case"end":return r.stop()}},null,null,null,Promise)}),ea=h(function(e){var n=RegExp("\\b"+$,"i");return Q(e.filter(function(e){return e.basename.match(n)}))},[$]),ei=h(function(){var e,n,a;return r.async(function(i){for(;;)switch(i.prev=i.next){case 0:return et(!0),i.prev=1,i.next=4,r.awrap(M(T._id,z));case 4:ea((e=i.sent).data),i.next=12;break;case 8:i.prev=8,i.t0=i.catch(1),W({type:"error",message:i.t0}),t();case 12:return i.prev=12,et(!1),i.next=16,r.awrap(er(T._id,null===(n=e)||void 0===n?void 0:n.data));case 16:return Array.isArray(a=i.sent)&&a.length&&ea(a),i.finish(12);case 19:case"end":return i.stop()}},null,null,[[1,8,12,19]],Promise)},[T._id,z,W,M,t,er,ea]),el=function(e){return"directory"===e.type?O(e.filename):eo(e)},eo=function(e){var a,i,l,o;return r.async(function(u){for(;;)switch(u.prev=u.next){case 0:return et(!0),a=function e(e,a){return r.async(function i(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,r.awrap(null==n?void 0:n(e,a));case 3:i.next=8;break;case 5:return i.prev=5,i.t0=i.catch(0),i.abrupt("return",W({type:"error",message:i.t0}));case 8:return i.prev=8,et(!1),t(),i.finish(8);case 12:case"end":return i.stop()}},null,null,[[0,5,8,12]],Promise)},u.prev=2,u.next=5,r.awrap(D(T._id,e));case 5:i=u.sent.data,l=new Blob([i]),o=new File([l],e.basename,{type:e.mime}),P(v.createElement(E,{fileName:e.basename,onSubmit:function(e,n){return a(o,n)},file:o,onClose:function(){return P(null)},invalidContentType:!!(o.type&&!y(o.type))})),u.next=15;break;case 12:return u.prev=12,u.t0=u.catch(2),u.abrupt("return",W({type:"error",message:u.t0}));case 15:case"end":return u.stop()}},null,null,[[2,12]],Promise)};k(function(){ei()},[ei]),k(function(){H((null==z?void 0:z.split("/").filter(function(e){return e}))||[])},[z]);var eu=function(e,n){return R(e),Q(B(K,e,n))};return v.createElement(i,null,v.createElement(i.Header,null,v.createElement(i.Title,null,N("Upload_From",{name:T.name})),v.createElement(i.Close,{title:N("Close"),onClick:t})),v.createElement(i.Content,null,v.createElement(l,{display:"flex",justifyContent:"space-between"},v.createElement(w,{parentFolders:q,handleBreadcrumb:function(e){for(var n=e.currentTarget.dataset.index,t=z.split("/").filter(function(e){return e}),r="/",a=0;a<=Number(n);a++)r+=t[a]+"/";O(r)},handleBack:function(){var e=z,n="/";e&&"/"!==e&&("/"===e[e.length-1]&&(e=e.slice(0,-1)),n=e.substr(0,e.lastIndexOf("/")+1)),O(n)}}),v.createElement(l,null,"list"===L&&v.createElement(o,{icon:"squares",small:!0,title:N("Grid_view"),onClick:function(){return U("grid")}}),"grid"===L&&v.createElement(o,{icon:"th-list",small:!0,title:N("List_view"),onClick:function(){return U("list")}}))),v.createElement(l,{display:"flex",flexDirection:"column"},v.createElement(g,{onChange:function(e){return Z(e.text)}},"grid"===L&&v.createElement(u,{value:G,onChange:function(e){return eu(e)},options:[["name","Name"],["size","Size"],["dataModified","Data Modified"]]}))),"list"===L&&v.createElement(F,{webdavNodes:K,sortBy:G,sortDirection:I,onSort:eu,onNodeClick:el,isLoading:en}),"grid"===L&&v.createElement(C,{webdavNodes:K,onNodeClick:el,isLoading:en})),v.createElement(i.Footer,null))})}
//# sourceMappingURL=/dynamic/client/views/room/webdav/WebdavFilePickerModal/6804eed1ec7bb09946eb3e7be055a172862f198e.map