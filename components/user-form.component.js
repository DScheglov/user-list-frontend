(function (angular) {
  'use strict';

  UserForm.$inject = [ '$location' ];
  function UserForm($location) {
    this.$location = $location;
  }

  UserForm.controller = UserForm;
  UserForm.bindings = {
    "user": "<",
    "onUpdate": "<"
  }
  UserForm.templateUrl = '/templates/user-form.html';

  UserForm.prototype.cancel = function () {
    this.$location.path('/users');
  }

  UserForm.prototype.accept = function () {
    this.onUpdate && this.onUpdate(this.user);
    this.$location.path('/users');
  }

  angular
    .module('userFormCompoment', [])
    .component('userForm', UserForm);

})(window.angular)
