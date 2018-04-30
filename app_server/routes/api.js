'use strict';
// importing the required dependecies //
const express = require('express');
const router = express.Router();
const aws = require('./../config/aws');
const upload = aws.upload;


// /----- api endpoints ----/

// get all the videos
router.get('/videos', (req, res) => {
    res.send('get all videos');
});

// add a new videos
router.post('/videos', upload.single('track'), (req, res) => {
    res.send('sucessfully uploaded the file with the name ' + req.file.fieldname);
});

// get a specific video
router.get('/videos/:id', (req, res) => {
    res.send('getting new videos with the key: ' + req.params.id);
});

// delete a specific video
router.delete('/videos/:id', (req, res) => {
    res.send('delete a new videos with the key: ' + req.params.id);
});

// update a specific video
router.put('/videos/:id', (req, res) => {
    res.send('updating endpoints for the key: ' + req.params.id);
});
module.exports = router;
