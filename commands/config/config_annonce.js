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
            name: "activer",
            description: "active le système d'annonce",
            type: 1, // 1 is type SUB_COMMAND
            options: [{
                name: "channel",
                description: "Le channel ou seront posté les annonce",
                type: 'STRING', // 7 is type CHANNEL
                required: true,
                autocomplete: true
            }]
        },
        {
            name: "désactiver",
            description: "désactive le système d'annonce",
            type: 1
        }
    ],
    autocomplete: (interaction, query) => {
        const choices = [];
        interaction.guild.channels.cache.forEach(channel => {
            if (choices.length < 25 && channel.isText() && channel.name.toLowerCase().includes(query.toLowerCase())) choices.push({
                name: "#" + channel.name,
                value: channel.id
            });
        })
        interaction.respond(choices);
    },
    runSlash: async (client, interaction) => {
        //reply
        await interaction.deferReply()

        //check if table exist, if not create this
        db.run(`CREATE TABLE IF NOT EXISTS config_annonce(id CHAR(18), name VARCHAR(101), channel CHAR(18), actif INTEGER)`, (err) => {
            if (err) return console.error(err.message);

            //if subscommand == activé
            if (interaction.options.getSubcommand() === 'activé') {

                //take option
                const channel = interaction.guild.channels.cache.get(interaction.options.getString("channel"));
                if (!channel) interaction.reply({ ephemeral: true, content: "Channel invalide." });

                //each table
                db.all(`SELECT id, channel FROM config_annonce WHERE id = "${interaction.guild.id}"`, (err, data) => {
                    if (err) return console.error(err.message);

                    let oldChannel = "Aucun"
                    if(data[0] !== undefined){
                        oldChannel = data[0].channel
                    }

                    //set
                    if (data.length < 1) {
                        db.run('INSERT INTO config_annonce (id, name, channel, actif) VALUES(?,?,?,?)', [interaction.guild.id, interaction.guild.name, channel.id, 1], async (err) => {
                            if (err) return console.error(err.message);
                            let embed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Channel d'annonce activé !")
                            .setDescription(`Le channel d'annonce est enregistré et activé !\n<a:arrowok:973641633524506624> <#${channel.id}>`)
                            .setTimestamp()
                            .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                            await interaction.editReply({embeds: [embed]})
                        })
                    }

                    //update
                    else {

                        db.run(`UPDATE config_annonce SET channel = "${channel.id}", actif = 1 WHERE id = "${interaction.guild.id}"`, async (err) => {
                            if (err) return console.error(err.message);

                            db.all(`SELECT channel FROM config_annonce WHERE id = "${interaction.guild.id}"`, async (err, data) => {
                                if (err) return console.error(err.message);

                                if (channel.id === oldChannel) {
                                    let embed = new MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("Channel d'annonce réactivé !")
                                    .setDescription(`Le channel d'annonce est réactivé !\n<a:above:973641634216546306> <#${channel.id}>`)
                                    .setTimestamp()
                                    .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                    await interaction.editReply({embeds: [embed]})
                                }
                                else {
                                    let embed = new MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("Channel d'annonce modifié !")
                                    .setDescription(`Le channel d'annonce vient d'être modifié !\n<a:above:973641634216546306> <#${channel.id}>`)
                                    .setTimestamp()
                                    .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                    await interaction.editReply({embeds: [embed]})
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
                    let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Channel d'annonce réactivé !")
                    .setDescription(`<a:down:973641634958954577> Channel d'annonce désactivé !`)
                    .setTimestamp()
                    .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    await interaction.editReply({embeds: [embed]})
                })

            }

        })

    }
}