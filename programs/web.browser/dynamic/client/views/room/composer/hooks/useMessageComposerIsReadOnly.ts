function module(e,o,r){let l,a,s,t;r.export({useMessageComposerIsReadOnly:()=>i}),r.link("meteor/meteor",{Meteor(e){l=e}},0),r.link("react",{useCallback(e){a=e}},1),r.link("../../../../hooks/useReactiveValue",{useReactiveValue(e){s=e}},2),r.link("../../../../lib/rooms/roomCoordinator",{roomCoordinator(e){t=e}},3);let i=(e,o)=>{let[r,i]=s(a(()=>[t.readOnly(e,l.users.findOne(l.userId(),{fields:{username:1}})),t.archived(e)||!!(o&&"d"===o.t&&o.archived)],[e,o]));return!!(r||i)}}
//# sourceMappingURL=/dynamic/client/views/room/composer/hooks/a1fdc59aa48acd429396daca47bb19378e650b2b.map