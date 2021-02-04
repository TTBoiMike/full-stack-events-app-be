const mongooose = require('mongoose')

const eventSchema = mongooose.Schema({
    name: String,
    location: String,
    date: String,
    time: String,
    description: String
})

module.exports.Event = mongooose.model('Event', eventSchema)