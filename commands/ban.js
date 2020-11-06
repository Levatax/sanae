const Discord = require('discord.js');

exports.run = async(bot, message, args, connection) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return [message.channel.send(`Lacking permission to perform such action.`)];
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let reason = args.slice(1).join(' ');

    if(!user) return message.channel.send('Please specify user to perform action upon.');
    if(!reason){
      reason = "Unspecified";
    }
    if (!message.guild.member(user).bannable) return message.reply(`Lacking permission to perform such action.`);

    await message.guild.members.ban(user, {days: 7, reason: reason});
    
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail(bot.user.avatarURL())
    .addField('Banned User:', `${user.user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag} (${message.author.id})`)
    .addField('Reason:', reason)
    .setFooter(message.author.username, message.author.avatarURL());
    await message.channel.send(embed);

  connection.query("INSERT INTO punishments (type,guild,user,admin,duration,reason,channel) VALUES ('Ban', ?, ?, ?,'7 Days', ?, ?)", [message.guild.id, user.id, message.member.id, reason, message.channel.id], function (err, result) {
    if (err) throw err;
    console.log(`successfully added to sql`);
  }); 

};

module.exports.help = {
    name: 'ban',
    aliases: ['']
};
