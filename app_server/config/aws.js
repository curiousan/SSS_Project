const AWS = require('aws-sdk');
const s3 = new AWS.s3();

const bucket = process.env.AWS_BUCKET;
const key = process.env.AWS_KEY;

s3.createBucket({Bucket: bucket}, (err, data) => {
    if (err) console.log(err);
    else {
       console.log('AWS s3 connected successfully'); 
    }
});