module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction){
        if(interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd){ return interaction.reply({text: "Cette commande n'existe pas !", ephemeral: true}) }
            cmd.runSlash(client, interaction)
        }
    }
}