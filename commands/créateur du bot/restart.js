const { MessageEmbed } = require('discord.js')
require("dotenv").config()
const { readdirSync } = require('fs')

module.exports = {
    name: "restart",
    description: "restart le bot",
    category: 'fondateur du bot',
    permissions: [],
    ownerOnly: true,
    usage: 'restart',
    examples: ['restart'],

    runSlash: async (client, interaction) => {

        //commands
        interaction.channel.send("Rechargement des commands : ")
        const FolderCommands = readdirSync('./commands/');
        for (category of FolderCommands) {
            const commandsFiles = readdirSync(`./commands/${category}/`).filter(file => file.endsWith('.js'))
            for (const file of commandsFiles) {
                delete require.cache[require.resolve(`../../commands/${category}/${file}`)]
                const cmd = require(`../../commands/${category}/${file}`);
                client.commands.set(cmd.name, cmd)
            }
            interaction.channel.send(`La catégorie \`${category}\` a été rechargée avec succès ✅`)
        }

        console.log("-----------------------------------------------------------------------------------")

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Redémarrage du bot réussi <:plusdeux:973641602876702812>`)
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        await interaction.reply({ content: 'Redémarrage <a:waiting:980891125478985758> ' })
            .then(() => client.destroy())
            .then(() => client.login(`${process.env.DISCORD_TOKEN}`))
            .then(() => interaction.editReply({ content: " ", embeds: [embed] }));

    }

}

