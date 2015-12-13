var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    username        :       String,
    time_in         :       Date,
    user_photo      :       String,
    tweet_text      :       String,
    tweet_img       :       String
})

module.exports = Tweet = mongoose.model('Tweet', tweetSchema);
