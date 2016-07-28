var express = require('express');
var app = express();
var path = require('path');
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);
var routes = require('./routes.js');
var ioConnection = require('./connection.js');

socketServer.listen((process.env.PORT || 4000), function() {
  var host = socketServer.address().address;
  var port = socketServer.address().port;

  console.log('App launched and hosting at http://%s:%s', host, port);
});

//application routes
app.use(express.static(__dirname + './../client/dist'));

app.get('/', function(req, res) {
  res.send(path.join(__dirname + '/dist/index.html'));
});

//remove for change over to react
// app.get('/home', routes.home);
//
// app.get('/login', routes.login);
//
// app.get('/signup', routes.signup);


// socket.io connections and functions
io.on('connection', function(socket){

  ioConnection.newConnection(io);

  ioConnection.ncresponse(io, socket);

  ioConnection.join(io, socket);

  ioConnection.chatMessage(io, socket);

  ioConnection.disconnect(io, socket);

  ioConnection.urlSubmit(io, socket);

  ioConnection.playVideo(io, socket);

  ioConnection.pauseVideo(io, socket);

});
