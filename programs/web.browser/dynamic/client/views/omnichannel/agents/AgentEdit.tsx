function module(e,t,a){let n,l,r,s,u,o,c,i,m,d,E,p,g,h,v,b,x,k,A,C,f,I,S,T,q,F,_,U,w;let D=["data","userDepartments","availableDepartments","uid","reset"],M=["hasUnsavedChanges"];a.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),a.link("@rocket.chat/fuselage",{Field(e){r=e},FieldLabel(e){s=e},FieldRow(e){u=e},TextInput(e){o=e},Button(e){c=e},Box(e){i=e},MultiSelect(e){m=e},Icon(e){d=e},Select(e){E=e},ContextualbarFooter(e){p=e},ButtonGroup(e){g=e}},0),a.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){h=e}},1),a.link("@rocket.chat/ui-contexts",{useToastMessageDispatch(e){v=e},useRoute(e){b=e},useSetting(e){x=e},useMethod(e){k=e},useTranslation(e){A=e},useEndpoint(e){C=e}},2),a.link("react",{default(e){f=e},useMemo(e){I=e},useRef(e){S=e},useState(e){T=e}},3),a.link("../../../../lib/getUserEmailAddress",{getUserEmailAddress(e){q=e}},4),a.link("../../../components/Contextualbar",{ContextualbarScrollableContent(e){F=e}},5),a.link("../../../components/UserInfo",{default(e){_=e}},6),a.link("../../../hooks/useForm",{useForm(e){U=e}},7),a.link("../additionalForms",{MaxChatsPerAgentContainer(e){w=e}},8),a.exportDefault(e=>{let{data:t,userDepartments:a,availableDepartments:P,uid:y,reset:B}=e,R=l(e,D),G=A(),N=b("omnichannel-agents"),[V,z]=T(),j=x("VoIP_Enabled"),{user:L}=t||{user:{}},{name:O,username:W,statusLivechat:H}=L,J=q(L),K=I(()=>{let e=(e,t)=>t?"".concat(e," [").concat(G("Archived"),"]"):e;return null!=P&&P.departments?P.departments.map(t=>{let{_id:a,name:n,archived:l}=t;return n?[a,e(n,l)]:[a,e(a,l)]}):[]},[P.departments,G]),Q=I(()=>a.departments?a.departments.map(e=>{let{departmentId:t}=e;return t}):[],[a]),X=S({values:{},hasUnsavedChanges:!1,reset:()=>void 0,commit:()=>void 0}),{reset:Y,commit:Z}=X.current,$=h(e=>{let{hasUnsavedChanges:t}=e,a=l(e,M);X.current=a,t!==V&&z(t)}),{values:ee,handlers:et,hasUnsavedChanges:ea,commit:en}=U({departments:Q,status:H,maxChats:0,voipExtension:""}),{handleDepartments:el,handleStatus:er,handleVoipExtension:es}=et,{departments:eu,status:eo,voipExtension:ec}=ee,ei=k("livechat:saveAgentInfo"),em=C("POST","/v1/livechat/agent.status"),ed=v(),eE=h(()=>{B(),Y()}),ep=h(async()=>{try{await em({status:eo,agentId:y}),await ei(y,X.current.values,eu),ed({type:"success",message:G("Success")}),N.push({}),B()}catch(e){ed({type:"error",message:e})}en(),Z()});return f.createElement(f.Fragment,null,f.createElement(F,n({is:"form"},R),W&&f.createElement(i,{alignSelf:"center"},f.createElement(_.Avatar,{"data-qa":"AgentEdit-Avatar",username:W})),f.createElement(r,null,f.createElement(s,null,G("Name")),f.createElement(u,null,f.createElement(o,{"data-qa":"AgentEditTextInput-Name",value:O,disabled:!0}))),f.createElement(r,null,f.createElement(s,null,G("Username")),f.createElement(u,null,f.createElement(o,{"data-qa":"AgentEditTextInput-Username",value:W,disabled:!0,addon:f.createElement(d,{name:"at",size:"x20"})}))),f.createElement(r,null,f.createElement(s,null,G("Email")),f.createElement(u,null,f.createElement(o,{"data-qa":"AgentEditTextInput-Email",value:J,disabled:!0,addon:f.createElement(d,{name:"mail",size:"x20"})}))),f.createElement(r,null,f.createElement(s,null,G("Departments")),f.createElement(u,null,f.createElement(m,{"data-qa":"AgentEditTextInput-Departaments",options:K,value:eu,placeholder:G("Select_an_option"),onChange:el}))),f.createElement(r,null,f.createElement(s,null,G("Status")),f.createElement(u,null,f.createElement(E,{"data-qa":"AgentEditTextInput-Status",options:[["available",G("Available")],["not-available",G("Not_Available")]],value:eo,placeholder:G("Select_an_option"),onChange:er}))),f.createElement(w,{data:L,onChange:$}),j&&f.createElement(r,null,f.createElement(s,null,G("VoIP_Extension")),f.createElement(u,null,f.createElement(o,{"data-qa":"AgentEditTextInput-VoIP_Extension",value:ec,onChange:es})))),f.createElement(p,null,f.createElement(g,{wrap:!0},f.createElement(c,{"data-qa":"AgentEditButtonReset",flexGrow:1,type:"reset",disabled:!ea&&!V,onClick:eE},G("Reset")),f.createElement(c,{"data-qa":"AgentEditButtonSave",mie:"none",flexGrow:1,disabled:!ea&&!V,onClick:ep},G("Save")))))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/agents/945658a3c45bac012323de4ea59af84d0f139234.map