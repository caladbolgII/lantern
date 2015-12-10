var express = require("express"),
    http = require("http"),
    path = require("path"),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Twit = require('twit'),
    FB = require('fb'),
    io = require("socket.io")(http),
    request = require('request'),
    IG = require('instagram-node-lib'),
    ContextIO = require('contextio');

//var ec = require('./expiryChecker');
var daily = require('./dailyAgenda');
var qm = require('./queueManager')(io);
var config = require('./config');

IG.set('client_id', '086b493264514b5cb82d65d7f4859663');
IG.set('client_secret', 'f7a1201df84d4704a6d83578c7601c4f');

var port = process.env.PORT || 8000;
mongoose.connect('mongodb://localhost/UCL-BBCast');
//use express framework
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//the main http server
var server = http.createServer(app).listen(port, function() {
    console.log('Listening on port ' + port);
});

//websocket (socket.io) server
io.listen(server);

require('./app/routes')(app, io, mongoose, path);
io.sockets.on('connection', function (socket) {
    console.log("a socket connected " + socket.id);
    socket.on('sayHi', function(){
        console.log("Hi!");
        io.sockets.emit('sayHello', {'message' : 'Hello'});
        console.log("passed!");
    });
    socket.on('getTexts', function(){
       qm.getSortedTexts();
    });
    socket.on('getVideos', function(){
       qm.getSortedVideos();
    });
    socket.on('getImages', function(){
       qm.getSortedImages();
    });
    socket.on('nextVideoMustBePlaying', function(data){
       console.log('video ' + data);
    });

});

var T = new Twit({
  consumer_key: '4mrTUMM6FKdJGFWqwXajCF0XB',
  consumer_secret: 'zfvWmfBup4iXSkjB95vR2LzXBdoqRB7Bxa6Oz8ofD93rjcXrpL',
  access_token: '2181879318-etW6hcVB1MYGnla54JpzbPJUvHs0CymNa6SxGXh',
  access_token_secret: 'HhuM4iMSA3wg9xKbyUmellUEdO94ySA3aAEOvoMQ0C6Nl'
});

//var watchList = ['1968194946', '816653', '168664036', '771319', '2181879318'];
var watchList = ['#BBCAST'];
//var tStream = T.stream('statuses/filter', { follow: watchList});

var tStream = T.stream('statuses/filter',{ track: '#WorstResponders'});
tStream.on('tweet',function(tweet){
   console.log(tweet.text);
   io.sockets.emit('newSocialPost', {'post' : tweet});
});

IG.subscriptions.subscribe({
   object: 'tag',
   object_id: 'eeeannouncement',
   aspect: 'media',
   callback_url: 'https://fojpjrybjz.localtunnel.me/igpost',
   type: 'subscription',
   id: '#'
});
/*
request('https://graph.facebook.com/ucl.bbcast/feed?access_token=824373247647109|794f702c33aa1dbf0305d81a0d8e48b8', function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        console.log(bodyObj.data[0].message);
    } else{
        console.log(error);
    }
});
*/
