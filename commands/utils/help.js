const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const commandFolder = readdirSync("./commands")
const contextDescription = {
    userinfo: "Donne des infos sur l'utilisateur"
}

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes du serveur",
    category: 'utils',
    ownerOnly: false,
    usage: 'help',
    examples: ['help', 'help [commande]'],
    permissions: [],
    run: (client, message, args) => {
        let embedGoToSlashCommand = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Utilisation des Slash Commands")
        .setDescription("Hey, je t'invite à utiliser les slash commands ! C'est plus facile pour moi de comprendre et ça te permet d'avoir plus de facilité lors de l'execution des commandes !")
        .setTimestamp()
        message.reply({embeds: [embedGoToSlashCommand]})        
    },
    options: [
        {
            name: "commande",
            description: "Nom de votre commande",
            type: 'STRING',
            required: false
        }
    ],
    runSlash: (client, interaction) => {
        const cmdName = interaction.options.getString("commande")
        commandFile = []
        if(!cmdName){
            
            const noArgsEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commandes disponibles")
            .setDescription("Si tu souhaite avoir plus d'informations sur une commande, tape `/help <commande>`.")
            .setTimestamp()
            for (let category of commandFolder) {
                let commandFile = []
                for (let file of category) {
                    commandFile.push(file.name)
                }
                noArgsEmbed.addField(
                    `${category}`,
                    `\`${commandFile.join(', ')}\``
                )

            }
            return interaction.reply({embeds: [noArgsEmbed]})
        }
        const cmd = client.commands.get(cmdName)
        if(!cmd) return interaction.reply({content: 'Cette commande n\'existe pas !', ephemeral: true})

        const cmdPerm = cmd.permissions.join(", ") || "Aucune"
        const cmdEx = cmd.examples.join(', /')
        const argsEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`\`${cmd.name}\``)
        .setDescription(cmd.description)
        .setTimestamp()
        .setFooter({text: `Permission(s) requise(s) : ${cmdPerm}`})
        interaction.reply({embeds: [argsEmbed]})

        interaction.channel.send(`
\`\`\`makefile
[Help: Commande => ${cmd.name}] ${cmd.ownerOnly ? "/!\\ Pour les administrateurs du bot seulement /!\\" : ""}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisation : /${cmd.usage}
Exemple(s) : ${cmdEx}
Permission(s) nécéssaire(s) : ${cmdPerm}

---

/ = Slash Commande
<> = options obligatoires
[] = options facultatives
{} = sous commande disponible

Ne pas inclure ces caractères (<>, [] et {}) dans vos commandes.
\`\`\`
        `)
    }
}        