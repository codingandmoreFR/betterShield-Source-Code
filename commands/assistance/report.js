const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "report",
    description: "Signale un problème à l'équipe de développement du bot",
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
            required: 'true'
        }
    ],
    runSlash: async (client, interaction) => {
        await interaction.deferReply();
        let contenu = interaction.options.getString("signalement")
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({text: `${interaction.user.tag}, ${interaction.user.id}`})
        .setDescription(contenu)
        .setTimestamp()
        await interaction.editReply({embeds : [embed]})
    }
}