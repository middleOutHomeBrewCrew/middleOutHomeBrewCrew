var path = require('path');

module.exports = {
	index: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/html/index.html'));
  },
  home: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/html/home.html'));
  },
  login: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/html/login.html'));
  },
  signup: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/html/signup.html'));
  }
};