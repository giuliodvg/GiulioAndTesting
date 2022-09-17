const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"] }
)


client.login(process.env.token)

client.on("ready", () => {
    let embed = new Discord.MessageEmbed()
    .setTitle("BOT ONLINE")
    .setDescription("il tuo bot è online")
    .setColor("#00ff44")
    client.channels.cache.get("1020358245593919559").send({ embeds: [embed] })
       console.log("Il bot è online");
    client.user.setActivity('!help', { type: 'PLAYING' }); 
})

client.on("messageCreate", message => {
    if (message.content == "!serverinfo") {
        let server = message.guild;
        let embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField("Owner", client.users.cache.get(server.ownerId).username, true)
            .addField("Server id", server.id, true)
            .addField("Members", server.memberCount.toString())
            .addField("Channels", server.channels.cache.size.toString())
            .addField("Server created", server.createdAt.toDateString(), true)
            .addField("Boost level", "Level " + (server.premiumTier != "NONE" ? server.premiumTier : 0) + " (Boost: " + server.premiumSubscriptionCount + ")", true)
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!kick")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.kickable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.kick()
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("utente kicckato")
                    .setDescription("Utente kickato da uno staffer bello")
                message.channel.send({ embeds: [embed] })
            })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!userinfo")) {
        let utente
        if (message.content == "!userinfo") {
            utente = message.member;
        }
        else {
            utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        let elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence ? utente.presence.status : "offline", true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "No", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined this server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\n"))
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!mute")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        utente.roles.add("idRuolo")
        let embed = new Discord.MessageEmbed()
            .setTitle("Utente mutato")
            .setDescription("Utente Mutato")
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!unmute")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        utente.roles.remove("idRuolo")
        let embed = new Discord.MessageEmbed()
            .setTitle("UTENTE SMUTATO")
            .setDescription("Utente smutato!")
        message.channel.send({ embeds: [embed] })
    }
})


client.on("messageCreate", message => {
    if (message.content.startsWith("!ban")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.bannable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.ban()
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Utente bannato")
                    .setDescription("Ho bannato l'utente")
                message.channel.send({ embeds: [embed] })
            })
    }

    if(message.content == "!host")
    message.channel.send("Hosted by: heroku dal 16/9/2022")

})

client.on("messageCreate", message => {
    if (message.content == "!comando") {
        let button1 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("PRIMARY")
        let row = new Discord.MessageActionRow()
            .addComponents(button1)
        message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row] })
    }
})