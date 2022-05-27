const { Message } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction){
        if(interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd){ return interaction.reply({text: "Cette commande n'existe pas !", ephemeral: true}) }
            if(!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({content: `Vous n'avez pas les permissions !\nPermissions manquantes : \`${cmd.permissions.join(', ')}\``, ephemeral: true})
            cmd.runSlash(client, interaction)
        }
    }
}