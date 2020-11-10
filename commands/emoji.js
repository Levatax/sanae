const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  var url = "";
  var name = "";
  if (!message.member.hasPermission("MANAGE_EMOJIS"))
    return [message.channel.send(`You must have \`MANAGE_EMOJIS\` permission to perform this action.`)];
  let emoji = args[0];
  var emojiid = emoji.match(/\d/g);
  emojiid = emojiid.join("");
  var emote = Discord.Util.parseEmoji(emoji);
  if (emote.animated === true) {
    url = `https://cdn.discordapp.com/emojis/${emojiid}.gif`;
  }
  if (emote.animated === false) {
    url = `https://cdn.discordapp.com/emojis/${emojiid}.png`;
  }
  if (!args[1]) {
    name = emote.name;
  } else {
    name = args[1];
  }
  message.guild.emojis
    .create(url, name)
    .then((emoji) =>
      message.channel.send(
        `Created new emoji called \`${emoji.name}\`. Preview: ${emoji}`
      )
    )
    .catch(console.error);
};

module.exports.help = {
  name: "addemoji",
  aliases: ["ae","emoji"],
};