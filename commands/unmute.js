const Discord = require('discord.js');
const ms = require("ms");

exports.run = async(bot, message, args, connection) => {

    if (message.member.hasPermission("MANAGE_MESSAGES")){

    let spammer = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    if(!role) return;

    if (!spammer.roles.cache.has(role.id)) return message.channel.send('User is not muted.');
    spammer.roles.remove(role.id);
    message.channel.send(`<@${spammer.id}> can speak again.`);
    }

    else {
        message.channel.send(`Lacking permission to perform such action.`)
    }
    
};

module.exports.help = {
    name: 'unmute',
    aliases: ['um']
};
