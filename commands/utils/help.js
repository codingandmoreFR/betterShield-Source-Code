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
    options: [
        {
            name: "commande",
            description: "Nom de votre commande",
            type: 'STRING',
            required: false,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, query) => {
        const choices = [];
        interaction.client.commands.forEach(command => {
            if (choices.length < 25 && command.name.includes(query.toLowerCase())) choices.push({
                name: command.name,
                value: command.name
            });
        });
        interaction.respond(choices);
    },
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
            .setDescription(`Si tu souhaite avoir plus d'informations sur une commande, tape \`/help <commande>\`.\n**Nombres de commandes : ${client.commands.size}**`)
            .setTimestamp()
            .setFooter({ text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            for (const category of commandFolder){
                const dir = client.commands.filter(c => c.category === category)
                noArgsEmbed.addField(
                `${category.replace(/^[a-z]/, firstLetter => firstLetter.toUpperCase())} [${dir.size}]`, 
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