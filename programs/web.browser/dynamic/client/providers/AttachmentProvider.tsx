function module(e,t,a){let l,o,u,n,i,r,s;a.link("@rocket.chat/fuselage-hooks",{usePrefersReducedData(e){l=e}},0),a.link("@rocket.chat/ui-contexts",{AttachmentContext(e){o=e},useLayout(e){u=e},useUserPreference(e){n=e}},1),a.link("react",{default(e){i=e},useMemo(e){r=e}},2),a.link("../../app/utils/client",{getURL(e){s=e}},3),a.exportDefault(e=>{let{children:t,width:a=360,height:c=360}=e,{isMobile:d}=u(),f=l(),k=!!n("collapseMediaByDefault"),m=!!n("autoImageLoad"),h=!!n("saveMobileBandwidth"),L=r(()=>({getURL:e=>s(e,{full:!0}),collapsedByDefault:k,autoLoadEmbedMedias:!f&&m&&(!h||!d),dimensions:{width:a,height:c}}),[k,f,m,h,d,a,c]);return i.createElement(o.Provider,{children:t,value:L})})}
//# sourceMappingURL=/dynamic/client/providers/e22fccc43d5d6e60338aa805598aea8beef8d78a.map