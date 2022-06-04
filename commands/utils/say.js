const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "say", //nom de la commande / affichée sur l'embed d'aide
    description: "Fait parler le bot", //description affichée sur l'embed d'aide
    category: 'utiles', //utiles || modération || fondateur du bot || administration
    ownerOnly: false,
    usage: 'say <phrase>', //nom de la commande
    examples: ['say <phrase>'], //toutes les possibilités comme par exemple ['user', 'user [@mention]']
    permissions: [], //permissions comme par exemple ADMINISTRATOR

    options: [
        {
            name: "phrase",
            description: "Votre phrase",
            type: 'STRING',
            required: 'true'
        }
    ],

    runSlash: async (client, interaction) => {
        await interaction.deferReply()
        let phrase = interaction.options.getString("phrase")
        interaction.editReply(phrase)
    }
}