const express = require('express');
const router = express.Router();


router.get('/musics', (req, res) => {
res.json({
    'title': 'toxicity',
    'band': 'system of down',
    'duration': 3.56,
    'genre': 'hard metal',
    'year': '2003',
});
});

module.exports = router;
