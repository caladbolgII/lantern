var mongoose = require('mongoose');

var textSchema = new mongoose.Schema({
    title           :       String,
    text            :       String,
    time_in         :       Date,
    time_out        :       Date,
    classification  :       String,
    priority        :       Number
})

module.exports = Text = mongoose.model('Text', textSchema);