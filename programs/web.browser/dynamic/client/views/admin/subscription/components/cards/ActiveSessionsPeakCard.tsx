function module(e,t,a){let n,l,o,r,i,c,s,u,d;a.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),a.link("@rocket.chat/fuselage",{Box(e){l=e},Skeleton(e){o=e}},0),a.link("react",{default(e){r=e}},1),a.link("react-i18next",{useTranslation(e){i=e}},2),a.link("../../../../../hooks/useFormatDate",{useFormatDate(e){c=e}},3),a.link("../../../../hooks/useStatistics",{useStatistics(e){s=e}},4),a.link("../FeatureUsageCard",{default(e){u=e}},5),a.link("../UpgradeButton",{default(e){d=e}},6),a.exportDefault(()=>{let{t:e}=i(),{data:t,isLoading:a}=s(),f=c(),{maxMonthlyPeakConnections:k}=t||{},m=k||0,g=m>=200,p=n({title:e("ActiveSessionsPeak"),infoText:e("ActiveSessionsPeak_InfoText")},g&&{upgradeButton:r.createElement(d,{target:"active-session-peak-card",action:"upgrade",small:!0},e("Upgrade"))});return r.createElement(u,{card:p},a||void 0===k?r.createElement(o,{variant:"rect",width:"x112",height:"x112"}):r.createElement(l,{textAlign:"center"},r.createElement(l,{fontScale:"h1",color:g?"font-danger":"font-default"},m," / ",200),r.createElement(l,{fontScale:"p2",color:"font-secondary-info",mbs:12},f(new Date))))})}
//# sourceMappingURL=/dynamic/client/views/admin/subscription/components/cards/4f8b95be28e460663f12d2591da3cdcea8b20ab6.map