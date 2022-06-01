const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const { Guild } = require("../../models/indexMongo")

module.exports = {
    name: "annonce",
    description: "Lancer une annonce",
    category: 'administration',
    ownerOnly: false,
    usage: 'annonce <channel> <titre> <contenu> <couleur>',
    examples: ['annonce <channel> <titre> <contenu> <couleur>'],
    permissions: ['ADMINISTRATOR'],
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
        await interaction.deferReply();
        let embed = new MessageEmbed()
        .setColor(colorEmbed)
        .setTitle(titreAnnonce)
        .setDescription(contenu)
        .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        if(!rolePing){
            channelID.send({embeds: [embed]})
            await interaction.editReply({content: "Annonce envoyée !", ephemeral: true})
        }else{
            channelID.send({content: `||${rolePing}||`, embeds: [embed]})
            await interaction.editReply({content: "Annonce envoyée !", ephemeral: true})
        }
        const fetchGuild = await client.getGuild(interaction.guild)
        console.log("Guild id: " + fetchGuild.idGuild)
        console.log("Channel id: " + fetchGuild.logChannel)
        if(fetchGuild){
            client.guilds.cache.get(interaction.guild).channels.cache.get(fetchGuild.logChannel).send("Annonce")
        }   
    }
}