function module(e,m,o){let s;o.link("../../utils/lib/slashCommand",{slashCommands(e){s=e}},0),s.add({command:"kick",callback(e){let{params:m}=e,o=m.trim();if(""!==o)return o.replace("@","")},options:{description:"Remove_someone_from_room",params:"@username",permission:"remove-user"}})}
//# sourceMappingURL=/dynamic/app/slashcommands-kick/client/27155605d6d5de84329500f38e1a4ff21a22527b.map
