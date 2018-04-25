const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const Track = new Schema({
    name: {type: String, require: true},
    length: {type: Number, require: true, default: 0},
    src: {type: String, require: true},
    owner:{ type: Object, require: true},
    category: { type: String},
    created: {type: Date, default: Date.now()},
    views: {type: Number, default: 0},

});

