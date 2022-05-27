const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config/config.json")
const { readdirSync } = require("fs")
const commandFolder = readdirSync("./commands")

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes du serveur",
    category: 'utils',
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
            name: "commande",
            description: "Nom de votre commande",
            type: 'STRING',
            required: false
        }
    ],
    runSlash: (client, commands) => {
        const cmdName = interaction.options.getString("commande")
        if(!cmdName){
            const noAgrsEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commandes disponibles")
            .setDescription("SI tu souhaite avoir plus d'informations sur une commande, tape `/help <commande>`.")
            .setTimestamp()
            for (const category of commandFolder){
                noAgrsEmbed.addField(`${category}`, `${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}`)
            }
            return interaction.reply({embeds: [embed]})
        }
    }
}        