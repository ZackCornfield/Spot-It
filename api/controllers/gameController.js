const db = require('../db/queries');

async function getTargets(req, res) {
    try {
        const limit = 3;

        console.log(`Fetching ${limit} random targets...`);
        const targets = await db.getRandomTargets(limit);

        res.json(targets);  
    }
    catch (error) {
        console.error('Error fetching targets:', error);
        res.status(500).json({ error: 'Failed to fetch targets' });
    }   
}

async function getScores(req, res) {
    try {
        console.log('Fetching high scores...');
        const players = await db.getAllPlayers();

        scores.length >= 1 ? res.json(players) : res.json({ message: 'No scores found' });  
    }
    catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Failed to fetch scores' });
    }
}

async function postGuess(req, res) {
    try {
        const { name, x, y } = req.body;

        if (!name || !x || !y) {
            return res.status(400).json({ error: 'Missing required fields' });
        }   

        const correct = await db.isGuessCorrect(name, x, y);

        res.json({ correct });
    }
    catch (error) {
        console.error('Error checking guess:', error);
        res.status(500).json({ error: 'Failed to check guess' });
    }
}   

async function saveScore(req, res) {
    try {
        const { name, score } = req.body;

        if (!name || !score) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await db.createPlayer(name, score);

        res.json({ message: 'Score saved' });
    }
    catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Failed to save score' });
    }
}

module.exports = {
    getTargets,
    getScores,
    postGuess,
    saveScore
};