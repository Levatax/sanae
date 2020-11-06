const Discord = require('discord.js');
exports.run = async(bot, message, args, connection) => {

    let prefix = args[0];
    let guildid= message.guild.id;
    var sql = `SELECT prefix FROM guilds WHERE guildid='`+ guildid +`'`;
    connection.query(sql, function (err, result) {
      if (result.length == 0) {
        connection.query("INSERT INTO guilds (prefix,guildid) VALUES (?,?)", [prefix, guildid], function (err, result) {
          message.channel.send("Prefix is now "+ prefix);
        })
      };
      if (result.length == 1) {    
        connection.query("UPDATE guilds SET prefix=? WHERE guildid=?", [prefix, guildid], function (err, result) {
        if (err) throw err;
        message.channel.send("Prefix is now "+ prefix);
      });};
    });
};

module.exports.help = {
    name: 'prefix',
    aliases: ['setprefix']
};
