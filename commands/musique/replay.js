// const { MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "replay",
//     description: "Rejoue le son actuel",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'replay',
//     examples: ['replay'],
//     permissions: [],
//     runSlash: async (client, interaction) => {
//         const message = interaction.message;
//         const msg = await message.channel.send("Processing.....");

//         const queue = client.distube.getQueue(message);
//         if (!queue) msg.edit(`There is nothing in the queue right now!`)
//         const { channel } = message.member.voice;
//         if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

//         await queue.seek(0)

//         const embed = new MessageEmbed()
//             .setColor("#000001")
//             .setDescription("\`🔁\` | **Song has been:** `Replay`")

//         msg.edit({ content: ' ', embeds: [embed] });
        
//     }
// }
