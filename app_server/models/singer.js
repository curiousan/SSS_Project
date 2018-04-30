'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const Artist = new Schema({
    name: {type: String, require: true},
    BornYear: Number,
    currentBand: String,
    type: String,
    songs: [{type: Schema.Types.ObjectId, ref: 'Track'}],
    bornCountry: String,
    role: String,
    description: String,
    isActive: Boolean,

});

module.exports = mongoose.model('Artist', Artist);
