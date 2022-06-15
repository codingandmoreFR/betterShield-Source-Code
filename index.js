/*
Repository GitHub : https://github.com/codingandmoreFR/betterShield/upload/main
*/

const { Client, Collection } = require("discord.js")
const { prefix } = require("./config/config.json")
const { noir, blanc } = require("./config/colors.json")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const client = new Client({ intents: 32767 });
const dayjs = require("dayjs")
const chalk = require("chalk")
const Logger = require("./utils/Logger")
const { DisTube } = require("distube")
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
// const sqlite3 = require("sqlite3").verbose();
// const dbname = 'main.db'



client.commands = new Collection();
client.functions = require('./utils/Functions');

const array = ["CommandUtil", "EventUtil"]
array.forEach(handler => { require(`./utils/handlers/${handler}`)(client) })

// process.on('exit', code => { Logger.client(`Processus arrêté.\nCode : ${code}`) })
// process.on("uncaughtException", (err, origin) => { Logger.error(`Uncaugth Exception :\nErreur : ${err}\nOrigine : ${origin}`) })
// process.on("unhandledRejection", (reason, promise) => { Logger.warn(`Unhandled Rejection :\nRaison : ${reason}\nPromise : ${promise}`) })
// process.on("warning", (...args) => { Logger.warn(...args) })

client.on("guildMemberAdd", (member) => {
    member.roles.add("978763926013616199")
})

client.distube = new DisTube(client, {
    searchSongs: 0, /// SET TO 5 FOR ENABLE SEARCH MODE!
    searchCooldown: 30,
    leaveOnEmpty: true,
    emptyCooldown: 60,
    leaveOnFinish: true,
    leaveOnStop: true,
    youtubeDL: false,
    plugins: [
    new SoundCloudPlugin(), 
    new SpotifyPlugin({
        emitEventsAfterFetching: true
    })],
});

//ouverture bdd

// let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE, err => {
//     if(err)
//         throw err

//     Logger.client('Database start : ' + dbname)
// })

// db.on("error", function(error) {
//     Logger.warn("Getting an error : ", error);
// });


// module.exports = {
//     db
// }

// mongoose.connect(process.env.DATABASE_URI, {
//     autoIndex: false,
//     maxPoolSize: 10,
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//     family: 4 
// }).then(() => {
//     Logger.client("- Connecté à la base de données.")
// }).catch(err => {
//     Logger.warn("- Non connecté à la base de données." + err)
// })

client.login();