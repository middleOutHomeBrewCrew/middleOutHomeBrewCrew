var express = require('express');
var app = express();
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);
var path = require('path');

app.use(express.static(__dirname + './../client'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + './../client/home.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + './../client/login.html'));
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + './../client/signup.html'));
});

socketServer.listen((process.env.PORT || 3000), function() {
  var host = socketServer.address().address;
  var port = socketServer.address().port;

  console.log('App launched and hosting at http://%s:%s',host,port);
});

// create socket.io connection
io.on('connection', function(socket){
  //start 
  io.emit('new connection')
  socket.on('new connection res', function(obj){
    io.emit('new connection res', obj);
  });
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('url submit', function(url){
    io.emit('url submit', url);
    console.log('url: server', url);
  });
  socket.on('play video', function(){
    io.emit('play video')
  });
  socket.on('pause video', function(){
    io.emit('pause video')
  });
});


