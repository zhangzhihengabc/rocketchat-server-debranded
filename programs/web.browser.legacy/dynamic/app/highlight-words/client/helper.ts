function module(e,r,t){t.export({getRegexHighlight:function(){return u},getRegexHighlightUrl:function(){return c},highlightWords:function(){return a}}),t.link("@rocket.chat/string-helpers",{escapeRegExp:function(e){n=e}},0);var n,i=function(e,r,t){var n=RegExp(r,"gmi");return t.reduce(function(e,t){var i=RegExp(t.replace(n,'<mark class="highlight-text">'+r+"</mark>"),"i");return e.replace(i,t)},e)},g='$1<mark class="highlight-text">$2</mark>$3',u=function(e){return RegExp("(^|\\b|[\\s\\n\\r\\t.,،'\\\"\\+!?:-])("+n(e)+")($|\\b|[\\s\\n\\r\\t.,،'\\\"\\+!?:-])(?![^<]*>|[^<>]*<\\/)","gmi")},c=function(e){return RegExp("https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)("+n(e)+")\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)","gmi")},a=function(e,r){return r.reduce(function(e,r){var t=r.highlight,n=r.regex,u=r.urlRegex,c=e.match(u);return c?i(e.replace(n,g),t,c):e.replace(n,g)},e)}}
//# sourceMappingURL=/dynamic/app/highlight-words/client/094bfb96bbd5bbd210bb6a2b02e6c41d683f49b8.map