module.exports = {
    name: "Show Playlist",
    desc: "Mostra LA playlist",
    short: "showplaylist",
    exec: (msg, playData, args) => {
        const playlist = require("./../playlist.json");        

        let str = playlist.length + " cançons\n```";

        for (let i = 0; i < playlist.length; i++) {
            const it = playlist[i];
            str += (i+1) + ". " + it.title + "\n";
        }

        str += "```";

        msg.channel.send(str);

        return playData;
    }
};
