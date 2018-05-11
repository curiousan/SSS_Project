'use strict';
// importing the required dependecies //
const express = require('express');
const router = express.Router();
const videoController = require('./../controller/videoController');
const userController = require('./../controller/userController');
const index = require('./index');

// /----- api endpoints ----/


/*
** API endpoints for videos
 */

// get all the videos

/**
 * @api {get} /videos All videos
 * @apiName getAllVideos
 * @apiGroup Videos
 * @apiSuccess {Object[]} videos Video's list
 * @apiSuccess {Number} videos.length videos duration
 * @apiSuccess {Date} videos.uploadedOn uploaded date of the vide
 * @apiSuccess {Number} videos.views total views of the videos
 * @apiSuccess {String} videos._id unique identification of the video
 * @apiSuccess {String} videos.title Title/Name of the video
 * @apiSuccess {String} videos.category category where video belongs
 * @apiSuccess {String} videos.desc Little description of the video
 * @apiSuccess {String} videos.user the email of the video uploader
 * @apiSuccess {String} videos.progressiveSrc the progressive source of the video uploader
 * @apiSuccess {String} videos.dashSrc the source for DASH streaming format
 * @apiSuccess {String} videos.hlsSrc the source for HLS streaming format
 * @apiSuccess {String} videos.thumbSrc the source for the custom thumbnail
 * @apiSuccess {String[]} videos.artists the list of owner/artist of the video
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *      [{
 *      "length": 0,
 *       "uploadedOn": "2018-05-03T10:18:25.023Z",
 *       "views": 0,
 *       "artists": [
 *           "DJ Snake Sandesh"
 *       ],
 *
 *      "_id": "5aeae337a0385d1172d2159a",
 *       "title": "DJ Snake - Magenta Riddim",
 *       "category": "EDM",
 *       "desc": "Great  funny video with heart beating beats. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525343031076",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525343031076-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525343031076-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525343031076-00010.png",
 *       "__v": 0
 *   },
 *   {
 *       "length": 0,
 *       "uploadedOn": "2018-05-04T04:52:12.398Z",
 *       "views": 0,
 *       "artists": [
 *           "Sandesh POudel"
 *       ],
 *       "_id": "5aebeafab3c45b05078e6dcc",
 *       "title": "4k_city",
 *       "category": "POP",
 *       "desc": "4k aerial footage over the city. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525410551525",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525410551525-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525410551525-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525410551525-00002.png",
 *       "__v": 0
 *   }]
 *@apiErrorExample {json} videos error
 *  HTTP/1.1 500 Internal Server Error
*/
router.get('/videos', (req, res) =>{
    videoController.allVideos(req, (err, data) =>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

// add a new videos

/**
 * @api {post} /videos Add new video
 * @apiName addVideo
 * @apiGroup Videos
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *      "Content-Type" : "application/x-www-form-urlencoded",
 *      "Authorization": "Basic c2FuZGVzaDpwb3VkZWw="
 *  }
 * @apiParamExample {json} Input:
 *      {
 *      "video-title": "Ed sheeran Perfect",
 *      "video-category": "Entertainment",
 *      "video-artist": "Ed sheeran",
 *      "desc": "This was Ed sheeran best music video ever",
 *      "video": "Some binary media"
 *      }
 * @apiSuccess {String} message info to the user
 * @apiErrorExample {json} unauthorized User:
 * HTTP/1.1 401. unauthorize access
 * @apiErrorExample {json} media Not Found:
 * HTTP/1.1 404 Media not found
 */
router.post('/videos', index.isLoggedIn, videoController.addNewVideo);

/**
* @api {get} /videos/:id get a unique video
 * @apiName getSingleVideo
 * @apiGroup Videos
 * @apiParam {id} id video id
 * @apiSuccess {Object} video the requested video
 * @apiSuccess {Number} video.length videos duration
 * @apiSuccess {Date} video.uploadedOn uploaded date of the vide
 * @apiSuccess {Number} video.views total views of the videos
 * @apiSuccess {String} video._id unique identification of the video
 * @apiSuccess {String} video.title Title/Name of the video
 * @apiSuccess {String} video.category category where video belongs
 * @apiSuccess {String} video.desc Little description of the video
 * @apiSuccess {String} video.user the email of the video uploader
 * @apiSuccess {String} video.progressiveSrc the progressive source of the video uploader
 * @apiSuccess {String} video.dashSrc the source for DASH streaming format
 * @apiSuccess {String} video.hlsSrc the source for HLS streaming format
 * @apiSuccess {String} video.thumbSrc the source for the custom thumbnail
 * @apiSuccess {String[]} video.artists the list of owner/artist of the video
 * @apiSuccessExample {json } response-Example:
 * {
 *       "length": 0,
 *       "uploadedOn": "2018-05-04T04:52:12.398Z",
 *       "views": 0,
 *       "artists": [
 *           "Sandesh POudel"
 *       ],
 *       "_id": "5aebeafab3c45b05078e6dcc",
 *       "title": "4k_city",
 *       "category": "POP",
 *       "desc": "4k aerial footage over the city. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525410551525",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525410551525-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525410551525-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525410551525-00002.png",
 *       "__v": 0
 *   }
 * @apiErrorExample {json} Media not found
 *      HTTP/1.1 404 Not found
*/
// get a specific video
router.get('/videos/:id', (req, res)=>{
    videoController.singleVideo(req, (err, data)=> {
        if (err) return res.send(err);
        return res.json(data);
    });
});

/**
 * @api {delete} /videos/:id delete a unique video
 * @apiName deleteVideo
 * @apiGroup Videos
 * @apiParam {id} id video id
 * @apiHeaderExample {json} Header-Example:
 *  {
 *      "Content-Type" : "application/JSON",
 *      "Authorization": "Basic c2FuZGVzaDpwb3VkZWw="
 *  }
 * @apiSuccess {Object} requested video to delete
 * @apiSuccess {Number} video.length videos duration
 * @apiSuccess {Date} video.uploadedOn uploaded date of the vide
 * @apiSuccess {Number} video.views total views of the videos
 * @apiSuccess {String} video._id unique identification of the video
 * @apiSuccess {String} video.title Title/Name of the video
 * @apiSuccess {String} video.category category where video belongs
 * @apiSuccess {String} video.desc Little description of the video
 * @apiSuccess {String} video.user the email of the video uploader
 * @apiSuccess {String} video.progressiveSrc the progressive source of the video uploader
 * @apiSuccess {String} video.dashSrc the source for DASH streaming format
 * @apiSuccess {String} video.hlsSrc the source for HLS streaming format
 * @apiSuccess {String} video.thumbSrc the source for the custom thumbnail
 * @apiSuccess {String[]} video.artists the list of owner/artist of the video
 * @apiSuccessExample {json } response-Example:
 * {
 *       "length": 0,
 *       "uploadedOn": "2018-05-04T04:52:12.398Z",
 *       "views": 0,
 *       "artists": [
 *           "Sandesh POudel"
 *       ],
 *       "_id": "5aebeafab3c45b05078e6dcc",
 *       "title": "4k_city",
 *       "category": "POP",
 *       "desc": "4k aerial footage over the city. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525410551525",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525410551525-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525410551525-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525410551525-00002.png",
 *       "__v": 0
 *   }
 * @apiErrorExample {json} User Match Error:
 *      HTTP/1.1 401 ERR: Please make you sure you are the owner of video
 *
 * @apiError {json} Media not found:
 *  HTTP/1.1 404 file was not found
 */
// delete a specific video
router.delete('/videos/:id', videoController.deleteVideo);

// update a specific video

/**
 * @api {put} /videos/:id update a unique video
 * @apiName updateVideo
 * @apiGroup Videos
 * @apiParam {String} id video id
 * @apiHeaderExample {json} Header-Example:
 *  {
 *      "Content-Type" : "application/json",
 *      "Authorization": "Basic c2FuZGVzaDpwb3VkZWw="
 *  }
 * @apiParamExample {json} Request Example:
 * {
 *      "video-title": "Ed sheeran Perfect",
 *      "video-category": "Entertainment",
 *      "video-artist": "Ed sheeran",
 *      "desc": "This was Ed sheeran best music video ever",
 * }
 * @apiSuccess {Object} video the requested video
 * @apiSuccess {Number} video.length videos duration
 * @apiSuccess {Date} video.uploadedOn uploaded date of the vide
 * @apiSuccess {Number} video.views total views of the videos
 * @apiSuccess {String} video._id unique identification of the video
 * @apiSuccess {String} video.title Title/Name of the video
 * @apiSuccess {String} video.category category where video belongs
 * @apiSuccess {String} video.desc Little description of the video
 * @apiSuccess {String} video.user the email of the video uploader
 * @apiSuccess {String} video.progressiveSrc the progressive source of the video uploader
 * @apiSuccess {String} video.dashSrc the source for DASH streaming format
 * @apiSuccess {String} video.hlsSrc the source for HLS streaming format
 * @apiSuccess {String} video.thumbSrc the source for the custom thumbnail
 * @apiSuccess {String[]} video.artists the list of owner/artist of the video
 * @apiSuccessExample {json } response-Example:
 * {
 *       "length": 0,
 *       "uploadedOn": "2018-05-04T04:52:12.398Z",
 *       "views": 0,
 *       "artists": [
 *           "Sandesh POudel"
 *       ],
 *       "_id": "5aebeafab3c45b05078e6dcc",
 *       "title": "4k_city",
 *       "category": "POP",
 *       "desc": "4k aerial footage over the city. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525410551525",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525410551525-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525410551525-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525410551525-00002.png",
 *       "__v": 0
 *   }
 * @apiErrorExample {json} User Match Error:
 *      HTTP/1.1 401 ERR: Please make you sure you are the owner of video
 *
 * @apiError {json} Media not found:
 *  HTTP/1.1 404 file was not found
 */
router.put('/videos/:id', videoController.updateVideo);

// get video based on category

/**
 * * @api {get} /videos/category/ get the video of specific id
 * @apiName getVideosByCategory
 * @apiGroup Videos
 * @apiParam {String} category the category of the videos
 * @apiSuccess {Object[]} video The list of the requested videos
 * @apiSuccess {Number} video.length videos duration
 * @apiSuccess {Date} video.uploadedOn uploaded date of the vide
 * @apiSuccess {Number} video.views total views of the videos
 * @apiSuccess {String} video._id unique identification of the video
 * @apiSuccess {String} video.title Title/Name of the video
 * @apiSuccess {String} video.category category where video belongs
 * @apiSuccess {String} video.desc Little description of the video
 * @apiSuccess {String} video.user the email of the video uploader
 * @apiSuccess {String} video.progressiveSrc the progressive source of the video uploader
 * @apiSuccess {String} video.dashSrc the source for DASH streaming format
 * @apiSuccess {String} video.hlsSrc the source for HLS streaming format
 * @apiSuccess {String} video.thumbSrc the source for the custom thumbnail
 * @apiSuccess {String[]} video.artists the list of owner/artist of the video
 * @apiSuccessExample {json } response-Example:
 * [{
 *       "length": 0,
 *       "uploadedOn": "2018-05-04T04:52:12.398Z",
 *       "views": 0,
 *       "artists": [
 *           "Sandesh POudel"
 *       ],
 *       "_id": "5aebeafab3c45b05078e6dcc",
 *       "title": "4k_city",
 *       "category": "POP",
 *       "desc": "4k aerial footage over the city. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525410551525",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525410551525-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525410551525-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525410551525-00002.png",
 *       "__v": 0
 *   },
 *   {
 *       "length": 0,
 *       "uploadedOn": "2018-05-04T04:52:12.398Z",
 *       "views": 0,
 *       "artists": [
 *           "Sandesh POudel"
 *       ],
 *       "_id": "5aebeafab3c45b05078e6dcc",
 *       "title": "4k_city",
 *       "category": "POP",
 *       "desc": "4k aerial footage over the city. ",
 *       "user": "Sandesh Poudel",
 *       "progressiveSrc": "video-1525410551525",
 *       "dashSrc": "d2kxths7qfsef9.cloudfront.net/dash/video-1525410551525-master.mpd",
 *       "hlsSrc": "d2kxths7qfsef9.cloudfront.net/hls/video-1525410551525-master.m3u8",
 *       "thumbSrc": "https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/video-1525410551525-00002.png",
 *       "__v": 0
 *   }]
 */
router.get('videos/category/', (req, res) =>{
    const result = videoController.getVideoByCategory(req.query.value);
    res.json(result);
});

// get video based on search

router.get('videos/search/', videoController.getVideosByKeywords);

/*
** API endpoints for users
*/

// get all user
router.get('/users', userController.getAllUser);

// get specific user
router.get('/users/email/', userController.getUserByEmail);


module.exports = router;
