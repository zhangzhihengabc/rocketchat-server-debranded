function module(e,s,i){let n,t,l,u,r,a;i.link("meteor/meteor",{Meteor(e){n=e}},0),i.link("../../../../app/livechat/client/views/app/business-hours/BusinessHours",{businessHourManager(e){t=e}},1),i.link("../../../../app/livechat/client/views/app/business-hours/Single",{SingleBusinessHourBehavior(e){l=e}},2),i.link("../../../../app/settings/client",{settings(e){u=e}},3),i.link("../../license/client",{hasLicense(e){r=e}},4),i.link("./views/business-hours/Multiple",{MultipleBusinessHoursBehavior(e){a=e}},5);let o={multiple:new a,single:new l};n.startup(()=>{Tracker.autorun(async()=>{let e=u.get("Livechat_business_hour_type");await r("livechat-enterprise")&&t.registerBusinessHourBehavior(o[e.toLowerCase()])})})}
//# sourceMappingURL=/dynamic/ee/app/livechat-enterprise/client/0c7e42fc1932f3f1c5021f8a639f7956f6928b57.map