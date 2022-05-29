const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "clear",
    description: "Supprime des messages - si aucun nombre est mentionné, le bot supprimera 100 messages.",
    category: 'modération',
    permissions: ["MANAGE_MESSAGES"],
    ownerOnly: false,
    usage: 'clear',
    examples: ['clear', 'clear [nombre de messages]', 'clear [@mention]', 'clear [nombre de messages] [@mention]'],
    options: [
        {
            name: "nombre",
            description: "Nombres de messages à supprimer - défaut : 100",
            type: 'NUMBER',
            required: 'false'
        },
        {
            name: "user",
            description: "Membre à qui on va supprimer ses messages",
            type: 'USER',
            required: 'false'
        }
    ],

    runSlash: async (client, interaction) => {
        const nombre = interaction.options.getNumber("nombre") || "100"
        const membre = interaction.options.getUser("user")
        if(nombre > 100 || nombre <= 0) return interaction.editReply({content: 'Le nombre doit être supérieur à 0 et inférieur à 100 !'})
        const messagesToDel = interaction.channel.messages.fetch()
        if(membre){
            let i = 0
            const filterMembreMess = [];
            (await messagesToDel).filter(msg => {
                if(msg.author.id == membre.id && nombre > i){
                    filterMembreMess.push(msg); i++

                }
            })

            await interaction.channel.bulkDelete(filterMembreMess, true).then(async messages => {
                await interaction.reply({content: `J'ai supprimé ${nombre} messages sur l'utilisateur ${membre}.`, ephemeral: true})
            })
        }else{
            await interaction.channel.bulkDelete(nombre, true).then(async messages => {
                await interaction.reply({content: `J'ai supprimé ${nombre} messages.`, ephemeral: true})
            })
        }
    }
}