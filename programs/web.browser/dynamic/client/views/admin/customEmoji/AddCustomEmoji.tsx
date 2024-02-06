function module(e,t,l){let n,a,r,i,o,c,u,m,s,E,d,p,f,C,h,j,k,b,g,x;let _=["close","onChange"];l.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),l.link("@rocket.chat/fuselage",{Box(e){r=e},Button(e){i=e},ButtonGroup(e){o=e},Margins(e){c=e},TextInput(e){u=e},Field(e){m=e},FieldLabel(e){s=e},FieldRow(e){E=e},FieldError(e){d=e},Icon(e){p=e}},0),l.link("@rocket.chat/ui-contexts",{useTranslation(e){f=e}},1),l.link("react",{default(e){C=e},useCallback(e){h=e},useState(e){j=e}},2),l.link("../../../components/Contextualbar",{ContextualbarScrollableContent(e){k=e},ContextualbarFooter(e){b=e}},3),l.link("../../../hooks/useEndpointUpload",{useEndpointUpload(e){g=e}},4),l.link("../../../hooks/useFileInput",{useFileInput(e){x=e}},5),l.exportDefault(e=>{let{close:t,onChange:l}=e,F=a(e,_),y=f(),[v,S]=j(""),[w,T]=j(""),[A,I]=j(),[N,U]=j(""),[q,B]=j({name:!1,emoji:!1,aliases:!1}),D=h(async e=>{I(e),U(URL.createObjectURL(e)),B(e=>n(n({},e),{},{emoji:!1}))},[I]),L=g("/v1/emoji-custom.create",y("Custom_Emoji_Added_Successfully")),R=h(async()=>{if(!v)return B(e=>n(n({},e),{},{name:!0}));if(v===w)return B(e=>n(n({},e),{},{aliases:!0}));if(!A)return B(e=>n(n({},e),{},{emoji:!0}));let e=new FormData;e.append("emoji",A),e.append("name",v),e.append("aliases",w);let a=await L(e);a.success&&(l(),t())},[A,v,w,L,l,t]),[z]=x(D,"emoji");return C.createElement(C.Fragment,null,C.createElement(k,F,C.createElement(m,null,C.createElement(s,null,y("Name")),C.createElement(E,null,C.createElement(u,{value:v,onChange:e=>(""!==e.currentTarget.value&&B(e=>n(n({},e),{},{name:!1})),S(e.currentTarget.value)),placeholder:y("Name")})),q.name&&C.createElement(d,null,y("error-the-field-is-required",{field:y("Name")}))),C.createElement(m,null,C.createElement(s,null,y("Aliases")),C.createElement(E,null,C.createElement(u,{value:w,onChange:e=>(e.currentTarget.value!==v&&B(e=>n(n({},e),{},{aliases:!1})),T(e.currentTarget.value)),placeholder:y("Aliases")})),q.aliases&&C.createElement(d,null,y("Custom_Emoji_Error_Same_Name_And_Alias"))),C.createElement(m,null,C.createElement(s,{alignSelf:"stretch",display:"flex",justifyContent:"space-between",alignItems:"center"},y("Custom_Emoji"),C.createElement(i,{square:!0,onClick:z},C.createElement(p,{name:"upload",size:"x20"}))),q.emoji&&C.createElement(d,null,y("error-the-field-is-required",{field:y("Custom_Emoji")})),N&&C.createElement(r,{display:"flex",flexDirection:"row",mi:"neg-x4",justifyContent:"center"},C.createElement(c,{inline:4},C.createElement(r,{is:"img",style:{objectFit:"contain"},w:"x120",h:"x120",src:N}))))),C.createElement(b,null,C.createElement(o,{stretch:!0},C.createElement(i,{onClick:t},y("Cancel")),C.createElement(i,{primary:!0,onClick:R},y("Save")))))})}
//# sourceMappingURL=/dynamic/client/views/admin/customEmoji/cf669094cc44b4a5c9bf9d17d82a791260dabfb6.map