const { MessageEmbed } = require("discord.js")
const { command } = require("../../utils/Logger")
const { db } = require("../../index")

module.exports = {
    name: "config_annonce",
    description: "configurer votre système d'annonce",
    category: 'configuration du bot',
    ownerOnly: false,
    usage: 'config_annonce <options>',
    examples: ['config_annonce <options>'],
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "activé",
            description: "activé le système d'annonce",
            type: 1, // 1 is type SUB_COMMAND
            options: [{
                name: "channel",
                description: "Le channel ou seront posté les annonce",
                type: 7, // 7 is type CHANNEL
                required: true
            }]
        },
        {
            name: "désactivé",
            description: "désactivé le système d'annonce",
            type: 1
        }
    ],
    runSlash: async (client, interaction) => {
        //reply
        await interaction.deferReply()

        //check if table exist, if not create this
        db.run(`CREATE TABLE IF NOT EXISTS config_annonce(id, name TEXT, channel, actif INTEGER)`, (err) => {
            if (err) return console.error(err.message);

            //if subscommand == activé
            if (interaction.options.getSubcommand() === 'activé') {

                //take option
                const channel = interaction.options.getChannel('channel');

                //each table
                db.all(`SELECT id, channel FROM config_annonce WHERE id = "${interaction.guild.id}"`, (err, data) => {
                    if (err) return console.error(err.message);

                    let oldChannel = data[0].channel

                    //set
                    if (data.length < 1) {
                        db.run('INSERT INTO config_annonce (id, name, channel, actif) VALUES(?,?,?,?)', [interaction.guild.id, interaction.guild.name, channel.id, 1], async (err) => {
                            if (err) return console.error(err.message);
                            await interaction.editReply(`<a:above:973641634216546306> Channel d'annonce enregistré et activé! <a:arrowok:973641633524506624> <#${channel.id}>`)
                        })
                    }

                    //update
                    else {

                        db.run(`UPDATE config_annonce SET channel = "${channel.id}", actif = 1 WHERE id = "${interaction.guild.id}"`, async (err) => {
                            if (err) return console.error(err.message);

                            db.all(`SELECT channel FROM config_annonce WHERE id = "${interaction.guild.id}"`, async (err, data) => {
                                if (err) return console.error(err.message);

                                if (channel.id === oldChannel) {
                                    await interaction.editReply(`<a:above:973641634216546306>  Channel d'annonce réactivé <a:arrowok:973641633524506624> <#${channel.id}>`)
                                }
                                else {
                                    await interaction.editReply(`<a:above:973641634216546306>  Channel d'annonce modifié : <#${oldChannel}>  <a:arrowok:973641633524506624> <#${channel.id}>`)
                                }
                            })
                        })
                    }
                })
            }

            //if subscommand == désactivé
            if (interaction.options.getSubcommand() === 'désactivé') {

                //update
                db.run('UPDATE config_annonce SET actif = 0', async (err) => {
                    if (err) return console.error(err.message);
                    await interaction.editReply("<a:down:973641634958954577> Channel d'annonce désactiver !")
                })

            }

        })

    }
}