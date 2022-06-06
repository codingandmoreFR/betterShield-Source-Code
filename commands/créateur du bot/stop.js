module.exports = {
    name: "stop",
    description: "Arrête le bot",
    category: 'fondateur du bot',
    permissions: [],
    ownerOnly: true,
    usage: 'stop',
    examples: ['stop'],

    runSlash: async (client, interaction) => {
        await interaction.deferReply()
        await interaction.editReply({ content: 'Arrêt du bot <a:waiting:980891125478985758> ' })
            .then(() => interaction.channel.send("Bot arrêté."))
            .then(() => client.destroy())
    }
}