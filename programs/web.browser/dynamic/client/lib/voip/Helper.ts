function module(e,n,r){let o;async function i(e,n,r){let{sessionDescriptionHandler:i}=n;if(!(i instanceof o))throw Error("Session's session description handler not instance of SessionDescriptionHandler.");let{peerConnection:s}=i;if(!s)throw Error("Peer connection closed.");let t=null;"sender"===r?t=s.getSenders():"receiver"===r&&(t=s.getReceivers()),t&&t.forEach(n=>{n.track&&(n.track.enabled=e)})}r.export({toggleMediaStreamTracks:()=>i}),r.link("sip.js/lib/platform/web",{SessionDescriptionHandler(e){o=e}},0)}
//# sourceMappingURL=/dynamic/client/lib/voip/0a7f88523b77a50e78fae49404b8f949f40c1c67.map