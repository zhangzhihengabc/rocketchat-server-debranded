function module(e,t,n){var i,o,a,u,l,r,c,s,d,f,g,k,v,h,S,p,b,m,E,y,N;n.link("@babel/runtime/helpers/extends",{default:function(e){i=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},1),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},2),n.link("@rocket.chat/core-typings",{isSettingColor:function(e){u=e},isSetting:function(e){l=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){r=e}},1),n.link("@rocket.chat/fuselage-hooks",{useDebouncedCallback:function(e){c=e}},2),n.link("@rocket.chat/ui-client",{ExternalLink:function(e){s=e}},3),n.link("@rocket.chat/ui-contexts",{useSettingStructure:function(e){d=e},useTranslation:function(e){f=e}},4),n.link("react",{default:function(e){g=e},useEffect:function(e){k=e},useMemo:function(e){v=e},useState:function(e){h=e},useCallback:function(e){S=e}},5),n.link("../../../components/MarkdownText",{default:function(e){p=e}},6),n.link("../EditableSettingsContext",{useEditableSetting:function(e){b=e},useEditableSettingsDispatch:function(e){m=e},useIsEnterprise:function(e){E=e}},7),n.link("./MemoizedSetting",{default:function(e){y=e}},8),n.link("./SettingSkeleton",{default:function(e){N=e}},9),n.exportDefault(Object.assign(function(e){var t=e.className,n=e.settingId,N=e.sectionChanged,C=b(n),O=d(n),J=E();if(!C||!O)throw Error("Setting "+n+" not found");if(!l(C))throw Error("Setting "+n+" is not valid");var _=m(),x=c(function(e){var t=e.value,n=e.editor;O&&_([a(a(a({_id:O._id},void 0!==t&&{value:t}),void 0!==n&&{editor:n}),{},{changed:JSON.stringify(O.value)!==JSON.stringify(t)||u(O)&&JSON.stringify(O.editor)!==JSON.stringify(n)})])},230,[O,_]),M=f(),w=o(h(C.value),2),B=w[0],D=w[1],T=o(h(u(C)?C.editor:void 0),2),z=T[0],I=T[1];k(function(){D(C.value)},[C.value]),k(function(){I(u(C)?C.editor:void 0)},[C.editor]);var L=S(function(e){D(e),x({value:e})},[x]),V=S(function(e){I(e),x({editor:e})},[x]),j=S(function(){D(C.value),I(u(C)?C.editor:void 0),x(a({value:O.packageValue},u(O)&&{editor:O.packageEditor}))},[C.value,C.editor,x,O]),H=C._id,P=C.disabled,R=C.readonly,A=C.type,U=C.packageValue,q=C.i18nLabel,F=C.i18nDescription,G=C.alert,K=C.invisible,Q=M.has(q)&&M(q)||M.has(H)&&M(H)||q||H,W=v(function(){return F&&M.has(F)?g.createElement(p,{variant:"inline",preserveHtml:!0,content:M(F)}):void 0},[F,M]),X=v(function(){return G&&g.createElement("span",{dangerouslySetInnerHTML:{__html:M.has(G)?M(G):G}})},[G,M]),Y=C.enterprise&&!J,Z=v(function(){return Y?g.createElement(s,{to:"https://go.rocket.chat/i/see-paid-plan-customize-homepage"},g.createElement(r,null,M("See_Paid_Plan"))):void 0},[Y,M]),$=!Y&&!R&&"asset"!==A&&(u(C)&&JSON.stringify(C.packageEditor)!==JSON.stringify(z)||JSON.stringify(B)!==JSON.stringify(U))&&!P;return g.createElement(y,i({className:void 0===t?void 0:t,label:Q||void 0,hint:W,callout:X,showUpgradeButton:Z,sectionChanged:N},C,{disabled:C.disabled||Y,value:B,editor:z,hasResetButton:$,onChangeValue:L,onChangeEditor:V,onResetButtonClick:j,invisible:K}))},{Memoized:y,Skeleton:N}))}
//# sourceMappingURL=/dynamic/client/views/admin/settings/f96d63ac0131d6328301267c8d1e8a7adb266c62.map