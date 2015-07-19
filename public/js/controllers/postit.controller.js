/*global angular*/
(function() {
  'use strict';

  angular
    .module('post-it')
    .controller('PostItCtrl', PostItCtrl);

  function PostItCtrl($scope, $q, $timeout, Socket, Users) {

    var getUsers = function() {
      var deferred = $q.defer();

      Users.getUsers().then(function(data) {
        $scope.users = data;
        deferred.resolve();
      });

      return deferred.promise;
    };

    // Sorting
    $scope.sortBy = 'id';
    $scope.sortAsc = false;

    // Populating users
    $scope.users = null;
    getUsers(); // initial

    /***************
     * Socket Events
     ***************/
    Socket.on('send:message', getUsers);
    Socket.on('read:message', function(data) {
      getUsers().then(function() {
        // wait for $scope refreshes view and end digest cycle
        $timeout(function() {
          $scope.readMessages(data.user);
        });
      });
    });

    /**
     * Sending message to all users
     * @param {string} message
     */
    $scope.sendMessage = function(message) {
      Socket.emit('send:message', {
        message: message
      });
    };

    /**
     * Read last message & update unreaded messages status
     * @param user
     * @returns {boolean}
     */
    $scope.readMessages = function(user) {

      if (!user.messages.length) {
        return false;
      }

      var confirm = window.confirm(user.messages[user.messages.length - 1]);

      if (confirm) {
        Socket.emit('read:message', {
          id: user.id
        });
      }

    };

  }

})();
