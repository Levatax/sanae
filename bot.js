const discord = require('discord.js');
const bot = new discord.Client();
const ready = require('./events/ready');
const message = require('./events/message');
const fs = require('fs');
const settings = require('./settings.json');

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
ready.ready(bot);
message.message(bot, settings, discord);

fs.readdir("./commands/", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
        });
    });  
});

bot.loadCommand = (commandName) => {
    try {
        let props = require(`../commands/${commandName}`);
        if (props.init) props.init(bot);
        bot.commands.set(commandName, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
        return false;
    } catch (err) {
        return [console.error(err)];
    }
};

bot.unloadCommand = async (commandName) => {
    try {
        if (!commandName) return `\`${commandName}\` I Can't Find This Command!`;

        if (commandName.shutdown) await commandName.shutdown(bot);
        delete require.cache[require.resolve(`../commands/${commandName}.js`)];
        return false;
    } catch (err) {
        return [console.error(err)];
    }
};