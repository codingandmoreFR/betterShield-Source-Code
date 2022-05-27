const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async (commandFile) => {
        const cmd = require(commandFile)

        if(!cmd.name || !cmd.description){
            return console.log(`-----\nCommande non chargée : pas de nom et/ou description\nFichier -> ${commandFile}\n-----`)
        }

        client.commands.set(cmd.name, cmd)
        console.log(`Commande chargée : ${cmd.name}`)
    })
}

