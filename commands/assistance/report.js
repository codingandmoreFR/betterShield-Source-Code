const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "report",
    description: "Signale un problème à l'équipe de développement du bot (tout abus sera sanctionné)",
    category: 'assistance',
    ownerOnly: false,
    usage: 'report <problème>',
    examples: ['report <problème>'],
    permissions: [],
    options: [
        {
            name: "signalement",
            description: "Signale le problème que tu as",
            type: 'STRING',
            required: true
        }
    ],
    runSlash: async (client, interaction) => {
        await interaction.deferReply();
        let contenu = interaction.options.getString("signalement")
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Signalement !")
        .addField("Contenu :", contenu)
        .addField("ID du signaleur :", `${interaction.user.id}`)
        .addField("Nom du signaleur :", `${interaction.user.tag}`)
        .setTimestamp()
        await interaction.editReply(`Signalement envoyé !`)
        client.guilds.cache.get("916457476679938128").channels.cache.get('981225409603567676').send({embeds: [embed]})
    }
}