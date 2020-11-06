const Discord = require('discord.js');

exports.run = async(bot, message, args) => {

    const help= new Discord.MessageEmbed()
        .setColor('#55A630')
        .setTitle('Leva Moderation Help')
        .setURL('https://leva.chars.jp')
        .setThumbnail(bot.user.avatarURL())
        .addFields(
            {
                "name": "<a:bit1:773993740334530570> Moderation",
                "value": "v!ban       @user reason\nv!mute     @user 10m reason\nv!unmute @user\nv!kick       @user reason\nv!history   @user",
                "inline": true
              },
              {
                "name": "<a:bit2:773994133496528896> Utility",
                "value": "v!clear msgnumber\nv!prefix newprefix\nv!ping\nv!emoji url name\nv!avatar @user",
                "inline": true
              },
              {
                "name": "<a:bit3:773994935866490910> Info",
                "value": "This client is opensource and currently under development, there may be bugs. Please report them at git.randomchars.net."
              },
              {
                "name": "Made By",
                "value": "<:discord:773996548907728937> Levatax#0001",
                "inline": true
              },
              {
                "name": "Special Thanks To",
                "value": "<:discord:773996548907728937> RandomChars#2229",
                "inline": true
              }
        )
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

      message.channel.send({embed: help });
}

module.exports.help = {
    name: 'help',
    aliases: ['h']
}
