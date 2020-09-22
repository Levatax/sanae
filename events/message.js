module.exports = {

    message: (bot, settings, discord) => {
        bot.on('message', async message => {

            if (message.author.bot) return;
            if (message.channel.type === "dm") return;

            let prefix = settings.prefix;
            let args = message.content.slice(prefix.length).trim().split(' ');
            let cmd = args.shift().toLowerCase();
            let command;
            if (!message.content.startsWith(settings.prefix)) return;
            if (bot.commands.has(cmd)) {
                command = bot.commands.get(cmd);
            } else if (bot.aliases.has(cmd)) {
                command = bot.commands.get(bot.aliases.get(cmd));
            }
                try {
                    command.run(bot, message, args);
                } catch (err) {
                    if (err) return undefined;
                }
            
        });
    }

}
