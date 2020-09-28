const Discord = require('discord.js');
const {table} = require('table');
exports.run = async(bot, message, args, connection) => {
  let user;
  if (message.mentions.users.first() === undefined){
    user = args[0];
  } else {
    user = message.mentions.users.first().id;
  }
  if (user.startsWith('<@') && user.endsWith('>')) {
    user = user.slice(2, -1);

    if (user.startsWith('!')) {
        user = user.slice(1);
    }
  }

    var sql = `SELECT * FROM punishments WHERE guild='${message.guild.id}' AND user='${user}'`;
    connection.query(sql, function (err, result) {
      let data = [
        ["ID", "Type", "Moderator", "Duration", "Reason", "Time"]
      ];
      if (err) throw err;
      for(var i=0;i<result.length;i++){
        data.push([result[i].id, result[i].type, result[i].admin, result[i].duration, result[i].reason, result[i].time]);
      };
        config = {
          border: {
            topBody: `─`,
            topJoin: `┬`,
            topLeft: `┌`,
            topRight: `┐`,
         
            bottomBody: `─`,
            bottomJoin: `┴`,
            bottomLeft: `└`,
            bottomRight:  `┘`,
         
            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,
         
            joinBody: `─`,
            joinLeft: `├`,
            joinRight: `┤`,
            joinJoin: `┼`
          }
        };

        let out = table(data, config);
        message.channel.send('```'+ out + '```');
    });
};

module.exports.help = {
    name: 'punishments',
    aliases: ['mutes','ph','history','bans']
};
