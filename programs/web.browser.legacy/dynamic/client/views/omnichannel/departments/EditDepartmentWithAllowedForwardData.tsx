function module(t,e,n){var l,a,o,i,r,u,d,c,s,f=["data"];n.link("@babel/runtime/helpers/extends",{default:function(t){l=t}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(t){a=t}},1),n.link("@rocket.chat/fuselage",{Box:function(t){o=t}},0),n.link("@rocket.chat/ui-contexts",{useEndpoint:function(t){i=t},useTranslation:function(t){r=t}},1),n.link("@tanstack/react-query",{useQuery:function(t){u=t}},2),n.link("react",{default:function(t){d=t}},3),n.link("../../../components/Skeleton",{FormSkeleton:function(t){c=t}},4),n.link("./EditDepartment",{default:function(t){s=t}},5),n.exportDefault(function(t){var e,n=t.data,m=a(t,f),v=r(),k=i("GET","/v1/livechat/department.listByIds"),p=u(["/v1/livechat/department.listByIds",null==n?void 0:null===(e=n.department)||void 0===e?void 0:e.departmentsAllowedToForward],function(){var t,e;return k({ids:null!==(t=null==n?void 0:null===(e=n.department)||void 0===e?void 0:e.departmentsAllowedToForward)&&void 0!==t?t:[]})}),b=p.data,h=p.isInitialLoading,E=p.isError;return h?d.createElement(c,null):E?d.createElement(o,{mbs:16},v("Not_Available")):d.createElement(s,l({data:n,allowedToForwardData:b},m))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/departments/7c3614a67b96991ad8fe2337818f88d74c4e6b45.map