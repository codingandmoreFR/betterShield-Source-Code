const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    description: "Ajoute moi !",
    category: 'utiles',
    ownerOnly: false,
    usage: 'invite',
    examples: ['invite'],
    permissions: [],
    runSlash: async (client, interaction) => {
        await interaction.deferReply();
        let embed = new MessageEmbed()
        .setTitle("Ajoute moi !")
        .setDescription("Hey, tu souhaite m'ajouter pour parfaire ton serveur ! Je suis rempli de commandes très utiles et que tu ne trouveras pas forcément sur d'autres bots. De plus je réunis pleins de commandes en 1 seul bot pour éviter d'avoir pleins de bots parasites sur ton serveur :) Alors si tu souhaite m'ajouter clique sur le lien juste en dessous ! Si le lien ne fonctionne pas, contacte mon créateur, il t'aidera. Merci beaucoup :)")
        .addField("Lien : ", "https://discord.com/api/oauth2/authorize?client_id=979102811197415474&permissions=0&scope=bot%20applications.commands")
        .addField("Support : ", "https://discord.gg/betterShield")
        .addField("Créateurs(ices) : ", "Malcolm#2939, Nanapiou#9565, Xecozz#1321")
        .setTimestamp()
        await interaction.editReply({embeds: [embed]})
    }
}