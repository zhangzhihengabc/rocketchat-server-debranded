function module(t,n,s){s.export({warnStatusChange:function(){return r}}),s.link("../../../../app/utils/lib/i18n",{t:function(t){e=t}},0),s.link("../../../lib/toast",{dispatchToastMessage:function(t){a=t}},1),s.link("./appErroredStatuses",{appErroredStatuses:function(t){i=t}},2);var e,a,i,r=function(t,n){if(i.includes(n)){a({type:"error",message:(e("App_status_"+n),t)});return}a({type:"info",message:(e("App_status_"+n),t)})}}
//# sourceMappingURL=/dynamic/client/views/marketplace/helpers/1482884b92ee6b32fc58841f738d851649f79b85.map