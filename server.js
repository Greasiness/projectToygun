/**
 * Created by merth-PC on 7/26/2014.
 */

// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var server = app.listen(8080);
var io = require('socket.io')(server);

// configuration =================

mongoose.connect('mongodb://heroku:K_KZx326E9XPIwy_9S24NNGcVfQlcWL2KdaPe3BJh19sGT_-ef1M94p5LKRIDBv3K9d_HIPzqtem0tydEcHYMg@paulo.mongohq.com:10045/app18634011'); 	// connect to mongoDB database on modulus.io

app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
});

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        var from = socket.request.connection.remoteAddress.toString();
        io.emit('chat message', from + ': ' + msg);
        console.log(from + ' ' + msg);
    });
});


// listen (start app with node server.js) ======================================
console.log("App listening on port 8080");