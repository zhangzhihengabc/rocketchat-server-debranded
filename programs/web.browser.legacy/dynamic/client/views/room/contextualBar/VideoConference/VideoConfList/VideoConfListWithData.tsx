function module(o,e,n){var t,i,s,u,l,r,c,f;n.link("react",{default:function(o){t=o},useMemo:function(o){i=o}},0),n.link("../../../../../hooks/lists/useRecordList",{useRecordList:function(o){s=o}},1),n.link("../../../../../hooks/useAsyncState",{AsyncStatePhase:function(o){u=o}},2),n.link("../../../contexts/RoomContext",{useRoom:function(o){l=o}},3),n.link("../../../contexts/RoomToolboxContext",{useRoomToolbox:function(o){r=o}},4),n.link("./VideoConfList",{default:function(o){c=o}},5),n.link("./useVideoConfList",{useVideoConfList:function(o){f=o}},6),n.exportDefault(function(){var o=l(),e=r().closeTab,n=f(i(function(){return{roomId:o._id}},[o._id])),a=n.reload,d=n.videoConfList,m=n.loadMoreItems,k=s(d),C=k.phase,x=k.error,L=k.items,R=k.itemCount;return t.createElement(c,{onClose:e,loadMoreItems:m,loading:C===u.LOADING,total:R,error:x,reload:a,videoConfs:L})})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/VideoConference/VideoConfList/42859b4a0bb1383d24c394d44b3d6591e3b5b596.map