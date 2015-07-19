/*global require, module*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  first_name: String,
  name: String,
  position: String,
  messages: Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;
