// formController

formController.$inject = ['$scope', '$routeParams', 'User'];
function formController($scope, $routeParams, User) {
  var $ctrl = this, unsubscribe;

  $ctrl.create = User.create; // it works due to these methods are
  $ctrl.update = User.update; // already binded to the User

  if ($routeParams.id) {
    User.getById( $routeParams.id ).then( function(response) {
      $ctrl.user = response.data;
    } );
  } else {
    $ctrl.user = { }
  }
}

angular
  .module('app')
  .controller('formController', formController)
