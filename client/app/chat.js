// chat Socket
var socket = io();
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$('#chatForm').hide();
$('#room').hide();
$('#name').focus();
$('#player').hide();
$('#url').prop('disabled',true);
$('#urlSub').prop('disabled',true);

// BEGIN VIDEO CONTROLS
//----------------------

// url Socket instantiate a youtube player for all
//sockets to work on
socket.on('url submit', function(url){
  var player = new YT.Player('player', {
    videoId : url.slice(32)
  });
  socket.player = player;
  socket.url = url.slice(32);
 });

//url submit event, sends all sockets url to use
$('#urlID').submit(function() {
	socket.emit('url submit', $('#url').val());
	$('#url').val('');
	return false;
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
  setTimeout(function() {
      var player = new YT.Player('player', { videoId: obj.url });
      if(!socket.player) {
        socket.player = player;
      }
  },30);
});

// BEGIN CHAT CONTROLS
//--------------

//emit message to other sockets
$('#chatForm').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

// join the server upon submitting a username
$('#join').click(function() {
	var name = $('#name').val();
	if (name != '') {
		socket.emit('join', name);
		ready = true;
		$('#chatForm').show();
		$('#room').show();
		$('#m').focus();
		$('#player').show();
		$('#joinChat').hide();
		$('#url').prop('disabled',false);
		$('#urlSub').prop('disabled',false);
	}
});

$('#name').keypress(function(e) {
	if (e.which === 13) {
		var name = $('#name').val();
		if (name != '') {
			socket.emit('join',name);
			ready = true;
		}
	}
});

// update notice informing local user of join (only shown to local user)
socket.on('update', function(msg) {
	if (ready) {
		$('#messages').append($('<li>').text(msg));
	}
});

// update notice informing remote user of join/leave (shown to all users)
socket.on('update-people', function(people) {
	if (ready) {
		$('#people').empty();
		$.each(people, function(clientid,name) {
			$('#people').append($('<li>').text(name));
		});
	}
});

//on event, add messages to chat box
socket.on('chat message', function(who,msg){
	if (ready) {
		$('#messages').append($('<li>').text(who + ': ' + msg));
	}
});