// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "autoplay",
//     description: "Active l'autoplay",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'autoplay',
//     examples: ['autoplay'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction;        
//         const msg = await message.channel.send("Processing.....");
        
//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         if (!queue.autoplay) {
//             client.distube.toggleAutoplay(message);
    
//             const embed = new MessageEmbed()
//                 .setColor(message.client.color)
//                 .setDescription(`\`⏯\` Mode **Autoplay** activé.`)

//             msg.edit({ content: ' ', embeds: [embed] });
//         } else {
//             client.distube.toggleAutoplay(message);

//             const embed = new MessageEmbed()
//                 .setColor(message.client.color)
//                 .setDescription(`\`⏯\` Mode **Autoplay** désactivé.`)

//             msg.edit({ content: ' ', embeds: [embed] });
//         }
//     }
// }
