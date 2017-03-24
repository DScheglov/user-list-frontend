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
