const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    category: 'utiles',
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    permissions: [],
    runSlash: async (client, interaction) => {
        await interaction.deferReply();
        let ping = client.ws.ping
        let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle("Ping")
        .addFields(
            { name: "Latence", value: `\`\`\`${ping}ms\`\`\``, inline: false },
            { name: "Démarré", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false}
        )
        .setTimestamp()
        .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        await interaction.editReply({embeds : [embed]})
    }
}