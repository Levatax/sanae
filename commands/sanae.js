const Discord = require('discord.js');

exports.run = async(bot, message, args) => {
    message.channel.send(new Discord.MessageEmbed()
.setImage("https://media.discordapp.net/attachments/713633165704560675/774251716253450240/unknown.png")
.setColor("GREEN"));
};
module.exports.help = {
    name: 'sanae',
    aliases: ['touhou']
};

