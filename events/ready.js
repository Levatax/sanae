const settings = require('../settings.json');

module.exports = {

    ready : (bot) => {

        bot.login(settings.token)
        bot.on('ready', () => {
            bot.user.setActivity('Spammers', {type: 'WATCHING'});
            bot.user.setStatus('online');
            console.log(`${bot.user.tag} is ready!`);

        });
    }
};
