function module(e,t,n){let a,l,r,o,i,c,m,s,u,d,T,h,x,f;let k=["_id","t","usersCount","msgs","default","featured"];n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),n.link("@rocket.chat/core-typings",{isDiscussion(e){r=e}},0),n.link("@rocket.chat/fuselage",{Box(e){o=e},Icon(e){i=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery(e){c=e}},2),n.link("@rocket.chat/ui-contexts",{useRouter(e){m=e},useTranslation(e){s=e}},3),n.link("react",{default(e){u=e},useCallback(e){d=e}},4),n.link("../../../components/GenericTable",{GenericTableCell(e){T=e},GenericTableRow(e){h=e}},5),n.link("../../../components/avatar/RoomAvatar",{default(e){x=e}},6),n.link("../../../lib/rooms/roomCoordinator",{roomCoordinator(e){f=e}},7);let p={l:"Omnichannel",c:"Channel",d:"Direct_Message",p:"Private_Channel"},b=e=>{var t;return"d"===e.t?null===(t=e.usernames)||void 0===t?void 0:t.join(" x "):f.getRoomName(e.t,e)};n.exportDefault(e=>{var t,n;let{room:w}=e,E=s(),g=c("(min-width: 1024px)"),v=m(),{_id:C,t:D,usersCount:_,msgs:y,default:S,featured:R}=w,G=l(w,k),I=null===(t=(n=f.getRoomDirectives(w.t)).getIcon)||void 0===t?void 0:t.call(n,w),P=b(w),j=d(e=>()=>v.navigate({name:"admin-rooms",params:{context:"edit",id:e}}),[v]);return u.createElement(h,{action:!0,key:C,onKeyDown:j(C),onClick:j(C),tabIndex:0,role:"link","qa-room-id":C},u.createElement(T,{withTruncatedText:!0},u.createElement(o,{display:"flex",alignContent:"center"},u.createElement(x,{size:g?"x28":"x40",room:a({type:D,name:P,_id:C},G)}),u.createElement(o,{display:"flex",flexGrow:1,flexShrink:1,flexBasis:"0%",flexDirection:"row",alignSelf:"center",alignItems:"center",withTruncatedText:!0},I&&u.createElement(i,{mi:4,name:I,fontScale:"p2m",color:"hint"}),u.createElement(o,{fontScale:"p2m",withTruncatedText:!0,color:"default","qa-room-name":P},P)))),u.createElement(T,null,u.createElement(o,{color:"hint",fontScale:"p2m",withTruncatedText:!0},E(w.teamMain?"c"===w.t?"Teams_Public_Team":"Teams_Private_Team":r(w)?"Discussion":p[w.t]))),u.createElement(T,{withTruncatedText:!0},_),g&&u.createElement(T,{withTruncatedText:!0},y),g&&u.createElement(T,{withTruncatedText:!0},E(S?"True":"False")),g&&u.createElement(T,{withTruncatedText:!0},E(R?"True":"False")))})}
//# sourceMappingURL=/dynamic/client/views/admin/rooms/30a33dfdddf04bc5ae93c9efa2c7b6e71cfb9e3a.map