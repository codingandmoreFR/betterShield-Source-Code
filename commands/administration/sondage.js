const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "sondage",
    description: "Lancer un sondage",
    run: (client, message, args) => {console.log(".")},
    options: [
        {
            name: "channel",
            description: "Salon où le sondage sera envoyé",
            type: 'CHANNEL',
            required: true
        },
        {
            name: "titre",
            description: "Titre du sondage",
            type: 'STRING',
            required: true
        },
        {
            name: "contenu",
            description: "Contenu du sondage",
            type: "STRING",
            required: true
        },
        {
            name: "couleur",
            description: "Couleur du sondage",
            type: "STRING",
            required: true,
            choices: [
                { name: "noir", value: "BLACK" }, 
                { name: "blanc", value: "WHITE" }, 
                { name: "bleu", value: "BLUE" }, 
                { name: "vert", value: "GREEN" }, 
                { name: "rouge", value: "RED" }, 
                { name: "rose", value: "PINK" }, 
                { name: "violet", value: "PURPLE" }, 
                { name: "aléatoire", value: "RANDOM" }
            ]
        }
    ],
    runSlash: (client, interaction) => {
        if(interaction.member.permissions.has('ADMINISTRATOR')){
            let channelID = interaction.options.getChannel("channel")
            let titreSondage = interaction.options.getString("titre")
            let contenu = interaction.options.getString("contenu")
            let colorEmbed = interaction.options.getString("couleur")
            let embed = new MessageEmbed()
            .setColor(colorEmbed)
            .setTitle(titreSondage)
            .setDescription(contenu)
            channelID.send({embeds: [embed]})
            interaction.reply({content: "Sondage envoyé !", ephemeral: "true"})
        }else{
            interaction.reply({content: "Tu n'a pas les permissions pour lancer un sondage !", ephemeral: "true"})
        }
    }
}