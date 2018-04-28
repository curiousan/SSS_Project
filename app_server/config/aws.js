// -------- exporting all the dependencies required ---//
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const defaultBucket = process.env.AWS_BUCKET;

// aws tasks
// aws buckets tasks-------------------------------------

// list all the buckets
module.exports.listBuckets=(req, res) => {
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

module.exports.getObjects = (req, res) =>{
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
module.exports.deleteObject = (req, res)=>{
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
module.exports.upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: defaultBucket,
            metadata: (req, file, callback) => {
                callback(null, {fieldName: file.fieldname});
            },
            key: (req, file, callback) => {
                callback(null, Date.now().toString());
            },

        }),
    });

