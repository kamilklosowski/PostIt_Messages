/*global angular*/
(function() {
  'use strict';

  angular
    .module('post-it')
    .controller('PostItCtrl', PostItCtrl);

  function PostItCtrl($timeout, Socket, Users) {
    var vm = this;

    // Sorting
    vm.sortBy = 'id';
    vm.sortAsc = false;

    // Controller functions
    vm.sendMessage = sendMessage;
    vm.readMessages = readMessages;

    // Populating users
    getUsers(); // initial

    // Socket Events
    Socket.on('send:message', getUsers);
    Socket.on('read:message', function(data) {
      getUsers().then(function() {
        // after controller trigger view refresh, wait until digest cycle ends
        $timeout(function() {
          vm.readMessages(data.user);
        });
      });
    });

    /**
     * Controller functions definitions
     */

    /**
     * Getting users from DB
     * @returns {*}
     */
    function getUsers() {
      return Users.getUsers().then(function(data) {
        vm.users = data;
        return vm.users;
      });
    }

    /**
     * Sending message to all users
     * @param {string} message
     */
    function sendMessage(message) {
      Socket.emit('send:message', {
        message: message
      });

      alert('Wiadomość wysłana do wszystkich użytkowników!');
      vm.textAreaText = '';
    }

    /**
     * Read last message & update unreaded messages status
     * @param user
     * @returns {boolean}
     */
    function readMessages(user) {

      if (!user.messages.length) {
        return false;
      }

      var confirm = window.confirm(user.messages[user.messages.length - 1]);

      if (confirm) {
        Socket.emit('read:message', {
          id: user.id
        });
      }

    }

  }

})();
