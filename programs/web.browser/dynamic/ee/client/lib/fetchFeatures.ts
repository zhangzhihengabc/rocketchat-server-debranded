function module(e,l,n){let i,t;n.export({fetchFeatures:()=>c}),n.link("../../../app/ui-cached-collection/client",{CachedCollectionManager(e){i=e}},0),n.link("../../../app/utils/client/lib/SDKClient",{sdk(e){t=e}},1);let c=()=>new Promise((e,l)=>{i.onLogin(()=>{t.call("license:getModules").then(e,l)})})}
//# sourceMappingURL=/dynamic/ee/client/lib/e95261bd440fb9e39cdb59b2156cfe558b5177de.map
