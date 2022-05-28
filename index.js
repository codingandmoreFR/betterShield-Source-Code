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
const chalk = require("chalk")


client.commands = new Collection()

const array = ["CommandUtil", "EventUtil"]
array.forEach(handler => { require(`./utils/handlers/${handler}`)(client) })

process.on('exit', code => { Logger.client(`----------\nProcessus arrêté.\nCode : ${code}\n----------`) })
process.on("uncaughtException", (err, origin) => { Logger.error(`----------\nUncaugth Exception :\nErreur : ${err}\n-----\nOrigine : ${origin}\n----------`) })
process.on("unhandledRejection", (reason, promise) => { Logger.warn(`----------\nUnhandled Rejection :\nRaison : ${reason}\n-----\nPromise : ${promise}\n----------`) })
process.on("warning", (...args) => { Logger.warn(...args) })

client.on("guildMemberAdd", (member) => {
    member.roles.add("978763926013616199")
})


/*
mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 
}).then(() => {
    Logger.client("- Connecté à la base de données.")
}).catch(err => {
    Logger.warn("- Non connecté à la base de données." + err)
})*/

client.login(process.env.DISCORD_TOKEN)