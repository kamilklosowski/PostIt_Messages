/*global module*/
module.exports = function(socket) {
  'use strict';
  var User = require('../mongomodels/user.js');

  return {
    send_wishes: function() {
      var wishes = 'Wszystkiego najlepszego z okazji dnia kobiet!';

      console.log('wishes sended!');

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
    },
    two_min_task: function() {
      setInterval(sendFemaleUsersWishes, 2 * 60 * 1000);
    },
    special_day_task: function() {
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1;
      var currentDay = currentDate.getDate();
      console.log('date', currentDate);
      console.log('current month: ', currentMonth);
      console.log('current day: ', currentDay);
    }
  };

};