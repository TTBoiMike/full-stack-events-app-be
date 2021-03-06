const mongooose = require('mongoose')

const eventSchema = mongooose.Schema({
    name: String,
    location: String,
    date: String,
    time: String,
    description: String,
    favourite: Boolean,
    user: String
})

module.exports.Event = mongooose.model('Event', eventSchema)