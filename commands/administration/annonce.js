const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "annonce",
    description: "Lancer une annonce",
    category: 'administration',
    ownerOnly: false,
    usage: 'annonce',
    examples: ['annonce <channel> <titre> <contenu> <couleur>'],
    permissions: ['ADMINISTRATOR'],
    run: (client, message, args) => {
        let embedGoToSlashCommand = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Utilisation des Slash Commands")
        .setDescription("Hey, je t'invite à utiliser les slash commands ! C'est plus facile pour moi de comprendre et ça te permet d'avoir plus de facilité lors de l'execution des commandes !")
        .setTimestamp()
        message.reply({embeds: [embedGoToSlashCommand]})
    },
    options: [
        {
            name: "channel",
            description: "Salon où l'annonce sera envoyé",
            type: 'CHANNEL',
            required: true
        },
        {
            name: "titre",
            description: "Titre de l'annonce",
            type: 'STRING',
            required: true
        },
        {
            name: "contenu",
            description: "Contenu de l'annonce",
            type: "STRING",
            required: true
        },
        {
            name: "couleur",
            description: "Couleur de l'annonce",
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
        },
        {
            name: "role",
            description: "Role à ping",
            type: "ROLE",
            required: false
        }
    ],
    runSlash: async (client, interaction) => {
        let channelID = interaction.options.getChannel("channel")
        let titreAnnonce = interaction.options.getString("titre")
        let contenu = interaction.options.getString("contenu")
        let colorEmbed = interaction.options.getString("couleur")
        let rolePing = interaction.options.getRole("role")
        let embed = new MessageEmbed()
        .setColor(colorEmbed)
        .setTitle(titreAnnonce)
        .setDescription(contenu)
        .setFooter({text: `Par ${interaction.user.tag}`})
        .setTimestamp()
        if(!rolePing){
            channelID.send({embeds: [embed]})
            interaction.reply({content: "Annonce envoyée !", ephemeral: true})
        }else{
            channelID.send({content: `||${rolePing}||`, embeds: [embed]})
            interaction.reply({content: "Annonce envoyée !", ephemeral: true})
        }   
    }
}