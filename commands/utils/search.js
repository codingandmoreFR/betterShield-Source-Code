const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "search", //nom de la commande / affichée sur l'embed d'aide
    description: "Recherche sur internet", //description affichée sur l'embed d'aide
    category: 'utiles', //utiles || modération || fondateur du bot || administration
    ownerOnly: false, 
    usage: 'search', //nom de la commande
    examples: ['search <recherche>'], //toutes les possibilités comme par exemple ['user', 'user [@mention]']
    permissions: [], //permissions comme par exemple ADMINISTRATOR
    run: (client, message, args) => {
        let embedGoToSlashCommand = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Utilisation des Slash Commands")
        .setDescription("Hey, je t'invite à utiliser les slash commands ! C'est plus facile pour moi de comprendre et ça te permet d'avoir plus de facilité lors de l'execution des commandes !")
        .setTimestamp()
        message.reply({embeds: [embedGoToSlashCommand]})        
    },

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
        interaction.editReply({embeds: [embedSearch]})
    }
}