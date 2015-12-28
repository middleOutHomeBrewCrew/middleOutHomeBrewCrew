var socket = io();
// chat Socket
//emit message to other sockets
$('#chatForm').submit(function(){
  socket.emit('chat message', $('#m').val());
$('#m').val('');
  return false;
});
//on event, add messages to chat box
socket.on('chat message', function(msg){
  $('#messages').prepend($('<li>').text(msg));
});

//url submit event, sends all sockets url to use
$('#urlID').submit(function(){
  socket.emit('url submit', $('#url').val());
$('#url').val('');
  return false;
});

// url Socket instantiate a youtube player for all
//sockets to work on
socket.on('url submit', function(url){
  var player = new YT.Player('player', {
    videoId : url.slice(32)
  });
  socket.player = player;
});

//play video event
$('#playVid').on('click', function(){
  socket.emit('play video');
});
socket.on('play video', function(){
  socket.player.playVideo();
});

//pause video event
$('#pauseVid').on('click', function(){
  socket.emit('pause video');
});
socket.on('pause video', function(){
  socket.player.pauseVideo();
})