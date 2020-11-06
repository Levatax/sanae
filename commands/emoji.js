const Discord = require('discord.js');

exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_EMOJIS")) return [message.channel.send(`yetkin olsa`)];

    let url = args[0]
    let name = args[1]
    
    if (!url) return message.channel.send('Please specify URL of emote to add.');
    if (!name) return message.channel.send('Please specify name of the new emote.');
    message.guild.emojis.create(url,name)
    .then(emoji => message.channel.send(`Successfully created new emote \`${emoji.name}\`. Preview: ${emoji}`))
    .catch(console.error);
};

module.exports.help = {
    name: 'emoji',
    aliases: []
};
