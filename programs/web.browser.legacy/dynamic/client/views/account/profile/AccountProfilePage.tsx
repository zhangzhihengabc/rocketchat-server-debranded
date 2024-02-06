function module(e,n,t){var r,o,a,u,c,s,l,i,f,d,m,h,p,g,k,w,v,_,b,y,x,C,P,E,S;t.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},1),t.link("@rocket.chat/fuselage",{ButtonGroup:function(e){a=e},Button:function(e){u=e},Box:function(e){c=e}},0),t.link("@rocket.chat/fuselage-hooks",{useUniqueId:function(e){s=e}},1),t.link("@rocket.chat/sha256",{SHA256:function(e){l=e}},2),t.link("@rocket.chat/ui-contexts",{useSetModal:function(e){i=e},useToastMessageDispatch:function(e){f=e},useUser:function(e){d=e},useLogout:function(e){m=e},useEndpoint:function(e){h=e},useTranslation:function(e){p=e},useSetting:function(e){g=e}},3),t.link("react",{default:function(e){k=e},useState:function(e){w=e},useCallback:function(e){v=e}},4),t.link("react-hook-form",{FormProvider:function(e){_=e},useForm:function(e){b=e}},5),t.link("../../../components/ConfirmOwnerChangeModal",{default:function(e){y=e}},6),t.link("../../../components/Page",{default:function(e){x=e}},7),t.link("../security/useAllowPasswordChange",{useAllowPasswordChange:function(e){C=e}},8),t.link("./AccountProfileForm",{default:function(e){P=e}},9),t.link("./ActionConfirmModal",{default:function(e){E=e}},10),t.link("./getProfileInitialValues",{getProfileInitialValues:function(e){S=e}},11),t.exportDefault(function(){var e=p(),n=d(),t=f(),A=i(),O=m(),D=o(w(!1),2),T=D[0],B=D[1],M=g("Message_ErasureType"),U=g("Accounts_AllowDeleteOwnAccount"),F=C().hasLocalPassword,L=b({defaultValues:S(n),mode:"onBlur"}),q=L.reset,I=L.formState,R=I.isDirty,V=I.isSubmitting,W=h("POST","/v1/users.logoutOtherClients"),G=h("POST","/v1/users.deleteOwnAccount"),H=v(function(){return r.async(function(n){for(;;)switch(n.prev=n.next){case 0:return B(!0),n.prev=1,n.next=4,r.awrap(W());case 4:t({type:"success",message:e("Logged_out_of_other_clients_successfully")}),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(1),t({type:"error",message:n.t0});case 10:B(!1);case 11:case"end":return n.stop()}},null,null,[[1,7]],Promise)},[W,t,e]),j=v(function(n,o,a){var u=function(){return r.async(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,r.awrap(G({password:l(n),confirmRelinquish:!0}));case 3:t({type:"success",message:e("User_has_been_deleted")}),A(null),O(),o.next=11;break;case 8:o.prev=8,o.t0=o.catch(0),t({type:"error",message:o.t0});case 11:case"end":return o.stop()}},null,null,[[0,8]],Promise)};return A(function(){return k.createElement(y,{onConfirm:u,onCancel:function(){return A(null)},contentTitle:e("Delete_User_Warning_"+M),confirmText:e("Delete"),shouldChangeOwner:o,shouldBeRemoved:a})})},[M,A,e,G,t,O]),z=v(function(){var n;return r.async(function(o){for(;;)switch(o.prev=o.next){case 0:return n=function n(n){var o,a,u;return r.async(function c(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,c.next=3,r.awrap(G({password:l(n)}));case 3:t({type:"success",message:e("User_has_been_deleted")}),O(),c.next=13;break;case 7:if(c.prev=7,c.t0=c.catch(0),"user-last-owner"!==c.t0.error){c.next=12;break}return a=(o=c.t0.details).shouldChangeOwner,u=o.shouldBeRemoved,c.abrupt("return",j(n,a,u));case 12:t({type:"error",message:c.t0});case 13:case"end":return c.stop()}},null,null,[[0,7]],Promise)},o.abrupt("return",A(function(){return k.createElement(E,{onConfirm:n,onCancel:function(){return A(null)},isPassword:F})}));case 2:case"end":return o.stop()}},null,null,null,Promise)},[t,F,A,j,G,O,e]),J=s();return k.createElement(x,null,k.createElement(x.Header,{title:e("Profile")}),k.createElement(x.ScrollableContentWithShadow,null,k.createElement(c,{maxWidth:"600px",w:"full",alignSelf:"center"},k.createElement(_,L,k.createElement(P,{id:J})),k.createElement(a,{stretch:!0,mb:12},k.createElement(u,{onClick:H,flexGrow:0,loading:T},e("Logout_Others")),U&&k.createElement(u,{icon:"trash",danger:!0,onClick:z},e("Delete_my_account"))))),k.createElement(x.Footer,{isDirty:R},k.createElement(a,null,k.createElement(u,{disabled:!R,onClick:function(){return q(S(n))}},e("Cancel")),k.createElement(u,{form:J,"data-qa":"AccountProfilePageSaveButton",primary:!0,disabled:!R||T,loading:V,type:"submit"},e("Save_changes")))))})}
//# sourceMappingURL=/dynamic/client/views/account/profile/013c22aee55f35a659b539ae4014fd41128eca70.map