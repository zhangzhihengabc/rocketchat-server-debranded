function module(e,t,n){let a,i,l,r,s,o;n.link("@rocket.chat/onboarding-ui",{AdminInfoPage(e){a=e}},0),n.link("@rocket.chat/string-helpers",{escapeRegExp(e){i=e}},1),n.link("@rocket.chat/ui-contexts",{useSetting(e){l=e},useTranslation(e){r=e}},2),n.link("react",{default(e){s=e}},3),n.link("../contexts/SetupWizardContext",{useSetupWizardContext(e){o=e}},4);let c=["all","here","admin"].map(e=>RegExp("^".concat(i(e).trim(),"$"),"i")),u=e=>!!c.length&&c.some(t=>t.test(i(e).trim()));n.exportDefault(()=>{let e=r(),t=l("UTF8_User_Names_Validation"),n=new RegExp("^".concat(t,"$")),{currentStep:i,validateEmail:c,registerAdminUser:d,maxSteps:m}=o(),p=async e=>{d(e)};return s.createElement(a,{validatePassword:e=>e.length>0,passwordRulesHint:"",validateUsername:t=>!(!n.test(t)||u(t))||e("Invalid_username"),validateEmail:c,currentStep:i,stepCount:m,onSubmit:p})})}
//# sourceMappingURL=/dynamic/client/views/setupWizard/steps/f7a97d8f9d5c7ddc2e7d76b8f802925fb01bf1c1.map