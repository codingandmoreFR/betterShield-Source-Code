// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "loop",
//     description: "Fait répéter un son",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'loop',
//     examples: ['loop'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Processing.....");
        
//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         if (queue.repeatMode === 0) {
//                 client.distube.setRepeatMode(message, 1);
//                 const embed = new MessageEmbed()
//                     .setColor("#000001")
//                     .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)

//                 msg.edit({ content: ' ', embeds: [embed] });
//             } else {
//                 client.distube.setRepeatMode(message, 0);
//                 const embed = new MessageEmbed()
//                     .setColor("#000001")
//                     .setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)

//                 msg.edit({ content: ' ', embeds: [embed] });
//             }
//     }
// }
