function module(e,t,a){let l,n,o,r,s,d,u,i,c,D,_,m,p,E;a.link("@rocket.chat/fuselage",{Accordion(e){l=e},Field(e){n=e},FieldGroup(e){o=e},FieldRow(e){r=e},ButtonGroup(e){s=e},Button(e){d=e},Box(e){u=e}},0),a.link("@rocket.chat/ui-contexts",{useSetModal(e){i=e},useToastMessageDispatch(e){c=e},useMethod(e){D=e},useTranslation(e){_=e}},1),a.link("react",{default(e){m=e},useCallback(e){p=e}},2),a.link("./MyDataModal",{default(e){E=e}},3),a.exportDefault(()=>{let e=_(),t=i(),a=c(),x=D("requestDataDownload"),w=p(async l=>{try{let a=await x({fullExport:l});if(a.requested){let l=e("UserDataDownload_Requested_Text",{pending_operations:a.pendingOperationsBeforeMyRequest});t(m.createElement(E,{title:e("UserDataDownload_Requested"),text:m.createElement(u,{dangerouslySetInnerHTML:{__html:l}}),onCancel:()=>t(null)}));return}if(a.exportOperation){if("completed"===a.exportOperation.status){let l=a.url?e("UserDataDownload_CompletedRequestExistedWithLink_Text",{download_link:a.url}):e("UserDataDownload_CompletedRequestExisted_Text");t(m.createElement(E,{title:e("UserDataDownload_Requested"),text:m.createElement(u,{dangerouslySetInnerHTML:{__html:l}}),onCancel:()=>t(null)}));return}let l=e("UserDataDownload_RequestExisted_Text",{pending_operations:a.pendingOperationsBeforeMyRequest});t(m.createElement(E,{title:e("UserDataDownload_Requested"),text:m.createElement(u,{dangerouslySetInnerHTML:{__html:l}}),onCancel:()=>t(null)}));return}t(m.createElement(E,{title:e("UserDataDownload_Requested"),onCancel:()=>t(null)}))}catch(e){a({type:"error",message:e})}},[a,x,t,e]),M=p(()=>w(!1),[w]),q=p(()=>w(!0),[w]);return m.createElement(l.Item,{title:e("My Data")},m.createElement(o,null,m.createElement(n,null,m.createElement(r,null,m.createElement(s,{stretch:!0,flexGrow:1},m.createElement(d,{icon:"download",onClick:M},e("Download_My_Data")),m.createElement(d,{icon:"download",onClick:q},e("Export_My_Data")))))))})}
//# sourceMappingURL=/dynamic/client/views/account/preferences/b9b3092c9e8dc74aec7ee8cb862b13906f8f1e56.map