function module(i,e,r){let n,t;r.link("../../../../app/ui-utils/client",{MessageTypes(i){n=i}},0),r.link("../../../../app/utils/lib/i18n",{t(i){t=i}},1),n.registerType({id:"omnichannel_priority_change_history",system:!0,message:"omnichannel_priority_change_history",data(i){if(!i.priorityData)return{user:t("Unknown_User"),priority:t("Without_priority")};let{definedBy:{username:e},priority:{name:r=null,i18n:n}={}}=i.priorityData;return{user:e||t("Unknown_User"),priority:r||n&&t(n)||t("Unprioritized")}}}),n.registerType({id:"omnichannel_sla_change_history",system:!0,message:"omnichannel_sla_change_history",data(i){if(!i.slaData)return{user:t("Unknown_User"),priority:t("Without_SLA")};let{definedBy:{username:e},sla:{name:r=null}={}}=i.slaData;return{user:e||t("Unknown_User"),sla:r||t("Without_SLA")}}})}
//# sourceMappingURL=/dynamic/ee/app/livechat-enterprise/lib/538b0ed8a1630df989490353b4cf4bcac4fe2e0a.map