module.exports = {
    name: "Show Queue",
    desc: "Mostra els temones que hi ha en cua",
    short: "queue",
    exec: (msg, playData, args) => {
        if(playData.queue.length == 0) {
            msg.channel.send("Actualment no hi ha cap cançó a la cua. Disculpi les molesties.");
            return playData;
        }

        let str = playData.queue.length + " cançons\n```";

        for (let i = 0; i < playData.queue.length; i++) {
            const it = playData.queue[i];
            str += (i == 0 ? ">> " : i + ". ") + it.title + "\n";
        }

        str += "```";

        msg.channel.send(str);

        return playData;
    }
};
