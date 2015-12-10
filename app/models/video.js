var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    video_id        :       String,
    time_in         :       Date,
    time_out        :       Date,
    classification  :       String,
    priority        :       Number 
})

module.exports = Video = mongoose.model('Video', videoSchema);