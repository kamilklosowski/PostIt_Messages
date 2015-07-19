/*global module*/
module.exports = function(socket) {
  'use strict';
  var User = require('../mongomodels/user.js');

  // broadcast back & save messages into db
  socket.on('send:message', function(data) {
    User.find({}, function(err, users) {
      if (err) {
        throw err;
      }

      for (var i = 0; i < users.length; i++) {
        users[i].messages.push(data.message);

        users[i].save(function(err) {
          if (err) {
            throw err;
          }
        });
      }

    });
    socket.broadcast.emit('send:message');
  });

  socket.on('read:message', function(data) {
    var uId = data.id;

    User.find({id: uId}, function(err, user) {

      if (user[0]) {
        // remove last message
        user[0].messages.splice(-1, 1);
        user[0].save();

        socket.emit('read:message', {
          user: user[0]
        });
      }
    });

  });

};
