const Discord = require('discord.js');

exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return [message.channel.send(`yetkin mi varmış`)];

    let number = parseInt(args.join(' '));

    if (!number) return message.channel.send('Please specify the amount of messages to delete.');
    if (number > 99) return message.channel.send(`Unable to delete amount of messages greater than 100.`);

    await message.channel.bulkDelete(number + 1);
    message.channel.send('Removed ' + number + ' messages')
};

module.exports.help = {
    name: 'clear',
    aliases: ['delete','sil']
};
