// Chat Socket
var socket = io();
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//doesn't allow users to interact w/ submissions until "signed in"
$('#chatForm').hide();
$('#room').hide();
$('#name').focus();
$('#player').hide();
$('#playerControls').hide();
$('#url').prop('disabled',true);
$('#urlSub').prop('disabled',true);

//url submit event, sends all sockets url to use
$('#urlID').submit(function(){
  socket.emit('url submit', $('#url').val());
$('#url').val('');
  return false;
});

// url Socket instantiate a youtube player for all
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

//allows for users to connect in the middle of a video 
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
          'autoplay' : 1,
          'controls' : 0
        } 
      });
      if(!socket.player) {
        socket.player = player;
      }
    },100);
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
    $('#playerControls').show();
    $('#joinChat').hide();
    $('#url').prop('disabled',false);
    $('#urlSub').prop('disabled',false);
  }
});
//on "Enter/Return" key press allows submitting a user name
$('#name').keypress(function(e) {
  if (e.which == 13) { 
    var name = $('#name').val();
    if (name != '') {
      socket.emit('join', name);
      ready = true;
      $('#chatForm').show();
      $('#room').show();
      $('#m').focus();
      $('#player').show();
      $('#playerControls').show();
      $('#joinChat').hide();
      $('#url').prop('disabled',false);
      $('#urlSub').prop('disabled',false);
      return false;
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
    $('#messages').prepend($('<li>').html('<strong>' + who + ': ' + '</strong>' + msg));
  }
});