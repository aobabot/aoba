module.exports = { name: "ban", run(client, msg, args) {
  if (args.length === 0) { //if no arguments are given
    return msg.channel.send({embed: {
          color: 0xffa3e7,
          description: "❗️Missing arguments!"
      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  console.log(args); //debugging
  var joined = args.join(" ");
  var arg = (joined.includes("\"")) ? joined.split("\"") : joined.split("“");
  console.log(`Arguments: ${arg}`); //debugging
  var name = arg[0];
  console.log(`Name given: ${name}`); //debugging
  var reason = ((arg[1] !== undefined) && arg[1].includes("”")) ? arg[1].slice(0, arg[1].length - 1) : arg[1]; //quotes are wonky
  console.log(`Reason given: ${reason}`);
  var canBan = msg.member.hasPermission("BAN_MEMBERS");
  if (canBan == false) { //if msg author doesn't have permission
    msg.channel.send({embed: {
        color: 0xffa3e7,
        description: "❗️ You don't have permission to ban members!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    //if no members are mentioned
    if (args.length < 1 || msg.mentions.members == null) {
      msg.channel.send({embed: {
          color: 0xffa3e7,
          description: "❗️ Please @ a member to ban!"
      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    }
    else { //starts banning member
      var member = msg.mentions.members.first();
      var name = member.user.username;
      if(msg.guild.me.hasPermission("BAN_MEMBERS") && member.bannable) {
        if (reason !== undefined) {
          msg.guild.ban(member, {reason: reason}).then(() => {msg.channel.send({embed: {
                color: client.color,
                description: `**${name}** was banned from ${msg.guild.name}! 👋\n**Reason:** ${reason}`
          }}).then(msg => {msg.delete(10000000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(() => {msg.channel.send({embed: {
          color: client.color,
          description: "❗️ Member could not be banned!"
      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error)})});
        }
        else {
          msg.guild.ban(member).then(() => {msg.channel.send({embed: {
                color: client.color,
                description: `**${name}** was banned from ${msg.guild.name}! 👋`
          }}).then(msg => {msg.delete(10000000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(() => {msg.channel.send({embed: {
          color: client.color,
          description: "❗️ Member could not be banned!"
      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error)})});
        }
      }
      else { //aoba doesn't have permission to ban members
          msg.channel.send({embed: {
            color: client.color,
            description: "❗️ This bot doesn't have permission to ban members. Please grant the **Ban members** permission to the **Aoba** role."
          }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
    }
  }
},}
