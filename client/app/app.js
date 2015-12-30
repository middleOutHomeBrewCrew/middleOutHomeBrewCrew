function muteVideo() {
  console.log("no player clicked")
  if(socket.player) {
    socket.player.mute();
    console.log('i am clicked with player')
  }
}

function unMuteVideo() {
  if(socket.player) {
    socket.player.unMute(); 
  }  
}
