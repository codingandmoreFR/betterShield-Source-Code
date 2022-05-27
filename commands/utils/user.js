const { MessageEmbed, Formatters } = require("discord.js")
const dayjs = require("dayjs")

module.exports = {
    name: "user",
    description: "Affiche les informations de l'utilisateur",
    run: async (client, message, args) => {
        args[0] = args[0] || message.author.id;
        const matches = args[0].match(/^(<@!?)?(\d+)>?$/);
        if (!matches) message.reply('Membre invalide!');
        const id = matches[2];
        member = await message.guild.members.fetch(id);
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
        message.channel.send({embeds: [embed]}) 
    },

    options: [
        {
            name: "membre",
            description: "Membre a afficher",
            type: 'USER',
            required: 'false'
        }
    ],

    runSlash: (client, interaction) => {
        const member = interaction.options.getMember('membre') || interaction.member;
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
        interaction.reply({embeds: [embed]}) 
    }
}