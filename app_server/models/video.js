'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Video = new Schema({
    title: {type: String, require: true},
    length: {type: Number, require: true, default: 0},
    progressiveSrc: {type: String, require: true},
    user: {type: String},
    category: {type: String},
    uploadedOn: {type: Date, default: Date.now()},
    views: {type: Number, default: 0},
    ratings: {type: Number, min: 0, max: 5},
    year: Number,
    language: String,
    artists: [String],
    desc: String,
    hlsSrc: String,
    dashSrc: String,
    thumbSrc: String,

});
module.exports = mongoose.model('Video', Video);
