function module(e,t,n){let l,o,r,a,i,c,m,d,u,s;n.link("@rocket.chat/fuselage",{FieldGroup(e){l=e},IconButton(e){o=e},Margins(e){r=e}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(e){a=e}},1),n.link("react",{default(e){i=e}},2),n.link("react-hook-form",{useFormContext(e){c=e},Controller(e){m=e}},3),n.link("./components/NotificationByDevice",{default(e){d=e}},4),n.link("./components/NotificationPreference",{default(e){u=e}},5),n.link("./components/NotificationToggle",{default(e){s=e}},6),n.exportDefault(e=>{let{notificationOptions:t,handlePlaySound:n}=e,p=a(),{watch:E,control:f}=c(),{showCounter:k}=E();return i.createElement(i.Fragment,null,i.createElement(m,{control:f,name:"turnOn",render:e=>{let{field:{value:t,onChange:n}}=e;return i.createElement(s,{label:p("Turn_ON"),description:p("Receive_alerts"),onChange:n,defaultChecked:t})}}),i.createElement(m,{control:f,name:"muteGroupMentions",render:e=>{let{field:{value:t,onChange:n}}=e;return i.createElement(s,{label:p("Mute_Group_Mentions"),onChange:n,defaultChecked:t})}}),i.createElement(m,{control:f,name:"showCounter",render:e=>{let{field:{value:t,onChange:n}}=e;return i.createElement(s,{label:p("Show_counter"),description:p("Display_unread_counter"),onChange:n,defaultChecked:t})}}),!k&&i.createElement(m,{control:f,name:"showMentions",render:e=>{let{field:{value:t,onChange:n}}=e;return i.createElement(s,{label:p("Show_mentions"),description:p("Display_mentions_counter"),onChange:n,defaultChecked:t})}}),i.createElement(l,null,i.createElement(d,{device:p("Desktop"),icon:"desktop"},i.createElement(m,{control:f,name:"desktopAlert",render:e=>{let{field:{value:n,onChange:l}}=e;return i.createElement(u,{id:"DesktopAlert",name:p("Alerts"),options:t.alerts,optionValue:n,onChange:l})}}),i.createElement(r,{blockStart:16},i.createElement(m,{control:f,name:"desktopSound",render:e=>{let{field:{value:l,onChange:r}}=e;return i.createElement(u,{id:"DesktopSound",name:p("Sound"),options:t.sounds,optionValue:l,onChange:r},i.createElement(o,{icon:"play",mis:4,onClick:n}))}}))),i.createElement(d,{device:p("Mobile"),icon:"mobile"},i.createElement(m,{control:f,name:"mobileAlert",render:e=>{let{field:{value:n,onChange:l}}=e;return i.createElement(u,{id:"MobileAlert",name:p("Alerts"),options:t.alerts,optionValue:n,onChange:l})}})),i.createElement(d,{device:p("Email"),icon:"mail"},i.createElement(m,{control:f,name:"emailAlert",render:e=>{let{field:{value:n,onChange:l}}=e;return i.createElement(u,{id:"EmailAlert",name:p("Alerts"),options:t.alerts,optionValue:n,onChange:l})}}))))})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/NotificationPreferences/b52cfc7a54d14308a3059a17eb27569ac3cb0b16.map