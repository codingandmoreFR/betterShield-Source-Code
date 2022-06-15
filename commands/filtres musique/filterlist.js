// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "filterlist",
//     description: "Affiche tous les filtres disponibles",
//     category: 'filtres musique',
//     ownerOnly: false,
//     usage: 'filterlist',
//     examples: ['filterlist'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction;        
//         const msg = await message.channel.send("Processing...");
//         const embed = new MessageEmbed()
//             .setColor('#000001')
//             .setAuthor({ name: `Filter List`, iconURL: message.guild.iconURL({ dynamic: true })})
//             .setDescription(`**Displays all filters that the bot has.**`)
//             .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
//             .addField('** **', `\`3d\``, true)
//             .addField('** **', `\`bassboost\``, true)
//             .addField('** **', `\`echo\``, true)
//             .addField('** **', `\`karaoke\``, true)
//             .addField('** **', `\`nightcore\``, true)
//             .addField('** **', `\`vaporwave\``, true)
//             .addField('** **', `\`flanger\``, true)
//             .addField('** **', `\`gate\``, true)
//             .addField('** **', `\`haas\``, true)
//             .addField('** **', `\`reverse\``, true)
//             .addField('** **', `\`surround\``, true)
//             .addField('** **', `\`mcompand\``, true)
//             .addField('** **', `\`phaser\``, true)
//             .addField('** **', `\`tremolo\``, true)
//             .addField('** **', `\`earwax\``, true)
//             .setTimestamp()

//             msg.edit({ content: ' ', embeds: [embed] })
//         }
// }; // testing version
