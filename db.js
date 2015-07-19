/*global require, module*/
var mongoose = require('mongoose');
var debug = require('debug')('PostIt:mongodb');

var mongoURI = 'mongodb://localhost:27017/postitdb';

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) {
  debug('Connection error: ' + err.message);
});

MongoDB.once('open', function() {
  debug('Connection established');
});

module.exports = MongoDB;
