const ytdl = require("ytdl-core");
const ytsearch = require("youtube-search");
const {ytv3} = require("./../api_keys.json");

const play = require("./../play");

const opts = {
    maxResults: 10,
    key: ytv3
};

module.exports = {
    name: "Play",
    desc: "Reprodueix un temonaco",
    short: "play",
    exec: async (msg, playData, args) => {
        if(args.length == 1) {
            msg.channel.send("Que tal si em passes el nom de una puta canço? Eh? Estaria to guapo, que no soc adivino.");
            return;
        }
        
        const textChannel = msg.channel;
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel)
        return msg.channel.send("Tu puto imbecil si no esta en un canal de voz com polles vols que fiqui musica, enano mental.");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return msg.channel.send("Payaso i els permisos on estan?");
        }

        if(playData.voiceChannel == null) playData.voiceChannel = voiceChannel;
        if(playData.voiceChannel != voiceChannel) {
            playData.voiceChannel.leave();
            playData.voiceChannel = voiceChannel;
        }

        if(playData.textChannel == null) playData.textChannel = textChannel;
        if(playData.textChannel != textChannel) {
            playData.textChannel.leave();
            playData.textChannel = textChannel;
        }

        let query = "";
        for(i = 1; i < args.length; i++) {
            query += args[i] + " ";
        }

        query_answer = await ytSearchWrapper(query);
        song = query_answer[0];

        if(playData.playing) {
            playData.queue.splice(1, 0, song);
            msg.channel.send(song.title + " s'ha afegit a la cua.");
        } else {
            try {
                const connection = await voiceChannel.join();
                playData.connection = connection;
                playData.queue.push(song);
                play(playData);
            } catch (err) {
                console.log(err);
            }
        }
        return playData;
    }
};


function ytSearchWrapper(query) {
    return new Promise((resolve, reject) => {
        ytsearch(query, opts, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}