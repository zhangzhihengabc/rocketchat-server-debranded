function module(n,e,a){a.link("react",{default:function(n){t=n}},0),a.link("../../../../client/hooks/useForm",{useForm:function(n){l=n}},1),a.link("./BusinessHoursMultiple",{default:function(n){u=n}},2);var t,l,u,s=function(){var n,e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{active:null===(n=a.active)||void 0===n||n,name:null!==(e=a.name)&&void 0!==e?e:"",departments:a.departments.map(function(n){return{value:n._id,label:n.name}})}};a.exportDefault(function(n){var e=n.onChange,a=n.data,i=n.className,o=n.hasChangesAndIsValid,r=l(s(a)),d=r.values,c=r.handlers,m=r.hasUnsavedChanges,v=d.name;return e(d),(void 0===o?function(){}:o)(m&&!!v),t.createElement(u,{values:d,handlers:c,className:i})})}
//# sourceMappingURL=/dynamic/ee/client/omnichannel/additionalForms/64363cdafa72fa1ece1b2b63baba68ce008c0ef1.map