module.exports = {
    name: "Ping",
    desc: "To ping, answers pong.",
    short: "ping",
    exec: (msg, playData, args) => {
        msg.channel.send("pong");
        return playData;
    }
};
