function module(e,t,r){let n;r.export({asReactiveSource:()=>l}),r.link("meteor/tracker",{Tracker(e){n=e}},0);let l=(e,t)=>{if(!n.active)return t();let r=n.currentComputation,l=e(()=>null==r?void 0:r.invalidate());return null==r||r.onInvalidate(()=>{l()}),t()}}
//# sourceMappingURL=/dynamic/client/lib/9e775af3fec064ebaaea4fbb1c316e05b0107a97.map
