/*global angular*/
(function() {
  'use strict';

  angular
    .module('post-it')
    .factory('Users', Users);

  function Users($http) {

    return {
      getUsers: function() {
        var promise = $http.get('/api/users').then(function(response){
          return response.data;
        }, function(error){
          throw('Error retrieving data');
        });
        return promise;
      }
    };

  }

})();
