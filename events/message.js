module.exports = {

    message: (bot, settings, discord, connection) => {
        bot.on('message', async message => {
            
            let guildid = message.guild.id;
            var sql = `SELECT prefix FROM guilds WHERE guildid='`+ guildid +`'`;
            connection.query(sql, function (err, result) {
            if (err) throw err;
            let prefix = result[0].prefix;
            if (message.author.bot) return;
            if (message.channel.type === "dm") return;
            let args = message.content.slice(prefix.length).trim().split(' ');
            let cmd = args.shift().toLowerCase();
            let command;
            if (!message.content.startsWith(prefix)) return;
            if (bot.commands.has(cmd)) {
                command = bot.commands.get(cmd);
            } else if (bot.aliases.has(cmd)) {
                command = bot.commands.get(bot.aliases.get(cmd));
            }
                try {
                    command.run(bot, message, args, connection);
                } catch (err) {
                    if (err) return undefined;
                }
            });
        });
    }

}
