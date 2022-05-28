const { prefix } = require("../../config/config.json")
const ownerID = ['698861684932214794', '604731411223674901', '596273686290497546', '852674430143430677'];

module.exports = {
    name: "messageCreate",
    once: false,
    execute(client, message){
        if(message.author.bot || message.channel.type === "dm") return;
        if(!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        if(cmdName.length == 0) return;
        if(!message.member.permissions.has([cmd.permissions])) return message.reply(`Permissions manquantes : \`${cmd.permissions.join(", ")}\`.`)
        if(cmd.ownerOnly){
            if(message.author.id != ownerID){
                return message.reply("Vous n'avez pas la permission ! Seul l'owner du bot peut éxécuter cette commande.")
            }
        }
        let cmd = client.commands.get(cmdName);
        if(cmd){ cmd.run(client, message, args) }
    }
}