// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "leave",
//     description: "Fait moi quitter de ton salon vocal",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'leave',
//     examples: ['leave'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Processing.....");
//         const queue = client.distube.getQueue(message);
// 		if (!queue) return msg.edit(`There is nothing in the queue right now!`)
//         const clientVoice = message.guild.me.voice.channel;
//         const memberVoice = message.member.voice.channel;

//         if (clientVoice === memberVoice) {
//             if (queue) {
//                 client.distube.stop(message);
//                 client.distube.voices.leave(message.guild);
//             } else {
//                 client.distube.voices.leave(message.guild);
//             }

//             const embed = new MessageEmbed()
//                 .setDescription(`\`🚫\` | **Left:** | \`${memberVoice.name}\``)
//                 .setColor('#000001')

//             msg.edit({ content: ' ', embeds : [embed] });

//         }

//     }
// }
