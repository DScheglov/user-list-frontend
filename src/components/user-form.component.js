
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
UserForm.template = '#include("./build/user-form.html")';

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
