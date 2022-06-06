const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "avatar", //nom de la commande / affichée sur l'embed d'aide
    description: "Affiche l'avatar d'un utilisateur", //description affichée sur l'embed d'aide
    category: 'utiles', //utiles || modération || fondateur du bot || administration || assistance
    ownerOnly: false, 
    usage: 'avatar <@mention>', //nom de la commande
    examples: ['avatar', 'avatar <@mention>'], //toutes les possibilités comme par exemple ['user', 'user [@mention]']
    permissions: [], //permissions comme par exemple ADMINISTRATOR
    options: [
        {
        name: "membre",
        description: "Avatar d'un membre précis",
        type: 'USER',
        required: 'false'
    }], //options de la slash command (si aucune, supprimer la ligne)
    runSlash: async (client, interaction) => {
        const user = interaction.options.getUser('membre');
        await interaction.deferReply()

        if(user != undefined){
            const avatar = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("__Avatar__")
            .setDescription("Voici l'avatar de <@" + user.id + "> !")
            .setTimestamp()
            .setImage(user.displayAvatarURL({ format: "png"}))
            .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            
            interaction.editReply({embeds: [avatar]})
        }
        else {
            const avataruser = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("__Avatar__")
            .setDescription("Voici votre avatar !")
            .setTimestamp()
            .setImage(interaction.member.displayAvatarURL({ format: "png"}))
            .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      
            interaction.editReply({embeds: [avataruser]})
        }
    }
}