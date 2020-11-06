const Discord = require('discord.js');

exports.run = async(bot, message, args, connection) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) return [message.channel.send(`You don't have permission`)];

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if(!user) return message.channel.send('Please mention user to kick.');
    if(!reason) {
      reason = "None"
    };
    if (!message.guild.member(user).kickable) return message.reply(`I don't have permission to kick this user`);
    
    console.log(user.user.tag);
    await user.kick({reason: reason});
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail(bot.user.avatarURL())
    .addField('Kicked User:', `${user.user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag} (${message.author.id})`)
    .addField('Reason:', reason)
    .setFooter(message.author.username, message.author.avatarURL());
    await message.channel.send(embed);

    connection.query("INSERT INTO punishments (type,guild,user,admin,duration,reason,channel) VALUES ('Kick', ?, ?, ?,'-', ?, ?)", [message.guild.id, user.id, message.member.id, reason, message.channel.id], function (err, result) {
      if (err) throw err;
      console.log('successfully added to sql');
    });

};

module.exports.help = {
    name: 'kick',
    aliases: ['']
};
