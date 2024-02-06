function module(){Promise.prototype.finally||(Promise.prototype.finally=function(t){if("function"!=typeof t)return this.then(t,t);let e=this.constructor||Promise;return this.then(o=>e.resolve(t()).then(()=>o),o=>e.resolve(t()).then(()=>{throw o}))})}
//# sourceMappingURL=/dynamic/client/polyfills/e89158d08315529f0c32b3d6e4bae701e99a7759.map
