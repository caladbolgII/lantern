var Video = require('./app/models/video'),
    Text = require('./app/models/text'),
	Image = require('./app/models/image');


setInterval(function(){
	var today = new Date();
	console.log(today);
	
	Video.find({}, function(err, videos){
		
		videos.forEach(function(video){
			console.log(video.time_out);
			if((today - video.time_out === 0) || (today - video.time_out < 0)){
				deleteVideo(video._id);
			}

		});
	});
	

}, 60000);

var deleteVideo = function(id) {
	Video.findByIdAndRemove(id, function(err){
    	if (err) throw err;
        console.log('Video removed');
		
		return;
	});
};

setInterval(function(){
	var today = new Date();
	console.log(today);

	Image.find({}, function(err, images){
		images.forEach(function(image){
			console.log(video.time_out);
			if((today - image.time_out === 0) || (today - image.time_out < 0)){
				deleteImage(image._id);
			}

		});
	});

}, 60000);

var deleteImage = function(id) {
	Image.findByIdAndRemove(id, function(err){
    	if (err) throw err;
        console.log('Image removed');
		
		return;
	});
};

setInterval(function(){
	var today = new Date();
	console.log(today);

	Text.find({}, function(err, texts){
		texts.forEach(function(video){
			console.log(text.time_out);
			if((today - text.time_out === 0) || (today - text.time_out < 0)){
				deleteText(text._id);
			}

		});
	});

}, 60000);

var deleteText = function(id) {
	Text.findByIdAndRemove(id, function(err){
    	if (err) throw err;
        console.log('Text removed');
		
		return;
	});
};

