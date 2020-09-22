const Discord = require('discord.js');

exports.run = async(bot, message, args) => {

      message.channel.send(+ bot.ping + `ms `)
};

module.exports.help = {
    name: 'ping',
    aliases: ['latency']
};
