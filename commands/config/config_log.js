// const { MessageEmbed } = require("discord.js")
// const { command } = require("../../utils/Logger")
// const { db } = require("../../index")

// module.exports = {
//     name: "config_logs",
//     description: "configurer votre système de logs",
//     category: 'configuration du bot',
//     ownerOnly: false,
//     usage: 'config_logs <options>',
//     examples: ['config_logs <options>'],
//     permissions: ['ADMINISTRATOR'],
//     options: [
//         {
//             name: "activé",
//             description: "active le système de logs",
//             type: 1, // 1 is type SUB_COMMAND
//             options: [{
//                 name: "channel",
//                 description: "Le channel ou seront posté les logs",
//                 type: 'STRING', // 7 is type CHANNEL
//                 required: true,
//                 autocomplete: true
//             }]
//         },
//         {
//             name: "désactivé",
//             description: "désactive le système de logs",
//             type: 1
//         }
//     ],
//     autocomplete: (interaction, query) => {
//         const choices = [];
//         interaction.guild.channels.cache.forEach(channel => {
//             if (choices.length < 25 && channel.isText() && channel.name.toLowerCase().includes(query.toLowerCase())) choices.push({
//                 name: "#" + channel.name,
//                 value: channel.id
//             });
//         })
//         interaction.respond(choices);
//     },
//     runSlash: async (client, interaction) => {

//         //check if table exist, if not create this
//         db.run(`CREATE TABLE IF NOT EXISTS config_logs(id CHAR(18), name VARCHAR(101), channel CHAR(18), actif INTEGER)`, (err) => {
//             if (err) return console.error(err.message);

//             //if subscommand == activé
//             if (interaction.options.getSubcommand() === 'activé') {

//                 //take option
//                 const channel = interaction.guild.channels.cache.get(interaction.options.getString("channel"));
//                 if (!channel) interaction.reply({ ephemeral: true, content: "Channel invalide." });

//                 //each table
//                 db.all(`SELECT id, channel FROM config_logs WHERE id = "${interaction.guild.id}"`, (err, data) => {
//                     if (err) return console.error(err.message);

//                     let oldChannel = "Aucun"
//                     if(data[0] !== undefined){
//                         oldChannel = data[0].channel
//                     }

//                     //set
//                     if (data.length < 1) {
//                         db.run('INSERT INTO config_logs (id, name, channel, actif) VALUES(?,?,?,?)', [interaction.guild.id, interaction.guild.name, channel.id, 1], async (err) => {
//                             if (err) return console.error(err.message);
//                             await interaction.reply(`<a:above:973641634216546306> Channel de logs enregistré et activé! <a:arrowok:973641633524506624> <#${channel.id}>`)
//                         })
//                     }

//                     //update
//                     else {

//                         db.run(`UPDATE config_logs SET channel = "${channel.id}", actif = 1 WHERE id = "${interaction.guild.id}"`, async (err) => {
//                             if (err) return console.error(err.message);

//                             db.all(`SELECT channel FROM config_logs WHERE id = "${interaction.guild.id}"`, async (err, data) => {
//                                 if (err) return console.error(err.message);

//                                 if (channel.id === oldChannel) {
//                                     await interaction.reply(`<a:above:973641634216546306>  Channel de logs réactivé <a:arrowok:973641633524506624> <#${channel.id}>`)
//                                 }
//                                 else {
//                                     await interaction.reply(`<a:above:973641634216546306>  Channel de logs modifié : <#${oldChannel}>  <a:arrowok:973641633524506624> <#${channel.id}>`)
//                                 }
//                             })
//                         })
//                     }
//                 })
//             }

//             //if subscommand == désactivé
//             if (interaction.options.getSubcommand() === 'désactivé') {

//                 //update
//                 db.run('UPDATE config_logs SET actif = 0', async (err) => {
//                     if (err) return console.error(err.message);
//                     await interaction.reply("<a:down:973641634958954577> Channel de logs désactiver !")
//                 })

//             }

//         })

//     }
// }