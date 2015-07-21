/*global angular */
(function() {
  'use strict';

  angular.module('post-it', [
    'ui.router'
  ])
    .config(config, 'config');

  function config($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('form', {
        url: '/',
        templateUrl: '../views/partials/form.html',
        controller: 'PostItCtrl',
        controllerAs: 'PostIt'
      })
      .state('table', {
        url: '/table',
        templateUrl: '../views/partials/table.html',
        controller: 'PostItCtrl',
        controllerAs: 'PostIt'
      });

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      if ($state.current.url === '^') {
        $state.go('form');
      }
    });

    $urlRouterProvider.rule(function($injector, $location) {
      var re = /(.+)(\/+)(\?.*)?$/;
      var path = $location.url();

      if (re.test(path)) {
        return path.replace(re, '$1$3');
      }

      return false;
    });
  }

})();
