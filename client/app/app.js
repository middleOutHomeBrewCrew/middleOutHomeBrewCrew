function muteVideo() {
  if(socket.player) {
    socket.player.mute();
    $('#volume').after("<div class='mute'> <img id='muteImg' src='../assets/mute.png'> </div>");
  }
}

function unMuteVideo() {
  if(socket.player) {
    socket.player.unMute();
    $('.mute').remove(); 
  }  
}

$('#volume').change(function() {
  var volVal = $('#volume').val();
  // console.log(volVal, "volume value");
  setVolume(volVal);
});

function setVolume(value) {
  if(socket.player) {
    socket.player.setVolume(value);
    console.log(socket.player.B, "player");
    console.log(socket.player.getVolume(), "yt volume");
  }
}