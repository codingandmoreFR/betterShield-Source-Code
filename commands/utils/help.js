/*const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config/config.json")
const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes du serveur",
    permissions: [],
    run: (client, message, args) => {
        (await pGlob(`${process.cwd()}/commands/utils/*.js`)).map(async (commandFileMod) => {
            const cmdMod = require(commandFileMod)
            let embed = new MessageEmbed()
            .setTitle("Commandes")
            .setDescription(`Mon préfixe est ${prefix}, les SlashCommands sont activées !`)
            .addFields(
                { name: "Modération", value: `Mod`, inline: false },
                { name: "Administration", value: `Admin`, inline: false },
                { name: "Utiles", value: `${cmdMod.name}`, inline: false },
                { name: "Jeux", value: `Jeux`, inline: false },
                { name: "Musique", value: `Musique`, inline: false },
                { name: "Configuration serveur", value: `conf`, inline: false }
            )
            message.channel.send(embed)
        })
        
    },
    runSlash: (client, commands) => {
        (await pGlob(`${process.cwd()}/commands/utils/*.js`)).map(async (commandFileMod) => {
            const cmdMod = require(commandFileMod)
            let embed = new MessageEmbed()
            .setTitle("Commandes")
            .setDescription(`Mon préfixe est ${prefix}, les SlashCommands sont activées !`)
            .addFields(
                { name: "Modération", value: `Mod`, inline: false },
                { name: "Administration", value: `Admin`, inline: false },
                { name: "Utiles", value: `${cmdMod.name}`, inline: false },
                { name: "Jeux", value: `Jeux`, inline: false },
                { name: "Musique", value: `Musique`, inline: false },
                { name: "Configuration serveur", value: `conf`, inline: false }
            )
        interaction.channel.send(embed)
        })
    }
}        */