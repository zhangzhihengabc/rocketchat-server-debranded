function module(t,e,n){let a,o,l,c,u,s,i,r,k;n.link("@rocket.chat/fuselage",{Box(t){a=t},ContextualbarContent(t){o=t}},0),n.link("@rocket.chat/ui-contexts",{useTranslation(t){l=t}},1),n.link("react",{default(t){c=t},useMemo(t){u=t}},2),n.link("../../../../../hooks/useAsyncState",{AsyncStatePhase(t){s=t}},3),n.link("../../../../../hooks/useEndpointData",{useEndpointData(t){i=t}},4),n.link("../../components/FormSkeleton",{FormSkeleton(t){r=t}},5),n.link("./ContactNewEdit",{default(t){k=t}},6),n.exportDefault(function(t){let{id:e,close:n}=t,m=l(),{value:d,phase:f,error:h}=i("/v1/omnichannel/contact",{params:u(()=>({contactId:e}),[e])});return[f].includes(s.LOADING)?c.createElement(o,null,c.createElement(r,null)):!h&&d&&d.contact?c.createElement(k,{id:e,data:d,close:n}):c.createElement(a,{mbs:16},m("Contact_not_found"))})}
//# sourceMappingURL=/dynamic/client/views/omnichannel/directory/contacts/contextualBar/2440ddfe66597de56f0c14eeaf613d82f8bbf29d.map