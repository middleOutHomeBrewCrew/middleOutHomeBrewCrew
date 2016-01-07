var express = require('express');
var app = express();
var http = require('http').createServer(app);
var socketServer = http;
var io = require('socket.io')(socketServer);
var path = require('path');
var people = {};
var YouTube = require('youtube-node');
var youTube = new YouTube();
var config = require('./env/config.js');

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

// youtube api get request using youtube-node
app.get('/searchYoutube', function(req, res) {
  console.log('this is the api key: ', config.YOUTUBE_API_KEY);
  youTube.setKey(process.env.YOUTUBE_API_KEY || config.YOUTUBE_API_KEY);
  console.log('this is the req.query: ', req.query.searchItem);

  youTube.search(req.query.searchItem, 10, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      res.send(result);
    }
  });
});

socketServer.listen((process.env.PORT || 4000), function() {
  var host = socketServer.address().address;
  var port = socketServer.address().port;

  console.log('App launched and hosting at http://%s:%s',host,port);
});

// create socket.io connection
io.on('connection', function(socket){
  //start video socket
  io.emit('new connection')
  socket.on('new connection res', function(obj){
    io.emit('new connection res', obj);
  });
  // register new user connect
  socket.on('join', function(name) {
    people[socket.id] = name;
    socket.emit('update','You have connected to the server');
    io.emit('update', name + ' has joined the server.');
    io.emit('update-people', people);
    console.log(people[socket.id] + ' has connected!');
  });
  
  // log user message to chat
  socket.on('chat message', function(msg){
    io.emit('chat message', people[socket.id], msg);
    console.log(people[socket.id] + ': ' + msg);
  });

  // log user disconnect to chat and update user list
  socket.on('disconnect', function(){
    var temp = people[socket.id];
    
    io.emit('update', temp + ' has left the server.');
    delete people[socket.id];
    io.emit('update-people',people);
    console.log(temp + ' has disconnected!');
  });
  socket.on('url submit', function(url){
    
    io.emit('url submit', url);
    console.log(people[socket.id] + ' has submitted a URL: ', url);
  });
  socket.on('play video', function(){
    io.emit('play video')
  });
  socket.on('pause video', function(){
    io.emit('pause video')
  });
});



