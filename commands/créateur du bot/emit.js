const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "emit",
    description: "Emmet un événement",
    category: 'fondateur du bot',
    ownerOnly: true,
    usage: 'emit <événement>',
    examples: ['emit <événement>'],
    permissions: [],
    options: [
        {
            name: "event",
            description: 'Choisis un événement à émettre',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate'
                },
                {
                    name: "guildDelete",
                    value: 'guildDelete'
                }
            ]
        }
    ],
    runSlash: async (client, interaction) => {
        await interaction.deferReply();
        let evtChoices = interaction.options.getString("event")
        if(evtChoices == 'guildMemberAdd'){
            client.emit('guildMemberAdd', interaction.member)
            await interaction.editReply({content: `Evénement émit !`, ephemeral: true})
        }
        else if(evtChoices == 'guildMemberRemove'){
            client.emit('guildMemberRemove', interaction.member)
            await interaction.editReply({content: `Evénement émit !`, ephemeral: true})
        }
        else if(evtChoices == 'guildCreate'){
            client.emit('guildCreate', interaction.guild)
            await interaction.editReply({content: `Evénement émit !`, ephemeral: true})
        }
        else if(evtChoices == 'guildDelete'){
            client.emit('guildDelete', interaction.guild)
            await interaction.editReply({content: `Evénement émit !`, ephemeral: true})
        }
    }
}