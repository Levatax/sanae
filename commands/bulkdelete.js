const Discord = require('discord.js');

exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return [message.channel.send(`You don't have permission`)];
    let number = parseInt(args.join(' '));
    if (!number) return message.channel.send('Please enter number and try again');
    if (number > 99) return message.channel.send(`I can't delete more than 100 message`);
    await message.channel.bulkDelete(number + 1);
    message.channel.send('Cleared ' + number + ' message')
};

module.exports.help = {
    name: 'clear',
    aliases: ['delete']
};
