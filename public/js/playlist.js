window.onload = function() {
var socket = io.connect('http://192.168.1.129:8000/');
	var videoList = [],
	    imageList = ["https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xft1/t51.2885-15/10817620_944551618909324_1166427890_n.jpg"],
	    textList = [];
	var videoList_index = 0,
	    imageList_index = 0,
	    textList_index = 0;
	var image_duration,
		text_duration;

	socket.on('updatedVideoList', function(data){
		videoList = data;

	});
	socket.on('updatedImageList', function(data){
		imageList = data;
	});
	socket.on('updatedTextList', function(data){
		textList = data;
	});

	var getNextImage = function(index) {
		socket.emit('change1', index);
		//$(image-carousel).slick('slickRemove',index);
		/*
		imageList_index = index;
		imageList_index++;
		var image = imageList[imageList_index];
		var image_slide = document.createElement('img');
		image_slide.setAttribute('src', image);
		$(image-carousel).slick('slickAdd',image_slide);
		*/
		/*
		if((image.classification === 'exam') || (image.classification === 'quiz')){
			image_duration = 10;
		} else if((image.classification === 'seatwork') || (image.classification === 'homework')){
			image_duration = 9;
		} else {
			image_duration = 8;
		}
		*/
}// error here

}
