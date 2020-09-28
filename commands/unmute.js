const Discord = require('discord.js');
const ms = require("ms");

exports.run = async(bot, message, args, connection) => {

    if (message.member.hasPermission("MANAGE_MESSAGES")){
    let spammer = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role) return;
    if (!spammer.roles.has(role.id)) return message.channel.send('User is already unmuted.');
    spammer.removeRole(role.id);
    message.channel.send(`<@${spammer.id}> can speak again.`);
    }
    else {
        message.channel.send(`You don't have permission to unmute users.`)
    }
};

module.exports.help = {
    name: 'unmute',
    aliases: ['um']
};
