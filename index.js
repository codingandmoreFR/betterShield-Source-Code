/*
Repository GitHub : https://github.com/codingandmoreFR/betterShield/upload/main
*/

const { Client, Collection, MessageEmbed } = require("discord.js")
const { prefix } = require("./config/config.json")
const { noir, blanc } = require("./config/colors.json")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
const client = new Client({ intents: 515 });
const dayjs = require("dayjs")

client.commands = new Collection()

const array = ["CommandUtil", "EventUtil"]
array.forEach(handler => { require(`./utils/handlers/${handler}`)(client) })
/*
process.on('exit', code => { console.log(`----------\nProcessus arrêté.\nCode : ${code}\n----------`) })
process.on("uncaughtException", (err, origin) => { console.log(`----------\nUncaugth Exception :\nErreur : ${err}\n-----\nOrigine : ${origin}\n----------`) })
process.on("unhandledRejection", (reason, promise) => { console.log(`----------\nUnhandled Rejection :\nRaison : ${reason}\n-----\nPromise : ${promise}\n----------`) })
process.on("warning", (...args) => { console.log(...args) })
*/
client.on("guildMemberAdd", (member) => {
    member.roles.add("978763926013616199")
})

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 
}).then(() => {
    console.log("Connection à la base de données réussie.")
}).catch(err => {
    console.log("Erreur lors de la connection à la base de données :" + err)
})

client.login(process.env.DISCORD_TOKEN)