exports.commands = [
    require("./cmd_help"),
    require("./cmd_ping"),
    require("./cmd_play"),
    require("./cmd_skip"),
    require("./cmd_showqueue"),
    require("./cmd_playlist"),
    require("./cmd_showplaylist"),
    require("./cmd_add"),
    require("./cmd_remove")
];

let playData = {
    textChannel: null,
    voiceChannel: null,
    connection: null,
    queue: [],
    volume: 4,
    playing: false,
};

exports.parse = async (msg) => {
    args = msg.content.split(" ");
    const cmd_short = args[0].substring(1, args[0].length);

    this.commands.forEach(async it => {
        if(cmd_short === it.short) {
            playData = await it.exec(msg, playData, args);
        }
    });
};