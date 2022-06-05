const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "mute",
    description: "mute un membre",
    category: 'modération',
    permissions: ["KICK_MEMBERS"],
    ownerOnly: false,
    usage: 'mute <@mention> [temps]',
    examples: ['mute <@mention>', 'mute <@mention> [temps]'],
    options: [
        {
            name: "membre",
            description: "Membre a mute",
            type: 'USER',
            required: true
        },
        {
            name: "temps",
            description: "Temps du mute",
            type: 3,
            required: true,
            choices: [
                {
                    name: "5 min",
                    value: "300000"
                },
                {
                    name: "1 h",
                    value: "3600000"
                },
                {
                    name: "5 h",
                    value: "18000000"
                }
                ,
                {
                    name: "10 h",
                    value: "36000000"
                },
                {
                    name: "1j",
                    value: "86400000"
                }
                ,
                {
                    name: "7j",
                    value: "604800000"
                }
            ]
        },
        {
            name: "raison",
            description: "Raison du mute",
            type: 'STRING',
            required: false
        }
    ],

    runSlash: async (client, interaction) => {
        //init

        await interaction.deferReply();

        const member = interaction.options.getMember('membre');
        let temps = interaction.options.getString('temps');
        let raison = interaction.options.getString('raison');

        temps = parseInt(temps)

        let embedNotMute = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Mute")
            .setDescription("<:nope:973641602725736588> Vous ne pouvez pas mute ce membre !<:nope:973641602725736588>")
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        if (member.permissions.has('KICK_MEMBERS')) return await interaction.editReply({ embeds: [embedNotMute], ephemeral: true })

        if (!raison) raison = "Aucune";

        let min = temps / 60000
        let heure = temps / 60000*60
        let embedMute = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Mute <:IconSpeakerLimited:983033426913398844>`)
            .setDescription(`${interaction.user.username} a mute ${member.user.tag}`)
            .addFields(
                { name: 'Temps : ', value: `Temps : ${min} | ${heure} ` },
                { name: 'Raison :', value: `${raison}` }
            )
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()


        await member.timeout(temps, raison)
        await interaction.editReply({ embeds: [embedMute] })
    }


}
