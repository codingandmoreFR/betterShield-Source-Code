const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "report",
    description: "Signale un problème à l'équipe de développement du bot",
    category: 'assistance',
    ownerOnly: false,
    usage: 'report <problème>',
    examples: ['report <problème>'],
    permissions: [],
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
        await interaction.editReply({embeds : [embed]})
    }
}