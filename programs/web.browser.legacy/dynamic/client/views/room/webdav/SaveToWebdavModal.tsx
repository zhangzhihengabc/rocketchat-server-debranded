function module(e,n,t){var r,o,u,l,a,c,i,s,f,d,m,p,v,b,E,h,k,g,F,_,y,x,S,w,C,T,M,W=["_id"];t.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},3),t.link("@rocket.chat/fuselage",{Modal:function(e){a=e},Box:function(e){c=e},Button:function(e){i=e},FieldGroup:function(e){s=e},Field:function(e){f=e},FieldLabel:function(e){d=e},FieldRow:function(e){m=e},FieldError:function(e){p=e},Select:function(e){v=e},Throbber:function(e){b=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){E=e}},1),t.link("@rocket.chat/ui-contexts",{useMethod:function(e){h=e},useToastMessageDispatch:function(e){k=e},useTranslation:function(e){g=e}},2),t.link("react",{default:function(e){F=e},useState:function(e){_=e},useMemo:function(e){y=e},useEffect:function(e){x=e},useRef:function(e){S=e}},3),t.link("react-hook-form",{useForm:function(e){w=e},Controller:function(e){C=e}},4),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){T=e}},5),t.link("../../../lib/getWebdavServerName",{getWebdavServerName:function(e){M=e}},6),t.exportDefault(function(e){var n=e.onClose,t=e.data,q=g(),I=l(_(!1),2),D=I[0],A=I[1],H=k(),R=h("uploadFileToWebdav"),j=S(null),B=E(),G=w(),L=G.control,N=G.handleSubmit,P=G.formState.errors,U=T("/v1/webdav.getMyAccounts").value,X=y(function(){return null!=U&&U.accounts?U.accounts.map(function(e){return[e._id,M(u(e,W))]}):[]},[null==U?void 0:U.accounts]);x(function(){var e;return null===(e=j.current)||void 0===e?void 0:e.abort},[]);var z=function(e){var o=e.accountId;A(!0);var u=t.url,l=t.attachment.title;j.current=new XMLHttpRequest,j.current.open("GET",u,!0),j.current.responseType="arraybuffer",j.current.onload=function(){var e,t,u,a;return r.async(function(c){for(;;)switch(c.prev=c.next){case 0:if(!(t=null===(e=j.current)||void 0===e?void 0:e.response)){c.next=21;break}if(u=new Uint8Array(t),c.prev=3,l){c.next=6;break}throw Error("File name is required");case 6:return c.next=8,r.awrap(R(o,u,l));case 8:if((a=c.sent).success){c.next=11;break}throw Error(a.message?q(a.message):"Error uploading file");case 11:return c.abrupt("return",H({type:"success",message:q("File_uploaded")}));case 14:return c.prev=14,c.t0=c.catch(3),c.abrupt("return",H({type:"error",message:c.t0}));case 17:return c.prev=17,A(!1),n(),c.finish(17);case 21:case"end":return c.stop()}},null,null,[[3,14,17,21]],Promise)},j.current.send(null)};return F.createElement(a,{wrapperFunction:function(e){return F.createElement(c,o({is:"form",onSubmit:N(z)},e))}},F.createElement(a.Header,null,F.createElement(a.Title,null,q("Save_To_Webdav")),F.createElement(a.Close,{title:q("Close"),onClick:n})),F.createElement(a.Content,null,D&&F.createElement(c,{alignItems:"center",display:"flex",justifyContent:"center",minHeight:"x32"},F.createElement(b,null)),!D&&F.createElement(s,null,F.createElement(f,null,F.createElement(d,null,q("Select_a_webdav_server")),F.createElement(m,null,F.createElement(C,{name:"accountId",control:L,rules:{required:!0},render:function(e){var n=e.field;return F.createElement(v,o({},n,{options:X,id:B,placeholder:q("Select_an_option")}))}})),P.accountId&&F.createElement(p,null,q("Field_required"))))),F.createElement(a.Footer,null,F.createElement(a.FooterControllers,null,F.createElement(i,{onClick:n},q("Cancel")),F.createElement(i,{primary:!0,type:"submit",loading:D},q("Save_To_Webdav")))))})}
//# sourceMappingURL=/dynamic/client/views/room/webdav/063f9e2dd8cbba10b8718c56ea9e5ec7d00a86cb.map