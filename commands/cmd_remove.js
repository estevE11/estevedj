const fs = require("fs");

const playlist = require("./../playlist.json");

module.exports = {
    name: "Remove",
    desc: "Borra un tema de merda joder que puto asco",
    short: "rm",
    exec: async (msg, playData, args) => {
        if(args.length == 1) {
            msg.channel.send("Que tal si em passes el nom de una puta canço? Eh? Estaria to guapo, que no soc adivino.");
            return;
        }

        let song = remove_song(Number.parseInt(args[1])-1);

        if(!song) {
            msg.channel.send("Aquesta cançó no esta a la playlist puto retras, aquesta puta memoria imbecil.");
            return playData;
        }
        fs.writeFile("./playlist.json", JSON.stringify(playlist), (err) => {
            if(err) console.error(err);
            else console.log("Playlist saved!");
        });
        msg.channel.send(song.title + " borrada de la playlist tait");

        return playData;
    }
};

const remove_song = (i) => {
    if(i >= playlist.length || i < 0) return false;
    let song = playlist[i];
    playlist.splice(i, 1);
    return song;
}