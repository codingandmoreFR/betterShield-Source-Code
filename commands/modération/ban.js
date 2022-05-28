const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban un membre",
    category: 'mod',
    permissions: ["BAN_MEMBERS"],
    ownerOnly: false,
    usage: 'ban',
    examples: ['ban <@mention>', 'ban <@mention> [temps]'],
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
            description: "Membre a ban",
            type: 'USER',
            required: 'true'
        },
        {
            name: "raison",
            description: "Raison du ban",
            type: 'STRING',
            required: 'false'
        },
        {
            name: "temps",
            description: "Temps du ban en jours. Temps par défaut : permanent ",
            type: 'INTEGER',
            required: 'false'
        }

    ],

    runSlash: async (client, interaction) => {
        //init

        await interaction.deferReply();

        const member = interaction.options.getMember('membre');
        const temps = interaction.options.getInteger('temps');
        const raison = interaction.options.getString('raison');

        let embedNotBan = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Bannissement")
            .setDescription("Vous ne pouvez pas bannir ce membre !")
            .setTimestamp()

        if (!member.bannable) return await interaction.editReply({ embeds: [embedNotBan], ephemeral: true })

        if (!raison) raison = "Aucune";

        if (!temps) {
            let embedBan = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Bannissement`)
                .setDescription(`${interaction.user.tag} à banni ${member.user.tag}.\nRaison : ${raison}`)
                .setTimestamp()

            await member.ban(({ reason: raison }))
            await interaction.editReply({ embeds: [embedBan] })
        }
        else {
            let embedBan = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Bannissement`)
                .setDescription(`${interaction.user.tag} à banni ${member.user.tag}.\nTemps : ${temps} jour(s) \nRaison : ${raison}`)
                .setTimestamp()
            await member.ban(({ days: temps, reason: raison }))
            await interaction.editReply({ embeds: [embedBan] })
        }


    }

}