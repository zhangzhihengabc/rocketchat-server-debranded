function module(t,e,n){n.link("@babel/runtime/regenerator",{default:function(t){r=t}},0),n.export({useAuditMutation:function(){return i}}),n.link("@rocket.chat/ui-contexts",{useMethod:function(t){a=t}},0),n.link("@tanstack/react-query",{useMutation:function(t){u=t}},1);var r,a,u,i=function(t){var e=a("auditGetMessages"),n=a("auditGetOmnichannelMessages");return u(["audit"],function(a){var u,i,s,o,l,c,d,f,v,g;return r.async(function(r){for(;;)switch(r.prev=r.next){case 0:if(s=a.msg,o=a.dateRange,l=a.rid,c=a.users,d=a.visitor,f=a.agent,"l"!==t){r.next=3;break}return r.abrupt("return",n({type:t,msg:s,startDate:null!==(v=o.start)&&void 0!==v?v:new Date(0),endDate:null!==(g=o.end)&&void 0!==g?g:new Date,users:c,visitor:"",agent:""}));case 3:return r.abrupt("return",e({type:t,msg:s,startDate:null!==(u=o.start)&&void 0!==u?u:new Date(0),endDate:null!==(i=o.end)&&void 0!==i?i:new Date,rid:l,users:c,visitor:d,agent:f}));case 4:case"end":return r.stop()}},null,null,null,Promise)})}}
//# sourceMappingURL=/dynamic/ee/client/views/audit/hooks/89627a79c5c5c15a3410482b444badfa5ee82bd8.map