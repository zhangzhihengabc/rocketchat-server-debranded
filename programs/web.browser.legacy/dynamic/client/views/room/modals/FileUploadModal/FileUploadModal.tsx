function module(e,t,n){var l,i,r,o,a,u,c,f,m,s,d,p,E,h,y,F,g,k,C;n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},1),n.link("@rocket.chat/fuselage",{Modal:function(e){r=e},Box:function(e){o=e},Field:function(e){a=e},FieldGroup:function(e){u=e},FieldLabel:function(e){c=e},FieldRow:function(e){f=e},FieldError:function(e){m=e},TextInput:function(e){s=e},Button:function(e){d=e}},0),n.link("@rocket.chat/fuselage-hooks",{useAutoFocus:function(e){p=e}},1),n.link("@rocket.chat/ui-contexts",{useToastMessageDispatch:function(e){E=e},useTranslation:function(e){h=e}},2),n.link("react",{default:function(e){y=e},memo:function(e){F=e},useState:function(e){g=e},useEffect:function(e){k=e}},3),n.link("./FilePreview",{default:function(e){C=e}},4),n.exportDefault(F(function(e){var t=e.onClose,n=e.file,F=e.fileName,_=e.fileDescription,b=e.onSubmit,v=e.invalidContentType,x=e.showDescription,T=void 0===x||x,D=i(g(F),2),w=D[0],U=D[1],N=i(g(_||""),2),S=N[0],A=N[1],M=h(),q=E(),B=p(),H=function(e){if(e.preventDefault(),!w)return q({type:"error",message:M("error-the-field-is-required",{field:M("Name")})});b(w,S)};return k(function(){if(v){q({type:"error",message:M("FileUpload_MediaType_NotAccepted__type__",{type:n.type})}),t();return}0===n.size&&(q({type:"error",message:M("FileUpload_File_Empty")}),t())},[n,q,v,M,t]),y.createElement(r,{wrapperFunction:function(e){return y.createElement(o,l({is:"form",onSubmit:H},e))}},y.createElement(o,{display:"flex",flexDirection:"column",height:"100%"},y.createElement(r.Header,null,y.createElement(r.Title,null,M("FileUpload")),y.createElement(r.Close,{onClick:t})),y.createElement(r.Content,null,y.createElement(o,{display:"flex",maxHeight:"x360",w:"full",justifyContent:"center",alignContent:"center",mbe:16},y.createElement(C,{file:n})),y.createElement(u,null,y.createElement(a,null,y.createElement(c,null,M("Upload_file_name")),y.createElement(f,null,y.createElement(s,{value:w,onChange:function(e){U(e.currentTarget.value)}})),!w&&y.createElement(m,null,M("error-the-field-is-required",{field:M("Name")}))),T&&y.createElement(a,null,y.createElement(c,null,M("Upload_file_description")),y.createElement(f,null,y.createElement(s,{value:S,onChange:function(e){A(e.currentTarget.value)},placeholder:M("Description"),ref:B}))))),y.createElement(r.Footer,null,y.createElement(r.FooterControllers,null,y.createElement(d,{secondary:!0,onClick:t},M("Cancel")),y.createElement(d,{primary:!0,type:"submit",disabled:!w},M("Send"))))))}))}
//# sourceMappingURL=/dynamic/client/views/room/modals/FileUploadModal/868f8f3c5cb8556fe12bdbf5210460603bfb92cd.map