function module(e,t,n){var r,o,l,a,c,i,u,s,d;n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){o=e}},0),n.link("@rocket.chat/fuselage-hooks",{useBreakpoints:function(e){l=e}},1),n.link("@rocket.chat/ui-contexts",{useTranslation:function(e){a=e}},2),n.link("react",{default:function(e){c=e}},3),n.link("../../../components/FilterByText",{default:function(e){i=e}},4),n.link("../components/CategoryFilter/CategoryDropDown",{default:function(e){u=e}},5),n.link("../components/CategoryFilter/TagList",{default:function(e){s=e}},6),n.link("../components/RadioDropDown/RadioDropDown",{default:function(e){d=e}},7),n.exportDefault(function(e){var t=e.setText,n=e.freePaidFilterStructure,p=e.freePaidFilterOnSelected,f=e.categories,g=e.selectedCategories,m=e.onSelected,x=e.sortFilterStructure,S=e.sortFilterOnSelected,k=e.categoryTagList,h=e.statusFilterStructure,F=e.statusFilterOnSelected,_=e.context,w=a(),C="private"===_,D=l(),E={explore:w("Search_Apps"),enterprise:w("Search_Premium_Apps"),installed:w("Search_Installed_Apps"),requested:w("Search_Requested_Apps"),private:w("Search_Private_apps")},v=D.includes("lg")?{maxWidth:"x200",minWidth:"x200"}:null;return c.createElement(o,{pi:24},c.createElement(i,{placeholder:E[_],onChange:function(e){return t(e.text)}},!C&&c.createElement(d,r({group:n,onSelected:p,flexGrow:1},v)),c.createElement(d,r({group:h,onSelected:F,flexGrow:1},v)),!C&&c.createElement(u,{categories:f,selectedCategories:g,onSelected:m,flexGrow:1}),c.createElement(d,r({group:x,onSelected:S,flexGrow:1},v))),c.createElement(s,{categories:k,onClick:m}))})}
//# sourceMappingURL=/dynamic/client/views/marketplace/AppsPage/1eb06154917150ac81784b4ad8804cc9efc65f06.map