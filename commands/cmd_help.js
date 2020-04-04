module.exports = {
    name: "Help",
    desc: "Mostra l'ajuda",
    short: "help",
    exec: (msg, playData, args) => {
        const commands = require("./parser").commands;

        let str = "```";

        for (let i = 0; i < commands.length; i++) {
            const it = commands[i];
            str += (i+1) + ". " + it.short + ": " + it.desc + "\n";
        }
        str += "```";
        msg.channel.send(str);

        return playData;
    }
};