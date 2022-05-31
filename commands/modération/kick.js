const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kick",
    description: "kick un membre",
    category: 'modération',
    permissions: ["KICK_MEMBERS"],
    ownerOnly: false,
    usage: 'kick <@mention>',
    examples: ['kick <@mention>'],
    options: [
        {
            name: "membre",
            description: "Membre a kick",
            type: 'USER',
            required: 'true'
        },
        {
            name: "raison",
            description: "Raison du kick",
            type: 'STRING',
            required: 'false'
        }

    ],

    runSlash: async (client, interaction) => {
        //init

        await interaction.deferReply();

        const member = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');

        let embedNotKick = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Expulsion")
            .setDescription("<:nope:973641602725736588> Vous ne pouvez pas expulser ce membre !<:nope:973641602725736588>")
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        if (!member.kickable) return await interaction.editReply({ embeds: [embedNotKick], ephemeral: true })

        let embedKick = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`<a:above:973641634216546306> Expulsion Réussie `)
            .setDescription(`${interaction.user.username} à expulsé ${member.user.username}.\nRaison : ${raison}`)
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
        if(raison){
            await member.kick({reason: raison})
        }else{
            await member.kick()
        }
        await interaction.editReply({ embeds: [embedKick] })
    }

}