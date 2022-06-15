// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "pause",
//     description: "Met en pause la musique actuelle",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'pause',
//     examples: ['pause'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction;
//         const msg = await message.channel.send("Precessing.....");

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")
		
// 		if (queue.paused) { 
// 			const embed = new MessageEmbed()
// 				.setColor("#000001")
// 				.setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

// 			msg.edit({ content: ' ', embeds: [embed] });
// 		} else {
// 			client.distube.pause(message);
// 			const embed = new MessageEmbed()
// 				.setColor("#000001")
//                 .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

// 			msg.edit({ content: ' ', embeds: [embed] });
// 		}
//     }
// }
