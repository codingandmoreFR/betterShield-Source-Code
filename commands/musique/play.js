// const { Permissions } = require("discord.js");

// module.exports = {
//     name: "play",
//     description: "Lance une musique ou ajoute une musique à la file d'attente (YouTube, Spotify ou SoundCloud)",
//     category: 'musique',
//     ownerOnly: false,
//     usage: 'play',
//     examples: ['play'],
//     permissions: [],
//     options: [
//         {
//             name: "musique",
//             description: "lien/nom d'une musique",
//             type: 'STRING',
//             required: true
//         }
//     ],
//     runSlash: async (client, interaction) => {
//         const message = interaction;
//         let nameMusique = interaction.options.getString("musique")
//      //   message.channel.send(`**Searching.....** \`${args.join(" ")}\``).then(msg => {
//      //       setTimeout(() => msg.delete(), 5000)
//      //   })
        
//         const { channel } = message.member.voice;
//         if (!channel) return message.channel.send("You need to be in voice channel.")
//         if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "I don't have perm `CONNECT` or `SPEAK` to execute command!", color: "#000001" } });
//         if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `I don't have perm \`CONNECT\` or \`SPEAK\` in ${channel.name} to join voice!`, color: "#000001" } });

//         const string = nameMusique;
//         if (!string) {
//             return message.channel.send("Please provide a song name or link.");
//         }
//         console.log("&")
//         client.distube.play(message.member.voice?.channel, string, {
//             member: message.member,
//             textChannel: message.channel,
//             message: message.message
//         }).then(console.log("Rentré"))
//         console.log("2")
//         interaction.reply({content: "Je joue !", ephemeral: true})
//     }
// }
