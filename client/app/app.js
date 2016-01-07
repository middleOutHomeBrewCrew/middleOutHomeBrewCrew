$(function() {
  $('a[rel=tipsy]').tipsy({fade: true, gravity: 'n'});
});

function youtubeSearch(searchItem) {
  $.ajax({
    'url': "/searchYoutube",
    'type': 'GET',
    'data': {'searchItem': searchItem},
    }).done( function(data) {
      $.each( data.items, function(i, item ) { 
        var vidId = item.id.videoId;
        var vidImage = item.snippet.thumbnails.medium.url; 
        var vidDescription = ''+item.snippet.description.slice(0, 30)+'..';
        appendVideoImage(vidId, vidImage, vidDescription);
      });
    })
}

// append youtube song list to left-side container 
function appendVideoImage (videoId, videoImage, vidDescription) {
  $('#search-results').append('<p id="' + videoId + '" original-title="'+vidDescription+'"><img src="' + videoImage +'" height="70"></p>'); 
  $('#'+videoId).tipsy();
}

// search youtube button
$('#search-btn').on('click', function(event) {
  var searchVal = $('#youTubeSearchInput').val();
  youtubeSearch(searchVal);
});

// delete current youtube song list 
$('#clear-search-btn').on('click', function() {
  $('#search-results').empty();
})

// Movie Button Controls
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