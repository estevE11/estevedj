const Discord = require('discord.js');
const {token} = require('./token.json');
const ytdl = require('ytdl-core')

const parser = require("./commands/parser");

const client = new Discord.Client();
client.login(token);

const prefix = "#";

client.once('ready', () => {
    console.log('Ready!');
});

client.on("message", async (message) => {
    if(message.author.bot) return;
    console.log("Message: " + message.content);
    if(message.content.startsWith(prefix)) await parser(message);

    if(message.content.startsWith("-play")) message.channel.send("Ja estas utilitzan a la competencia, cabron?");
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});
