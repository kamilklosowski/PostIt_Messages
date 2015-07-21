/*global module,require*/
module.exports = function(socket) {
  'use strict';
  var User = require('../mongomodels/user.js');

  return {
    send_wishes: function() {
      var wishes = 'Wszystkiego najlepszego z okazji dnia kobiet!';

      User.find({first_name: /a\z/}, function(err, users) {
        if (err) {
          throw err;
        }

        for (var i = 0; i < users.length; i++) {
          users[i].messages.push(wishes);

          users[i].save(function(err) {
            if (err) {
              throw err;
            }
          });
        }
      });

      socket.sockets.emit('send:message');
    }
  };

};
