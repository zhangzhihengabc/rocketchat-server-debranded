function module(e,n,t){var a,i,l,c,o,r,s,u,f,d,m,_;t.link("@rocket.chat/fuselage",{Box:function(e){a=e},Tag:function(e){i=e}},0),t.link("@rocket.chat/ui-client",{ExternalLink:function(e){l=e}},1),t.link("date-fns/differenceInDays",{default:function(e){c=e}},2),t.link("react",{default:function(e){o=e}},3),t.link("react-i18next",{Trans:function(e){r=e},useTranslation:function(e){s=e}},4),t.link("../../../../../../hooks/useLicense",{useLicenseName:function(e){u=e}},5),t.link("../../../utils/links",{DOWNGRADE_LINK:function(e){f=e},TRIAL_LINK:function(e){d=e}},6),t.link("../../UpgradeButton",{default:function(e){m=e}},7),t.link("./PlanCardBase",{default:function(e){_=e}},8),t.exportDefault(function(e){var n,t,h=e.licenseInformation,p=s().t,E=u(),k=(null===(n=h.grantedBy)||void 0===n?void 0:n.method)!=="self-service"||!0,y=h.visualExpiration;return o.createElement(_,{name:null!==(t=E.data)&&void 0!==t?t:""},o.createElement(a,{display:"flex",flexDirection:"column",h:"full"},y&&o.createElement(a,{fontScale:"p2b",mb:6,display:"flex"},o.createElement(a,{mie:8},p("Trial_active"))," ",o.createElement(i,null,p("n_days_left",{n:c(new Date(y),new Date)}))),o.createElement(a,{fontScale:"p2",mb:6},k?o.createElement(r,{i18nKey:"Contact_sales_trial"},"Contact sales to finish your purchase and avoid",o.createElement(l,{to:f},"downgrade consequences.")):o.createElement(r,{i18nKey:"Finish_your_purchase_trial"},"Finish your purchase to avoid ",o.createElement(l,{to:f},"downgrade consequences."))),o.createElement(a,{fontScale:"p2",mb:6},o.createElement(r,{i18nKey:"Why_has_a_trial_been_applied_to_this_workspace"},o.createElement(l,{to:d},"Why has a trial been applied to this workspace?"))),o.createElement(m,{target:"plan_card_trial",action:k?"finish_purchase":"contact_sales",primary:!0,mbs:"auto",w:"full"},p(k?"Finish_purchase":"Contact_sales"))))})}
//# sourceMappingURL=/dynamic/client/views/admin/subscription/components/cards/PlanCard/2f7d36a05528a8b9d7570ee06a2a76a4e3e9954c.map