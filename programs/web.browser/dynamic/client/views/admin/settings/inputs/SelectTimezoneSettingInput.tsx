function module(e,t,l){let n,a,i,o,r,u,d,m;l.link("@rocket.chat/fuselage",{Box(e){n=e},FieldLabel(e){a=e},FieldRow(e){i=e},Flex(e){o=e},Select(e){r=e}},0),l.link("moment-timezone",{default(e){u=e}},1),l.link("react",{default(e){d=e}},2),l.link("../ResetSettingButton",{default(e){m=e}},3),l.exportDefault(function(e){let{_id:t,label:l,value:c,placeholder:f,readonly:s,autocomplete:g,disabled:E,hasResetButton:k,onChangeValue:p,onResetButtonClick:F}=e,h=e=>{null==p||p(e)};return d.createElement(d.Fragment,null,d.createElement(o.Container,null,d.createElement(n,null,d.createElement(a,{htmlFor:t,title:t},l),k&&d.createElement(m,{"data-qa-reset-setting-id":t,onClick:F}))),d.createElement(i,null,d.createElement(r,{"data-qa-setting-id":t,id:t,value:c,placeholder:f,disabled:E,readOnly:s,autoComplete:!1===g?"off":void 0,onChange:e=>h(String(e)),options:u.tz.names().map(e=>[e,e])})))})}
//# sourceMappingURL=/dynamic/client/views/admin/settings/inputs/4285d6f6399534d7ec3d566d8629b50621ac0591.map