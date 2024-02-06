function module(){Promise.prototype.finally||(Promise.prototype.finally=function(t){if("function"!=typeof t)return this.then(t,t);var n=this.constructor||Promise;return this.then(function(o){return n.resolve(t()).then(function(){return o})},function(o){return n.resolve(t()).then(function(){throw o})})})}
//# sourceMappingURL=/dynamic/client/polyfills/550ebfccf1acf7fa49a057fa9d693f79298212f1.map
