const settings = require('../settings.json');

module.exports = {

    ready : (bot) => {

        bot.login(settings.token)
        bot.on('ready', async () => {
            await bot.user.setActivity('v!help , git.randomchars.net');
            await bot.user.setStatus('online');
            console.log(`${bot.user.tag} is ready!`);

        });
    }
};
