const ytdl = require("ytdl-core");
const ytsearch = require("youtube-search");
const {ytv3} = require("./../api_keys.json");

const play = require("./../play");

const playlist = require("./../playlist.json");

const opts = {
    maxResults: 10,
    key: ytv3
};

module.exports = {
    name: "Playlist",
    desc: "Reprodueix LA playlist",
    short: "playlist",
    exec: async (msg, playData, args) => {
        if(args.length < 2 || args.length > 2) {
            msg.channel.send("Mal escrit bro, adivina com es ;)");
            return playData;
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

        if(args[1] == "r") playData.queue = getRandomQueue();
        else if(args[1] == "n") playData.queue = [...playlist];

        try {
            const connection = await voiceChannel.join();
            playData.connection = connection;
            play(playData);
        } catch (err) {
            console.log(err);
        }

        return playData;
    }
};

const getRandomQueue = () => {
    let pl = [...playlist];
    let res = [];
    while(pl.length > 0) {
        let i = Math.floor(Math.random()*pl.length);
        res.push(pl[i]);
        pl.splice(i, 1);
    }
    return res;
}


function ytSearchWrapper(query) {
    return new Promise((resolve, reject) => {
        ytsearch(query, opts, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}