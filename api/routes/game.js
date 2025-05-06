const express = require('express'); 
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getTargets); 

router.get('/scores', gameController.getScores);

router.post('/guess', gameController.postGuess);

router.post('/save', gameController.saveScore);

module.exports = router;