const Discord = require('discord.js');
const ms = require("ms");

exports.run = async(bot, message, args, connection) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")){
    let spammer = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!spammer) return message.channel.send("Please mention user to mute");
    if(spammer.hasPermission("MANAGE_MESSAGES")) return message.reply("I don't have permission to mute this user.");
    let role = message.guild.roles.find(r => r.name === "Muted");
    
    if(!role){
      try{
        role = await message.guild.createRole({
          name: "Muted",
          color: "#818386",
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
    if (spammer.roles.has(role.id)) return message.channel.send('User is already muted.');
    let time = args[1];
    if(!time) return message.channel.send("Please add duration and try again, `prefix`mute @user 10m reason");
    let reason = args.slice(2).join(' ');
    if(!reason) return message.channel.send("Please add reason and try again. `prefix`mute @user 10m reason")
    await(spammer.addRole(role.id));
    message.channel.send(`Muted User: <@${spammer.id}> \nDuration: ${ms(ms(time))} \nReason: ${reason}`);

    connection.query("INSERT INTO punishments (type,guild,user,admin,duration,reason,channel) VALUES ('Mute', ?, ?, ?, ?, ?, ?)", [message.guild.id, spammer.id, message.member.id, time, reason, message.channel.id], function (err, result) {
      if (err) throw err;
      console.log('successfully added to sql');
    });

    setTimeout(function(){
      if (!spammer.roles.has(role.id)) return;
      spammer.removeRole(role.id);
      message.channel.send(`<@${spammer.id}> can speak again.`);
    }, ms(time));
  }
  else {
      message.channel.send(`you don't have permission`);
  }
};

module.exports.help = {
    name: 'mute',
    aliases: [`tempmute`]
};
