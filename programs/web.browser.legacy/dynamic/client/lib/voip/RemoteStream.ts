function module(e,n,i){i.link("@babel/runtime/helpers/inheritsLoose",{default:function(e){t=e}},0),i.export({default:function(){return a}}),i.link("./Stream",{default:function(e){r=e}},0);var t,r,a=function(e){function n(n){var i;return(i=e.call(this,n)||this).renderingMediaElement=void 0,i}t(n,e);var i=n.prototype;return i.init=function(e){this.renderingMediaElement&&(this.renderingMediaElement.pause(),this.renderingMediaElement.srcObject=null),this.renderingMediaElement=e},i.play=function(){var e=!(arguments.length>0)||void 0===arguments[0]||arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.renderingMediaElement&&this.mediaStream&&(this.renderingMediaElement.autoplay=e,this.renderingMediaElement.srcObject=this.mediaStream,e&&this.renderingMediaElement.play().catch(function(e){throw e}),n&&(this.renderingMediaElement.volume=0))},i.pause=function(){var e;null===(e=this.renderingMediaElement)||void 0===e||e.pause()},i.clear=function(){e.prototype.clear.call(this),this.renderingMediaElement&&(this.renderingMediaElement.pause(),this.renderingMediaElement.srcObject=null)},n}(r)}
//# sourceMappingURL=/dynamic/client/lib/voip/d6e63031c72a89ccb08dc6da7515f6dc7a83de62.map