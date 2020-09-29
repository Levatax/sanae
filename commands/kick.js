const Discord = require('discord.js');

exports.run = async(bot, message, args, connection) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if(!user) return message.channel.send('Please mention user to kick.');
    if(!reason) return message.channel.send('Please type a reason and try again');
    if (!message.guild.member(user).kickable) return message.reply(`I don't have permission to kick this user`);
    
    console.log(user.user.tag);
    await user.kick({reason: reason});
    
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('Punishment:', 'Kick From Server')
    .addField('Kicked User:', `${user.user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag} (${message.author.id})`)
    .addField('Reason:', reason);
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
