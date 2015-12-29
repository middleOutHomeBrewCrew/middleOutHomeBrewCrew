var socket = io();
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
    videoId : url.slice(32),
    playerVars: { 
      'autoplay': 0, 
      'controls': 0, 
      'disablekb': 0
    }
  });
  socket.player = player;
  socket.url = url.slice(32,43);
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
});

socket.on('new connection', function (){
  if(!socket.player){
    return;
  }
  socket.emit('new connection res', {
    url: socket.url,
    time: socket.player.getCurrentTime()
  });
});

socket.on('new connection res', function(obj) {
  var time = Math.floor(obj.time); 
  setTimeout( 
    function(){
      var player = new YT.Player('player', { 
        videoId: obj.url,
        playerVars: { 
          'start': time,
          'autoplay' : 1
        } 
      });
      if(!socket.player) {
        socket.player = player;
      }
    },100);
});

function toggleMute() {
  if(socket.player) {
    socket.player.mute();
  }
}

function unMuteVideo() {
  if(socket.player) {
    socket.player.unMute(); 
  }  
}