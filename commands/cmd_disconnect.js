module.exports = {
    name: "Disconnect",
    desc: "Desconnecta el bot i li fa un reset",
    short: "disconnect",
    exec: (msg, playData, args) => {
        if(playData.voiceChannel != undefined) playData.voiceChannel.leave();
        return {
            textChannel: null,
            voiceChannel: null,
            connection: null,
            queue: [],
            volume: 4,
            playing: false,
        };
    }
};
