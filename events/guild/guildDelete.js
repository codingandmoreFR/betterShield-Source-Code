const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildDelete",
    once: false,
    async execute(client, guild){
        console.log("on m'a supprimé d'un serveur !")
        let owner = await guild.fetchOwner();
        let embed = new MessageEmbed()
            .setTitle("On m'a supprimé d'un serveur !")
            .addField("Nom :", `${guild.name}`)
            .addField("Id :", `${guild.id}`)
            .addField("Owner :", `${owner}, ${owner.id}`)
        client.guilds.cache.get("916457476679938128").channels.cache.get("979092094603919371").send({embeds: [embed]})
    }
}