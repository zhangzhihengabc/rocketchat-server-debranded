function module(n,e,t){t.link("@babel/runtime/helpers/slicedToArray",{default:function(n){o=n}},0),t.export({useDialPad:function(){return f}}),t.link("@rocket.chat/ui-contexts",{useTranslation:function(n){u=n}},0),t.link("react",{useCallback:function(n){i=n},useEffect:function(n){a=n},useState:function(n){l=n}},1),t.link("react-hook-form",{useForm:function(n){r=n}},2),t.link("../../../../../../client/hooks/useDialModal",{useDialModal:function(n){s=n}},3),t.link("../../../../hooks/useOutboundDialer",{useOutboundDialer:function(n){c=n}},4);var o,u,i,a,l,r,s,c,f=function(n){var e,t=n.initialValue,f=n.initialErrorMessage,h=u(),d=c(),k=s().closeDialModal,p=r({defaultValues:{PhoneInput:t||""}}),P=p.setFocus,g=p.register,m=p.setValue,D=p.setError,I=p.clearErrors,C=p.watch,b=p.formState,y=b.errors,B=b.isDirty,E=g("PhoneInput"),_=E.ref,v=E.onChange,M=C("PhoneInput"),w=o(l(!0),2),O=w[0],S=w[1],V=i(function(){I(),m("PhoneInput",M.slice(0,-1),{shouldDirty:!0})},[I,m,M]),x=i(function(n){I(),m("PhoneInput",M+n,{shouldDirty:!0})},[I,m,M]),F=i(function(n){"+"===n&&m("PhoneInput",M+n)},[m,M]),T=i(function(){if(!d)return D("PhoneInput",{message:h("Something_went_wrong_try_again_later")});d.makeCall(M),k()},[d,D,h,M,k]),A=i(function(n){return v(n)},[v]);return a(function(){S(!M)},[M]),a(function(){P("PhoneInput")},[P]),{inputName:"PhoneInput",inputRef:_,inputError:B?null===(e=y.PhoneInput)||void 0===e?void 0:e.message:f,isButtonDisabled:O,handleOnChange:A,handleBackspaceClick:V,handlePadButtonClick:x,handlePadButtonLongPressed:F,handleCallButtonClick:T}}}
//# sourceMappingURL=/dynamic/ee/client/voip/modal/DialPad/hooks/f586748e1c46a709048a3dbea8b7c4c14d4b2739.map