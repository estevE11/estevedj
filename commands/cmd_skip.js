module.exports = {
    name: "Skip",
    desc: "Aquest comando esta fet per penya impacient que no viu la vida amb calma.",
    short: "skip",
    exec: (msg, playData, args) => {
        if (!msg.member.voice.channel)
            msg.channel.send("Pero que vas a skipejar si no estas a cap canal payaso.");
        else if(!playData.playing)
            msg.channel.send("Pero que vas a skipejar si no hi ha cap canço payaso.");
        else playData.connection.dispatcher.end();
        return playData;
    }
};
