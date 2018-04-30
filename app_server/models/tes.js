'use strict';
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    apiVersion: '2012-09-25',
});

const eltr = new AWS.ElasticTranscoder({
    apiVersion: '2012-09-25',
    region: 'eu-west-1',
});

exports.handler = (event, context) => {
    console.log('Executing Elastic Transcoder operation');

    // configuration for automatic transcoding job
    const key = event.Records[0].s3.object.key;
    const pipelineId = 's3-media-transcoder';
    const src = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const newKey = key.split('.')[0];


    const params = {
        PipelineId: pipelineId,
        OutputKeyPrefix: newKey+'/',
        Input: {
            Key: src,
            FrameRate: 'auto',
            Resolution: 'auto',
            AspectRatio: 'auto',
            Interlaced: 'auto',
            Container: 'auto',
        },

        Outputs: [{
            Key: 'dash_4m' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-500020',
            SegmentDuration: '10',

        },
        {
            Key: 'dash_2m' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-500030',
            SegmentDuration: '10',

        },
        {
            Key: 'dash_1m' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-500040',
            SegmentDuration: '10',

        },
        {
            Key: 'dash_600k' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-500050',
            SegmentDuration: '10',

        },
        {
            Key: 'dash_128k' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-500060',
            SegmentDuration: '10',

        },
        {
            Key: 'hls_2m' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-200010',
            SegmentDuration: '10',
        },
        {
            Key: 'hls_1m' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-200030',
            SegmentDuration: '10',
        },
        {
            Key: 'hls_600k' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-500060',
            SegmentDuration: '10',
        },
        {
            Key: 'hls_160k' + '.mp4',
            ThumbnailPattern: '',
            PresetId: '1351620000001-200030',
            SegmentDuration: '10',
        }],
        Playlists: [{
            Name: 'index',
            Format: 'HLSv   4',
            OutputKeys: ['dash_4m.mp4', 'dash_2m.mp4', 'dash_1m.mp4', 'dash_600k.mp4', 'dash_128k.mp3'],
        },
        {
            Name: 'index',
            Format: 'HLSv4',
            OutputKeys: ['hls_2m.mp4', 'hls_1m.mp4', 'hls_600k.mp4', 'hls_160k.mp4'],
        }],
    };

    eltr.createJob(params, (err, data) => {
        if (err) console.log(err);
        else console.log(data);
        context.succeed('Job well done');
    });
};
