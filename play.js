const ytdl = require("ytdl-core");

module.exports = (playData) => {
    const dispatcher = playData.connection.play(ytdl(playData.queue[0].link)).on("finish", () => {
        playData.queue.shift();
        if(playData.queue.length > 0) module.exports(playData);
    })
    dispatcher.setVolumeLogarithmic(playData.volume / 5);

    playData.textChannel.send("Tt ara sona: " + playData.queue[0].title);
}