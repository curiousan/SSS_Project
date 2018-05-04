// all the functions to do operation on video model

// imports
'use strict';
const Video = require('./../models/video');
const aws = require('./../config/aws');

// common errors and validation handlers
const errHandler = (err) =>{
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    return console.error(err.message);
};

// get all available videos

module.exports.allVideos =(req, cb)=>{
    return Video.find({}, (err, videos)=>{
        if (err) {
            errHandler(err);
            return cb(err, null);
        }
        return cb(null, videos);
    });
};


// get a specific video with id

module.exports.singleVideo = (req, cb) => {
    return Video.findById(req.params.id, (err, data)=>{
        if (err) {
            errHandler(err);
            return cb(err, null);
        }
        return cb(null, data);
    });
};


// add a new video
module.exports.addNewVideo =(req, res)=>{
    aws.uploadfile(req, (err, msg) =>{
        if (err) return res.send(err);
       return res.redirect('/');
    });
};

// update the existing videos
module.exports.updateVideo = (req, res)=>{
    return Video.findOne({id: req.params.id}, (err, video)=>{
        if (err) return errHandler(err);
    });
};

// delete the existing videos

module.exports.deleteVideo = (req, res)=>{
    return Video.findOneAndRemove({id: req.params.id}, (err, video) =>{
        if (err) return errHandler(err);
        return res.json(video);
    });
};
