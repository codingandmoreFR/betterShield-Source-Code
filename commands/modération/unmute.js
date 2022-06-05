const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unmute",
    description: "unmute un membre",
    category: 'modération',
    permissions: ["MUTE_MEMBERS"],
    ownerOnly: false,
    usage: 'unmute <@mention> [temps]',
    examples: ['unmute <@mention>', 'unmute <@mention>'],
    options: [
        {
            name: "membre",
            description: "Membre a mute",
            type: 'USER',
            required: true
        }
    ],

    runSlash: async (client, interaction) => {

        //init
        await interaction.deferReply();

        const member = interaction.options.getMember('membre');

        let embedUnMute = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`UnMute <:blurplevoicechannel:973304871837106226>   `)
            .setDescription(`${interaction.user.username} a UnMute ${member.user.tag}`)
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        await member.timeout(null)

        await interaction.editReply({ embeds: [embedUnMute] })
    }


}
