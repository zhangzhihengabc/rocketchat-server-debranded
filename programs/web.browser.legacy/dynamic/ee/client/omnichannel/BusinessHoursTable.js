function module(e,n,t){var l,r,u,i,a,c,o,s,m,f,d,E,g,b,h,k,P,p,T,v,S,G,w,x,y,C=["current","itemsPerPage","setItemsPerPage","setCurrent"];t.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},3),t.link("@rocket.chat/fuselage",{Pagination:function(e){a=e},States:function(e){c=e},StatesIcon:function(e){o=e},StatesActions:function(e){s=e},StatesAction:function(e){m=e},StatesTitle:function(e){f=e}},0),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){d=e},useEndpoint:function(e){E=e}},1),t.link("@tanstack/react-query",{useQuery:function(e){g=e}},2),t.link("react",{default:function(e){b=e},useMemo:function(e){h=e},useState:function(e){k=e}},3),t.link("../../../client/components/FilterByText",{default:function(e){P=e}},4),t.link("../../../client/components/GenericNoResults",{default:function(e){p=e}},5),t.link("../../../client/components/GenericTable",{GenericTable:function(e){T=e},GenericTableBody:function(e){v=e},GenericTableHeaderCell:function(e){S=e},GenericTableHeader:function(e){G=e},GenericTableLoadingRow:function(e){w=e}},6),t.link("../../../client/components/GenericTable/hooks/usePagination",{usePagination:function(e){x=e}},7),t.link("./BusinessHoursRow",{default:function(e){y=e}},8),t.exportDefault(function(){var e=d(),n=i(k(""),2),t=n[0],H=n[1],R=x(),_=R.current,F=R.itemsPerPage,I=R.setItemsPerPage,A=R.setCurrent,B=u(R,C),D=h(function(){return{count:F,offset:_,name:t}},[F,_,t]),L=E("GET","/v1/livechat/business-hours"),N=g(["livechat-buiness-hours",D],function(){return l.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",L(D));case 1:case"end":return e.stop()}},null,null,null,Promise)}),j=N.data,q=N.isLoading,z=N.isSuccess,M=N.isError,O=N.refetch,Q=b.createElement(b.Fragment,null,b.createElement(S,null,e("Name")),b.createElement(S,null,e("Timezone")),b.createElement(S,null,e("Open_Days")),b.createElement(S,{width:"x100"},e("Enabled")),b.createElement(S,{width:"x100"},e("Remove")));return b.createElement(b.Fragment,null,b.createElement(P,{onChange:function(e){return H(e.text)}}),q&&b.createElement(T,null,b.createElement(G,null,Q),b.createElement(v,null,b.createElement(w,{cols:5}))),z&&(null==j?void 0:j.businessHours.length)===0&&b.createElement(p,null),z&&(null==j?void 0:j.businessHours.length)>0&&b.createElement(b.Fragment,null,b.createElement(T,null,b.createElement(G,null,Q),b.createElement(v,null,null==j?void 0:j.businessHours.map(function(e){return b.createElement(y,r({key:e._id,reload:O},e))}))),b.createElement(a,r({divider:!0,current:_,itemsPerPage:F,count:j.total||0,onSetItemsPerPage:I,onSetCurrent:A},B))),M&&b.createElement(c,null,b.createElement(o,{name:"warning",variation:"danger"}),b.createElement(f,null,e("Something_went_wrong")),b.createElement(s,null,b.createElement(m,{onClick:function(){return O()}},e("Reload_page")))))})}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/719bc9a106cfeb806d6920c15b724ecbca145a4e.map