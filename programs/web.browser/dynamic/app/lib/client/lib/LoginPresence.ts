function module(t,e,s){let i,n;s.export({LoginPresence:()=>o}),s.link("meteor/meteor",{Meteor(t){i=t}},0),s.link("../../../settings/client",{settings(t){n=t}},1);let o=new class t{constructor(){this.awayTime=6e5,this.started=!1,this.timer=void 0}startTimer(){this.stopTimer(),this.awayTime&&(this.timer=setTimeout(()=>this.disconnect(),this.awayTime))}stopTimer(){clearTimeout(this.timer)}disconnect(){let t=i.status();t&&"offline"!==t.status&&!i.userId()&&!0!==n.get("Accounts_AllowAnonymousRead")&&i.disconnect(),this.stopTimer()}connect(){let t=i.status();t&&"offline"===t.status&&i.reconnect()}start(){this.started||(window.addEventListener("focus",()=>{this.stopTimer(),this.connect()}),window.addEventListener("blur",()=>{this.startTimer()}),window.document.hasFocus()||this.startTimer(),this.started=!0)}};o.start()}
//# sourceMappingURL=/dynamic/app/lib/client/lib/28cddaf3e32bf13edba3bf5eb13bd548ffd1f049.map