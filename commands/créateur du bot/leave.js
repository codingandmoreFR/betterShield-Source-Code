const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "leave",
    description: "Fait quitter le serveur",
    category: 'fonda',
    permissions: [],
    run: (client, message, args) => {
        if(message.author.id === "698861684932214794"){
            message.channel.send("Je quitte le serveur.").then(
                message.guild.leave()
            )
        }
    }
}