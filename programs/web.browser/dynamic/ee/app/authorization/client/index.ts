function module(e,i,t){let l,n,s;t.link("meteor/meteor",{Meteor(e){l=e}},0),t.link("../../../../app/utils/client/lib/SDKClient",{sdk(e){n=e}},1),t.link("../lib/addRoleRestrictions",{addRoleRestrictions(e){s=e}},2),l.startup(async()=>{let e=await n.call("license:isEnterprise");e&&s()})}
//# sourceMappingURL=/dynamic/ee/app/authorization/client/6206bbed3cc80daef91c4d9b4509d0ec79e4413c.map
