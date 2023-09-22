const Game = require('../models/Game')

// @desc    Get all games
// @route   GET /api/games
// @access  Public
const getGames = async (req, res) => {

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const games = await Game.find({user: req.user.id})
    res.status(200).json(games)

}


// @desc    Add a game
// @route   POST /api/games
// @access  Public
const addGame = async (req, res) => {
    const name = req.body.name
    const players = req.body.players
    const time = req.body.time
    const publisher = req.body.publisher ? req.body.publisher : ""
    const designer = req.body.designer ? req.body.designer : ""

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    try {

        // if (!publisher) {
        //     if (!designer) {
        //         const createdGame = await Game.create({name, players, time})
        //         res.status(200).json(createdGame)
        //     }
        //     else {
        //         const createdGame = await Game.create({name, players, time, designer})
        //         res.status(200).json(createdGame)
        //     }
        // }
        // else {
        //     if (!designer) {
        //         const createdGame = await Game.create({name, players, time, publisher})
        //         res.status(200).json(createdGame)
        //     }
        //     else {
        //         const createdGame = await Game.create({name, players, time, publisher, designer})
        //         res.status(200).json(createdGame)
        //     }
        // }
        const createdGame = await Game.create({name, players, time, publisher, designer, user: req.user.id})
        res.status(200).json(createdGame)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// @desc    Change a game
// @route   PATCH /api/games/:id
// @access  Public
const changeGame = async (req, res) => {

    const oldGame = await Game.findById(req.params.id)

    if (!oldGame) {
        return res.status(404).json({error: 'No such game'})
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check user is editing their own herbs only
    if(oldGame.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const name = req.body.name 
    const players = req.body.players
    const time = req.body.time
    const publisher = req.body.publisher ? req.body.publisher : ""
    const designer = req.body.designer ? req.body.designer : ""

    const updatedGame = await Game.findOneAndUpdate({_id: req.params.id}, {name, players, time, publisher, designer}, {new: true})
    res.status(200).json(updatedGame)

}

// @desc    Delete a game
// @route   DELETE /api/games/:id
// @access  Public
const deleteGame = async (req, res) => {

    const game = await Game.findById(req.params.id)

    if (!game) {
        return res.status(404).json({error: 'No such game'})
    }

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // check user is only deleting their own games
    if (game.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await Game.deleteOne({_id: req.params.id})

    res.status(200).json({id: req.params.id})
}


module.exports = {
    getGames, addGame, changeGame, deleteGame
}