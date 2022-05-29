const { MessageEmbed } = require("discord.js")
const { Guild } = require("../../models/indexMongo")

module.exports = {
    name: "setlogchannel",
    description: "Configurer le channel de logs",
    category: 'configuration du bot',
    ownerOnly: false,
    usage: 'logChannel <channel>',
    examples: ['logChannel <channel>'],
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "channel",
            description: "Salon où vous voulez que j'envoie les logs",
            type: 'CHANNEL',
            required: true,
        }
    ],
    runSlash: async (client, interaction) => {
        await interaction.deferReply();
        const channelLog = interaction.options.getChannel('channel')
        const guildID = interaction.guild.id
        channelLogID = channelLog.id
        const logSet = new Guild({ idGuild: guildID, logChannel: channelLogID})
        logSet.save().then(i => console.log(`Channel log = ${i.channelLogID}`))
        await interaction.editReply({content: `Salon de logs créé : <#${channelLogID}>.`})
    }
}