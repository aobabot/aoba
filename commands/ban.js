exports.run = (client, msg, args) => {
  console.log(args);
  var joined = args.join(" ");
  var arg = (joined.includes("\"")) ? joined.split("\"") : joined.split("“");
  console.log(`Arguments: ${arg}`);
  var name = arg[0];
  console.log(`Name given: ${name}`);
  var reason = ((arg[1] !== undefined) && arg[1].includes("”")) ? arg[1].slice(0, arg[1].length - 1) : arg[1];
  console.log(`Reason given: ${reason}`);
  var canBan = msg.member.hasPermission("BAN_MEMBERS");
  if (canBan == false) {
    msg.channel.send({embed: {
        color: 0xffa3e7,
        description: "**ERROR**: You don't have permission to ban members!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  else {
    //if no members are mentioned
    if (args.length < 1 || msg.mentions.members == null) {
      msg.channel.send({embed: {
          color: 0xffa3e7,
          description: "**ERROR**: Please @ a member to ban!"
      }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
    }
    else {
      var member = msg.mentions.members.first();
      var name = member.user.username;
      if(msg.guild.me.hasPermission("BAN_MEMBERS") && member.bannable) {
        if (reason !== undefined) {
          msg.guild.ban(member, {reason: reason}).then(() => {msg.channel.send({embed: {
                color: client.color,
                description: `**${name}** was banned from ${msg.guild.name}! 👋\n**Reason:** ${reason}`
          }}).then(msg => {msg.delete(10000000)}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else {
          msg.guild.ban(member).then(() => {msg.channel.send({embed: {
                color: client.color,
                description: `**${name}** was banned from ${msg.guild.name}! 👋`
          }}).then(msg => {msg.delete(10000000)}).catch(err => {console.error(err)})}).catch(console.error);
        }
      }
      else {
          msg.channel.send({embed: {
            color: client.color,
            description: "**ERROR:** This bot doesn't have permission to ban members. Please grant the **Ban members** permission to the **Aoba** role."
          }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      }
    }
  }
}
