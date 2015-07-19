/* jshint ignore:start */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./db');
var socketIo = require('socket.io');
var io; // global

// mongo db models
var User = require('./mongomodels/user.js');

var app = express();

// attaching socket io to variable
io = app.io = socketIo;

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// POPULATING DATA FOR MOCKUP PURPOSE
User.remove().exec(); // clear before insert
var u1 = new User({id: 1, first_name: 'Anna', name: 'Nowak', position: 'Sprzątaczka', messages: []}); u1.save();
var u2 = new User({id: 2, first_name: 'Stefan', name: 'Nowak', position: 'Doradca klienta', messages: []}); u2.save();
var u3 = new User({id: 3, first_name: 'Janina', name: 'Morska', position: 'Sekretariat', messages: []}); u3.save();
var u4 = new User({id: 4, first_name: 'Aleksandra', name: 'Major', position: 'Handlowiec', messages: []}); u4.save();
var u5 = new User({id: 5, first_name: 'Łukasz', name: 'Majewski', position: 'Handlowiec', messages: []}); u5.save();
var u6 = new User({id: 6, first_name: 'Alicja', name: 'Arent', position: 'Poseł', messages: []}); u6.save();

// App Routes
app.get('/api/users', function(req, res) {

  User.find(function(err, users) {
    if (err) {
      res.send(err)
    }

    res.json(users);
  });

});

app.get('*', function(req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

/* jshint ignore:end */
