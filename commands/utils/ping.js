const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    category: 'utiles',
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    permissions: [],
    run: (client, message, args) => {
        let embedGoToSlashCommand = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Utilisation des Slash Commands")
        .setDescription("Hey, je t'invite à utiliser les slash commands ! C'est plus facile pour moi de comprendre et ça te permet d'avoir plus de facilité lors de l'execution des commandes !")
        .setTimestamp()
        message.reply({embeds: [embedGoToSlashCommand]})
    },
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
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
        await interaction.editReply({embeds : [embed]})
    }
}