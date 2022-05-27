module.exports = {
    name: "ready",
    once: true,
    async execute(client){
        console.log("betterShield allumé avec succès.")

        const devGuild = await client.guilds.cache.get("916457476679938128")
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}