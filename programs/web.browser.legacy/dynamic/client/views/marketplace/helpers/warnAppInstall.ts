function module(t,n,s){s.export({warnAppInstall:function(){return r}}),s.link("../../../../app/utils/lib/i18n",{t:function(t){e=t}},0),s.link("../../../lib/toast",{dispatchToastMessage:function(t){i=t}},1),s.link("./appErroredStatuses",{appErroredStatuses:function(t){a=t}},2);var e,i,a,r=function(t,n){if(a.includes(n)){i({type:"error",message:(e("App_status_"+n),t)});return}i({type:"success",message:t+" installed"})}}
//# sourceMappingURL=/dynamic/client/views/marketplace/helpers/48a1d18f7c42a2e03d2df8c4b37f4a26822fdb34.map