const { readdirSync } = require("fs");
const chalk = require("chalk");
const delay = require("delay");
const Logger = require("../Logger")

module.exports = async (client) => {
    try {
        readdirSync("../../events/distube/").forEach(file => {
            const event = require(`../../events/distube/${file}`);
            let eventName = file.split(".")[0];
            if(!eventName){
                return Logger.warn(`Evenement non chargé : aucun nom.\n fichier -> ${eventFile}`)
            }
            Logger.event(`Evenement chargé : ${eventName}`)
            client.distube.on(eventName, event.bind(null, client));
          });
    } catch (e) {
        console.log(e);
    }
    await delay(4000);
    Logger.event(chalk.greenBright(`[INFORMATION] Distube Events Loaded`));
};


