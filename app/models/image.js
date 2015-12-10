var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    title           :       String,
    image_url       :       String,
    time_in         :       Date,
    time_out        :       Date,
    classification  :       String,
    priority        :       Number
})

module.exports = Image = mongoose.model('Image', imageSchema);