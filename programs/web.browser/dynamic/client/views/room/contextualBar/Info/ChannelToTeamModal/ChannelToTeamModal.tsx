function module(e,n,t){let l,o,a,i;t.link("react",{default(e){l=e},useState(e){o=e}},0),t.link("./ChannelToTeamConfirmation",{default(e){a=e}},1),t.link("./ChannelToTeamSelection",{default(e){i=e}},2);let C={SELECTION:"selection",CONFIRMATION:"confirmation"};t.exportDefault(e=>{let{onCancel:n,onConfirm:t}=e,[r,f]=o(C.SELECTION),[m,c]=o();return r===C.CONFIRMATION&&m?l.createElement(a,{onCancel:n,onConfirm:()=>t(m)}):l.createElement(i,{onCancel:n,onConfirm:()=>f(C.CONFIRMATION),onChange:e=>{"string"==typeof e&&c(e)},teamId:m})})}
//# sourceMappingURL=/dynamic/client/views/room/contextualBar/Info/ChannelToTeamModal/100e3bd9915ae4e144c212f9762ed6f37defc32a.map