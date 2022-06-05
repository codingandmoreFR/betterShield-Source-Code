const { MessageEmbed, Formatters } = require("discord.js")
const dayjs = require("dayjs")

module.exports = {
    name: "user",
    description: "Affiche les informations de l'utilisateur",
    category: 'utiles',
    ownerOnly: false,
    usage: 'user [@mention]',
    examples: ['user', 'user [@mention]'],
    permissions: [],

    options: [
        {
            name: "membre",
            description: "Membre a afficher",
            type: 'USER',
            required: 'false'
        }
    ],

    runSlash: async (client, interaction) => {
        const member = interaction.options.getMember('membre') || interaction.member;
        await interaction.deferReply();

        let createdDate = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)
        let RelativeCreatedDate = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime)
        let joinDate = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)
        let RelativeJoinDate = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime)
        let embed = new MessageEmbed()
        .setTitle(`<:NewUser:983034695937822770> Informations de l\'utilisateur ${member.user.username}`)
        .setColor("RANDOM")
        .addFields(
            {
                name: `__Informations de l'utilisateur :__ `,
                value: [
                    `<:iduser:983034697204527195>** Id de ${member.user.username}** : ${member.id}`,
                    `<:channel:973641606928416839>** Tag de ${member.user.username}** : ${member.user.tag}`,
                    ` <:production_robot:983038254825762846> ** Bot **: ${member.user.bot ? "Oui" : "Non"}`,
                    `<:IconGui_NameEdited:983038852581167217> **Pseudonyme** : ${member.nickname ? member.nickname : "Aucun"}`,
                    `<:arrow_join:983034698357936219> **Créé le ** : ${createdDate} (${RelativeCreatedDate}) `,
                ].join("\n")
            },
            {
                name: `__Informations du membre :__ `,
                value: [
                    `<a:Discord_join:983035451382312960> **Rejoint le** : ${joinDate} (${RelativeJoinDate})`,
                    `**Rôle(s)** : ${member.roles.cache.map(role => role).join(' ').replace("@everyone", " ")}`
                ].join("\n")
            }

        )
        // .addFields(
        //     { name: "<:user:983035997291958382> Pseudo", value: `${member.user.username}`, inline: true },
        //     { name: "<:channel:973641606928416839> Tag", value: `${member.user.discriminator}`, inline: true },
        //     { name: "<:iduser:983034697204527195> ID", value: `${member.id}`, inline: true },
        //     { name: "<:arrow_join:983034698357936219> Créé le", value: `${createdDate} (${RelativeCreatedDate})`, inline: true },
        //     { name: "<a:Discord_join:983035451382312960> Rejoint le", value: `${joinDate} (${RelativeJoinDate})`, inline: true }
        // )
        .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        await interaction.editReply({embeds: [embed]}) 
    }
}