module.exports = {
    name: "Ping",
    desc: "A ping, respon pong",
    short: "ping",
    exec: (msg, playData, args) => {
        msg.channel.send("pong");
        return playData;
    }
};
