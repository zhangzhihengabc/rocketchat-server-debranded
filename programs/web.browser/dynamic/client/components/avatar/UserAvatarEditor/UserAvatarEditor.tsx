function module(e,t,a){let l,n,r,i,o,s,c,u,d,m,f,v,p,g,k,E;a.link("@rocket.chat/fuselage",{Box(e){l=e},Button(e){n=e},TextInput(e){r=e},Margins(e){i=e},Avatar(e){o=e},IconButton(e){s=e}},0),a.link("@rocket.chat/ui-contexts",{useToastMessageDispatch(e){c=e},useSetting(e){u=e},useTranslation(e){d=e}},1),a.link("react",{default(e){m=e},useState(e){f=e},useCallback(e){v=e}},2),a.link("../../../hooks/useFileInput",{useFileInput(e){p=e}},3),a.link("../../../lib/utils/isValidImageFormat",{isValidImageFormat(e){g=e}},4),a.link("../UserAvatar",{default(e){k=e}},5),a.link("./UserAvatarSuggestions",{default(e){E=e}},6);let x=(e,t)=>{let a=new FileReader;a.onloadend=function(e){var a;t((null==e?void 0:null===(a=e.target)||void 0===a?void 0:a.result)||null)},a.readAsDataURL(e)};a.exportDefault(function(e){let{currentUsername:t,username:a,setAvatarObj:A,disabled:y,etag:_}=e,b=d(),U=u("FileUpload_RotateImages"),[w,D]=f(""),[S,F]=f(),I=c(),h=v(async(e,t)=>{A(t),x(e,async e=>{if("string"==typeof e&&await g(e)){F(e);return}I({type:"error",message:b("Avatar_format_invalid")})})},[A,b,I]),[C]=p(h);return m.createElement(l,{display:"flex",flexDirection:"column",fontScale:"p2m",color:"default"},b("Profile_picture"),m.createElement(l,{display:"flex",flexDirection:"row",mbs:4},m.createElement(k,{size:"x124",url:S,username:t||"",etag:_,style:{objectFit:"contain",imageOrientation:U?"from-image":"none"}}),m.createElement(l,{display:"flex",flexDirection:"column",flexGrow:"1",justifyContent:"space-between",mis:4},m.createElement(l,{display:"flex",flexDirection:"row",mbs:"none"},m.createElement(i,{inline:4},m.createElement(n,{square:!0,mis:"none",onClick:()=>{F("/avatar/%40".concat(a)),A("reset")},disabled:y,mie:4,title:b("Accounts_SetDefaultAvatar")},m.createElement(o,{url:"/avatar/%40".concat(a)})),m.createElement(s,{icon:"upload",secondary:!0,onClick:C,disabled:y,title:b("Upload")}),m.createElement(s,{"data-qa-id":"UserAvatarEditorSetAvatarLink",icon:"permalink",secondary:!0,onClick:()=>{F(w),A({avatarUrl:w})},disabled:y||!w,title:b("Add_URL")}),m.createElement(E,{setAvatarObj:A,setNewAvatarSource:F,disabled:y}))),m.createElement(i,{inlineStart:4},m.createElement(l,null,b("Use_url_for_avatar")),m.createElement(r,{"data-qa-id":"UserAvatarEditorLink",flexGrow:0,placeholder:b("Use_url_for_avatar"),value:w,onChange:e=>{D(e.currentTarget.value)}})))))})}
//# sourceMappingURL=/dynamic/client/components/avatar/UserAvatarEditor/8c566867021981178ae19524e562f2bc58210a1c.map