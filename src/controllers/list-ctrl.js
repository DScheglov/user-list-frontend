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
