const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const dayjs = require("dayjs")

const contextDescription = {
    userinfo: "Donne des infos sur l'utilisateur"
}

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes du serveur",
    category: 'utiles',
    ownerOnly: false,
    usage: 'help [commande]',
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
    runSlash: async(client, interaction) => {
        await interaction.deferReply();
        const commandFolder = [];
        client.commands.forEach(cmd => {
            if (! commandFolder.includes(cmd.category)) commandFolder.push(cmd.category)
        })
        const cmdName = interaction.options.getString("commande")
        if(!cmdName){
            
            const noArgsEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commandes disponibles")
            .setDescription("Si tu souhaite avoir plus d'informations sur une commande, tape `/help <commande>`.")
            .setTimestamp()
            for (const category of commandFolder){
                noArgsEmbed.addField(
                `${category.replace(/^[a-z]/, firstLetter => firstLetter.toUpperCase())}`, 
                `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ') || "Aucune"}\``
                )
            }
            return await interaction.editReply({embeds: [noArgsEmbed]})
        }
        const cmd = client.commands.get(cmdName)
        if(!cmd) return await interaction.editReply({content: 'Cette commande n\'existe pas !', ephemeral: true})

        const cmdPerm = cmd.permissions.join(", ") || "Aucune"
        const cmdEx = cmd.examples.join(', /')
        const time = dayjs().format('DD/MM - HH:mm:ss')
        await interaction.editReply(`
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
${time}
\`\`\`
        `)
    }
}        