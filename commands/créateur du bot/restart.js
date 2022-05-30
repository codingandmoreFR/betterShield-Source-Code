const { MessageEmbed } = require('discord.js')
require("dotenv").config()

module.exports = {
    name: "restart",
    description: "restart le bot",
    category: 'fondateur du bot',
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    usage: 'kick <@mention>',
    examples: ['kick <@mention>'],

    runSlash: async (client, interaction) => {
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Redémarrage du bot réussi <:plusdeux:973641602876702812>`)
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        await interaction.reply('Redémarrage <a:waiting:980891125478985758> ')
            .then( () => client.destroy())
            .then(() => client.login(`${process.env.DISCORD_TOKEN}`))
            .then(() => interaction.editReply({embeds : [embed] }));
        
    }

}



