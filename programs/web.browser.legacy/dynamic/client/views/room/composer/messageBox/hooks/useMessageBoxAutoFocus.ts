function module(e,n,t){t.export({useMessageBoxAutoFocus:function(){return c}}),t.link("react",{useCallback:function(e){u=e},useEffect:function(e){r=e},useRef:function(e){o=e}},0);var u,r,o,c=function(e){var n=o();return r(function(){var e=function(e){var t=n.current,u=e.target;!u||u===t||!(e.keyCode>45&&e.keyCode<91||8===e.keyCode)||/input|textarea|select/i.test(u.tagName)||!0===e.ctrlKey||!0===e.metaKey||null==t||t.focus()};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}},[]),u(function(t){t&&(n.current=t,e&&n.current&&n.current.focus())},[e,n])}}
//# sourceMappingURL=/dynamic/client/views/room/composer/messageBox/hooks/1b389413c866ab0a418de2b3a1f3443a13134e7a.map