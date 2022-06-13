module.exports = {
    name: "seturl",
    description: "Règle l'url personalisé du serveur",
    category: 'administration',
    ownerOnly: false,
    usage: 'seturl <code>',
    examples: ['seturl <code>'],
    permissions: ['ADMINISTRATOR'],
    options: [{
        type: 'STRING',
        name: "code",
        required: true,
        description: 'Code à mettre dans l\'url'
    }],
    runSlash: async (client, interaction) => {
        if (interaction.guild.premiumTier != "TIER_3") return interaction.reply('Ton serveur dois être tier 3 de nitro pour avoir un url personnalisé');
        
        const code = interaction.options.getString('code');
        const oldVanity = await interaction.guild.fetchVanityData();
        if (oldVanity.code == code) {
            return interaction.reply({ ephemeral: true, content: "C'est le code actuel du serveur!" });
        };

        const data = await client.functions.discordRequest(`/guilds/${interaction.guild.id}/vanity-url`, client.token, 'PATCH', { code });  
              
        if (data.code == code) {
            interaction.reply({ content: `Code changé avec succès!\n${oldVanity.code} -> ${code}` });
        } else {
            interaction.reply({ ephemeral: true, content: 'Impossible de mettre ce code dans l\'url (déjà pris, ou invalide).' });
        };
    }
}
