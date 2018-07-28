exports.run = (client, msg, args) => {
  var embed = new client.discord.RichEmbed()
  .setColor(client.color)
  .setTitle("About Aoba")
  .setThumbnail(msg.guild.me.user.avatarURL)
  .addField("Creator", "matcha latte#5239", true)
  .addField("Version", "1.0.1", true)
  .addField("Currently in", `${client.guilds.array().length} servers`, true)
  .addField("Language", "Discord.js (Node.js) + SQLite", true)
  .addField("Twitter", "[Aoba4Discord](http://twitter.com/Aoba4Discord)", true)
  .addField("Support Server", "[Aoba Support](http://discord.gg/H8u4HTn)", true)
  .addField("Discordbots.org", "[Aoba on Discordbots.org](https://discordbots.org/bot/465934252949897216)", true);
  msg.channel.send(embed);
}