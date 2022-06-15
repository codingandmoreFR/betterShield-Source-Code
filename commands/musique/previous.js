// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "previous",
//     description: "Joue le son précédent",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'previous',
//     examples: ['previous'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Processing.....");

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         if (queue.previousSongs.length == 0) {
//                 const embed = new MessageEmbed()
//                     .setColor("#000001")
//                     .setDescription("\`🚨\` | **There are no** `Previous` **songs**")

//                 msg.edit({ content: ' ', embeds: [embed] });
//         } else {
//             await client.distube.previous(message)
//                 .then(song => {
//                     const embed = new MessageEmbed()
//                         .setColor("#000001")
//                         .setDescription("\`⏮\` | **Song has been:** `Previous`")

//                     msg.edit({ content: ' ', embeds: [embed] });
//             });
//         }
//     }
// }
