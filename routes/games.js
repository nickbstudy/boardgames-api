const express = require('express')
const { getGames, addGame, changeGame, deleteGame } = require('../controllers/gameController')

const router = express.Router()

router.get('/', getGames) 

router.post('/', addGame)

router.patch('/:id', changeGame)

router.delete('/:id', deleteGame)

module.exports = router