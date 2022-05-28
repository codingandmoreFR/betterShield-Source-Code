const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    category: 'utils',
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
    runSlash: (client, interaction) => {
        let ping = client.ws.ping
        let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle("Ping")
        .addFields(
            { name: "Latence", value: `\`${ping}ms\``, inline: true },
            { name: "Démarré à", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
        interaction.reply({embeds : [embed]})
    }
}