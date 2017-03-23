
(function (angular) {
  'use strict';

try {
  angular
  .module('app', [
    'ngRoute'
    , 'ngResource'
    , 'userResourse'
    , 'UserListComponent'
    , 'userFormCompoment'
  ])

  .controller('MainCtrl', ['User', function MainCtrl(User) {

  }])
  .controller('listController', ['$scope', 'User', function($scope, User) {
    var $ctrl = this;

    $ctrl.loadUsers = function () {
      return User.query( function (users) { $ctrl.users = User.list = users });
    }

    $ctrl.delete = function (user) {
      var id = user.id;
      return user.$delete(function() {
        User.onUpdate(null, id);
      });
    }

    $ctrl.loadUsers();
  }])
  .controller('formController', [ '$scope', '$routeParams', 'User', function($scope, $routeParams, User) {

    var $ctrl = this, id;

    $ctrl.loadUser = function (id) {
       return User.get({id: id}, function (user) {
         $ctrl.user = user
       });
    }

    $ctrl.newUser = function () {
      return $ctrl.user = new User();
    }

    $ctrl.update = function (user) {
      return user.$update(function(user) {
        $ctrl.user = user;
        User.onUpdate(user);
      });
    }

    $ctrl.save = function ( user ) {
      return user.$save( function (user) {
        $ctrl.user = user;
        User.onUpdate(user);
      } );
    }

    if (id = $routeParams.id) {
      $ctrl.loadUser(id);
    } else {
      $ctrl.newUser();
    }

  }])
  .config(function($routeProvider) {
    $routeProvider
      .when('/users', {
        template: '<user-list users="$ctrl.users" on-delete="$ctrl.delete"></user-list>',
        controller: 'listController',
        controllerAs: '$ctrl'
      })
      .when('/users/:id', {
        template: '<user-form user="$ctrl.user" on-update="$ctrl.update"></user-form>',
        controller: 'formController',
        controllerAs: '$ctrl'
      })
      .when('/users-create', {
        template: '<user-form user="$ctrl.user" on-update="$ctrl.save"></user-form>',
        controller: 'formController',
        controllerAs: '$ctrl'
      })
      ;
  });

} catch(e) {
  console.dir(e);
}

})(window.angular);
