function module(e,n,t){var i,l,r,o,a,c,u,s,m,f,d,g,k,b,h,p,v,E,T,P,y,x,C,G,S,_,w,R,N,F=["current","itemsPerPage","setItemsPerPage","setCurrent"];t.link("@babel/runtime/regenerator",{default:function(e){i=e}},0),t.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},2),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){o=e}},3),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},4),t.link("@rocket.chat/fuselage",{IconButton:function(e){c=e},Pagination:function(e){u=e}},0),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){s=e},useMutableCallback:function(e){m=e}},1),t.link("@rocket.chat/ui-contexts",{useTranslation:function(e){f=e},useEndpoint:function(e){d=e},useRouter:function(e){g=e}},2),t.link("@tanstack/react-query",{useQuery:function(e){k=e},hashQueryKey:function(e){b=e}},3),t.link("react",{default:function(e){h=e},useMemo:function(e){p=e},useState:function(e){v=e}},4),t.link("../../../../client/components/FilterByText",{default:function(e){E=e}},5),t.link("../../../../client/components/GenericNoResults",{default:function(e){T=e}},6),t.link("../../../../client/components/GenericTable",{GenericTable:function(e){P=e},GenericTableRow:function(e){y=e},GenericTableCell:function(e){x=e},GenericTableHeader:function(e){C=e},GenericTableHeaderCell:function(e){G=e},GenericTableBody:function(e){S=e},GenericTableLoadingRow:function(e){_=e}},7),t.link("../../../../client/components/GenericTable/hooks/usePagination",{usePagination:function(e){w=e}},8),t.link("../../../../client/components/GenericTable/hooks/useSort",{useSort:function(e){R=e}},9),t.link("./useRemoveTag",{useRemoveTag:function(e){N=e}},10),t.exportDefault(function(){var e=f(),n=a(v(""),2),t=n[0],I=n[1],B=s(t,500),D=g(),A=w(),H=A.current,L=A.itemsPerPage,O=A.setItemsPerPage,j=A.setCurrent,q=o(A,F),J=R("name"),M=J.sortBy,Q=J.sortDirection,W=J.setSort,K=m(function(e){return D.navigate("/omnichannel/tags/edit/"+e)}),V=m(function(){return D.navigate("/omnichannel/tags/new")}),z=N(),U=p(function(){var e;return r(r({viewAll:"true",fields:JSON.stringify({name:1}),text:B,sort:JSON.stringify(((e={})[M]="asc"===Q?1:-1,e))},L&&{count:L}),H&&{offset:H})},[B,L,H,M,Q]),X=d("GET","/v1/livechat/tags"),Y=k(["livechat-tags",U],function(){return i.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",X(U));case 1:case"end":return e.stop()}},null,null,null,Promise)},{refetchOnWindowFocus:!1}),Z=Y.data,$=Y.isSuccess,ee=Y.isLoading,en=a(v(b([U])),1)[0]!==b([U]),et=h.createElement(h.Fragment,null,h.createElement(G,{key:"name",direction:Q,active:"name"===M,onClick:W,sort:"name"},e("Name")),h.createElement(G,{key:"description",direction:Q,active:"description"===M,onClick:W,sort:"description"},e("Description")),h.createElement(G,{key:"remove",w:"x60"}));return h.createElement(h.Fragment,null,($&&(null==Z?void 0:Z.tags.length)>0||en)&&h.createElement(E,{onChange:function(e){return I(e.text)}}),ee&&h.createElement(P,null,h.createElement(C,null,et),h.createElement(S,null,h.createElement(_,{cols:3}))),$&&(null==Z?void 0:Z.tags.length)===0&&en&&h.createElement(T,null),$&&(null==Z?void 0:Z.tags.length)===0&&!en&&h.createElement(T,{icon:"tag",title:e("No_tags_yet"),description:e("No_tags_yet_description"),buttonTitle:e("Create_tag"),buttonAction:V,linkHref:"https://go.rocket.chat/omnichannel-docs",linkText:e("Learn_more_about_tags")}),$&&(null==Z?void 0:Z.tags.length)>0&&h.createElement(h.Fragment,null,h.createElement(P,null,h.createElement(C,null,et),h.createElement(S,null,null==Z?void 0:Z.tags.map(function(n){var t=n._id,i=n.name,l=n.description;return h.createElement(y,{key:t,tabIndex:0,role:"link",onClick:function(){return K(t)},action:!0,"qa-user-id":t},h.createElement(x,{withTruncatedText:!0},i),h.createElement(x,{withTruncatedText:!0},l),h.createElement(x,null,h.createElement(c,{icon:"trash",small:!0,title:e("Remove"),onClick:function(e){e.stopPropagation(),z(t)}})))}))),h.createElement(u,l({divider:!0,current:H,itemsPerPage:L,count:(null==Z?void 0:Z.total)||0,onSetItemsPerPage:O,onSetCurrent:j},q))))})}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/tags/01aa91a9fd4a489d27a66722952f0eff7304a312.map