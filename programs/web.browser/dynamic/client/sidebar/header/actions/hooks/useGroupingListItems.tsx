function module(e,n,t){let a,r,o,s,c,d;t.export({useGroupingListItems:()=>i}),t.link("@rocket.chat/fuselage",{CheckBox(e){a=e}},0),t.link("@rocket.chat/ui-contexts",{useEndpoint(e){r=e},useUserPreference(e){o=e},useTranslation(e){s=e}},1),t.link("react",{default(e){c=e},useCallback(e){d=e}},2);let i=()=>{let e=s(),n=o("sidebarGroupByType"),t=o("sidebarShowFavorites"),i=o("sidebarShowUnread"),u=r("POST","/v1/users.setPreferences"),l=(e,n)=>d(()=>u({data:{[e]:n}}),[e,n]),h=l("sidebarGroupByType",!n),p=l("sidebarShowFavorites",!t),k=l("sidebarShowUnread",!i);return[{id:"unread",content:e("Unread"),icon:"flag",addon:c.createElement(a,{onChange:k,checked:i})},{id:"favorites",content:e("Favorites"),icon:"star",addon:c.createElement(a,{onChange:p,checked:t})},{id:"types",content:e("Types"),icon:"group-by-type",addon:c.createElement(a,{onChange:h,checked:n})}]}}
//# sourceMappingURL=/dynamic/client/sidebar/header/actions/hooks/75b9712017ffdcc8673568c4243ce15240a9ac29.map