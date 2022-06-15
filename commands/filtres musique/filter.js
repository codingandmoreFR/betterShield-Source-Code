// const { MessageEmbed } = require('discord.js');
// const delay = require('delay');

// module.exports = {
//     name: "filter",
//     description: "Change le filtre que tu veux",
//     category: 'filtres musique',
//     ownerOnly: false,
//     usage: 'filter',
//     examples: ['filter'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction;        
//         const msg = await message.channel.send("Processing.....")
        
//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         if (args[0] === "off" && queue.filters?.length) queue.setFilter(false)
//         else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
//         else if (args[0]) msg.edit(`Invalid filter!`)

//         const embed = new MessageEmbed()
//             .setAuthor({ name: `Currently Filter`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif`})
//             .setDescription(`\🎲 **Filter:** \`${queue.filters.join(", ") || "Normal"}\``)
//             .setFooter({ text: `🔩 **Example:** \`${client.prefix}filter 3d\``})
//             .setTimestamp()
//             .setColor('#000001');

//         await delay(3000)
//         msg.edit({ content: ' ', embeds: [embed] })
//     } 
// }; // testing version