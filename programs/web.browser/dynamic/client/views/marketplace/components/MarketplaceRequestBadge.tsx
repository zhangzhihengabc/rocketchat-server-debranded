function module(e,t,a){let l,n,r,i;a.link("@rocket.chat/fuselage",{Badge(e){l=e},Skeleton(e){n=e}},0),a.link("react",{default(e){r=e}},1),a.link("../hooks/useAppRequestStats",{useAppRequestStats(e){i=e}},2),a.exportDefault(()=>{let e=i();return e.isLoading?"idle"!==e.fetchStatus?r.createElement(n,{variant:"circle",height:"x16",width:"x16"}):null:e.isError||!e.data.totalUnseen?null:r.createElement(l,{variant:"primary"},e.data.totalUnseen)})}
//# sourceMappingURL=/dynamic/client/views/marketplace/components/33f9b81f321850d64148f6ca87f047ff07c97b8b.map