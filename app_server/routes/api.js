'use strict';
// importing the required dependecies //
const express = require('express');
const router = express.Router();
const videoController = require('./../controller/videoController');


// /----- api endpoints ----/

// get all the videos
router.get('/videos', (req, res) =>{
    videoController.allVideos(req, (err, data) =>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

// add a new videos
router.post('/videos', videoController.addNewVideo);

// get a specific video
router.get('/videos/:id', (req, res)=>{
    videoController.singleVideo(req, (err, data)=> {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// delete a specific video
router.delete('/videos/:id', videoController.deleteVideo);

// update a specific video
router.put('/videos/:id', videoController.updateVideo);
module.exports = router;
