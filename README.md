# Social Flix
  Watch videos together regardless of distance. 

## Summary ##

  Expand your living room by watching your favorite shows and movies with anyone you want, distance is not an issue. No more syncing shows on your own. Social flix does it for you.  **this started as an angular app, but has evolved out of neccessity to use mainly jquery for ease of consrtuction, there may be some left over angular functionality that is included but not used (vestigial) **
    
## Team ##
 - __Product Owner__: [Joe Lagasse](https://github.com/jlag34)
 - __Scrum Master__: [Tyler Ferrier](https://github.com/tynino)
 - __Development Team Members__: [Tim Steele](https://github.com/beresford211), [Robert Cardiff](https://github.com/rcardiff1)

## Table of Contents

1. [Summary](#summary)
1. [Team](#team)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Contributing](#contributing)
1. [Development](#development)
  a) [Installing Dependencies](#installing-dependencies) 
1. [Files](#files)
  a) index.html
  b) home.html
  c) chat.js
  d) server.js
  e) app.js

## Requirements ##
- Express 4.13.x
- Node 5.3.x
- Socket.io 1.3.x
- jQuery 1.4.x

## Usage ##
  >See demo [video](https://youtu.be/DbmwzENcivA)

## Contributing ##
See [_CONTRIBUING.md](https://github.com/middleOutHomeBrewCrew/middleOutHomeBrewCrew/blob/master/_CONTRIBUTING.md) for contribution guidelines.

## Development ##

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Files ##

### index.html ###

  Typical splash page, taking advantage of the 'parallax' style of display.  Corresponding styles can currently be found in 'homeStyles.css', background pictures in '/client/assets'.

### home.html ###

  Landing page for all users after progressing past index.html, corresponding styles can be found in style.css.  All logic for home.html is included in 'chat.js'.  Chat.js started out as the file for only chat logic, it included all of the logic for the sockets and included the youtube player init.  Chat.js can be thought of as 'socket.js'

### chat.js (socket.js) ###

  Functions are mostly if not all JQuery.  Socket functions included in here are listening for dom events, send information relating to the events to 'server.js' and handle the events once theyve been received from the server on the other end.  Youtube player controls are diasbled in this file.

### server.js ###

  Inits server via express.  Handles routing and sockets. Socket event listeners included.

### app.js ###

  Has YT.Player controls.  Handles mute unmute and volume value.
