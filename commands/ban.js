const Discord = require('discord.js');

exports.run = async(bot, message, args, connection) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if(!user) return message.channel.send('Please mention user to ban.');
    if(!reason) return message.channel.send('Please type a reason and try again');
    if (!message.guild.member(user).bannable) return message.reply(`I don't have permission to ban this user`);
    let userid = user.id;
    let username = user.username;
    let userdiscriminator= user.discriminator;
    message.guild.ban(user, { days: 7, reason: reason});
    
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('Punishment:', 'Ban For 7 Days :bangbang:')
    .addField('Banned User:', `${user.user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag} (${message.author.id})`)
    .addField('Reason:', reason);
    message.channel.send(embed);

  var sql = `INSERT INTO punishments (type,guild,user,admin,duration,reason,channel) VALUES ('Ban','${message.guild.id}','${userid}','${message.member.id}','7 Days','${reason}','${message.channel.id}')`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log('successfully added to sql');
  });

};

module.exports.help = {
    name: 'ban',
    aliases: ['']
};
