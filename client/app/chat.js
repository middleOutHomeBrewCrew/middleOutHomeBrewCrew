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

$('#search-results').click(function(event){
  var idVal = $(event.target).parent().attr('id');
  console.log('this is the click: ', idVal);
  socket.emit('url submit', idVal);
});

socket.on('url submit', function(url){
  $('#player').remove();
  $('.videoPlayer').append('<div id="player">');
  var player = new YT.Player('player', {
    videoId : url,
    playerVars: { 
      'autoplay': 0, 
      'controls': 0, 
      'disablekb': 0
    }
  });
  socket.player = player;
  socket.url = url;
  console.log(player);
});

//play video event
$('#playVid').on('click', function(){
  socket.emit('play video');
});
socket.on('play video', function(){
  socket.player.playVideo();
  console.log(socket.player.getCurrentTime(), socket.url);
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
    $('#messages').append($('<li>').html('<strong>' + who + ': ' + '</strong>' + msg));
  }
});

// Autoscroll chat
window.setInterval(function() {
  var elem = document.getElementById('messages');
  elem.scrollTop = elem.scrollHeight;
}, 5000);