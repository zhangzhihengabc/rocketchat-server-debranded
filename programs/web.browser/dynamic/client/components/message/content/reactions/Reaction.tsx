function module(e,t,n){let a,l,r,o,i,s,u,c,d,m,_,h;let g=["hasReacted","counter","name","names"];n.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),n.link("@rocket.chat/fuselage",{MessageReaction(e){r=e},MessageReactionEmoji(e){o=e},MessageReactionCounter(e){i=e}},0),n.link("@rocket.chat/ui-contexts",{useTooltipClose(e){s=e},useTooltipOpen(e){u=e},useTranslation(e){c=e}},1),n.link("react",{default(e){d=e},useRef(e){m=e}},2),n.link("../../../../lib/utils/renderEmoji",{getEmojiClassNameAndDataTitle(e){_=e}},3),n.link("../../../MarkdownText",{default(e){h=e}},4);let k=(e,t)=>0===e.length&&t?"You_reacted_with":e.length>10?t?"You_users_and_more_Reacted_with":"Users_and_more_reacted_with":t?"You_and_users_Reacted_with":"Users_reacted_with";n.exportDefault(e=>{let{hasReacted:t,counter:n,name:f,names:p}=e,b=l(e,g),E=c(),R=m(null),j=u(),w=s(),M=t(f),x=k(p,M),T=_(f);return d.createElement(r,a({ref:R,key:f,mine:M,tabIndex:0,role:"button",onMouseOver:e=>{e.stopPropagation(),e.preventDefault(),R.current&&j(d.createElement(h,{content:E(x,{counter:p.length>10?p.length-10:p.length,users:p.slice(0,10).join(", "),emoji:f}),variant:"inline"}),R.current)},onMouseLeave:()=>{w()}},b),d.createElement(o,T),d.createElement(i,{counter:n}))})}
//# sourceMappingURL=/dynamic/client/components/message/content/reactions/cda1378725e1ceb9b0ee2537b991609827572b2f.map