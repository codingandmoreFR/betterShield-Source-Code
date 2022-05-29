const Logger = require("../../utils/Logger")

module.exports = {
    name: "ready",
    once: true,
    async execute(client){
        Logger.client("betterShield allumé avec succès.")

        const devGuild = await client.guilds.cache.get("916457476679938128")
        devGuild.commands.set(client.commands.map(cmd => cmd));
        const devGuild2 = await client.guilds.cache.get("776130435549364284")
        devGuild2.commands.set(client.commands.map(cmd => cmd));
    }
}