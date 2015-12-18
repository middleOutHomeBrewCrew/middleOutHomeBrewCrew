var express = require('express');
var app = express();
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);
// io.on('connection', function(){ /* … */ });
socketServer.listen(3000);

app.use(express.static('../client'));

app.get('/', function(req,res) {
	res.render('index');
});

socketServer.listen((process.env.PORT || 3000), function() {
  var host = socketServer.address().address;
  var port = socketServer.address().port;

  console.log('App launched and hosting at http://%s:%s',host,port);
});

// create socket.io connection
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

// var server = app.listen((process.env.PORT || 3000), function() {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('App launched and hosting at http://%s:%s',host,port);
// });
