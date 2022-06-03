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
        db.run(`CREATE TABLE IF NOT EXISTS config_annonce(id, name TEXT, channel, actif INTEGER)`, async (err) => {
            if (err) return console.error(err.message);

            //if subscommand == activé
            if (interaction.options.getSubcommand() === 'activé') {

                //take option
                const channel = interaction.options.getChannel('channel');
                console.log(interaction.guild.id)

                //each table
                db.get(`SELECT id FROM config_annonce WHERE id = ${interaction.guild.id}`, (err, data) => {
                    if (err) return console.error(err.message);
                    //set
                    if (!data) {
                        db.run('INSERT INTO config_annonce (id, name, channel, actif) VALUES(?,?,?,?)', [interaction.guild.id, interaction.guild.name, channel.id, 1], (err) => {
                            if (err) return console.error(err.message);
                        })
                    }

                    //update
                    else {
                        db.run(`UPDATE config_annonce SET channel = ${channel.id} WHERE id = ${interaction.guild.id}`, (err) => {
                            if (err) return console.error(err.message);
                        })

                        db.run(`UPDATE config_annonce SET actif = 1 WHERE id = ${interaction.guild.id}`, (err) => {
                            if (err) return console.error(err.message);
                        })
                    }
                })

                //reply
                await interaction.editReply("Channel d'annonce enregistré et activé !")
            }

            //if subscommand == désactivé
            if (interaction.options.getSubcommand() === 'désactivé') {

                //update
                db.run('UPDATE config_annonce SET actif = 0', (err) => {
                    if (err) return console.error(err.message);
                })
                await interaction.editReply("Channel d'annonce désactiver !")
            }

        })

    }
}