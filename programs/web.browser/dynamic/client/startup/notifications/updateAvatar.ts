function module(t,e,a){let i,n;a.link("meteor/meteor",{Meteor(t){i=t}},0),a.link("../../../app/notifications/client",{Notifications(t){n=t}},1),i.startup(()=>{n.onLogged("updateAvatar",t=>{if("username"in t){let{username:e,etag:a}=t;e&&i.users.update({username:e},{$set:{avatarETag:a}})}})})}
//# sourceMappingURL=/dynamic/client/startup/notifications/4dcc36f52b2b3c976302a9c0b55b237e3b8af6ac.map
