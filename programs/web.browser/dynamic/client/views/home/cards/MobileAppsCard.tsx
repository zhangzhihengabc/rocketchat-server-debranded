function module(e,t,l){let a,o,n,r,c,i,p,k,u;l.link("@rocket.chat/fuselage",{Button(e){a=e}},0),l.link("@rocket.chat/ui-client",{Card(e){o=e},CardTitle(e){n=e},CardBody(e){r=e},CardFooterWrapper(e){c=e},CardFooter(e){i=e}},1),l.link("@rocket.chat/ui-contexts",{useTranslation(e){p=e}},2),l.link("react",{default(e){k=e}},3),l.link("../../../hooks/useExternalLink",{useExternalLink(e){u=e}},4),l.exportDefault(()=>{let e=p(),t=u();return k.createElement(o,{"data-qa-id":"homepage-mobile-apps-card"},k.createElement(n,null,e("Mobile_apps")),k.createElement(r,null,e("Take_rocket_chat_with_you_with_mobile_applications")),k.createElement(c,null,k.createElement(i,null,k.createElement(a,{onClick:()=>t("https://go.rocket.chat/i/hp-mobile-app-google")},e("Google_Play")),k.createElement(a,{onClick:()=>t("https://go.rocket.chat/i/hp-mobile-app-apple")},e("App_Store")))))})}
//# sourceMappingURL=/dynamic/client/views/home/cards/208d5051dda185681b5866810fa8a3efba41cb9e.map