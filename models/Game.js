const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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
        required: [true, 'Please enter the average playtime (number or range formatted as 30-60)']
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