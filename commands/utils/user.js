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
        .setTitle('Informations de l\'utilisateur')
        .setColor("RANDOM")
        .addFields(
            { name: "Pseudo", value: `${member.user.username}`, inline: true },
            { name: "Tag", value: `${member.user.discriminator}`, inline: true },
            { name: "ID", value: `${member.id}`, inline: true },
            { name: "Créé le", value: `${createdDate} (${RelativeCreatedDate})`, inline: true },
            { name: "Rejoint le", value: `${joinDate} (${RelativeJoinDate})`, inline: true }
        )
        .setTimestamp()
        await interaction.editReply({embeds: [embed]}) 
    }
}