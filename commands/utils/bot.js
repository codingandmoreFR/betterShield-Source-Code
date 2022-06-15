const { MessageEmbed, Formatters } = require("discord.js") //importation de MessageEmbed, Formatters pour pouvoir créer des embeds et utiliser le système de temps
const dayjs = require("dayjs") //importation de dayjs pour savoir la date
module.exports = { //handler
    name: "bot", //nom de la commande
    description: "Affiche les infos sur le bot", //description de la commande
    category: 'utiles', //catégorie de la commande
    permissions: [], //permissions de commande (comme par exemple "ADMINISTRATOR")
    ownerOnly: false, //owner du bot (créateurs)
    usage: 'bot', //usage de la commande
    examples: ['bot'], //exemple d'utilisation

    runSlash: async (client, interaction) => { //handler
        await interaction.deferReply() //pour que le bot mette "<nom du bot> réfléchit"
        let embed = new MessageEmbed() //créée un embed (pour la beauté des messages)
        .setColor("RANDOM") //couleur de l'embed
        .setTitle("Informations sur <bot>") //titre de l'embed
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true })) //avatar du bot
        .setDescription("Si tu souhaite m'inviter sur ton serveur, tape `/invite` !") //change la description de l'embed si tu le souhaite
        .addFields( //ajout de fields
            { name: "Tag :", value: `betterShield#5613`, inline: false }, //tag du bot
            { name: "Démarré :", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false}, //date de démarrage du bot
            { name: "Créé le :", value: `${Formatters.time(dayjs(client.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)}`, inline: false}, //date de création du bot
            { name: "Créé par :", value: `<@698861684932214794>, <@604731411223674901>, <@596273686290497546>, <@852674430143430677>, <@381874488037343233>, <@755447668595097734>`, inline: false}, //créateurs du bot (ping)
            { name: "Serveurs :", value: `${client.guilds.cache.size.toString()}`}, //nombre de serveurs
            { name: "Membres :", value: `${client.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b)}`}, //nombre de membres dans tous les serveurs réunnis
            { name: "Salons :", value: `${client.channels.cache.size.toString()}` } //combre de salons dans tous les serveurs réunis
        ) //close les fields
        
        await interaction.editReply({embeds: [embed]}) //edition du deferReply ("<nom du bot> réfléchit" pour envoyer l'embed)
    } //fermeture handler
}//fermeture handler

/*
Codé par Malcolm#2939
Si tu veux plus d'infos sur la commande, envoie moi un message privé !
*/