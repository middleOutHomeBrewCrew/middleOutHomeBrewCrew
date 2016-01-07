// Video search results from youtube stores from GET request
var queryResults = [];

function youtubeSearch(searchItem) {
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
    part : 'snippet',
    maxResults : 10,
    q: searchItem,
    key: 'AIzaSyCyU-0og7E6Sa1RpPr2OZrYKe2jYLGRuxI' },
    function(data) {
      $.each( data.items, function(i, item ) { 
        queryResults.push(item);
        var vidId = item.id.videoId;
        var vidImage = item.snippet.thumbnails.medium.url; 
        appendVideoImage(vidId, vidImage);
      });
    }
  );
}

// create song list from youtube search 
function appendVideoImage (videoId, videoImage) {
  $('.results').append('<p id="' + videoId + '"><img src="' + videoImage +'" height="70"></p>'); 
}

// search youtube button
$('#search-btn').on('click', function(event) {
  var searchVal = $('#youTubeSearchInput').val();
  youtubeSearch(searchVal);
});

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