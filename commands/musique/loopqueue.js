// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "loopqueue",
//     description: "Fait répéter la playlist",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'loopqueue',
//     examples: ['loopqueue'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Processing.....");

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         if (queue.repeatMode === 2) {
//                 client.distube.setRepeatMode(message, 0);
//                 const embed = new MessageEmbed()
//                     .setColor("#000001")
//                     .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)

//                 msg.edit({ content: ' ', embeds: [embed] });
//             } else {
//                 client.distube.setRepeatMode(message, 2);
//                 const embed = new MessageEmbed()
//                     .setColor("#000001")
//                     .setDescription(`\`🔁\` | **Song is loop:** \`All\``)

//                 msg.edit({ content: ' ', embeds: [embed] });
//             }
//     }
// }
