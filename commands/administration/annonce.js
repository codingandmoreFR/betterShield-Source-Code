const { MessageEmbed } = require("discord.js")
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


        db.all(`SELECT channel, actif FROM config_annonce WHERE id = "${interaction.guild.id}"`, async (err, data) => {

            const channelid = data[0].channel
            const channel = interaction.guild.channels.cache.get(channelid);


            if(!data[0]){
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Channel d'annonce non configuré !")
                .setDescription("Veuillez configurer un channel d'annonce !\n<a:arrowok:973641633524506624> `/config_annonce activé <channel>`")
                .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                return await interaction.reply({embeds: [embed], ephemeral: true })
            }

            if(!data[0].actif){
                await interaction.reply({ content: `<:nope:973641602725736588> Le système d'annonce est désactivé sur le serveur <a:arrowok:973641633524506624> /config_annonce activé <channel> ! `, ephemeral: true })
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Système d'annonce désactivé !")
                .setDescription("Veuillez activer le système d'annonce !\n<a:arrowok:973641633524506624> `/config_annonce activé <channel>`")
                .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                return await interaction.reply({embeds: [embed], ephemeral: true })
            }
            
            let embed = new MessageEmbed()
                .setColor(colorEmbed)
                .setTitle(titreAnnonce)
                .setDescription(contenu)
                .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
            if (!rolePing) {
                channel.send({ embeds: [embed] })
                await interaction.reply({ content: `Annonce envoyée au channel <a:arrowok:973641633524506624> <#${channelid}>!`, ephemeral: true })
            } else {
                channel.send({ content: `||${rolePing}||`, embeds: [embed] })
                await interaction.reply({ content: `Annonce envoyée au channel <a:arrowok:973641633524506624> <#${channelid}>!`, ephemeral: true })
            }

        })

    }
}

