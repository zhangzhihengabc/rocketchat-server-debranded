function module(t,e,i){i.link("meteor/meteor",{Meteor:function(t){n=t}},0),i.link("meteor/tracker",{Tracker:function(t){r=t}},1),i.link("../../custom-oauth/client/custom_oauth_client",{CustomOAuth:function(t){s=t}},2),i.link("../../settings/client",{settings:function(t){a=t}},3);var n,r,s,a,c={serverURL:"https://gitlab.com",identityPath:"/api/v4/user",scope:"read_user",mergeUsers:!1,addAutopublishFields:{forLoggedInUser:["services.gitlab"],forOtherUsers:["services.gitlab.username"]},accessTokenParam:"access_token"},o=new s("gitlab",c);n.startup(function(){r.autorun(function(){var t=!1;a.get("API_Gitlab_URL")&&(c.serverURL=a.get("API_Gitlab_URL").trim().replace(/\/*$/,""),t=!0),a.get("Accounts_OAuth_Gitlab_identity_path")&&(c.identityPath=a.get("Accounts_OAuth_Gitlab_identity_path").trim()||c.identityPath,t=!0),a.get("Accounts_OAuth_Gitlab_merge_users")&&(c.mergeUsers=!0,t=!0),t&&o.configure(c)})})}
//# sourceMappingURL=/dynamic/app/gitlab/client/19236d1aa58df9dd9eb556a7714ec18e7cba483c.map