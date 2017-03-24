// routes

angular
  .module('app')
  .config(function($routeProvider) {
    $routeProvider
      .when('/users', {
        template: '<user-list users="$ctrl.users" on-delete="$ctrl.delete"></user-list>',
        controller: 'listController',
        controllerAs: '$ctrl'
      })
      .when('/users/:id', {
        template: '<user-form user="$ctrl.user" on-update="$ctrl.update" back-to="/users"></user-form>',
        controller: 'formController',
        controllerAs: '$ctrl'
      })
      .when('/users-create', {
        template: '<user-form user="$ctrl.user" on-update="$ctrl.create" back-to="/users"></user-form>',
        controller: 'formController',
        controllerAs: '$ctrl'
      })
      .otherwise({ redirectTo: '/users' })
      ;
  });
