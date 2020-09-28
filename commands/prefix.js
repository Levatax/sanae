const Discord = require('discord.js');
exports.run = async(bot, message, args, connection) => {

    let prefix = args[0];
    let guildid= message.guild.id;
    var sql = `UPDATE guilds SET prefix = '`+ prefix +`' WHERE guildid = '`+ guildid +`'`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      message.channel.send("prefix changed succesffully to "+ prefix);
    });
      
};

module.exports.help = {
    name: 'prefix',
    aliases: ['setprefix']
};
