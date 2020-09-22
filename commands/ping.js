const Discord = require('discord.js');

exports.run = async(client, message, args) => {

      message.channel.send(+ client.ping + `ms `)
};

module.exports.help = {
    name: 'ping',
    aliases: ['latency']
};
