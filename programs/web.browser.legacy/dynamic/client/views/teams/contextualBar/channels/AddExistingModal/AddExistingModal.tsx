function module(e,n,t){var o,r,a,l,c,u,i,s,m,f,d,p,E,h,k,C;t.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){r=e}},1),t.link("@rocket.chat/fuselage",{Box:function(e){a=e},Button:function(e){l=e},Field:function(e){c=e},FieldLabel:function(e){u=e},Modal:function(e){i=e}},0),t.link("@rocket.chat/ui-contexts",{useToastMessageDispatch:function(e){s=e},useEndpoint:function(e){m=e},useTranslation:function(e){f=e}},1),t.link("react",{default:function(e){d=e},memo:function(e){p=e},useCallback:function(e){E=e}},2),t.link("react-hook-form",{useForm:function(e){h=e},Controller:function(e){k=e}},3),t.link("./RoomsAvailableForTeamsAutoComplete",{default:function(e){C=e}},4),t.exportDefault(p(function(e){var n=e.onClose,t=e.teamId,p=f(),b=s(),v=m("POST","/v1/teams.addRooms"),g=h({defaultValues:{rooms:[]}}),x=g.control,F=g.formState.isDirty,y=g.handleSubmit,T=E(function(e){var o;return r.async(function(a){for(;;)switch(a.prev=a.next){case 0:return o=e.rooms,a.prev=1,a.next=4,r.awrap(v({rooms:o,teamId:t}));case 4:b({type:"success",message:p("Channels_added")}),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(1),b({type:"error",message:a.t0});case 10:return a.prev=10,n(),a.finish(10);case 13:case"end":return a.stop()}},null,null,[[1,7,10,13]],Promise)},[v,t,n,b,p]);return d.createElement(i,{wrapperFunction:function(e){return d.createElement(a,o({is:"form",onSubmit:y(T)},e))}},d.createElement(i.Header,null,d.createElement(i.Title,null,p("Team_Add_existing_channels")),d.createElement(i.Close,{onClick:n})),d.createElement(i.Content,null,d.createElement(c,{mbe:24},d.createElement(u,null,p("Channels")),d.createElement(k,{control:x,name:"rooms",render:function(e){var n=e.field,t=n.value,o=n.onChange;return d.createElement(C,{value:t,onChange:o})}}))),d.createElement(i.Footer,null,d.createElement(i.FooterControllers,null,d.createElement(l,{onClick:n},p("Cancel")),d.createElement(l,{disabled:!F,type:"submit",primary:!0},p("Add")))))}))}
//# sourceMappingURL=/dynamic/client/views/teams/contextualBar/channels/AddExistingModal/ac63d598a50d8e723df522a0dd10bef3ebefc909.map