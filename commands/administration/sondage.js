const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "sondage",
    description: "Lancer un sondage",
    category: 'administration',
    ownerOnly: false,
    usage: 'sondage <channel> <titre> <contenu> <couleur>',
    examples: ['sondage <channel> <titre> <contenu> <couleur>'],
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "channel",
            description: "Salon où le sondage sera envoyé",
            type: 'STRING',
            required: true,
            autocomplete: true
        },
        {
            name: "titre",
            description: "Titre du sondage",
            type: 'STRING',
            required: true
        },
        {
            name: "contenu",
            description: "Contenu du sondage",
            type: "STRING",
            required: true
        },
        {
            name: "couleur",
            description: "Couleur du sondage",
            type: "STRING",
            required: true,
            choices: [
                { name: "noir", value: "BLACK" }, 
                { name: "blanc", value: "WHITE" }, 
                { name: "bleu", value: "BLUE" }, 
                { name: "vert", value: "GREEN" }, 
                { name: "rouge", value: "RED" }, 
                { name: "violet", value: "PURPLE" }, 
                { name: "aléatoire", value: "RANDOM" }
            ]
        }
    ],
    autocomplete: (interaction, query) => {
        const choices = [];
        interaction.guild.channels.cache.forEach(channel => {
            if (choices.length < 25 && channel.isText() && channel.name.toLowerCase().includes(query.toLowerCase())) choices.push({
                name: "#" + channel.name,
                value: channel.id
            });
        })
        interaction.respond(choices);
    },
    runSlash: async (client, interaction) => {
        let channel = interaction.guild.channels.cache.get(interaction.options.getString("channel"));
        if (!channel) interaction.reply({ ephemeral: true, content: "Channel invalide." });
        let titreSondage = interaction.options.getString("titre");
        let contenu = interaction.options.getString("contenu");
        let colorEmbed = interaction.options.getString("couleur");
        await interaction.deferReply();
        let embed = new MessageEmbed()
        .setColor(colorEmbed)
        .setTitle(titreSondage)
        .setDescription(contenu)
        .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        const pool = await channel.send({embeds: [embed], fetchReply: true})   
        pool.react("<:plusdeux:973641602876702812>")  
        pool.react("<:minus:973641600695689287>")
        pool.react("<:nope:973641602725736588>")
        if (!channel.isText()) return interaction.reply({ content : 'Vous devez sélectionner un channel Text ! ', ephemeral : true})
        await interaction.editReply({content: "Sondage envoyé !", ephemeral: "true"})            
    }
}