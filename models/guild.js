const mongoose = require("mongoose")
const guildSchema = mongoose.Schema({
    idGuild: String,
    logChannel: { 'type': String, 'default': 'N/A' }
})

module.exports = mongoose.model('Guild', guildSchema)