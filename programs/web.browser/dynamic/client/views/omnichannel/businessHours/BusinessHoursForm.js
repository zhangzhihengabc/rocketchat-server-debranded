function module(e,a,l){let t,n,r,u,o,s;l.export({DAYS_OF_WEEK:()=>c}),l.link("@rocket.chat/fuselage",{Field(e){t=e},MultiSelect(e){n=e}},0),l.link("@rocket.chat/ui-contexts",{useTranslation(e){r=e}},1),l.link("react",{default(e){u=e},useMemo(e){o=e}},2),l.link("./TimeRangeFieldsAssembler",{default(e){s=e}},3);let c=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];l.exportDefault(e=>{let{values:a,handlers:l,className:d}=e,i=r(),m=o(()=>c.map(e=>[e,i(e)]),[i]),{daysOpen:y,daysTime:p}=a,{handleDaysOpen:E,handleDaysTime:_}=l;return u.createElement(u.Fragment,null,u.createElement(t,{className:d},u.createElement(t.Label,null,i("Open_days_of_the_week")),u.createElement(t.Row,null,u.createElement(n,{options:m,onChange:E,value:y,placeholder:i("Select_an_option"),w:"full"}))),u.createElement(s,{onChange:_,daysOpen:y,daysTime:p,className:d}))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/businessHours/de03be6aa90309a88ca114c774245c70accc3ff2.map