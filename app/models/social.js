var mongoose = require('mongoose');

var socialSchema = new mongoose.Schema({
    tag             	:       String,
    social_account     	:       String
})

module.exports = Social = mongoose.model('Social', socialSchema);