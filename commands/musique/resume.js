// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "resume",
//     description: "Relance le son en pause",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'resume',
//     examples: ['resume'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Precessing.....");

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")
		
// 		if (queue.paused) { 
// 			await client.distube.resume(message);

// 			const embed = new MessageEmbed()
// 				.setColor("#000001")
// 				.setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);

// 			msg.edit({ embeds: [embed] });
// 		} else {
// 			const embed = new MessageEmbed()
// 				.setColor("#000001")
// 				.setDescription(`\`⏯\` | **Queue has been:** \`Resumed\``);

// 			msg.edit({ embeds: [embed] });
// 		}
//     }
// }
