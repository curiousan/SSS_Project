const express = require('express');
const router = express.Router();
const aws = require('./../config/aws');
const upload = aws.upload;
router.post('/addFile', upload.array('track'), (req, res) => {
    res.send('sucessfully uploaded the file with the name '+req.files[0].fieldname);

});


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
