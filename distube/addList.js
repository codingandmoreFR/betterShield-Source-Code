// const { MessageEmbed } = require("discord.js");

// module.exports = async (client, queue, playlist) => {
//   const embed = new MessageEmbed()
//     .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
//     .setColor('RANDOM')
//     .setTimestamp()
//     .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

//   queue.textChannel.send({ embeds: [embed] })
// }