const { MessageEmbed } = require("discord.js") //importation de MessageEmbed pour créer des embeds

module.exports = { //handler
    name: "ping", //nom de la commande
    description: "Affiche la latence du bot", //description de la commande 
    category: 'utiles', //catégorie de la commande
    ownerOnly: false, //owner du bot seulement (oui/non)
    usage: 'ping', //comment on utilise la commande
    examples: ['ping'], //exemples d'utilisation
    permissions: [], //permissions (par exemple "ADMINISTRATOR"), ici aucune car tout le monde peut le faire
    runSlash:  (client, interaction) => { //handler
        let ping = client.ws.ping //récupération de la latence
        let embed = new MessageEmbed() //création d'un embed
        .setColor('RED') //couleur rouge sur l'embed
        .setTitle("Ping") //titre de l'embed
        .addFields( //ajout de fields
            { name: "Latence", value: `\`\`\`${ping}ms\`\`\``, inline: false }, //affichage d'un field avec la latence
            { name: "Démarré", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false} //affichage de la date de démarrage du bot
        ) //fermeture des fields
        .setTimestamp() //ajoute de la date et l'heure dans le footer de l'embed
        .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }) // affichage du nom d'utilisateur et de sa photo de profil dans le footer
        interaction.reply({embeds : [embed]}) //envoi de l'embed
    } //fermeture de l'handler
} //fermeture de l'handler

/*
Codé par Malcolm#2939
Si tu veux plus d'infos sur la commande, envoie moi un message privé !
*/