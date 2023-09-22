const express = require('express')
const { getGames, addGame, changeGame, deleteGame } = require('../controllers/gameController')
const {protect} = require('../middleware/authMiddleware');

const router = express.Router()

router.get('/', protect, getGames) 

router.post('/', protect, addGame)

router.patch('/:id', protect, changeGame)

router.delete('/:id', protect, deleteGame)

module.exports = router