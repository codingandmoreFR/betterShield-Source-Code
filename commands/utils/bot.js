const { MessageEmbed, Formatters } = require("discord.js")
const dayjs = require("dayjs")
module.exports = {
    name: "bot",
    description: "Affiche les infos sur le bot",
    category: 'utils',
    permissions: [],
    ownerOnly: false,
    usage: 'bot',
    examples: ['bot'],

    runSlash: async (client, interaction) => {
        await interaction.deferReply()
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Informations sur BetterShield")
        .setDescription("Si tu souhaite m'inviter sur ton serveur, tape `/invite` !")
        .addFields(
            { name: "Tag :", value: `betterShield#5613`, inline: false },
            { name: "Démarré :", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false},
            { name: "Créé le :", value: `${Formatters.time(dayjs(client.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)}`, inline: false},
            { name: "Créé par :", value: `<@698861684932214794>, <@604731411223674901>, <@596273686290497546>, <@852674430143430677>, <@381874488037343233>`, inline: false}//,
            //{ name: "Serveurs :", value: `${client.guildCount}`},
            //{ name: "Membres :", value: `${client.memberCount}`},
        )
        
        await interaction.editReply({embeds: [embed]})
    }
}