const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    once: false,
    execute(client, member){
        let embed = new MessageEmbed()
            .setTitle("Bienvenue !")
            .setDescription(`Souhaitons la bienvenue à <@${member.id}> !`)
        client.guilds.cache.get("916457476679938128").channels.cache.get("979013638239178853").send({embeds: [embed]})
        member.roles.add("978763926013616199")
            .catch(err => { console.error(`Impossible de rajouter le rôle à ${member.displayName}...\nErreur :\n${err}`); });
    }
}
