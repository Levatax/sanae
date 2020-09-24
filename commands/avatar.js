const Discord = require('discord.js');

exports.run = async(bot, message, args) => {
let user = message.mentions.users.first() || message.guild.member(args[0]) || message.author;
message.channel.send(new Discord.RichEmbed()
.setDescription('Here:')
.setImage(user.avatarURL)
.setColor("RANDOM"));
}

module.exports.help = {
    name: 'pfp',
    aliases: ['avatar', 'pp']
};
