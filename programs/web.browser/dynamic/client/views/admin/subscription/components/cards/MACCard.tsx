function module(e,t,a){let l,r,n,o,u,d,c;a.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),a.link("@rocket.chat/fuselage",{Palette(e){r=e}},0),a.link("react",{default(e){n=e}},1),a.link("react-i18next",{useTranslation(e){o=e}},2),a.link("../FeatureUsageCard",{default(e){u=e}},3),a.link("../UpgradeButton",{default(e){d=e}},4),a.link("../UsagePieGraph",{default(e){c=e}},5),a.exportDefault(e=>{let{value:t=0,max:a,hideManageSubscription:i}=e,{t:s}=o(),g={used:t,total:a},m=g&&g.used>0&&g.used/g.total>=.8,f=g.total-g.used,p=l({title:s("Monthly_active_contacts"),infoText:s("MAC_InfoText")},!i&&m&&l({upgradeButton:n.createElement(d,{target:"mac-card",action:"buy_more",small:!0},s("Buy_more"))},i&&m&&{upgradeButton:n.createElement(d,{target:"mac-card",action:"upgrade",small:!0},s("Upgrade"))})),k=m?r.statusColor["status-font-on-danger"].toString():void 0,b=f>0?s("MAC_Available",{macLeft:f}):void 0;return n.createElement(u,{card:p},n.createElement(c,{label:b,used:g.used,total:g.total,color:k}))})}
//# sourceMappingURL=/dynamic/client/views/admin/subscription/components/cards/42574d541b9e32b1cba59d0d5103baa10dd9f3e7.map