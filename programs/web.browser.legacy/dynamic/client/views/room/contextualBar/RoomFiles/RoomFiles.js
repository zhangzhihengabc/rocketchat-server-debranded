function module(e,t,n){var l,o,i,a,c,r,u,f,s,m,d,x,h,C,E,p,k,g,b,w;n.link("@rocket.chat/fuselage",{Box:function(e){l=e},Icon:function(e){o=e},TextInput:function(e){i=e},Select:function(e){a=e},Throbber:function(e){c=e},Margins:function(e){r=e}},0),n.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){u=e},useAutoFocus:function(e){f=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){s=e}},2),n.link("react",{default:function(e){m=e},useMemo:function(e){d=e}},3),n.link("react-virtuoso",{Virtuoso:function(e){x=e}},4),n.link("../../../../components/Contextualbar",{ContextualbarHeader:function(e){h=e},ContextualbarIcon:function(e){C=e},ContextualbarTitle:function(e){E=e},ContextualbarClose:function(e){p=e},ContextualbarContent:function(e){k=e},ContextualbarEmptyContent:function(e){g=e}},5),n.link("../../../../components/ScrollableContentWrapper",{default:function(e){b=e}},6),n.link("./Row",{default:function(e){w=e}},7),n.exportDefault(function(e){var t=e.loading,n=e.filesItems,v=void 0===n?[]:n,D=e.text,I=e.type,T=e.setText,y=e.setType,S=e.onClickClose,A=e.onClickDelete,F=e.total,M=e.loadMoreItems,_=e.isDeletionAllowed,q=s(),z=d(function(){return[["all",q("All")],["image",q("Images")],["video",q("Videos")],["audio",q("Audios")],["text",q("Texts")],["application",q("Files")]]},[q]),R=f(!0),V=u(),B=d(function(){return{onClickDelete:A,isDeletionAllowed:_}},[_,A]);return m.createElement(m.Fragment,null,m.createElement(h,null,m.createElement(C,{name:"attachment"}),m.createElement(E,null,q("Files")),S&&m.createElement(p,{onClick:S})),m.createElement(k,{p:12},m.createElement(l,{display:"flex",flexDirection:"row",p:12,flexShrink:0},m.createElement(l,{display:"flex",flexDirection:"row",flexGrow:1,mi:"neg-x4"},m.createElement(r,{inline:"x4"},m.createElement(i,{"data-qa-files-search":!0,id:V,placeholder:q("Search_Files"),ref:R,value:D,onChange:T,addon:m.createElement(o,{name:"magnifier",size:"x20"})}),m.createElement(l,{w:"x144",mis:8},m.createElement(a,{onChange:y,value:I,options:z}))))),t&&m.createElement(l,{p:12},m.createElement(c,{size:"x12"})),!t&&v.length<=0&&m.createElement(g,{title:q("No_files_found")}),!t&&v.length>0&&m.createElement(l,{w:"full",h:"full",flexShrink:1,overflow:"hidden"},m.createElement(x,{style:{height:"100%",width:"100%"},totalCount:F,endReached:t?function(){}:function(e){return M(e,Math.min(50,F-e))},overscan:50,data:v,components:{Scroller:b},itemContent:function(e,t){return m.createElement(w,{data:B,index:e,item:t})}}))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/RoomFiles/8135c071ca84d91c10c5f1e3a3ce8427ba64389a.map