function module(e,t,n){let l,a,i,o,r,u,c,m,s,S,E,k,p,d,_,b,h,C,f,g,x;n.link("@rocket.chat/fuselage",{Box(e){l=e},Button(e){a=e},ButtonGroup(e){i=e},States(e){o=e},StatesAction(e){r=e},StatesActions(e){u=e},StatesSubtitle(e){c=e},StatesTitle(e){m=e},TextAreaInput(e){s=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(e){S=e},useRoute(e){E=e}},1),n.link("react",{default(e){k=e},useCallback(e){p=e},useState(e){d=e}},2),n.link("../../../../lib/emailValidator",{validateEmail(e){_=e}},3),n.link("../../../components/Contextualbar",{ContextualbarScrollableContent(e){b=e},ContextualbarFooter(e){h=e},ContextualbarContent(e){C=e}},4),n.link("../../../components/Skeleton",{FormSkeleton(e){f=e}},5),n.link("./hooks/useSendInvitationEmailMutation",{useSendInvitationEmailMutation(e){g=e}},6),n.link("./hooks/useSmtpQuery",{useSmtpQuery(e){x=e}},7),n.exportDefault(()=>{let e=S(),[t,n]=d(""),T=p(e=>e.split(/[\ ,;]+/i).filter(e=>_(e)),[]),v=E("admin-settings"),M=g(),{data:I,isLoading:P}=x();return P?k.createElement(C,null,k.createElement(f,null)):null!=I&&I.isSMTPConfigured?k.createElement(k.Fragment,null,k.createElement(b,null,k.createElement(l,{is:"h2",fontScale:"h2",mb:8},e("Send_invitation_email")),k.createElement(l,{fontScale:"p2",mb:8},e("Send_invitation_email_info")),k.createElement(s,{rows:5,flexGrow:0,onChange:e=>n(e.currentTarget.value)})),k.createElement(h,null,k.createElement(i,{stretch:!0},k.createElement(a,{icon:"send",primary:!0,onClick:()=>{M.mutate({emails:T(t)})},disabled:!T(t).length,alignItems:"stretch",mb:8},e("Send"))))):k.createElement(b,null,k.createElement(o,null,k.createElement(m,null,e("SMTP_Server_Not_Setup_Title")),k.createElement(c,null,e("SMTP_Server_Not_Setup_Description")),k.createElement(u,null,k.createElement(r,{role:"link",onClick:()=>v.push({group:"Email"})},e("Setup_SMTP")))))})}
//# sourceMappingURL=/dynamic/client/views/admin/users/17ca1a6a53d4f5109a1caf15ec2e78d00fe00018.map