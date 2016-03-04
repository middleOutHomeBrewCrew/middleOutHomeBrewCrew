// helper functions for youtube player
function muteVideo() {
  if(socket.player) {
    socket.player.mute();
    $('.mute').show();
  }
}

function unMuteVideo() {
  if(socket.player) {
    socket.player.unMute();
    $('.mute').hide(); 
  }  
}

$('#volume').change(function() {
  var volVal = $('#volume').val();
  setVolume(volVal);
});

function setVolume(value) {
  if(socket.player) {
    socket.player.setVolume(value);
  }
}