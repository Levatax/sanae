const Discord = require('discord.js');

exports.run = async(bot, message, args) => {
    let emoji = args[0];
    var emojiid = emoji.match(/\d/g);
    emojiid = emojiid.join("");
    var emote = Discord.Util.parseEmoji(emoji);
    if (emote.animated === true){
        message.channel.send('https://cdn.discordapp.com/emojis/'+ emojiid +'.gif')
    }
    if (emote.animated === false){
        message.channel.send('https://cdn.discordapp.com/emojis/'+ emojiid +'.png')
    }
};

module.exports.help = {
    name: 'getemoji',
    aliases: ['ge']
};

