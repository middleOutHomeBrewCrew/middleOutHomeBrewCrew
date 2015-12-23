var socket = io();
$('#chatForm').submit(function(){
  socket.emit('chat message', $('#m').val());
$('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

$('#urlID').submit(function(){
  socket.emit('url submit', $('#url').val());
$('#url').val('');
  return false;
});
socket.on('url submit', function(url){
  //set remote urls
  console.log('url submit 18 :', url);
  new YT.Player('player', {videoId: url});
});

