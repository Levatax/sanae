const Discord = require('discord.js');
const ms = require("ms");

exports.run = async(bot, message, args, connection) => {

    let spammer = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if(!spammer) return message.channel.send("Please specify user to perform action upon.");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Lacking permission to perform such action.");
    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    
    if(!role){
      try{
        role = await message.guild.createRole({
          name: "Muted",
          color: "#818080",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    if (spammer.roles.cache.has(role.id)) return message.channel.send('User is already muted.');
    let time = args[1];
    if(!time) {
      time = "24h"
    };
    let reason = args.slice(2).join(' ');
    if(!reason) {
      reason = "Unspecified"
    }
    await(spammer.roles.add(role.id));
    await message.channel.send(`Muted User: <@${spammer.id}> \nDuration: ${ms(ms(time))} \nReason: ${reason}`);

    await connection.query("INSERT INTO punishments (type,guild,user,admin,duration,reason,channel) VALUES ('Mute', ?, ?, ?, ?, ?, ?)", [message.guild.id, spammer.id, message.member.id, time, reason, message.channel.id], function (err, result) {
      if (err) throw err;
      console.log('successfully added to sql');
    });

    setTimeout(function () {
      if (!spammer.roles.cache.has(role.id))
        return;
      spammer.roles.remove(role.id);
      message.channel.send(`<@${spammer.id}> can speak again.`);
    }, ms(time));
};

module.exports.help = {
    name: 'mute',
    aliases: [`tempmute`]
};
