const Discord = require('discord.js');
exports.run = async(bot, message, args, connection) => {

    let prefix = args[0];
    let guildid= message.guild.id;
    
    connection.query("UPDATE guilds SET prefix=? WHERE guildid=?", [prefix, guildid], function (err, result) {
      if (err) throw err;
      message.channel.send("prefix changed succesffully to "+ prefix);
    });
      
};

module.exports.help = {
    name: 'prefix',
    aliases: ['setprefix']
};
