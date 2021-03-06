// -------- exporting all the dependencies required ---//
'use strict';
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Video = require('./../models/video');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
// functions
const extension = (filename) => {
    let ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
};

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, './public/videos');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension(file.originalname));
    },
});


// aws tasks
// aws buckets tasks-------------------------------------

// list all the buckets
module.exports.listBuckets = (req, res) => {
    S3.listBuckets((err, data) => {
        if (err) {
            return res.json({'error': err});
        } else {
            res.json(data.Buckets);
        }
    });
};

// create a new bucket
module.exports.createBucket = (req, res) => {
    const item = req.body;
    const params = {Bucket: item.bucketName};
    S3.createBucket(params, (err, data) => {
        if (err) {
            return res.json({'err': err});
        }
        res.json(data);
    });
};

// task for files lets say Objects ------------

module.exports.getObjects = (req, res) => {
    const item = req.body;
    const params = {Bucket: item.bucketName};
    S3.getObject(params, (err, data) => {
        if (err) {
            return res.json({'err': err});
        }
        res.json(data);
    });
};

// --delete the file from the buckets
module.exports.deleteObject = (req, res) => {
    const item = req.body;
    const params = {Bucket: item.bucketName, key: item.key};
    S3.deleteObject(params, (err, data) => {
        if (err) {
            return res.json({'err': err});
        }
        res.json(data);
    });
};

// --uploading the new files via the api
module.exports.upload = multer({storage: storage});

// uploading file to aws,
module.exports.uploadfile = (req, cb) => {
    fs.readFile(req.file.path, (err, data) => {
        if (!err) {
            const fileKey = req.file.filename.replace(/\.[^/.]+$/, '');
            const useremail = req.user.local.email ? req.user.local.email : req.user.facebook.email;
            const newVideo = new Video({
                title: req.body['video-title'],
                category: req.body['video-category'],
                artists: req.body['video-artists'],
                desc: req.body.desc,
                user: useremail,
                progressiveSrc: fileKey,
                dashSrc: process.env.CLOUDFRONT_URL + '/dash/' + fileKey + '-master.mpd',
                hlsSrc: process.env.CLOUDFRONT_URL + '/hls/' + fileKey + '-master.m3u8',
                thumbSrc: process.env.AWS_STORAGE_LINK + 's3-media-out/thumbs/' + fileKey + '-00002.png',
                views: Math.floor(Math.random() * (100 - 1)),
            });

            const params = {
                Bucket: process.env.AWS_INPUT_BUCKET,
                Key: fileKey,
                Body: data,
            };

            new Promise((resolve, reject) => {
                ffprobe(req.file.path, {path: ffprobeStatic.path}).then((info) => {
                    newVideo.length = (parseFloat(info.streams[0].duration) / 60).toFixed(2);
                    resolve(newVideo);
                }).catch((err) => {
                    newVideo.length = 0;
                    resolve(newVideo);

                })
            }).then(newVideo => {
                S3.putObject(params, (err, data) => {
                    if (!err) {
                        fs.unlinkSync(req.file.path);
                        Video.create(newVideo, (err, data) => {
                            console.log(data || err)

                        })
                    }
                });

            });

            return cb(null, 'Upload Success and your video will take few minutes to be processed!!');

        } else {
            return cb(err, null);
        }

    });


};

