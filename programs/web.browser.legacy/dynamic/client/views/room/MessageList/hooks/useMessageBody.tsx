function module(n,t,e){e.export({useMessageBody:function(){return a}}),e.link("@rocket.chat/ui-contexts",{useUserSubscription:function(n){i=n}},0),e.link("react",{useMemo:function(n){u=n}},1),e.link("../../../../lib/parseMessageTextToAstMarkdown",{parseMessageTextToAstMarkdown:function(n){r=n}},2),e.link("./useAutoLinkDomains",{useAutoLinkDomains:function(n){o=n}},3),e.link("./useAutoTranslate",{useAutoTranslate:function(n){s=n}},4);var i,u,r,o,s,a=function(n,t){var e=s(i(t)),a=o();return u(function(){if(!n)return"";if(n.md)return r(n,{customDomains:a,emoticons:!0},e).md;if(n.msg)return n.msg;if(n.attachments){var t=n.attachments.find(function(n){return n.title||n.description});if(null!=t&&t.description)return t.description;if(null!=t&&t.title)return t.title}return""},[n,a,e])}}
//# sourceMappingURL=/dynamic/client/views/room/MessageList/hooks/fcf1515de4e479219d28706f05d1c053eb726860.map