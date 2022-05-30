const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unban", //nom de la commande / affichée sur l'embed d'aide
    description: "Unban un membre", //description affichée sur l'embed d'aide
    category: 'modération', //utiles || modération || fondateur du bot || administration
    ownerOnly: false,
    usage: 'unban <userId>', //nom de la commande
    examples: ['unban <userId>'], //toutes les possibilités comme par exemple ['user', 'user [@mention]']
    permissions: ['BAN_MEMBERS'], //permissions comme par exemple ADMINISTRATOR

    options: [
        {
            name: "userid",
            description: "Ajouté l'id de la personne a unban",
            type: 'STRING',
            required: 'true'
        }
    ],

    runSlash: async (client, interaction) => {
        //response
        await interaction.deferReply();


        let userId = interaction.options.getString('userid');

        interaction.guild.members.unban(userId).then(user => {
            let embedUnban = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`<a:above:973641634216546306> ${user.tag} a été unban !`)
                .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
            interaction.editReply({ embeds: [embedUnban] });
        }).catch(() => {
            interaction.editReply({content : " <:nope:973641602725736588>  Veuillez spécifier un ID valide <:nope:973641602725736588> ", ephemeral : true})
        })


    }
}
