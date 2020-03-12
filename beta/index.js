// Load up the discord.js library

console.log("(BETA)Loading Libary")
const Discord = require("discord.js");
const randomPuppy = require("random-puppy");
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log("(BETA)Logged in!")
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  sleep = function(time) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {;
  }
  return new Promise((r, _) => r()
)
}
console.log("(BETA)Setting Activity...")
client.user.setActivity(`Starting up...`);
sleep(10000 * 1).then(() => console.log("(BETA)Done!"))
 
 client.user.setActivity('Boggy Beta', { type: 'WATCHING' });

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
 client.user.setActivity('Boggy Beta', { type: 'WATCHING' });

});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
 client.user.setActivity('Boggy Beta', { type: 'WATCHING' });
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
    // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say

  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
	
    if (command === "setup") {
       if(message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.channel.send("Roles are already setup!");
      message.guild.createRole({
    name: 'Staff',
    permissions: ['READ_MESSAGES']
}).then((role)=>{
    message.member.addRole(role.id);
    message.delete();
    return message.channel.send("Role Created!");
}).catch((e)=>{
    message.author.send(e);
});
      
    }
    if(command === "version") {
  
    return message.channel.send("BoggyBot Version 1.0");
    
  }
  if(message.content.indexOf(config.prefix) !== 0) return;
  

  // Let's go with a few common example commands! Feel free to delete or change those.
  if(command === "setup") {
	guild.createRole({
  	name: 'Staff',
  	color: 'BLUE',
})
  	.then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
  	.catch(console.error)
} 

  if(command === "idea") {
      var idee = args.join(' ');
      if(!idee) return message.channel.send("Invalid Format! !idea [idea]");
      var ideeEmbed = new Discord.RichEmbed()
      .setTitle("Voting")
      .addField("Idea:", idee)
      .addField("Sent by:", message.author)
      .addField("React to vote");
      
      var ideeChannel = message.guild.channels.find("name", "votes");
      if(!ideeChannel) return message.channel.send("Could not find #votes channel");
      
      ideeChannel.send(ideeEmbed).then(embedMessage => {
        ideeChannel.send("@here");
        embedMessage.react('👍');
        embedMessage.react('👎');
        
        });
      
  }
  if(command === "help") {
    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.channel.send("Please check if you have the @Staff permission!");
    const helpEmbed = new Discord.RichEmbed()
            .setColor("RANDOM")
			.setThumbnail(`http://ih1.redbubble.net/image.15391484.7669/fc,550x550,white.u1.jpg`)
    	    .setTitle(`BoggyBot Help Menu`)

           .addField(`**+setup** Creates a Staff role (ASSIGN STAFF ROLE! ELSE YOU CANT USE ANY COMMANDS!`)

            .addField(`**+idea [idea]** Creates an message in #votes`)
            .addField(`**+meme** for if you want to have a break`)
            .addField(`**+premium** Coming soon`)
            .addField(`**+help** Shows this`)
            .addField(`**+kick [player] [reason]** Kicks A Player`)
            .addField(`**+ban [player] [reason]** bans a player`)
            .addField(`**+giveaway [winners] [time in minutes] [prize]** allows you to start a giveaway`)
            .addField(`**+clear** Clears Chat`)
            .addField(`**+say [message]** Say something as the bot`);
            
            
        message.channel.send(helpEmbed);
  }
  
  if (command === "premium") {
    
  return message.channel.send("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GXXJ6AKKCAM4G&source=url after you donated please join our discord and contact us to claim your prize! Invite: https://discord.gg/u4FbsC3 ");
  
  }
   if (command === "meme") {
     
  const { RichEmbed } = require("discord.js");
 const subReddits = ["memes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)

        message.channel.send(embed);
  
  
  
  
  }

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if (command === "giveaway") {

    var item = "";
    var time;
    var winnerCount;
    
   if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      
      winnerCount = args[0];
      time = args[1];
      item = args.splice(2,args.length).join(" ");
      
      message.delete();
      
      var date = new Date().getTime();
      var dateTime = new Date(date + (time * 60000));
      
      var embed = new Discord.RichEmbed()
        .setTitle("**Giveaway**")
        .setFooter(`Ends: ${dateTime}`)
        .setDescription(item);
      
      var embedSend = await message.channel.send(embed);
      embedSend.react("🎉");
      
      setTimeout(function() {
        
        var random = 0;
        var winners = [];
        var inList = false;
        
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
        
        for (let i = 0; i < peopleReacted .length; i++) {
            
            
            if(peopleReacted[i].id == client.user.id){
              peopleReacted.splice(i,1);
              continue;
            
          }
        }
        
        if(peopleReacted.length == 0) {
          return message.channel.send("Could not get winner!");
          
        }   
        
        if(peopleReacted.length < winnerCount){
          return message.channel.send("Could not get winner!");
          
        }
        
        for (let i = 0; i < winnerCount; i++) {
          
          inList = false;
          
          random = Math.floor(Math.random() * peopleReacted.length);
          
          for (let y = 0; y < winners.length; y++) {
            
            if(winners[y] == peopleReacted[random]){
              inList = true;
              i--;
              break;
            
          }
          
        }
        
        if(!inList){
          
          winners.push(peopleReacted[random]);
        }
        
        
          
        }
        for (let i = 0; i < winners.length; i++) {
        
        message.channel.send("You won " + winners[i] + `!`);
        
        }
      }, time * 60000);
  }
  if(command === "say") {
    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("This user is immune!");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Please provide a reason";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Error : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} Reason: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("This user is immune!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Please provide a reason";
    
    await member.ban(reason)
      .catch(error => message.reply(`Error : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} Reason: ${reason}`);
  }
  
  if(command === "clear") {
    // This command removes all messages from all users in the channel
 if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
 message.delete().catch(O_o=>{}); 
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages();
    message.channel.bulkDelete(fetched)
  const fetched2 = await message.channel.fetchMessages();
    message.channel.bulkDelete(fetched2)
     const fetched3 = await message.channel.fetchMessages();
    message.channel.bulkDelete(fetched3)
    
    message.channel.send("Chat Was Cleared By An Administrator")
    const fetched4 = await message.channel.fetchMessages();
    sleep(3000 * 1).then(() => message.channel.bulkDelete(fetched4))
     
    
    
      .catch(error => message.reply(`Error: ${error}`));
  }
});
console.log("(beta)Logging in...")
client.login(process.env.betatoken);
