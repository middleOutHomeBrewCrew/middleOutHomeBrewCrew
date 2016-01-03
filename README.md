# middleOutHomeBrewCrew

## Heading ##
  ...Flix

## Tag ##
  Whatch together. Wherever.

## Summary ##

  Expand your living room by watching your favorite shows and movies with anyone you want, distance is not an issue. No more syncing shows on your own. Social flix does it for you.  **this started as an angular app, but has evolved out of neccessity to use mainly jquery for ease of consrtuction, there may be some left over angular functionality that is included but not used (vestigial) **

## index.html ##

  Typical splash page, taking advantage of the 'parallax' style of display.  Corresponding styles can currently be found in 'homeStyles.css', background pictures in '/client/assets'.

## home.html ##

  Landing page for all users after progressing past index.html, correspon

  ding styles can be found in style.css.  All logic for home.html is included in 'chat.js'.  Chat.js started out as the file for only chat logic, it included all of the logic for the sockets and included the youtube player init.  Chat.js can be thought of as 'socket.js'

## chat.js (socket.js) ##

  Functions are mostly if not all JQuery.  Socket functions included in here are listening for dom events, send information relating to the events to 'server.js' and handle the events once theyve been received from the server on the other end.  Youtube player controls are diasbled in this file.

## server.js ##

  Inits server via express.  Handles routing and sockets. Socket event listeners included.

## app.js ##

  Has YT.Player controls.  Handles mute unmute and volume value.
