const Discord = require('discord.js');

exports.run = async(bot, message, args, connection) => {
  if (!message.author.hasPermission('BAN_MEMBERS')) return [message.channel.send(`You don't have permission`)];
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if(!user) return message.channel.send('Please mention user to ban.');
    if(!reason){
      reason = "no reason";
    }
    if (!message.guild.member(user).bannable) return message.reply(`I don't have permission to ban this user`);

    await message.guild.ban(user, {days: 7, reason: reason});
    
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('Banned User:', `${user.user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag} (${message.author.id})`)
    .addField('Reason:', reason);
    await message.channel.send(embed);

  connection.query("INSERT INTO punishments (type,guild,user,admin,duration,reason,channel) VALUES ('Ban', ?, ?, ?,'7 Days', ?, ?)", [message.guild.id, userid, message.member.id, reason, message.channel.id], function (err, result) {
    if (err) throw err;
    console.log(`successfully added to sql`);
  }); 

};

module.exports.help = {
    name: 'ban',
    aliases: ['']
};
