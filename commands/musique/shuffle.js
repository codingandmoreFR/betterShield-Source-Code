// const { MessageEmbed } = require('discord.js');

// module.exports = { 
//     name: "shuffle",
//     description: "Joue les sons aléatoirement dans une playlist",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'shuffle',
//     examples: ['shuffle'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Processing.....");

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//             await client.distube.shuffle(message);

// 			let embed = new MessageEmbed()
// 				.setColor('#000001')
// 				.setDescription(`\`🔀\` | **Song has been:** \`Shuffle\``);

// 			msg.edit({ content: ' ', embeds: [embed] });
//     }
// };