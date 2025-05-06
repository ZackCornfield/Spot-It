const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const oopsie = 'Wrong Page...';

        res.json(oopsie);   
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;