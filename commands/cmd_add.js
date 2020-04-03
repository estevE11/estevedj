const ytdl = require("ytdl-core");
const ytsearch = require("youtube-search");
const {ytv3} = require("./../api_keys.json");
const fs = require("fs");

const playlist = require("./../playlist.json");

module.exports = {
    name: "Add",
    desc: "Addsa a song to the playlist",
    short: "add",
    exec: async (msg, playData, args) => {
        if(args.length == 1) {
            msg.channel.send("Que tal si em passes el nom de una puta canço? Eh? Estaria to guapo, que no soc adivino.");
            return;
        }

        let query = "";
        for(i = 1; i < args.length; i++) {
            query += args[i] + " ";
        }

        console.log("caca0");
        query_answer = await ytSearchWrapper(query);
        const song = query_answer[0];

        if(add_song(song)) {
            msg.channel.send("Aquesta canço ja esta a la playlist tait");
            return playData;
        }
        fs.writeFile("./playlist.json", JSON.stringify(playlist), (err) => {
            if(err) console.error(err);
            else console.log("Playlist saved!");
        });
        msg.channel.send(song.title + " afegida a la playlist tait");

        return playData;
    }
};

const add_song = (song) => {
    add = true;
    playlist.forEach(it => {
        if(song.title == it) add = false;
    });
    if(add) playlist.push({title: song.title, link: song.link});
    return !add;
}

const opts = {
    maxResults: 10,
    key: ytv3
};

function ytSearchWrapper(query) {
    return new Promise((resolve, reject) => {
        ytsearch(query, opts, (err, res) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });
}