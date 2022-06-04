const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
// const { Guild } = require("../../models/indexMongo")
const { db } = require("../../index")

module.exports = {
    name: "annonce",
    description: "Lancer une annonce",
    category: 'administration',
    ownerOnly: false,
    usage: 'annonce <channel> <titre> <contenu> <couleur>',
    examples: ['annonce <channel> <titre> <contenu> <couleur>'],
    permissions: ['ADMINISTRATOR'],
    options: [
        // {
        //     name: "channel",
        //     description: "Salon où l'annonce sera envoyé",
        //     type: 'CHANNEL',
        //     required: true
        // },
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
        //let channelID = interaction.options.getChannel("channel")
        let titreAnnonce = interaction.options.getString("titre")
        let contenu = interaction.options.getString("contenu")
        let colorEmbed = interaction.options.getString("couleur")
        let rolePing = interaction.options.getRole("role")

        await interaction.deferReply();

        db.all(`SELECT channel FROM config_annonce WHERE id = "${interaction.guild.id}"`, async (err, data) => {

            const channelid = data[0].channel
            const channel = interaction.guild.channels.cache.get(channelid);

            let embed = new MessageEmbed()
                .setColor(colorEmbed)
                .setTitle(titreAnnonce)
                .setDescription(contenu)
                .setFooter({ text: `Par ${interaction.user.tag}` })
                .setTimestamp()
            if (!rolePing) {
                channel.send({ embeds: [embed] })
                await interaction.editReply({ content: `Annonce envoyée au channel <a:arrowok:973641633524506624> <#${channelid}>!`, ephemeral: true })
            } else {
                channel.send({ content: `||${rolePing}||`, embeds: [embed] })
                await interaction.editReply({ content:  `Annonce envoyée au channel <a:arrowok:973641633524506624> <#${channelid}>!`, ephemeral: true })
            }

        })

    }
}


// const fetchGuild = await Guild.test.find(interaction.guild)(interaction.guild)
        // console.log("Guild id: " + fetchGuild.idGuild)
        // console.log("Channel id: " + fetchGuild.logChannel)
        // if(fetchGuild){
//}