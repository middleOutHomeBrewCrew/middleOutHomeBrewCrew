var socket = io();
// chat Socket
$('#chatForm').submit(function(){
  socket.emit('chat message', $('#m').val());
$('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').prepend($('<li>').text(msg));
});

$('#urlID').submit(function(){
  socket.emit('url submit', $('#url').val());
$('#url').val('');
  return false;
});

// url Socket
socket.on('url submit', function(url){
  //set remote urls
  console.log('url submit 18 :', url);
  var player = new YT.Player('player', {
    videoId : url
  });
  socket.player = player;
});

$('#playVid').on('click', function(){
  socket.emit('play video');
});
socket.on('play video', function(){
  socket.player.playVideo();
});

$('#pauseVid').on('click', function(){
  socket.emit('pause video');
});
socket.on('pause video', function(){
  socket.player.pauseVideo();
})