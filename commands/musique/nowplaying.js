// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "nowplaying",
//     description: "Lance une musique instantanément",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'nowplaying',
//     examples: ['nowplaying'],
//     permissions: ["ADMINISTRATOR"],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
// 		const msg = await message.channel.send('Processing.....');

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
//         const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

//         const embed = new MessageEmbed()
//             .setAuthor({ name: queue.songs[0].playing ? 'Song Pause...' : 'Now Playing...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
//             .setColor('#000001')
//             .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
//             .setThumbnail(`${queue.songs[0].thumbnail}`)
//             .addField('Uploader:', `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, true)
//             .addField('Requester:', `${queue.songs[0].user}`, true)
//             .addField('Volume:', `${queue.volume}%`, true)
//             .addField('Views', `${queue.songs[0].views}`, true)
//             .addField('Likes:', `${queue.songs[0].likes}`, true)
//             .addField('Dislikes:', `${queue.songs[0].dislikes}`, true)
//             .addField(`Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
//             .setTimestamp()

//         msg.edit({ content: ' ', embeds: [embed] });
//     }
// }
