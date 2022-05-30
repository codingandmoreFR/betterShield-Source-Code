const ownerID = ['698861684932214794', '604731411223674901', '596273686290497546', '852674430143430677'];

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction){
        if(interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd){ return interaction.reply({text: "Cette commande n'existe pas !", ephemeral: true}) }
            if(!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({content: `Vous n'avez pas les permissions !\nPermissions manquantes : \`${cmd.permissions.join(', ')}\``, ephemeral: true})
            if(cmd.ownerOnly){
                if(interaction.user.id != ownerID){
                    return interaction.reply({content: "Vous n'avez pas la permission ! Seul l'owner du bot peut éxécuter cette commande.", ephemeral: true})
                }
            }
            cmd.runSlash(client, interaction)
        } else if (interaction.isAutocomplete()) {
            const cmd = client.commands.get(interaction.commandName);
            if (cmd?.autocomplete) cmd.autocomplete(interaction, interaction.options.getFocused())
            
        }
    }
}