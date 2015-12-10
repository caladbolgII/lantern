var Video = require('./models/video'),
    Text = require('./models/text'),
	Image = require('./models/image'),
	Social = require('./models/social');
var prio = require('../prio');
var ts = require('../timeStamp');


module.exports = function(app, io, mongoose, path) {
var qm = require('../queueManager')(io);
var request = require('request');

	app.get('/', function(req,res){
		res.render('index.ejs');

	});
	app.get('/layout1', function(req,res){
		  res.render('layout1.ejs');
	});
	app.get('/layout2', function(req,res){
		  res.render('layout2.ejs');
	});
	app.get('/layout3', function(req,res){
		  res.render('layout3.ejs');
	});
	app.get('/videos', function(req,res){
		Video.find({}, function(err, videos){
       		if (err) throw err;
        	console.log(videos);
        	res.send(videos);
    	});
	});

	app.get('/images', function(req,res){
    	Image.find({}, function(err, images){
        	if (err) throw err;
        	//console.log(images);
        	res.send(images);
    	});
	});

	app.get('/texts', function(req,res){
    	Text.find({}, function(err, texts){
        	if (err) throw err;
        	//console.log(texts);
        	res.send(texts);
    	});
	});

	app.get('/social', function(req, res){
		Social.find({}, function(err, accounts){
        	if (err) throw err;
        	console.log(accounts);
        	res.send(accounts);
    	});
	});

	app.post('/message', function(req, res){
		io.sockets.emit('message1', {'name': req.body.name ,'message': req.body.message});
		console.log(req.body);
		res.send('201: OK');
	});

	app.post('/email', function(req, res){
		res.send('200');
		console.log(req);
	});
	app.get('/igpost', function(req, res){
		console.log(req.query);
		res.send(req.query['hub.challenge']);
	});
	app.post('/igpost', function(req, res){
		//console.log(req);
		request('https://api.instagram.com/v1/tags/bbcast/media/recent?client_id=086b493264514b5cb82d65d7f4859663', function (error, response, body) {
  			if (!error && response.statusCode === 200) {
    			console.log(body) // Show the HTML for the Google homepage.
  			} else{
				console.log(error);
			}
		});
		res.send('200');
	});


	app.post('/videos', function(req,res){
		if(req.body.action === 'add') {
			var timein = ts.getTimeIn();
        	var timeout = ts.getTimeOut(req.body.deadline);
  			var priority = prio.getPriority(timein, timeout);
        	var new_video = Video({
            	video_id    	:   req.body.video_id,
            	time_in     	:   timein,
            	time_out    	:   timeout,
				priority		:	priority
        	});

        	new_video.save(function(err){
            	if (err) throw err;
				qm.getSortedVideos();
				//io.sockets.emit('newVideo', req.body);
				//console.log('new video');
        	});

			//io.sockets.emit('newVideoArray', {'video_array' : sorted_videos});

		}
		else if (req.body.action === 'edit') {

			Video.findById(req.body.id, function(err, video){
				if (err) throw err;
				video.video_id = req.body.video_id;
				video.deadline = req.body.deadline;

				video.save(function(err){
					if (err) throw err;
					qm.getSortedVideos();
				});

			});
			//var sorted_videos = qm.getSortedVideos();
		}
		else if(req.body.action === 'delete') {

        	Video.findByIdAndRemove(req.body.id, function(err){
            	if (err) throw err;
				qm.getSortedVideos();
        	});

		}
		else {
			res.send('Bad Request.');
		}
		res.send('201: OK');
	});
	app.post('/images', function(req, res){
		if(req.body.action === 'add') {
			var timein = ts.getTimeIn();
        	var timeout = ts.getTimeOut(req.body.deadline);
  			var priority = prio.getPriority(timein, timeout);
        	var new_image = Image({
				title			: 	req.body.title,
            	image_url   	:  	req.body.image_url,
            	time_in     	:   timein,
            	time_out    	:   timeout,
				classification	:	req.body.classification,
				priority		:	priority
        	});

        	new_image.save(function(err){
            	if (err) throw err;
            	qm.getSortedImages();
				console.log(req.body);
				//io.sockets.emit('newImage', req.body);
        	});
			//get sorted images
			//var sorted_images = qm.getSortedImages();
		}
		else if (req.body.action === 'edit') {
			Image.findById(req.body.id, function(err, image){
				if (err) throw err;
				image.image_url = req.body.image_url;
				image.deadline = req.body.deadline;
				image.classification = req.body.classification;

				image.save(function(err){
					if (err) throw err;
					qm.getSortedImages();
				});
			});
			//var sorted_images = qm.getSortedImages();
		}
		else if(req.body.action === 'delete') {
			Image.findByIdAndRemove(req.body.id, function(err){
            	if (err) throw err;
            	qm.getSortedImages();
				io.sockets.emit('deleteImage');
        	});
			//var sorted_images = qm.getSortedImages();
		}
		else {
			res.send('Bad Request');
		}
		res.send('201: OK');
	});
	app.post('/texts', function(req, res){
		if(req.body.action === 'add') {
			var timein = ts.getTimeIn();
        	var timeout = ts.getTimeOut(req.body.deadline);
  			var priority = prio.getPriority(timein, timeout);
        	var new_text = Text({
				title			:	req.body.title,
            	text			:  	req.body.text,
            	time_in     	:   timein,
            	time_out    	:   timeout,
				classification	:	req.body.classification,
				priority		:	priority
        	});

        	new_text.save(function(err){
            	if (err) throw err;
            	console.log(new_text);
				qm.getSortedTexts();
				//io.sockets.emit('newText', req.body);
        	});
			//get sorted texts
			//var sorted_texts = qm.getSortedTexts();

		}
		else if (req.body.action === 'edit') {
			Text.findById(req.body.id, function(err, text){
				if (err) throw err;
				text.deadline = req.body.deadline;
				text.text = req.body.text;
				var new_deadline = new Date(req.body.deadline);
				text.time_out = new_deadline;
				text.classification = req.body.classification;
				text.save(function(err){
					if (err) throw err;
					qm.getSortedTexts();
				});
			});
			//var sorted_texts = qm.getSortedTexts();
		}
		else if(req.body.action === 'delete') {
			Text.findByIdAndRemove(req.body.id, function(err){
            	if (err) throw err;
            	qm.getSortedTexts();
				console.log(req.body);
				io.sockets.emit('deleteText');
        	});
			//var sorted_texts = qm.getSortedTexts();
		}
		else {
			res.send('Bad Request');
		}

		res.send('201: OK');
	});
	app.post('/social', function(req, res){
		if(req.body.action === 'add') {
        	var new_social = Video({
            	tag					:  req.body.tag,
            	social_account     	:  req.body.social_account
        	});

        	new_social.save(function(err){
            	if (err) throw err;
            	console.log(new_social);
        	});
		}
		else if (req.body.action === 'edit') {
			Social.findById(req.body.id, function(err, social){
				social.tag = req.body.new_tag;
				social.social_account = req.body.new_social_account;

				social.save(function(err){
					if (err) throw err;
				});
			});

		}
		else if(req.body.action === 'delete') {
			Social.findByIdAndRemove(req.body.id, function(err){
            	if (err) throw err;
            	console.log('removed');
        	});
		}
		else {
			res.send('Bad Request');
		}
		res.send('OK');
	});


}
