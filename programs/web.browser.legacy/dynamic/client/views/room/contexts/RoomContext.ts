function module(o,r,e){e.export({RoomContext:function(){return u},useUserIsSubscribed:function(){return c},useRoom:function(){return a},useRoomSubscription:function(){return m},useRoomMessages:function(){return f},useOmnichannelRoom:function(){return d},useVoipRoom:function(){return p}}),e.link("@rocket.chat/core-typings",{isOmnichannelRoom:function(o){n=o},isVoipRoom:function(o){s=o}},0),e.link("react",{createContext:function(o){i=o},useContext:function(o){t=o}},1);var n,s,i,t,u=i(null),c=function(){var o=t(u);if(!o)throw Error("use useRoom only inside opened rooms");return!!o.subscription},a=function(){var o=t(u);if(!o)throw Error("use useRoom only inside opened rooms");return o.room},m=function(){var o=t(u);if(!o)throw Error("use useRoomSubscription only inside opened rooms");return o.subscription},f=function(){var o=t(u);if(!o)throw Error("use useRoomMessages only inside opened rooms");return{hasMorePreviousMessages:o.hasMorePreviousMessages,hasMoreNextMessages:o.hasMoreNextMessages,isLoadingMoreMessages:o.isLoadingMoreMessages}},d=function(){var o=(t(u)||{}).room;if(!o)throw Error("use useRoom only inside opened rooms");if(!n(o))throw Error("invalid room type");return o},p=function(){var o=(t(u)||{}).room;if(!o)throw Error("use useRoom only inside opened rooms");if(!s(o))throw Error("invalid room type");return o}}
//# sourceMappingURL=/dynamic/client/views/room/contexts/18a6e1e0376663df35fde41fbbc4a490e0c3da9c.map