const { MessageEmbed, Formatters } = require("discord.js")
const moment = require("moment");
const dayjs = require("dayjs")

module.exports = {
    name: "server",
    description: "Affiche les informations du serveur",
    category: 'utiles',
    ownerOnly: false,
    usage: 'server',
    examples: ['server'],
    permissions: [],

    runSlash: async (client, interaction) => {

        await interaction.deferReply();
        const guild = interaction.guild;
        let description = guild.description;
        if (description === null) {
            description = "Aucune";
        }

        const embed = new MessageEmbed()
            .setAuthor({
                name: `Informations sur ${guild.name}`,
                iconURL: guild.iconURL({ dynamic: true }),
            })
            .setColor("RANDOM")
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: `__Informations générales :__`,
                    value: [
                        `**Nom :** ${guild.name}`,
                        `**Créé le :** \`${moment(guild.createdTimestamp).format(
                            "DD/MM/YYYY"
                        )}\``,
                        `**Fondateur :** <@${guild.ownerId}>`,
                        `**Description :** ${description}`,
                    ].join("\n"),
                },
                {
                    name: `__Informations Membres :__ `,
                    value: [
                        `<:usersicon:983126303995732025> **Membres :** ${guild.members.cache.filter((m) => !m.user.bot).size
                        }`,
                        ` <:production_robot:983038254825762846> **Bots :** ${guild.members.cache.filter((m) => m.user.bot).size
                        }`,
                        `\n**Total :** ${guild.memberCount}`,
                    ].join("\n"),
                },
                {
                    name: `__Informations Channels :__`,
                    value: [
                        `**Texte :** ${guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size
                        }`,
                        `**Vocal :** ${guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size
                        }`,
                        ` **Categories :** ${guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY")
                            .size
                        }`,
                        `\n**Total :** ${guild.channels.cache.size} `,
                    ].join("\n"),
                },
                {
                    name: `__Roles :__ `,
                    value: [`<:user:983035997291958382>  **Roles :** ${guild.roles.cache.size}`].join(
                        "\n"
                    ),
                }
            )
            .setFooter({
                text: `Par ${interaction.user.tag}`,
                iconURL:interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

        interaction.editReply({ embeds: [embed] });
    }
}