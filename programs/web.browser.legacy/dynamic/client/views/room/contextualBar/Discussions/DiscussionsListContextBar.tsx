function module(e,o,t){var n,s,i,u,c,l,r,a,f,d,k,m,x;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){n=e}},0),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){s=e}},0),t.link("@rocket.chat/ui-contexts",{useUserId:function(e){i=e}},1),t.link("react",{default:function(e){u=e},useCallback:function(e){c=e},useMemo:function(e){l=e},useState:function(e){r=e}},2),t.link("../../../../hooks/lists/useRecordList",{useRecordList:function(e){a=e}},3),t.link("../../../../hooks/useAsyncState",{AsyncStatePhase:function(e){f=e}},4),t.link("../../contexts/RoomContext",{useRoom:function(e){d=e}},5),t.link("../../contexts/RoomToolboxContext",{useRoomToolbox:function(e){k=e}},6),t.link("./DiscussionsList",{default:function(e){m=e}},7),t.link("./useDiscussionsList",{useDiscussionsList:function(e){x=e}},8),t.exportDefault(function(){var e=i(),o=d(),t=k().closeTab,h=n(r(""),2),b=h[0],L=h[1],C=s(b,400),D=x(l(function(){return{rid:o._id,text:C}},[o._id,C]),e),R=D.discussionsList,I=D.loadMoreItems,T=a(R),g=T.phase,A=T.error,p=T.items,v=T.itemCount,y=c(function(e){L(e.currentTarget.value)},[]);return e?u.createElement(m,{onClose:t,userId:e,error:A,discussions:p,total:v,loading:g===f.LOADING,loadMoreItems:I,text:b,onChangeFilter:y}):null})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Discussions/c4ee6345da019842baea1175b6e5ecaa2cee0ccf.map