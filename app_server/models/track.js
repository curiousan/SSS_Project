const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const Track = new Schema({
    title: {type: String, require: true},
    length: {type: Number, require: true, default: 0},
    src: {type: String, require: true},
    uploadedBy: {type: Object, require: true},
    category: {type: String},
    uploadedOn: {type: Date, default: Date.now()},
    views: {type: Number, default: 0},
    ratings: {type: Number, min: 0, max: 5},
    year: Number,
    thumbnail: String,
    language: String,
    artists: [{type: Schema.Types.ObjectId, ref: 'Artist'}],
    desc: String,
});

module.export.trackSchema = Track;
module.exports.track = mongoose.model('Track', Track);
