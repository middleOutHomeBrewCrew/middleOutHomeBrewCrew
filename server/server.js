var express = require('express');
var app = express();

app.use(express.static('../client'));

app.get('/', function(req,res) {
	res.render('index');
});

var server = app.listen((process.env.PORT || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App launched and hosting at http://%s:%s',host,port);
});