function module(e,t,n){let l,a,i,r,s,c,o,u,m,E,d,g,S,h,b,k,f;n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@rocket.chat/fuselage",{Box(e){a=e},Pagination(e){i=e},States(e){r=e},StatesAction(e){s=e},StatesActions(e){c=e},StatesIcon(e){o=e},StatesSubtitle(e){u=e},StatesTitle(e){m=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(e){E=e}},1),n.link("react",{default(e){d=e}},2),n.link("../../../../../client/components/GenericNoResults/GenericNoResults",{default(e){g=e}},3),n.link("../../../../../client/components/GenericTable",{GenericTable(e){S=e},GenericTableHeader(e){h=e},GenericTableBody(e){b=e},GenericTableLoadingTable(e){k=e}},4),n.link("../../../../../client/lib/asyncState",{AsyncStatePhase(e){f=e}},5),n.exportDefault(e=>{let{data:t,phase:n,error:T,reload:v,headers:G,renderRow:y,current:R,itemsPerPage:_,setCurrent:p,setItemsPerPage:C,paginationProps:D}=e,P=E();return t||n!==f.REJECTED?d.createElement(d.Fragment,null,(null==t?void 0:t.sessions.length)===0&&n===f.RESOLVED&&d.createElement(g,null),d.createElement(S,null,(null==t?void 0:t.sessions)&&t.sessions.length>0&&G&&d.createElement(h,null,G),d.createElement(b,null,n===f.LOADING&&d.createElement(k,{headerCells:G.filter(Boolean).length}),n===f.RESOLVED&&(null==t?void 0:t.sessions)&&t.sessions.map(y))),n===f.RESOLVED&&d.createElement(i,l({divider:!0,current:R,itemsPerPage:_,count:(null==t?void 0:t.total)||0,onSetCurrent:p,onSetItemsPerPage:C},D))):d.createElement(a,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"},d.createElement(r,null,d.createElement(o,{name:"warning",variation:"danger"}),d.createElement(m,null,P("Something_went_wrong")),d.createElement(u,null,P("We_Could_not_retrive_any_data")),d.createElement(u,null,null==T?void 0:T.message),d.createElement(c,null,d.createElement(s,{onClick:v},P("Retry")))))})}
//# sourceMappingURL=/dynamic/ee/client/components/deviceManagement/DeviceManagementTable/ec8c0d1926a6f9dc9c54790301e2cff805f79fb6.map