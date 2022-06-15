// const { MessageEmbed, Permissions } = require("discord.js");
// const { joinVoiceChannel } = require('@discordjs/voice');
// module.exports = {
//     name: "join",
//     description: "Ajoute moi dans un salon vocal",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'bassboost',
//     examples: ['bassboost'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction;
// 		await interaction.deferReply()
// 		await interaction.editReply("Je réfléchis...")

// 		const { channel } = message.member.voice;
// 		if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return await interaction.editReply({ embed: { description: "I don't have perm `CONNECT` or `SPEAK` to execute command!", color: "#000001" } });
//         if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return await interaction.editReply({ embed : { description: `I don't have perm \`CONNECT\` or \`SPEAK\` in ${channel.name} to join voice!`, color: "#000001" } });

//         const clientVoice = message.guild.me.voice.channel;
//         const memberVoice = message.member.voice.channel;
// 		if(memberVoice == undefined){
// 			const embed = new MessageEmbed()
// 				.setColor("#000001")
// 				.setDescription(`Tu dois être dans le même salon vocal que ${message.client.user}`);

// 			return await interaction.editReply({ content: ' ', embeds: [embed] });
// 		}
// 		if (clientVoice) {
		
// 				const embed = new MessageEmbed()
// 					.setColor("#000001")
// 					.setDescription(`I'm already on your voice channel`);

// 				return await interaction.editReply({ content: ' ', embeds: [embed] });
			
// 		} else {
// 			if (memberVoice) {
// 				joinVoiceChannel({
// 					channelId: message.member.voice.channel.id,
// 					guildId: message.guild.id,
// 					adapterCreator: message.guild.voiceAdapterCreator
// 				})
// 				const embed = new MessageEmbed()
// 					.setColor('#000001')
// 					.setDescription(`\`🔊\` | **Joined:** \`${memberVoice.name}\``)

// 				await interaction.editReply({ content: ' ', embeds: [embed] });

				
// 			} else {
// 				const embed = new MessageEmbed()
// 					.setColor("#000001")
// 					.setDescription(`You must be in a voice channel!`);

// 				return await interaction.editReply({ content: ' ', embeds: [embed] });
// 			}
// 		}
//     }
// }
