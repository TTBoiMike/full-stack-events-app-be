const mongooose = require('mongoose')

const userSchema = mongooose.Schema({
    username: String,
    password: String
})

module.exports.User = mongooose.model('User', userSchema)

