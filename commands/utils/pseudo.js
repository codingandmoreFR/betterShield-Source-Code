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
        await interaction.deferReply();

        //vérif
        if (interaction.guild.me.roles.highest.position <= interaction.member.roles.highest.position) return interaction.editReply({ content: "❌Le bot doit avoir un role supérieur au votre pour modifier votre pseudo !❌ ", ephemeral: true });

        //init var
        const newNickName = interaction.options.getString('pseudo');
        if (newNickName.length > 32) return interaction.editReply({ content: "❌Votre nouveau pseudo est trop long ! (Supérieur à 32 caractères)❌ ",ephemeral: true });
        let OldNickName = interaction.member.nickname || interaction.user.username;
        await interaction.member.setNickname(newNickName).catch(console.error())
        //create embed
        let embedPseudo = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`<a:above:973641634216546306> Changement réussi :`)
            .setDescription(`${OldNickName} <a:arrowok:973641633524506624>  ${newNickName}`)
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        //send
        interaction.editReply({ embeds: [embedPseudo] });
    }
}