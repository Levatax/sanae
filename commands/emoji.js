const Discord = require('discord.js');

exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_EMOJIS")) return [message.channel.send(`You don't have permission to add emojis`)];

    let url = args[0]
    let name = args[1]
    
    if (!url) return message.channel.send('Please enter emoji url and try again');
    if (!name) return message.channel.send('Please enter emoji name and try again');
    message.guild.createEmoji(url,name)
    .then(emoji => message.channel.send(`Successfully created emoji. \nName: \`${emoji.name}\` \nPreview: ${emoji}`))
    .catch(console.error);
};

module.exports.help = {
    name: 'emoji',
    aliases: []
};
