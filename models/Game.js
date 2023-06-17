const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    players: {
        type: String,
        required: [true, 'Please enter the number of players']
    },
    time: {
        type: String,
        required: [true, 'Please enter the average playtime']
    },
    publisher: {
        type: String,
        required: false
    },
    designer: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Game', gameSchema)