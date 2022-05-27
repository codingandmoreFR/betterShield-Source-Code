const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    run: (client, message, args) => {
        let ping = client.ws.ping
        let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle("Ping")
        .addFields(
            { name: "Latence", value: `\`${ping}ms\``, inline: true },
            { name: "Démarré à", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()})
        message.channel.send({embeds : [embed]})
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