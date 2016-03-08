var people = {};

module.exports = {
  newConnection: function(io) {
    io.emit('new connection');
  },
  ncresponse: function(io, socket) {
    socket.on('new connection res', function(obj){
      io.emit('new connection res', obj);
    });
  },
  join: function(io, socket) {
    socket.on('join', function(name) {
      people[socket.id] = name;
      socket.emit('update','You have connected to the server');
      io.emit('update', name + ' has joined the server.');
      io.emit('update-people', people);
      console.log(people[socket.id] + ' has connected!');
    });
  },
  chatMessage: function(io, socket) {
      // log user message to chat
      socket.on('chat message', function(msg){
        io.emit('chat message', people[socket.id], msg);
        console.log(people[socket.id] + ': ' + msg);
      });
  },
  disconnect: function(io, socket) {
      // log user disconnect to chat and update user list
      socket.on('disconnect', function(){
        var temp = people[socket.id];
        
        io.emit('update', temp + ' has left the server.');
        delete people[socket.id];
        io.emit('update-people',people);
        console.log(temp + ' has disconnected!');
      });
  },
  urlSubmit: function(io, socket) {
      socket.on('url submit', function(url){
        io.emit('url submit', url);
        console.log(people[socket.id] + ' has submitted a URL: ', url);
      });
  },
  playVideo: function(io, socket) {
    socket.on('play video', function(){
      io.emit('play video')
    });
  },
  pauseVideo: function(io, socket) {
    socket.on('pause video', function(){
      io.emit('pause video')
    });
  }
};



