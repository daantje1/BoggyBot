// Load up the discord.js library
require('http').createServer().listen(3000)

console.log("Loading Libary")
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
  console.log("Logged in!")
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  sleep = function(time) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {;
  }
  return new Promise((r, _) => r()
)
}
console.log("Setting Activity...")
client.user.setActivity(`Starting up...`);
sleep(10000 * 1).then(() => console.log("Done!"))
 
 client.user.setActivity('${client.guilds.size} servers', { type: 'WATCHING' });

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity('${client.guilds.size} servers', { type: 'WATCHING' });

});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity('${client.guilds.size} servers', { type: 'WATCHING' });

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
    	    .setThumbnail('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIWEhUWEhMYEBcXGBUbGBIdFxUWFhYWFxMYHSggGBolHRUTITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzIlHyUtLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLSsrLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcDBAYBAgj/xAA+EAABAwIDBQUGBAQFBQAAAAABAAIDBBEFBhIHITFBURMiYXGRFCMyQlKBM3KSoRVTseEWJGKCwSU0Q6LR/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQFAQIDBgf/xAAxEQEAAgIBBAAEBQQBBQEAAAAAAQIDBBEFEiExEyJBUQYUFTJhQlJxkSMkM4Gh0Rb/2gAMAwEAAhEDEQA/ALxQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBzmes0tw6n7Yt1ku0sb1KDl6bO2JCIzuoC5hF2gOFwPJVf6xq/E+H3eW3ZPHKdwDaDSVLmxuJhlIF2SAt39BfirGmSt45rPLV1y3EViuY6WmDjNOxhaLkFwv6IInL+0KgrJOyhlu/oRa/lfig6tAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQVft0Y0x0QebNNUL+i47E2jFaa++GY9uuoQBGwDhobb0Xy/J5vPKSi8yZYp6xhD2AP+SQbnNPLvBStPeza1omk+PsxNYlWU+N4tDUNwuSo0Mee5Lbvlv517ivUq31Zz09x9P5cO3zw7vDNn9HG7tJGmokI7zpSXX9V5DZ6ztZvHdx/h2ikQgMfwyCLFaQQRtjN+8GC3PwV/wDh7NlyVt3zM/5c8kQuYL0jm9QEBAQEBAQEBAQEBAQEBAQEBAQEBBpYli0NPbtpAy/C54oKt2610UtPSGORr/8AMg7iD0WmSPkn/Eju8NN4Y/yN/ovluX98/wCUpsLmIXG8swVUkcslw+M3aRxUzX3cmCs0r6liaxKYuGt3mwA3k+CiebT4ZVzk138QxiWpBvHAdLehsvovSdX8vrxE+5R7zzK5FZtRAQEBAQEBAQEBAQEBAQEBAQEBAQeEoKk260YliinbNGRCe9Hq3vvysCtbRzEwKyOJ0MzR21HPHwsYvhB62Krfye9j/ZeJj+eWPjYueJmP9p3DsWmZY02IkAcIp2u9LhV2bViefjYP/NXSuSs/ttDqqDPdZH/3NKJR9cLgfvp4qqydL17/APavx/FnTun6ugw/PdFLYGQxOPyvaRb7lQcvStin05j+G0WhrbRsbZHh8rmSNcXMLRpcCd48F06Vq2vtVi0epYvPhK7JMvtpKCMltpJGh7zzOrevoiO7ZAQEBAQEBAQEBAQEBAQEBAQEBAQa9ZWxxNLpHhgHEkoKZ2iZ6fUTtpaOfRGR7x45+F10xU77cI+1n+Djm3HKKw7LcNrveZj1JJVri1ccR93kdrq2zeePSdZTsAADRYcNylRWIVU3tM8zLDNh0T/iYFrbHW3uG9NjLTzWyPly+AbwyOiI4W4KBsdK180earPX63sYv3Ty0p/aYxaaFlS2/G3eCo9j8P3r5w24X2v13Bk8X8MBpsNqrse+SlI4tN9N1UXrv6lue3uW9MuLJHNZTWG7RZaGWOAzNqYNzdQ4sHBW2nnyZq83rxLNuK/VbOF5voqg2inaT0upbCV9ti/mN/UEGWORrvhIPkUH2gICAgICAgICAgICAgICAgIKJ2n1LpsWbBLIWwtiB03sCSTxXfXpW1+LIHUs18WCbY/bDBgFF8rW+epW0YMX0h5C+/t/1TP+kpSUjI22jFh53XWtYrHEIeTLfJPN/bMtnMQEBBrVWHxSCz42m/Hd/wArW1K29w648+THPNbI9+F0dKxzxEALb+d1ynHjxxM8JUbO1s3indzLDk7Zu/EXmrdqo4CfdtbfXJb5j0Cpst4tbmI4e21cN8WOK3tzK1ItntE1oBDyQN7i93rxXNJcHmeVmHFxosVaHtN3U8hvfwBQdXstz+7FGvbJF2ckfEt3scOG48boO+QEBAQEBAQEBAQEBAQEBBXeas7TPqPYsOGuXhI/iI0H1Q7MopXdviDzVTOaAb7g3wFkYmIn2w45sfo5R7lz6c/6Sd6z3T92vw6faHBV+R8YoN8T+3jBNmjeSPFdsezkp6lD2Om6+bzNfLYwnHw93ZTMMMwHeaefkrPBs1yePq8rvdLya3zR5qm1KVQgICCBrozVVsFI3eNQdIOouq7eyf0w9N0HW55yzH+F90sDY2NY0ABoAAHKyrHqHAbYselggZDE7QZnhjndATY71pkt21m32aZLdtZs4KXKtHGGNkhdM943vuTv6krzf57YvM2i3ER9FB+cz3mZi3HD62eN9gxnsGE6Jo+HTmrvRzzmxd0+1xp5py4+6V/qYlCAgICAgICAgICAgICCMzNVmGknkbxZE4j7BBS+U8X9hw99Y1uupqZHaSeVz/dYtMVjmWLTxHMsk+K42yPtfaWFwGox23242VXXquOcnbx4+6tr1Kk37ePH3WJsyzj/ABGAl40yxnTIPHqrWJ58rOJ5dmgqLblgrWNgrIhpkbIGvI5gralpraJhyz0i+O1Z+zVpX3Y09WhehrPMPnOSOLzDKstBAQQ+UqlsWO+83amjQ48FTbsT8V7fok1nVjhfSiLdA5uytDiEJiluD8jhxYeRT2K5OX8XpRoDGVDG7mPLrGw4EjkqnN0nHe3dE8KzL0zHe3MTwiNmeGz1GLyTTW9y3i3e0G9tN1YYMFcNOyqdhw1xU7ar7XZ1EBAQEBAQEBAQEBAQEGnjFH20EkX1sc31CD8+HD5nU5pWttNSzOOg/ONVwQtb17qzVrevdWYbUOZaVr9c8ckc4Zpc03tu8F53JobFfkr+3lRX0s8fJHrl0mxXDZTPPU6THE6+lp3ar81fYKTTHFZ9rrDWa0iJXCuzqrHbLXNeIKQG73yanDoBzXTDTvvEIu5m+DhtZEws0tA6ABX8RxD57aeZmX0stRAQQ2YMG7bS+N2iVhuxw8FH2MEZY/lZdO6hbVt/Ccy7tPngtDXwl2kW7VvzeYVRfBek+Yewwb2DNHNbOtj2l4eRukN/ptv9FyTInlzuMZkr8SJp6GJ0ETtz5nixtzsg7bJmWY8PpxEzvOJ1SPPF7jxJKCeQEBAQEBAQEBAQEBAQEBByWa8nCoeKiB/Y1DeDhwd4OQV3i+eGUcxgrsPjlmAB1gDvDgDb7IxM8e29TbZGMAayhexvIAGy37LfZz+Pi/uhtHazLKwiGkfqt3b7gPVbVwXt6hwy7+DH7s5zDaCaSZ1VVu1Su4DkwdArPW1vh+Z9vMdU6p+Y+Sn7U0pikEBAQEEJm2uYynk7zddu6Da6j7F4rSfusem4L5M9fE8IXIlVQU72zVUEjncXOLTpb4qg+LSZ458vfxitEevD9EYJWwzRNkgt2bh3bCy3at9AQEBAQEBAQEBAQEBAQEBAQcrm7IdJXjVIzTKAdMjTZ3hc9EYmInxKlYo66CrdQNcxxYdz3AE2W2bqltbHzPlBjoODay/b/CRmOKRu+GOVvOwDVww/iOlv3eDN+EKR+zn/AG8bmdzXaZaZ7D1AJCtcXV8F455Uef8ADOzjn5fLaGZIfpk/QV3/AFHW/uRP0Le/se/4jh+mT9BT9R1v7mP0Le/sYpszxAd2ORx/KVrPUtePVnSnQN2Z814YYMwVEn4dI7w1GyiZOua9Fhi/Cme/9QKDEqgEPe2naegufVVex+I49UXep+E8VJ5v7b2H5Op4j2sxMz+bpDcD7HgqDY6nsZ545el1+nYMEeIa2ZcegLDS04EksncY1vC58VvpaWW+SL28QbW1jrSax7W1s8wiSloYopRZ4b3h0XplE6VAQEBAQEBAQEBAQEBAQEBAQEFe59yjvfX050zMaS4Hg8DiFw2MFc1O2zrhzTit3Qr3D8/h5AfC8Dg51ja44qhy9LmvPFlvj34t7hIyZyofmePuFHjQ2PpDtO5h+ss9NmOik+F7P2WltTPX3Deuzit6lICqp/qj/Zcfh5PtLp30Y58SpmC5cz9lmuHLaeIiWLZMdfco9+b6UA6TqI5AcV3jQzfVynbxfREOzjUT3bTUztXVwICk/kMWPzlv4cPzmS/ilWFmXq6qOuqmMTfnYDyW87Wvh8Yq8z92sa+bJ5yTxH2eYFgbJMUpoqQahC8Pmf4DjvVnoWy3rN8n1QduMdZitH6OU9DEBAQEBAQEBAQEBAQEBAQEBAQYqqnbIxzHC7XAh3kUH52x0zYRWvpomCeEnW0Ed4B2+wJULZ6fXYnmJ8pGLf8Ay9fm9M0OY8MmH+YgERvvD28VVX0t3DPFZmVjj3NTLHM8JGmpcJkF2Mit6KNbJuVniZlIrTWn1EM4wvDfoi/V/dafG2vvLb4WD7Q+hhGG/RF+r+6x8fa+8s/BwfaGwaqhpxe8TB4WK07c+WePMtucWOOfCIrc8wg6aeJ0xPAtFh6qdg6Pny/u8IWfquvhjnlBY7UYnNC+V7hAxvyN+JwPir7D0OmGvfMcz/LzuT8S0zZYxUn39YXFsmwinjoo5Y4wJHt94/5neZXZJdwgICAgICAgICAgICAgICAgICAgIKf224c6OWCsYOB0yH+i6YrdtolH2sUZcU1lGvw+CoY174wbtB4K87KXiJmHg4z5sFprWzTnypTO4M0+S5W1MU/RIp1bZr/U0TkWD63epXL8hiSo69sPBkWD63epT8hiP17YSFNlWmaN7NXmutdTFX6IuTquzf8AqSlNRxxizGADyXetYj0g3y3vPNpK6ASRvYebSlo7qzBiv2Xi0Og2MYtqhfSu3OhduHUKgvXttMPomDJGTHFoWStHYQEBAQEBAQEBAQEBAQEBAQEBAQcLtbqqX2F7JpWtdxYLjUT5IxMcwr7KEsjqVhlFiNzfEcir3Wm0447ngup0x12LRjnn/wCpld1eICAgICDn8PxF2G4nHOfwZTolPJoPMqo3cU1t3PY9E2q3xfDn3C9aHF4JheKZjx4OChL1uAgoPUBAQEBAQEBAQEBAQEBAQEBBr19WyGN0jyGta0lxPgg/O+D0bK2aWplJkBmeY7k2tqNrBWOngraO6Xmus7+THf4dJda1oAAG4DgrN5eZmZ5l6jAgICD2yBZBE49WwMbpmGrVuDeZXHNelY+dO0sGfJfnF7hy7qOJp1RCePppLlXW+BPp6XHPUK+/KRw+vxBneglqSOtr/wBVxmuL7pdcm39aw3XZjxnlJUfpCxxjdIts/aHW7LqrGJpnOrXO7EfCHCxK4ylxzx5WojIgICAgICAgICAgIOWz1nWHDYwXAvkdujYOLijEzERzLkoNpNe8AtoWi43an2Uqupkn6KvJ1nVpPHL4rc9Yo4WZSxsPXXdbfkcrn+u6v3n/AE5PHsVrqodlXVMcER4tDt7vArNdTtn/AJJ4aZOsd9f+npNp/wAMdPmKip2iKM6g36BdTI2MOOO2FNbpu5s277R5n7tj/FsFtRbIG83FpsPun53ExPQ9qPpDdw7E3VVhSwySkmwdpOgX6u5LF93HEeG2Loexafm8Q2qvKGOPPcbDGPzhRLb159LjF0LDWPmnlrjKOOx95zYpAPla8XKxXdyRPlvk6Hr2jivhsUOE4vLe1I1lub32XX9Qn7In/wCdp/elaXIOISb5Z2Q+De9+6423ck+kzH0TXrHFvL4r9m9fYCOsa6571xawWs7eX7usdH1YnntZcM2R2nimqKkzdm4O023G3Jcb5LX9pmHXx4f2Rwsn+Gw/ymfpC0d2SOlY0WDGgeACD77Fv0j0CD6AQeoCAgICAgICAgICAg5/NGTqWvt7QwktHdIJBHohxy5Cn2XTRXEVe9rb7g5odbwuVIps5KRxEq/N0vWyzzarcpNnMuodvWOlj+ZoaGk/7hwWbbeWY45c6dH1KW7oqncLyHQQOLmw6yf5h128tSjzMz7WVKVpHFY4SzMDpRwp4h/sb/8AFhs+zhNORpMMdumltvSyDPS0scYtGxrB0aAB+yCPxvMdNSC88rW9BzP2QaeD52oakgRzAOPBrtxKDogUHM5ozzR0BDZ3nUflaLkeYQauAbSMPq3aWSFh5axpv5JyNnaDj81FRunp4+1cP/UfV4oOHyntIqhJGK5rXRTW0SN+QnkVHxbVMlppHuGZh1u0jNhoqZphs6WZwZDz3nfey7WtFYmZ+jDltn2acRlxD2aqka9vZlzgGgaem9cdfPGavdHpmY4W2pDAgICAgICAgICAgINDG8XipIXTTO0sbx8fJBWdbtgdqPY0xdH8rnEN1eQK6RitMco19vFWeOeXtPtamBBlo3Bh4uab2+wW04Lx9Gld/BaeO5YWW8y09czXA+9viadzm+YXGY4S4mJjmHObRs9+whsELe0qJN0Y+nxK1veKxzLetZtPEOHZnHGmOGt8P5CQCfBQY6jjnzETwlTpXj26rB9qIEgirYXQE7mv4tJ81KxbGPLHNZcMmG+P90O2xnGGQUslSCHNZGXjxsF2clHYNRmrc6urnXDnExtce60E7v2VD1DdvNvhYlLvbdpt8PG1M3midH2lO8MlYRo0c/Ra6E7Nb8W9SxpTsVvxb0uvZ7USSUELpb6y3ffivQLtU88kDquqqqogt1ua3V/pJG4Kl6lfLa8Y8ftU798lrxjxtDGZYKiG9NSy67gwvZG6xP5rLXU1dvHkibT4a62vs0vE2nwunKVI99BHHVNu4stIHdD1V4uFTZky+cNnMcoL6KZ/u3c4iT+yrd7WtP8Ay4vFo/8Abas/SU5Fk1jLVc1S6aKJhdC1xuGm24rzmbrObPHwOOJmeJdYpEeWxsZpu2lqax7TqL9MZ5aV63VwxixVrDjM8ytdSGBAQEBAQEBAQEBAQV7twpnOw4uHBjw53kkMTHMTCnq50Ur6N8+oU24TaN1h1U3ZmbVraPSk6XWmPLkx298pbCJWxVkkNPK6am4xudv0g8rrppZLTPE+kfrutiisXiOJSmzKb/rM5iuGiP3gHA2Ki7MxOSeFp0uLRrV7kdj1e6Wvq6riIWuEQPylU+9bumuP7yvdSOIm/wBm9lDIUWI4c6slkk9oLnlrtRsNJ3blOpjrSvbEeES17WnumfLHg8Zq6KWnn3uic5gdz7vO/Ved2o/K7UWp9V1rz+YwTFm/R4q6TAqmFxLjCC2/MjxXosdu6sSpb17bTCGx2p9zRQfJII9fjw3Kk6dii2xe8/SVHo44tntafpKWlzE0yvgoqGlZ2JDbvaC5xAG+ytdjarh/css+zXF+50GWc+1bauKkrIWDtd0ZjFg37LOvs0zxzRnBsUzRzVWGKSHtJy8amw1byR1GsnguNuK7ET93K3Fc8T91r5nz57JQ0slJEwduAGXHdj3cwplrdscpdp4jlBUu0LFYR29Q2CaEC7hGNJA87qHTfx3v2fVEpu47X7Pq6fO+JRVuDmdrdzgC2/FpU5McnVVrn4A0FxDnaYwefFeMx4YjqviP5dufkWRs6wb2ShijPxabuPW69m4umQEBAQEBAQEBAQEBBEZtw4VFHNERfVGf23oKLyixj4nwSNv2byLHzVvqTF8fEvHdYrfDsd9Z45TnsEcTHdkwNOk8FJ7K1ie2FV8fJlvHxJ5a+xuvpaeaf2h3ZzyuLW6twLfNUWSJ7p5e/wBe1Ph1is/Rp1lEG4hV0vyzNJYet+ip+pRNe3LH0lb6MxbnH903s/zPFQUMtHUXY+MyaLj473tZT8WamSsWiUPJitS3Ewh8lvPYVM7xpD5JHC/Q8FQ9TtF88RVb6EduGZlt7O8PNXh+IsaLl+sR+J5L0GKO2kQp7zzaZc9DTSVNNEWC81K/SW/kNv8AhVHxI1Nme71Kl741tiefUvrMo9pfG+np5IKkkdsR8JtxKn5NnXmnNp5TMmxgmvMynci0clVikWs6vZm3c7qei00McVrNo9S10scVrNo+rRzTQilxKeGUWiqSS13K7ljfx2mIyV9wbuO0xF6+4Zqb2uGmdRvphUx3Jgf9F1rj6phmvzTxLSnUcM1+afKBxHDpY4mULX6paiRoI46ATvC5a0xsZ/ixHiHPXmM+b4kR4hd2J5dDcKNM0fDCOHMgb1brRUbq8yUdNRRxv7UTjtBpPAHiqPBo5I3rZrR4+jebfLw/QeHsIiYDxDG39FeNGwgICAgICAgICAgICDwhBQmYohR4w4EaWTX0jldTNLJ234lS9b1/iYO6PcOVxzEZW1EoNSYQ38NttzlnYzZK5OIlr03S1smvE2rEynm0raqiD5G2eG3DxuNxzUzsjLi5t7Unxbam5Ncc+OfTfwfL89fQtqYXXqqc2Zf/AMoHyk9VR5sVclZpZ7jDlmvF4YmZlpn9ytgMMjdztbTvI42K87k6fsYp/wCOeYXdNzDkj548mI1Lq9oo6CNxDvifpIa0Lvo6GSMnxMrjt7lJp2Y1u5HyyzD6VsLd7re8P1FXypV9j2UauhrHz0cZngmcXSMHxMJ4qFu6ddiv8oe3qRnr/LyrdXSjs4aJ8b37tbtNm35myq8PR7xaJvbwr8XSrRbm8+HeZFymygisTrlfvlf1PQK/rWKxxC7rWKxxD3POTocSh0P7kg/CkHFp5LZlXYy/jdI0QsbHUtA7rxcetyqvN0nDkv3elbl6Zivbu9J7Z1kWWOZ1bX2M5/Dbyj8fNT8OGuKvbVOxYq4q9tVmLq6MLaSMHUGNB66Rf1QZkBAQEBAQEBAQEBAQEBByG0HJbMQj1A6J498Lh16HwWYnieYa2rFoms+lP10MkZDa6iLnt3BwB71uanRtUtHzx5UN+lZ8czGC/ESlGYJiFaGRQwGnhcBd56LGXc7o7aem2n0bsv8AEzTzK4co5fZQ07YGb7fEepUFfM2J5epaggywseRwJAQbdHQRRANjY1gHCwCDZQEHlkHqAgICAgICAgICAgICAgICAgICAgIMckLXfE0O8wCg+wLcNyD1AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQf/2Q==')
            .setTitle(`BoggyBot Help Menu`)
            .addField(`**!idea [idea]** Creates an RichEmbed in #votes`)
            .addField(`**!meme** for if you want to have a break`)
            .addField(`**!donate** Help this bot and my server!`)
            .addField(`**!help** Shows this`)
            .addField(`**!kick [player] [reason]** Kicks A Player`)
            .addField(`**!ban [player] [reason]** bans a player`)
            .addField(`**!giveaway [winners] [time in minutes]** allows you to start a giveaway`)
            .addField(`**!clear** Clears Chat`)
            .addField(`**!say [message]** Say something as the bot`);
            
            
        message.channel.send(helpEmbed);
  }
  
  if (command === "donate") {
    
  return message.channel.send("You can help us make this bot better here: https://patreon.com/discordsocialclub");
  
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
console.log("Logging in...")
client.login(process.env.token);
