const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "search", //nom de la commande / affichée sur l'embed d'aide
    description: "Recherche sur internet", //description affichée sur l'embed d'aide
    category: 'utiles', //utiles || modération || fondateur du bot || administration
    ownerOnly: false, 
    usage: 'search <recherche>', //nom de la commande
    examples: ['search <recherche>'], //toutes les possibilités comme par exemple ['user', 'user [@mention]']
    permissions: [], //permissions comme par exemple ADMINISTRATOR
    options: [
        {
            name: "recherche",
            description: "Ce que vous voulez rechercher",
            type: 'STRING',
            required: 'true'
        }
    ],

    runSlash: async (client, interaction) => {
        const recherche = interaction.options.getString('recherche');
        await interaction.deferReply();
        let args = recherche.replace(/\s+/g, '+')
        let embedSearch = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Voici votre recherche : `)
        .setDescription(`https://www.google.fr/search?q=${args}`)
        .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true}) })
        .setTimestamp()
        await interaction.editReply({embeds: [embedSearch]})
    }
}