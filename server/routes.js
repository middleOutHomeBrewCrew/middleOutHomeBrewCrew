var path = require('path');

module.exports = {
	index: function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  },
  home: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/home.html'));
  },
  login: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/login.html'));
  },
  signup: function(req, res) {
    res.sendFile(path.join(__dirname + './../client/signup.html'));
  }
};