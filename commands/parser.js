const commands = [
    require("./cmd_ping"),
    require("./cmd_play"),
    require("./cmd_add"),
    require("./cmd_skip"),
    require("./cmd_playlist"),
];

let playData = {
    textChannel: null,
    voiceChannel: null,
    connection: null,
    queue: [],
    volume: 4,
    playing: false,
};

module.exports = async (msg) => {
    args = msg.content.split(" ");
    const cmd_short = args[0].substring(1, args[0].length);

    commands.forEach(async it => {
        if(cmd_short === it.short) {
            playData = await it.exec(msg, playData, args);
        }
    });
};