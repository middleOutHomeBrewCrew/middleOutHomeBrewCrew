// Video search results from youtube stores from GET request
var queryResults = [];

function youtubeSearch(searchItem) {
  $.ajax({
    'url': "/searchYoutube",
    'type': 'GET',
    'data': {'searchItem': searchItem},
    }).done( function(data) {
      $.each( data.items, function(i, item ) { 
        queryResults.push(item);
        var vidId = item.id.videoId;
        var vidImage = item.snippet.thumbnails.medium.url; 
        appendVideoImage(vidId, vidImage);
      });
      console.log(data.items);
      console.log('This is the data from server: ', data);
    })
}

// append youtube song list to left-side container 
function appendVideoImage (videoId, videoImage) {
  $('#search-results').append('<p id="' + videoId + '"><img src="' + videoImage +'" height="70"></p>'); 
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