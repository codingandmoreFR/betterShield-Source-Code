const { MessageEmbed } = require("discord.js")
const { command } = require("../../utils/Logger")
const { db } = require("../../index")

module.exports = {
    name: "config_ticket",
    description: "configurer votre système de ticket",
    category: 'configuration du bot',
    ownerOnly: false,
    usage: 'config_ticket <options>',
    examples: ['config_ticket <options>'],
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "activé",
            description: "activé le système de ticket",
            type: 1, // 1 is type SUB_COMMAND
            options: [
                {
                    name: "category_archive",
                    description: "Le category ou seront archivées les tickets (Obligatoire)",
                    type: 'STRING', // 7 is type CHANNEL
                    required: true,
                    autocomplete: true
                },
                {
                    name: "category_ouverte",
                    description: "Le category ou seront créée les tickets (Non obligatoire)",
                    type: 'STRING', // 7 is type CHANNEL
                    required: false,
                    autocomplete: true
                },
            ]
        },
        {
            name: "désactivé",
            description: "désactivé le système de logs",
            type: 1
        }
    ],
    autocomplete: (interaction, query) => {
        const choices = [];
        interaction.guild.channels.cache.forEach(channel => {
            if (choices.length < 25 && channel.type == "GUILD_CATEGORY"
                && channel.name.toLowerCase().includes(query.toLowerCase())) choices.push({
                    name: "📁" + channel.name,
                    value: channel.id
                });
        })
        interaction.respond(choices);
    },
    runSlash: async (client, interaction) => {

        //check if table exist, if not create this
        db.run(`CREATE TABLE IF NOT EXISTS config_ticket(id CHAR(18), name VARCHAR(101), categorycreate CHAR(18), categoryarchive CHAR(18), actif INTEGER)`, (err) => {
            if (err) return console.error(err.message);

            //if subscommand == activé
            if (interaction.options.getSubcommand() === 'activé') {

                //take option
                const categoryCreate = interaction.guild.channels.cache.get(interaction.options.getString("category_ouverte"));
                const categoryArchive = interaction.guild.channels.cache.get(interaction.options.getString("category_archive"));
                if (!categoryCreate) interaction.reply({ ephemeral: true, content: "Category invalide." });
                if (!categoryArchive) categoryArchive = "Aucune"

                //each table
                db.all(`SELECT id, categorycreate, categoryarchive FROM config_ticket WHERE id = "${interaction.guild.id}"`, (err, data) => {
                    if (err) return console.error(err.message);

                    let oldCategoryCreate = "Aucun";
                    let oldCategoryArchive = "Aucun";

                    if (data[0] !== undefined) {
                        oldCategoryCreate = data[0].categorycreate
                        oldCategoryArchive = data[0].categoryarchive

                        let oldCreateName = { name: "aucun" };
                        let oldArchiveName = { name: "aucun" };

                        if (oldCategoryCreate !== "Aucun" && oldCategoryArchive !== "Aucun") {
                            oldCreateName = interaction.guild.channels.cache.get(oldCategoryCreate)
                            oldArchiveName = interaction.guild.channels.cache.get(oldCategoryArchive)
                        }

                    }

                    //set
                    if (data.length < 1) {
                        db.run('INSERT INTO config_ticket (id, name, categorycreate, categoryarchive, actif) VALUES(?,?,?,?, ?)', [interaction.guild.id, interaction.guild.name, categoryCreate.id, categoryArchive.id, 1], async (err) => {
                            if (err) return console.error(err.message);
                            await interaction.reply(`<a:above:973641634216546306> Categorys de tickets enregistrées et activées! <a:arrowok:973641633524506624> create : 📁<${categoryCreate.name}> , archive : 📁<${categoryArchive.name}>`)
                        })
                    }

                    //update
                    else {

                        db.run(`UPDATE config_ticket SET categorycreate= "${categoryCreate.id}", categoryArchive = "${categoryArchive.id}", actif = 1 WHERE id = "${interaction.guild.id}"`, async (err) => {
                            if (err) return console.error(err.message);

                            db.all(`SELECT categorycreate, categoryarchive  FROM config_ticket WHERE id = "${interaction.guild.id}"`, async (err, data) => {
                                if (err) return console.error(err.message);

                                if (categoryCreate.id === oldCategoryCreate && categoryArchive.id !== oldCategoryArchive) {
                                    await interaction.reply(`<a:above:973641634216546306>  Category de création de tickets <a:arrowok:973641633524506624> 📁<${categoryCreate.name}>`)
                                }
                                if (categoryArchive.id === oldCategoryArchive && categoryCreate.id !== oldCategoryCreate) {
                                    await interaction.reply(`<a:above:973641634216546306>  Category d'archive de tickets <a:arrowok:973641633524506624> 📁<${categoryArchive.name}>`)
                                }
                                if (categoryArchive.id === oldCategoryArchive && categoryCreate.id === oldCategoryCreate) {
                                    await interaction.reply(`<a:above:973641634216546306>  Category d'archive de tickets <a:arrowok:973641633524506624> 📁<${categoryArchive.name}> \n <a:above:973641634216546306>  Category de création de tickets <a:arrowok:973641633524506624> 📁<${categoryCreate.name}> `)
                                }
                                else {
                                    await interaction.reply(`<a:above:973641634216546306>  Category de création de tickets modifié : 📁<${oldCreateName.name}>  <a:arrowok:973641633524506624> 📁<${categoryCreate.name}>`)
                                    await interaction.channel.send(`<a:above:973641634216546306>  Category d'archive de tickets modifié : 📁<${oldArchiveName.name}>  <a:arrowok:973641633524506624> 📁<${categoryArchive.name}>`)
                                }
                            })
                        })
                    }
                })
            }

            //if subscommand == désactivé
            if (interaction.options.getSubcommand() === 'désactivé') {

                //update
                db.run('UPDATE config_ticket SET actif = 0', async (err) => {
                    if (err) return console.error(err.message);
                    await interaction.reply("<a:down:973641634958954577> Système de tickets désactiver !")
                })

            }

        })

    }
}