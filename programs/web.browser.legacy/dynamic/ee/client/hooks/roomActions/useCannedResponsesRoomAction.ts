function module(n,e,o){o.export({useCannedResponsesRoomAction:function(){return r}}),o.link("@rocket.chat/ui-contexts",{useSetting:function(n){s=n}},0),o.link("react",{lazy:function(n){t=n},useMemo:function(n){c=n}},1),o.link("../useHasLicenseModule",{useHasLicenseModule:function(n){i=n}},2);var s,t,c,i,u=t(function(){return o.dynamicImport("../../omnichannel/components/contextualBar/CannedResponse")}),r=function(){var n=!0===i("canned-responses"),e=s("Canned_Responses_Enable",!1);return c(function(){if(n&&e)return{id:"canned-responses",groups:["live"],title:"Canned_Responses",icon:"canned-response",tabComponent:u,order:0}},[e,n])}}
//# sourceMappingURL=/dynamic/ee/client/hooks/roomActions/73981245037ea3fa95b4504e2e4c680b00798cc3.map