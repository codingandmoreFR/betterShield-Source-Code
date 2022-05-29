const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kick",
    description: "kick un membre",
    category: 'modération',
    permissions: ["KICK_MEMBERS"],
    ownerOnly: false,
    usage: 'kick <@mention>',
    examples: ['kick <@mention>'],
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
            .setDescription("Vous ne pouvez pas expulser ce membre !")
            .setTimestamp()

        if (!member.kickable) return await interaction.editReply({ embeds: [embedNotKick], ephemeral: true })

        let embedKick = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Expulsion`)
            .setDescription(`${interaction.user.tag} à expulsé ${member.user.tag}.\nRaison : ${raison}`)
            .setTimestamp()
        if(raison){
            await member.kick({reason: raison})
        }else{
            await member.kick()
        }
        await interaction.editReply({ embeds: [embedKick] })
    }

}