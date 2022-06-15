// const { MessageEmbed } = require('discord.js');
// const delay = require('delay');

// module.exports = {
//     name: "bassboost",
//     description: "Ajoute le filtre bassboost sur la musique",
//     category: 'filtres musique',
//     ownerOnly: false,
//     usage: 'bassboost',
//     examples: ['bassboost'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction;        
//         const msg = await message.channel.send("Processing.....")
        
//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         client.distube.setFilter(message, "bassboost")

//         const embed = new MessageEmbed()
//             .setAuthor({ name: 'Turned on: Bassboost', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
//             .setColor('#000001');

//         await delay(5000);
//         msg.edit({ content: ' ', embeds: [embed] })
//     }
// }; /// testing version