var Video = require('./app/models/video'),
    Text = require('./app/models/text'),
    Image = require('./app/models/image');
var mongoose = require('mongoose');

module.exports = function(io) {

    	module.getSortedVideos = function(){
            Video.find().sort({ priority : 1}).select('video_id').exec(function(err, docs){
                docs = docs.map(function(doc) { return doc.video_id; });
                io.sockets.emit('updatedVideoList', docs);
                console.log("reached QM")
            });

        };

        module.getSortedImages = function(){
            Image.find().sort({ priority : 1}).select('image_url classification').exec(function(err, docs){
                docs = docs.map(function(doc) { return doc; });
                console.log(docs);
                io.sockets.emit('updatedImageList', docs);

            });

        };

        module.getSortedTexts = function() {
            Text.find().sort({ priority : 1}).select('text classification').exec(function(err, docs){
                docs = docs.map(function(doc) { return doc;});
                console.log(docs);
                io.sockets.emit('updatedTextList', docs);

            });


        };
        return module;
};
