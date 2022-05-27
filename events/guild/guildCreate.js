const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildCreate",
    once: false,
    async execute(client, guild){
        console.log("on m'a ajouté à un serveur !")
        let owner = await guild.fetchOwner();
        let embed = new MessageEmbed()
            .setTitle("Nouveau serveur !")
            .addField("Nom :", `${guild.name}`)
            .addField("Id :", `${guild.id}`)
            .addField("Owner :", `${owner}, ${owner.id}`)
        client.guilds.cache.get("916457476679938128").channels.cache.get("979092094603919371").send({embeds: [embed]})
    }
}