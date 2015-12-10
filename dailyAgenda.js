var Video = require('./app/models/video'),
    Text = require('./app/models/text'),
	Image = require('./app/models/image');
var request = require('request');
var notif = require('./notifManager');


var Agenda = require('agenda');
var agenda = new Agenda({db: { address: 'mongodb://localhost/UCL-BBCast'}});

agenda.define('notify about image activities today', function(job, done){
	var today = new Date();
	today.setHours(0,0,0,0);
	console.log(today);
	
	Image.find({}, function(err, images){
		images.forEach(function(image){
			
			if(today - image.time_out.setHours(0,0,0,0) === 0) {
				io.sockets.emit('notifyImageActivitiesToday', image);
			}
			
		});
	});
	
	
	done();
});

agenda.define('notify about text activities today', function(job, done){
	var today = new Date();
	today.setHours(0,0,0,0);
	console.log('hi');
	
	Text.find({}, function(err, texts){
		texts.forEach(function(text){
			
			if(today - text.time_out.setHours(0,0,0,0) === 0) {
				console.log('happening today: ' + text.title);
			}
			
		});
	});
	
	
	done();
});
var fbposts = [];
agenda.define('get facebook feed', function(job, done){
	request('https://graph.facebook.com/ucl.bbcast/feed?access_token=824373247647109|794f702c33aa1dbf0305d81a0d8e48b8', function (error, response, body) {
    	if (!error && response.statusCode === 200) {
        	var bodyObj = JSON.parse(body);
			bodyObj.data.forEach(function(data){
				fbposts.push(data.message);
			})
        	console.log(bodyObj.data[0].message); 
    	} else{
       		console.log(error);	  
    	}
	});
	done();
});


agenda.every('0 7 * * *', 'notify about image activites today');
agenda.every('0 7 * * *', 'notify about text activities today');
agenda.every('*/1 * * * *', 'get facebook feed');
agenda.start();
	





