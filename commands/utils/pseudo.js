const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pseudo", //nom de la commande / affichée sur l'embed d'aide
    description: "Changer son pseudo", //description affichée sur l'embed d'aide
    category: 'utiles', //utiles || modération || fondateur du bot || administration
    ownerOnly: false, 
    usage: 'pseudo <nouveau pseudonyme>', //nom de la commande
    examples: ['pseudo <nouveau pseudonyme>'], //toutes les possibilités comme par exemple ['user', 'user [@mention]']
    permissions: ['CHANGE_NICKNAME'], //permissions comme par exemple ADMINISTRATOR

    options: [
        {
            name: "pseudo",
            description: "Votre nouveau pseudonyme",
            type: 'STRING',
            required: 'true'
        }
    ],

    runSlash: async (client, interaction) => {
        //response
        await interaction.deferReply()({ ephemeral: true });

        //vérif
        if (interaction.guild.me.roles.highest.position <= interaction.member.roles.highest.position) return interaction.editReply({ content: "❌Le bot doit avoir un role supérieur au votre pour modifier votre pseudo !❌ ", ephemeral: true });

        //init var
        const newNickName = interaction.options.getString('pseudo');
        if (newNickName.length > 32) return interaction.editReply({ content: "❌Votre nouveau pseudo est trop long ! (Supérieur à 32 caractères)❌ ",ephemeral: true });
        let OldNickName = interaction.member.nickname || interaction.user.tag;
        await interaction.member.setNickname(newNickName).catch(console.error())
        //create embed
        let embedPseudo = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${interaction.user.tag} changement réussi ✅`)
            .setDescription(`${OldNickName} => ${newNickName}`)
            .setFooter({ text: `Par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        //send
        interaction.editReply({ embeds: [embedPseudo] });
    }
}