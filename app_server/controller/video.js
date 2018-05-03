// all the functions to do operation on video model

// imports
'use strict';
const Video = require('./../models/video');

// common errors and validation handlers
const errHandler = (err) =>{
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    return console.error(err.message);
};

/* const validationErr= (err, res) =>{
    Object.keys(err.errors).forEach(function(k) {
      let msg = err.errors[k].message;
      console.error('Validation error for \'%s' +': %s', k, msg);
      return res.status(404).json({
        msg: 'Please ensure required fields are filled'});
    });
  }; */


// get all available videos

module.exports.allVideos =(req, res)=>{
    return Video.find({}, (err, videos)=>{
        if (err) return errHandler(err);
        return res.json(videos);
    });
};


// get a specific video with id

module.exports.video = (req, res) => {
    return Video.findOne({id: req.params.id}, (err, video)=>{
        if (err) return errHandler(err);
        return res.json(video);
    });
};


// add a new video
module.exports.addNewVideo =(req, res)=>{

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
