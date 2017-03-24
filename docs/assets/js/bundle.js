;(function(angular) {
"use strict";

// main module declaration

angular
  .module('app', [
    'ngRoute',
    'userResource',
    'userListComponent',
    'userFormCompoment'
  ]);

// userResource

(function (apiConfig) {
  'use strict';

  var apiUrl = apiConfig.host + ':' + apiConfig.port + apiConfig.path;

  function User( ) { }

  User.state = { list: [], obj: null };
  User.subscribers = [];

  User.setState = setState;
  User.errorHandler = errorHandler.bind( User );
  User.subscribe = subscribe;
  User.emit = emit;

  function get($http, apiUrl) {
    var self = this;
    return $http.get(apiUrl).then(
      function (response) { self.setState( { list: response.data } ) },
      self.errorHandler
    )
  }

  function create($http, apiUrl, obj) {
    var self = this;
    return $http.post(apiUrl, obj).then(
      function(response) { self.setState( { obj: response.data } ) },
      self.errorHandler
    )
  }

  function getById($http, apiUrl, id) {
    var self = this;
    return $http.get(apiUrl + '/' + id).then(
      function(response) { self.setState( { obj: response.data } ) },
      self.errorHandler
    )
  }

  function update($http, apiUrl, obj) {
    var self = this;
    return $http.put(apiUrl + '/' + obj.id, obj).then(
      function(response) { self.setState ( { obj: response.data } ) },
      self.errorHandler
    );
  }

  function delById($http, apiUrl, id) {
    var self = this;
    return $http.delete(apiUrl + '/' + id).then(
      function(response) { self.setState ( { removeId: id } ) },
      self.errorHandler
    );
  }

  function errorHandler(response) {
    this.errorCode = response.status;
    this.error = response.data;
  }

  function subscribe(handler) {
    var h = this.subscribers.find(
      function (h) { return ( h === handler ) }
    );
    if (!h) {
      this.subscribers.push(handler);
      handler.call( null, this.state );
    }
    return unsubscribe.bind(this, handler);
  }

  function emit() {
    var state = this.state;
    this.subscribers.forEach(
      function (handler) { handler.call( null, state ) }
    );
  }

  function unsubscribe(handler) {
    var index = this.subscribers.findIndex(
      function (h) { h === handler }
    );
    if (index < 0) return;
    this.subscribers.splice(index, 1);
  }

  function setState( newState ) {
    if (newState.list) {
      this.state.list = newState.list;
      return this.emit()
    }

    this.state.obj = newState.obj || null;

    var id = newState.obj && newState.obj.id || newState.removeId;
    var index = this.state.list.findIndex(
      function (obj) { return obj.id === id }
    );
    if (index < 0) {
      newState.obj && this.state.list.push( newState.obj ) && this.emit()
    } else {
      ( newState.obj && (this.state.list[index] = newState.obj) ||
        this.state.list.splice(index, 1)
      ) && this.emit()
    }

  }

  angular
    .module('userResource', [ ])
    .factory('User', ['$http', function ( $http ) {

      User.get = get.bind( User, $http, apiUrl);
      User.create = create.bind( User, $http, apiUrl);
      User.getById = getById.bind( User, $http, apiUrl);
      User.update = update.bind( User, $http, apiUrl);
      User.delById = delById.bind( User, $http, apiUrl);

      return User;

    }]);

})(window.userRestApiConfig);

// userListComponent

UserList.$inject = [];
function UserList() { }

UserList.controller = UserList;

UserList.bindings = {
  users: '<',
  onDelete: '<'
}

UserList.template = '<div class="container"><h2>User List</h2><div class="row"><table class="table table-bordered table-striped"><tr><th>Name</th><th>Permissions</th><th>Actions</th></tr><tr ng-repeat="user in $ctrl.users track by $index"><td>{{user.name}}</td><td>{{user.permissions}}</td><td class="col-md-2 text-center"><a href="#/users/{{user.id}}" class="btn btn-info btn-sm glyphicon glyphicon-cog"></a><button ng-click="$ctrl.onDelete(user)" class="btn btn-danger btn-sm glyphicon glyphicon-remove-circle"></button></td></tr></table></div></div><a href="#/users-create" class="btn btn-lg btn-success glyphicon glyphicon-plus create-user"></a>';

angular
  .module('userListComponent', [])
  .component('userList', UserList);


// userFormCompoment

UserForm.$inject = [ '$scope', '$location' ];
function UserForm($scope, $location) {
  this.$location = $location;
  this.submitAllowed = function () {
    return $scope.userForm.$valid && $scope.userForm.$dirty;
  }
}

UserForm.controller = UserForm;
UserForm.bindings = {
  "user": "<",
  "onUpdate": "<",
  "backTo": "@"
}
UserForm.template = '<div class="container"><h2>User Details</h2><div class="row col-md-4"><form ng-submit="$ctrl.accept()" name="userForm"><div class="form-group"><label for="userName">User name</label><input id="userName" type="text" ng-model="$ctrl.user.name" placeholder="Name" class="form-control"/></div><div class="form-group"><label for="userPermissions">Permissions</label><input id="userPermissions" type="text" ng-model="$ctrl.user.permissions" placeholder="Permissions" class="form-control"/></div><button type="button" ng-click="$ctrl.cancel()" class="btn btn-default">Cancel</button><button type="submit" ng-disabled="!$ctrl.submitAllowed()" class="btn btn-primary">Submit</button></form></div></div>';

UserForm.prototype.cancel = function () {
  this.goBack();
}

UserForm.prototype.accept = function () {
  if (this.submitAllowed()) {
    this.onUpdate && this.onUpdate(this.user);
    this.goBack();
  }
}

UserForm.prototype.goBack = function () {
  this.backTo && this.$location.path(this.backTo);
}

angular
  .module('userFormCompoment', [])
  .component('userForm', UserForm);

// listController
listController.$inject = ['$scope', 'User'];
function listController($scope, User) {
  var $ctrl = this, unsubscribe;

  $ctrl.delete = function(user) { User.delById(user.id) };

  unsubscribe = User.subscribe(function (state) {
    $ctrl.users = state.list;
  });
  $scope.$on( '$destroy', unsubscribe ); // preventing memory leakage

  User.get();
}

angular
  .module('app')
  .controller('listController', listController);

// formController

formController.$inject = ['$scope', '$routeParams', 'User'];
function formController($scope, $routeParams, User) {
  var $ctrl = this, unsubscribe;

  $ctrl.create = User.create; // it works due to these methods are
  $ctrl.update = User.update; // already binded to the User

  unsubscribe = User.subscribe(function (state) {
    $ctrl.user = state.obj || { };
  });
  $scope.$on( '$destroy', unsubscribe ); // preventing memory leakage

  if ($routeParams.id) {
    User.getById( $routeParams.id );
  } else {
    $ctrl.user = { }
  }
}

angular
  .module('app')
  .controller('formController', formController)

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
      ;
  });
}(window.angular));
